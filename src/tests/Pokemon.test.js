import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Teste o componente Pokemon', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);

    const { name, type, averageWeight: { value, measurementUnit }, image } = pokemons[0];
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent(name);
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent(type);
    expect(screen.getByTestId('pokemon-weight'))
      .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);

    const pokeImage = screen.getAllByRole('img')[0];

    expect(pokeImage).toBeInTheDocument();
    expect(pokeImage).toHaveProperty('src', image);
    expect(pokeImage).toHaveProperty('alt', `${name} sprite`);
  });

  it('Teste se o card do pokémon indicado na Pokédex contém um link de navegação', () => {
    const { history } = renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);

    const moreDetailsLink = screen.getByRole('link', { name: /^more details$/i });
    expect(moreDetailsLink).toBeInTheDocument();

    userEvent.click(moreDetailsLink);
    expect(history.location.pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });

  it('Teste se existe um ícone de estrela nos pokémons favoritados', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);

    const isFavoriteImage = screen.getAllByRole('img')[1];
    expect(isFavoriteImage).toBeInTheDocument();
    expect(isFavoriteImage).toHaveProperty('src', 'http://localhost/star-icon.svg');
    expect(isFavoriteImage).toHaveProperty('alt', 'Pikachu is marked as favorite');
  });
});
