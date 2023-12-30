import { type ResDetailPokemon } from "~/interfaces";

export const getDetailByPokemonId = async (id: number | string) => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`,
    );
    const data = (await response.json()) as ResDetailPokemon;
    const descriptionInSpanish = data.flavor_text_entries.filter(
        (item) => item.language.name === 'es'
    );

    return descriptionInSpanish.map((item) => item.flavor_text).join(' ');
}