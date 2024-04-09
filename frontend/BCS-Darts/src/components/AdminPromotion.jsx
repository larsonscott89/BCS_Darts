import React, { useState, useEffect } from 'react';

export default function AdminPromotion  () {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:3001/users');
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            setUsers(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching users:', error.message);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleUserSelect = (event) => {
        setSelectedUserId(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:3001/users/${selectedUserId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    role: 'admin',
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to promote user to admin');
            }
            alert('User promoted to admin successfully');
        } catch (error) {
            console.error('Error promoting user to admin:', error.message);
            alert('Failed to promote user to admin');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="promote-user-to-admin">
            <h1>Promote User to Admin</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="user">Select user to promote:</label>
                <select id="user" value={selectedUserId} onChange={handleUserSelect}>
                    <option value="">Select User</option>
                    {users.map(user => (
                        <option key={user._id} value={user._id}>{user.username}</option>
                    ))}
                </select>
                <button type="submit">Promote to Admin</button>
            </form>
        </div>
    );
};
