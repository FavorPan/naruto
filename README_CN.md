中文版 | [English](README.md)

# 🍥 Naruto — 浏览器忍者忍术

基于实时手势追踪和手势识别的网页应用，通过摄像头释放**鸣人**的忍术。

## ✨ 应用

### 🔥 综合忍术 *(新)*

三种忍术合一，全屏沉浸体验：

| 手势 | 效果 |
|---|---|
| 🖐️ **张开左手** | 鸣人·螺旋丸 |
| 🖐️ **张开右手** | 佐助·千鸟 |
| 🤏 **训练好的手势** | 影分身 + 烟雾特效 |

- **统一管线** — MediaPipe Holistic + Selfie Segmentation 驱动全部三种特效
- **同时触发** — 三种效果可同时激活
- **全屏沉浸** — 无 UI 干扰，只有摄像头画面和忍术叠加层
- **内置手势模型** — 预训练模型随仓库一起发布

### 🌀 忍术

| 手势 | 效果 |
|---|---|
| 🖐️ **张开左手** | 鸣人·螺旋丸 |
| 🖐️ **张开右手** | 佐助·千鸟 |

- **实时手势追踪**，基于 [MediaPipe Hands](https://mediapipe.dev/)
- **镜像摄像头**，交互更自然
- **Screen 混合模式**，特效动画自然融入摄像头画面
- **渐入渐出**，张开手时威力逐渐增强，握拳时逐渐消散

### 👥 影分身之术

| 动作 | 效果 |
|---|---|
| 🤏 **训练好的手势** | 影分身 + 烟雾特效 |

- **手势识别**，基于自定义训练的 TensorFlow.js 神经网络
- **人像分割**，将人物与背景分离
- **烟雾精灵动画**，分身出现时播放
- **内置训练器** — 在浏览器中录制手势并训练模型

---

## 🚀 快速开始

所有应用都需要本地 HTTP 服务器：

```bash
# 在项目根目录启动服务器
python3 -m http.server 8080
# 或者：npx serve -p 3000
```

然后打开：

| 应用 | 地址 |
|---|---|
| 首页 | `http://localhost:8080` |
| 综合忍术 | `http://localhost:8080/naruto-combined.html` |
| 忍术 | `http://localhost:8080/ninja-powers.html` |
| 影分身 | `http://localhost:8080/shadow-clone.html` |
| 训练器 | `http://localhost:8080/trainer.html` |

**运行要求：** 现代浏览器（推荐 Chrome）+ 摄像头 + 光线充足。

---

## 🎓 训练自己的手势模型

仓库已包含预训练模型。如需训练自己的模型：

1. 启动本地服务器
2. 打开训练页面：`http://localhost:8080/trainer`
3. 录制你的手势样本（双手可见）— 按 **1**
4. 录制负样本（随机手势）— 按 **2**
5. 点击 **Train Model**
6. 保存模型 — 替换项目根目录下的 `gesture-model.json` 和 `gesture-model.weights.bin`

---

## 🎮 操作

| 动作 | 效果 |
|---|---|
| 张开**左手**（3 根以上手指伸直） | 螺旋丸 |
| 张开**右手**（3 根以上手指伸直） | 千鸟 |
| 做出训练好的手势（双手） | 影分身 + 烟雾 |
| 握拳 | 忍术逐渐消散 |

---

## 🛠️ 技术栈

| 应用 | 技术 |
|---|---|
| 综合忍术 | TensorFlow.js、MediaPipe Holistic、Selfie Segmentation、Canvas API |
| 忍术 | MediaPipe Hands、Canvas API、HTML5 Video |
| 影分身 | TensorFlow.js、MediaPipe Holistic、Selfie Segmentation、Canvas API |

所有依赖通过 [jsDelivr CDN](https://www.jsdelivr.com/) 加载 — 零安装，无需构建。

---

## 📁 项目结构

```
naruto/
├── index.html                  # 首页导航（中英文切换）
├── naruto-combined.html        # 三术合一综合页面
├── ninja-powers.html           # 螺旋丸/千鸟手势追踪
├── shadow-clone.html           # 影分身手势识别
├── shadow-clone.js             # 分身渲染、手势检测、烟雾特效
├── shadow-clone.css            # 影分身样式
├── trainer.html                # 手势模型训练界面
├── trainer.js                  # 训练逻辑与模型定义
├── trainer.css                 # 训练器样式
├── gesture-model.json          # 预训练手势模型（已包含）
├── gesture-model.weights.bin   # 模型权重（已包含）
├── assets/
│   ├── naruto.mp4              # 螺旋丸特效视频
│   ├── sasuke.mp4              # 千鸟特效视频
│   ├── smoke_1/                # 烟雾精灵帧（5 张 PNG）
│   ├── smoke_2/                # 烟雾精灵帧（5 张 PNG）
│   ├── smoke_3/                # 烟雾精灵帧（5 张 PNG）
│   ├── smoke_small_1/          # 小烟雾精灵（5 张 PNG）
│   ├── state-1.png             # 叠加按钮（默认状态）
│   └── state-2.png             # 叠加按钮（触发状态）
├── .gitignore
├── README.md
├── README_CN.md
└── LICENSE
```

---

## ⚠️ 注意事项

- 所有应用都需要 HTTP 服务器 — 最简单的方式是 `python3 -m http.server 8080`
- 推荐使用 Chrome（Safari 上 MediaPipe Holistic 可能有问题）
- 光线充足、双手清晰可见时追踪效果最佳
- 预训练手势模型已包含在仓库中 — 无需训练即可体验影分身

---

*だってばよ！🍜*
