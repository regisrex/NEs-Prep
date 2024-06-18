import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../components/Input';
import Button from '../components/button/button';

const SignUp: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (event: React.FormEvent) => {
    event.preventDefault();
    if (!fullName || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    // Add sign up logic here if needed
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <div className='flex flex-col items-start'>
          <h1 className="text-2xl font-bold text-center w-full">Sign Up</h1>
          <p className="text-sm text-gray-600 mb-8 text-center w-full">Create your account</p>
        </div>
        <form onSubmit={handleSignUp} className="space-y-6">
          <Input _controller={{
            value: fullName,
            setValue: setFullName,
            initialValue: ''
          }}
            label='Full Name'
            type='text'
            placeholder='Full Name'
          />
          <Input _controller={{
            value: email,
            setValue: setEmail,
            initialValue: ''
          }}
            label='Email'
            type='text'
            placeholder='Email address'
          />
          <Input _controller={{
            value: password,
            setValue: setPassword,
            initialValue: ''
          }}
            label='Password'
            type='password'
            placeholder='Enter password'
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="mt-4">
            <p className="text-sm text-gray-600">Already have an account? <Link to="/" className="text-blue-500 underline hover:text-blue-700">Login</Link></p>
          </div>
          <Button>Sign Up</Button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
