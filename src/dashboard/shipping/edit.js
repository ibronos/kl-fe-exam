import { useNavigate, useParams  } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from "axios";
import { useContextData } from "../../dashboardLayout";

const ShippingEdit = (params) => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const { contextData } = useContextData();
    const [loginData, setLoginData] = useState({});
    const [token, setToken] = useState(false);

    const { id } = useParams();
    console.log(id);

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
                // setList(res.data.data);
                // console.log(res);
                let resData = res.data.data;
                var resDataFilter = resData.filter(d => d.id == id);
                setName(resDataFilter[0]["name"]);
                console.log(resDataFilter[0]["name"]);
            });
        }

    }, [loginData, token]);

    const handleSubmit = (e) => {
        e.preventDefault();
      
        if (!name) {
            alert("please fill the form!");
            return;
        }

        if (name.length < 2) {
            alert("minimal 2 karakter!");
            return;
        }

        axios.put(`https://api.jokolodang.com/api/v1/finance/shippingComps/${id}`, 
        {
          name: name
        },
        {
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
        }
        )
          .then((response) => {
            let resData = response.data;
            console.log(resData);
            if( resData.success ){
              alert("data updated succesfully");
              navigate("/dashboard/shipping");
            }
    
          })
          .catch((error) => {
           console.log(error)
          })
          .finally(() => {
          });
    
    };

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
            <div >
                <h1 className="text-3xl font-bold inline">Edit Shipping ID: {id}</h1>
                <button to="" className='ml-2 mt-2 bg-slate-400 p-1 rounded font-bold' onClick={() => handleDelete(id)}> 
                    Delete This Item
                </button>
            </div>

            <form onSubmit={handleSubmit} className="pt-5">
                <div>
                    <label className="block">Nama</label>
                    <input
                        className="border border-indigo-600"
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <input className="block p-2 bg-slate-500 mt-2" type="submit" value="Update" />
            </form>
            
        </div>
    );
};

export default ShippingEdit;