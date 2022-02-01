/* eslint-disable testing-library/prefer-screen-queries */
import { fireEvent, render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactElement } from 'react';
import { SearchContext } from '../Contexts/DefaultSearchContext';
import { SearchBar } from './SearchBar';

const Providers: React.FC = ({ children }) => {
  return (
    <SearchContext.Provider
      value={{ defaultValue: 'this is not the usual default value...' }}
    >
      {children}
    </SearchContext.Provider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: Providers, ...options });

describe('SearchBar', () => {
  it('Displays the default value from context when search value does not exist', () => {
    const { queryByTestId } = customRender(<SearchBar onSearch={() => {}} />);
    const Input = queryByTestId('search-input') as HTMLInputElement;
    if (!Input) {
      throw new Error('Could not find Search Input.');
    }
    expect(Input.value).toBe('this is not the usual default value...');
  });

  it('updates value shown to value input by user', () => {
    const { queryByTestId } = customRender(<SearchBar onSearch={() => {}} />);
    const Input = queryByTestId('search-input') as HTMLInputElement;
    if (!Input) {
      throw new Error('Could not find Search Input.');
    }

    fireEvent.change(Input, { target: { value: 'updated' } });
    expect(Input.value).toBe('updated');
  });

  it('invokes callback with correct search value when user clicks search button', () => {
    const callbackSpy = jest.fn();

    const { queryByTestId } = customRender(
      <SearchBar onSearch={callbackSpy} />
    );
    const Input = queryByTestId('search-input') as HTMLInputElement;
    if (!Input) {
      throw new Error('Could not find Search Input.');
    }
    const Button = queryByTestId('search-button') as HTMLButtonElement;
    if (!Button) {
      throw new Error('Could not find Search Button.');
    }

    fireEvent.change(Input, { target: { value: 'search change' } });
    userEvent.click(Button);

    expect(callbackSpy).toHaveBeenCalledWith('search change');
  });
});
