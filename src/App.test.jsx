/**
 * Integration tests for the JellyGarden application
 * 
 * Tests component imports and rendering, and application startup
 * **Validates: Requirements 2.4, 2.5**
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock Web Audio API
const mockOscillator = {
  connect: vi.fn(),
  frequency: { value: 0, setValueAtTime: vi.fn(), linearRampToValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
  type: 'sine',
  start: vi.fn(),
  stop: vi.fn(),
};

const mockGainNode = {
  connect: vi.fn(),
  gain: { setValueAtTime: vi.fn(), linearRampToValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
};

const mockAudioContext = {
  state: 'running',
  currentTime: 0,
  destination: {},
  resume: vi.fn(),
  createOscillator: vi.fn(() => ({ ...mockOscillator })),
  createGain: vi.fn(() => ({ ...mockGainNode })),
};

beforeEach(() => {
  vi.stubGlobal('AudioContext', vi.fn(() => mockAudioContext));
  vi.stubGlobal('webkitAudioContext', vi.fn(() => mockAudioContext));
});

describe('Integration Tests', () => {
  describe('Component Imports', () => {
    it('should import JellyCarrot component without errors', async () => {
      const { JellyCarrot } = await import('./components/JellyCarrot');
      expect(JellyCarrot).toBeDefined();
      expect(typeof JellyCarrot).toBe('function');
    });

    it('should import JellyBunny component without errors', async () => {
      const { JellyBunny } = await import('./components/JellyBunny');
      expect(JellyBunny).toBeDefined();
      expect(typeof JellyBunny).toBe('function');
    });

    it('should import SettingsModal component without errors', async () => {
      const { SettingsModal } = await import('./components/SettingsModal');
      expect(SettingsModal).toBeDefined();
      expect(typeof SettingsModal).toBe('function');
    });

    it('should import App component without errors', async () => {
      const App = (await import('./App')).default;
      expect(App).toBeDefined();
      expect(typeof App).toBe('function');
    });
  });

  describe('Application Startup', () => {
    it('should render App without throwing errors', async () => {
      const App = (await import('./App')).default;
      expect(() => render(<App />)).not.toThrow();
    });

    it('should display the Start Game button on initial render', async () => {
      const App = (await import('./App')).default;
      render(<App />);
      expect(screen.getByText('Start Game!')).toBeInTheDocument();
    });

    it('should display the score counter', async () => {
      const App = (await import('./App')).default;
      render(<App />);
      expect(screen.getByText(/🥕 0/)).toBeInTheDocument();
    });

    it('should display the AI Riddles toggle', async () => {
      const App = (await import('./App')).default;
      render(<App />);
      expect(screen.getByText('✨')).toBeInTheDocument();
    });
  });

  describe('Component Rendering', () => {
    it('should render JellyBunny with default props', async () => {
      const { JellyBunny } = await import('./components/JellyBunny');
      expect(() => render(<JellyBunny />)).not.toThrow();
    });

    it('should render JellyBunny with text prop', async () => {
      const { JellyBunny } = await import('./components/JellyBunny');
      render(<JellyBunny text="Hello!" emotion="idle" />);
      expect(screen.getByText('Hello!')).toBeInTheDocument();
    });

    it('should render SettingsModal when open', async () => {
      const { SettingsModal } = await import('./components/SettingsModal');
      const mockConfig = { provider: 'google', googleKey: '', qwenKey: '' };
      render(
        <SettingsModal 
          isOpen={true} 
          onClose={() => {}} 
          config={mockConfig} 
          setConfig={() => {}} 
        />
      );
      expect(screen.getByText('Game Settings')).toBeInTheDocument();
    });

    it('should not render SettingsModal when closed', async () => {
      const { SettingsModal } = await import('./components/SettingsModal');
      const mockConfig = { provider: 'google', googleKey: '', qwenKey: '' };
      const { container } = render(
        <SettingsModal 
          isOpen={false} 
          onClose={() => {}} 
          config={mockConfig} 
          setConfig={() => {}} 
        />
      );
      expect(container.firstChild).toBeNull();
    });
  });
});
