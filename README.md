[中文版](README_CN.md) | English

# 🍥 Naruto — Browser-Based Ninja Jutsu

Real-time hand tracking and gesture recognition web apps that let you unleash **Naruto** powers through your webcam.

## ✨ Features

### 🌀 Ninja Powers

| Gesture | Effect |
|---|---|
| 🖐️ **Left hand open** | Naruto's Rasengan |
| 🖐️ **Right hand open** | Sasuke's Chidori |

- **Real-time hand tracking** via [MediaPipe Hands](https://mediapipe.dev/)
- **Mirrored camera** for natural interaction
- **Blue skeleton overlay** to confirm tracking is active
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

### Ninja Powers

```bash
# Just open in any modern browser — no server needed
open ninja-powers.html
```

**Requirements:** A modern browser (Chrome, Edge, Safari, Firefox) + webcam + good lighting.

### Shadow Clone Jutsu

```bash
# Requires a local server (TensorFlow.js needs HTTP)
npx serve -p 3000
# Then open http://localhost:3000
```

**Requirements:** Chrome recommended + webcam + trained gesture model.

---

## 🎓 Training Your Gesture Model

The Shadow Clone app needs a trained model to recognize your hand sign:

1. Start the local server: `npx serve -p 3000`
2. Open the trainer: `http://localhost:3000/trainer`
3. Record samples of your chosen hand sign (both hands visible) — press **1**
4. Record negative samples (random hand positions) — press **2**
5. Click **Train Model**
6. Save the model — place `gesture-model.json` and `gesture-model.weights.bin` in the project root
7. Open the main app: `http://localhost:3000/shadow-clone`

---

## 🎮 Controls

### Ninja Powers

| Action | Power |
|---|---|
| Open **left hand** (3+ fingers extended) | Naruto — Rasengan |
| Open **right hand** (3+ fingers extended) | Sasuke — Chidori |
| Close hand | Power fades out |

### Shadow Clone Jutsu

| Action | Effect |
|---|---|
| Perform trained hand sign | Shadow clones spawn with smoke |
| Any other pose | Normal camera feed |

---

## 🛠️ Tech Stack

| App | Technologies |
|---|---|
| Ninja Powers | MediaPipe Hands, Canvas API, HTML5 Video, Vanilla JS |
| Shadow Clone | TensorFlow.js, MediaPipe Holistic, Selfie Segmentation, Canvas API |

All dependencies loaded via [jsDelivr CDN](https://www.jsdelivr.com/) — zero install, no build step.

---

## 📁 Project Structure

```
naruto/
├── index.html              # Landing page
├── ninja-powers.html       # Rasengan/Chidori hand tracking app
├── shadow-clone.html       # Shadow clone gesture recognition app
├── shadow-clone.js         # Clone rendering, gesture detection, smoke effects
├── shadow-clone.css        # Shadow clone styling
├── trainer.html            # Gesture model training UI
├── trainer.js              # Training logic & model definition
├── trainer.css             # Trainer page styling
├── assets/
│   ├── naruto.mp4          # Rasengan effect video
│   ├── sasuke.mp4          # Chidori effect video
│   ├── smoke_1/            # Smoke sprite frames (5 PNGs)
│   ├── smoke_2/            # Smoke sprite frames (5 PNGs)
│   ├── smoke_3/            # Smoke sprite frames (5 PNGs)
│   ├── smoke_small_1/      # Small smoke sprites (5 PNGs)
│   ├── state-1.png         # Overlay button (default)
│   └── state-2.png         # Overlay button (triggered)
├── .gitignore
├── README.md
├── README_CN.md
└── LICENSE
```

---

## ⚠️ Notes

- **Ninja Powers** works directly from `file://` — no server needed
- **Shadow Clone** requires an HTTP server (`npx serve`) due to TensorFlow.js CORS restrictions
- Chrome is recommended for Shadow Clone (Safari may glitch with MediaPipe Holistic)
- Works best in well-lit environments
- Keep your hands clearly visible to the camera for reliable detection
- The gesture model files (`gesture-model.json`, `gesture-model.weights.bin`) are user-generated and not included

---

*Believe it! 🍜*
