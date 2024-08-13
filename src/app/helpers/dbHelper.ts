'use server'

import { db } from '@/db'
import { recipesTable } from "@/db/schema"
import { auth } from '../../../auth'

export type Recipe = {
    name: String,
    description: String, 
    ingredients: String[],
    instructions: String[]
}

export async function saveRecipe (recipe: Recipe) {
    const session = await auth()
    const { name, description, ingredients, instructions } = recipe

    await db.insert(recipesTable).values({
      userId: session?.user.id,
      name,
      description,
      ingredients,
      instructions
    })

    await db.query.recipesTable.findMany()
  }