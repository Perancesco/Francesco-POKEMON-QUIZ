import prisma from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const teams = await prisma.pokemonTeam.findMany({
    include: {
      pokemons: true,
    },
  });
  return NextResponse.json(teams);
}

export async function POST(request: Request) {
  const { name, description } = await request.json();
  const newTeam = await prisma.pokemonTeam.create({
    data: {
      name,
      description,
    },
  });
  return NextResponse.json(newTeam, { status: 201 });
}
