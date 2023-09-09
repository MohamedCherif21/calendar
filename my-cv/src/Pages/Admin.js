import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../Ressources/templateadmin.css";
function Admin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const Navigate= useNavigate();

  // Fonction pour récupérer la liste des utilisateurs depuis le backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/user/users'); // Utilisez l'URL relative pour l'appel API
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  const deleteUser = async (userId) => {
    try {
      await axios.delete(`/api/user/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
 

  const columns = [
    {
      title: 'Nom',
      dataIndex: 'firsName', 
      key: 'firsName',
    },
    {
      title: 'Prénom',
      dataIndex: 'lastname',
      key: 'lastname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
      key: 'mobile',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button onClick={() => deleteUser(record._id)}>Supprimer</Button>
        </span>
      ),
    },
  ];

  return (
    <div className="admin-container">
      <h1 className="admin-title">Page d'administration</h1>
      
    
      <div className="admin-table-container">
        <Table columns={columns} dataSource={users} rowKey="_id" />
      </div>
      <Button onClick={()=>Navigate('/home')}>Back</Button>
    </div>
    
    
  );
}

export default Admin;
