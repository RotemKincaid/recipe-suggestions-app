'use client'

import { useState } from "react"

// create all of these
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import LoadingSpinner from "@/app/components/LoadingSpinner"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { generateRecipes } from "./actions"

export default function Home() {
  const [prompt, setPrompt] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [recipes, setRecipes] = useState<any[]>([])

  async function onSubmit () {
    setIsLoading(true)
    await generateRecipes(prompt)
    setIsLoading(false)
  }

  return (
    <main>
      <header>Cooking with Ro!</header>
      <div className="flex items-center gap-2 mb-4">
        <Input type="text" placeholder="Specify some themes or ingredients" value={prompt} onChange={(e:any) => setPrompt(e.target.value)} />
        <Button type="submit" onClick={() => onSubmit()}>Generate Ideas!</Button>
      </div>
      {isLoading && <LoadingSpinner />}
      <div className="grid md:grid-cols-3 gap-4">
        {recipes.length > 0 && recipes.map((recipe, i) => (
          <Card className="flex flex-col flex-1" key={i}>
            <CardHeader>
              <CardTitle>{recipe.name}</CardTitle>
              <CardDescription>{recipe.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col flex-1">
              <div className="flex flex-col flex-1 mb-2">
                <div>Ingredients:</div>
                <div className="bg-slate-100 border border-slate-200 shadow-sm rounded mb-2">
                  <ul>{recipe.ingredients.map((ingredient: string, idx: number) => (
                    <li key={idx}>{ingredient}</li>
                  ))}
                    </ul>
                </div>
                <ol className="list-decimal ml-4">
                  {recipe.instructions.map((step: string, index: number) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
              <Button onClick={() => alert("You clicked the button!")}>Save</Button>
            </CardContent>
          </Card>
        ))}

      </div>
    </main>
  );
}
