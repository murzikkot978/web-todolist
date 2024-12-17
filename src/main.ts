import './style.css'

console.log('Hello from typescript')
const input = document.querySelector<HTMLInputElement>('#todo-input')
const output = document.querySelector('.todo-element')
const button = document.querySelector('#add-todo-button')
const myObj_deserialized = localStorage.getItem('todo_list')

let todos: string[] = []
if (myObj_deserialized) {
  todos = JSON.parse(myObj_deserialized)
  todos.forEach(addToList) // Render all existing todos on page load
}

function addToList(todo: string, index: number) {
  if (output) {
    const li = document.createElement('li')
    li.textContent = todo

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

function addToStorage(): void {
  if (input) {
    const text: string = input.value.trim()

    if (text) {
      todos.push(text)
      const myObj_serialized = JSON.stringify(todos)
      localStorage.setItem('todo_list', myObj_serialized)
      addToList(text, todos.length - 1)
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
