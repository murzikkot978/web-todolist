import './style.css'

console.log('Hello from typescript')
const input = document.querySelector<HTMLInputElement>('#todo-input')
const output = document.querySelector('.todo-element')
const button = document.querySelector('#add-todo-button')

function addtolist(): void {
  if (input && output) {
    const text: string = input.value.trim()
    if (text) {
      const li = document.createElement('li')
      li.textContent = text
      output.appendChild(li)
      input.value = ''
    }
  } else {
    throw new Error('refresh page web')
  }
}
if (input && button) {

  input.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      addtolist()
    }
  })
  button.addEventListener("click", () => {
    addtolist()
  })

}else {
  throw new Error('refresh page web')
}
