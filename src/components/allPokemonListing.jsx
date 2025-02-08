"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import img from "../assets/country_detail_pokemon.png";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchPokemons() {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
      const data = await res.json();

      // Fetch additional Pokémon details for images
      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();
          return {
            name: pokemon.name,
            id: details.id,
            image:
              details.sprites.other["official-artwork"].front_default ||
              details.sprites.front_default,
          };
        })
      );

      setPokemons(detailedPokemons);
    }

    fetchPokemons();
  }, []);

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-red-500 to-blue-500 p-6">
      <h1 className="text-5xl font-extrabold text-center text-white mb-8 drop-shadow-md">
        Pokemon Explorer
      </h1>

      {/* Search Input */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search Pokemon.."
          className="w-full max-w-md p-3 rounded-full text-lg text-black shadow-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-black hover:ring-2 hover:ring-black"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredPokemons.map((pokemon) => (
          <Link key={pokemon.id} href={`/pokemon/${pokemon.id}`}>
            <div className="p-4 bg-white rounded-2xl shadow-lg cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:ring-4 hover:ring-black-700 flex flex-col items-center">
              {pokemon.image && (
                <Image
                  src={img}
                  width={150}
                  height={150}
                  alt={pokemon.name}
                  className="drop-shadow-lg"
                  priority
                />
              )}
              <p className="text-center text-lg font-bold capitalize mt-3 text-gray-800">
                {pokemon.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
