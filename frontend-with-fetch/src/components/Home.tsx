// src/Home.tsx
import React, { useEffect, useState } from 'react'
import TaskModal from './TaskModal'

interface Tache {
  id: number
  title: string
  done: boolean
  createdAt: Date
  updatedAt: Date
}

const Home: React.FC = () => {
  const [taches, setTaches] = useState<Tache[]>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [editingTask, setEditingTask] = useState<Tache | null>(null)

  useEffect(() => {
    fetch('http://127.0.0.1:8000/taches')
      .then((response) => response.json())
      .then((data) => setTaches(data))
  }, [])

  const markAsCompleted = (id: number) => {
    fetch(`http://127.0.0.1:8000/taches/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ done: true }),
    })
      .then((response) => response.json())
      .then((updatedTask) => {
        setTaches(taches.map((t) => (t.id === id ? updatedTask : t)))
      })
  }

  const removeTache = (id: number) => {
    fetch(`http://127.0.0.1:8000/taches/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setTaches(taches.filter((t) => t.id !== id))
    })
  }

  const openModal = (task?: Tache) => {
    setEditingTask(task || null)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingTask(null)
  }

  const saveTask = (task: Tache) => {
    const requestOptions = {
      method: task.id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    }
    const url = task.id
      ? `http://127.0.0.1:8000/taches/${task.id}`
      : 'http://127.0.0.1:8000/taches'

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((savedTask) => {
        if (task.id) {
          setTaches(taches.map((t) => (t.id === task.id ? savedTask : t)))
        } else {
          setTaches([...taches, savedTask])
        }
      })

    closeModal()
  }

  return (
    <div className='container mx-auto p-4'>
      <div className="flex justify-between">
      <h1 className='text-3xl font-bold mb-4'>Task Management</h1>
      <button
        onClick={() => openModal()}
        className='mb-4 bg-blue-500 text-white px-4 py-2 rounded'
      >
        Add New Task
      </button>
      </div>
      <table className='min-w-full bg-white border'>
        <thead>
          <tr>
            <th className='py-2 px-4 border'>Title</th>
            <th className='py-2 px-4 border'>Status</th>
            <th className='py-2 px-4 border'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {taches.map((tache) => (
            <tr key={tache.id}>
              <td className='py-2 px-4 border'>{tache.title}</td>
              <td className='py-2 px-4 border'>
                {tache.done ? 'Completed' : 'Pending'}
              </td>
              <td className='py-2 px-4 border'>
                {!tache.done && (
                  <button
                    onClick={() => markAsCompleted(tache.id)}
                    className='mr-2 bg-green-500 text-white px-2 py-1 rounded'
                  >
                    Mark as Completed
                  </button>
                )}
                <button
                  onClick={() => openModal(tache)}
                  className='mr-2 bg-yellow-500 text-white px-2 py-1 rounded'
                >
                  Update
                </button>
                <button
                  onClick={() => removeTache(tache.id)}
                  className='bg-red-500 text-white px-2 py-1 rounded'
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <TaskModal task={editingTask} onSave={saveTask} onClose={closeModal} />
      )}
    </div>
  )
}

export default Home
