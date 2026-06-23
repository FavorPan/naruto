中文版 | [English](README.md)

# 🍥 Naruto — 浏览器忍者忍术

基于实时手势追踪和手势识别的网页应用，通过摄像头释放**鸣人**的忍术。

## ✨ 功能

### 🌀 忍者之力

| 手势 | 效果 |
|---|---|
| 🖐️ **张开左手** | 鸣人·螺旋丸 |
| 🖐️ **张开右手** | 佐助·千鸟 |

- **实时手势追踪**，基于 [MediaPipe Hands](https://mediapipe.dev/)
- **镜像摄像头**，交互更自然
- **蓝色骨骼叠加层**，确认追踪正常运行
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

### 忍者之力

```bash
# 直接用浏览器打开即可，无需服务器
open ninja-powers.html
```

**运行要求：** 现代浏览器（Chrome、Edge、Safari、Firefox）+ 摄像头 + 光线充足。

### 影分身之术

```bash
# 需要本地服务器（TensorFlow.js 要求 HTTP 协议）
npx serve -p 3000
# 然后打开 http://localhost:3000
```

**运行要求：** 推荐 Chrome + 摄像头 + 训练好的手势模型。

---

## 🎓 训练手势模型

影分身应用需要训练好的模型来识别你的手势：

1. 启动本地服务器：`npx serve -p 3000`
2. 打开训练页面：`http://localhost:3000/trainer`
3. 录制你的手势样本（双手可见）— 按 **1**
4. 录制负样本（随机手势）— 按 **2**
5. 点击 **Train Model**
6. 保存模型 — 将 `gesture-model.json` 和 `gesture-model.weights.bin` 放到项目根目录
7. 打开主应用：`http://localhost:3000/shadow-clone`

---

## 🎮 操作

### 忍者之力

| 动作 | 忍术 |
|---|---|
| 张开**左手**（3 根以上手指伸直） | 鸣人·螺旋丸 |
| 张开**右手**（3 根以上手指伸直） | 佐助·千鸟 |
| 握拳 | 忍术逐渐消散 |

### 影分身之术

| 动作 | 效果 |
|---|---|
| 做出训练好的手势 | 影分身出现 + 烟雾特效 |
| 其他姿势 | 正常摄像头画面 |

---

## 🛠️ 技术栈

| 应用 | 技术 |
|---|---|
| 忍者之力 | MediaPipe Hands、Canvas API、HTML5 Video、原生 JS |
| 影分身 | TensorFlow.js、MediaPipe Holistic、Selfie Segmentation、Canvas API |

所有依赖通过 [jsDelivr CDN](https://www.jsdelivr.com/) 加载 — 零安装，无需构建。

---

## 📁 项目结构

```
naruto/
├── index.html              # 首页导航
├── ninja-powers.html       # 螺旋丸/千鸟手势追踪应用
├── shadow-clone.html       # 影分身手势识别应用
├── shadow-clone.js         # 分身渲染、手势检测、烟雾特效
├── shadow-clone.css        # 影分身样式
├── trainer.html            # 手势模型训练界面
├── trainer.js              # 训练逻辑与模型定义
├── trainer.css             # 训练器样式
├── assets/
│   ├── naruto.mp4          # 螺旋丸特效视频
│   ├── sasuke.mp4          # 千鸟特效视频
│   ├── smoke_1/            # 烟雾精灵帧（5 张 PNG）
│   ├── smoke_2/            # 烟雾精灵帧（5 张 PNG）
│   ├── smoke_3/            # 烟雾精灵帧（5 张 PNG）
│   ├── smoke_small_1/      # 小烟雾精灵（5 张 PNG）
│   ├── state-1.png         # 叠加按钮（默认状态）
│   └── state-2.png         # 叠加按钮（触发状态）
├── .gitignore
├── README.md
├── README_CN.md
└── LICENSE
```

---

## ⚠️ 注意事项

- **忍者之力**可直接通过 `file://` 打开，无需服务器
- **影分身**需要 HTTP 服务器（`npx serve`），因为 TensorFlow.js 有 CORS 限制
- 影分身推荐使用 Chrome（Safari 上 MediaPipe Holistic 可能有问题）
- 光线充足的环境下追踪效果最佳
- 保持双手在摄像头视野内，确保检测稳定
- 手势模型文件（`gesture-model.json`、`gesture-model.weights.bin`）需用户自行训练，不包含在项目中

---

*だってばよ！🍜*
