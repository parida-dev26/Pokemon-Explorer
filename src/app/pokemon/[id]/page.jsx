"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import img from "../../../assets/country_detail_pokemon.png";

const Page = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    async function fetchPokemonDetails() {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();
        setPokemon(data);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      }
    }

    fetchPokemonDetails();
  }, [id]);

  if (!pokemon) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-red-500 to-blue-500 p-8 text-white">
      <button
        onClick={() => router.push("/")}
        className="bg-yellow-400 text-black px-4 py-2 rounded-md shadow-md hover:bg-yellow-300 transition-all mb-6"
      >
        Back to Home
      </button>

      {/* Pokemon Details */}
      <div className="max-w-3xl mx-auto bg-white text-black p-6 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-center capitalize">
          {pokemon.name}
        </h1>

        {/* Pokemon Image */}
        <div className="flex justify-center my-4">
          <Image
            src={img}
            width={200}
            height={200}
            alt={pokemon.name}
            className="drop-shadow-lg"
            priority
          />
        </div>

        {/* Basic Info */}
        <p className="text-lg text-center">ID:{pokemon.id}</p>
        <p className="text-lg text-center">Weight: {pokemon.weight} kg</p>

        {/* Abilities */}
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Abilities:</h2>
          <ul className="list-disc pl-6 mt-2">
            {pokemon.abilities.map((ability) => (
              <li key={ability.ability.name} className="capitalize">
                {ability.ability.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Stats */}
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Stats:</h2>
          <ul className="mt-2">
            {pokemon.stats.map((stat) => (
              <li key={stat.stat.name} className="capitalize">
                {stat.stat.name}:{" "}
                <span className="font-bold">{stat.base_stat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Page;
