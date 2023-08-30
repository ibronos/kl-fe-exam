import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Dashboard from "../dashboard/index";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated") || false));
  const [userData, setUserData] = useState( localStorage.getItem(localStorage.getItem("userData") || {}) );

  const handleSubmit = (e) => {
    e.preventDefault();
  
      if (!email || !password) {
          alert("please fill the form!");
          return;
      }

      axios.post("https://api.jokolodang.com/api/v1/authentication/login/", {
          email: email,
          password: password
      })
      .then((response) => {
        let resData = response.data;
        console.log(resData);
        if( resData.success ){
          setauthenticated(true);
          localStorage.setItem("authenticated", true);
          setUserData(true);
          localStorage.setItem("userData", JSON.stringify(resData));
          navigate("/dashboard");
        }

      })
      .catch((error) => {
       console.log(error)
      })
      .finally(() => {
      });

  };
  
  return (
    <div className="flex w-full h-screen flex-wrap content-around justify-center items-center">
      <div className="login-wrapper">
        <p className="text-center text-5xl font-bold">Login</p>
        <form onSubmit={handleSubmit} className="pt-5">
          <div>
            <label className="block">Email</label>
            <input
            className="border border-indigo-600"
            type="email"
            name="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          </div>

          <div className="pt-1">
            <label className="block">Password</label>
            <input
              className="border border-indigo-600"
              type="password"
              name="Password"
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>

          <input className="block p-2 bg-slate-500 mt-2" type="submit" value="Submit" />
        </form>
      </div>
    </div>
  )
};

export default Login;