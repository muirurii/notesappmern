import { Link } from "react-router-dom";
import { useContext,useState } from "react";
import {GlobalContext} from "../../store/GlobalState";
import {  BiLoaderAlt, BiMenu } from "react-icons/bi";
import Menu from "./Menu";

const Header = () => {
  const {user,loading} = useContext(GlobalContext);
  const[menu,setMenu] = useState(false);

  return (
    <header>
        <h2><Link to={'/'}>NotesApp</Link></h2>
        <nav className="bg-menu">{user.name && (<Menu />)}</nav>
        {menu && <nav onClick={()=> setMenu(!menu)} className="sm-menu">{user.name && (<Menu />)}</nav>}
        {!user.name && <Link to={'/'}>Login / Signup</Link>}
        {loading &&<div className="loader center"><BiLoaderAlt /></div> }
        {user.name && <BiMenu className="hamb" onClick={()=> setMenu(!menu)}/>}   
    </header>
  )
}

export default Header;
