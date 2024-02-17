import React from "react";
import { Button } from "react-bootstrap";
import {  AiFillDelete} from "react-icons/ai";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Deletegift = (props) =>{
    
    const handleDelete=(id)=>{
        //Delete Theme Api
       
        axios.delete('http://localhost:43323/admin/deleteGift/'+id)
          .then(response => {
            if(response.data==="Gift Deleted")
            props.onGiftDeleted();
           toast.success("Gift Deleted");
          })
          .catch(error => toast.warning("Gift Not Deleted"));
      };    

    return (
        <>
        <Button variant="" onClick={()=>handleDelete(props.giftid)} ><AiFillDelete/></Button>
        </>
    )
}
export default Deletegift;