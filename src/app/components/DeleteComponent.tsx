'use client'

import { onDelete } from "@/db/queries/recipeQueries"

export default function SignOutButton ({id} ) {
  return (
    <button className="w-2 h-2 text-neutral-500 hover:text-neutral-700 text-sm" onClick={() => {
      onDelete(id)
    }}>
        X
    </button>
  )
}
