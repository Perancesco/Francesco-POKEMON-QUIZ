-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TeamPokemon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pokemonName" TEXT NOT NULL,
    "teamId" INTEGER NOT NULL,
    CONSTRAINT "TeamPokemon_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "PokemonTeam" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_TeamPokemon" ("id", "pokemonName", "teamId") SELECT "id", "pokemonName", "teamId" FROM "TeamPokemon";
DROP TABLE "TeamPokemon";
ALTER TABLE "new_TeamPokemon" RENAME TO "TeamPokemon";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
