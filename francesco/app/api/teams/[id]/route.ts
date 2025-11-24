import prisma from '@/app/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const teamId = parseInt(id, 10)

  const team = await prisma.pokemonTeam.findUnique({
    where: { id: teamId },
    include: {
      pokemons: true,
    },
  })

  if (!team) {
    return NextResponse.json({ error: 'Team not found' }, { status: 404 })
  }

  return NextResponse.json(team)
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const teamId = parseInt(id, 10)
  const { name, description } = await request.json()

  const updatedTeam = await prisma.pokemonTeam.update({
    where: { id: teamId },
    data: { name, description },
  })

  return NextResponse.json(updatedTeam)
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const teamId = parseInt(id, 10)

  await prisma.pokemonTeam.delete({
    where: { id: teamId },
  })

  return new Response(null, { status: 204 })
}