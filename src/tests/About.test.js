import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import About from '../pages/About';

describe('Teste o componente <About.js />', () => {
  it.only('Teste se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const POKEDEX_SOURCE = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const aboutText = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(aboutText).toBeInTheDocument();

    const pokedexImg = screen.getByAltText('Pokédex');
    expect(pokedexImg).toBeInTheDocument();
    expect(pokedexImg).toHaveProperty('src', POKEDEX_SOURCE);

    const moreDetails = screen.queryByText('More details');
    expect(moreDetails).not.toBeInTheDocument();

    const paragraphList = document.getElementsByTagName('p');
    expect(paragraphList).toHaveLength(2);
  });
});
