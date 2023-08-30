import { Outlet, Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import Sidenav from './dashboard/sidenav';

const DashboardLayout = () => {

    const [authenticated, setauthenticated] = useState(false);
    const [name, setName] = useState("");

    useEffect(() => {
        const loggedInUser = localStorage.getItem("authenticated");
        if (loggedInUser) {
            setauthenticated(loggedInUser);
        }
        const data = localStorage.getItem("userData");
        const user = JSON.parse(data).data.user;
        setName(user.name);
        console.log(user);
    }, []);

    return (
        <div>

            <nav className='page-nav bg-indigo-600 flex flex-row flex-no-wrap justify-between items-center pl-4 pr-4'>
                <div className="page-header-title text-white font-bold">
                    KLEDO TEST ADMIN
                </div>
                <div className="page-header-link text-white">                   
                    {(() => {
                         if (!authenticated) {
                            return ( <Link to="/login" className='p-3 inline-block'> Login </Link> );
                        } else {
                            return (
                                <>
                                    <img src={"/logo192.png"} alt="Logo" className='inline p-1 w-10' /> 
                                    {name}
                                </>
                            );
                        }
                    })()}
                    
                </div>
            </nav>

            <div className='w-full flex'>
                <div className='w-3/12'>
                    <Sidenav />
                </div>
                
                <div className='w-9/12'>
                    <Outlet />
                </div>
            </div>
            
        </div>
    );
  };

  export default DashboardLayout;