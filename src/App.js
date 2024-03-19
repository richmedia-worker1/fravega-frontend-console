import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CatalogList from './components/CatalogList';
import ItemList from './components/ItemList';
import ItemDetails from './components/ItemDetails';
import EditCatalog from './components/EditCatalog';
import EditItem from './components/EditItem';
import AddCatalog from './components/AddCatalog';
import AddItem from './components/AddItem';
import Navigation from './components/Navigation';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <div>
        <Routes>
          <Route exact path="/" element={<CatalogList />} />
          <Route path="/catalog/:catalogId" element={<ItemList />} />
          <Route path="/edit-catalog/:catalogId" element={<EditCatalog />} />
          <Route path="/item/:itemId" element={<ItemDetails />} />

          <Route path="/edit-item/:itemId" element={<EditItem />} />
          <Route path="/add-catalog" element={<AddCatalog />} />
          <Route path="/add-item/:catalogId" element={<AddItem />} />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;