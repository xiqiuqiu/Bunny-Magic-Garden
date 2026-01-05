/**
 * Property-based tests for apiService
 * 
 * **Feature: react-project-migration, Property 1: API Service 导出完整性**
 * **Validates: Requirements 3.2, 3.3, 3.4, 3.5**
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import * as apiService from './apiService';

describe('apiService', () => {
  describe('Property 1: API Service 导出完整性', () => {
    /**
     * Property 1: API Service 导出完整性
     * *For any* valid import of the apiService module, the module SHALL export
     * both `generateRiddle` and `generateSpeech` functions that are callable.
     * 
     * **Validates: Requirements 3.2, 3.3, 3.4, 3.5**
     */
    
    it('should export generateRiddle as a callable function', () => {
      expect(apiService.generateRiddle).toBeDefined();
      expect(typeof apiService.generateRiddle).toBe('function');
    });

    it('should export generateSpeech as a callable function', () => {
      expect(apiService.generateSpeech).toBeDefined();
      expect(typeof apiService.generateSpeech).toBe('function');
    });

    it('should export generateRiddleGoogle as a callable function', () => {
      expect(apiService.generateRiddleGoogle).toBeDefined();
      expect(typeof apiService.generateRiddleGoogle).toBe('function');
    });

    it('should export generateSpeechGoogle as a callable function', () => {
      expect(apiService.generateSpeechGoogle).toBeDefined();
      expect(typeof apiService.generateSpeechGoogle).toBe('function');
    });

    it('should export generateRiddleQwen as a callable function', () => {
      expect(apiService.generateRiddleQwen).toBeDefined();
      expect(typeof apiService.generateRiddleQwen).toBe('function');
    });

    it('should export generateSpeechQwen as a callable function', () => {
      expect(apiService.generateSpeechQwen).toBeDefined();
      expect(typeof apiService.generateSpeechQwen).toBe('function');
    });

    it('should have all required exports as functions for any provider', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('google', 'qwen'),
          (provider) => {
            // generateRiddle and generateSpeech should be callable with any provider
            expect(typeof apiService.generateRiddle).toBe('function');
            expect(typeof apiService.generateSpeech).toBe('function');
            
            // Provider-specific functions should exist
            if (provider === 'google') {
              expect(typeof apiService.generateRiddleGoogle).toBe('function');
              expect(typeof apiService.generateSpeechGoogle).toBe('function');
            } else if (provider === 'qwen') {
              expect(typeof apiService.generateRiddleQwen).toBe('function');
              expect(typeof apiService.generateSpeechQwen).toBe('function');
            }
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});
