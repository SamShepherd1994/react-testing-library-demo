import { act, renderHook } from '@testing-library/react-hooks';
import { useApi } from './UseApi';

const setupFetch = (
  status?: number,
  response?: { [key: string]: any },
  ok?: boolean
) => {
  return jest.spyOn(global, 'fetch').mockImplementation(
    () =>
      new Promise((resolve) => {
        resolve({
          status: status ?? 200,
          ok: ok ?? true,
          json: () =>
            new Promise((resolve) => {
              resolve(response ?? {});
            }),
        } as any);
      })
  );
};

describe('useApi', () => {
  describe('loadItems', () => {
    it('sets defaults correctly', () => {
      const { result } = renderHook(() => useApi(''));
      expect(result.current.error).toBeUndefined();
      expect(result.current.items).toEqual([]);
    });

    it('calls fetch with the correct url', async () => {
      const url = 'test/url';
      const fetchSpy = setupFetch();

      // Never spread result -> current like the following otherwise the current object will not actually be 'current'
      // const { result: { current }} = ...
      const { result } = renderHook(() => useApi(url));

      await act(async () => {
        await result.current.loadItems();
      });

      expect(fetchSpy).toHaveBeenCalledWith(url);
    });

    it('sets the items state when loadItems is successful', async () => {
      const data = [{ id: '1' }, { id: '2' }];
      const response = { data };
      setupFetch(200, response);

      const { result } = renderHook(() => useApi(''));

      await act(async () => {
        await result.current.loadItems();
      });

      expect(result.current.items).toBe(data);
    });

    it('sets the error state correctly on error', async () => {
      const message = 'An Error';
      setupFetch(500, { message }, false);

      const { result } = renderHook(() => useApi(''));

      await act(async () => {
        await result.current.loadItems();
      });

      expect(result.current.error).toBe(message);
    });
  });
});
