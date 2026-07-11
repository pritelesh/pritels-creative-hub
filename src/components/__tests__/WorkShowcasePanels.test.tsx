import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import WorkShowcasePanels from '../WorkShowcasePanels';

const projects = [
  {
    title: 'Northstar Studio',
    category: 'Web',
    image: '/gallery/one.png',
    description: 'A premium digital experience tailored for modern product teams.',
    link: '#',
  },
  {
    title: 'Terra Cafe',
    category: 'Brand',
    image: '/gallery/two.png',
    description: 'A polished launch experience for a food-forward hospitality brand.',
    link: '#',
  },
];

describe('WorkShowcasePanels', () => {
  it('opens a details dialog when the project action is activated', () => {
    render(
      <MemoryRouter>
        <WorkShowcasePanels projects={projects} />
      </MemoryRouter>
    );

    const secondPanel = screen.getByRole('button', { name: /open terra cafe/i });
    fireEvent.click(secondPanel);

    const storyButton = screen.getByRole('button', { name: /read story/i });
    fireEvent.click(storyButton);

    expect(screen.getByText(/project overview/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /terra cafe/i })).toBeInTheDocument();
  });
});
