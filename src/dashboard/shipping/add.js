import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from "axios";
import { useContextData } from "../../dashboardLayout";

const ShippingAdd = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const { contextData } = useContextData();
    const [loginData, setLoginData] = useState({});
    const [token, setToken] = useState(false);

    useEffect(() => {

        setLoginData(contextData);

        if( loginData.authenticated && loginData.loginData.data.access_token ){
            setToken(loginData.loginData.data.access_token);
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

        axios.post("https://api.jokolodang.com/api/v1/finance/shippingComps", 
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
              alert("data added succesfully");
              navigate("/dashboard/shipping");
            }
    
          })
          .catch((error) => {
           console.log(error)
          })
          .finally(() => {
          });
    
      };
    return (
        <div className="">
            <div >
                <h1 className="text-3xl font-bold inline">Tambah Shipping</h1>
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
                <input className="block p-2 bg-slate-500 mt-2" type="submit" value="Submit" />
            </form>
            
        </div>
    );
};

export default ShippingAdd;