import { act, render, RenderOptions } from '@testing-library/react';
import {
  Renderer,
  renderHook,
  RenderHookOptions,
  RenderHookResult,
} from '@testing-library/react-hooks';
import { ReactElement } from 'react';
import { SearchContext } from '../Contexts/DefaultSearchContext';

const Providers: React.FC = ({ children }) => {
  return (
    <SearchContext.Provider
      value={{ defaultValue: 'this is not the usual default value...' }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: Providers, ...options });

/**
 * Can be used when rendering a hook results in an error stating that state updates must be performed in an act.
 * E.g. If a hook updates some state on initial render
 * @param hook
 * @param options
 * @returns
 */
export const renderHookInAct = async <T, R>(
  hook: (props: T) => R,
  options?: RenderHookOptions<T>
) => {
  let result: RenderHookResult<T, R, Renderer<T>> | undefined;
  await act(
    async () =>
      await new Promise((resolve) => {
        const rendered = renderHook(hook, options);
        result = rendered;
        // small timeout is used to ensure state has been updated suggested in https://github.com/testing-library/react-hooks-testing-library/issues/656
        setTimeout(resolve, 10);
      })
  );
  return result;
};
