import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Editthemes = (props) => {
  const theme = props.themeData;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [EditedThemeName, setEditedThemeName] = useState(theme.themeName);
  const [EditedThemePrice, setEditedThemePrice] = useState(theme.themePrice);
  const [EditedThemedescription, setEditedThemedescription] = useState(theme.themeDetails);

  const [nameError, setNameError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [detailsError, setDetailsError] = useState("");

  const handleEdit = () => {
  
    setNameError("");
    setPriceError("");
    setDetailsError("");
  
    
  
    let isValid = true;
  
    if (!EditedThemeName.trim()) {
      setNameError("Theme name is required");
      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(EditedThemeName)) {
      setNameError("Invalid theme name. Only alphanumeric characters and spaces are allowed.");
      isValid = false;
    }
  
    if (!EditedThemePrice) {
      setPriceError("Theme price is required");
      isValid = false;
    } 
  
    if (!EditedThemedescription.trim()) {
      setDetailsError("Theme description is required");
      isValid = false;
    }
  
    if (!isValid) {
      return; // Do not proceed with API call if any validation fails
    }
  
    // Proceed with updating the theme if all validations pass
    const data = {
      themename: EditedThemeName,
      themeprice: EditedThemePrice,
      themedetails: EditedThemedescription,
    };
  
    axios.put('http://localhost:43323/admin/editTheme/' + theme.themeId, data)
      .then(response => {
        if (response.data === "Theme edited") {
          toast.success("Theme Edited");
          handleClose();
          props.onThemeEdited();
        }
      })
      .catch(error => {
        toast.warning("Theme Not Edited");
      });
  };
  

  return (
    <>
      <Button variant="" onClick={handleShow}>
        <FaRegEdit />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Text className="text-muted">
              <h1>Edit Theme</h1>
            </Form.Text>
            <label>Theme Name:</label>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="Enter the theme name" id="enterThemeName" defaultValue={theme.themeName}
                onChange={(e) => setEditedThemeName(e.target.value)} />
              {nameError && <Form.Text className="text-danger">{nameError}</Form.Text>}
            </Form.Group>
            <label>Theme Price:</label>
            <Form.Group className="mb-3">
              <Form.Control type="number" placeholder="Enter the theme price" id="enterThemePrice" defaultValue={theme.themePrice}
                onChange={(e) => setEditedThemePrice(e.target.value)} />
              {priceError && <Form.Text className="text-danger">{priceError}</Form.Text>}
            </Form.Group>
            <label>Theme Description:</label>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="Enter the theme description" id="enterThemeDescription" defaultValue={theme.themeDetails}
                onChange={(e) => setEditedThemedescription(e.target.value)} />
              {detailsError && <Form.Text className="text-danger">{detailsError}</Form.Text>}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleEdit} id="update">
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Editthemes;
