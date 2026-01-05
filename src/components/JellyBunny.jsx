import { motion, AnimatePresence } from 'framer-motion';

/**
 * JellyBunny 兔子组件
 * @param {Object} props
 * @param {string} props.emotion - 表情状态 ('idle' | 'happy' | 'shock')
 * @param {string} props.text - 对话文本
 * @param {boolean} props.isThinking - 是否显示思考动画
 */
export function JellyBunny({ emotion = 'idle', text = '', isThinking = false }) {
  // 根据表情状态获取动画配置
  const getBodyAnimation = () => {
    if (emotion === 'happy') {
      return { y: [0, -20, 0], scaleX: [1, 1.1, 1], scaleY: [1, 0.9, 1] };
    }
    if (emotion === 'shock') {
      return { rotate: [-5, 5, -5, 0], scale: 1.05 };
    }
    return { y: [0, 3, 0] };
  };

  const getBodyTransition = () => {
    if (emotion === 'happy') {
      return { duration: 0.4, repeat: 2 };
    }
    return { duration: 2, repeat: Infinity };
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* 对话气泡 */}
      <AnimatePresence mode="wait">
        {(text || isThinking) && (
          <motion.div 
            key={isThinking ? "thinking" : text}
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="mb-16 bg-white px-6 py-3 rounded-2xl shadow-lg border-2 border-slate-100 relative min-w-[120px] text-center"
          >
            {isThinking ? (
              <ThinkingDots />
            ) : (
              <span className="text-xl font-bold text-slate-700">{text}</span>
            )}
            {/* 气泡尖角 */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r-2 border-b-2 border-slate-100 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 兔子身体 */}
      <motion.div 
        className="relative w-40 h-36 bg-white rounded-[40%_40%_45%_45%] z-10"
        style={{ 
          boxShadow: 'inset -10px -10px 20px #e2e8f0, inset 10px 10px 20px #ffffff, 0 10px 20px rgba(0,0,0,0.1)' 
        }}
        animate={getBodyAnimation()}
        transition={getBodyTransition()}
      >
        {/* 左耳朵 */}
        <motion.div 
          className="absolute -top-12 left-4 w-10 h-24 bg-white rounded-full border-4 border-slate-50 origin-bottom" 
          animate={{ rotate: [-5, 5] }} 
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
        >
          <div className="w-full h-full bg-pink-100 rounded-full scale-75 mt-2" />
        </motion.div>

        {/* 右耳朵 */}
        <motion.div 
          className="absolute -top-12 right-4 w-10 h-24 bg-white rounded-full border-4 border-slate-50 origin-bottom" 
          animate={{ rotate: [5, -5] }} 
          transition={{ duration: 2.2, repeat: Infinity, repeatType: 'reverse' }}
        >
          <div className="w-full h-full bg-pink-100 rounded-full scale-75 mt-2" />
        </motion.div>

        {/* 眼睛 */}
        <div className="absolute top-10 w-full flex justify-center gap-8">
          <motion.div 
            className="w-4 h-4 bg-slate-800 rounded-full" 
            animate={{ scaleY: [1, 0.1, 1] }} 
            transition={{ repeat: Infinity, delay: 2, duration: 0.2 }} 
          />
          <motion.div 
            className="w-4 h-4 bg-slate-800 rounded-full" 
            animate={{ scaleY: [1, 0.1, 1] }} 
            transition={{ repeat: Infinity, delay: 2, duration: 0.2 }} 
          />
        </div>

        {/* 鼻子和嘴巴 */}
        <div className="absolute top-16 left-1/2 -translate-x-1/2 flex flex-col items-center">
          {/* 鼻子 */}
          <div className="w-3 h-2 bg-pink-400 rounded-full mb-1" />
          {/* 嘴巴 - 根据表情变化 */}
          <BunnyMouth emotion={emotion} />
        </div>

        {/* 腮红 */}
        <div className="absolute top-14 left-4 w-6 h-4 bg-pink-200 rounded-full blur-sm opacity-60" />
        <div className="absolute top-14 right-4 w-6 h-4 bg-pink-200 rounded-full blur-sm opacity-60" />
      </motion.div>
    </div>
  );
}

/**
 * 思考动画组件 - 三个跳动的点
 */
function ThinkingDots() {
  return (
    <div className="flex justify-center gap-2 py-2">
      <motion.div 
        className="w-2 h-2 bg-pink-400 rounded-full" 
        animate={{ y: [0, -5, 0] }} 
        transition={{ repeat: Infinity, duration: 0.6 }} 
      />
      <motion.div 
        className="w-2 h-2 bg-pink-400 rounded-full" 
        animate={{ y: [0, -5, 0] }} 
        transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} 
      />
      <motion.div 
        className="w-2 h-2 bg-pink-400 rounded-full" 
        animate={{ y: [0, -5, 0] }} 
        transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} 
      />
    </div>
  );
}

/**
 * 兔子嘴巴组件 - 根据表情显示不同形状
 * @param {Object} props
 * @param {string} props.emotion - 表情状态
 */
function BunnyMouth({ emotion }) {
  if (emotion === 'happy') {
    // 开心的微笑
    return <div className="w-6 h-3 border-b-4 border-pink-400 rounded-full" />;
  }
  
  if (emotion === 'shock') {
    // 惊讶的O型嘴
    return <div className="w-4 h-4 rounded-full border-2 border-slate-800 bg-slate-800" />;
  }
  
  // 默认平静表情
  return (
    <div className="flex gap-1">
      <div className="w-3 h-3 border-b-2 border-slate-300 rounded-full" />
      <div className="w-3 h-3 border-b-2 border-slate-300 rounded-full" />
    </div>
  );
}

export default JellyBunny;
