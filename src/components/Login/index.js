import './Login.css';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RequestForm from "../Utils/RequestForm";
import { useAuth } from "../ComponentsCss/Authentication/authentication";


export default function Login() {
  const [formType, setFormType] = useState("signIn");
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (formData, setIsLoading, setErrorMessage) => {
    setIsLoading(true);
    setErrorMessage('');

    if (formType === "signIn") {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/login`,
          {
            email: formData.email,
            password: formData.password
          },
          {
            withCredentials: true
          }
        );

        if (response.data.success) {
          const success = await login(response.data.user);
          if (success) {
            navigate('/dashboard');
          } else {
            setErrorMessage('Failed to set user session. Please try again.');
          }
        } else {
          setErrorMessage(response.data.message || 'Invalid credentials. Please try again.');
        }
      } catch (error) {
        console.error('Sign-in error:', error);
        setErrorMessage(error.response?.data?.message || 'An error occurred during sign-in. Please try again.');
      }
    } else {
      // Handle request submission
      alert('Request submitted successfully!');
    }

    setIsLoading(false);
  };

  const handleCancel = () => {
    setFormType("signIn");
  };

  const signInFields = [
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Password', type: 'password' },
  ];

  const requestFields = [
    { name: 'dateRange', label: 'Date Range', type: 'date' },
    { name: 'selectedDetail', label: 'Detail', type: 'select', options: ['1', '2', '3'] },
    { name: 'title', label: 'Title', type: 'text' },
    { name: 'reason', label: 'Reason', type: 'textarea' },
  ];

  return (
    <div className="login-container">

      <div className="form-type-buttons">
        <button onClick={() => setFormType("signIn")}>Sign In</button>
        <button onClick={() => setFormType("request")}>Make Request</button>
      </div>

      {formType === "signIn" && (
        <RequestForm 
          title="Sign In"
          formFields={signInFields}
          onSubmit={handleSubmit}
          cancelBtn={handleCancel}
          isSignIn={true}
        />
      )}

      {formType === "request" && (
        <RequestForm 
          title="Make a Request"
          formFields={requestFields}
          onSubmit={handleSubmit}
          cancelBtn={handleCancel}
          isSignIn={false}
        />
      )}
    </div>
  );
}








