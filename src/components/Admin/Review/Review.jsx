import React, { useState ,useEffect} from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import "./Review.css"

const Review=()=>{
    const [reviews,setreviews]=useState([]);
    useEffect(()=>{
          axios.get('http://localhost:43323/getreview').then((response) => {
           
      setreviews(response.data);
    });

},[])

    return(
        <div className="Review">
           
           
            <Table  hover className="ReviewTable" >
                <thead>
                    <tr>
                        <th>OrderId</th>
                        <th data-testid="userName" >Username</th>
                        <th data-testid="comments">Comments</th>
                        
                    </tr>
                    </thead>
                    <tbody>
                        {
                            reviews.map((review)=>(
                                <tr key={review.orderId}>
                                <td>{review.orderId}</td>
                                <td >{review.name}</td>
                                <td >{review.comments}</td>
                               
                                </tr>
                            ))}
                    </tbody>                        
                
            </Table>
           
        </div>
    )
}
export default Review;