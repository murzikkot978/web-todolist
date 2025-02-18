import type { Categoriesstruct, Todo } from './main.ts'
import { url } from './main.ts'
import { addToList } from './showTodoList.ts'

async function addToStorage(
  input: HTMLInputElement,
  contentInput: HTMLInputElement,
  date_input: HTMLInputElement,
  todoCreationError: HTMLDivElement,
  creationErrorMessage: HTMLElement,
  todos: Todo[],
  output: HTMLUListElement,
  messageOvedue: HTMLParagraphElement,
  overdueMessage: HTMLDivElement,
  categories: Categoriesstruct[],
): Promise<void> {
  if (input && date_input && todoCreationError) {
    const title: string = input.value.trim()
    let content: string | null
    if (contentInput.value) {
      content = contentInput.value.trim()
    } else {
      content = null
    }

    const dates = new Date(date_input.value)

    if (Number.isNaN(dates.valueOf())) {
      creationErrorMessage.textContent = 'invalid date'
    } else {
      const due_date: string = date_input.value.trim()

      const newTodo: {
        title: string
        content: string | null
        due_date: string
      } = { title, content, due_date }

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Prefer: 'return=representation',
            Accept: 'application/vnd.pgrst.object+json',
          },
          body: JSON.stringify(newTodo),
        })
        const savedTodo = (await response.json()) as Todo
        console.log(savedTodo.id)
        todos.push(savedTodo)
        addToList(
          savedTodo,
          todos.length - 1,
          output,
          todos,
          messageOvedue,
          overdueMessage,
          categories,
        )
      } catch (error) {
        console.log(error)
      }

      input.value = ''
      contentInput.value = ''
      creationErrorMessage.textContent = ''
    }
    todoCreationError.appendChild(creationErrorMessage)
  }
}

export { addToStorage }
