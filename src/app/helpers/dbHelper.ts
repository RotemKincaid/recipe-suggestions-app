'use server'

import { db } from '@/db'
import { recipesTable } from "@/db/schema"

type Recipe = {
    name: String,
    description: String, 
    ingredients: String[],
    instructions: String[]
}

export async function saveRecipeToDb (userId: number, recipe: Recipe) {
    const { name, description, ingredients, instructions } = recipe
    await db.insert(recipesTable).values({
      user_id: userId,
      name,
      description,
      ingredients,
      instructions
    })
  }