import {type Todo, messageOverdue, output, overdueMessage, todos, input, button} from "./main.ts";
import {addToList} from "./showTodoList.ts";

//Function change status for each todo
function changeStatus(index: number) {
  if (output) {
    if (todos[index].status === 'done') {
      todos[index].status = 'undone'
    } else {
      todos[index].status = 'done'
    }
    localStorage.setItem('todo_list', JSON.stringify(todos))

    output.innerHTML = ''
    todos.forEach(addToList)
  }
}

function stateHandle() {
  if (button && input) {
    button.disabled = !(input.value && input.value.length <= 200)
  }
}

let sorted = true
function sortTodoByDate() {
  if (sorted) {
    sortMinToMax(todos)
  } else {
    sortMaxToMin(todos)
  }
  sorted = !sorted

  localStorage.setItem('todo_list', JSON.stringify(todos))
  if (output) {
    output.innerHTML = ''
    todos.forEach(addToList)
  }
}

function sortMinToMax(todos: Todo[]) {
  todos.sort((a, b) => new Date(a.date).getDate() - new Date(b.date).getDate())
  return todos
}
function sortMaxToMin(todos: Todo[]) {
  todos.sort((a, b) => new Date(b.date).getDate() - new Date(a.date).getDate())
  return todos
}

function changingOverdueMessage(todos: Todo[], today: Date) {
  if (overdueMessage) {
    let overdueCount = 0
    for (const todo of todos) {
      if (todo.date < today.toISOString().slice(0, 10)) {
        overdueCount++
      }
    }
    if (overdueCount > 0) {
      messageOverdue.textContent = 'You have overdue todos!!!'
    } else {
      messageOverdue.textContent = ''
    }
    overdueMessage.innerHTML = ''
    overdueMessage.appendChild(messageOverdue)
    console.log(overdueCount)
  }
}

//Function can delete todo
function deleteTodo(index: number, today: Date) {
  if (output) {
    todos.splice(index, 1)
    localStorage.setItem('todo_list', JSON.stringify(todos))
    output.innerHTML = ''
    todos.forEach(addToList)
    changingOverdueMessage(todos, today)
  }
}

function deleteAllTodo() {
  if (output) {
    output.innerHTML = ''
    localStorage.removeItem('todo_list')
    todos.length = 0
    changingOverdueMessage(todos, new Date())
  }
}

export {changeStatus, sortTodoByDate, deleteAllTodo, deleteTodo, changingOverdueMessage, stateHandle}
