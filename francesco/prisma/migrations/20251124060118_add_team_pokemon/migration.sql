-- CreateTable
CREATE TABLE "TeamPokemon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pokemonName" TEXT NOT NULL,
    "teamId" INTEGER NOT NULL,
    CONSTRAINT "TeamPokemon_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "PokemonTeam" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
