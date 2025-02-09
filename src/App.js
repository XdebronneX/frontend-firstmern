import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
// import Header from "./components/layout/Header";
import Header from "./components/layout/Header"
import Footer from "./components/layout/Footer";
import Home from "./components/Home";
import ProductDetails from "./components/product/ProductDetails";
// import Login from "./components/user/Login";
import Register from "./components/user/Register";
import { loadUser } from "./actions/userActions";
import { useSelector } from "react-redux";
import Profile from "./components/user/Profile";
import ProtectedRoute from "./components/route/ProtectedRoute";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";
import store from "./store";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";
import OrderSuccess from "./components/cart/OrderSuccess";
import ListOrders from "./components/order/ListOrders";
import OrderDetails from "./components/order/OrderDetails";
import Dashboard from "./components/admin/Dashboard";
import DashboardSeller from "./components/seller/Dashboard";
import ProductsList from "./components/admin/ProductsList";
import SellerProductsList from "./components/seller/ProductsList";
import NewProduct from "./components/admin/NewProduct";
import SellerNewProduct from "./components/seller/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import SellerUpdateProduct from "./components/seller/UpdateProduct";
import OrdersList from "./components/admin/OrdersList";
import SellerOrdersList from "./components/seller/OrdersList";
import ProcessOrder from "./components/admin/ProcessOrder";
import SellerProcessOrder from "./components/seller/ProcessOrder";
import UsersList from "./components/admin/UsersList";
import UpdateUser from "./components/admin/UpdateUser";
import ProductReviews from "./components/admin/ProductReviews";
import SellerProductReviews from "./components/seller/ProductReviews";
import Login from "./components/user/Login";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}  />
        <Route path="/search/:keyword" element={<Home />}  />
        <Route path="/product/:id" element={<ProductDetails />}  />
        <Route path="/login" element={<Login />}  />
        <Route path="/register" element={<Register />}  />

        <Route
          path="/me"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/me/update"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
          
        />

        <Route
          path="/password/update"
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          }
          
        />

        <Route
          path="/password/forgot"
          element={<ForgotPassword />}
          
        />

        <Route
          path="/password/reset/:token"
          element={<NewPassword />}
          
        />

        <Route
          path="/shipping"
          element={
            <ProtectedRoute>
              <Shipping />
            </ProtectedRoute>
          }
          
        />

        <Route
          path="/confirm"
          element={
            <ProtectedRoute>
              <ConfirmOrder />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />

        <Route
          path="/success"
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders/me"
          element={
            <ProtectedRoute>
              <ListOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/order/:id"
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAdmin={true}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboardSeller"
          element={
            <ProtectedRoute isSeller={true}>
              <DashboardSeller />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute isAdmin={true}>
              <ProductsList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller/products"
          element={
            <ProtectedRoute isSeller={true}>
              <SellerProductsList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/product"
          element={
            <ProtectedRoute isAdmin={true}>
              <NewProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller/product"
          element={
            <ProtectedRoute isSeller={true}>
              <SellerNewProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/product/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <UpdateProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller/product/:id"
          element={
            <ProtectedRoute isSeller={true}>
              <SellerUpdateProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute isAdmin={true}>
              <OrdersList />
            </ProtectedRoute>
          }
          
        />
        <Route
          path="/seller/orders"
          element={
            <ProtectedRoute isSeller={true}>
              <SellerOrdersList />
            </ProtectedRoute>
          }
          
        />
        <Route
          path="/admin/order/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <ProcessOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller/order/:id"
          element={
            <ProtectedRoute isSeller={true}>
              <SellerProcessOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute isAdmin={true}>
              <UsersList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/user/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <UpdateUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reviews"
          element={
            <ProtectedRoute isAdmin={true}>
              <ProductReviews />
            </ProtectedRoute>
          }
          
        />
        <Route
          path="/seller/reviews"
          element={
            <ProtectedRoute isSeller={true}>
              <SellerProductReviews />
            </ProtectedRoute>
          }
          
        />


        <Route path="/cart" element={<Cart />}  />
        {/* <Route path="/login" component={Login} /> */}
      </Routes>
      {!loading && (!isAuthenticated || user.role !== "admin") && <Footer />};
    </div>
  );
}

export default App;
