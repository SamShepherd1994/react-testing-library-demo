import { useContext, useState } from 'react';
import { SearchContext } from '../Contexts/DefaultSearchContext';

type SearchBarProps = {
  onSearch: (search: string) => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
}: SearchBarProps) => {
  const { defaultValue } = useContext(SearchContext);
  const [search, setSearch] = useState('');

  return (
    <div className='flex flex-row'>
      <input
        data-testid='search-input'
        className={`border-2 p-2 ${
          search.length === 0 ? 'border-4 border-red-500' : ''
        }`}
        value={search ? search : defaultValue}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className='mr-1' />
      <button
        data-testid='search-button'
        className='bg-green-400 rounded-md p-2'
        onClick={() => onSearch(search)}
      >
        Search
      </button>
    </div>
  );
};
