import React, { useState } from 'react';
import './App.css';
import UserTable from './UserTable';
import AddUserForm from './AddUserForm';
import EditUserForm from './EditUserForm'

const App = () => {

  const userData = [
    {id: 1, name: 'sebastian', username: 'seba1'},
    {id: 2, name: 'sebas', username: 'seba2'},
    {id: 3, name: 'seba', username: 'seba3'},
  ]

  const [users, setUsers] = useState(userData)
  const [editing, setEditing] = useState(false)

  const initialFormState = { id: null, name: '', username: '' }
  const [currentUser, setCurrentUser] = useState(initialFormState)


  const addUser = (user) => {
    user.id = users.length + 1
    setUsers([...users, user])
  }

  const deleteUser = (id) => {
    setEditing(false)
    const filtered = users.filter((u) => {
      return u.id !== id
    })
    setUsers(filtered)
  }

  const editUser = (user) => {
    setEditing(true)

    setCurrentUser({id: user.id, name: user.name, username: user.username})
  }

  const updateUser = (id, updatedUser) => {
    setEditing(false);
    setUsers(users.map((user) => (user.id === id ? updatedUser : user)))
  }

  return (
    <div className="container">
      <h1>CRUD Books with Hooks</h1>
      <div className="flex-row">
        <div className="flex-large">
          {editing ? (
            <div>
              <h2>Edit user</h2>
              <EditUserForm 
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </div>
          )
          :
          (
            <div>
              <h2>Add user</h2>
              <AddUserForm addUser={addUser} />
            </div>
          )
          }
        </div>
        <div className="flex-large">
          <h2>View users</h2>
          <UserTable users={users} editUser={editUser} deleteUser={deleteUser}/>
        </div>
      </div>
    </div>
  );
}

export default App;
