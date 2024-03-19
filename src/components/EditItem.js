// components/EditItem.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../apiConfig';

const EditItem = () => {
  const [item, setItem] = useState({
    Id: 0,
    Name: '',
    Seller: '',
    CatalogeId: 0,
    Description: '',
    Price: 0,
    Icon: '',
    Reviews: [],
    Discount: 0,
    Latitude: 0,
    Longitude: 0
  });
  const { itemId } = useParams();
  const navigate = useNavigate();

  const [iconFile, setIconFile] = useState(null);
  const [iconPreview, setIconPreview] = useState('');

  useEffect(() => {
    axios.get(`${BASE_URL}/cataloge/items/${itemId}`)
      .then(response => {
        setItem(response.data.item);
        setIconPreview(response.data.item.Icon);
      })
      .catch(error => {
        console.error('Error fetching item details:', error);
      });
  }, [itemId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setItem(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = () => {
    axios.put(`${BASE_URL}/cataloge/items/${itemId}`, item)
      .then(() => {
        navigate(`/item/${itemId}`);
      })
      .catch(error => {
        console.error('Error updating item:', error);
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
      setIconPreview(event.target.value);
      setItem(prevState => ({
        ...prevState,
        Icon: event.target.value
      }));
    }
  };

  return (
    <div style={{ margin: 40, padding: 20, backgroundColor: "#eee", borderRadius: 8, width: "40%" }}>
      <div>
        <h1>Редактировать товар</h1>
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
          <input style={{ width: 'calc(100% - 160px)' }} type="text" name="Description" value={item.Description} placeholder='Description' onChange={handleChange} />
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
        <button onClick={handleSave}>Сохранить</button>
      </div>
    </div>
  );
};

export default EditItem;