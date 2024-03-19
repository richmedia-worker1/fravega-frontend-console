import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../apiConfig';

const CatalogList = () => {
  const [catalogs, setCatalogs] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/cataloge`)
      .then(response => {
        setCatalogs(response.data.catalogs);
        console.log(response)
      })
      .catch(error => {
        console.error('Error fetching catalogs:', error);
      });
  }, []);

  const handleDeleteCatalog = (catalogId) => {
    axios.delete(`${BASE_URL}/cataloge/${catalogId}`)
      .then(() => {
        // Обновить список каталогов после удаления
        setCatalogs(prevCatalogs => prevCatalogs.filter(catalog => catalog.Id !== catalogId));
      })
      .catch(error => {
        console.error('Error deleting catalog:', error);
      });
  };

  return (
    <div>
      <h1>Каталоги</h1>
      <Link to="/add-catalog">
        <button>Добавить каталог</button>
      </Link>
      <ul>
        {catalogs.map(catalog => (
            <div style={{margin:40, padding:20,backgroundColor:"#eee",borderRadius:8, width:"20%"}}>
                <li key={catalog.Id}>
                    <Link to={`/catalog/${catalog.Id}`}>
                    <img src={catalog.Icon} alt={catalog.Name} style={{maxWidth:"20%"}} />
                    <h2>{catalog.Name}</h2>
                    </Link>
                    <Link to={`/edit-catalog/${catalog.Id}`}>
                        <button>Редактировать</button>
                    </Link>
                    <button onClick={() => handleDeleteCatalog(catalog.Id)}>Удалить</button>
                </li>
            </div>
        ))}
      </ul>
    </div>
  );
};

export default CatalogList;