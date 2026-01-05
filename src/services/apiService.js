/**
 * API Service - AI 服务层
 * 处理 Google Gemini 和阿里云 Qwen 的 API 调用
 */

import { addWavHeader, base64ToArrayBuffer } from "../utils/audioHelpers";
import { DEFAULT_GOOGLE_KEY, DEFAULT_QWEN_KEY } from "../constants/config";

// --- Google Gemini Logic ---

/**
 * 使用 Google Gemini 生成谜语
 * @param {string} color - 目标颜色
 * @param {string} key - Google API 密钥
 * @returns {Promise<string|null>} - 生成的谜语文本或 null
 */
export const generateRiddleGoogle = async (color, key) => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${key}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a cute bunny in a game for toddlers. 
                     Write a very short, simple, 1-sentence riddle asking for a ${color} carrot. 
                     Do NOT use the word "${color}". 
                     Use simple objects like sun, sky, apple, grass, grapes.
                     Example for red: "I want something the color of an apple!"
                     Keep it under 10 words.`,
                },
              ],
            },
          ],
        }),
      }
    );
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
  } catch (e) {
    console.error("Google Text Gen Error:", e);
    return null;
  }
};

/**
 * 使用 Google Gemini TTS 生成语音
 * @param {string} text - 要转换的文本
 * @param {string} key - Google API 密钥
 * @returns {Promise<string|null>} - 音频 URL 或 null
 */
export const generateSpeechGoogle = async (text, key) => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${key}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: text }] }],
          generationConfig: {
            responseModalities: ["AUDIO"],
            speechConfig: {
              voiceConfig: { prebuiltVoiceConfig: { voiceName: "Kore" } },
            },
          },
        }),
      }
    );
    const data = await response.json();
    const inlineData = data.candidates?.[0]?.content?.parts?.[0]?.inlineData;
    if (inlineData) {
      const mimeType = inlineData.mimeType || "audio/L16; rate=24000";
      const sampleRateMatch = mimeType.match(/rate=(\d+)/);
      const sampleRate = sampleRateMatch
        ? parseInt(sampleRateMatch[1], 10)
        : 24000;
      const pcmData = base64ToArrayBuffer(inlineData.data);
      const wavBlob = addWavHeader(pcmData, sampleRate);
      return URL.createObjectURL(wavBlob);
    }
    return null;
  } catch (e) {
    console.error("Google TTS Error:", e);
    return null;
  }
};

// --- Alibaba Qwen Logic ---

/**
 * 使用阿里云 Qwen 生成谜语
 * @param {string} color - 目标颜色
 * @param {string} key - Qwen API 密钥
 * @returns {Promise<string|null>} - 生成的谜语文本或 null
 */
export const generateRiddleQwen = async (color, key) => {
  try {
    const response = await fetch(
      `https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          model: "qwen-flash",
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant for kids.",
            },
            {
              role: "user",
              // content: `You are a cute bunny. Write a very short, simple, 1-sentence riddle asking for a ${color} carrot. Do NOT use the word "${color}". Use simple objects. Keep it under 10 words. Output English only.`,
              content: `
              # Role: The Playful Bunny Riddle Master
              ## Profile
              - language: English
              - description: A whimsical and adorable rabbit expert in crafting ultra-short, metaphorical riddles about colorful treats.
              - background: Hailing from a magical meadow where carrots come in every hue, this bunny communicates through simple imagery to help others identify its favorite snacks.
              - personality: Sweet, innocent, playful, and highly disciplined in brevity.
              - expertise: Minimalist creative writing, color-based symbolism, and child-friendly linguistics.
              - target_audience: Children, puzzle enthusiasts, and users seeking concise creative content.

              ## Skills

              1. Micro-Creative Writing
                - Word Count Precision: Ability to convey complex ideas in fewer than 10 words.
                - Sentence Structuring: Mastering the art of the single-sentence narrative.
                - Metaphorical Mapping: Linking colors to common physical objects without naming the color itself.
                - Simple Vocabulary: Using high-frequency words accessible to all ages.

              2. Riddle Engineering
                - Conceptual Masking: Describing an attribute while strictly avoiding specific forbidden keywords.
                - Logical Association: Creating clear links between a carrot and a reference object.
                - Tone Infusion: Maintaining a "cute" and "bunny-like" persona through word choice.
                - Constraint Satisfaction: Operating within strict linguistic boundaries and formatting rules.

              ## Rules

              1. Basic principles:
                - Absolute Brevity: Every response must be as short as possible.
                - Simple Imagery: Only use objects that a small child would recognize.
                - Thematic Consistency: Always maintain the persona of a bunny looking for a carrot.
                - Clarity: Ensure the riddle is solvable despite its length.

              2. Behavioral guidelines:
                - Cute Persona: Use a gentle and friendly tone.
                - Direct Execution: Provide the riddle immediately without unnecessary chatter.
                - Object-Oriented: Focus on "things" rather than "concepts" to describe colors.
                - English Supremacy: Use only English regardless of the input language.

              3. Constraints:
                - Forbidden Words: Never use the actual name of the ${color} in the output.
                - Word Limit: The output must be strictly under 10 words.
                - Sentence Limit: The output must be exactly one sentence long.
                - Content Limit: Do not provide answers or explanations, only the riddle.

              ## Workflows

              - Goal: Generate a 1-sentence riddle for a ${color} carrot under 10 words.
              - Step 1: Analyze the provided ${color} and identify a simple, universally recognized object of that color (e.g., Sun, Sky, Grass).
              - Step 2: Construct a single sentence asking for the carrot by referencing that object.
              - Step 3: Audit the draft to ensure the forbidden color name is absent and the word count is less than 10.
              - Step 4: Finalize the cute bunny-themed output.
              - Expected result: A simple, cute, 1-sentence riddle under 10 words describing a ${color} carrot through an object.

              ## Initialization
              As The Playful Bunny Riddle Master, you must follow the above Rules and execute tasks according to Workflows. Please provide the riddle for the ${color} carrot now.`,
            },
          ],
        }),
      }
    );
    const data = await response.json();
    // OpenAI 兼容格式: data.choices[0].message.content
    return data.choices?.[0]?.message?.content || null;
  } catch (e) {
    console.error("Qwen Text Gen Error:", e);
    return null;
  }
};

/**
 * 使用阿里云 Qwen TTS 生成语音
 * @param {string} text - 要转换的文本
 * @param {string} key - Qwen API 密钥
 * @returns {Promise<string|null>} - 音频 URL 或 null
 */
export const generateSpeechQwen = async (text, key) => {
  try {
    // 使用 Vite 代理绕过 CORS 限制
    const response = await fetch(
      `/api/qwen-tts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          model: "qwen3-tts-flash",
          input: {
            text: text,
            voice: "Sunny",
            language_type: "English",
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Qwen TTS API Error Details:", errText);
      throw new Error(`Qwen TTS Failed: ${response.status} - ${errText}`);
    }

    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (e) {
    console.error("Qwen TTS Error:", e);
    return null;
  }
};

// --- Unified API Dispatcher ---

/**
 * 统一的谜语生成函数
 * @param {string} provider - 'google' | 'qwen'
 * @param {string} color - 目标颜色
 * @param {Object} keys - API 密钥对象 { google: string, qwen: string }
 * @returns {Promise<string|null>} - 生成的谜语文本或 null
 */
export const generateRiddle = async (provider, color, keys) => {
  if (provider === "google") {
    return generateRiddleGoogle(color, keys.google || DEFAULT_GOOGLE_KEY);
  } else if (provider === "qwen") {
    return generateRiddleQwen(color, keys.qwen || DEFAULT_QWEN_KEY);
  }
  return null;
};

/**
 * 统一的语音生成函数
 * @param {string} provider - 'google' | 'qwen'
 * @param {string} text - 要转换的文本
 * @param {Object} keys - API 密钥对象 { google: string, qwen: string }
 * @returns {Promise<string|null>} - 音频 URL 或 null
 */
export const generateSpeech = async (provider, text, keys) => {
  if (provider === "google") {
    return generateSpeechGoogle(text, keys.google || DEFAULT_GOOGLE_KEY);
  } else if (provider === "qwen") {
    return generateSpeechQwen(text, keys.qwen || DEFAULT_QWEN_KEY);
  }
  return null;
};
