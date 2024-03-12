import React,{useState,useEffect} from 'react'
import Header from './Header'
import Cookies from 'js-cookie';
import axios from 'axios';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Container() {

  const [ownerid, setOwnerid] = useState('');
  const [owner_name, setOwnerName] = useState('');
  const [con_type, setContainerType] = useState('');
  const [con_dimension, setContainerDimension] = useState('');
  const [containers, setContainers] = useState([]);
  const notify = (message) => toast(message);
  useEffect(()=>
  {
    const ownername = Cookies.get('ownername')
    const owner_id = Cookies.get('owner_id')
    setOwnerid(owner_id)
    setOwnerName(ownername);
  },1000)

  useEffect(() => {
    const owner_id = Cookies.get('owner_id');
    axios.get(`http://localhost:4500/con/owner/container?ownerid=${owner_id}`)
        .then(response => {
          setContainers(response.data);
            
        })
        .catch(error => {
            console.log(error.message);
        });
}, []); 


  const handleSubmit=(e)=>{
   e.preventDefault();
  //  console.log(owner_name);
  //  console.log(con_type)
  // console.log(ownerid);
  const body = {
    ownerid,
    owner_name,
    con_type,
    con_dimension
  }
  axios.post("http://localhost:4500/con/register",body)
  .then(response => {
   console.log(response.data)
   notify(response.data)
   setTimeout(()=>
   {
    window.location.reload();

   },1000)
  }).catch(error => {
    if(error.response && error.response.status === 200)
    {
      console.log(error.message);
    }
  })
  }
  return (
    <div>
          <ToastContainer />
      <Header/>
      All the Containers Owned
      <div className="d-flex justify-content-end">
       <button type="button" className="btn btn-primary mr-2" data-toggle="modal" data-target="#exampleModalCenter">
    Add
  </button>
</div>



<div className="row no-gutters d-flex justify-content-center">
            {containers.map(container => (
                <div className="col-sm-5 m-2" key={container._id}>
                    <div className="card shadow">
                        <div className="row no-gutters">
                            <img src="https://tse4.mm.bing.net/th?id=OIP.6gGESdByWOGl3GEDfT1srwHaFH&pid=Api&P=0&h=180" className="card-img img-fluid col-md-4" alt="Container" />
                            <div className="col-md-8">
                                <div className="card-body">
                                    <p><strong>Container Unique Id:</strong> {container.con_uniqueid}</p>
                                    <p><strong>Container Dimensions:</strong> {container.con_dimension}</p>
                                    <p><strong>Type:</strong> {container.con_type}</p>
                                    <p><strong>Container Created time:</strong> {new Date(container.con_datetime).toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

<div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLongTitle">Container Adding</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <form onSubmit={handleSubmit}>
      <div className="modal-body">

      <input 
        type="text" 
        placeholder="Owner Name" 
        value={owner_name} 
        className='form-control mb-2'
        onChange={(e) => setOwnerName(e.target.value)} 
        disabled
        required
      />

      <input 
        type="text" 
        placeholder="Container Type" 
        value={con_type} 
        className='form-control mb-2'
        onChange={(e) => setContainerType(e.target.value)}
        required
      />

      <input 
        type="text" 
        placeholder="Container Dimension" 
        value={con_dimension} 
        className='form-control mb-2'
        onChange={(e) => setContainerDimension(e.target.value)} 
        required
      />
    
      </div>
      <div className="modal-footer">
        <button type="submit" className="btn btn-primary">Save changes</button>
      </div>
      </form>    
    </div>
    </div>
    </div>
    </div>
  )
}
