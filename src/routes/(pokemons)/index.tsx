import { $, component$ } from "@builder.io/qwik";
import { type DocumentHead, useNavigate } from "@builder.io/qwik-city";

import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { usePokemonGame } from "~/hooks/use-pokemon-game";


export default component$(() => {

  const nav = useNavigate();
  const {
    isPokemonVisible,
    showBackImage,
    pokemonId,
    nextPokemon,
    prevPokemon,
    toogleVisible,
    toogleFromBack
  } = usePokemonGame();

  // const pokemonId = useSignal(1); // primitivos, booleans, strings, numbers, null, undefined
  // const pokemonId = useStore(); // objetos, arrays, funciones, promises, etc
  // const showBackImage = useSignal(false);
  // const isPokemonVisible = useSignal(false);


  const goToPokemon = $( () => {
    nav(`pokemon/${pokemonId.value}/`);
  })

  return (
    <>
      <span class="text-2xl">Buscador simple</span>

      <span class="text-9xl">{pokemonId.value}</span>

      {/* <img
        width="96"
        height="96"
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId.value}.png`}
        alt="Pokemon Sprite"
        style={{ width: "200px" }}
      /> */}
      {/* <Link href={`/pokemon/${pokemonId.value}/`}> */}
      <div onClick$={() => goToPokemon()}>
        <PokemonImage
          id={+pokemonId.value}
          backImage={showBackImage.value}
          isVisible={isPokemonVisible.value}
        />
      </div>
      {/* </Link> */}

      <div class="mt-2">
        <button
          onClick$={prevPokemon}
          class="btn btn-primary mr-2"
        >
          Anterior
        </button>

        <button
          onClick$={nextPokemon}
          class="btn btn-primary mr-2"
        >
          Siguiente
        </button>

        <button
          onClick$={toogleFromBack}
          class="btn btn-primary mr-2"
        >
          Voltear
        </button>

        <button
          onClick$={toogleVisible}
          class="btn btn-primary"
        >
          Revelar
        </button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "PokeQwik",
  meta: [
    {
      name: "description",
      content: "Esta es mi primera app con Qwik",
    },
  ],
};
