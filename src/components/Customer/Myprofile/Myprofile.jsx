import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { BsPersonCircle } from 'react-icons/bs';
import axios from 'axios';
import NavigationMenu from '../Navbar/Navbar';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Myprofile.css'; 
const MyProfile = () => {
  const [editMobile, setEditmobile] = useState(true);
  const [editusername, setEditUsername] = useState(true);
  const [pass, setpass] = useState('');
  const [newPassword, setNewpassword] = useState('');
  const [confirmPassword, handleConfirmPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [userName, setUsername] = useState('');
  const email = localStorage.getItem('email');
  useEffect(() => {
    axios
      .get('http://localhost:43323/user/getuserbyemail', {
        params: {
          email: email
        }
      })
      .then((result) => {
        const data = result.data;
        setMobileNumber(data.mobileNumber);
        setUsername(data.username);
      });
  }, []);

  const handleUsernameUpdate = (e) => {
    const data = { email: email, userName: userName };

    axios
      .put('http://localhost:43323/user/updateusername', data)
      .then((result) => {
        console.log(result.data);
        if (result.data === 'Username Updated') {
          setEditUsername(true)
          toast.success('Username Updated');
        }
      })
      .catch((error) => {
        toast.warning('Error');
      });
  };

  const handleMobileNumberUpdate = (e) => {
    e.preventDefault();
    const data = { email: email, mobileNumber: mobileNumber };
    axios
      .put('http://localhost:43323/user/updatemobilenumber', data)
      .then((result) => {
        console.log(result.data);
        if (result.data === 'Mobile Number Updated') {
          setEditmobile(true);
          toast.success('Mobile Number Updated');
        }
      })
      .catch((error) => {
        toast.warning('Error');
      });
  };

  const updatePassword = () => {
    const data = { email: email, password: newPassword };
    axios
      .put('http://localhost:43323/user/updatepassword', data)
      .then((result) => {
        console.log(result.data);
        if (result.data === 'Password Updated') {
          toast.success('Password Updated');
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handlePasswordUpdate = () => {
    const data = { email: email, password: pass };
    axios
      .post('http://localhost:43323/user/login', data)
      .then((result) => {
        if (result.data === true) {
          if (newPassword === confirmPassword) {
            updatePassword();
          } else {
            toast.warning('Password does not match');
          }
        } else {
          toast.warning('Wrong Password');
        }
      })
      .catch((error) => {
        toast.warning('Error')
      });
  };

  return (
    <>
    <NavigationMenu/>
    <ToastContainer/>
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={8} lg={6}>
          <Card className="profile-card">
            <Card.Body>
              <div className="profile-header">
                <BsPersonCircle size={80} className="profile-icon" />
                <div>
                  <h1 className="profile-greeting">Hello, {userName}!</h1>
                  <p>{email}</p>
                </div>
              </div>
              <hr />
              <Form>
                <Form.Text>
                  <h4>Change UserName</h4>
                </Form.Text>
                <Form.Group>
                  <Form.Label>User Name:</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={userName}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={editusername}
                  />
                </Form.Group>

                <div className="mb-3"></div>
                {editusername && (
                  <Button variant="primary" onClick={() => setEditUsername(false)}>
                    Edit
                  </Button>
                )}

                {!editusername && (
                  <div className="mb-3">
                    <Button variant="secondary" onClick={handleUsernameUpdate} style={{ marginRight: '10px' }}>
                      Save
                    </Button>
                    <Button variant="secondary" onClick={() => setEditUsername(true)}>
                      Cancel
                    </Button>
                  </div>
                )}
              </Form>
              <hr />
              <Form onSubmit={handleMobileNumberUpdate}>
                <Form.Text>
                  <h4>Change Mobile Number</h4>
                </Form.Text>
                <Form.Group controlId="formMobileNumber">
                  <Form.Label>Mobile Number:</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    disabled={editMobile}
                  />
                </Form.Group>

                <div className="mb-3"></div>
                {editMobile && (
                  <Button variant="primary" onClick={() => setEditmobile(false)}>
                    Edit
                  </Button>
                )}

                {!editMobile && (
                  <div className="mb-3">
                    <Button variant="secondary" type="submit" style={{ marginRight: '10px' }}>
                      Save
                    </Button>
                    <Button variant="secondary" type="reset" onClick={() => setEditmobile(true)}>
                      Cancel
                    </Button>
                  </div>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={8} lg={6}>
          <Card className="profile-card">
            <Card.Body>
              <Form>
                <Form.Text>
                  <h4>Change Password</h4>
                </Form.Text>
                <Form.Group controlId="formOldPassword">
                  <Form.Label>Old Password:</Form.Label>
                  <Form.Control type="password" placeholder="Enter old password" onChange={(e) => setpass(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formNewPassword">
                  <Form.Label>New Password:</Form.Label>
                  <Form.Control type="password" placeholder="Enter new password" onChange={(e) => setNewpassword(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formConfirmPassword">
                  <Form.Label>Confirm Password:</Form.Label>
                  <Form.Control type="password" placeholder="Confirm new password" onChange={(e) => handleConfirmPassword(e.target.value)} />
                  {
                    // newPassword !== confirmPassword ? <p>Password does not match</p> : <p></p>
                  }
                </Form.Group>

                <div className="mb-3"></div>

                {pass !== '' && newPassword !== '' && confirmPassword !== '' && (
                  <Button type='reset' variant="primary" onClick={() => handlePasswordUpdate()}>
                    Update Password
                  </Button>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default MyProfile;
