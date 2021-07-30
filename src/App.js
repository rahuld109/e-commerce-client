import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import store from "./store";
import "antd/dist/antd.css";
import setAuthToken from "./util/setAuthToken";
import { decodeUser } from "./util";
import { setCurrentUser } from "./actions/authActions";
import { addToCart } from "./actions/cartActions";

//importing general components
import ProtectedRoute from "./components/general/ProtectedRoute";

//landing component
import Landing from "./components/landing";
import ProductDetails from "./components/landing/ProductDetails";

//dashboard component
import Dashboard from "./components/dashboard";
import Home from "./components/dashboard/components/Home";
import AddProduct from "./components/dashboard/components/AddProduct";
import Products from "./components/dashboard/components/Products";
import AddProfile from "./components/dashboard/components/AddProfile";
import Profile from "./components/dashboard/components/Profile";

//importing user components
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

//customer components
import Cart from "./components/customers/Cart";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App(props) {
  useEffect(() => {
    store.dispatch(setCurrentUser());
  }, []);

  const grabProductFromStorage = () => {
    const userId = decodeUser().user.id;
    const cartProducts = JSON.parse(localStorage.getItem("products"));
    const context = { products: cartProducts, userId };
    store.dispatch(addToCart(context));
    localStorage.removeItem("products");
  };
  if (localStorage.getItem("token") && localStorage.getItem("products")) {
    grabProductFromStorage();
  }

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Route exact path="/" component={Landing} />
          <Route exact path="/products/:id" component={ProductDetails} />
          <Switch>
            <ProtectedRoute
              exact
              path="/dashboard"
              component={() => <Dashboard {...props} nestedRoute={Home} />}
            />
            <ProtectedRoute
              exact
              path="/dashboard/addProduct"
              component={() => (
                <Dashboard {...props} nestedRoute={AddProduct} />
              )}
            />
            <ProtectedRoute
              exact
              path="/dashboard/Products"
              component={() => <Dashboard {...props} nestedRoute={Products} />}
            />
            <ProtectedRoute
              exact
              path="/dashboard/Profile"
              component={() => <Dashboard {...props} nestedRoute={Profile} />}
            />
            <ProtectedRoute
              exact
              path="/dashboard/addProfile"
              component={() => (
                <Dashboard {...props} nestedRoute={AddProfile} />
              )}
            />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
