import { Button, Container, Grid } from "@mui/material";
import React from 'react';
import PokemonList from "../components/PokemonList";
import usePokemons from "../hooks/usePokemons";
import setPokemons from "../hooks/usePokemons";

import { IndexedType } from "../interfaces/pokemon.interface";

const Home: React.FC = () => {
  const [text,setText] = React.useState('');
  const {
    pokemons,
    unfpokemons,
    hasMorePokemon,
    fetchNextPage,
    pokemonTypes,
    setSelectedType,
    selectedType,
    setPokemons,
    setUnfPokemons,
  } = usePokemons();

  const handleSelectType = (type: IndexedType | null) => {
    if (type) {
      setSelectedType(type);
    } else {
      setPokemons([]);
      setSelectedType(null);
    }
  };

  const handleOnClick = ()=> {
    console.log("entered\n",pokemons);
    setPokemons(unfpokemons);
    const findPokemons = (pokemons?.filter((u) => u?.name.toLowerCase().includes(text.toLowerCase()))) ;
    console.log("filtered",findPokemons);
    if(findPokemons?.length>0) setPokemons(findPokemons);
    
    //pokemons = listpokemons;
    
  }

  return ( 
    <Container>
        <div>
            <img  style={{ width: 50, height: 60 }}  src="https://yt3.googleusercontent.com/pK5_z_dptxyLuGllTGH4voHjz6WNTv0vgysrHQtmK6X45fl8g_h1ytu1H-ir1ExvY8uph0MbQA=s900-c-k-c0x00ffffff-no-rj"/>
            <input
             type="text" 
             placeholder="Pikachu"
             value={text} 
             onChange={e=> setText(e.target.value)}/>

            <Button disabled={!text} onClick={handleOnClick}>Search</Button>
        </div>
      <Grid container spacing={2} mt={1}>
        
        <Grid
          container
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {pokemonTypes.map((type) => (
            <Button
              variant="contained"
              sx={{
                "&.MuiButton-contained": {
                  background: type.color,
                },
                m: 1,
              }}
              onClick={() => handleSelectType(type)}
            >
              {type.name}
            </Button>
          ))}
          <Button
            variant="contained"
            sx={{
              m: 1,
            }}
            onClick={() => handleSelectType(null)}
          >
            ALL
          </Button>
        </Grid>

        <Grid
          container
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "center" }}
        >
            
          <PokemonList pokemons  ={pokemons}></PokemonList>

          {hasMorePokemon ? (
            <Button variant="contained" onClick={fetchNextPage}>
              Load more Pokemon
            </Button>
          ) : null}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;