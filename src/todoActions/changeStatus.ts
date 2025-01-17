import type { Todo } from '../main.ts'
import { addToList } from '../showTodoList.ts'

//Function change status for each todo
function changeStatus(
  output: HTMLUListElement,
  index: number,
  todos: Todo[],
  messageOvedue: HTMLParagraphElement,
  overdueMessage: HTMLDivElement,
): void {
  console.log(`index ${index}`)
  if (output) {
    if (todos[index].status === 'done') {
      todos[index].status = 'undone'
    } else {
      todos[index].status = 'done'
    }
    localStorage.setItem('todo_list', JSON.stringify(todos))

    output.innerHTML = ''

    todos.forEach((todo, i) => {
      addToList(todo, i, output, todos, messageOvedue, overdueMessage)
    })
  }
}

export { changeStatus }
