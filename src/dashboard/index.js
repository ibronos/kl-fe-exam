// import { useOutletContext } from "react-router-dom";
import { useContextData } from "../dashboardLayout";

const Dashboard = () => {

  const { contextData } = useContextData();
  let name = contextData.authenticated && contextData.loginData.user.name ? contextData.loginData.user.name : "";
  console.log(contextData);

    return (
      <div className="">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="bg-gray-200 p-4 rounded-lg mt-10">
          <h2 className="text-center text-2xl font-bold">Selamat Datang</h2>
          <h5 className="text-center text-1xl font-bold"> {name}</h5>
        </div>
      </div>
    );
  };
  export default Dashboard;