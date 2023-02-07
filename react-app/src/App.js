import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import Cart from './components/Cart/Cart';
import Snack from './components/Snack/Snack';
import SnackPage from './components/Snack/SnackPage';
import SnackPageId from './components/Snack/SnackPageId';
import SnackBox from './components/Snack/SnackBox';
import './HomePage.css';
import ShoppingCart from './components/Cart/ShoppingCart';
import SnackCarousel from './components/Carousel/Carousel';
import Footer from './components/Footer/Footer';
import OrderPlacedPage from './components/OrderPlacedPage/OrderPlacedPage';


function App() {
  const sessionUser = useSelector(state => state.session.user)
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>

        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/snacks/:snackId' exact={true}>
          <SnackPageId />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
          <Cart />

          <Snack />
          {/* <SnackPage /> */}
        </ProtectedRoute>
        <ProtectedRoute path='/carts' exact={true} >
          <ShoppingCart/>
        </ProtectedRoute>
        <ProtectedRoute path='/orderplaced' exact={true} >
          <OrderPlacedPage/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <img className="bannerImage" src="https://content.7-eleven.ca/wp-content/uploads/2020/05/ATasteOfAsia_banner.jpg"></img>
          <SnackCarousel />

          <div class="product-group-title"> The Hottest Products In Asia Right now!!!! </div>
          <SnackBox />
        </Route>

      </Switch>


      <Footer />
    </BrowserRouter>


  );
}

export default App;
