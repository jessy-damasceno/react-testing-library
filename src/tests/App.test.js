import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Teste o componente <App.js />', () => {
  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const favPokeText = 'Favorite Pokémons';
    const homeLink = screen.getByRole('link', { name: 'Home' });
    const aboutLink = screen.getByRole('link', { name: 'About' });
    const FavPokeLink = screen.getByRole('link', { name: favPokeText });

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(FavPokeLink).toBeInTheDocument();

    expect(homeLink).toHaveTextContent('Home');
    expect(aboutLink).toHaveTextContent('About');
    expect(FavPokeLink).toHaveTextContent(favPokeText);
  });

  it('Teste se a aplicação é redirecionada para a página inicial', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });

    userEvent.click(homeLink);
    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  it('Teste se a aplicação é redirecionada para a página About', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: 'About' });

    userEvent.click(aboutLink);
    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });

  it('Teste se a aplicação é redirecionada para a página Pokémons Favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const FavPokeLink = screen.getByRole('link', { name: 'Favorite Pokémons' });

    userEvent.click(FavPokeLink);
    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });

  it('Teste se a aplicação é redirecionada para a página Not Found', () => {
    const { history } = renderWithRouter(<App />);
    const WRONG_URL = '/uma-pagina-que-nao-existe-xablau!';

    history.push(WRONG_URL);
    const notFound = screen.getByText('not found', { exact: false });

    expect(notFound).toBeInTheDocument();
  });
});
