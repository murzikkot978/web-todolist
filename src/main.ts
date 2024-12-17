import './style.css'

console.log('Hello from typescript')
const input = document.querySelector<HTMLInputElement>('#todo-input')
const output = document.querySelector('.todo-element')
const button = document.querySelector('#add-todo-button')
const myObj_deserialized = localStorage.getItem('todo_list')

interface Todo {
  text: string
  status: 'done' | 'undone'
}

let todos: Todo[] = []
if (myObj_deserialized) {
  todos = JSON.parse(myObj_deserialized)
  todos.forEach(addToList)
}

function addToList(todo: Todo, index: number) {
  if (output) {
    const li = document.createElement('li')
    li.textContent = `${todo.text} ${todo.status}`

    const status = document.createElement('input')
    status.type = 'checkbox'
    status.checked = todo.status === 'done'
    status.addEventListener('change', () => {
      changeStatus(index)
    })
    li.appendChild(status)

    const btnToDeleteTodo = document.createElement('button')
    btnToDeleteTodo.textContent = 'DELETE'

    li.appendChild(btnToDeleteTodo)

    output.appendChild(li)

    btnToDeleteTodo.addEventListener('click', () => {
      deleteTodo(index)
    })
  } else {
    throw new Error('refresh page web')
  }
}

function deleteTodo(index: number) {
  if (output) {
    todos.splice(index, 1)
    localStorage.setItem('todo_list', JSON.stringify(todos))

    output.innerHTML = ''
    todos.forEach(addToList)
  }
}

function changeStatus(index: number) {
  if (output) {
    if (todos[index].status === 'done') {
      todos[index].status = 'undone'
    } else {
      todos[index].status = 'done'
    }
    localStorage.setItem('todo_list', JSON.stringify(todos))

    output.innerHTML = ''
    todos.forEach(addToList)
  }
}

function addToStorage(): void {
  if (input) {
    const text: string = input.value.trim()

    if (text) {
      const newTodo: Todo = { text, status: 'undone' }
      todos.push(newTodo)
      const myObj_serialized = JSON.stringify(todos)
      localStorage.setItem('todo_list', myObj_serialized)
      addToList(newTodo, todos.length - 1)
      input.value = ''
    } else {
      throw new Error('refresh page web')
    }
  }
}

if (input && button) {
  input.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      addToStorage()
    }
  })
  button.addEventListener('click', () => {
    addToStorage()
  })
} else {
  throw new Error('refresh page web')
}
