import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { BASE_URL } from '../apiConfig';

const ItemList = ({ match }) => {
  const [items, setItems] = useState([]);
  const { catalogId } = useParams();

  useEffect(() => {
    axios.get(`${BASE_URL}/cataloge/items`)
      .then(response => {
        setItems(response.data.items.filter(item => item.CatalogeId === parseInt(catalogId)));
      })
      .catch(error => {
        console.error('Error fetching items:', error);
      });
  }, [catalogId]);

  const handleDeleteItem = (itemId) => {
    axios.delete(`${BASE_URL}/cataloge/items/${itemId}`)
      .then(() => {
        // Обновить список товаров после удаления
        setItems(prevItems => prevItems.filter(item => item.Id !== itemId));
      })
      .catch(error => {
        console.error('Error deleting item:', error);
      });
  };

  return (
    <div>
      <h1>Товары</h1>
      <Link to={`/add-item/${catalogId}`}>
        <button>Добавить товар</button>
      </Link>
      <ul>
        {items.map(item => (
            <div style={{margin:40, padding:20,backgroundColor:"#eee",borderRadius:8, width:"40%"}}>
                <li key={item.Id}>
                    <Link to={`/item/${item.Id}`}>
                    <img src={item.Icon} alt={item.Name} style={{maxWidth:"20%"}} />
                    <h2>{item.Name}</h2>
                    <p>Цена: {item.Price}</p>
                    </Link>
                    <Link to={`/edit-item/${item.Id}`}>
                <button>Редактировать</button>
              </Link>
              <button onClick={() => handleDeleteItem(item.Id)}>Удалить</button>
                </li>
                
            </div>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;