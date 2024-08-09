import { usersTable as users } from "@/db/schema"
import { db } from "@/db"
import { eq } from 'drizzle-orm';

import { auth } from "../../../auth"
import { redirect } from "next/navigation"
import Image from "next/image"

export default async function ProfilePage() {
    const session = await auth()
    const userId = 1

    // Fetch user
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .then((res) => res[0])

    const recipes = await db.query.recipesTable.findMany()

    if (!session?.user) {
        // return <div>Not Logged In</div>
        redirect("api/auth/signin?callbackUrl=/profile")
    }

    return (
        <>
           {/* <pre>
            {JSON.stringify(session.user, null, 2)}
           </pre> */}
           <div>
            {session.user.name} - {session.user.email}
            <Image src={session.user.image} width={50} height={50}/>
           </div>

           <div className="mt-7">
             <div>
                <div>Recipes</div>
             </div>
             <div>
                {recipes?.map((recipe) => (
                    <div key={recipe.id}>{recipe.name} - {recipe.description}</div>
                ))}
             </div>
           </div>
        </>
    )
}

