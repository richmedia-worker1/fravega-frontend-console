import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../apiConfig';

const ItemDetails = ({ match }) => {
  const [item, setItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { itemId } = useParams();
  const navigate = useNavigate();

  const [iconFile, setIconFile] = useState(null);
  const [iconPreview, setIconPreview] = useState('');

  useEffect(() => {
    axios.get(`${BASE_URL}/cataloge/items`)
      .then(response => {
        const foundItem = response.data.items.find(item => item.Id === parseInt(itemId));
        setItem(foundItem);
      })
      .catch(error => {
        console.error('Error fetching item details:', error);
      });
  }, [itemId]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    console.log(item);
  
    axios.put(`${BASE_URL}/cataloge/items/${itemId}`, item)
      .then(() => {
        setIsEditing(false);
      })
      .catch(error => {
        console.error('Error updating item:', error);
      });
  };

  const handleDeleteItem = (itemId) => {
    axios.delete(`${BASE_URL}/cataloge/items/${itemId}`)
      .then(() => {
        // Обновить список товаров после удаления
        //  setItem(prevItems => prevItems.filter(item => item.Id !== itemId));
        navigate(`/catalog/${item.CatalogeId}`)
      })
      .catch(error => {
        console.error('Error deleting item:', error);
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


  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{margin:40, padding:20,backgroundColor:"#eee",borderRadius:8, width:"40%"}}>
      {isEditing ? (
        <>
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
                    <img src={iconPreview} alt="Icon Preview" style={{maxWidth:"100%"}}/>
                )}
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'inline-block', width: '150px' }}>Name: </label>
                <input style={{ width: 'calc(100% - 160px)' }} type="text" value={item.Name} placeholder='Name' onChange={(e) => setItem({ ...item, Name: e.target.value })} />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'inline-block', width: '150px' }}>Seller: </label>
                <input style={{ width: 'calc(100% - 160px)' }} type="text" value={item.Seller} placeholder='Seller name' onChange={(e) => setItem({ ...item, Seller: e.target.value })} />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'inline-block', width: '150px' }}>Description: </label>
                <input style={{ width: 'calc(100% - 160px)' }} type="text" value={item.Description} placeholder='Description(markdown supported)' onChange={(e) => setItem({ ...item, Description: e.target.value })} />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'inline-block', width: '150px' }}>Price: </label>
                <input style={{ width: 'calc(100% - 160px)' }} type="number" value={item.Price} placeholder='Price(without symbol $)' onChange={(e) => setItem({ ...item, Price: parseFloat(e.target.value) })} />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'inline-block', width: '150px' }}>Discount: </label>
                <input style={{ width: 'calc(100% - 160px)' }} type="number" value={item.Discount} placeholder='Discount %(only number)' onChange={(e) => setItem({ ...item, Discount: parseInt(e.target.value) })} />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'inline-block', width: '150px' }}>Latitude: </label>
                <input style={{ width: 'calc(100% - 160px)' }} type="number" value={item.Latitude} placeholder='Coordinates Latitude(optional, not used)' onChange={(e) => setItem({ ...item, Latitude: parseFloat(e.target.value) })} />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'inline-block', width: '150px' }}>Longitude: </label>
                <input style={{ width: 'calc(100% - 160px)' }} type="number" value={item.Longitude} placeholder='Coordinates Longitude(optional, not used)' onChange={(e) => setItem({ ...item, Longitude: parseFloat(e.target.value) })} />
            </div>
            <button onClick={handleSave}>Сохранить</button>
        </div>


        </>
      ) : (
        <>
          <h1>{item.Name}</h1>
          <img src={item.Icon} alt={item.Name} width={200} />
          <p>Продавец: {item.Seller}</p>
          <p>Описание: {item.Description}</p>
          <p>Цена: {item.Price}</p>
          <p>Скидка: {item.Discount}%</p>
          <p>Отзывы: {item.Reviews.join(', ')}</p>
          <p>Широта: {item.Latitude}</p>
          <p>Долгота: {item.Longitude}</p>
          <button onClick={handleEdit}>Редактировать</button>
          <button onClick={() => handleDeleteItem(item.Id)}>Удалить</button>
        </>
      )}
    </div>
  );
};

export default ItemDetails;