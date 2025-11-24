import prisma from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const { pokemonName } = await request.json();
  const teamId = parseInt(params.id);

  // Check if the pokemon exists in the PokeAPI
  const pokeApiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
  if (!pokeApiResponse.ok) {
    return NextResponse.json({ error: 'Pokémon not found' }, { status: 404 });
  }

  const existingPokemon = await prisma.teamPokemon.findFirst({
    where: {
      teamId,
      pokemonName: {
        equals: pokemonName,
        mode: 'insensitive',
      },
    },
  });

  if (existingPokemon) {
    return NextResponse.json({ error: 'Pokémon already exists in the team' }, { status: 400 });
  }

  const newTeamPokemon = await prisma.teamPokemon.create({
    data: {
      pokemonName,
      teamId,
    },
  });

  return NextResponse.json(newTeamPokemon, { status: 201 });
}
