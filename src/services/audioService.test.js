/**
 * Property-based tests for audioService
 * 
 * **Feature: react-project-migration, Property 2: Audio Service 音效类型完整性**
 * **Validates: Requirements 3.7**
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as fc from 'fast-check';
import { playSound, getAudioContext } from './audioService';

// Mock Web Audio API for testing
const mockOscillator = {
  connect: vi.fn(),
  frequency: {
    value: 0,
    setValueAtTime: vi.fn(),
    linearRampToValueAtTime: vi.fn(),
    exponentialRampToValueAtTime: vi.fn(),
  },
  type: 'sine',
  start: vi.fn(),
  stop: vi.fn(),
};

const mockGainNode = {
  connect: vi.fn(),
  gain: {
    setValueAtTime: vi.fn(),
    linearRampToValueAtTime: vi.fn(),
    exponentialRampToValueAtTime: vi.fn(),
  },
};

const mockAudioContext = {
  state: 'running',
  currentTime: 0,
  destination: {},
  resume: vi.fn(),
  createOscillator: vi.fn(() => ({ ...mockOscillator })),
  createGain: vi.fn(() => ({ ...mockGainNode })),
};

// Setup global AudioContext mock
beforeEach(() => {
  vi.stubGlobal('AudioContext', vi.fn(() => mockAudioContext));
  vi.stubGlobal('webkitAudioContext', vi.fn(() => mockAudioContext));
});

describe('audioService', () => {
  describe('getAudioContext', () => {
    it('should return an AudioContext instance', () => {
      const ctx = getAudioContext();
      expect(ctx).toBeDefined();
    });
  });

  describe('playSound - Property 2: Audio Service 音效类型完整性', () => {
    /**
     * Property 2: Audio Service 音效类型完整性
     * *For any* valid sound type in the set {'stretch', 'pop', 'morph', 'success'},
     * calling `playSound(type)` SHALL not throw an error and SHALL execute without exceptions.
     * 
     * **Validates: Requirements 3.7**
     */
    it('should not throw for any valid sound type', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('stretch', 'pop', 'morph', 'success'),
          (soundType) => {
            // Should not throw an error
            expect(() => playSound(soundType)).not.toThrow();
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should handle all four sound types without errors', () => {
      const validSoundTypes = ['stretch', 'pop', 'morph', 'success'];
      
      validSoundTypes.forEach((type) => {
        expect(() => playSound(type)).not.toThrow();
      });
    });
  });
});
