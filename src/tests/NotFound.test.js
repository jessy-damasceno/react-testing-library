import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import NotFound from '../pages/NotFound';

describe('Teste o componente NotFound', () => {
  it('Teste se a página tem um elemento com o texto "Page requested not found"', () => {
    renderWithRouter(<NotFound />);
    const notFountTextEl = screen.getByRole('heading', {
      name: /not found/i,
      level: 2,
    });

    expect(notFountTextEl).toBeInTheDocument();
  });

  it('Teste se a página mostra a imagem requerida.', () => {
    renderWithRouter(<NotFound />);
    const IMG_URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const notFoundImg = screen.getByAltText(/not found$/i);

    expect(notFoundImg).toBeInTheDocument();
    expect(notFoundImg).toHaveProperty('src', IMG_URL);
  });
});
