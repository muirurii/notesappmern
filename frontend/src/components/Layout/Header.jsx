import { Link } from "react-router-dom";
import { useContext } from "react";
import {GlobalContext} from "../../store/GlobalState";
import { FaHeart, FaUserAlt} from "react-icons/fa";
import {GrNotes,GrDocumentText} from "react-icons/gr";

const Header = () => {
  const {user} = useContext(GlobalContext);
  return (
    <header>
        <h2>Dairyy</h2>
        <nav>
            {!user.name && <Link to={'/'}>Login / Signup</Link>}
            {user.name && (<>
                    <Link to={'/notes'}>
                      <span className="center">
                        <GrNotes />
                        <span>Notes</span>
                      </span>
                    </Link> 
                    <Link to={'/new'}>
                      <span className="center">
                        <GrDocumentText />
                        <span>Add new</span>
                      </span>
                    </Link> 
                    <Link to={'/favorites'}>
                      <span className="center">
                        <FaHeart />
                        <span>Favorites</span>
                      </span>
                    </Link> 
                    <Link to={'/profile'}>
                      <span className="center">
                        <FaUserAlt />
                        <span>Profile</span>
                      </span>
                    </Link> 
            </>)
           }
        </nav>
    </header>
  )
}

export default Header
