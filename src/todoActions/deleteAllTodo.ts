import type { Todo } from '../main.ts'
import { url } from '../main.ts'
import { changingOverdueMessage } from './changingOverdueMessage.ts'

function deleteAllTodo(
  output: HTMLUListElement,
  todos: Todo[],
  messageOverdue: HTMLParagraphElement,
  overdueMessage: HTMLDivElement,
) {
  if (output) {
    output.innerHTML = ''
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todos),
    })
    todos.length = 0
    changingOverdueMessage(todos, new Date(), messageOverdue, overdueMessage)
  }
}

export { deleteAllTodo }
