import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/userActions';
import { toast } from 'react-toastify';

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { cartItems } = useSelector(state => state.cart);
  
const successMsg = (message = "") =>
    toast.success(message, {
      position: 'bottom-right',
    });

  const logoutHandler = () => {
    dispatch(logout());
    successMsg('Logged out successfully.');
  };

  return (
    <nav className='navbar row'>
      <div className='col-12 col-md-3'>
        <div className='navbar-brand'>
          <Link to='/'>
            <img src='/images/shoe.png' alt="Shoe Logo" style={{ height: 70, width: 250 }} />
          </Link>
        </div>
      </div>

      <div className='col-12 col-md-3 mt-4 mt-md-0 text-center'>
        <Link to='/cart' style={{ textDecoration: 'none' }}>
          <span id='cart' className='ml-3'>Cart</span>
          <span className="ml-1" id="cart_count">{cartItems.length}</span>
        </Link>

        {user ? (
          <div className='ml-4 dropdown d-inline'>
            <button
              className='btn dropdown-toggle text-white mr-4'
              type='button'
              id='dropDownMenuButton'
              data-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='false'
            >
              <figure className='avatar avatar-nav'>
                {user.avatar ? (
                  <img src={user.avatar.url} alt={user.name} className='rounded-circle' />
                ) : (
                  <img src='/images/default_avatar.png' alt="Default Avatar" className='rounded-circle' />
                )}
              </figure>
              <span>{user.name}</span>
            </button>
            <div className='dropdown-menu' aria-labelledby='dropDownMenuButton'>
              {user.role === 'admin' && <Link className='dropdown-item' to='/dashboard'>Dashboard</Link>}
              {user.role === 'seller' && <Link className='dropdown-item' to='/dashboardSeller'>Dashboard</Link>}
              <Link className='dropdown-item' to='/orders/me'>Orders</Link>
              <Link className='dropdown-item' to='/me'>Profile</Link>
              <Link className='dropdown-item text-danger' to='/' onClick={logoutHandler}>Logout</Link>
            </div>
          </div>
        ) : (
          <Link to='/login' className='btn ml-4' id='login_btn'>Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
