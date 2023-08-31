import { Outlet, Link } from 'react-router-dom';
import { useEffect, useState } from "react";

const PublicLayout = () => {

    const [authenticated, setauthenticated] = useState(false);
    useEffect(() => {
        let loggedInUser = localStorage.getItem("authenticated");
        if (loggedInUser) {
            setauthenticated(loggedInUser);
        }
    }, [authenticated]);

    return (
        <div>

            <nav className='page-nav bg-indigo-600 flex flex-row flex-no-wrap justify-between items-center pl-4 pr-4'>
                <div className="page-header-title text-white font-bold">
                    KLEDO TEST
                </div>
                <div className="page-header-link text-white">
                    <Link to="/dashboard" className='bg-black p-3 inline-block'> Dashboard </Link>
                    <Link to="/profile" className='p-3 inline-block'> Profile </Link>
                    <Link to="/login" className='p-3 inline-block'> Login </Link>
                    {/* {(() => {
                         if (authenticated) {
                            return ( <Link to="/logout" className='p-3 inline-block'> Logout </Link> );
                        } else {
                            return ( <Link to="/login" className='p-3 inline-block'> Login </Link> );
                        }
                    })()} */}
                    
                </div>
            </nav>

            <Outlet />
            
        </div>
    );
  };

  export default PublicLayout;