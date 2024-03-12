import './App.css';
import UserSignup from './components/UserSignup';
import Login from './components/login';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import DashBoard from './components/DashBoard'
import AgentSignup from './components/AgentSignup';
import AvaliableContainer from './components/AvaliableContainer';
import Booking from './components/Booking';
import Logout from './components/Logout';
import Container from './components/Container';
import BookedContainers from './components/BookedContainers';
function App() {
return(
    <BrowserRouter>
        <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/DashBoard" element={<DashBoard/>}/>
        <Route path="/signup" element={<UserSignup/>}/>
        <Route path="/AgentSignup" element={<AgentSignup/>}/>
         <Route path="/avaliablecontainer" element={<AvaliableContainer/>}/>
         <Route path="/Booking" element={<Booking/>}/>
         <Route path="/Logout" element={<Logout/>}/>
         <Route path="/conatainer" element={<Container/>}/>
         <Route path ="/Booked" element={<BookedContainers/>}/>
        </Routes>
    </BrowserRouter>
)
}

export default App;
