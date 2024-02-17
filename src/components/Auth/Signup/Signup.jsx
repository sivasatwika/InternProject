import React, { useState } from 'react';
import './Signup.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Button ,Row ,Col ,Form,InputGroup, FormControl} from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPhone, FaEye, FaEyeSlash } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';

const Signup = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [errors, setErrors] = useState({});
  const [userRole, setUserRole] = useState("User");
  const [passwordError, setPasswordError] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Function to toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    // Name validation
    if (!userName) {
      errors.userName = '*Name is required';
    }
    // Email validation
    if (!email) {
      errors.email = '*Email is required';
    } else if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/.test(email)) {
      errors.email = '*Invalid email address';
    }
    // Password validation
    if (!password) {
      errors.password = '*Password is required';
    } else if (!/^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/.test(password)) {
      errors.password = 'Invalid Password. Must contain at least one number, one uppercase letter, one lowercase letter, one special character (!@#$%^&*), and be at least 8 characters long';
    } else {
      setPasswordError(''); // Clear the password error message
    }

    // Confirm password validation
    if (!confirmPassword) {
      errors.confirmPassword = '*Please confirm your password';
    } else if (confirmPassword !== password) {
      errors.confirmPassword = '*Passwords do not match';
    }
    // Mobile number validation
    if (!mobileNumber) {
      errors.mobileNumber = '*Mobile number is required';
    } else if (!/^\d{10}$/.test(mobileNumber)) {
      errors.mobileNumber = '*Enter valid number should contain 10 digits only';
    }
    setErrors(errors);
    // Return true if there are no errors
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const data = {
        email: email,
        password: password,
        username: userName,
        mobilenumber: mobileNumber,
        userrole: userRole,
      }

      const url = "https://localhost:43323/user/addUser";
      axios.post(url, data).then((result) => {
        console.log(result.data);
        if (result.data === "User Added" || result.data === "user exists" || result.data === 'Admin Added') {
          navigate("/");
        }
      }).catch((error) => {
        toast.warning("Enter all the fields");
      })
    } else {
      // Form is not valid, handle errors
      toast.warning('Form is not valid');
    }
  };

  return (
    <div className="Signup">
      <ToastContainer />
      <Row className="justify-content-center align-items-center" style={{ height: '100%', width: '100%' }}>
        <Col xs={12} md={8} lg={4} >
          <div className="SignupForm" >
            <Form onSubmit={handleSubmit}>
              <Form.Group className="d-grid justify-content-center mb-3">
                <Form.Text><h4 style={{ }}>Register</h4></Form.Text>
              </Form.Group>
              <label>User/Admin:</label>
              <Form.Group className="mb-3" >
                <Form.Select id='admin/user' value={userRole} onChange={(e) => setUserRole(e.target.value)}>
                  <option id='Admin' value="Admin">Admin</option>
                  <option id='User' value="User">User</option>
                </Form.Select>
                {errors.userRole && <span style={{ color: 'red' }}>{errors.userRole}</span>}
              </Form.Group>
              <label>Email:</label>
              <Form.Group className="mb-3">
                <InputGroup>
                  <InputGroup.Text> <FiMail /> </InputGroup.Text>
                  <Form.Control type="text" id="email" data-testid="email" placeholder=" Enter your Email" onChange={(e) => setEmail(e.target.value)} required />
                </InputGroup>
                {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
              </Form.Group>
              <label>Enter the name:</label>
              <Form.Group className="mb-3" >
                <Form.Control type="text" id="username" data-testid="username" placeholder=" Enter your Username" onChange={(e) => setUserName(e.target.value)} required />
                {errors.userName && <span style={{ color: 'red' }}>{errors.userName}</span>}
              </Form.Group>
              <label>Mobile Number:</label>
              <Form.Group className="mb-3" >
                <InputGroup className="mb-3">
                  <InputGroup.Text><FaPhone /></InputGroup.Text>
                  <Form.Control type="text" id="mobileNumber" data-testid="mobileNumber" placeholder=" Enter your Mobile Number" onChange={(e) => setMobileNumber(e.target.value)} required />
                </InputGroup>
                {errors.mobileNumber && <span style={{ color: 'red' }}>{errors.mobileNumber}</span>}
              </Form.Group>
              <label>Password:</label>
              <Form.Group className="mb-3">
                <InputGroup>
                  <FormControl
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    data-testid="password"
                    placeholder="Enter your Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <InputGroup.Text
                    onClick={togglePasswordVisibility}
                    style={{ cursor: 'pointer' }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </InputGroup.Text>
                </InputGroup>
                {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
              </Form.Group>
              <label>Confirm Password:</label>
              <Form.Group className="mb-3">
                <InputGroup>
                  <FormControl
                    type={showConfirmPassword ? 'text' : 'password'} id="confirmPassword" data-testid="confirmPassword"
                    placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} required />
                  <InputGroup.Text
                    onClick={toggleConfirmPasswordVisibility}
                    style={{ cursor: 'pointer' }}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </InputGroup.Text>
                </InputGroup>
                {errors.confirmPassword && <span style={{ color: 'red' }}>{errors.confirmPassword}</span>}
              </Form.Group>

              {passwordError && <span style={{ color: 'red' }}>{passwordError}</span>} {/* Display password error message */}

              <div className="d-grid ">
                <Button variant="success" type="submit" data-testid="submitButton" onClick={handleSubmit} id="submitButton" >Submit</Button>
              </div>

              <Form.Group className="d-grid justify-content-center mb-3 py-3">
                <Form.Text>
                  Already a user? <a href='/' id='signinLink' data-testid="signinLink">Login</a>
                </Form.Text>
              </Form.Group>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Signup;