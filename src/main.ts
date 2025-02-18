import './style.css'
import { addToList } from './showTodoList.ts'
import { addToStorage } from './storage.ts'
import { deleteAllTodo } from './todoActions/deleteAllTodo.ts'
import { sortTodoByDate } from './todoActions/sortTodoByDate.ts'
import { stateHandle } from './todoActions/stateHandle.ts'

import { saveCategories } from './categoriesActions/saveCategories.ts'
import { showCategories } from './categoriesActions/showCategories.ts'

console.log('Hello from typescript')

const input = document.querySelector<HTMLInputElement>('#todo-input')
const contentInput = document.querySelector<HTMLInputElement>('#content-input')
const output = document.querySelector<HTMLUListElement>('.todo-element')
const button = document.querySelector<HTMLButtonElement>('#add-todo-button')
export const url = new URL('https://api.todos.in.jt-lab.ch/todos')
const deleteAll = document.querySelector<HTMLButtonElement>('#delete-all')
const date_input = document.querySelector<HTMLInputElement>('#date-input')
const todoCreationError = document.querySelector<HTMLDivElement>(
  '#todo-creation-error',
)
const creationErrorMessage = document.createElement('p')
const overdueMessage =
  document.querySelector<HTMLDivElement>('#overdue-message')
const messageOverdue = document.createElement('p')
creationErrorMessage.style.color = 'red'
messageOverdue.style.background = 'red'
messageOverdue.style.color = 'white'
const sort = document.querySelector<HTMLButtonElement>('#sort-button')

//Categories list
const categoriesInput =
  document.querySelector<HTMLInputElement>('#categoriesInpute')
const categoriesColor =
  document.querySelector<HTMLInputElement>('#categoriesColor')
const buttonCategoriesInput = document.querySelector<HTMLButtonElement>(
  '#buttonCategoriesInpute',
)
export const urlCategories = new URL(
  'https://api.todos.in.jt-lab.ch/categories',
)

if (buttonCategoriesInput && categoriesInput) {
  buttonCategoriesInput.disabled = true
  categoriesInput.addEventListener('input', () => {
    stateHandle(buttonCategoriesInput, categoriesInput)
  })
}

export interface Categoriesstruct {
  id: number
  title: string
  color: string
}

//Structure todos
export interface Todo {
  id: number
  title: string
  content: string | null
  due_date: string
  done: boolean
}

async function fetchGetCategories() {
  const response = await fetch(urlCategories)
  return await response.json()
}

async function fetchGetTodo() {
  const response = await fetch(url)
  return await response.json()
}

async function main() {
  if (url && output && overdueMessage) {
    const categories = await fetchGetCategories()

    for (const [indexCategories, categori] of categories.entries()) {
      showCategories(categori, categories, indexCategories)
    }

    //Button disable true||false
    if (button && input) {
      button.disabled = true
      input.addEventListener('input', () => {
        stateHandle(button, input)
      })
    }

    const todos = await fetchGetTodo()

    for (const [index, todo] of todos.entries()) {
      addToList(
        todo,
        index,
        output,
        todos,
        messageOverdue,
        overdueMessage,
        categories,
      )
    }

    //In this block we look all actions like click or keydown
    if (
      input &&
      contentInput &&
      button &&
      deleteAll &&
      output &&
      sort &&
      date_input &&
      overdueMessage
    ) {
      input.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Enter' && todoCreationError) {
          addToStorage(
            input,
            contentInput,
            date_input,
            todoCreationError,
            creationErrorMessage,
            todos,
            output,
            messageOverdue,
            overdueMessage,
            categories,
          )
        }
        stateHandle(button, input)
      })
      button.addEventListener('click', () => {
        if (todoCreationError) {
          addToStorage(
            input,
            contentInput,
            date_input,
            todoCreationError,
            creationErrorMessage,
            todos,
            output,
            messageOverdue,
            overdueMessage,
            categories,
          )
        }
        stateHandle(button, input)
      })
      deleteAll.addEventListener('click', () => {
        deleteAllTodo(output, todos, messageOverdue, overdueMessage)
      })
      sort.addEventListener('click', () => {
        sortTodoByDate(
          todos,
          output,
          messageOverdue,
          overdueMessage,
          categories,
        )
      })
      date_input.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Enter' && todoCreationError) {
          addToStorage(
            input,
            contentInput,
            date_input,
            todoCreationError,
            creationErrorMessage,
            todos,
            output,
            messageOverdue,
            overdueMessage,
            categories,
          )
        }
        stateHandle(button, input)
      })
      contentInput.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Enter' && todoCreationError) {
          addToStorage(
            input,
            contentInput,
            date_input,
            todoCreationError,
            creationErrorMessage,
            todos,
            output,
            messageOverdue,
            overdueMessage,
            categories,
          )
        }
        stateHandle(button, input)
      })
    } else {
      throw new Error('refresh page web')
    }
    if (buttonCategoriesInput && categoriesInput && categoriesColor) {
      if (/^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(categoriesColor.value)) {
        buttonCategoriesInput.addEventListener('click', () => {
          saveCategories(categoriesInput, categoriesColor, categories)
        })
      }
      stateHandle(buttonCategoriesInput, categoriesInput)
    } else {
      console.log('buttonCategoriesInput is not exist')
    }
  }
}
main()
