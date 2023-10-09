import { render, screen as s } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Landing from "./Landing";
import Loading from "./Loading";
import App from "./App";

test('Render landing page', () => {
  render(<Landing />);
  const linkElement = s.getByText('Welcome to Michael\'s Hoenn Pokedex!');
  expect(linkElement).toBeInTheDocument();
});

test('Render loading page', () => {
  render(<Loading />);
  const linkElement = s.getByText('Loading');
  expect(linkElement).toBeInTheDocument();
});

test('Test App.js DOM', () => {
  const rend = render(<App />)
  expect(rend.getByTestId('app')).toBeValid()
})

test('Test Landing page DOM', () => {
  const rend = render(<Landing />)
  expect(rend.getByText('Welcome to Michael\'s Hoenn Pokedex!')).toBeVisible()
})

test('Test Loading page DOM', () => {
  const rend = render(<Loading />)
  expect(rend.getByText('Loading')).toBeInTheDocument()
})


/* I tried testing Pokedex and Pokemon here but I couldn't bypass the loading screen
test('Test Pokedex elements', () => {
  const rend = render(<Pokedex loading={false}/>)
  expect(rend.getByTestId('pokemon-grid')).toBeValid()
})

test('Testing Pokemon elements', () => {
  const rend = render(<Pokemon loading={false} pokedexNum={25}/>) //Fetch Pikachu
  expect(rend.getByText('Stats:')).toBeValid()
})
 */