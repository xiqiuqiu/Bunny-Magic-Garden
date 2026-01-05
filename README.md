# 🥕 Jelly Garden - 拔萝卜游戏

一个为儿童设计的可爱互动游戏，结合了 AI 谜语生成和语音合成功能。

## ✨ 特性

- 🎮 **互动游戏玩法** - 拖拽萝卜，匹配正确颜色得分
- 🤖 **AI 谜语生成** - 支持 Google Gemini 和阿里云 Qwen 两种 AI 服务
- 🔊 **语音合成** - 将谜语转换为语音播放
- 🎵 **动态音效** - 使用 Web Audio API 生成游戏音效
- 🎨 **精美动画** - 基于 Framer Motion 的流畅动画效果
- 📱 **响应式设计** - 支持桌面、平板和移动设备

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 `http://localhost:5174` 查看应用。

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

### 运行测试

```bash
npm test
```

## 🎮 游戏玩法

1. 点击 **Start Game!** 开始游戏
2. 兔子会说出一个谜语，提示需要什么颜色的萝卜
3. 拖拽正确颜色的萝卜给兔子
4. 答对得分，答错兔子会震惊
5. 继续挑战更高分数！

## ⚙️ 配置 API 密钥

游戏支持两种 AI 服务提供商：

### Google Gemini

1. 访问 [Google AI Studio](https://aistudio.google.com/app/apikey)
2. 创建 API 密钥
3. 在游戏设置中选择 "Google" 并输入密钥

### 阿里云 Qwen

1. 访问 [阿里云 DashScope](https://dashscope.console.aliyun.com/)
2. 获取 API 密钥
3. 在游戏设置中选择 "Qwen" 并输入密钥

## 📁 项目结构

```
jelly-garden/
├── src/
│   ├── components/          # React 组件
│   │   ├── JellyCarrot.jsx  # 萝卜组件
│   │   ├── JellyBunny.jsx   # 兔子组件
│   │   └── SettingsModal.jsx # 设置弹窗
│   ├── services/            # 业务逻辑服务
│   │   ├── apiService.js    # AI API 服务
│   │   └── audioService.js  # 音效服务
│   ├── utils/               # 工具函数
│   │   └── audioHelpers.js  # 音频转换工具
│   ├── constants/           # 常量配置
│   │   ├── colors.js        # 颜色配置
│   │   └── config.js        # API 配置
│   ├── App.jsx              # 主应用组件
│   ├── main.jsx             # React 入口
│   └── index.css            # 全局样式
├── index.html               # HTML 入口
├── vite.config.js           # Vite 配置
├── tailwind.config.js       # Tailwind CSS 配置
└── package.json             # 项目依赖
```

## 🛠️ 技术栈

- **框架**: React 18
- **构建工具**: Vite
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **特效**: canvas-confetti
- **图标**: lucide-react
- **测试**: Vitest + fast-check (属性测试)
- **AI 服务**: Google Gemini / 阿里云 Qwen

## 🎨 颜色主题

游戏支持四种萝卜颜色：

- 🔴 **红色** (Red) - 像苹果一样
- 🔵 **蓝色** (Blue) - 像天空一样
- 🟡 **黄色** (Yellow) - 像太阳一样
- 🟣 **紫色** (Purple) - 像葡萄一样

## 🔊 音效系统

游戏使用 Web Audio API 生成四种音效：

- **stretch** - 拉伸萝卜时的音效
- **pop** - 拔出萝卜时的音效
- **morph** - 萝卜变形时的音效
- **success** - 答对时的成功音效

## 🧪 测试

项目包含完整的测试覆盖：

- **单元测试** - 测试组件和服务的具体功能
- **属性测试** - 使用 fast-check 验证通用正确性
- **集成测试** - 测试应用整体功能

运行测试：

```bash
npm test
```

## 📝 开发说明

### 添加新颜色

1. 在 `src/constants/colors.js` 中添加颜色配置
2. 更新 `JellyCarrot.jsx` 组件支持新颜色
3. 更新 AI 提示词以支持新颜色的谜语

### 修改音效

编辑 `src/services/audioService.js` 中的 `playSound` 函数，调整频率和持续时间参数。

### 自定义 AI 提示词

编辑 `src/services/apiService.js` 中的 `generateRiddleGoogle` 或 `generateRiddleQwen` 函数，修改提示词内容。

## 🐛 故障排除

### CORS 错误

如果遇到阿里云 TTS 的 CORS 错误，确保：
1. 使用 `npm run dev` 启动开发服务器（不是直接打开 HTML）
2. Vite 代理配置正确（已在 `vite.config.js` 中配置）

### API 调用失败

1. 检查 API 密钥是否正确
2. 确认网络连接正常
3. 查看浏览器控制台的错误信息

### 音效无法播放

某些浏览器需要用户交互后才能播放音频。确保在点击游戏元素后音效才会播放。

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📧 联系方式

如有问题或建议，请通过 GitHub Issues 联系。

---

Made with ❤️ for kids
