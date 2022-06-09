import React from "react";
import { useContext } from "react";
import { FaHeart, FaUserAlt } from "react-icons/fa";
import { GrDocumentText, GrLogout, GrNotes } from "react-icons/gr";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../store/GlobalState";

const Menu = () => {
  const { dispatch } = useContext(GlobalContext);
  const logOut = () => {
    dispatch({
      type: "setUser",
      payload: {},
    });
  };
  return (
    <>
      <Link to={"/notes"}>
        <span className="center">
          <GrNotes />
          <span>Notes</span>
        </span>
      </Link>
      <Link to={"/new"}>
        <span className="center">
          <GrDocumentText />
          <span>Add new</span>
        </span>
      </Link>
      <Link to={"/favorites"}>
        <span className="center">
          <FaHeart />
          <span>Favorites</span>
        </span>
      </Link>
      <Link to={"/profile"}>
        <span className="center">
          <FaUserAlt />
          <span>Profile</span>
        </span>
      </Link>
      <Link to={"/"} onClick={logOut}>
        <span className="center">
          <GrLogout />
          <span>Logout</span>
        </span>
      </Link>
    </>
  );
};

export default Menu;
