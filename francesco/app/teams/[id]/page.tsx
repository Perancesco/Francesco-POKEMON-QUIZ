"use client";

import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';

interface TeamPokemon {
  id: number;
  pokemonName: string;
}

interface PokemonTeam {
  id: number;
  name: string;
  description: string | null;
  pokemons: TeamPokemon[];
}

export default function TeamDetail() {
  const params = useParams();
  const id = params.id;
  const [team, setTeam] = useState<PokemonTeam | null>(null);
  const [pokemonName, setPokemonName] = useState('');

  useEffect(() => {
    if (id) {
      async function getTeam() {
        const res = await fetch(`/api/teams/${id}`);
        const data = await res.json();
        setTeam(data);
      }
      getTeam();
    }
  }, [id]);

  const handleAddPokemon = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading('Adding Pokémon...');
    try {
      const res = await fetch(`/api/teams/${id}/pokemon`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pokemonName }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error);
      }

      const newPokemon = await res.json();
      if (team) {
        setTeam({ ...team, pokemons: [...team.pokemons, newPokemon] });
      }
      setPokemonName('');
      toast.success('Pokémon added successfully!', { id: toastId });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Failed to add Pokémon.';
      toast.error(message, { id: toastId });
    }
  };

  const handleRemovePokemon = async (pokemonId: number) => {
    const toastId = toast.loading('Removing Pokémon...');
    try {
      const res = await fetch(`/api/teams/${id}/pokemon/${pokemonId}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Failed to remove Pokémon');
      }
      if (team) {
        setTeam({
          ...team,
          pokemons: team.pokemons.filter((p) => p.id !== pokemonId),
        });
      }
      toast.success('Pokémon removed successfully!', { id: toastId });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Failed to remove Pokémon.';
      toast.error(message, { id: toastId });
    }
  };

  if (!team) {
    return <div className="container mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2>{team.name}</h2>
          <Link href={`/teams/${team.id}/edit`} className="btn btn-secondary">
            Edit Name/Description
          </Link>
        </div>
        <div className="card-body">
          <p>{team.description}</p>
          <hr />
          <h4>Manage Pokémon</h4>
          <div className="row">
            <div className="col-md-6">
              <h5>Add Pokémon to Team</h5>
              <form onSubmit={handleAddPokemon}>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Pokémon name"
                    value={pokemonName}
                    onChange={(e) => setPokemonName(e.target.value)}
                    required
                  />
                  <button type="submit" className="btn btn-primary">
                    Add
                  </button>
                </div>
              </form>
            </div>
            <div className="col-md-6">
              <h5>Current Team</h5>
              <ul className="list-group">
                {team.pokemons.map((p) => (
                  <li
                    key={p.id}
                    className="list-group-item d-flex justify-content-between align-items-center text-capitalize"
                  >
                    {p.pokemonName}
                    <button
                      onClick={() => handleRemovePokemon(p.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <Link href="/teams" className="btn btn-secondary">
            Back to Teams List
          </Link>
        </div>
      </div>
    </div>
  );
}
