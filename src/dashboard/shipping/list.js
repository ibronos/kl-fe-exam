import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faEdit, faDeleteLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from 'react';
import axios from "axios";
import { useContextData } from "../../dashboardLayout";

const Shipping = () => {
    const navigate = useNavigate();
    const { contextData } = useContextData();
    const [list, setList] = useState([]);
    const [loginData, setLoginData] = useState({});
    const [token, setToken] = useState(false);

    useEffect(() => {

        setLoginData(contextData);

        if( loginData.authenticated && loginData.loginData.data.access_token ){
            setToken(loginData.loginData.data.access_token);
        }

        if(token){
            axios.request({
                method: 'GET',
                url: `https://api.jokolodang.com/api/v1/finance/shippingComps`,
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token
                },
            })
            .then((res) => {
                setList(res.data.data);
                // console.log(res);
            });
        }

        


    }, [loginData, token]);

    const handleDelete = async (id) => {
        console.log(id);
        if (window.confirm("Are you sure want to delete this data?") === true) {
            axios.delete(`https://api.jokolodang.com/api/v1/finance/shippingComps/${id}`,
            {
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
            } 
            )
            .then(() => {
                alert('deleted successfully')
                navigate("/dashboard/shipping");
            })
            .catch((error) => {
                throw new Error(error)
            })
            .finally(() => {
            });
          } else {
            navigate("/dashboard/shipping");
          }
    };

    return (
        <div className="">
             <div>
                <div >
                    <h1 className="text-3xl font-bold inline">Shipping</h1>
                    <Link to="/dashboard/shipping/add" className='ml-2 inline'> 
                        <FontAwesomeIcon icon={faPlusCircle} className='' /> 
                    </Link>
                </div>
                <div className='pt-2'>
                    <input type='text' className='border' placeholder='search'/>
                </div>
             </div>

             <div className='pt-5'>
                <table className="table-auto border-collapse border border-slate-400"> 
                    <thead>
                        <tr>
                            <th className='border border-slate-300'>Name</th>
                            <th className='border border-slate-300'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {/* {data.map((index, value) => (
                        <tr>
                            <td>Malcolm Lockyer</td>
                        </tr>
                    ))} */}

                    {
                        list.map(d => (
                            <tr key={d.id}>
                                <td className='border border-slate-300'>{d.name}</td>
                                <td className='border border-slate-300'>
                                    <Link to="/dashboard" className=''> 
                                        <FontAwesomeIcon icon={faEdit} className='pr-2' />
                                         
                                    </Link>
                                    <Link to="/dashboard" className='' onClick={() => handleDelete(d.id)}> 
                                        <FontAwesomeIcon icon={faTrash} className='pr-2' />
                                         
                                    </Link>
                                </td>
                            </tr>
                            )
                        )
                    }
                        
                    </tbody>
                </table>
             </div>

        </div>
    );
};

export default Shipping;