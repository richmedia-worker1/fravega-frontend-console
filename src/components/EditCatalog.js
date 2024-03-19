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

  const [iconFile, setIconFile] = useState(null);
  const [iconPreview, setIconPreview] = useState('');

  useEffect(() => {
    axios.get(`${BASE_URL}/cataloge/${catalogId}`)
      .then(response => {
        console.log(response)
        setCatalog(response.data.cataloge);
        setIconPreview(response.data.cataloge.Icon);
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
      <h1>Редактировать каталог</h1>
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
      <button onClick={handleSave}>Сохранить</button>
    </div>
  );
};

export default EditCatalog;