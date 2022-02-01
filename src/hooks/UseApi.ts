import { useState } from 'react';

export const useApi = <T>(url: string) => {
  const [items, setItems] = useState<T[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);

  const loadItems = async () => {
    const res = await fetch(url);
    if (!res.ok) {
      const errorInfo = await res.json();
      setError(errorInfo['message']);
      return;
    }
    const json = await res.json();
    setItems(json['data']);
  };

  return { items, error, loadItems };
};
