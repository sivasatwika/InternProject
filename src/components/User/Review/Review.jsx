import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';
import { useLocation,useNavigate } from 'react-router-dom'; // Remove useHistory
import { FcApproval } from "react-icons/fc";
import NavigationMenu from '../../Customer/Navbar/Navbar';
import './Review.css';

const Review = () => {
  const [name, setName] = useState('');
  const [comments, setComment] = useState('');
  const [validationError, setValidationError] = useState(false);
  const location = useLocation();
  const orderId = location.state;
  console.log(orderId);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleCommentChange = (event) => {
    const commentValue = event.target.value;
    // Regular expression to match only alphabets and numbers
    const alphanumericRegex = /^[A-Za-z][A-Za-z0-9 ]*$/;
    if (alphanumericRegex.test(commentValue)) {
      setComment(commentValue);
      setValidationError(false);
    } else {
      setValidationError(true);
    }
  };

  const navigate = useNavigate(); // Use useNavigate for redirection

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !comments) {
      setValidationError(true);
    } else {
      setValidationError(false);
      alert("Review Submitted Successfully");
      const data = {
        name: name,
        comments: comments,
        orderId: orderId
      }
      const url = "http://localhost:43323/insertreview";
      axios.post(url, data).then((result) => {
        console.log(result.data);
        if (result.data === "inserted sucessfully") {
          navigate("/homepage"); 
        }
      }).catch((error) => {
        console.log(error);
      })

      // Reset the form
      setName('');
      setComment('');
    }
  };

  return (
    <div>
      <NavigationMenu />
      <div className="ReviewForm">
        <FcApproval className="custom-icon" />
        <Form onSubmit={handleSubmit} >
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter"
              id="name"
              value={name}
              onChange={handleNameChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              id="comment"
              data-testid="comments"
              value={comments}
              onChange={handleCommentChange}
              required
            />
            {validationError && (
              <Alert variant="danger" className="mt-2">
                Please enter comment before submitting the review.
              </Alert>
            )}
          </Form.Group>
          <Button type="submit">Submit Review</Button>
        </Form>
      </div>
    </div>
  );
};

export default Review;