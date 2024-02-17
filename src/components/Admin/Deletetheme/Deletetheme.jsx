import React from "react";
import { Button } from "react-bootstrap";
import {  AiFillDelete} from "react-icons/ai";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Deletetheme = (props) =>{
    
    const handleDelete=(id)=>{
        //Delete Theme Api
        axios.delete('http://localhost:43323/admin/deleteTheme/'+id)
          .then(response => {
            if(response.data==="Theme deleted"){
            props.onThemeDeleted();
            toast.success("Theme Deleted");
            }
          })
          .catch(error => toast.warning("Theme Not Deleted"));
        }

    return (
        <>
        <Button variant="" onClick={()=>handleDelete(props.themeid)} ><AiFillDelete/></Button>
        </>
    )
}
export default Deletetheme;