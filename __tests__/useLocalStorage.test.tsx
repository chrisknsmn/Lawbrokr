import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

describe('useLocalStorage Hook', () => {
  // Mock localStorage
  const localStorageMock = (() => {
    let store: Record<string, string> = {};

    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
  })();

  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });
  });

  beforeEach(() => {
    localStorageMock.clear();
  });

  describe('Initial Value', () => {
    it('should return initial value when localStorage is empty', () => {
      const { result } = renderHook(() => useLocalStorage('test-key', 'initial-value'));
      const [value] = result.current;

      expect(value).toBe('initial-value');
    });

    it('should return stored value when localStorage has data', () => {
      localStorageMock.setItem('test-key', JSON.stringify('stored-value'));

      const { result } = renderHook(() => useLocalStorage('test-key', 'initial-value'));
      const [value] = result.current;

      expect(value).toBe('stored-value');
    });

    it('should handle complex objects as initial value', () => {
      const initialObject = { name: 'Test', count: 42 };
      const { result } = renderHook(() => useLocalStorage('test-key', initialObject));
      const [value] = result.current;

      expect(value).toEqual(initialObject);
    });

    it('should return initial value if localStorage contains invalid JSON', () => {
      localStorageMock.setItem('test-key', 'invalid-json-{');

      const { result } = renderHook(() => useLocalStorage('test-key', 'fallback'));
      const [value] = result.current;

      expect(value).toBe('fallback');
    });
  });

  describe('Setting Value', () => {
    it('should update state and localStorage when value is set', () => {
      const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

      act(() => {
        const [, setValue] = result.current;
        setValue('new-value');
      });

      const [value] = result.current;
      expect(value).toBe('new-value');
      expect(JSON.parse(localStorageMock.getItem('test-key')!)).toBe('new-value');
    });

    it('should handle setting complex objects', () => {
      const { result } = renderHook(() => useLocalStorage<{ id: number; name: string }>('test-key', { id: 1, name: 'Test' }));

      act(() => {
        const [, setValue] = result.current;
        setValue({ id: 2, name: 'Updated' });
      });

      const [value] = result.current;
      expect(value).toEqual({ id: 2, name: 'Updated' });
      expect(JSON.parse(localStorageMock.getItem('test-key')!)).toEqual({ id: 2, name: 'Updated' });
    });

    it('should handle functional updates', () => {
      const { result } = renderHook(() => useLocalStorage('test-key', 10));

      act(() => {
        const [, setValue] = result.current;
        setValue((prev) => prev + 5);
      });

      const [value] = result.current;
      expect(value).toBe(15);
      expect(JSON.parse(localStorageMock.getItem('test-key')!)).toBe(15);
    });

    it('should handle arrays', () => {
      const { result } = renderHook(() => useLocalStorage<number[]>('test-key', []));

      act(() => {
        const [, setValue] = result.current;
        setValue([1, 2, 3]);
      });

      const [value] = result.current;
      expect(value).toEqual([1, 2, 3]);
      expect(JSON.parse(localStorageMock.getItem('test-key')!)).toEqual([1, 2, 3]);
    });
  });

  describe('Removing Value', () => {
    it('should remove value from localStorage and reset to initial value', () => {
      const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

      // Set a value first
      act(() => {
        const [, setValue] = result.current;
        setValue('updated');
      });

      expect(localStorageMock.getItem('test-key')).toBeTruthy();

      // Remove the value
      act(() => {
        const [, , removeValue] = result.current;
        removeValue();
      });

      const [value] = result.current;
      expect(value).toBe('initial');
      expect(localStorageMock.getItem('test-key')).toBeNull();
    });

    it('should handle removing non-existent keys gracefully', () => {
      const { result } = renderHook(() => useLocalStorage('non-existent', 'default'));

      act(() => {
        const [, , removeValue] = result.current;
        removeValue();
      });

      const [value] = result.current;
      expect(value).toBe('default');
    });
  });

  describe('Type Safety', () => {
    it('should maintain type safety with TypeScript', () => {
      interface TestData {
        id: number;
        name: string;
        active: boolean;
      }

      const initialData: TestData = { id: 1, name: 'Test', active: true };
      const { result } = renderHook(() => useLocalStorage<TestData>('test-key', initialData));

      act(() => {
        const [, setValue] = result.current;
        setValue({ id: 2, name: 'Updated', active: false });
      });

      const [value] = result.current;
      expect(value.id).toBe(2);
      expect(value.name).toBe('Updated');
      expect(value.active).toBe(false);
    });
  });

  describe('Edge Cases', () => {
    it('should handle null initial value', () => {
      const { result } = renderHook(() => useLocalStorage<string | null>('test-key', null));
      const [value] = result.current;

      expect(value).toBeNull();
    });

    it('should handle undefined in functional update', () => {
      const { result } = renderHook(() => useLocalStorage<number | undefined>('test-key', undefined));

      act(() => {
        const [, setValue] = result.current;
        setValue(42);
      });

      const [value] = result.current;
      expect(value).toBe(42);
    });

    it('should persist data across hook remounts', () => {
      const { result: result1 } = renderHook(() => useLocalStorage('test-key', 'initial'));

      act(() => {
        const [, setValue] = result1.current;
        setValue('persisted');
      });

      // Simulate unmount and remount
      const { result: result2 } = renderHook(() => useLocalStorage('test-key', 'initial'));
      const [value] = result2.current;

      expect(value).toBe('persisted');
    });
  });
});
