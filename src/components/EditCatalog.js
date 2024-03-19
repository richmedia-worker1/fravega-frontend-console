import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../apiConfig';

const EditCatalog = () => {
  const [catalog, setCatalog] = useState({
    Id: 0,
    Name: '',
    Icon: ''
  });
  const { catalogId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${BASE_URL}/cataloge/${catalogId}`)
      .then(response => {
        console.log(response)
        setCatalog(response.data.cataloge);
      })
      .catch(error => {
        console.error('Error fetching catalog:', error);
      });
  }, [catalogId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCatalog(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = () => {
    axios.put(`${BASE_URL}/cataloge/${catalogId}`, catalog)
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        console.error('Error updating catalog:', error);
      });
  };

  return (
    <div>
      <h1>Редактировать каталог</h1>
      <input type="text" name="Name" value={catalog.Name || ''} onChange={handleChange} placeholder='Name' />
      <input type="text" name="Icon" value={catalog.Icon || ''} onChange={handleChange} placeholder='URL icon'/>
      <button onClick={handleSave}>Сохранить</button>
    </div>
  );
};

export default EditCatalog;