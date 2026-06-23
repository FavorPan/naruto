// ----------------------
// Media pipe set up
// ----------------------
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const holistic = new Holistic({
  locateFile: f => `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${f}`
});
holistic.setOptions({ modelComplexity: 1, smoothLandmarks: true });

const cam = new Camera(video, {
  width: 640,
  height: 480,
  onFrame: async () => await holistic.send({ image: video })
});
cam.start();

holistic.onResults(res => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Mirror the feed
  ctx.save();
  ctx.scale(-1, 1);
  ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
  ctx.restore();

  // Draw hand skeletons
  if (res.rightHandLandmarks) drawHand(res.rightHandLandmarks);
  if (res.leftHandLandmarks) drawHand(res.leftHandLandmarks);

  // Capture data if recording
  captureFrame(res.rightHandLandmarks, res.leftHandLandmarks);

  // Live inference
  if (model && res.rightHandLandmarks && res.leftHandLandmarks) {
    const input = tf.tensor2d([extract(res.rightHandLandmarks, res.leftHandLandmarks)]);
    const prob = model.predict(input).dataSync()[0];
    input.dispose();
    updateConf(prob);
  }
});

// ----------------------
// Hand skeleton drawing
// ----------------------
function drawHand(lm) {
  const segs = [
    [0, 1, 2, 3, 4],
    [0, 5, 6, 7, 8],
    [0, 9, 10, 11, 12],
    [0, 13, 14, 15, 16],
    [0, 17, 18, 19, 20]
  ];
  ctx.strokeStyle = "#22c55e";
  ctx.lineWidth = 2;

  for (const seg of segs) {
    ctx.beginPath();
    seg.forEach((i, idx) => {
      const x = canvas.width - lm[i].x * canvas.width;
      const y = lm[i].y * canvas.height;
      idx === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.stroke();
  }

  lm.forEach(p => {
    ctx.beginPath();
    ctx.arc(canvas.width - p.x * canvas.width, p.y * canvas.height, 3, 0, Math.PI * 2);
    ctx.fillStyle = "#ef4444";
    ctx.fill();
  });
}

// ----------------------
// landmark processing
// ----------------------
function normalize(lm) {
  const w = lm[0], mcp = lm[9];
  const scale = Math.sqrt(
    (mcp.x - w.x) ** 2 + (mcp.y - w.y) ** 2 + (mcp.z - w.z) ** 2
  ) || 1;
  const out = [];
  for (let i = 0; i < 21; i++) {
    out.push((lm[i].x - w.x) / scale);
    out.push((lm[i].y - w.y) / scale);
    out.push((lm[i].z - w.z) / scale);
  }
  return out;
}

function extract(right, left) {
  return [...normalize(right), ...normalize(left)];
}

// ----------------------
// data collection
// ----------------------
let samples = { clone_sign: [], not_sign: [] };
let recording = null;
let model = null;

const statusEl = document.getElementById("train-status");

function captureFrame(right, left) {
  if (!recording || !right || !left) return;
  samples[recording].push(extract(right, left));
  document.getElementById("count-clone").textContent = samples.clone_sign.length;
  document.getElementById("count-other").textContent = samples.not_sign.length;
}

const COUNTDOWN = 3;     // countdown before recording starts
const RECORD_TIME = 4;   // recording time

let countdownTimer = null;
let recordTimer = null;

function startCountdown(label) {
  // Cancel any running session
  cancelRecording();

  const badge = document.getElementById("rec-badge");
  let remaining = COUNTDOWN;

  badge.classList.add("active");
  badge.textContent = `GET READY… ${remaining}`;
  statusEl.textContent = `Recording "${label === "clone_sign" ? "clone sign" : "other"}" in ${remaining}s — get into position!`;

  countdownTimer = setInterval(() => {
    remaining--;
    if (remaining > 0) {
      badge.textContent = `GET READY… ${remaining}`;
      statusEl.textContent = `Recording in ${remaining}s — get into position!`;
    } else {
      clearInterval(countdownTimer);
      countdownTimer = null;
      startRec(label);
    }
  }, 1000);
}

function startRec(label) {
  recording = label;

  const badge = document.getElementById("rec-badge");
  badge.classList.add("active");

  let remaining = RECORD_TIME;
  badge.textContent = `● REC ${remaining}s`;
  statusEl.textContent = `Recording "${label === "clone_sign" ? "clone sign" : "other"}" — hold your pose!`;

  recordTimer = setInterval(() => {
    remaining--;
    if (remaining > 0) {
      badge.textContent = `● REC ${remaining}s`;
    } else {
      stopRec();
      statusEl.textContent = `Done! Captured samples. Record more or train.`;
    }
  }, 1000);
}

function stopRec() {
  recording = null;
  clearInterval(recordTimer);
  recordTimer = null;
  document.getElementById("rec-badge").classList.remove("active");
}

function cancelRecording() {
  clearInterval(countdownTimer);
  clearInterval(recordTimer);
  countdownTimer = null;
  recordTimer = null;
  recording = null;
  document.getElementById("rec-badge").classList.remove("active");
}

// Click-to-toggle buttons
["btn-rec-clone", "btn-rec-other"].forEach(id => {
  const label = id.includes("clone") ? "clone_sign" : "not_sign";
  document.getElementById(id).addEventListener("click", () => startCountdown(label));
});

// Keyboard: tap 1 / 2
const keyMap = { "1": "clone_sign", "2": "not_sign" };
document.addEventListener("keydown", e => {
  if (!e.repeat && keyMap[e.key]) startCountdown(keyMap[e.key]);
});

// ----------------------
// Training the model
// ----------------------
document.getElementById("btn-train").addEventListener("click", async () => {
  const nP = samples.clone_sign.length;
  const nN = samples.not_sign.length;

  if (nP < 5 || nN < 5) {
    statusEl.textContent = "Need at least 5 samples each.";
    return;
  }

  const xs = [], ys = [];
  samples.clone_sign.forEach(s => { xs.push(s); ys.push(1); });
  samples.not_sign.forEach(s => { xs.push(s); ys.push(0); });

  // Shuffle
  for (let i = xs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [xs[i], xs[j]] = [xs[j], xs[i]];
    [ys[i], ys[j]] = [ys[j], ys[i]];
  }

  const xT = tf.tensor2d(xs);
  const yT = tf.tensor1d(ys);

  // ------- Using a NN ------ //
  if (model) model.dispose();
  model = tf.sequential();
  // Mess around with the NN model topology to try and get better performance. 
  // Keep in mind bias-variance tradeoffs and over/under fitting
  model.add(tf.layers.dense({ inputShape: [126], units: 64, activation: "relu" }));
  model.add(tf.layers.dropout({ rate: 0.3 }));
  model.add(tf.layers.dense({ units: 32, activation: "relu" }));
  model.add(tf.layers.dense({ units: 1, activation: "sigmoid" }));
  model.compile({ optimizer: "adam", loss: "binaryCrossentropy", metrics: ["accuracy"] });

  // ------- Using LR, TF equivalent ------ //
  // if (model) model.dispose();
  // model = tf.sequential();
  // model.add(tf.layers.dense({ inputShape: [126], units: 1, activation: "sigmoid" }));
  // model.compile({ optimizer: "adam", loss: "binaryCrossentropy", metrics: ["accuracy"] });

  document.getElementById("btn-train").disabled = true;
  statusEl.textContent = "Training...";

  await model.fit(xT, yT, {
    epochs: 50,
    batchSize: 16,
    shuffle: true,
    callbacks: {
      onEpochEnd: (ep, logs) => {
        statusEl.textContent = `Epoch ${ep + 1}/50 — acc: ${(logs.acc * 100).toFixed(1)}%`;
      }
    }
  });

  xT.dispose();
  yT.dispose();
  document.getElementById("btn-train").disabled = false;
  statusEl.textContent = `Done! ${nP + nN} samples. Model is live — test your sign above.`;
});

// ----------------------
// confidence bar
// ----------------------
function updateConf(prob) {
  document.getElementById("conf-fill").style.width = `${(prob * 100).toFixed(0)}%`;
  document.getElementById("conf-label").textContent = `${(prob * 100).toFixed(0)}%`;
}

// ----------------------
// export/import data options
// ----------------------
document.getElementById("btn-export-data").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(samples)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "gesture-data.json";
  a.click();
});

document.getElementById("btn-import-data").addEventListener("click", () => {
  document.getElementById("import-data-input").click();
});

document.getElementById("import-data-input").addEventListener("change", e => {
  const reader = new FileReader();
  reader.onload = ev => {
    const data = JSON.parse(ev.target.result);
    samples.clone_sign.push(...(data.clone_sign || []));
    samples.not_sign.push(...(data.not_sign || []));
    document.getElementById("count-clone").textContent = samples.clone_sign.length;
    document.getElementById("count-other").textContent = samples.not_sign.length;
    statusEl.textContent = "Data imported.";
  };
  reader.readAsText(e.target.files[0]);
});

// ----------------------
// save / clear model
// ----------------------
document.getElementById("btn-save-model").addEventListener("click", async () => {
  if (!model) {
    statusEl.textContent = "Train a model first.";
    return;
  }
  await model.save("downloads://gesture-model");
  statusEl.textContent = "Model saved — you'll get gesture-model.json + gesture-model.weights.bin";
});

document.getElementById("btn-clear-data").addEventListener("click", () => {
  samples = { clone_sign: [], not_sign: [] };
  document.getElementById("count-clone").textContent = "0";
  document.getElementById("count-other").textContent = "0";
  statusEl.textContent = "Data cleared.";
});