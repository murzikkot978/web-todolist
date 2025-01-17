import type { Todo } from '../main.ts'
import { addToList } from '../showTodoList.ts'
import { changingOverdueMessage } from './changingOverdueMessage.ts'

//Function can delete todo
function deleteTodo(
  index: number,
  today: Date,
  output: HTMLUListElement,
  todos: Todo[],
  messageOverdue: HTMLParagraphElement,
  OverdueMessage: HTMLDivElement,
) {
  if (output) {
    todos.splice(index, 1)
    localStorage.setItem('todo_list', JSON.stringify(todos))
    output.innerHTML = ''
    todos.forEach((todo, i) => {
      addToList(todo, i, output, todos, messageOverdue, OverdueMessage)
    })
    changingOverdueMessage(todos, today, messageOverdue, OverdueMessage)
  }
}

export { deleteTodo }
