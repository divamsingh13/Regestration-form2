import React, { useState, useEffect } from 'react';
import './Registration2.css'; // Ensure the styles are correctly imported
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios'; // Import axios for HTTP requests

function App() {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    phone: '',
    birthDate: '',
    city: '',
    gender: '',
    password: '',
    retypePassword: '',
    comments: '',
    agreeTerms: false,
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [notification, setNotification] = useState(null);

  // Add particles and 3D cubes animation
  useEffect(() => {
    const backgroundAnimation = document.querySelector('.background-animation');
    if (backgroundAnimation) {
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${15 + Math.random() * 10}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        backgroundAnimation.appendChild(particle);
      }

      for (let i = 0; i < 5; i++) {
        const cube = document.createElement('div');
        cube.classList.add('cube');
        cube.style.left = `${Math.random() * 90}%`;
        cube.style.top = `${Math.random() * 90}%`;
        cube.style.animationDuration = `${20 + Math.random() * 10}s`;
        cube.style.animationDelay = `${Math.random() * 5}s`;

        for (let j = 0; j < 6; j++) {
          const face = document.createElement('div');
          face.classList.add('cube-face');
          cube.appendChild(face);
        }
        backgroundAnimation.appendChild(cube);
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    setFormValues((prev) => ({
      ...prev,
      agreeTerms: e.target.checked,
    }));
  };

  const handlePasswordToggle = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formValues.password !== formValues.retypePassword) {
      showNotification('Passwords do not match!', 'error');
      return;
    }

    showNotification('Processing registration...', 'info');
    
    try {
      // Send form data to the backend
      const response = await axios.post('http://localhost:5000/api/form', formValues);

      if (response.status === 201) {
        showNotification('Registration successful!', 'success');
        setFormValues({
          name: '',
          email: '',
          phone: '',
          birthDate: '',
          city: '',
          gender: '',
          password: '',
          retypePassword: '',
          comments: '',
          agreeTerms: false,
        });
      }
    } catch (error) {
      console.error('Error during registration:', error);
      showNotification('Error during registration. Please try again!', 'error');
    }
    
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="App">
      <div className="background-animation"></div>
      <div className="registration-container">
        <h1>
          <i className="fa fa-user"></i> Registration Form
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <i className="fa fa-user"></i>
            <input
              type="text"
              id="name"
              name="name"
              placeholder=" "
              value={formValues.name}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="name">Name</label>
          </div>
          <div className="form-group">
            <i className="fa fa-envelope"></i>
            <input
              type="email"
              id="email"
              name="email"
              placeholder=" "
              value={formValues.email}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="form-group">
            <i className="fa fa-phone"></i>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder=" "
              value={formValues.phone}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="phone">Phone Number</label>
          </div>
          <div className="form-group">
            <i className="fa fa-calendar"></i>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              placeholder=" "
              value={formValues.birthDate}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="birthDate">Birth Date</label>
          </div>
          <div className="form-group">
            <i className="fa fa-building"></i>
            <input
              type="text"
              id="city"
              name="city"
              placeholder=" "
              value={formValues.city}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="city">City</label>
          </div>
          <div className="form-group">
            <i className="fa fa-venus-mars"></i>
            <select
              id="gender"
              name="gender"
              value={formValues.gender}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>
          <div className="form-group">
            <i className="fa fa-lock"></i>
            <input
              type={passwordVisible ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder=" "
              value={formValues.password}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="password">Password</label>
          </div>
          <div className="form-group">
            <i className="fa fa-lock"></i>
            <input
              type={passwordVisible ? 'text' : 'password'}
              id="retypePassword"
              name="retypePassword"
              placeholder=" "
              value={formValues.retypePassword}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="retypePassword">Re-type Password</label>
          </div>
          <div className="form-group">
            <i className="fa fa-comment"></i>
            <textarea
              id="comments"
              name="comments"
              placeholder=" "
              rows="3"
              value={formValues.comments}
              onChange={handleInputChange}
            ></textarea>
            <label htmlFor="comments">Additional Comments</label>
          </div>
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="agreeTerms"
              name="agreeTerms"
              checked={formValues.agreeTerms}
              onChange={handleCheckboxChange}
              required
            />
            <label htmlFor="agreeTerms">
              I agree with the <a href="#">terms and conditions</a>
            </label>
          </div>
          <button
            type="submit"
            onMouseEnter={(e) =>
              (e.target.innerHTML = '<i class="fa fa-rocket"></i> Let\'s Go!')
            }
            onMouseLeave={(e) =>
              (e.target.innerHTML = '<i className="fa fa-user-plus"></i> Register')
            }
          >
            <i className="fa fa-user-plus"></i> Register
          </button>
        </form>
        {notification && (
          <div className={`notification ${notification.type}`}>
            {notification.message}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
