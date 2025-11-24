"use client";

import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';

interface Pokemon {
  name: string;
  url: string;
  image: string;
}

export default function Explore() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPokemon() {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
      const data = await res.json();
      const pokemonDetails = await Promise.all(
        data.results.map(async (p: { url: string }) => {
          const pokemonRes = await fetch(p.url);
          const pokemonData = await pokemonRes.json();
          return {
            name: pokemonData.name,
            url: p.url,
            image: pokemonData.sprites.front_default,
          };
        })
      );
      setPokemon(pokemonDetails);
      setLoading(false);
    }
    getPokemon();
  }, []);

  if (loading) {
    return <div className="container mt-5 text-center"><h2>Loading Pokémon...</h2></div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Explore Pokémon</h1>
      <div className="row">
        {pokemon.map((p, index) => (
          <div className="col-md-4 col-lg-3 mb-4" key={index}>
            <div className="card h-100 shadow-sm">
              <img src={p.image} className="card-img-top" alt={p.name} />
              <div className="card-body text-center">
                <h5 className="card-title text-capitalize">{p.name}</h5>
                <Link href={`/pokemon/${p.name}`} className="btn btn-primary stretched-link">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}