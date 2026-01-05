import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playSound } from '../services/audioService';
import { CARROT_COLORS } from '../constants/colors';

/**
 * JellyCarrot 萝卜组件
 * @param {Object} props
 * @param {string} props.color - 萝卜颜色 ('red' | 'blue' | 'yellow' | 'purple')
 * @param {boolean} props.isTarget - 是否为目标萝卜
 * @param {function} props.onClick - 点击回调 (isSuccess: boolean, color: string) => void
 */
export function JellyCarrot({ color, isTarget, onClick }) {
  // 状态: 'planted' | 'pulling' | 'popped' | 'morphing'
  const [status, setStatus] = useState('planted');
  
  const currentStyle = CARROT_COLORS[color] || CARROT_COLORS.red;

  const handlePointerDown = () => {
    if (status !== 'planted') return;
    playSound('stretch');
    setStatus('pulling');
  };

  const handlePointerUp = () => {
    if (status !== 'pulling') return;
    if (isTarget) {
      setStatus('popped');
      playSound('pop');
      onClick(true, color);
    } else {
      setStatus('morphing');
      playSound('morph');
      setTimeout(() => onClick(false, color), 1500);
    }
  };

  const handlePointerLeave = () => {
    if (status === 'pulling') {
      setStatus('planted');
    }
  };

  return (
    <div className="relative flex justify-center items-end h-48 w-32 mx-2 select-none">
      <AnimatePresence>
        {(status === 'planted' || status === 'pulling') && (
          <motion.div
            key="carrot-base"
            className="absolute bottom-0 cursor-pointer touch-manipulation"
            initial={{ y: 50 }}
            animate={status === 'pulling' 
              ? { y: 0, scaleY: 1.3, scaleX: 0.8 } 
              : { y: 50, scaleY: 1, scaleX: 1 }
            }
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerLeave}
          >
            {/* 萝卜叶子 */}
            <motion.div 
              className={`w-16 h-16 ${currentStyle.leaf} rounded-full absolute -top-8 left-1/2 -translate-x-1/2 z-10`}
              style={{ boxShadow: 'inset 5px 5px 10px rgba(255,255,255,0.5), inset -5px -5px 10px rgba(0,0,0,0.1)' }}
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
            {/* 萝卜身体 */}
            <div 
              className={`w-20 h-32 ${currentStyle.body} rounded-b-[3rem] rounded-t-[2rem] relative overflow-hidden`}
              style={{ boxShadow: 'inset 10px 10px 20px rgba(255,255,255,0.4), inset -5px -5px 15px rgba(0,0,0,0.2), 0 10px 20px rgba(0,0,0,0.1)' }}
            >
              {/* 高光 */}
              <div className="absolute top-4 left-3 w-4 h-12 bg-white/40 rounded-full blur-[2px]" />
              {/* 眼睛 */}
              <div className="absolute top-10 left-1/2 -translate-x-1/2 flex gap-4 opacity-50">
                <div className="w-2 h-2 bg-black rounded-full" />
                <div className="w-2 h-2 bg-black rounded-full" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 弹出状态动画 */}
      <AnimatePresence>
        {status === 'popped' && (
          <motion.div
            key="carrot-popped"
            className={`absolute z-20 w-16 h-24 ${currentStyle.body} rounded-full`}
            initial={{ y: 0, scale: 0.8 }}
            animate={{ y: -300, x: 150, rotate: 360, scale: 0.2, opacity: 0 }}
            transition={{ duration: 0.8, ease: "backIn" }}
          >
            <div className={`absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 ${currentStyle.leaf} rounded-full`} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 变形状态动画 - 萝卜变成小鸟飞走 */}
      <AnimatePresence>
        {status === 'morphing' && (
          <motion.div
            key="carrot-morph"
            className="absolute bottom-10 z-30 flex flex-col items-center"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ y: -400, x: -50, rotate: 15, scale: 1.1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3, ease: "easeOut" }}
          >
            <div 
              className={`w-24 h-24 ${currentStyle.body} rounded-full relative flex items-center justify-center`}
              style={{ boxShadow: 'inset 8px 8px 15px rgba(255,255,255,0.5)' }}
            >
              {/* 左翅膀 */}
              <motion.div 
                className={`absolute -left-4 w-8 h-6 ${currentStyle.body} rounded-full`} 
                animate={{ rotate: [-20, 20] }} 
                transition={{ repeat: Infinity, duration: 0.2, repeatType: "reverse" }} 
              />
              {/* 右翅膀 */}
              <motion.div 
                className={`absolute -right-4 w-8 h-6 ${currentStyle.body} rounded-full`} 
                animate={{ rotate: [20, -20] }} 
                transition={{ repeat: Infinity, duration: 0.2, repeatType: "reverse" }} 
              />
              {/* 眼睛 */}
              <div className="w-2 h-2 bg-black rounded-full absolute top-8 left-6" />
              <div className="w-2 h-2 bg-black rounded-full absolute top-8 right-6" />
              {/* 嘴巴 */}
              <div className="w-4 h-4 bg-orange-300 rounded-full absolute top-10" />
            </div>
            {/* 尾巴 */}
            <div className="w-0.5 h-16 bg-white/50" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 地面阴影 */}
      <div className="absolute bottom-0 w-24 h-6 bg-amber-900/20 rounded-[100%] blur-sm z-0" />
    </div>
  );
}

export default JellyCarrot;
