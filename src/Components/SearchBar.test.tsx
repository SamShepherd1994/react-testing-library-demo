/* eslint-disable testing-library/prefer-screen-queries */
import { fireEvent } from '@testing-library/react';
import { customRender } from '../__test__/TestUtils';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  it('is in the document', () => {
    const { queryByTestId } = customRender(<SearchBar onSearch={() => {}} />);
    const Input = queryByTestId('search-input') as HTMLInputElement;
    expect(Input).toBeInTheDocument();
  });

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
    fireEvent.click(Button);

    expect(callbackSpy).toHaveBeenCalledWith('search change');
  });

  it('matches snapshot before and after user input', () => {
    const { asFragment, queryByTestId } = customRender(
      <SearchBar onSearch={() => {}} />
    );
    expect(asFragment()).toMatchSnapshot();

    const Input = queryByTestId('search-input') as HTMLInputElement;
    if (!Input) {
      throw new Error('Could not find Search Input.');
    }

    fireEvent.change(Input, { target: { value: 'updated' } });

    expect(asFragment()).toMatchSnapshot();
  });
});
