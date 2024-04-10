import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home({ userRole }) {
  const [home, setHome] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const response = await axios.get('http://localhost:3001/home');
        setHome(response.data);
      } catch (error) {
        console.error('Error fetching homes:', error.message);
      }
    };

    fetchHome();
  }, []);

  const handleCreatePost = async () => {
    try {
      const response = await axios.post('http://localhost:3001/home', {
        title: newTitle,
        content: newContent
      });
      // Add the newly created post to the home list
      setHome([...home, response.data]);
      // Clear the input fields after creating the post
      setNewTitle('');
      setNewContent('');
    } catch (error) {
      console.error('Error creating home:', error.message);
    }
  }

  const handleEdit = (id, title, content) => {
    setEditId(id);
    setEditTitle(title);
    setEditContent(content);
  };

  const handleSaveEdit = async () => {
    try {
      // If editId exists, it means we're editing an existing post
      if (editId) {
        await axios.put(`http://localhost:3001/home/${editId}`, {
          title: editTitle,
          content: editContent
        });
      } else {
        // If editId doesn't exist, it means we're creating a new post
        await axios.post(`http://localhost:3001/home`, {
          title: editTitle,
          content: editContent
        });
      }
      setEditId(null);
      // Refresh the home list
      const response = await axios.get('http://localhost:3001/home');
      setHome(response.data);
    } catch (error) {
      console.error('Error saving home:', error.message);
    }
  }

  const handleDelete = async id => {
    try {
      await axios.delete(`http://localhost:3001/home/${id}`);
      // Refresh the home list
      const response = await axios.get('http://localhost:3001/home');
      setHome(response.data);
    } catch (error) {
      console.error('Error deleting home:', error.message);
    }
  };

  return (
    <div>
      <h1>Home List</h1>
      {/* Form to create new post */}
      {userRole === 'admin' && (
        <div>
          <input
            type="text"
            placeholder="Enter title"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
          />
          <textarea
            placeholder="Enter content"
            value={newContent}
            onChange={e => setNewContent(e.target.value)}
          />
          <button onClick={handleCreatePost}>Create Post</button>
        </div>
      )}
      <ul>
        {home.map(post => (
          <li key={post._id}>
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
              <>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                {userRole === 'admin' && (
                  <>
                    <button onClick={() => handleEdit(post._id, post.title, post.content)}>Edit</button>
                    <button onClick={() => handleDelete(post._id)}>Delete</button>
                  </>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}