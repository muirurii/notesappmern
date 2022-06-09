import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { GlobalProvider } from './store/GlobalState';
import Home from "./Pages/Home";
import Header from "./components/Layout/Header";
import Profile from './Pages/Profile';
import Notes from './Pages/Notes';
import NewNote from './Pages/NewNote';
import UpdateNote from './Pages/UpdateNote';
import Favorites from './Pages/Favorites';

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Header />  
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/notes' element={<Notes />}></Route>
          <Route path='/new' element={<NewNote />}></Route>
          <Route path='/update/:id' element={<UpdateNote />}></Route>
          <Route path='/favorites' element={<Favorites />}></Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
