// components/AddCatalog.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../apiConfig';

const AddCatalog = () => {
  const [catalog, setCatalog] = useState({
    Name: '',
    Icon: ''
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCatalog(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`${BASE_URL}/cataloge`, catalog)
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        console.error('Error adding catalog:', error);
      });
  };

  return (
    <div>
      <h1>Добавить каталог</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="Name" value={catalog.Name} onChange={handleChange} placeholder="Название" />
        <input type="text" name="Icon" value={catalog.Icon} onChange={handleChange} placeholder="Иконка" />
        <button type="submit">Добавить</button>
      </form>
    </div>
  );
};

export default AddCatalog;