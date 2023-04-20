import { useState} from 'react'
import {Routes,Route} from 'react-router-dom'
import {getUser} from '../../utilities/users-service'
import NewOrdePage from '../NewOrderPage/NewOrdePage';
import AuthPage from '../AuthPage/AuthPage';
import OrderHistory from '../OrderHistory/OrderHistory';
import NavBar from '../../components/NavBar/NavBar';
import './App.css';

export default function App() {
const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      {user ? 
      <>
      <NavBar user={user} setUser={setUser}/>
      <h1>Mern Stack</h1>
      <Routes>
       <Route path="/orders/new" element ={<NewOrdePage/>}/> 
       <Route path="/orders" element ={<OrderHistory/>}/> 
        </Routes> 
        </>
       :
       <AuthPage setUser={setUser} />
       }
    </main>
  );
}


