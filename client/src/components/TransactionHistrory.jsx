import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
export default function TransactionHistory() {
  const [user_id, setUserId] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [role,setRole] = useState("")
  const navigate = useNavigate("");
  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      axios
        .get("http://localhost:4500/user/is-verify", {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        })
        .then((response) => {
        })
        .catch((error) => {
          console.error(error);
          navigate("/");
        });
    } else {
      navigate("/");
    }
  }, [navigate]);
  useEffect(() => {
    const fetchTransactionData = async () => {
      const role = Cookies.get("role")
      setRole(role);
      if(role ==="user")
        {
          try {
            const userid = Cookies.get("user_id");
            console.log(userid)
            setUserId(userid);
            const body = { user_id: userid };
            const response = await axios.post('http://localhost:4500/payment/transactions', body);
            setTransactions(response.data);
            console.log(response.data);
          } catch (error) {
            console.error('Error fetching transactions:', error);
          }
        }
        else if(role==="agent")
          {
            try {
              const userid = Cookies.get("owner_id");
      
              
              const body = { agent_id: userid };
              const response = await axios.post('http://localhost:4500/payment/transactionsagent', body);
              setTransactions(response.data);
              console.log(response.data);
            } catch (error) {
              console.error('Error fetching transactions:', error);
            }
          }
      
    };

    fetchTransactionData();
  }, []);


      

   
    
  return (
    <div>
        <Navbar/>
    <div className="p-5">
    {transactions.map(transaction => (       
          <div className="max-w-full  bg-white flex flex-col rounded overflow-hidden shadow-lg mb-2" key={transaction._id}>
            <div className="mt-2 flex justify-start bg-white p-2">
              <div className="flex mx-2 ml-6 h8 px-2 flex-row items-baseline rounded-full bg-gray-100 p-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-credit-card">
  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
  <line x1="1" y1="10" x2="23" y2="10"></line>
</svg>
              </div>
            </div>
            <div className="mt-2 mb-6 flex sm:flex-row mx-6 sm:justify-between flex-wrap ">
              <div className="flex flex-row place-items-center p-2">
                <div className="flex flex-col ml-2">
                  <p className="text-xs text-gray-500 font-bold">Transaction Amount</p>
                  <p className="text-xs text-gray-500">{transaction.amount}</p>
                </div>
              </div>

              <div className="flex flex-col p-2">
                {/* Display the formatted start time */}
                <p className="font-bold">Order Id</p>
                <p className="text-gray-500 font-bold">{transaction.order_id}</p>
                <p className="font-bold">Payment ID</p>
                <p className="text-gray-500"><span className="font-bold"></span>{transaction.payment_id}</p>
              </div>
              <div className="flex flex-col flex-wrap p-2">
              {role === "user" && (
              <div>
                <p className="font-bold">Agent Id</p>
                <p className="text-gray-500 font-bold">{transaction.agent_id}</p>
              </div>
                )}

              {role === "agent" && (
              <div>
                <p className="font-bold">User Id</p>
                <p className="text-gray-500 font-bold">{transaction.user_id}</p>
              </div>
                )}
            
              <p className="font-bold">Container Id</p>
              <p className="text-gray-500"><span className="font-bold"></span>{transaction.cont_id}</p>
              </div>
            </div>
          </div>
))}
</div>
</div>
  )
}
