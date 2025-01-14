import './style.css'
import {sortTodoByDate, deleteAllTodo, stateHandle} from "./modificationTodo.ts";
import {addToStorage} from "./storage.ts";
import {addToList} from "./showTodoList.ts";

console.log('Hello from typescript')
const input = document.querySelector<HTMLInputElement>('#todo-input')
const output = document.querySelector<HTMLUListElement>('.todo-element')
const button = document.querySelector<HTMLButtonElement>('#add-todo-button')
const myObj_deserialized = localStorage.getItem('todo_list')
const deleteAll = document.querySelector('#delete-all')
const date_input = document.querySelector<HTMLInputElement>('#date-input')
const todoCreationError = document.querySelector('#todo-creation-error')
const creationErrorMessage = document.createElement('p')
const overdueMessage = document.querySelector('#overdue-message')
const messageOverdue = document.createElement('p')
creationErrorMessage.style.color = 'red'
messageOverdue.style.background = 'red'
messageOverdue.style.color = 'white'
const sort = document.querySelector<HTMLButtonElement>('#sort-button')

//Button disable true||false
if (button && input) {
  button.disabled = true
  input.addEventListener('input', stateHandle)
}

//Structure todos
interface Todo {
  text: string
  status: 'done' | 'undone'
  date: string
}
let todos: Todo[] = []
if (myObj_deserialized) {
  todos = JSON.parse(myObj_deserialized)
  todos.forEach(addToList)
}

//In this block we look all actions like click or keydown
if (input && button && deleteAll && output && sort && date_input) {
  input.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      addToStorage()
    }
    stateHandle()
  })
  button.addEventListener('click', () => {
    addToStorage()
    stateHandle()
  })
  deleteAll.addEventListener('click', () => {
    deleteAllTodo()
  })
  sort.addEventListener('click', sortTodoByDate)
  date_input.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      addToStorage()
    }
    stateHandle()
  })
} else {
  throw new Error('refresh page web')
}

export {output, todos, type Todo, overdueMessage, messageOverdue, button, input, date_input, todoCreationError, creationErrorMessage}
