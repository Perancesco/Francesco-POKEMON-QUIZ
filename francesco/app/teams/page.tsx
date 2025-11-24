"use client";

import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
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

export default function Teams() {
  const [teams, setTeams] = useState<PokemonTeam[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    async function getTeams() {
      const res = await fetch('/api/teams');
      const data = await res.json();
      setTeams(data);
    }
    getTeams();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading('Creating team...');
    try {
      const res = await fetch('/api/teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        console.error('Create team error:', data);
        throw new Error(data?.error || 'Failed to create team');
      }
      const newTeam = await res.json();
      setTeams([...teams, { ...newTeam, pokemons: [] }]);
      setName('');
      setDescription('');
      toast.success('Team created successfully!', { id: toastId });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Failed to create team.';
      toast.error(message, { id: toastId });
    }
  };

  const handleDelete = async (id: number) => {
    const toastId = toast.loading('Deleting team...');
    try {
      const res = await fetch(`/api/teams/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Failed to delete team');
      }
      setTeams(teams.filter((team) => team.id !== id));
      toast.success('Team deleted successfully!', { id: toastId });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Failed to delete team.';
      toast.error(message, { id: toastId });
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Manage Your Pokémon Teams</h1>
      <div className="row">
        <div className="col-lg-4">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title">Create New Team</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Team Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100">Create Team</button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="row">
            {teams.map((team) => (
              <div className="col-md-6 mb-4" key={team.id}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{team.name}</h5>
                    <p className="card-text flex-grow-1">{team.description}</p>
                    <h6>Pokémon:</h6>
                    <ul>
                      {team.pokemons.map((p) => (
                        <li key={p.id} className="text-capitalize">{p.pokemonName}</li>
                      ))}
                    </ul>
                    <div className="mt-auto">
                      <Link href={`/teams/${team.id}`} className="btn btn-primary me-2">
                        Edit
                      </Link>
                      <button onClick={() => handleDelete(team.id)} className="btn btn-danger">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
