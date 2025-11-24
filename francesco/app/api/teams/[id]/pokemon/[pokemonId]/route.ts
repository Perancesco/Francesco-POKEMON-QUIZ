import prisma from '@/app/lib/prisma'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string; pokemonId: string } },
) {
  const pokemonId = parseInt(params.pokemonId, 10)

  await prisma.teamPokemon.delete({
    where: {
      id: pokemonId,
    },
  })

  return new Response(null, { status: 204 })
}
