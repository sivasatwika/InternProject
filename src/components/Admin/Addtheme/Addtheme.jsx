import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Addtheme = (props) => {
  const [ThemeName, setThemeName] = useState("");
  const [ThemePrice, setThemePrice] = useState("");
  const [ThemeDescription, setThemeDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [themeData, setthemeData] = useState({
    themeName: ThemeName,
    themePrice: ThemePrice,
    themeDetails: ThemeDescription,
  });

  const resetForm = () => {
    setThemeName("");
    setThemePrice("");
    setThemeDescription("");
  };

  const handleThemeName = (e) => {
    setThemeName(e.target.value);
  };

  const handleThemePrice = (e) => {
    setThemePrice(e.target.value);
  };

  const handleThemeDescription = (e) => {
    setThemeDescription(e.target.value);
  };

  const validateForm = () => {
    const errors = {};

    // Name validation
    if (!ThemeName) {
      errors.ThemeName = "ThemeName is required";
    } else if (!/^[a-zA-Z\s]{1,100}$/.test(ThemeName)) {
      errors.ThemeName = "Theme Name must be a string";
    }

    // Price validation
    if (!ThemePrice) {
      errors.ThemePrice = "ThemePrice is required";
    } else if (!/^[1-9]\d*$/.test(ThemePrice)) {
      errors.ThemePrice = "Theme price must be a positive integer";
    }

    // Description validation
    if (!ThemeDescription) {
      errors.ThemeDescription = "ThemeDescription is required";
    } else if (!/^[A-Za-z0-9\s.,'-]*$/.test(ThemeDescription)) {
      errors.ThemeDescription = "Invalid Theme Description";
    }

    setErrors(errors);

    // Return true if there are no errors
    return Object.keys(errors).length === 0;
  };

  

  // Add Theme
  const handleAddTheme = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Check if all required fields are filled
      if (ThemeName !== "" && ThemeDescription !== "" && ThemePrice !== "") {
        // Check for duplicate entry
          const data = {
            themeName: ThemeName,
            themePrice: ThemePrice,
            themeDetails: ThemeDescription,
          };
          const url = "http://localhost:43323/admin/addTheme";
          axios
            .post(url, data)
            .then((result) => {
              console.log(result.data);
              if (result.data === "Theme Added") {
                props.onThemeAdded();
                toast.success("Theme Added");
                resetForm();
              }
            })
            .catch((error) => {
              toast.warning("Theme Not Added");
            });
        
      } else {
        toast.warning("Fill all the required fields");
      }
    }
  };

  return (
    <Form onSubmit={handleAddTheme}>
      <Form.Text className="text-muted">
        <h1>Add Theme</h1>
      </Form.Text>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter the theme name"
          id="enterThemeName"
          onChange={handleThemeName}
          value={ThemeName}
        />
        {errors.ThemeName && <span>{errors.ThemeName}</span>}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          type="number"
          placeholder="Enter the theme price"
          id="enterThemePrice"
          onChange={handleThemePrice}
          value={ThemePrice}
        />
        {errors.ThemePrice && <span>{errors.ThemePrice}</span>}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter the theme description"
          id="enterThemeDescription"
          onChange={handleThemeDescription}
          value={ThemeDescription}
        />
        {errors.ThemeDescription && <span>{errors.ThemeDescription}</span>}
      </Form.Group>
      <Button variant="primary" type="submit" id="add">
        Add Theme
      </Button>
    </Form>
  );
};

export default Addtheme;
