import Signup from "../components/Signup";
import Login from "../components/Login";
import { useState } from "react";

const Home = ()=>{

    const [cover,setCover] = useState({
        position:'left',
        text: 'Signup'
    });

    const revealCard = ()=>{
        setCover({
            position: cover.position === 'left' ? 'right' : 'left',
            text: cover.text === 'Signup' ? 'Login' : 'Signup'
        });
    }

    return(
        <div className="home">
            <div className= {`clip center ${cover.position}`}>
                <button className="btn" onClick={revealCard}>{cover.text}</button>
            </div>
            <Signup />
            <Login />
        </div>
    );
}

export default Home;