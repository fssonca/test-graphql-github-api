import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import Forkcount from '../components/forkcount';

import Starcount from '../components/starcount';

const timeout = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

describe('testing layout components', () => {
  test('type something in the Search input and check if changes the query value', async () => {
    // eslint-disable-next-line react/react-in-jsx-scope
    render(<App />);

    // mocking timer to wait for the initial delay (fetching API request)
    await waitFor(
        async () => {
          await timeout(2500);
        },
        {timeout: 3000},
    );

    const searchInput = screen.getByTestId('search-input').childNodes[1];

    userEvent.clear(searchInput);
    userEvent.type(searchInput, 'node');

    await waitFor(async () => {
      // handleSearchInput in src/Table/index.tsx has a timer of 250ms
      await timeout(250);
    });

    const subtitle = await screen.findByTestId('subtitle-showing-results');

    expect(subtitle.textContent).toBe('Showing results for "node"');
  });

  test('Starcount shows correct number', () => {
    // eslint-disable-next-line react/react-in-jsx-scope
    render(<Starcount starCount={12345} />);

    const elem = screen.getByTestId('stars-count');

    expect(elem.textContent).toBe('12.3k');
  });

  test('Forkcount shows correct number', () => {
    // eslint-disable-next-line react/react-in-jsx-scope
    render(<Forkcount forkCount={12345} />);

    const elem = screen.getByTestId('fork-count');

    expect(elem.textContent).toBe('12.3k');
  });
});
