import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddGift = (props) => {
  const [GiftImage, setGiftImage] = useState('');
  const [GiftName, setGiftName] = useState('');
  const [GiftPrice, setGiftPrice] = useState('');
  const [GiftQuantity, setGiftQuantity] = useState('');
  const [GiftDetails, setGiftDetails] = useState('');
  const [errors, setErrors] = useState({});

  const handleGiftName = (e) => {
    setGiftName(e.target.value);
    setErrors({ ...errors, giftName: '' }); // Clear error when input changes
  };

  const handleGiftImage = (e) => {
    setGiftImage(e.target.value);
    setErrors({ ...errors, giftImage: '' }); // Clear error when input changes
  };

  const handleGiftPrice = (e) => {
    setGiftPrice(e.target.value);
    setErrors({ ...errors, giftPrice: '' }); // Clear error when input changes
  };

  const handleGiftQuantity = (e) => {
    setGiftQuantity(e.target.value);
    setErrors({ ...errors, giftQuantity: '' }); // Clear error when input changes
  };

  const handleGiftDetails = (e) => {
    setGiftDetails(e.target.value);
    setErrors({ ...errors, giftDetails: '' }); // Clear error when input changes
  };

  const handleAddGift = (event) => {
    event.preventDefault();
    const giftData = {
      giftName: GiftName,
      giftImageUrl: GiftImage,
      giftPrice: GiftPrice,
      giftDetails: GiftDetails,
      giftQuantity: GiftQuantity
    };

    const formErrors = {};
    let hasErrors = false;

    if (giftData.giftName.trim() === '') {
      formErrors.giftName = 'Gift name is required';
      hasErrors = true;
    }

    if (giftData.giftImageUrl.trim() === '') {
      formErrors.giftImage = 'Gift image URL is required';
      hasErrors = true;
    }

    if (giftData.giftPrice.trim() === '') {
      formErrors.giftPrice = 'Gift price is required';
      hasErrors = true;
    }

    if (giftData.giftQuantity.trim() === '') {
      formErrors.giftQuantity = 'Gift quantity is required';
      hasErrors = true;
    }

    if (giftData.giftDetails.trim() === '') {
      formErrors.giftDetails = 'Gift details are required';
      hasErrors = true;
    }

    setErrors(formErrors);

    if (!hasErrors) {
      const url = "http://localhost:43323/admin/addGift";
      axios.post(url, giftData)
        .then((result) => {
          if (result.data === "Gift added") {
            toast.success("Gift Added");
            props.onGiftAdded();
            setGiftImage('');
            setGiftName('');
            setGiftPrice('');
            setGiftQuantity('');
            setGiftDetails('');
          }
        })
        .catch((error) => {
          toast.warning("Gift Not Added");
        });
    }
  };

  return (
    <Form>
      <Form.Text className="text-muted">
        <h1>Add Gift</h1>
      </Form.Text>
      <label>Gift Name:</label>

      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter the gift name"
          data-testid="giftName"
          id="giftName"
          value={GiftName}
          onChange={handleGiftName}
        />
        {errors.giftName && <span style={{color:"red"}} className="error-message">{errors.giftName}</span>}
      </Form.Group>
      <label>Gift Price:</label>

      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter the gift price"
          data-testid="giftPrice"
          value={GiftPrice}
          onChange={handleGiftPrice}
        />
        {errors.giftPrice && <span style={{color:"red"}} className="error-message">{errors.giftPrice}</span>}
      </Form.Group>
      <Form.Group className="mb-3">
      <label>Gift Image Url:</label>

        <Form.Control
          type="text"
          placeholder="Enter the gift image URL"
          data-testid="imageUrl"
          value={GiftImage}
          onChange={handleGiftImage}
        />
        {errors.giftImage && <span style={{color:"red"}} className="error-message">{errors.giftImage}</span>}
      </Form.Group>
      <label>Gift Quantity:</label>

      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter the product quantity"
          id="enterGiftQuantity"
          value={GiftQuantity}
          onChange={handleGiftQuantity}
        />
        {errors.giftQuantity && <span style={{color:"red"}} className="error-message">{errors.giftQuantity}</span>}
      </Form.Group>
      <label>Gift Details:</label>

      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter the gift Details"
          id="enterGiftDetails"
          value={GiftDetails}
          onChange={handleGiftDetails}
        />
        {errors.giftDetails && <span style={{color:"red"}} className="error-message">{errors.giftDetails}</span>}
      </Form.Group>
      <Button type="submit" id="addGiftButton" onClick={handleAddGift}>
        ADD
      </Button>
    </Form>
  );
};

export default AddGift;