# Requirements Document

## Introduction

将现有的单文件 React 应用（儿童拔萝卜游戏）迁移为完整的 React 项目结构。该游戏包含 AI 谜语生成、语音合成、动画效果和音效功能。目标是建立标准化的项目架构，提高代码可维护性和可扩展性。

## Glossary

- **Game_App**: 拔萝卜游戏的主应用程序
- **Carrot_Component**: 可交互的萝卜组件，支持拔出动画
- **Bunny_Component**: 兔子角色组件，显示表情和对话
- **Settings_Modal**: 设置弹窗组件，用于配置 API 密钥
- **Audio_Engine**: 音效引擎，使用 Web Audio API 生成游戏音效
- **API_Service**: AI 服务层，处理 Google Gemini 和阿里云 Qwen 的 API 调用
- **Project_Structure**: React 项目的目录和文件组织结构

## Requirements

### Requirement 1: 项目初始化

**User Story:** 作为开发者，我希望有一个标准的 React 项目结构，以便于代码管理和团队协作。

#### Acceptance Criteria

1. THE Project_Structure SHALL include a `package.json` with React, Vite, and necessary dependencies
2. THE Project_Structure SHALL include a `vite.config.js` for build configuration
3. THE Project_Structure SHALL include a `src` directory for source code
4. THE Project_Structure SHALL include an `index.html` entry point
5. THE Project_Structure SHALL include Tailwind CSS configuration files

### Requirement 2: 组件拆分

**User Story:** 作为开发者，我希望将单文件中的组件拆分为独立文件，以便于维护和复用。

#### Acceptance Criteria

1. WHEN the project is structured, THE Carrot_Component SHALL be in a separate file `src/components/JellyCarrot.jsx`
2. WHEN the project is structured, THE Bunny_Component SHALL be in a separate file `src/components/JellyBunny.jsx`
3. WHEN the project is structured, THE Settings_Modal SHALL be in a separate file `src/components/SettingsModal.jsx`
4. THE Game_App SHALL import and use all separated components correctly
5. WHEN components are separated, THE Game_App SHALL maintain all existing functionality

### Requirement 3: 服务层抽取

**User Story:** 作为开发者，我希望将 API 调用和音效逻辑抽取为独立服务，以便于测试和维护。

#### Acceptance Criteria

1. THE API_Service SHALL be in a separate file `src/services/apiService.js`
2. THE API_Service SHALL export functions for Google Gemini text generation
3. THE API_Service SHALL export functions for Google Gemini TTS
4. THE API_Service SHALL export functions for Alibaba Qwen text generation
5. THE API_Service SHALL export functions for Alibaba Qwen TTS
6. THE Audio_Engine SHALL be in a separate file `src/services/audioService.js`
7. THE Audio_Engine SHALL export the `playSound` function with all sound types

### Requirement 4: 工具函数抽取

**User Story:** 作为开发者，我希望将工具函数抽取为独立模块，以便于复用。

#### Acceptance Criteria

1. THE Project_Structure SHALL include a `src/utils/audioHelpers.js` for audio conversion utilities
2. THE `audioHelpers.js` SHALL export the `addWavHeader` function
3. THE `audioHelpers.js` SHALL export the `base64ToArrayBuffer` function

### Requirement 5: 常量和配置管理

**User Story:** 作为开发者，我希望将常量和配置集中管理，以便于修改和维护。

#### Acceptance Criteria

1. THE Project_Structure SHALL include a `src/constants/colors.js` for color configuration
2. THE Project_Structure SHALL include a `src/constants/config.js` for default API keys and settings
3. WHEN configuration is needed, THE Game_App SHALL import from constants files

### Requirement 6: 入口文件配置

**User Story:** 作为开发者，我希望有标准的应用入口配置，以便于应用正确启动。

#### Acceptance Criteria

1. THE Project_Structure SHALL include a `src/main.jsx` as the React entry point
2. THE `main.jsx` SHALL render the Game_App to the DOM
3. THE `main.jsx` SHALL import global CSS styles
4. THE Project_Structure SHALL include a `src/index.css` for global styles and Tailwind directives
