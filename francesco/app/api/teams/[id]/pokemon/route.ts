import prisma from '@/app/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { pokemonName } = await request.json()
  const teamId = parseInt(params.id, 10)

  const normalizedName = String(pokemonName).toLowerCase()

  const pokeApiResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${normalizedName}`,
  )

  if (!pokeApiResponse.ok) {
    return NextResponse.json({ error: 'Pokémon not found' }, { status: 404 })
  }

  const existingPokemon = await prisma.teamPokemon.findFirst({
    where: {
      teamId,
      pokemonName: normalizedName,
    },
  })

  if (existingPokemon) {
    return NextResponse.json(
      { error: 'Pokémon already exists in the team' },
      { status: 400 },
    )
  }

  const newTeamPokemon = await prisma.teamPokemon.create({
    data: {
      pokemonName: normalizedName,
      teamId,
    },
  })

  return NextResponse.json(newTeamPokemon, { status: 201 })
}
