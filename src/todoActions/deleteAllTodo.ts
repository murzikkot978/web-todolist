import type { Todo } from '../main.ts'
import { changingOverdueMessage } from './changingOverdueMessage.ts'

function deleteAllTodo(
  output: HTMLUListElement,
  todos: Todo[],
  messageOverdue: HTMLParagraphElement,
  overdueMessage: HTMLDivElement,
) {
  if (output) {
    output.innerHTML = ''
    localStorage.removeItem('todo_list')
    todos.length = 0
    changingOverdueMessage(todos, new Date(), messageOverdue, overdueMessage)
  }
}

export { deleteAllTodo }
