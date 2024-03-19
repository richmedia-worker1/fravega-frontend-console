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

  const [iconFile, setIconFile] = useState(null);
  const [iconPreview, setIconPreview] = useState('');

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

  const handleIconChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIconFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setIconPreview(reader.result);
        setCatalog(prevState => ({
          ...prevState,
          Icon: reader.result
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setIconFile(null);
      setIconPreview('');
      setCatalog(prevState => ({
        ...prevState,
        Icon: ''
      }));
    }
  };

  return (
    <div>
      <h1>Добавить каталог</h1>
      <div style={{margin:40, padding:20,backgroundColor:"#eee",borderRadius:8, width:"40%"}}>
            <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'inline-block', width: '150px' }}>Icon: </label>
                <input
                    style={{ width: 'calc(100% - 160px)' }}
                    type="file"
                    accept="image/*"
                    onChange={handleIconChange}
                />
                {iconPreview && (
                    <img src={iconPreview} alt="Icon Preview" style={{maxWidth:"100%"}}/>
                )}
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'inline-block', width: '150px' }}>Name: </label>
                <input style={{ width: 'calc(100% - 160px)' }} type="text" value={catalog.Name} placeholder='Name' onChange={(e) => setCatalog({ ...catalog, Name: e.target.value })} />
            </div>
      </div>
      <button onClick={handleSubmit}>Добавить</button>
    </div>
  );
};

export default AddCatalog;