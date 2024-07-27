// src/Home.tsx
import React, { useEffect, useState } from 'react'
import axios from 'axios'
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
    axios.get('http://127.0.0.1:8000/taches').then((response) => {
      setTaches(response.data)
    })
  }, [])

  const markAsCompleted = (id: number) => {
    axios
      .put(`http://127.0.0.1:8000/taches/${id}`, { done: true })
      .then((response) => {
        setTaches(taches.map((t) => (t.id === id ? response.data : t)))
      })
  }

  const removeTache = (id: number) => {
    axios.delete(`http://127.0.0.1:8000/taches/${id}`).then(() => {
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
    if (task.id) {
      axios
        .put(`http://127.0.0.1:8000/taches/${task.id}`, task)
        .then((response) => {
          setTaches(taches.map((t) => (t.id === task.id ? response.data : t)))
        })
    } else {
      axios.post('http://127.0.0.1:8000/taches', task).then((response) => {
        setTaches([...taches, response.data])
      })
    }
    closeModal()
  }

  return (
    <div className='container mx-auto p-4'>
      <div className='flex justify-between'>
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
              <td
                className={`py-2 px-4 border ${
                  tache.done ? 'line-through' : ''
                }`}
              >
                {tache.title}
              </td>
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
