import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faHouse, faTruckFast } from "@fortawesome/free-solid-svg-icons";

const Sidenav = () => {
    return (
      <div className="bg-gray-200 h-screen flex flex-col justify-between">
            <div className=''>
                <Link to="/dashboard" className='p-3 block border-b border-slate-500 text-slate-500'> 
                    <FontAwesomeIcon icon={faHouse} className='pr-2' />
                    Dashboard 
                </Link>
                <Link to="/dashboard/shipping" className='p-3 block border-b border-slate-500 text-slate-500'> 
                    <FontAwesomeIcon icon={faTruckFast} className='pr-2' />
                    Shipping 
                </Link>
            </div>

            <button className='p-4 bg-cyan-600 text-white'>
                <FontAwesomeIcon icon={faRightFromBracket} className='pr-2' />
                logout
            </button>
      </div>
    );
};

export default Sidenav;