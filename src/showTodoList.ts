import { categoriesForTodo } from './categoriesActions/categories-for-todo.ts'
import type { Categoriesstruct, Todo } from './main.ts'
import { categories } from './main.ts'
import { changeStatus } from './todoActions/changeStatus.ts'
import { changingOverdueMessage } from './todoActions/changingOverdueMessage.ts'
import { deleteTodo } from './todoActions/deleteTodo.ts'

//Function add all button and todos
async function addToList(
  todo: Todo,
  index: number,
  output: HTMLUListElement,
  todos: Todo[],
  messageOverdue: HTMLParagraphElement,
  overdueMessage: HTMLDivElement,
): Promise<void> {
  if (output) {
    const ul = document.createElement('ul')
    ul.className = 'ul'
    const li = document.createElement('li')
    li.className = 'todo-list'
    const li2 = document.createElement('li')
    li2.className = 'todo-list2'
    li.append(`(${todo.title}) `)
    if (todo.content !== null) {
      li.append(`${todo.content}`)
    }

    const response = await fetch(
      'https://api.todos.in.jt-lab.ch/todos?select=*,categories(id)',
    )
    const referenceBetvineCategoriesAndTodos = await response.json()

    const select = document.createElement('select')
    const option = document.createElement('option')

    if (referenceBetvineCategoriesAndTodos[index].categories.length > 0) {
      const indexCategory = categories.findIndex(
        (p: Categoriesstruct) =>
          p.id === referenceBetvineCategoriesAndTodos[index].categories[0].id,
      )
      option.value = ''
      option.text = categories[indexCategory].title
    } else {
      option.value = ''
      option.text = '--Choose a category--'
    }

    select.append(option)
    for (const item of categories) {
      const options = document.createElement('option')
      options.value = item.id.toString()
      options.text = item.title
      select.append(options)
    }
    select.addEventListener('change', () => {
      categoriesForTodo(select.value, todo.id)
    })
    li.append(select)

    li2.textContent = `${todo.done}`

    const status = document.createElement('input')
    status.type = 'checkbox'
    status.checked = todo.done
    status.addEventListener('change', () => {
      changeStatus(output, index, todos, messageOverdue, overdueMessage)
    })
    li2.appendChild(status)

    const today = new Date()
    const deadline = new Date(todo.due_date)
    const afterfordays = new Date(today)
    afterfordays.setDate(afterfordays.getDate() + 4)

    const formatToday = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
    const formatDeadline = `${deadline.getFullYear()}-${deadline.getMonth() + 1}-${deadline.getDate()}`

    const dates = document.createElement('p')
    const time = document.createElement('time')
    time.textContent = todo.due_date
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
      deleteTodo(index, today, output, todos, overdueMessage, messageOverdue)
    })
    changingOverdueMessage(todos, today, messageOverdue, overdueMessage)
  } else {
    throw new Error('refresh page web')
  }
}

export { addToList }
