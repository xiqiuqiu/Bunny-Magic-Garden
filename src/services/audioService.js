/**
 * Audio Service - 游戏音效引擎
 * 使用 Web Audio API 生成游戏音效
 */

// AudioContext 单例
let audioCtx = null;

/**
 * 获取或创建 AudioContext 实例
 * @returns {AudioContext}
 */
export const getAudioContext = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
};

/**
 * 播放游戏音效
 * @param {string} type - 音效类型: 'stretch' | 'pop' | 'morph' | 'success'
 */
export const playSound = (type) => {
  const ctx = getAudioContext();
  
  if (ctx.state === 'suspended') {
    ctx.resume();
  }
  
  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();
  osc.connect(gainNode);
  gainNode.connect(ctx.destination);
  const now = ctx.currentTime;

  if (type === 'stretch') {
    // 拉伸音效 - 上升的正弦波
    osc.type = 'sine';
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.linearRampToValueAtTime(350, now + 0.2);
    gainNode.gain.setValueAtTime(0.1, now);
    gainNode.gain.linearRampToValueAtTime(0, now + 0.2);
    osc.start(now);
    osc.stop(now + 0.2);
  } else if (type === 'pop') {
    // 弹出音效 - 快速上升的三角波
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.1);
    gainNode.gain.setValueAtTime(0.2, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    osc.start(now);
    osc.stop(now + 0.3);
  } else if (type === 'morph') {
    // 变形音效 - 下降的方波
    osc.type = 'square';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.linearRampToValueAtTime(100, now + 0.3);
    gainNode.gain.setValueAtTime(0.1, now);
    gainNode.gain.linearRampToValueAtTime(0, now + 0.3);
    osc.start(now);
    osc.stop(now + 0.3);
  } else if (type === 'success') {
    // 成功音效 - 三个上升的音符
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
    notes.forEach((freq, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.connect(g);
      g.connect(ctx.destination);
      o.frequency.value = freq;
      g.gain.setValueAtTime(0.1, now + i * 0.1);
      g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.4);
      o.start(now + i * 0.1);
      o.stop(now + i * 0.1 + 0.4);
    });
  }
};
