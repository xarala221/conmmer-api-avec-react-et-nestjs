// src/TaskModal.tsx
import React, { useState, useEffect } from 'react'

interface Tache {
  id?: number
  title: string
  done: boolean
}

interface TaskModalProps {
  task: Tache | null
  onSave: (task: Tache) => void
  onClose: () => void
}

const TaskModal: React.FC<TaskModalProps> = ({ task, onSave, onClose }) => {
  const [title, setTitle] = useState<string>('')
  const [done, setDone] = useState<boolean>(false)

  useEffect(() => {
    if (task) {
      setTitle(task.title)
      setDone(task.done)
    }
  }, [task])

  const handleSave = () => {
    const updatedTask = { id: task?.id, title, done }
    onSave(updatedTask)
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50'>
      <div className='bg-white p-4 rounded shadow-lg'>
        <h2 className='text-xl font-bold mb-4'>
          {task ? 'Update Task' : 'Add New Task'}
        </h2>
        <div className='mb-4'>
          <label className='block mb-2'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full px-3 py-2 border rounded'
          />
        </div>
        <div className='mb-4'>
          <label className='block mb-2'>Done</label>
          <input
            type='checkbox'
            checked={done}
            onChange={(e) => setDone(e.target.checked)}
          />
        </div>
        <div className='flex justify-end'>
          <button
            onClick={onClose}
            className='mr-2 bg-gray-500 text-white px-4 py-2 rounded'
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className='bg-blue-500 text-white px-4 py-2 rounded'
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskModal
