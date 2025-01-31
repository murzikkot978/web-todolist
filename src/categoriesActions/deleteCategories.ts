import type { Categoriesstruct } from '../main.ts'
import { showCategories } from './showCategories.ts'

function deleteCategories(
  categories: Categoriesstruct[],
  indexCategori: number,
  divCategories: HTMLDivElement,
): void {
  fetch(
    `https://api.todos.in.jt-lab.ch/categories?id=eq.${categories[indexCategori].id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categories[indexCategori]),
    },
  )
    .then((response) => {
      if (!response.ok) {
        console.log('Error deleting categories.')
      }
    })
    .catch((error) => console.error(error))
  categories.splice(indexCategori, 1)
  divCategories.innerHTML = ''
  categories.forEach((categori, i) => {
    showCategories(categori, categories, i)
  })
}

export { deleteCategories }
