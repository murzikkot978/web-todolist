import './style.css'

console.log('Hello from typescript')
const input = document.querySelector<HTMLInputElement>('#todo-input')
const output = document.querySelector('.todo-element')
const button = document.querySelector<HTMLButtonElement>('#add-todo-button')
const myObj_deserialized = localStorage.getItem('todo_list')
const deleteAll = document.querySelector('#delete-all')
const date_input = document.querySelector<HTMLInputElement>('#date-input')
const todoCreationError = document.querySelector('#todo-creation-error')
const creationErrorMessage = document.createElement('p')
creationErrorMessage.style.color = 'red'

//Button disable true||false
if (button && input) {
  button.disabled = true

  input.addEventListener('input', stateHandle)
}
function stateHandle() {
  if (button && input) {
    if (input.value && input.value.length <= 200) {
      button.disabled = false
    } else {
      button.disabled = true
    }
  }
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

//Function add all button and todos
function addToList(todo: Todo, index: number) {
  if (output) {
    const li = document.createElement('li')
    li.className = 'todo-list'
    li.textContent = `${todo.text} ${todo.status}`

    const status = document.createElement('input')
    status.type = 'checkbox'
    status.checked = todo.status === 'done'
    status.addEventListener('change', () => {
      changeStatus(index)
    })
    li.appendChild(status)

    const today = new Date()
    const deadline = new Date(todo.date)
    const afterfordays = new Date(today)
    afterfordays.setDate(afterfordays.getDate() + 4)

    const formatToday = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
    const formatDeadline = `${deadline.getFullYear()}-${deadline.getMonth() + 1}-${deadline.getDate()}`

    const dates = document.createElement('p')
    const time = document.createElement('time')
    time.textContent = todo.date
    if (
      deadline.toISOString().slice(0, 10) < today.toISOString().slice(0, 10)
    ) {
      dates.style.color = 'red'
    } else if (formatDeadline === formatToday) {
      dates.style.color = 'orange'
    } else if (deadline > today && deadline < afterfordays) {
      dates.style.color = 'yellow'
    } else {
      dates.style.color = 'green'
    }

    dates.appendChild(time)
    li.appendChild(dates)

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

//Function can delete todo
function deleteTodo(index: number) {
  if (output) {
    todos.splice(index, 1)
    localStorage.setItem('todo_list', JSON.stringify(todos))

    output.innerHTML = ''
    todos.forEach(addToList)
  }
}

//Function change status for each todo
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

//Function add todos, status and date for each todo in local storage
function addToStorage(): void {
  if (input && date_input && todoCreationError) {
    const text: string = input.value.trim()

    const dates = new Date(date_input.value)

    if (Number.isNaN(dates.valueOf())) {
      creationErrorMessage.textContent = 'invalid date'
    } else {
      const date: string = date_input.value.trim()
      if (text) {
        const newTodo: Todo = { text, status: 'undone', date }
        todos.push(newTodo)
        const myObj_serialized = JSON.stringify(todos)
        localStorage.setItem('todo_list', myObj_serialized)
        addToList(newTodo, todos.length - 1)
        input.value = ''
      } else {
        throw new Error('refresh page web')
      }
      creationErrorMessage.textContent = ''
    }
    todoCreationError.appendChild(creationErrorMessage)
  }
}

//In this block we look all actions like click or keydown
if (input && button && deleteAll && output) {
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
    output.innerHTML = ''
    localStorage.removeItem('todo_list')
    todos = []
  })
} else {
  throw new Error('refresh page web')
}
