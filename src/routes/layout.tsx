import { component$, Slot, useStyles$ } from "@builder.io/qwik";

import styles from "./styles.css?inline";


export default component$(() => {
  useStyles$(styles);

  // const pokemonGame = useStore<PokemonGameState>({
  //   pokemonId: 1,
  //   showBackImage: false,
  //   isPokemonVisible: false,
  // });

  // useContextProvider(PokemonGameContext, pokemonGame);

  // const pokemonList = useStore<PokemonListState>({
  //   currentPage: 0,
  //   isLoading: false,
  //   pokemons: [],
  // });

  // useContextProvider(PokemonListContext, pokemonList);

  return (
    <Slot/>
  );
});
