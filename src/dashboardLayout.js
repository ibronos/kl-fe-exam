import { Outlet, Link, useNavigate, useOutletContext } from 'react-router-dom';
import { useEffect, useState } from "react";
import Sidenav from './dashboard/sidenav';

const DashboardLayout = () => {

    const [authenticated, setauthenticated] = useState(false);
    const [name, setName] = useState("");
    const [loginData, setLoginData] = useState({});
    const [contextData, setContextData] = useState({
        authenticated: authenticated,
        loginData: loginData
    });
    const navigate = useNavigate();

    useEffect(() => {

        const loggedInUser = localStorage.getItem("authenticated");
        
        if (loggedInUser) {
            setauthenticated(loggedInUser);
            const data = localStorage.getItem("userData");
            setName(JSON.parse(data).data.user.name);
            setLoginData(JSON.parse(data).data);
            setContextData({
                authenticated: loggedInUser,
                loginData: JSON.parse(data).data
            });
            // console.log(JSON.parse(data).data);
        } else {
            navigate("/login");
        }

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
                <div className='w-2/12'>
                    <Sidenav />
                </div>
                
                <div className='w-10/12 bg-gray-300 p-6'>
                    <div className='bg-white h-full p-4 rounded-lg'>
                        <Outlet context={{ contextData }} />
                    </div>
                </div>
            </div>
            
        </div>
    );
  };

  export default DashboardLayout;


  export function useContextData() {
    return useOutletContext();
  }