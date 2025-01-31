export async function categoriesForTodo(
  categoryId: string,
  todoId: number,
): Promise<void> {
  try {
    const response = await fetch(
      'https://api.todos.in.jt-lab.ch/categories_todos',
    )
    const categoriesTodos = await response.json()
    const existingRelation = categoriesTodos.find(
      (item: { category_id: string; todo_id: number }) =>
        item.todo_id === todoId,
    )

    if (existingRelation) {
      await fetch(
        `https://api.todos.in.jt-lab.ch/categories_todos?todo_id=eq.${existingRelation.todo_id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ category_id: categoryId, todo_id: todoId }),
        },
      )
    } else {
      await fetch('https://api.todos.in.jt-lab.ch/categories_todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category_id: categoryId,
          todo_id: todoId,
        }),
      })
    }
  } catch (error) {
    console.error(
      'An error occurred while updating categories for the todo:',
      error,
    )
  }
}
