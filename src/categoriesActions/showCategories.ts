import type { CAT } from '../main.ts'
import { deleteCategories } from './deleteCategories.ts'

function showCategories(
  categori: CAT,
  categories: CAT[],
  indexCategori: number,
) {
  const ulCategories = document.createElement('ul')
  const liCategories = document.createElement('li')
  const divCategories = document.querySelector<HTMLDivElement>('.categories')
  ulCategories.className = 'ulCategories'
  liCategories.className = 'liCategories'

  if (!divCategories) {
    console.log('No categories found')
    return
  }

  liCategories.append(`(${categori.title})`)
  liCategories.style.backgroundColor = categori.color

  const btnToDeleteCategori = document.createElement('button')
  btnToDeleteCategori.textContent = 'DELETE'
  btnToDeleteCategori.addEventListener('click', () => {
    deleteCategories(categories, indexCategori, divCategories)
  })
  liCategories.append(btnToDeleteCategori)

  ulCategories.append(liCategories)
  divCategories.append(ulCategories)
}

export { showCategories }
