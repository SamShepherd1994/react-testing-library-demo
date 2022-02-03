import { customRender } from '../__test__/TestUtils';
import { List } from './List';

describe('List', () => {
  it('Renders No items found when list is empty', () => {
    const { asFragment } = customRender(<List items={[]} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly with single item', () => {
    const { asFragment } = customRender(
      <List items={[{ id: '1', name: 'name' }]} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly with multiple items', () => {
    const { asFragment } = customRender(
      <List
        items={[
          { id: '1', name: 'name' },
          { id: '2', name: 'name2' },
        ]}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
