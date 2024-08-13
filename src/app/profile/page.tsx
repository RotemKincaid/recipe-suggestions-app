import { db } from "@/db"
import { auth } from "../../../auth"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import DeleteComponent from "../components/DeleteComponent"

export default async function ProfilePage() {
    const session = await auth()

    const recipes = await db.query.recipesTable.findMany()

    if (!session?.user) {
        redirect("api/auth/signin?callbackUrl=/profile")
    }

    return (
        <>
           <div className="bg-gradient-to-r from-indigo-500 to-cyan-500 w-screen h-screen">
            { session.user &&
                <div>
                    <div className="h-full flex flex-col items-center justify-around">
                        <div className="text-3xl text-slate-50 pb-4">My Saved Recipes</div>
                        <Link href="/">
                          <Button>Get more recipes!</Button>
                        </Link>
                    </div>
                    <div className="w-screen flex flex-col align-center justify-around p-8">
                        {recipes?.map((recipe, i) => (
                        <Card className="max-w-m p-4 bg-white border border-gray-200 rounded-lg mb-4" key={i}>
                        <DeleteComponent id={recipe.id} />
                        <CardHeader>
                            <CardTitle>{recipe.name}</CardTitle>
                            <CardDescription>{recipe.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-1">
                            <div className="flex flex-col flex-1 mb-2">
                            <div>Ingredients:</div>
                            <div className="bg-slate-100 border border-slate-200 shadow-sm rounded mb-2">
                                <ul>{recipe.ingredients.split(',').map((ingredient: string, idx: number) => (
                                <li key={idx}>{ingredient}</li>
                                ))}
                                </ul>
                            </div>
                            <ol className="list-decimal ml-4">
                                {recipe.instructions.split('.,').map((step: string, index: number) => (
                                <li key={index}>{step}{step.includes(".")? '': '.'}</li>
                                ))}
                            </ol>
                            </div>
                        </CardContent>
                        </Card>
                        ))}
                    </div>
                </div>
             } 
            { !session.user && 
               <div>Log in to see your saved recipes!</div>
            }
           </div>
        </>
    )
}

