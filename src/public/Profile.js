import { Outlet, Link, useNavigate, useOutletContext } from 'react-router-dom';
import { useEffect, useState } from "react";


const Profile = () => {

  const [authenticated, setauthenticated] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loginData, setLoginData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {

      const loggedInUser = localStorage.getItem("authenticated");

      try {
          if (loggedInUser) {
              setauthenticated(loggedInUser);
              const data = localStorage.getItem("userData");
              setName(JSON.parse(data).data.user.name);
              setEmail(JSON.parse(data).data.user.email);
              setPhone(JSON.parse(data).data.user.phone_number);
              setLoginData(JSON.parse(data).data);
              // console.log(JSON.parse(data).data);
          } else {
              navigate("/login");
          }
      } catch (error) {
          navigate("/login");
      }
      
     

  }, []);

    return (
      <div>
        <h1>Profile</h1>
        <p>nama: {name}</p>
        <p>phone: {phone}</p>
        <p>email: {email}</p>
      </div>
    );
  };
  export default Profile;