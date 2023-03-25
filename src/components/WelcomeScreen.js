import React, { useState } from 'react';
import './WelcomeScreenStyle.css';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../services/firebase';
import { createUserDocument } from '../services/userService';


const WelcomeScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      // create new user account with Firebase Authentication
      const authInstance = getAuth();
      const userCredential = await createUserWithEmailAndPassword(authInstance, email, password);

      // add user information to the database
      await createUserDocument(userCredential.user.uid, { firstName, lastName });

      console.log(userCredential);
      alert('User created successfully');
    } catch (error) {
      console.error(error);
      if (error.code === 'auth/weak-password') {
        alert('Password should be at least 6 characters long');
      } else if (error.code === 'auth/email-already-in-use') {
        alert('The email address is already in use');
      } else if (error.code === 'auth/invalid-email') {
        alert('The email address is invalid');
      } else {
        alert('Error creating user');
      }
    }
  };

  const handleLogin = async () => {
    try {
      const authInstance = getAuth();
      const userCredential = await signInWithEmailAndPassword(authInstance, email, password);
      console.log(userCredential);
      alert('User logged in successfully');
      navigate('/home'); // navigate to HomePage component after successful login
    } catch (error) {
      console.error(error);
      alert('Error logging in');
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Google sign-in successful:', result);
      await createUserDocument(result.user.uid, {
        firstName: result.additionalUserInfo.profile.given_name,
        lastName: result.additionalUserInfo.profile.family_name
      });
      navigate('/home'); // navigate to HomePage component after successful login
    } catch (error) {
      console.error('Google sign-in error:', error.message);
      alert('Error logging in with Google');
    }
  };

  return (
    <div className="welcome-container">
      <h1 className="app-title">JobMatch</h1>
      <p className="app-tagline">Find your dream job and create tailored cover letters</p>
      <div className="form-container">
        <h2>Create an Account</h2>
        <div className="form-group">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <button className="btn btn-primary btn-block" onClick={handleSignup}>
            Sign Up
          </button>
        </div>
        <div className="form-group">
          <p className="forgot-password text-right">
            Already registered? <a href="/login">Log in here</a>
          </p>
        </div>
    </div>
  </div>
  );
};
export default WelcomeScreen;