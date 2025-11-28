interface Todo { id: string, title: string, completed: boolean }
export default function Home() {
  const mockTodos: Todo[] = [
    { id: '1', title: 'Buy groceries', completed: false },
    { id: '2', title: 'Walk the dog', completed: true },
    { id: '3', title: 'Read a chapter', completed: false },
    { id: '4', title: 'Finish project PR', completed: false },
  ]

  return (
    <div className="mt-10 min-h-[80vh]">
      {/* INPUTS */}
      <div className="text-center space-x-4">
        <input type="text" placeholder="Type your todo here" className="input" />
        {/* TODO: ADD VALIDATION */}
        <button className="btn btn-primary">Add</button>
      </div>

      <ul className="flex items-center justify-center mt-10 gap-3">
        <li className="text-base-content/40 hover:text-base-content duration-200 cursor-pointer">All</li>
        <li className="text-base-content/40 hover:text-base-content duration-200 cursor-pointer">Done</li>
      </ul>

      {/* YOUR TODOS FROM THE DB */}
      {
        mockTodos.map(todo => (
          <div key={todo.id} className="mt-4 flex items-center justify-center">
            <label className="flex items-center gap-3">
              <input type="checkbox" className="checkbox" checked={todo.completed} readOnly />
              <span className={todo.completed ? 'line-through opacity-60' : ''}>{todo.title}</span>
            </label>
          </div>
        ))
      }
    </div>
  )
}
