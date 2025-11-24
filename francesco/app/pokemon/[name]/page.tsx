"use client";

import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface PokemonDetails {
  name: string;
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      }
    }
  };
  abilities: {
    ability: {
      name: string;
    };
  }[];
  types: {
    type: {
      name: string;
    };
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  height: number;
  weight: number;
}

export default function PokemonDetail() {
  const params = useParams();
  const name = params.name;
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (name) {
      async function getPokemonDetails() {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await res.json();
        setPokemon(data);
        setLoading(false);
      }
      getPokemonDetails();
    }
  }, [name]);

  if (loading) {
    return <div className="container mt-5 text-center"><h2>Loading Pokémon Details...</h2></div>;
  }

  if (!pokemon) {
    return <div className="container mt-5 text-center"><h2>Pokémon not found.</h2></div>;
  }

  return (
    <div className="container my-5">
      <div className="card shadow-lg">
        <div className="card-header bg-dark text-white text-center">
          <h2 className="text-capitalize">{pokemon.name}</h2>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 text-center">
              <img src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} className="img-fluid" />
            </div>
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-6">
                  <h4>Types</h4>
                  {pokemon.types.map((t, index) => (
                    <span key={index} className={`badge bg-primary me-2 text-capitalize`}>{t.type.name}</span>
                  ))}
                </div>
                <div className="col-md-6">
                  <h4>Height & Weight</h4>
                  <p>Height: {pokemon.height / 10} m</p>
                  <p>Weight: {pokemon.weight / 10} kg</p>
                </div>
              </div>
              <hr />
              <h4>Abilities</h4>
              <ul>
                {pokemon.abilities.map((a, index) => (
                  <li key={index} className="text-capitalize">{a.ability.name}</li>
                ))}
              </ul>
              <hr />
              <h4>Base Stats</h4>
              {pokemon.stats.map((s, index) => (
                <div key={index}>
                  <strong className="text-capitalize">{s.stat.name}:</strong> {s.base_stat}
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${s.base_stat}%` }}
                      aria-valuenow={s.base_stat}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="card-footer text-center">
          <Link href="/explore" className="btn btn-secondary">Back to Explore</Link>
        </div>
      </div>
    </div>
  );
}