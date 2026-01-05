import { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { LucideSettings } from 'lucide-react';

// Components
import { JellyCarrot } from './components/JellyCarrot';
import { JellyBunny } from './components/JellyBunny';
import { SettingsModal } from './components/SettingsModal';

// Services
import { generateRiddle, generateSpeech } from './services/apiService';
import { playSound, getAudioContext } from './services/audioService';

/**
 * JellyGarden - 拔萝卜游戏主应用组件
 * 实现游戏状态管理、回合逻辑、AI 谜语和语音功能
 */
export default function App() {
  // 游戏状态: 'start' | 'playing'
  const [gameState, setGameState] = useState('start');
  // 目标颜色
  const [targetColor, setTargetColor] = useState('red');
  // 当前回合的萝卜列表
  const [carrots, setCarrots] = useState([]);
  // 兔子状态
  const [bunnyState, setBunnyState] = useState({ emotion: 'idle', text: "Ready?" });
  // 分数
  const [score, setScore] = useState(0);
  // Magic Mode (AI 谜语模式)
  const [isMagicMode, setIsMagicMode] = useState(false);
  // 是否正在处理 AI 请求
  const [isProcessing, setIsProcessing] = useState(false);
  
  // 设置弹窗状态
  const [showSettings, setShowSettings] = useState(false);
  // API 配置
  const [apiConfig, setApiConfig] = useState({
    provider: 'google', // 'google' | 'qwen'
    googleKey: "",
    qwenKey: ""
  });

  // 可选颜色
  const colorOptions = ['red', 'blue', 'yellow', 'purple'];

  /**
   * 播放音频数据
   * @param {string} audioUrl - 音频 URL
   */
  const playAudioData = (audioUrl) => {
    try {
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (e) {
      console.error("Audio Play Error", e);
    }
  };

  /**
   * 开始新回合
   */
  const startRound = async () => {
    // 随机选择目标颜色
    const newTarget = colorOptions[Math.floor(Math.random() * colorOptions.length)];
    setTargetColor(newTarget);
    
    // 生成 3 个萝卜，包含目标颜色
    let roundColors = [newTarget];
    while (roundColors.length < 3) {
      const rand = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      if (!roundColors.includes(rand)) roundColors.push(rand);
    }
    // 随机排序
    roundColors.sort(() => Math.random() - 0.5);
    setCarrots(roundColors.map((c, i) => ({ id: i, color: c, key: Math.random() })));
    
    if (isMagicMode) {
      // AI 模式：生成谜语和语音
      setIsProcessing(true);
      setBunnyState({ emotion: 'idle', text: "" });
      
      const riddle = await generateRiddle(
        apiConfig.provider, 
        newTarget, 
        { google: apiConfig.googleKey, qwen: apiConfig.qwenKey }
      );
      const finalText = riddle || `I want a ${newTarget.toUpperCase()} carrot!`;
      
      if (riddle) {
        const audioUrl = await generateSpeech(
          apiConfig.provider, 
          finalText, 
          { google: apiConfig.googleKey, qwen: apiConfig.qwenKey }
        );
        if (audioUrl) playAudioData(audioUrl);
      }
      
      setBunnyState({ emotion: 'idle', text: finalText });
      setIsProcessing(false);
    } else {
      // 普通模式：直接显示目标颜色
      setBunnyState({ emotion: 'idle', text: `I want a ${newTarget.toUpperCase()} carrot!` });
    }
  };

  /**
   * 开始游戏
   */
  const handleStart = () => {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') ctx.resume();
    setGameState('playing');
    startRound();
  };

  /**
   * 处理萝卜交互
   * @param {boolean} isSuccess - 是否选择正确
   * @param {string} colorClicked - 点击的萝卜颜色
   */
  const handleCarrotInteraction = async (isSuccess, colorClicked) => {
    if (isSuccess) {
      // 选择正确
      const successText = "Yummy! Delicious!";
      setBunnyState({ emotion: 'happy', text: successText });
      playSound('success');
      setScore(s => s + 1);
      
      if (isMagicMode) {
        const audioUrl = await generateSpeech(
          apiConfig.provider, 
          successText, 
          { google: apiConfig.googleKey, qwen: apiConfig.qwenKey }
        );
        if (audioUrl) playAudioData(audioUrl);
      }
      
      // 庆祝动画
      confetti({ 
        particleCount: 100, 
        spread: 70, 
        origin: { y: 0.6 }, 
        colors: ['#FCA5A5', '#FDE047', '#93C5FD'] 
      });
      
      // 2秒后开始新回合
      setTimeout(() => startRound(), 2000);
      
    } else {
      // 选择错误
      const failText = `Oh! That's ${colorClicked.toUpperCase()}!`;
      setBunnyState({ emotion: 'shock', text: failText });
      
      if (isMagicMode) {
        const audioUrl = await generateSpeech(
          apiConfig.provider, 
          failText, 
          { google: apiConfig.googleKey, qwen: apiConfig.qwenKey }
        );
        if (audioUrl) playAudioData(audioUrl);
      }
      
      // 2秒后恢复提示
      setTimeout(() => {
        setBunnyState({ 
          emotion: 'idle', 
          text: isMagicMode ? `Can you find the right one?` : `I still want ${targetColor.toUpperCase()}...` 
        });
      }, 2000);
    }
  };

  return (
    <div className="w-full h-screen bg-sky-100 overflow-hidden font-sans select-none touch-none">
      {/* 背景云朵装饰 */}
      <div className="absolute top-10 left-10 w-32 h-12 bg-white rounded-full blur-xl opacity-60" />
      <div className="absolute top-20 right-20 w-48 h-16 bg-white rounded-full blur-xl opacity-50" />
      
      <div className="relative z-10 flex flex-col items-center justify-between h-full py-8">
        
        {/* 顶部 UI 栏 */}
        <div className="w-full flex justify-between px-4 md:px-8 items-start">
          {/* 设置按钮 */}
          <button 
            onClick={() => setShowSettings(true)}
            className="p-3 bg-white/50 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-sm"
          >
            <LucideSettings className="text-slate-600" />
          </button>

          {/* 分数显示 */}
          <div className="bg-white/80 backdrop-blur-sm p-3 rounded-2xl shadow-sm border-2 border-white flex gap-4 items-center">
            <span className="text-orange-500 font-bold text-xl">🥕 {score}</span>
          </div>
          
          {/* Magic Mode 切换 */}
          <div 
            onClick={() => setIsMagicMode(!isMagicMode)}
            className={`cursor-pointer px-4 py-2 rounded-full border-2 transition-all flex items-center gap-2 shadow-sm ${
              isMagicMode 
                ? 'bg-purple-100 border-purple-400 text-purple-700' 
                : 'bg-white/80 border-white text-slate-400'
            }`}
          >
            <span className="text-xl">✨</span>
            <span className="font-bold text-sm hidden md:inline">
              {isMagicMode ? 'AI Riddles: ON' : 'AI Riddles: OFF'}
            </span>
          </div>
        </div>

        {/* 设置弹窗 */}
        <SettingsModal 
          isOpen={showSettings} 
          onClose={() => setShowSettings(false)}
          config={apiConfig}
          setConfig={setApiConfig}
        />

        {/* 兔子组件 */}
        <div className="mt-4">
          <JellyBunny 
            emotion={bunnyState.emotion} 
            text={bunnyState.text} 
            isThinking={isProcessing}
          />
        </div>

        {/* 游戏区域 */}
        <div className="w-full h-64 relative flex justify-center items-end pb-8">
          {/* 草地背景 */}
          <div className="absolute bottom-0 w-[120%] h-32 bg-gradient-to-t from-green-300 to-green-100 rounded-[50%] blur-sm -z-10" />
          
          {gameState === 'start' ? (
            // 开始按钮
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleStart}
              className="px-8 py-4 bg-orange-500 text-white text-2xl font-bold rounded-full shadow-[0_8px_0_rgb(194,65,12)] active:shadow-none active:translate-y-2 transition-all"
            >
              Start Game!
            </motion.button>
          ) : (
            // 萝卜列表
            <div className="flex justify-center items-end gap-2 md:gap-8 w-full max-w-3xl px-4">
              {carrots.map((carrot) => (
                <JellyCarrot 
                  key={carrot.key} 
                  color={carrot.color} 
                  isTarget={carrot.color === targetColor}
                  onClick={handleCarrotInteraction}
                />
              ))}
            </div>
          )}
          
          {/* 装饰性水桶 */}
          <div className="absolute right-4 bottom-4 w-24 h-24 hidden md:block opacity-80">
            <div className="w-full h-full bg-amber-200 rounded-b-3xl border-4 border-amber-400 relative">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-4 h-12 border-t-4 border-x-4 border-amber-400 rounded-t-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
