exports.up = function (context) {
  const { client } = context
  const query =
  `CREATE TABLE "recipe" (
    "_id" SERIAL NOT NULL,
    "stableId" TEXT NOT NULL,
    instructions TEXT NOT NULL,
    rating INTEGER NOT NULL,
    "createdAt" timestamptz NOT NULL DEFAULT now(),
    "updatedAt" timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT "pk_recipe" PRIMARY KEY ("_id"),
    CONSTRAINT "unique_recipe_stableId" UNIQUE ("stableId")
    );

  CREATE TABLE "ingredient" (
    "_id" SERIAL NOT NULL,
    "recipeId" TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    measurement TEXT NOT NULL,
    name TEXT NOT NULL,
    "createdAt" timestamptz NOT NULL DEFAULT now(),
    "updatedAt" timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT "pk_ingredient" PRIMARY KEY ("_id"),
    CONSTRAINT "ingredient_fkey" FOREIGN KEY ("recipeId")
      REFERENCES "recipe"("stableId")
      ON DELETE CASCADE
      ON UPDATE CASCADE
  );
`

  return client.query(query)
}

exports.down = function (context) {
  const { client } = context
  const query = `
  DROP TABLE IF EXISTS "ingredient";
  DROP TABLE IF EXISTS "recipe";
  `

  return client.query(query)
}
