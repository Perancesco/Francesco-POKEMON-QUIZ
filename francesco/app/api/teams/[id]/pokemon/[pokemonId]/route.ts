import prisma from '@/app/lib/prisma'

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string; pokemonId: string }> },
) {
  const { pokemonId } = await params
  const pId = parseInt(pokemonId, 10)

  await prisma.teamPokemon.delete({
    where: {
      id: pId,
    },
  })

  return new Response(null, { status: 204 })
}