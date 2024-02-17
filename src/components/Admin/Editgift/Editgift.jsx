import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Editgift = (props) => {
  const gift = props.giftData;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [EditedGiftName, setEditedGiftName] = useState(gift.giftName);
  const [EditedGiftPrice, setEditedGiftPrice] = useState(gift.giftPrice);
  const [EditedGiftdetails, setEditedGiftdetails] = useState(gift.giftDetails);
  const [EditedGiftImageUrl, setEditedGiftImageUrl] = useState(gift.giftImageUrl);
  const [EditedGiftQuantity, setEditedGiftQuantity] = useState(gift.giftQuantity);

  const [nameError, setNameError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [imageUrlError, setImageUrlError] = useState('');
  const [quantityError, setQuantityError] = useState('');
  const [detailsError, setDetailsError] = useState('');

    const handleEdit = () => {
      // Clear previous errors
      setNameError("");
      setPriceError("");
      setImageUrlError("");
      setQuantityError("");
      setDetailsError("");
    
      
      //const imageUrlRegex = /^(https?:\/\/)?[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?$/;
    
      let isValid = true;
    
      if (!EditedGiftName.trim()) {
        setNameError("Gift name is required");
        isValid = false;
      } else if (!/^[a-zA-Z\s]+$/.test(EditedGiftName)) {
        setNameError("Invalid gift name. Only alphanumeric characters and spaces are allowed.");
        isValid = false;
      }
    
      if (!EditedGiftPrice) {
        setPriceError("Gift price is required");
        isValid = false;
      } else if (! /^\d+(\.\d{1,2})?$/.test(EditedGiftPrice)) {
        setPriceError("Invalid gift price. Enter a valid number.");
        isValid = false;
      }
    
      if (!EditedGiftImageUrl.trim()) {
        setImageUrlError("Gift image URL is required");
        isValid = false;
      } else if (!/^(http|https):\/\/\S+$/.test(EditedGiftImageUrl)) {
        setImageUrlError("Invalid image URL. Enter a valid URL.");
        isValid = false;
      }
    
      if (!EditedGiftQuantity) {
        setQuantityError("Gift quantity is required");
        isValid = false;
      } else if (!/^[1-9]\d*$/.test(EditedGiftQuantity)) {
        setQuantityError("Invalid gift quantity. Enter a valid positive integer.");
        isValid = false;
      }
    
      if (!EditedGiftdetails.trim()) {
        setDetailsError("Gift details are required");
        isValid = false;
      }
    
      if (!isValid) {
        return; // Do not proceed with API call if any validation fails
      }
    
      // Proceed with updating the gift if all validations pass
      const data = {
        giftName: EditedGiftName,
        GiftImageUrl: EditedGiftImageUrl,
        giftprice: EditedGiftPrice,
        giftDetails: EditedGiftdetails,
        giftQuantity: EditedGiftQuantity,
      };
    
      axios.put('http://localhost:43323/admin/editGift/' + gift.giftId, data)
        .then(response => {
          if (response.data === "Gift edited") {
            toast.success("Gift Edited");
            handleClose();
            props.onGiftEdited();
          }
        })
        .catch(error => {
          toast.warning("Gift Not Edited");
        });
    };
    
  return (
    <>
    <Button variant="" onClick={handleShow}><FaRegEdit /></Button>        
      <Modal show={show} onHide={handleClose} className="editgiftform">
        <Modal.Header closeButton>        </Modal.Header>
        <Modal.Body>
            <Form>
            <Form.Text className="text-muted">
            <h1>Edit Gift</h1>
            </Form.Text>
            <lable>Gift Name:</lable>
        <Form.Group className="mb-3">
            <Form.Control type="text" placeholder="Enter the gift name" id="enterGiftName" defaultValue={gift.giftName}
            onChange={(e)=>setEditedGiftName(e.target.value)} />
            {nameError && <Form.Text className="text-danger">{nameError}</Form.Text>}
        </Form.Group>
        
        <lable>Gift Price:</lable>
        <Form.Group className="mb-3">
            <Form.Control type="text" placeholder="Enter the gift price" id="enterGiftPrice" defaultValue={gift.giftPrice}
            onChange={(e)=>setEditedGiftPrice(e.target.value)}  />
            {priceError && <Form.Text className="text-danger">{priceError}</Form.Text>}
        </Form.Group>

        <lable>Gift Image Url:</lable>
        <Form.Group className="mb-3">
            <Form.Control type="text" placeholder="Enter the gift image url" id="enterGiftImageUrl" defaultValue={gift.giftImageUrl}  
            onChange={(e)=>setEditedGiftImageUrl(e.target.value)}  />
            {imageUrlError && <Form.Text className="text-danger">{imageUrlError}</Form.Text>}
        </Form.Group>

        <lable>Gift Quantity:</lable>
        <Form.Group className="mb-3">
            <Form.Control type="text" placeholder="Enter the gift quantity" id="enterGiftQuantity" defaultValue={gift.giftQuantity}  
            onChange={(e)=>setEditedGiftQuantity(e.target.value)}  />
            {quantityError && <Form.Text className="text-danger">{quantityError}</Form.Text>}
        </Form.Group>

        <lable>Gift Details:</lable>
        <Form.Group className="mb-3">
            <Form.Control type="text" placeholder="Enter the gift details" id="enterGiftDetails" defaultValue={gift.giftDetails}
            onChange={(e)=>setEditedGiftdetails(e.target.value)}  />
            {detailsError && <Form.Text className="text-danger">{detailsError}</Form.Text>}
        </Form.Group>
    </Form>
        </Modal.Body>
        <Modal.Footer><Button variant="primary" onClick={handleEdit} id="editGiftButton">
        Update
      </Button>
        </Modal.Footer>
      </Modal>

      </>
      )
}

export default Editgift;