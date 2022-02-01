import { createContext } from 'react';

type SearchState = {
  defaultValue: string;
};

const defaultSearchState: SearchState = {
  defaultValue: '',
};

export const SearchContext = createContext<SearchState>(defaultSearchState);
