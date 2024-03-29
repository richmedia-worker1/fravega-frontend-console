import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavBar = styled.nav`
  background-color: #333;
  padding: 1rem;
  display: flex;
  justify-content: space-around;
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;

  &:hover {
    color: #ccc;
  }
`;

const Navigation = () => {
  return (
    <div>
      <NavBar>
        <NavLink to="/">Каталоги</NavLink>
        <NavLink to="/add-catalog">Добавить каталог</NavLink>
      </NavBar>
      <label style={{color:'#ff0000', marginLeft: 10}}>P.s Большие картинки лушче не грузить. Может что-то начать плохо работать</label>
    </div>
  );
};

export default Navigation;