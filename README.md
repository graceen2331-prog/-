# ⚡ Gemini CodeCraft | AI Instant UI Generator

![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Vite](https://img.shields.io/badge/Build-Vite-yellow)
![Gemini](https://img.shields.io/badge/Model-Gemini%202.5%20Flash-magenta)

> **"Turn ideas into interactive UI in seconds."**
> 
> 一个基于 Gemini 2.5 Flash 的生成式 UI 开发工具。用户输入自然语言，实时流式生成代码，并在安全的沙箱环境中即时渲染预览。

---

## 🎯 The Problem (为什么做这个?)

在 AI 辅助编程时代，我们面临一个新的矛盾：
* **Gap**: 现在的 LLM（如 ChatGPT）虽然能写代码，但用户需要手动复制 -> 粘贴到 IDE -> 配置环境 -> 运行，这个链路太长了。
* **Goal**: 我希望构建一个 **"Zero-Setup Playground"**。不仅让 AI 写代码，更让 AI 配置环境。对于 PM 做原型验证（Prototyping）或前端做组件调试，这种“所见即所得”的体验至关重要。

---

## ✨ Key Features (核心功能)

从截图可见，本项目实现了以下完整闭环：

* **🗣️ Natural Language to UI**: 输入 "Login form with gradient background"，AI 自动生成 HTML/CSS/JS 代码。
* **⚡ Powered by Gemini 2.5 Flash**: 选用了 Google 最新发布的 Flash 模型，实现了**亚秒级**的首字延迟 (TTFT) 和极低的推理成本，确保“实时感”。
* **🛡️ Secure Sandboxing (关键技术点)**: 
    * 代码执行环境与主应用隔离，通过 `<iframe>` 和 `srcDoc` 技术渲染。
    * 防止了 LLM 生成恶意代码导致的 XSS 攻击，保证了宿主环境的安全。
* **📱 Responsive Preview**: 支持 Desktop/Mobile 视图切换，模拟不同设备的渲染效果。
* **🔄 Live Code Editing**: 支持 Split View（分屏模式），左边改代码，右边看效果，实现了 Human-in-the-loop 的协作模式。

---

## 🛠️ Tech Stack (技术栈)

* **Frontend**: React + TypeScript + Vite (极速构建)
* **Styling**: Tailwind CSS (通过 CDN 注入，确保生成代码的轻量化)
* **AI Model**: Google Gemini API (Model: `gemini-2.5-flash`)
* **Editor**: Monaco Editor (VS Code 同款内核，提供语法高亮)
* **State Management**: React Hooks (处理流式响应数据)

---

## 📸 ScreenShots

<img width="1848" height="965" alt="image" src="https://github.com/user-attachments/assets/a4c8238d-e793-4183-9688-68569731fa52" />
<img width="1972" height="1163" alt="image" src="https://github.com/user-attachments/assets/57704016-7ff8-46e7-83be-c462d0c71d4b" />
上图是咖啡店网站的落地页展示

---

## 🚀 Quick Start

### 1. Clone the repo
```bash
git clone [https://github.com/YourUsername/gemini-codecraft.git](https://github.com/YourUsername/gemini-codecraft.git)
cd gemini-codecraft
