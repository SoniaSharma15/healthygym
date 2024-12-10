import React, { useState } from 'react'
import '../components/Style.css'
import { Drawer , Button} from 'rsuite';
import { NavLink, useNavigate } from 'react-router-dom';
function Navbar({page,setPage}) {
      const [size, setSize] = React.useState();
      const [open, setOpen] = React.useState(false);
      const [placement, setPlacement] = React.useState('right');
    
const navigate=useNavigate()

    
    if(page){
      const na=document.getElementById('navid');
      na.style.display="none";
      window.print();
      na.style.display="block";
      setPage(false)
    }

      const handleOpen = value => {
        setSize(value);
        setOpen(true);
      };

      //checking user is login or not
      const isUserlogin=localStorage.getItem('isUserLoggedIn');
      const islogin = localStorage.getItem("isLoggedIn");

      return (
        <>
    <div id='navid'>
        <nav>
            <ul>
                <li>
                  <h1><NavLink to={'/'}>Health-Gym</NavLink>
                </h1></li>
                <li > <Button size="sm"  onClick={() => handleOpen('18rem')}>
                Gym
        </Button></li>
            </ul>
        </nav>
       
 
      <Drawer size={size} placement={placement} open={open} onClose={() => setOpen(false)}>
        <Drawer.Header>
          <Drawer.Title><ul><li className='mx-3'>Health-Gym</li></ul></Drawer.Title>
          {/* <Drawer.Actions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
          </Drawer.Actions> */}
        </Drawer.Header>
        <Drawer.Body>
            <ul className='sidebar fst-italic'>
              {(islogin!=="true")?<><li><NavLink to={'/adminlogin'}>Admin Login</NavLink></li>
              <hr /></>:<>
              <li><NavLink to={'/admindashboard'}>Admin Dashboard</NavLink></li>
              <hr />
              <li><NavLink onClick={()=>{
                 localStorage.setItem('isLoggedIn', 'false');
                 navigate("/adminlogin");
            }}>Admin Logout</NavLink></li>
            <hr /></>
              }
            {(isUserlogin==="true")?<>
              <li><NavLink to={'/member'}>Member</NavLink></li>
            <hr />
              <li><NavLink to={'/supplements'}>Supplements</NavLink></li>
            <hr />
            <li><NavLink to={'/nutrition'}>Nutrition</NavLink></li>
            <hr />
            <li><NavLink to={'/personaldetails'}>Personal Details</NavLink></li>
            <hr />
            <li><NavLink onClick={()=>{
                 localStorage.setItem('isUserLoggedIn', 'false');
                 navigate("/login");
            }}>User Logout</NavLink></li>
            <hr />
            </>:<> <li><NavLink to={'/login'}>User Login</NavLink></li>
            <hr />
            <li><NavLink to={'/signup'}>User Signup</NavLink></li>
            <hr /></>}            
            </ul>
        </Drawer.Body>
      </Drawer>
      </div>        
        </>
      );
    };  


export default Navbar