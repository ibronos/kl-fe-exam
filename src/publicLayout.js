import { Outlet, Link } from 'react-router-dom';
import { useEffect, useState } from "react";

const PublicLayout = () => {

    const [authenticated, setauthenticated] = useState(false);
    useEffect(() => {
        const loggedInUser = localStorage.getItem("authenticated");
        if (loggedInUser) {
            setauthenticated(loggedInUser);
        }
    }, []);

    return (
        <div>

            <nav className='page-nav bg-indigo-600 flex flex-row flex-no-wrap justify-between items-center pl-4 pr-4'>
                <div className="page-header-title text-white font-bold">
                    KLEDO TEST
                </div>
                <div className="page-header-link text-white">
                    <Link to="/profile" className='bg-black p-3 inline-block'> Profile </Link>
                   
                    {(() => {
                         if (!authenticated) {
                            return ( <Link to="/login" className='p-3 inline-block'> Login </Link> );
                        } else {
                            return ( <Link to="/logout" className='p-3 inline-block'> Logout </Link> );
                        }
                    })()}
                    
                </div>
            </nav>

            <Outlet />
            
        </div>
    );
  };

  export default PublicLayout;