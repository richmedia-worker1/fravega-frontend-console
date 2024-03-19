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


  return (
    <div>
      <h1>Добавить товар</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="Name" value={item.Name} onChange={handleChange} placeholder="Название" />
        <input type="text" name="Seller" value={item.Seller} onChange={handleChange} placeholder="Продавец" />
        <input type="text" name="Description" value={item.Description} onChange={handleChange} placeholder="Описание" />
        <input type="number" name="Price" value={item.Price} onChange={handleChange} placeholder="Цена" />
        <input type="text" name="Icon" value={item.Icon} onChange={handleChange} placeholder="Иконка" />
        <input type="number" name="Discount" value={item.Discount} onChange={handleChange} placeholder="Скидка" />
        <input type="number" name="Latitude" value={item.Latitude} onChange={handleChange} placeholder="Широта" />
        <input type="number" name="Longitude" value={item.Longitude} onChange={handleChange} placeholder="Долгота" />
        <button type="submit">Добавить</button>
      </form>
    </div>
  );
};

export default AddItem;