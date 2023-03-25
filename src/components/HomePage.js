import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [school, setSchool] = useState('');
  const [city, setCity] = useState('');
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState(null);

  const handleUploadResume = (event) => {
    const file = event.target.files[0];
    setResume(file);
  };

  const handleUploadCoverLetter = (event) => {
    const file = event.target.files[0];
    setCoverLetter(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      firstName,
      lastName,
      age,
      school,
      city,
      resume,
      coverLetter,
    };
    console.log(userData);
    navigate('/dashboard');
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            value={age}
            onChange={(event) => setAge(event.target.value)}
          />
        </label>
        <label>
          School:
          <input
            type="text"
            value={school}
            onChange={(event) => setSchool(event.target.value)}
          />
        </label>
        <label>
          City:
          <input
            type="text"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
        </label>
        <label>
          Upload Resume:
          <input type="file" onChange={handleUploadResume} />
        </label>
        <label>
          Upload Cover Letter:
          <input type="file" onChange={handleUploadCoverLetter} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default HomePage;
