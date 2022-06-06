import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import FavoritePokemons from '../pages/FavoritePokemons';

const FAVORITE_POKEMONS = [
  {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Kanto Viridian Forest',
        map: 'https://pwo-wiki.info/images/4/47/Viridian_Forest.gif',
      },
      {
        location: 'Kanto Power Plant',
        map: 'https://pwo-wiki.info/images/5/5b/Pp.gif',
      },
    ],
  },
  {
    id: 4,
    name: 'Charmander',
    type: 'Fire',
    averageWeight: {
      value: '8.5',
      measurementUnit: 'kg',
    },
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Alola Route 3',
        map: 'https://pwo-wiki.info/images/5/5b/Pp.gif',
      },
      {
        location: 'Kanto Route 3',
        map: 'https://pwo-wiki.info/images/f/f4/Route_3.gif',
      },
      {
        location: 'Kanto Route 4',
        map: 'https://pwo-wiki.info/images/7/7d/Route_4.gif',
      },
      {
        location: 'Kanto Rock Tunnel',
        map: 'https://pwo-wiki.info/images/1/1d/Rocktunnel.gif',
      },
    ],
  },
  {
    id: 10,
    name: 'Caterpie',
    type: 'Bug',
    averageWeight: {
      value: '2.9',
      measurementUnit: 'kg',
    },
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Caterpie_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Johto Route 30',
        map: 'https://pwo-wiki.info/images/7/76/Route_30.gif ',
      },
      {
        location: 'Johto Route 31',
        map: 'https://pwo-wiki.info/images/f/f1/Route_31.gif',
      },
      {
        location: 'Ilex Forest',
        map: 'https://pwo-wiki.info/images/f/f1/Route_31.gif',
      },
      {
        location: 'Johto National Park',
        map: 'https://pwo-wiki.info/images/d/d2/R35.gif',
      },
    ],
  },
];

describe('Teste o componente FavoritePokemons', () => {
  it('Teste se é exibida mensagem caso a pessoa não tenha pokémons favoritos', () => {
    renderWithRouter(<FavoritePokemons />);
    const noFavoFoundText = screen.getByText('No favorite pokemon found');

    expect(noFavoFoundText).toBeInTheDocument();
  });

  it('Teste se não existem pokémons favoritados.', () => {
    renderWithRouter(<FavoritePokemons />);
    const favoritePokemonsList = document.getElementsByClassName('favorite-pokemon');
    expect(favoritePokemonsList).toHaveLength(0);
  });

  it('Teste se existem pokémons favoritados.', () => {
    renderWithRouter(<FavoritePokemons pokemons={ FAVORITE_POKEMONS } />);
    const magicNumber = 3;
    const noFavoFoundText = screen.queryByText('No favorite pokemon found');
    expect(noFavoFoundText).not.toBeInTheDocument();

    const favoritePokemonsList = document.getElementsByClassName('favorite-pokemon');
    expect(favoritePokemonsList).toHaveLength(magicNumber);
  });
});
