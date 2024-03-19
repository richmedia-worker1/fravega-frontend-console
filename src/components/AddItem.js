import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../apiConfig';

const AddItem = () => {
  const [item, setItem] = useState({
    Name: '',
    Seller: '',
    Description: '',
    Price: 0,
    Icon: '',
    Discount: 0,
    Latitude: 0,
    Longitude: 0
  });
  const navigate = useNavigate();
  const { catalogId } = useParams();

  const [iconFile, setIconFile] = useState(null);
  const [iconPreview, setIconPreview] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setItem(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!catalogId) {
      console.error('Catalog ID is not defined');
      return;
    }

    const newItem = { ...item, CatalogeId: parseInt(catalogId, 10) };
    axios.post(`${BASE_URL}/cataloge/items`, newItem)
      .then(() => {
        navigate(`/catalog/${catalogId}`);
      })
      .catch(error => {
        console.error('Error adding item:', error);
      });
  };

  const handleIconChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIconFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setIconPreview(reader.result);
        setItem(prevState => ({
          ...prevState,
          Icon: reader.result
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setIconFile(null);
      setIconPreview('');
      setItem(prevState => ({
        ...prevState,
        Icon: ''
      }));
    }
  };


  return (
    <div>
      <h1>Добавить товар</h1>
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
                <img src={iconPreview} alt="Icon Preview" style={{ maxWidth: '100%' }} />
            )}
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'inline-block', width: '150px' }}>Name: </label>
          <input style={{ width: 'calc(100% - 160px)' }} type="text" name="Name" value={item.Name} placeholder='Name' onChange={handleChange} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'inline-block', width: '150px' }}>Seller: </label>
          <input style={{ width: 'calc(100% - 160px)' }} type="text" name="Seller" value={item.Seller} placeholder='Seller name' onChange={handleChange} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'inline-block', width: '150px' }}>Description: </label>
          <input style={{ width: 'calc(100% - 160px)' }} type="text" name="Description" value={item.Description} placeholder='Description(markdown supported)' onChange={handleChange} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'inline-block', width: '150px' }}>Price: </label>
          <input style={{ width: 'calc(100% - 160px)' }} type="number" name="Price" value={item.Price} placeholder='Price(without symbol $)' onChange={handleChange} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'inline-block', width: '150px' }}>Discount: </label>
          <input style={{ width: 'calc(100% - 160px)' }} type="number" name="Discount" value={item.Discount} placeholder='Discount %(only number)' onChange={handleChange} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'inline-block', width: '150px' }}>Latitude: </label>
          <input style={{ width: 'calc(100% - 160px)' }} type="number" name="Latitude" value={item.Latitude} placeholder='Coordinates Latitude(optional, not used)' onChange={handleChange} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'inline-block', width: '150px' }}>Longitude: </label>
          <input style={{ width: 'calc(100% - 160px)' }} type="number" name="Longitude" value={item.Longitude} placeholder='Coordinates Longitude(optional, not used)' onChange={handleChange} />
        </div>

        <button onClick={handleSubmit}>Добавить</button>
      </div>
    </div>
  );
};

export default AddItem;