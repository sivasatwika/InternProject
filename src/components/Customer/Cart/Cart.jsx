import React, { useState, useEffect } from 'react';
import NavigationMenu from '../Navbar/Navbar';
import { Button,Table } from 'react-bootstrap';
import axios from 'axios';
import EditOrder from '../Editorder/Editorder';
import DeleteOrder from '../Deleteorder/Deleteorder';
import './Cart.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const Myorders=()=> {
  const email = localStorage.getItem("email");
  const [placedOrders,setPlacedOrders]=useState([]);
  const [effect,setEffect]=useState('');
  
  const fetchOrders=()=>{
    axios.get('http://localhost:43323/user/getOrdersCart', {
      params: {
        userEmail: email
      }
      }).then((response) => {
      setPlacedOrders(response.data);
      }).catch((error)=>{
        toast.warning(error)
      })
  }
  useEffect(()=>{fetchOrders();},[])
  useEffect(()=>{
     fetchOrders();
    },[effect])

    const navigate = useNavigate();

     const handlePay=()=>{
      //Add order api
      axios.post('http://localhost:43323/user/addOrders', email, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          
          if(response.data==="Order added"){
            navigate('/myorders');
            toast.success("Order Added");
          }
        })
        .catch((error) => {
          toast.warning("Error")
        });
    }

  return (
    <div className="orderpage">
      <div>
        <NavigationMenu />
      </div>
      <ToastContainer/>
      <div  id="gridOrderBody">
      <Table  hover>
        <thead>
          <tr>
            <th data-testid="giftName">Gift Name</th>
            <th data-testid="giftPrice">Price</th>
            <th data-testid="quantity">Quantity</th>
            <th data-testid="totalPrice">Total Price</th>
            <th>Order Date</th>
            
            <th></th>
          </tr>
        </thead>
        <tbody>
          { 
           placedOrders.map((order) => (
              <tr key={order.orderID} id={order.orderID}>
              <td>{order.giftName}</td>
              <td>{order.giftPrice}</td>
              <td>{order.orderQuantity}</td>
              <td>{order.orderPrice}</td> 
              <td>{order.orderDate}</td>
              
              <td>
               <span ><EditOrder orderData = {order} onOrderEdited={() => setEffect(Date.now())}/> </span>
               <span ><DeleteOrder orderId={order.orderID} onOrderDeleted={() => setEffect(Date.now())}/> </span>   
              </td>
            </tr>
          ))
          }
        </tbody>
      </Table>
      
      </div>
      <Button variant='dark' id="payButton" onClick={()=>handlePay()}>Pay</Button>
    </div>
  );
}
export default Myorders;