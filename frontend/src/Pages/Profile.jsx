import { GlobalContext } from "../store/GlobalState"
import { useContext } from "react";
import {GiCamelHead} from 'react-icons/gi';

const Profile = () => {

    const {dispatch,user} = useContext(GlobalContext);

  return (
    <div>
      <GiCamelHead />
      <p>@{user.name.toLowerCase()}</p>
    </div>
  )
}

export default Profile