import type { Todo } from '../main.ts'
import { addToList } from '../showTodoList.ts'
import { changingOverdueMessage } from './changingOverdueMessage.ts'

function deleteTodo(
  index: number,
  today: Date,
  output: HTMLUListElement,
  todos: Todo[],
  messageOverdue: HTMLParagraphElement,
  OverdueMessage: HTMLDivElement,
) {
  fetch(`https://api.todos.in.jt-lab.ch/todos?id=eq.${todos[index].id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todos[index]),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error))
  todos.splice(index, 1)
  output.innerHTML = ''
  todos.forEach((todo, i) => {
    addToList(todo, i, output, todos, messageOverdue, OverdueMessage)
  })
  changingOverdueMessage(todos, today, messageOverdue, OverdueMessage)
}

export { deleteTodo }
