import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import pokemons from '../data';

const POKEMON = pokemons[0];

describe('Teste o componente PokemonDetails', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${POKEMON.id}`);
  });

  it('Teste se as informações do pokémon selecionado são mostradas na tela', () => {
    screen.getByText(`${POKEMON.name} Details`);
    screen.getByRole('heading', { name: 'Summary', level: 2 });
    screen.getByText(POKEMON.summary);

    expect(screen.queryByRole('link', { name: /more/i })).not.toBeInTheDocument();
  });

  it('Teste se existe na página uma seção com os mapas do pokémon', () => {
    const imageLocationsList = screen.getAllByAltText(/location/i);
    screen.getByRole('heading', { name: `Game Locations of ${POKEMON.name}`, level: 2 });

    expect(imageLocationsList).toHaveLength(2);

    screen.getByText('Kanto Viridian Forest');
    screen.getByText('Kanto Power Plant');

    expect(imageLocationsList[0]).toHaveProperty('alt', 'Pikachu location');
    expect(imageLocationsList[1]).toHaveProperty('alt', 'Pikachu location');

    expect(imageLocationsList[0]).toHaveProperty('src', 'https://pwo-wiki.info/images/4/47/Viridian_Forest.gif');
    expect(imageLocationsList[1]).toHaveProperty('src', 'https://pwo-wiki.info/images/5/5b/Pp.gif');
  });

  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const checkFavButton = screen.getByLabelText('Pokémon favoritado?');
    expect(checkFavButton).toBeInTheDocument();
    expect(checkFavButton.checked).toBeFalsy();

    userEvent.click(checkFavButton);

    expect(checkFavButton.checked).toBeTruthy();
  });
});
