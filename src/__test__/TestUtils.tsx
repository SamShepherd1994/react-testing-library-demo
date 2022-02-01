import { render, RenderOptions } from '@testing-library/react';
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
