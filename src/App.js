import React from 'react';
import './styles/ice-cream.scss';
import Header from './structure/Header';
import Footer from './structure/Footer';
import Menu from './components/ice-cream/Menu';
import EditIceCream from './components/ice-cream/EditIceCream';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import IceCreams from './components/ice-cream/IceCreams';
import AddIceCream from './components/ice-cream/AddIceCream';

const App = () => {
  return (
    <Router>
      <a href="#main"className='skip-link'>skip to content</a>
      <Header />
        <Route path='/' exact component={Menu} ></Route>
        <Route path='/menu-items' exact component={Menu} ></Route>
        <Route path='/menu-items/:menuItemId' component={EditIceCream}></Route>
        <Route path="/ice-creams" component={IceCreams} exact></Route>
        <Route path="/ice-creams/add" component={AddIceCream} ></Route>
      <Footer />
    </Router>
  );
};

export default App;
