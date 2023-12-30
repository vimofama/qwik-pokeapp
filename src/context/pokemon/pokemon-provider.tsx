import { Slot, component$, useContextProvider, useStore, useVisibleTask$ } from '@builder.io/qwik';

import { PokemonGameContext, type PokemonGameState } from './pokemon-game.context';
import { PokemonListContext, type PokemonListState } from './pokemon-list.context';

export const PokemonProvider = component$(() => {

    const pokemonGame = useStore<PokemonGameState>({
      pokemonId: 1,
      showBackImage: false,
      isPokemonVisible: false,
    });

    const pokemonList = useStore<PokemonListState>({
        currentPage: 0,
        isLoading: false,
        pokemons: [],
    });
    
    useContextProvider(PokemonGameContext, pokemonGame);
    useContextProvider(PokemonListContext, pokemonList);

    useVisibleTask$( () => {
        //? leer del localStorage
        if ( localStorage.getItem('pokemon-game') ) {
            const { 
                pokemonId = 1, 
                showBackImage = false, 
                isPokemonVisible = false 
            } = JSON.parse( localStorage.getItem("pokemon-game")!) as PokemonGameState;

            pokemonGame.pokemonId = pokemonId;
            pokemonGame.showBackImage = showBackImage;
            pokemonGame.isPokemonVisible = isPokemonVisible;
        }
    });

    useVisibleTask$(({track}) => {
        //? escribir en el localStorage
        track( () => [pokemonGame.pokemonId, pokemonGame.showBackImage, pokemonGame.isPokemonVisible]);

        localStorage.setItem('pokemon-game', JSON.stringify( pokemonGame ));
    });

    return <Slot />;
});