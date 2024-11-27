import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import RestaurantMenu from "./components/RestaurantMenu";
import Cart from "./components/Cart";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";
import ProtectRoute from "./components/ProtectRoute";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { auth } from "./utils/firebase";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { createUser } from "./redux/slices/userAuthSlice";
import { removeUser } from "./redux/slices/userAuthSlice";
import  { Toaster } from "react-hot-toast";

const App = () => {
  console.log("app");
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user", user);
        const { email, displayName } = user;
        dispatch(createUser({ email, displayName }));
      } else {
        dispatch(removeUser());
      }
    });
  }, []);
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/restaurant/:resId" element={<RestaurantMenu />} />
          <Route element={<ProtectRoute />}>
            <Route path="/cart" element={<Cart />} />
          </Route>
        </Routes>
        <Toaster/>
      </div>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
