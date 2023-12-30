import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';

import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { usePokemonGame } from '~/hooks/use-pokemon-game';

export const usePokemonId = routeLoader$<number>( ({ params, redirect }) => {
    const id = Number(params.id);
    if ( isNaN(id)) throw redirect(301,'/');

    if ( id <= 0 || id > 1000) throw redirect(301, '/');
    return id;
})

export default component$(() => {
    // const id: number = +useLocation().params.id;
    const pokemonId = usePokemonId();
    // const pokemonGame = useContext(PokemonGameContext);
    const {showBackImage, isPokemonVisible, toogleFromBack, toogleVisible} = usePokemonGame();

    return (
        <>
            {/* <span class="text-5xl">Pokemon: {id}</span> */}
            <span class="text-5xl">Pokemon: {pokemonId}</span>
            <PokemonImage 
                id={pokemonId.value}
                size={300}
                backImage={showBackImage.value}
                isVisible= {isPokemonVisible.value}
            />

            <div class="mt-2">
                <button onClick$={toogleFromBack} class="btn btn-primary mr-2">Voltear</button>
                <button onClick$={toogleVisible} class="btn btn-primart">Revelar</button>
            </div>
        </>
    );
});