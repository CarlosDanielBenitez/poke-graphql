/* eslint-disable @next/next/no-img-element */
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import Head from "next/head";
import Link from "next/link"; // 
import styles from '../../styles/Pokemon.module.css';
import Image from "next/image";

export default function Pokemon({ pokemon, sprite }) {
  console.log(pokemon, sprite);
  
  return (
    <>
      <Head>
        <title>{pokemon.name}</title>
      </Head>
      <section className={styles.section}>
        <h1>{pokemon.name} - ID: {pokemon.id}</h1>




<Image
  className={styles.pokemon_image}
  src={sprite}
  alt={pokemon.name}
  width={200}
  height={200}
/>


        <h2>Types</h2>
        <ul>
          {pokemon.pokemon_v2_pokemontypes.map(type => (
            <li key={type.pokemon_v2_type.name}>{type.pokemon_v2_type.name}</li>
          ))}
        </ul>

        <h2>Stats</h2>
        <ul>
          {pokemon.pokemon_v2_pokemonstats.map(stat => (
            <li key={stat.pokemon_v2_stat.name}>{stat.pokemon_v2_stat.name}: {stat.base_stat}</li>
          ))}
        </ul>

        {/* Agrega un botón para volver a la página anterior */}
        <Link href="/">
          <p>Volver a la lista de Pokémon</p>
        </Link>
      </section>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const pokemonSprite = await fetch(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${params.id}.png`);
  const sprite = pokemonSprite.url;

  const { data } = await client.query({
    query: gql`
      query GetPokemon {
        pokemon_v2_pokemon(where: {id: {_eq: ${params.id}}}) {
          id
          name
          pokemon_v2_pokemonstats {
            base_stat
            pokemon_v2_stat {
              name
            }
          }
          pokemon_v2_pokemontypes {
            pokemon_v2_type {
              name
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      pokemon: data.pokemon_v2_pokemon[0],
      sprite,
    },
  };
}
