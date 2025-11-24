import prisma from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const team = await prisma.pokemonTeam.findUnique({
    where: { id: parseInt(params.id) },
    include: {
      pokemons: true,
    },
  });
  if (team) {
    return NextResponse.json(team);
  }
  return NextResponse.json({ error: 'Team not found' }, { status: 404 });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { name, description } = await request.json();
  const updatedTeam = await prisma.pokemonTeam.update({
    where: { id: parseInt(params.id) },
    data: { name, description },
  });
  return NextResponse.json(updatedTeam);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await prisma.pokemonTeam.delete({
    where: { id: parseInt(params.id) },
  });
  return new Response(null, { status: 204 });
}
