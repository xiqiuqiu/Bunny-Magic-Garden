/**
 * Storage Service - 本地存储服务
 * 处理 API 配置的持久化存储
 */

const STORAGE_KEY = 'jelly-garden-api-config';

/**
 * 保存 API 配置到 localStorage
 * @param {Object} config - API 配置对象
 */
export const saveApiConfig = (config) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save API config:', e);
  }
};

/**
 * 从 localStorage 读取 API 配置
 * @returns {Object|null} - API 配置对象或 null
 */
export const loadApiConfig = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (e) {
    console.error('Failed to load API config:', e);
    return null;
  }
};

/**
 * 清除存储的 API 配置
 */
export const clearApiConfig = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear API config:', e);
  }
};
