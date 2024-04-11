import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Home({ userRole }) {
  const [home, setHome] = useState([])
  const [editId, setEditId] = useState('')
  const [editTitle, setEditTitle] = useState('')
  const [editContent, setEditContent] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const response = await axios.get('http://localhost:3001/home')
        setHome(response.data)
      } catch (error) {
        console.error('Error fetching homes:', error.message)
      }
    }

    fetchHome()
  }, [])

  const handleCreatePost = async () => {
    try {
      const authToken = localStorage.getItem('token')
  
      const response = await axios.post('http://localhost:3001/home', {
        title: newTitle,
        content: newContent
      }, {
        headers: {
          Authorization: `Bearer ${authToken}` 
        }
      })
  
      setHome([...home, response.data])
      setNewTitle('')
      setNewContent('')
    } catch (error) {
      console.error('Error creating home:', error.message)
    }
  }

  const handleEdit = (id, title, content) => {
    setEditId(id)
    setEditTitle(title)
    setEditContent(content)
  }

  const handleSaveEdit = async () => {
    try {
      const authToken = localStorage.getItem('token')
      
      if (!authToken) {
        console.error('Token not found in localStorage')
        return
      }
      
      if (editId) {
        await axios.put(`http://localhost:3001/home/${editId}`, {
          title: editTitle,
          content: editContent
        }, {
          headers: {
            Authorization: `Bearer ${authToken}` 
          }
        })
      } else {
        await axios.post(`http://localhost:3001/home`, {
          title: editTitle,
          content: editContent
        }, {
          headers: {
            Authorization: `Bearer ${authToken}` 
          }
        })
      }
      setEditId(null);
      const response = await axios.get('http://localhost:3001/home', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
      setHome(response.data)
    } catch (error) {
      console.error('Error saving home:', error.message)
      alert('Failed to save home data')
    }
  }

  const handleDelete = async id => {
    try {
      await axios.delete(`http://localhost:3001/home/${id}`)
      const response = await axios.get('http://localhost:3001/home')
      setHome(response.data)
    } catch (error) {
      console.error('Error deleting home:', error.message)
    }
  }

  return (
    <div className='home-container'>
      <h1 className='home-label'>Home List</h1>
      {userRole === 'admin' && (
        <div className={'admin-home'}>
          <input
            className={'admin-home-title'}
            type="text"
            placeholder="Enter title"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
          />
          <textarea
            className={'admin-home-content'}
            placeholder="Enter content"
            value={newContent}
            onChange={e => setNewContent(e.target.value)}
          />
          <div className={'create-post-button'}>
          <button className={'create-post'} onClick={handleCreatePost}>Create Post</button>
          </div>
        </div>
      )}
      <div>
        {home.map(post => (
          <div key={post._id}>
            {editId === post._id ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                />
                <textarea
                  value={editContent}
                  onChange={e => setEditContent(e.target.value)}
                />
                <button onClick={handleSaveEdit}>Save</button>
              </>
            ) : (
              <div className={'home-container'}>
                <h3 className={'home-page-title'}>{post.title}</h3>
                <p className={'home-page-content'}>{post.content}</p>
                {userRole === 'admin' && (
                  <div className={'home-buttons'}>
                    <button onClick={() => handleEdit(post._id, post.title, post.content)}>Edit</button>
                    <button onClick={() => handleDelete(post._id)}>Delete</button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}