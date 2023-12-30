import { $, component$, useComputed$, useSignal, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { type DocumentHead, routeLoader$, useLocation, useNavigate } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { Modal } from '~/components/shared';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';
import { getDetailByPokemonId } from '~/helpers/get-text-pokemon';
import type { SmallPokemon } from '~/interfaces';

export const usePokemonList = routeLoader$<SmallPokemon[]>(async ({query, redirect, pathname}) => {

  const offset = Number(query.get('offset')) ?? "0";

  if ( isNaN(offset) ) throw redirect(301, pathname);
  if (offset < 0) throw redirect(301, pathname);
  if (offset > 1000) throw redirect(301, pathname);

  return await getSmallPokemons(offset);
});

export default component$(() => {

  const pokemons = usePokemonList();
  const location = useLocation();
  const nav = useNavigate();

  const modalVisible = useSignal(false);
  const modalPokemon = useStore({
    id: '',
    name: ''
  });

  const chatGptPokemonFact = useSignal('');

  // Modal functions
  const showModal = $( ( id: string, name: string ) => {
    modalPokemon.id = id;
    modalPokemon.name = name;

    modalVisible.value = true;
  } );

  const closeModal = $( () => {
    modalVisible.value = false;
  } );

  useVisibleTask$( ({track}) => {
    track( () => modalPokemon.name );

    chatGptPokemonFact.value = '';

    if ( modalPokemon.name.length > 0) {
      getDetailByPokemonId(modalPokemon.id)
      .then((res) => chatGptPokemonFact.value = res);
    }
  });

  const limitarA60Palabras = (texto: string) => {
    let palabras = texto.split(' ');
    let textoLimitado = palabras.slice(0, 60).join(' ');
    return textoLimitado;
  };

  const currentOffset = useComputed$<number>( () => {
    // const offsetString = location.url.searchParams.get('offset');
    return Number(new URLSearchParams(location.url.search).get('offset') ?? "0");
  });

  const prevPag = $( () => {
    if (currentOffset.value === 10) nav('/pokemons/list-ssr/');
    else nav(`/pokemons/list-ssr/?offset=${currentOffset.value - 10}`);
  });

  const nextPag = $( () => {
    if (currentOffset.value === 1000) nav('/pokemons/list-ssr/');
    else nav(`/pokemons/list-ssr/?offset=${currentOffset.value + 10}`);
  });

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Offset: {currentOffset}</span>
        <span>Esta cargando pagina: {location.isNavigating ? "Si" : "No"}</span>
      </div>

      <div class="mt-10">
        <button
          onClick$={prevPag}
          class="btn btn-primary mr-2"
          disabled={currentOffset.value === 0}
        >
          Anteriores
        </button>
        <button onClick$={nextPag} class="btn btn-primary mr-2">
          Siguientes
        </button>
      </div>

      <div class="mt-5 grid grid-cols-6">
        {pokemons.value.map(({ name, id }) => (
          <div key={name} 
            onClick$={() => showModal(id, name)}
            class="m-5 flex flex-col items-center justify-center">
            <PokemonImage id={+id} />
            <span class="capitalize">{name}</span>
          </div>
        ))}
      </div>

      <Modal showModal={ modalVisible.value } closeFn={closeModal}>
        <div q:slot="title">{modalPokemon.name}</div>
        <div q:slot="content" class="flex flex-col justify-center items-center" >
          <PokemonImage id={modalPokemon.id} />
          <span class='text-xs'>
            {
              chatGptPokemonFact.value === ''
              ? 'Cargando...'
              : limitarA60Palabras(chatGptPokemonFact.value)
            }
          </span>
        </div>
      </Modal>
    </>
  );
});

export const head: DocumentHead = {
  title: "List SSR - PokeQwik",
  meta: [
    {
      name: "description",
      content: "Lista de pokemons con Qwik",
    },
  ],
};