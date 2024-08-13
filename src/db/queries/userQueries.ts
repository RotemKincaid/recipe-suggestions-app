import { db } from "@/db"
import { sql, eq, desc } from 'drizzle-orm';
import { recipesTable, users as usersTable } from "@/db/schema"

const baseQuery = db.select({
    id: recipesTable.id,
    name: recipesTable.name,
    description: recipesTable.description,
    ingredients: recipesTable.ingredients,
    instructions: recipesTable.instructions,
    createdAt: recipesTable.createdAt,
    user: {
      id: usersTable.id,
      name: usersTable.name,
      image: usersTable.image,
    }
})
  .from(recipesTable)
  .innerJoin(usersTable, eq(usersTable.id, recipesTable.userId))

export const userRecipesQuery = baseQuery
  .where(eq(usersTable.id, sql.placeholder("userId")))
  .orderBy(desc(recipesTable.createdAt))
  .prepare("recipes_for_user_feed")