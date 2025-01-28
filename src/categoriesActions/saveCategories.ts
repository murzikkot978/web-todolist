import type { Categoriesstruct } from '../main.ts'
import { urlCategories } from '../main.ts'
import { showCategories } from './showCategories.ts'

async function saveCategories(
  categoriesInput: HTMLInputElement,
  categoriesColor: HTMLInputElement,
  categories: Categoriesstruct[],
) {
  const title = categoriesInput.value.trim()
  const color = categoriesColor.value.trim()

  const newCategories: {
    title: string
    color: string
  } = { title, color }

  try {
    const response = await fetch(urlCategories, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
        Accept: 'application/vnd.pgrst.object+json',
      },
      body: JSON.stringify(newCategories),
    })
    const savedCategorie = (await response.json()) as Categoriesstruct
    categories.push(savedCategorie)
    showCategories(savedCategorie, categories, categories.length - 1)
    categoriesInput.value = ''
    categoriesColor.value = ''
  } catch (error) {
    console.log(error)
  }
}

export { saveCategories }
