import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import FavoritePokemons from '../pages/FavoritePokemons';

describe('Teste o componente FavoritePokemons', () => {
  it('Teste se é exibida mensagem caso a pessoa não tenha pokémons favoritos', () => {
    renderWithRouter(<FavoritePokemons />);
    const noFavoFoundText = screen.getByText('No favorite pokemon found');

    expect(noFavoFoundText).toBeInTheDocument();
  });

  it('Teste se são exibidos todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<FavoritePokemons />);
    const favoritePokemonsList = document.getElementsByClassName('favorite-pokemon');
    expect(favoritePokemonsList).toHaveLength(0);
  });
});
