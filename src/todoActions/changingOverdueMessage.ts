import type { Todo } from '../main.ts'

function changingOverdueMessage(
  todos: Todo[],
  today: Date,
  messageOverdue: HTMLParagraphElement,
  overdueMessage: HTMLDivElement,
) {
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

export { changingOverdueMessage }
