'use server'

import { db } from "@/db"
import { eq } from 'drizzle-orm';
import { recipesTable } from "@/db/schema"

export const onDelete = async (id: number) => {
    await db.delete(recipesTable).where(eq(recipesTable.id, id))
    .returning({ deletedId: recipesTable.id });

    // Do I need this?
    await db.query.recipesTable.findMany()
}