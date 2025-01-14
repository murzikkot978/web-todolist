import {type Todo, output, todos} from "./main.ts";
import {changeStatus, deleteTodo, changingOverdueMessage} from "./modificationTodo.ts";

//Function add all button and todos
function addToList(todo: Todo, index: number) {
  if (output) {
    const ul = document.createElement('ul')
    ul.className = 'ul'
    const li = document.createElement('li')
    li.className = 'todo-list'
    const li2 = document.createElement('li')
    li2.className = 'todo-list2'
    li.textContent = `${todo.text}`
    li2.textContent = `${todo.status}`

    const status = document.createElement('input')
    status.type = 'checkbox'
    status.checked = todo.status === 'done'
    status.addEventListener('change', () => {
      changeStatus(index)
    })
    li2.appendChild(status)

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
    li2.appendChild(dates)

    const btnToDeleteTodo = document.createElement('button')
    btnToDeleteTodo.textContent = 'DELETE'

    li2.appendChild(btnToDeleteTodo)

    ul.appendChild(li)
    ul.appendChild(li2)
    output.appendChild(ul)

    btnToDeleteTodo.addEventListener('click', () => {
      deleteTodo(index, today)
    })
    changingOverdueMessage(todos, today)
  } else {
    throw new Error('refresh page web')
  }
}

export {addToList}