import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiLogin } from "react-icons/ci";


const LoginComp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Replaces useHistory()


  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Instead of hardcoded credentials, just check if any input is provided
    if (username && password) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', username); // Optionally store the username
      navigate('/'); // Navigate to the homepage or dashboard after login
    } else {
      setError('Please enter a username and password');
    }
  };


  return (

    <div className="flex justify-center items-center border-4 border-double rounded-md  h-screen px-4">
    {error && <p className="text-red-500 mb-4">{error}</p>}
    <form
      className="flex flex-col w-full max-w-md border bg-zinc-800 p-8 rounded-lg shadow-md"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
        className="p-3 mb-4 border placeholder:text-zinc-800  bg-green-500   rounded-lg focus:outline-none focus:ring-2 "
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="p-3 mb-4 border placeholder:text-zinc-800  bg-green-500   rounded-lg focus:outline-none focus:ring-2"
      />
    
      <div className='flex justify-center items-center'>
      <CiLogin onClick={handleSubmit} className="text-4xl text-green-500 hover:cursor-pointer hover:text-yellow-500 " type="submit" />
      </div>
          

    </form>

  </div>
  );
}

export default LoginComp;
