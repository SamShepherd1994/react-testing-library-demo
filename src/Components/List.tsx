import * as React from 'react';

type ListProps = {
  items: { id: string; name: string }[];
};

export const List: React.FC<ListProps> = ({ items }: ListProps) => {
  if (items.length === 0) {
    return <div>No Items Found.</div>;
  }

  return (
    <table>
      <tbody>
        {items.map((item) => (
          <tr key={item.id.toString()}>
            <td>{item.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
