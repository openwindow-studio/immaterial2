'use client'

import { useState, useEffect } from 'react'

interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: Date
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodoText, setNewTodoText] = useState('')
  const [isAdding, setIsAdding] = useState(false)

  // Load todos from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('immaterial-todos')
    if (stored) {
      const parsed = JSON.parse(stored)
      setTodos(parsed.map((t: any) => ({
        ...t,
        createdAt: new Date(t.createdAt)
      })))
    }
  }, [])

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('immaterial-todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    if (newTodoText.trim()) {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: newTodoText.trim(),
        completed: false,
        createdAt: new Date()
      }
      setTodos([newTodo, ...todos])
      setNewTodoText('')
      setIsAdding(false)
    }
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-t-[6px] border-black mb-6"></div>
      <h2 className="mb-8 text-black"
          style={{
            fontFamily: "'Neue Haas Grotesk Display', sans-serif",
            fontSize: '20px',
            fontWeight: 500,
            lineHeight: '22px',
            letterSpacing: '0.05em',
            transform: 'scaleY(-1)',
            display: 'inline-block'
          }}>
        TASKS
      </h2>

      {/* Add Todo Section */}
      <div className="mb-8">
        {!isAdding ? (
          <button
            onClick={() => setIsAdding(true)}
            className="text-black hover:text-[#0D1EFF] transition-colors"
            style={{
              fontFamily: "'Neue Haas Grotesk Display', sans-serif",
              fontSize: '20px',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <span style={{ fontSize: '24px' }}>+</span>
            Add Task
          </button>
        ) : (
          <div className="flex gap-2">
            <input
              type="text"
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') addTodo()
                if (e.key === 'Escape') {
                  setIsAdding(false)
                  setNewTodoText('')
                }
              }}
              placeholder="Enter task..."
              autoFocus
              className="flex-1 px-3 py-2 border-b-2 border-black bg-transparent outline-none focus:border-[#0D1EFF] transition-colors"
              style={{
                fontFamily: "'Neue Haas Grotesk Display', sans-serif",
                fontSize: '20px',
                fontWeight: 500
              }}
            />
            <button
              onClick={addTodo}
              className="px-4 py-2 bg-black text-white hover:bg-[#0D1EFF] transition-colors"
              style={{
                fontFamily: "'Neue Haas Grotesk Display', sans-serif",
                fontSize: '18px',
                fontWeight: 500
              }}
            >
              ADD
            </button>
            <button
              onClick={() => {
                setIsAdding(false)
                setNewTodoText('')
              }}
              className="px-4 py-2 text-black hover:text-red-600 transition-colors"
              style={{
                fontFamily: "'Neue Haas Grotesk Display', sans-serif",
                fontSize: '20px',
              }}
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Todo List */}
      <div className="space-y-2">
        {todos.length === 0 ? (
          <p className="text-gray-500 italic"
             style={{
               fontFamily: "'Neue Haas Grotesk Display', sans-serif",
               fontSize: '18px',
               paddingLeft: '2em'
             }}>
            No tasks yet. Add one above.
          </p>
        ) : (
          todos.map(todo => (
            <div
              key={todo.id}
              className={`group flex items-center gap-3 py-2 px-2 transition-all ${
                todo.completed ? 'opacity-40' : ''
              } hover:bg-gray-50`}
              style={{
                fontFamily: "'Neue Haas Grotesk Display', sans-serif",
                fontSize: '20px',
                fontWeight: 500
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="w-5 h-5 cursor-pointer accent-[#0D1EFF]"
              />
              <span
                className={`flex-1 ${todo.completed ? 'line-through' : ''}`}
                style={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  textDecorationThickness: '2px'
                }}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-gray-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
                style={{ fontSize: '18px' }}
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>

      {/* Stats */}
      {todos.length > 0 && (
        <div className="mt-8 pt-4 border-t border-gray-200 text-gray-600"
             style={{
               fontFamily: "'Neue Haas Grotesk Display', sans-serif",
               fontSize: '16px'
             }}>
          {todos.filter(t => !t.completed).length} active, {todos.filter(t => t.completed).length} completed
        </div>
      )}
    </div>
  )
}