import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import NavigationMenu from '../Navbar/Navbar';
import { Button, Form, DropdownButton, Dropdown } from 'react-bootstrap';
import "./Placeorder.css";
import { toast } from 'react-toastify';

function Placeorder() {
  const location = useLocation();
  const gift = location.state;

  const [Name, setName] = useState('');
  const [orderDate, setDate] = useState('');
  const [Address, setAddress] = useState('');
  const [PhoneNo, setPhone] = useState('');
  const [EmailId, setEmailId] = useState(localStorage.getItem("email") || '');
  const [Description, setDescription] = useState('');
  const [Quantity, setOrderQuantity] = useState('');
  const [themePrice, setThemePrice] = useState(0);
  const Price = (gift.giftPrice + themePrice) * Quantity;
  const giftModel = (gift);
  const [themeModel, setThemeModel] = useState([]);
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [themes, setThemes] = useState([]);
  const [selectedThemesString, setSelectedThemesString] = useState("");

  const [errors, setErrors] = useState({
    Name: '',
    orderDate: '',
    Address: '',
    PhoneNo: '',
    EmailId: '',
    Description: '',
    Quantity: '',
    selectedThemes: '',
  });

  useEffect(() => {
    //Get themes Api
    axios.get('http://localhost:43323/admin/getTheme')
      .then(response => {
        setThemes(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleThemeSelect = (event) => {
    const { value, checked } = event.target;
    const selectedTheme = themes.find((theme) => theme.themeName === value);
    let currentPrice = themePrice;
    if (checked) {
      setThemeModel((prevThemeModel) => [...prevThemeModel, selectedTheme]);
      setThemePrice(currentPrice + selectedTheme.themePrice);
      setSelectedThemes((prevSelectedThemes) => [...prevSelectedThemes, value]);
    } else {
      setSelectedThemes((prevSelectedThemes) =>
        prevSelectedThemes.filter((theme) => theme !== value));
      setThemeModel((prevThemeModel) =>
        prevThemeModel.filter((theme) => theme.themeName !== selectedTheme.themeName));
      setThemePrice(currentPrice - selectedTheme.themePrice);
    }
  };

  useEffect(() => {
    // Convert the selectedThemes array to a comma-separated string
    const themesString = selectedThemes.join(", ");
    setSelectedThemesString(themesString);
  }, [selectedThemes]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset errors before validation
    setErrors({
      Name: '',
      orderDate: '',
      Address: '',
      PhoneNo: '',
      EmailId: '',
      Description: '',
      Quantity: '',
      selectedThemes: '',
    });

    // Validation checks
    let hasErrors = false;
    if (!Name) {
      setErrors((prevErrors) => ({ ...prevErrors, Name: 'Name is required' }));
      hasErrors = true;
    }
  
    if (!orderDate) {
      setErrors((prevErrors) => ({ ...prevErrors, orderDate: 'Ordered Date is required' }));
      hasErrors = true;
    }
  
    if (!Address) {
      setErrors((prevErrors) => ({ ...prevErrors, Address: 'Address is required' }));
      hasErrors = true;
    }
    const addressRegex = /^[a-zA-Z0-9\s.,'-]+$/;
    if (!Address || Address.trim() === '') {
      setErrors((prevErrors) => ({ ...prevErrors, Address: 'Address is required' }));
      hasErrors = true;
    } else if (!addressRegex.test(Address)) {
      setErrors((prevErrors) => ({ ...prevErrors, Address: 'Invalid characters in the address only provide ,./' }));
      hasErrors = true;
    }
    if (!PhoneNo) {
      setErrors((prevErrors) => ({ ...prevErrors, PhoneNo: 'Phone Number is required' }));
      hasErrors = true;
    } else if (!/^[0-9]{10}$/g.test(PhoneNo)) {
      setErrors((prevErrors) => ({ ...prevErrors, PhoneNo: 'Invalid Phone Number. Please enter a 10-digit number' }));
      hasErrors = true;
    }
  
    if (!EmailId) {
      setErrors((prevErrors) => ({ ...prevErrors, EmailId: 'Email Id is required' }));
      hasErrors = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(EmailId)) {
      setErrors((prevErrors) => ({ ...prevErrors, EmailId: 'Invalid Email Address' }));
      hasErrors = true;
    }
  
    if (!Quantity || isNaN(Quantity) || Quantity <= 0) {
      setErrors((prevErrors) => ({ ...prevErrors, Quantity: 'Quantity must be a positive number and not equal to zero' }));
      hasErrors = true;
    }
    if (selectedThemes.length === 0) {
      setErrors((prevErrors) => ({ ...prevErrors, selectedThemes: 'Select at least one theme' }));
      hasErrors = true;
    }
  
    if (hasErrors) {
      return;
    }

    const Orderdata = {
      orderName: Name,
      orderDate: orderDate,
      orderAddress: Address,
      orderPhone: PhoneNo,
      orderEmail: EmailId,
      orderDescription: Description,
      orderPrice: Price,
      giftModel: giftModel,
      ThemeModel: themeModel,
      orderQuantity: Quantity,
    }

    console.log(Orderdata)
    axios.post('http://localhost:43323/user/addOrdersCart', Orderdata).then((result) => {
      console.log(result.data);
      if (result.data === "Order added") {
        navigate('/Cart');
        toast.success("Order Placed")
      }
      else if(result.data==="Insufficient gift quantity"){
        toast.warning("out of stock")
      }
    }).catch((error) => {
      console.log("All fields are required");
    })
  }

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <div>
        <NavigationMenu />
      </div>
      <Form className='placeorderform'>
        <div>
          <label>Username:</label>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Enter your Name"
              id="enterName"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Form.Text className="text-danger">{errors.Name}</Form.Text>
          </Form.Group>
          <label>Ordered Date:</label>
          <Form.Group className="mb-3">
            <Form.Control
              type="date"
              placeholder="Enter the order date"
              id="enterDate"
              value={orderDate}
              onChange={(e) => setDate(e.target.value)}
              required
              min={getTodayDate()}
              max={getTodayDate()}
            />
            <Form.Text className="text-danger">{errors.orderDate}</Form.Text>
          </Form.Group>
          <label>Address:</label>
          <Form.Group className="mb-3" >
            <Form.Control
              type="text"
              placeholder="Enter Your Address"
              id="enterAddress"
              value={Address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <Form.Text className="text-danger">{errors.Address}</Form.Text>
          </Form.Group>
          <label>Phone Number:</label>
          <Form.Group className="mb-3" >
            <Form.Control
              type="text"
              placeholder="Enter Your Phone Number"
              id="enterPhoneNo"
              value={PhoneNo}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <Form.Text className="text-danger">{errors.PhoneNo}</Form.Text>
          </Form.Group>
          <label>Email Id:</label>
          <Form.Group className="mb-3" >
            <Form.Control
              type="email"
              placeholder="Enter Your Email Id"
              id="enterEmailId"
              value={EmailId}
              onChange={(e) => setEmailId(e.target.value)}
              disabled
            />
            <Form.Text className="text-danger">{errors.EmailId}</Form.Text>
          </Form.Group>
        </div>
        <div>
          <label>Gift Price:</label>
          <Form.Group className="mb-3" >
            <Form.Control
              type="text"
              value={gift.giftPrice}
              id="orderPrice"
              disabled
            />
          </Form.Group>
          <label>Gift Model:</label>
          <Form.Group className="mb-3" >
            <Form.Control
              type="text"
              value={giftModel.giftName}
              id="giftModel"
              disabled
            />
          </Form.Group>

          <label>Ordered Description:</label>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Order description"
              id="enterDescription"
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <Form.Text className="text-danger">{errors.Description}</Form.Text>
          </Form.Group>

          <label>Quantity:</label>
          <Form.Group className="mb-3" >
            <Form.Control
              type="number"
              placeholder="Enter Quantity"
              id="quantity"
              value={Quantity}
              onChange={(e) => { setOrderQuantity(e.target.value) }}
              required
            />
            <Form.Text className="text-danger">{errors.Quantity}</Form.Text>
          </Form.Group>

          <Dropdown className="d-inline" align="end">
            <DropdownButton variant='outline-secondary' id='selectThemeModel' title={`Selected Themes: ${selectedThemesString}`}>
              {themes.map((theme) => (
                <Form.Check
                  key={theme.themeId}
                  type="checkbox"
                  id={theme.themeId}
                  label={theme.themeName + " - " + theme.themePrice}
                  value={theme.themeName}
                  checked={selectedThemes.includes(theme.themeName)}
                  onChange={handleThemeSelect}
                />
              ))}
            </DropdownButton>
          </Dropdown>
          <Form.Text className="text-danger">{errors.selectedThemes}</Form.Text>

          <Button id='placeOrder' onClick={handleSubmit}>Place Order</Button>
        </div>
      </Form>
    </div>
  );
}

export default Placeorder;