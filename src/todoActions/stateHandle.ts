function stateHandle(button: HTMLButtonElement, input: HTMLInputElement) {
  if (button && input) {
    button.disabled = !(input.value && input.value.length <= 200)
  }
}

export { stateHandle }
