import React ,{useState,useEffect} from "react";
import NavigationMenu from "../Navbar/Navbar";
import { Table } from "react-bootstrap";
import './HomePage.css';
import Addgift from "../Addgift/AddGift";
import axios from "axios";
import Editgift from "../Editgift/Editgift"
import Deletegift from "../Deletegift/Deletegift";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const HomePage=()=>{
    const [gifts,setGifts] = useState([]);
    const [effect,setEffect] = useState('');
   
    
    useEffect(() => {
      //Get themes Api
    axios.get('http://localhost:43323/admin/getGift')
      .then(response => {
      setGifts(response.data);
     
      })
      .catch(error => {
        console.log(error);
      });
  }, [effect]);

    return(
        <>
            <div>
                <NavigationMenu />
            </div>
            <ToastContainer/>            
    <div className="gifts">
            <div className="giftstable">
            <Table  hover>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th data-testid="giftName">Gift Name</th>
                        <th data-testid="giftPrice">Price</th>
                        <th>Quantity</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                      {
                      gifts.map((gift,index) => 
                      
                      <tr key={gift.giftId} className="gift">
                      <td><img src={gift.giftImageUrl} width={100} height={100} alt="gift img" /></td>
                      <td>{gift.giftName}</td>
                      <td>{gift.giftPrice}</td>
                      <td>{gift.giftQuantity}</td>
                      <td>
                        
                      <span id={"editGift"+(index+1)}><Editgift giftData={gift} onGiftEdited={() => setEffect(Date.now())}/></span>
                      <span id={"deleteGift"+(index+1)}><Deletegift giftid={gift.giftId} onGiftDeleted={() => setEffect(Date.now())}/></span>
                        
                        </td>
                      </tr>
                      )}
                </tbody>                        
            </Table>
    </div>
    <div className="addgifts">
      <Addgift onGiftAdded={() => setEffect(Date.now())}/>
      </div>
</div>
        </>
    )
}
export default HomePage;