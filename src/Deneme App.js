import React from 'react';
import { BrowserRouter as Router, Route, Link, useHistory } from 'react-router-dom';

// Sayfaları içe aktar
import HomePage from './pages/HomePage';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';

// Üst menü bileşeni
const TopMenu = () => {
  return (
    <div>
      <Link to="/">Ana Sayfa</Link>
      <Link to="/page1">1. Sayfa</Link>
      <Link to="/page2">2. Sayfa</Link>
      <Link to="/page3">3. Sayfa</Link>
    </div>
  );
};

// Alt menü bileşeni
const BottomMenu = () => {
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  return (
    <div>
      <button onClick={goBack}>Geri</button>
    </div>
  );
};

// Ana uygulama bileşeni
const App = () => {
  return (
    <Router>
      <div>
        <TopMenu />
        <Route path="/" exact component={HomePage} />
        <Route path="/page1" component={Page1} />
        <Route path="/page2" component={Page2} />
        <Route path="/page3" component={Page3} />
        <BottomMenu />
      </div>
    </Router>
  );
};

export default App;
