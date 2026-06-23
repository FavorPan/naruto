[中文版](README_CN.md) | English

# 🍥 Naruto — Hand Tracking Ninja Powers

Real-time hand tracking web app that lets you unleash **Naruto** and **Sasuke** powers through hand gestures.

## ✨ Features

| Gesture | Effect |
|---|---|
| 🖐️ **Left hand open** | Naruto's Rasengan |
| 🖐️ **Right hand open** | Sasuke's Chidori |

- **Real-time hand tracking** via [MediaPipe Hands](https://mediapipe.dev/)
- **Mirrored camera** for natural interaction
- **Blue skeleton overlay** to confirm tracking is active
- **Screen-blend effects** — the power animations composite naturally over the camera feed
- **Fade in/out** — power intensity ramps up as you hold your hand open, fades when you close it

## 🚀 Quick Start

```bash
# Just open index.html in any modern browser
open index.html
```

**Requirements:**
- A modern browser (Chrome, Edge, Safari, Firefox)
- A webcam
- Good lighting for best tracking

## 🎮 Controls

| Action | Power |
|---|---|
| Open **left hand** (3+ fingers extended) | Naruto — Rasengan |
| Open **right hand** (3+ fingers extended) | Sasuke — Chidori |
| Close hand | Power fades out |

The blue skeleton lines drawn on your hands confirm MediaPipe is tracking correctly.

## 🛠️ Tech Stack

- **MediaPipe Hands** — hand landmark detection
- **Canvas API** — skeleton rendering
- **HTML5 Video** — effect overlays with `mix-blend-mode: screen`
- **Vanilla JS** — zero dependencies, no build step

## 📁 Project Structure

```
naruto/
├── index.html          # Main app
├── assets/
│   ├── naruto.mp4      # Naruto power effect video
│   └── sasuke.mp4      # Sasuke power effect video
└── README.md
```

## ⚠️ Notes

- Glow effects were removed to maintain compatibility across all devices
- Works best in well-lit environments
- Keep your hands clearly visible to the camera for reliable detection

---

*Believe it! 🍜*
