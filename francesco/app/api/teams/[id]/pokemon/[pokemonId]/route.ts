import prisma from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request, { params }: { params: { id: string, pokemonId: string } }) {
  const pokemonId = parseInt(params.pokemonId);

  await prisma.teamPokemon.delete({
    where: {
      id: pokemonId,
    },
  });

  return new Response(null, { status: 204 });
}
