import type { Todo } from '../main.ts'
import { addToList } from '../showTodoList.ts'

let sorted = true
function sortTodoByDate(
  todos: Todo[],
  output: HTMLUListElement,
  messageOvedue: HTMLParagraphElement,
  overdueMessage: HTMLDivElement,
) {
  console.log(todos)
  if (sorted) {
    sortMinToMax(todos)
  } else {
    sortMaxToMin(todos)
  }
  sorted = !sorted

  if (output) {
    output.innerHTML = ''
    todos.forEach((todo, index) => {
      addToList(todo, index, output, todos, messageOvedue, overdueMessage)
    })
  }
}

function sortMinToMax(todos: Todo[]) {
  todos.sort(
    (a, b) => new Date(a.due_date).getDate() - new Date(b.due_date).getDate(),
  )
  return todos
}
function sortMaxToMin(todos: Todo[]) {
  todos.sort(
    (a, b) => new Date(b.due_date).getDate() - new Date(a.due_date).getDate(),
  )
  return todos
}

export { sortTodoByDate }
