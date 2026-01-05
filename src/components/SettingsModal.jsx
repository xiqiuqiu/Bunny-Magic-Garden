import { motion } from 'framer-motion';
import { LucideSettings, LucideX, LucideKey, LucideGlobe, LucideBot } from 'lucide-react';

/**
 * SettingsModal 设置弹窗组件
 * @param {Object} props
 * @param {boolean} props.isOpen - 是否显示弹窗
 * @param {function} props.onClose - 关闭回调
 * @param {Object} props.config - API 配置对象 { provider, googleKey, qwenKey }
 * @param {function} props.setConfig - 配置更新函数
 */
export function SettingsModal({ isOpen, onClose, config, setConfig }) {
  if (!isOpen) return null;

  const handleProviderChange = (provider) => {
    setConfig({ ...config, provider });
  };

  const handleKeyChange = (e) => {
    const value = e.target.value;
    if (config.provider === 'google') {
      setConfig({ ...config, googleKey: value });
    } else {
      setConfig({ ...config, qwenKey: value });
    }
  };

  const currentKey = config.provider === 'google' ? config.googleKey : config.qwenKey;
  const placeholder = config.provider === 'google' ? "AIzaSy..." : "sk-...";
  const keyLabel = config.provider === 'google' 
    ? 'Google Gemini API Key' 
    : 'Alibaba DashScope API Key';
  const keyHint = config.provider === 'google' 
    ? "Used for Gemini Flash & Gemini TTS." 
    : "Used for Qwen-Turbo & CosyVoice TTS.";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-6 rounded-3xl w-80 shadow-2xl relative"
      >
        {/* 关闭按钮 */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
        >
          <LucideX size={24} />
        </button>

        {/* 标题 */}
        <div className="flex items-center gap-2 mb-4 text-slate-700">
          <LucideSettings className="text-orange-500" />
          <h2 className="text-xl font-bold">Game Settings</h2>
        </div>
        
        {/* 提供商切换 */}
        <ProviderToggle 
          provider={config.provider} 
          onChange={handleProviderChange} 
        />

        {/* API 密钥输入 */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">
            {keyLabel}
          </label>
          <div className="relative">
            <LucideKey size={16} className="absolute left-3 top-3.5 text-slate-400" />
            <input 
              type="password" 
              placeholder={placeholder}
              value={currentKey}
              onChange={handleKeyChange}
              className="w-full pl-10 pr-3 py-3 border-2 border-slate-200 rounded-xl focus:border-orange-400 outline-none text-sm transition-colors"
            />
          </div>
          <p className="text-[10px] text-slate-400 mt-2 leading-tight">
            {keyHint}
          </p>
        </div>

        {/* 保存按钮 */}
        <button 
          onClick={onClose}
          className="w-full py-3 bg-orange-500 text-white font-bold rounded-xl active:scale-95 transition-transform"
        >
          Save & Close
        </button>
      </motion.div>
    </div>
  );
}


/**
 * 提供商切换组件
 * @param {Object} props
 * @param {string} props.provider - 当前提供商 ('google' | 'qwen')
 * @param {function} props.onChange - 切换回调
 */
function ProviderToggle({ provider, onChange }) {
  return (
    <div className="flex bg-slate-100 rounded-xl p-1 mb-6">
      <button 
        onClick={() => onChange('google')}
        className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${
          provider === 'google' 
            ? 'bg-white shadow-sm text-blue-600' 
            : 'text-slate-500'
        }`}
      >
        <LucideBot size={16} /> Google
      </button>
      <button 
        onClick={() => onChange('qwen')}
        className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${
          provider === 'qwen' 
            ? 'bg-white shadow-sm text-purple-600' 
            : 'text-slate-500'
        }`}
      >
        <LucideGlobe size={16} /> Qwen
      </button>
    </div>
  );
}

export default SettingsModal;
