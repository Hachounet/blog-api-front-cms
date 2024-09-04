import { useState } from 'react';
import MailInput from './MailInput';
import PasswordInput from './PasswordInput';
import ButtonElevatedBase from './ButtonElevatedBase';
import PropTypes from 'prop-types';
import { useAuthContext } from '../AuthContext';

export default function Login({ postURL }) {
  const { setLogged } = useAuthContext();

  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Empêcher la soumission par défaut du formulaire

    const formData = new FormData(event.target);
    const formValues = Object.fromEntries(formData.entries());

    fetch(postURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formValues),
    })
      .then((response) => {
        return response
          .json()
          .then((data) => ({ data, status: response.status }));
      })
      .then(({ data, status }) => {
        if (status === 400) {
          setErrors(data.errors);
          setSuccessMessage('');
        } else {
          setSuccessMessage(data.message);
          setErrors([]);
          localStorage.setItem('accessToken', data.accessToken);
          setLogged(true);

          window.location.href = '/';
        }
      })
      // eslint-disable-next-line no-unused-vars
      .catch((err) => {
        setErrors([{ msg: 'Something went wrong. Please try again later.' }]);
      });
  };

  return (
    <div className="min-w-[80vw] mx-auto flex flex-col">
      {successMessage && <span>{successMessage}</span>}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center pt-52"
      >
        <MailInput />
        <PasswordInput />
        <ButtonElevatedBase
          text="Log in"
          className1="max-w-[50%]"
        />
      </form>
      {errors.length > 0 && (
        <ul className="flex flex-col justify-center items-center">
          {errors.map((error, index) => (
            <li
              key={index}
              className="text-red-500"
            >
              {error.msg}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

Login.propTypes = {
  postURL: PropTypes.string.isRequired,
};
