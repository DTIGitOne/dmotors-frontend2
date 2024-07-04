import React, { useState } from 'react';
import '../CustomCSS/Sidebar.css';
import CloseIcon from '@mui/icons-material/Close';
import MenuLogo from '../SVG/MenuLogo';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getRoleToken } from '../functions/getTokenPayload';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const loggedIn = useSelector((state) => state.user.userLogged);

  const role = getRoleToken();

  useEffect(() => {
    if (role === "ADMIN") {
      setIsAdmin(true)
    } else {
      setIsAdmin(false);
    }
  }, []);

  const navigate = useNavigate();

  const location = useLocation();
  const { pathname } = location;

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const logoutUser = () => {
    localStorage.removeItem('authorization');
    window.location.reload();
  }

  const redirectFunctionMain = () => {
    if (pathname === "/Main") {
      toggleSidebar();
    } else {
      navigate("/Main");
    } 
  }

  const redirectFunctionAbout = () => {
    if (pathname === "/About") {
      toggleSidebar();
    } else {
      navigate("/About");
    } 
  }

  const redirectFunctionContact = () => {
    if (pathname === "/Contact") {
      toggleSidebar();
    } else {
      navigate("/Contact");
    } 
  }

  const redirectFunctionSettings = () => {
    if (pathname === "/settings") {
      toggleSidebar();
    } else {
      navigate("/settings");
    } 
  }

  const redirectFunctionAdmin = () => {
    if (pathname === "/Admin/Main") {
      toggleSidebar();
    } else {
      navigate("/Admin/Main");
    } 
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div>
      <button className='z-50' onClick={toggleSidebar}>
        <MenuLogo />
      </button>
      <div className={`sidebarBackdrop ${isOpen ? 'open' : ''} ${!isOpen ? 'close' : ''}`} onClick={toggleSidebar}></div>
      <div className={`sidebar ${isOpen ? 'open' : ''} ${!isOpen ? 'close' : ''}`}>
        <div className=' h-7 w-full flex justify-end p-2'>
          <CloseIcon onClick={toggleSidebar} />
        </div>
        <div id='sideBox' className=' mt-12 text-2xl font-light h-52 w-full flex flex-col justify-around items-start p-4 relative'>
            <div className=' btn-one' onClick={redirectFunctionMain}>
              <span>Search</span>
            </div>
            <div className=' btn-one' onClick={redirectFunctionAbout}>
              <span>About us</span>
            </div>
            <div className=' btn-one' onClick={redirectFunctionContact}>
              <span>Contact</span>
            </div>
        </div>
        {loggedIn ? (
          <div className=' flex flex-col absolute bottom-5 left-5'>
            {isAdmin ? (<div className=' mb-6'><button onClick={redirectFunctionAdmin} className='btn-one' style={{color: "#1070FF"}}>Admin Panel</button></div>) : null}
            <button onClick={redirectFunctionSettings} className=' btn-one'>Settings</button>
            <button onClick={logoutUser} className=' btn-one mt-2'>Log out</button>
          </div>
        ) : (
          null
        )}
      </div>
    </div>
  );
};

export default Sidebar;
