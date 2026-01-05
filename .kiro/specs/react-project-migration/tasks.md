# Implementation Plan: React Project Migration

## Overview

将单文件 React 应用迁移为标准的 Vite + React 项目结构。采用增量迁移策略，先建立项目骨架，再逐步拆分组件和服务，最后进行测试验证。

## Tasks

- [x] 1. 初始化 Vite + React 项目结构
  - 创建 `package.json` 配置文件，包含 React、Vite、Tailwind CSS、Framer Motion、canvas-confetti、lucide-react 等依赖
  - 创建 `vite.config.js` 构建配置
  - 创建 `tailwind.config.js` 和 `postcss.config.js` 样式配置
  - 创建 `index.html` 入口文件
  - 创建 `src` 目录结构
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [x] 2. 创建常量和配置文件
  - [x] 2.1 创建 `src/constants/colors.js` 导出萝卜颜色配置
    - 定义 CARROT_COLORS 常量对象，包含 red、blue、yellow、purple 四种颜色的样式配置
    - _Requirements: 5.1_
  
  - [x] 2.2 创建 `src/constants/config.js` 导出默认 API 配置
    - 定义 DEFAULT_GOOGLE_KEY 和 DEFAULT_QWEN_KEY 常量
    - _Requirements: 5.2_

- [x] 3. 创建工具函数模块
  - [x] 3.1 创建 `src/utils/audioHelpers.js` 导出音频转换工具
    - 实现 `addWavHeader` 函数：将 PCM 数据转换为 WAV 格式
    - 实现 `base64ToArrayBuffer` 函数：将 base64 字符串转换为 ArrayBuffer
    - _Requirements: 4.1, 4.2, 4.3_

- [x] 4. 创建服务层模块
  - [x] 4.1 创建 `src/services/audioService.js` 导出音效服务
    - 实现 `getAudioContext` 函数：创建或获取 AudioContext 实例
    - 实现 `playSound` 函数：支持 stretch、pop、morph、success 四种音效类型
    - _Requirements: 3.6, 3.7_
  
  - [x] 4.2 编写 audioService 的属性测试
    - **Property 2: Audio Service 音效类型完整性**
    - **Validates: Requirements 3.7**
  
  - [x] 4.3 创建 `src/services/apiService.js` 导出 AI API 服务
    - 实现 `generateRiddleGoogle` 函数：调用 Google Gemini 生成谜语
    - 实现 `generateSpeechGoogle` 函数：调用 Google Gemini TTS
    - 实现 `generateRiddleQwen` 函数：调用阿里云 Qwen 生成谜语
    - 实现 `generateSpeechQwen` 函数：调用阿里云 Qwen TTS
    - 实现 `generateRiddle` 统一调度函数
    - 实现 `generateSpeech` 统一调度函数
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_
  
  - [x] 4.4 编写 apiService 的属性测试
    - **Property 1: API Service 导出完整性**
    - **Validates: Requirements 3.2, 3.3, 3.4, 3.5**

- [-] 5. 创建 UI 组件
  - [x] 5.1 创建 `src/components/JellyCarrot.jsx` 萝卜组件
    - 实现萝卜的三种状态：planted、pulling、popped、morphing
    - 实现拖拽交互逻辑
    - 集成音效服务
    - 使用颜色常量配置
    - _Requirements: 2.1_
  
  - [x] 5.2 创建 `src/components/JellyBunny.jsx` 兔子组件
    - 实现三种表情：idle、happy、shock
    - 实现对话气泡动画
    - 实现思考动画
    - _Requirements: 2.2_
  
  - [x] 5.3 创建 `src/components/SettingsModal.jsx` 设置弹窗组件
    - 实现 Google/Qwen 提供商切换
    - 实现 API 密钥输入
    - 实现弹窗动画效果
    - _Requirements: 2.3_

- [x] 6. 创建主应用组件
  - [x] 6.1 创建 `src/App.jsx` 主游戏逻辑
    - 实现游戏状态管理（start、playing）
    - 实现回合逻辑（随机选择目标颜色、生成萝卜）
    - 集成 AI 谜语和语音功能
    - 集成所有子组件
    - 实现分数系统
    - 实现 Magic Mode 切换
    - _Requirements: 2.4_

- [x] 7. 创建应用入口
  - [x] 7.1 创建 `src/index.css` 全局样式文件
    - 添加 Tailwind CSS 指令（@tailwind base, components, utilities）
    - 添加必要的全局样式
    - _Requirements: 6.4_
  
  - [x] 7.2 创建 `src/main.jsx` React 入口文件
    - 导入 React 和 ReactDOM
    - 导入 App 组件
    - 导入全局样式
    - 渲染 App 到 DOM
    - _Requirements: 6.1, 6.2, 6.3_

- [x] 8. Checkpoint - 验证项目结构和基本功能
  - 运行 `npm install` 安装依赖
  - 运行 `npm run dev` 启动开发服务器
  - 验证应用可以正常启动和运行
  - 验证所有组件正确渲染
  - 验证游戏交互功能正常

- [ ] 9. 编写常量配置的属性测试
  - **Property 3: 颜色配置完整性**
  - **Validates: Requirements 5.1**

- [x] 10. 编写集成测试
  - 测试组件导入和渲染
  - 测试应用启动无错误
  - _Requirements: 2.4, 2.5_

- [x] 11. 清理和优化
  - 删除原始的 `index.js` 文件
  - 检查并移除未使用的导入
  - 验证所有 TypeScript 类型提示（如果使用 JSDoc）
  - 确保代码符合 ESLint 规则

- [x] 12. Final Checkpoint - 完整功能验证
  - 确保所有测试通过
  - 验证游戏的所有功能：拔萝卜、音效、AI 谜语、语音、设置
  - 验证响应式布局在不同屏幕尺寸下正常工作
  - 如有问题，询问用户

## Notes

- 所有任务都是必需的，包括完整的测试覆盖
- 每个任务都引用了具体的需求编号以便追溯
- Checkpoint 任务确保增量验证
- 属性测试验证通用正确性属性
- 单元测试验证具体示例和边界情况
