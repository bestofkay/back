/* eslint-disable react/jsx-props-no-multi-spaces */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable no-trailing-spaces */
/* eslint-disable arrow-parens */
/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable indent */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { FaSpinner } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import './sign.css';

async function loginUser(credentials) {
	return fetch('https://rapidsmm.herokuapp.com/api/auth/login', {
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/json'
	  },
	  body: JSON.stringify(credentials)
	})
	  .then(data => data.json())
   }
   
const Sign = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
	setIsLoading(true);
    const response = await loginUser({
      email,
      password
    });
    if ('accessToken' in response) {
      swal('Success', 'Login successful', 'success', {
        buttons: false,
        timer: 2000,
      })
      .then(() => {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('username', JSON.stringify(response.username));
		localStorage.setItem('email', JSON.stringify(response.email));
		localStorage.setItem('user_id', JSON.stringify(response._id));
        navigate('/');
      });
    } else {
      swal('Failed', response.error, 'error', {
		buttons: false,
        timer: 5000,
	  });
	  setIsLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <form className="login" noValidate onSubmit={handleSubmit}>
            <div className="login__field">
              <i className="login__icon fas fa-user" />
              <input
                className="login__input"
                type="text"
                name="Username"
				placeholder="Email"
                value={email}
                onChange={
                                    (e) => setemail(e.target.value)
                                }
              />
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock" />
              <input className="login__input" type="password" placeholder="Password" name="Password" value={password} onChange={(e) => setpassword(e.target.value)} />
            </div>
			
            <button className="button login__submit" type="submit" disabled={isLoading}>
              <span className="button__text">  {isLoading ? <FaSpinner /> : 'Log In Now'}</span>
              <i className="button__icon fas fa-chevron-right" />
            </button>
          </form>
        
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4" />
          <span className="screen__background__shape screen__background__shape3" />
          <span className="screen__background__shape screen__background__shape2" />
          <span className="screen__background__shape screen__background__shape1" />
        </div>
      </div>
    </div>

  );
};
export default Sign;
