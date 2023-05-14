import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import usePokemons from './hooks/usePokemons';
import { BrowserRouter } from "react-router-dom";
import PokemonList from "./components/PokemonList";


import PokemonCard from "./components/PokemonCard";
import { ListPokemon, DetailPokemon } from "./interfaces/pokemon.interface";
import PokemonBasicInfo from './components/PokemonBasicInfo'

import PokemonAvatar from "./components/PokemonAvatar";

describe("PokemonAvatar", () => {
  const pokemon: DetailPokemon = {
    id: 1,
    name: "bulbasaur",
    color: "#123456",
    sprites: {
      other: {
        "official-artwork": {
          front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
        },
      },
    },
  };

  it("renders pokemon's name and id", () => {
    const { getByText } = render(<PokemonAvatar pokemon={pokemon} />);
    expect(getByText(/bulbasaur/i)).toBeInTheDocument();
    expect(getByText(/#1/i)).toBeInTheDocument();
  });

  it("renders pokemon's official artwork", () => {
    // const { getByAltText } = render(<PokemonAvatar pokemon={pokemon} />);
    // const image = getByAltText(/bulbasaur/i) as HTMLImageElement;
    // expect(image).toBeInTheDocument();
    // expect(Image.src).toBe("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png");
  });

});

const mockPokemon1 = {
  height: 10,
  weight: 100,
  types: [
    { type: { name: 'type1' } },
    { type: { name: 'type2' } }
  ],
  abilities: [
    { ability: { name: 'ability1' } },
    { ability: { name: 'ability2' } }
  ]
}

describe('PokemonBasicInfo', () => {
  test('displays pokemon height and weight', () => {
    render(<BrowserRouter>
      <PokemonBasicInfo pokemon={mockPokemon1}/>
    </BrowserRouter>
     )
    expect(screen.getByText(/height/i)).toHaveTextContent('Height')
    expect(screen.getByText(/weight/i)).toHaveTextContent('Weight')
  })

  test('displays pokemon types', () => {
    render(<PokemonBasicInfo pokemon={mockPokemon1} />)
    expect(screen.getByText(/types/i)).toHaveTextContent('Types')
  })

  test('displays pokemon abilities', () => {
    render(<PokemonBasicInfo pokemon={mockPokemon1} />)
    expect(screen.getByText(/abilities/i)).toHaveTextContent('Abilities')
  })
})

const mockPokemon: ListPokemon = {
  name: "bulbasaur",
  url: "https://pokeapi.co/api/v2/pokemon/1/",
  pokedexNumber: 1,
  image: "https://example.com/bulbasaur.png",
};

describe("PokemonCard", () => {
  it("renders pokemon name and pokedex number", () => {
    render(
      <BrowserRouter>
        <PokemonCard pokemon={mockPokemon} />
      </BrowserRouter>
    );
    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
    expect(screen.getByText("#1")).toBeInTheDocument();
  });

  it("renders pokemon image", () => {
    render(
      <BrowserRouter>
        <PokemonCard pokemon={mockPokemon} />
      </BrowserRouter>
    );
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", mockPokemon.image);
    expect(image).toHaveAttribute("title", mockPokemon.name);
  });

  it("renders a link to the pokemon detail page", () => {
    render(
      <BrowserRouter>
        <PokemonCard pokemon={mockPokemon} />
      </BrowserRouter>
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", `/pokemon/${mockPokemon.name}`);
  });

  it("renders the correct background color based on pokemon image", () => {
  });
});



const mockPokemons = [
  {
    name: "bulbasaur",
    url: "https://pokeapi.co/api/v2/pokemon/1/"
  },
  {
    name: "charmander",
    url: "https://pokeapi.co/api/v2/pokemon/4/"
  },
  {
    name: "squirtle",
    url: "https://pokeapi.co/api/v2/pokemon/7/"
  }
];

describe("PokemonList", () => {
  it("renders a list of Pokemon cards", () => {
    render(
    <BrowserRouter basename="/">
      <PokemonList pokemons={mockPokemons} />
    </BrowserRouter>
  );
    
    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
    expect(screen.getByText("charmander")).toBeInTheDocument();
    expect(screen.getByText("squirtle")).toBeInTheDocument();
  });

  it("does not render anything if there are no pokemons", () => {
    render(<PokemonList pokemons={[]} />);
    
    expect(screen.queryByText("bulbasaur")).not.toBeInTheDocument();
    expect(screen.queryByText("charmander")).not.toBeInTheDocument();
    expect(screen.queryByText("squirtle")).not.toBeInTheDocument();
  });
});


describe('App', () => {
  test('renders the Home page by default', () => {
    render(<App />);
    // const homePageHeader = screen.getByRole('heading', { name: /home page/i });
    // expect(homePageHeader).toBeInTheDocument();
  });

  test('renders the PokemonDetail page when the URL matches /pokemon/:pokemonName', () => {
    const pokemonName = 'bulbasaur';
    window.history.pushState({}, '', `/pokemon/${pokemonName}`);
    render(<App />);
    // const pokemonDetailHeader = screen.getByRole({ name: new RegExp(pokemonName, 'i') });
    // expect(pokemonDetailHeader).toBeInTheDocument();
  });
});


describe('usePokemons', () => {
  test('fetches all pokemons if selectedType is null', async () => {
    const { result, waitForNextUpdate } = renderHook(() => usePokemons());

    await waitForNextUpdate();

    // Check that the initial list of pokemons was fetched
    expect(result.current.pokemons.length).toBeGreaterThan(0);

    // Fetch next page of pokemons
    result.current.fetchNextPage();
    await waitForNextUpdate();

    // Check that the next page was fetched and added to the list
    expect(result.current.pokemons.length).toBeGreaterThan(20);

    // Fetch next page of pokemons again
    result.current.fetchNextPage();
    await waitForNextUpdate();

    // Check that the second next page was fetched and added to the list
    expect(result.current.pokemons.length).toBeGreaterThan(40);
  });

  test('fetches pokemons by type when selectedType is set', async () => {
    const { result, waitForNextUpdate } = renderHook(() => usePokemons());

    // Set selectedType to Fire type
    result.current.setSelectedType({ name: 'Fire', url: 'https://pokeapi.co/api/v2/type/10/' });

    await waitForNextUpdate();

    // Check that the list of Fire type pokemons was fetched
    expect(result.current.pokemons.length).toBeGreaterThan(0);

    // Set selectedType to Electric type
    result.current.setSelectedType({ name: 'Electric', url: 'https://pokeapi.co/api/v2/type/13/' });
    await waitForNextUpdate();

    // Check that the list of Electric type pokemons was fetched
    expect(result.current.pokemons.length).toBeGreaterThan(0);
  });
});




