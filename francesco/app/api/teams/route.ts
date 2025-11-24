import prisma from '@/app/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const teams = await prisma.pokemonTeam.findMany({
      include: {
        pokemons: true,
      },
    })

    return NextResponse.json(teams)
  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { name, description } = await request.json()

    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    const data: { name: string; description?: string | null } = { name }

    if (typeof description === 'string' && description.trim() !== '') {
      data.description = description
    } else {
      data.description = null
    }

    const newTeam = await prisma.pokemonTeam.create({
      data,
    })

    return NextResponse.json(newTeam, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
