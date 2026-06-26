[中文版](README_CN.md) | English

# 🍥 Naruto — Browser-Based Ninja Jutsu

Real-time hand tracking and gesture recognition web apps that let you unleash **Naruto** powers through your webcam.

## ✨ Apps

### 🔥 Combined Ninja Powers *(new)*

All three jutsu in one full-screen immersive view:

| Gesture | Effect |
|---|---|
| 🖐️ **Left hand open** | Naruto's Rasengan |
| 🖐️ **Right hand open** | Sasuke's Chidori |
| 🤏 **Trained hand sign** | Shadow clones with smoke effects |

- **Unified pipeline** — MediaPipe Holistic + Selfie Segmentation drive all three effects
- **Simultaneous triggers** — all effects can be active at once
- **Full-screen immersive** — no UI clutter, just the camera feed and jutsu overlays
- **Gesture model included** — pre-trained model ships with the repo

### 🌀 Ninja Powers

| Gesture | Effect |
|---|---|
| 🖐️ **Left hand open** | Naruto's Rasengan |
| 🖐️ **Right hand open** | Sasuke's Chidori |

- **Real-time hand tracking** via [MediaPipe Hands](https://mediapipe.dev/)
- **Mirrored camera** for natural interaction
- **Screen-blend effects** — power animations composite naturally over the camera feed
- **Fade in/out** — power intensity ramps up as you hold your hand open

### 👥 Shadow Clone Jutsu

| Action | Effect |
|---|---|
| 🤏 **Trained hand sign** | Shadow clones with smoke effects |

- **Gesture recognition** via a custom-trained TensorFlow.js neural network
- **Selfie segmentation** to isolate your body from the background
- **Smoke sprite animations** when clones spawn
- **Model trainer** included — record your own hand sign and train the model in the browser

---

## 🚀 Quick Start

All apps require a local HTTP server:

```bash
# Start a server in the project root
python3 -m http.server 8080
# or: npx serve -p 3000
```

Then open:

| App | URL |
|---|---|
| Home | `http://localhost:8080` |
| Combined | `http://localhost:8080/naruto-combined.html` |
| Ninja Powers | `http://localhost:8080/ninja-powers.html` |
| Shadow Clone | `http://localhost:8080/shadow-clone.html` |
| Trainer | `http://localhost:8080/trainer.html` |

**Requirements:** A modern browser (Chrome recommended) + webcam + good lighting.

---

## 🎓 Training Your Own Gesture Model

A pre-trained model is included. To train your own:

1. Start the local server
2. Open the trainer: `http://localhost:8080/trainer`
3. Record samples of your chosen hand sign (both hands visible) — press **1**
4. Record negative samples (random hand positions) — press **2**
5. Click **Train Model**
6. Save the model — replace `gesture-model.json` and `gesture-model.weights.bin` in the project root

---

## 🎮 Controls

| Action | Effect |
|---|---|
| Open **left hand** (3+ fingers extended) | Rasengan |
| Open **right hand** (3+ fingers extended) | Chidori |
| Perform trained hand sign (both hands) | Shadow clones + smoke |
| Close hand | Power fades out |

---

## 🛠️ Tech Stack

| App | Technologies |
|---|---|
| Combined | TensorFlow.js, MediaPipe Holistic, Selfie Segmentation, Canvas API |
| Ninja Powers | MediaPipe Hands, Canvas API, HTML5 Video |
| Shadow Clone | TensorFlow.js, MediaPipe Holistic, Selfie Segmentation, Canvas API |

All dependencies loaded via [jsDelivr CDN](https://www.jsdelivr.com/) — zero install, no build step.

---

## 📁 Project Structure

```
naruto/
├── index.html                  # Landing page (i18n EN/中文)
├── naruto-combined.html        # All three jutsu in one view
├── ninja-powers.html           # Rasengan & Chidori hand tracking
├── shadow-clone.html           # Shadow clone gesture recognition
├── shadow-clone.js             # Clone rendering, gesture detection, smoke
├── shadow-clone.css            # Shadow clone styling
├── trainer.html                # Gesture model training UI
├── trainer.js                  # Training logic & model definition
├── trainer.css                 # Trainer page styling
├── gesture-model.json          # Pre-trained gesture model (included)
├── gesture-model.weights.bin   # Model weights (included)
├── assets/
│   ├── naruto.mp4              # Rasengan effect video
│   ├── sasuke.mp4              # Chidori effect video
│   ├── smoke_1/                # Smoke sprite frames (5 PNGs)
│   ├── smoke_2/                # Smoke sprite frames (5 PNGs)
│   ├── smoke_3/                # Smoke sprite frames (5 PNGs)
│   ├── smoke_small_1/          # Small smoke sprites (5 PNGs)
│   ├── state-1.png             # Overlay button (default)
│   └── state-2.png             # Overlay button (triggered)
├── .gitignore
├── README.md
├── README_CN.md
└── LICENSE
```

---

## ⚠️ Notes

- All apps require an HTTP server — `python3 -m http.server 8080` is the simplest option
- Chrome is recommended (Safari may glitch with MediaPipe Holistic)
- Works best in well-lit environments with hands clearly visible
- The pre-trained gesture model is included in the repo — no training required to try shadow clones

---

*Believe it! 🍜*
