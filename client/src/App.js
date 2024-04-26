import './App.css';
import UserSignup from './components/UserSignup';
import Login from './components/login';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import AgentSignup from './components/AgentSignup';
import AvaliableContainer from './components/AvaliableContainer';
import Logout from './components/Logout';
import Container from './components/Container';
import BookedContainers from './components/BookedContainers';
import Navbar from './components/Navbar';
import HomeTester from './components/HomeTester';
import Booking from './components/Booking';
function App() {
return(
    <BrowserRouter>
        <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={<UserSignup/>}/>
        <Route path="/AgentSignup" element={<AgentSignup/>}/>
         <Route path="/avaliablecontainer" element={<AvaliableContainer/>}/>
         <Route path="/Booking" element={<Booking/>}/>
         <Route path="/Logout" element={<Logout/>}/>
         <Route path="/conatainer" element={<Container/>}/>
         <Route path ="/Booked" element={<BookedContainers/>}/>
         <Route path="/Nav" element={<Navbar/>}/>
         <Route path='/Home' element={<HomeTester/>}/>
        </Routes>
    </BrowserRouter>
)
}

export default App;
