import './style.css'
import { stateHandle } from './todoActions/stateHandle.ts'
import { addToList } from './showTodoList.ts'
import { addToStorage } from './storage.ts'
import { deleteAllTodo } from './todoActions/deleteAllTodo.ts'
import { sortTodoByDate } from './todoActions/sortTodoByDate.ts'

console.log('Hello from typescript')
const input = document.querySelector<HTMLInputElement>('#todo-input')
const output = document.querySelector<HTMLUListElement>('.todo-element')
const button = document.querySelector<HTMLButtonElement>('#add-todo-button')
const myObj_deserialized = localStorage.getItem('todo_list')
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

//Button disable true||false
if (button && input) {
  button.disabled = true
  input.addEventListener('input', () => {
    stateHandle(button, input)
  })
}

//Structure todos
export interface Todo {
  text: string
  status: 'done' | 'undone'
  date: string
}
let todos: Todo[] = []
if (myObj_deserialized && output && overdueMessage) {
  todos = JSON.parse(myObj_deserialized)
  for (const [index, todo] of todos.entries()) {
    addToList(todo, index, output, todos, messageOverdue, overdueMessage)
  }
}

//In this block we look all actions like click or keydown
if (
  input &&
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
        date_input,
        todoCreationError,
        creationErrorMessage,
        todos,
        output,
        messageOverdue,
        overdueMessage,
      )
    }
    stateHandle(button, input)
  })
  button.addEventListener('click', () => {
    if (todoCreationError) {
      addToStorage(
        input,
        date_input,
        todoCreationError,
        creationErrorMessage,
        todos,
        output,
        messageOverdue,
        overdueMessage,
      )
    }
    stateHandle(button, input)
  })
  deleteAll.addEventListener('click', () => {
    deleteAllTodo(output, todos, messageOverdue, overdueMessage)
  })
  sort.addEventListener('click', () => {
    sortTodoByDate(todos, output, messageOverdue, overdueMessage)
  })
  date_input.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Enter' && todoCreationError) {
      addToStorage(
        input,
        date_input,
        todoCreationError,
        creationErrorMessage,
        todos,
        output,
        messageOverdue,
        overdueMessage,
      )
    }
    stateHandle(button, input)
  })
} else {
  throw new Error('refresh page web')
}
