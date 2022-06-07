import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import Pokedex from '../pages/Pokedex';
import pokemons from '../data';

const IS_FAVORITE = {};
const MAGIC_NUMBER = 40;
const POKEMON_TYPES = pokemons.reduce((types, { type }) => [...types, type], []);

const dataTestIdPokeName = 'pokemon-name';
pokemons.forEach((e) => {
  IS_FAVORITE[e.id] = e.id > MAGIC_NUMBER;
  return null;
});

describe('Teste o componente Pokedex', () => {
  beforeEach(() => renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ IS_FAVORITE }
  />));

  it('Teste se a página contém um heading h2 com o texto Encountered pokémons', () => {
    const pokedexHeading = screen.queryByRole('heading',
      { name: 'Encountered pokémons', level: 2 });

    expect(pokedexHeading).toBeInTheDocument();
    expect(pokedexHeading).toHaveTextContent('Encountered pokémons');
  });

  it('Teste se é exibido o próximo pokémon da lista quando o botão é clicado', () => {
    const nextPokeButton = screen.queryByRole('button',
      { name: 'Próximo pokémon' });

    expect(nextPokeButton).toBeInTheDocument();
    expect(nextPokeButton).toHaveTextContent('Próximo pokémon');

    pokemons.forEach(({ name }) => {
      expect(screen.getByTestId(dataTestIdPokeName)).toHaveTextContent(name);
      userEvent.click(nextPokeButton);
    });

    expect(screen.getByTestId(dataTestIdPokeName)).toHaveTextContent(pokemons[0].name);
  });

  it('Teste se é mostrado apenas um pokémon por vez', () => {
    expect(screen.getByTestId(dataTestIdPokeName)).toHaveTextContent(pokemons[0].name);
    expect(screen.getByTestId(dataTestIdPokeName))
      .not.toHaveTextContent(pokemons[1].name);
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    const EXPECTED_LENGTH = 7;

    expect(screen.getAllByTestId('pokemon-type-button').length).toBe(EXPECTED_LENGTH);

    POKEMON_TYPES.forEach((e) => {
      expect(screen.getByRole('button',
        { name: e })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: e })).toHaveTextContent(e);
    });
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro:', () => {
    const resetFilterButton = screen.getByRole('button', { name: /all/i });

    expect(resetFilterButton).toBeInTheDocument();
    expect(resetFilterButton).toHaveTextContent('All');

    userEvent.click(resetFilterButton);
  });
});
