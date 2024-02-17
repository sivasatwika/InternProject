import React, { useState ,useEffect} from "react";
import NavigationMenu from "../Navbar/Navbar";
import { Table } from "react-bootstrap";
import axios from "axios";
import './Orders.css'
const Orders=()=>{
    const [orders,setOrders]=useState([]);
    useEffect(()=>{
          axios.get('http://localhost:43323/admin/getallorders').then((response) => {
      setOrders(response.data);
    });

},[])

    return(
        <div>
            
                <NavigationMenu />
            <div className="adminorders">
            <Table  hover className="adminorderstable" >
                <thead>
                    <tr>
                        <th>Order Id</th>
                        <th data-testid="customerName">UserId</th>
                        <th>Gift Name</th>
                        <th data-testid="deliveryPlace">Address</th>
                        <th >Price</th>
                        <th data-testid="quantity">Quantity</th>
                     
                    </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order)=>(
                                <tr key={order.orderid}>
                                <td id="orderid">{order.orderid}</td>
                                <td id="username" >{order.userName}</td>
                                <td id="giftName">{order.giftName}</td>
                                <td id="Address" >{order.orderAddress}</td>
                                <td id="giftprice">₹{order.giftPrice}</td>
                                <td id="giftQuantity">{order.orderQuantity}Ps</td>
                               
                                </tr>
                            ))}
                    </tbody>                        
            </Table>
            </div>
        </div>
    )
}

export default Orders;