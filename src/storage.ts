import {input, todos, type Todo, date_input, todoCreationError, creationErrorMessage} from "./main.ts";
import {addToList} from "./showTodoList.ts";

//Function add todos, status and date for each todo in local storage
function addToStorage(): void {
  if (input && date_input && todoCreationError) {
    const text: string = input.value.trim()

    const dates = new Date(date_input.value)

    if (Number.isNaN(dates.valueOf())) {
      creationErrorMessage.textContent = 'invalid date'
    } else {
      const date: string = date_input.value.trim()
      if (text) {
        const newTodo: Todo = {text, status: 'undone', date}
        todos.push(newTodo)
        const myObj_serialized = JSON.stringify(todos)
        localStorage.setItem('todo_list', myObj_serialized)
        addToList(newTodo, todos.length - 1)
        input.value = ''
      } else {
        throw new Error('refresh page web')
      }
      creationErrorMessage.textContent = ''
    }
    todoCreationError.appendChild(creationErrorMessage)
  }
}

export {addToStorage}
