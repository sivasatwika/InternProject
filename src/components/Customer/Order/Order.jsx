import React, { useState ,useEffect} from "react";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import NavigationMenu from '../Navbar/Navbar'
import './Order.css'
import { toast } from 'react-toastify';

const Order=()=>{
    const [orders,setOrders]=useState([]);
    const email = localStorage.getItem("email");
    const navigate = useNavigate();
    useEffect(()=>{
        axios.get('http://localhost:43323/user/getallorders', {
            params: {
              userEmail: email
            }
            }).then((response) => {
            setOrders(response.data);
            }).catch((error)=>{
              toast.warning(error)
            })

},[])
const handleReview =(id) =>{
    navigate("/Review",{state : id})
}
    return(
        <div>
            
            <NavigationMenu />
            <div className="userorders">
            <Table  hover className="userorderstable" >
                <thead>
                    <tr>
                        <th data-testid="orderId">Order Id</th>
                        <th data-testid="giftName">Gift Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order)=>(
                                <tr key={order.orderid}>
                                <td id="orderid">{order.orderid}</td>
                                <td id="giftName">{order.giftName}</td>
                                <td id="giftprice">{order.giftPrice}</td>
                                <td id="giftQuantity">{order.orderQuantity}</td>
                                <td><Button onClick={()=>handleReview(order.orderid)}>Add Review</Button></td>
                                </tr>
                            ))}
                    </tbody>                        
                
            </Table>
            </div>
        </div>
    )
}

export default Order;