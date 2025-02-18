import type { Categoriesstruct, Todo } from '../main.ts'
import { addToList } from '../showTodoList.ts'

//Function change status for each todo
function changeStatus(
  output: HTMLUListElement,
  index: number,
  todos: Todo[],
  messageOvedue: HTMLParagraphElement,
  overdueMessage: HTMLDivElement,
  categories: Categoriesstruct[],
): void {
  let status: boolean
  if (output) {
    status = !todos[index].done
    fetch(`https://api.todos.in.jt-lab.ch/todos?id=eq.${todos[index].id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
        Accept: 'application/vnd.pgrst.object+json',
      },
      body: JSON.stringify({ done: status }),
    })
      .then((response) => response.json())
      .then((data) => {
        todos[index] = data
        output.innerHTML = ''

        todos.forEach((todo, i) => {
          addToList(
            todo,
            i,
            output,
            todos,
            messageOvedue,
            overdueMessage,
            categories,
          )
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

export { changeStatus }
