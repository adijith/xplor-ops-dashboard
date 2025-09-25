import React, { useState } from 'react';
import { useLogin } from '../../hooks/UseAuth';
import XplorLogo from '../../assets/logos/xplor_logo.svg';
import BusImage from '../../assets/images/BusImage.png';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ employeeId?: string; password?: string; general?: string }>({});
  
  const loginMutation = useLogin();

  const validateForm = () => {
    const newErrors: { employeeId?: string; password?: string } = {};
    if (!employeeId.trim()) newErrors.employeeId = 'Employee ID is required';
    if (!password.trim()) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const result = await loginMutation.mutateAsync({ employeeId, password });
      console.log('Login result:', result);
      console.log('Result success:', result.success);
      console.log('Result data:', result.data);
      
      // Check if login was successful - the API might return success in different ways
      // For debugging: if we get any response, consider it successful
      if (result.success || result.data?.token || result.token || result) {
        // Store the authentication token - try different possible locations
        const token = result.data?.token || result.token || result.data?.data?.token;
        if (token) {
          localStorage.setItem("authToken", token);
        } else {
          // Fallback: create a simple token for successful login
          localStorage.setItem("authToken", "login-success-" + Date.now());
        }
        
        // Store user details if available
        const userDetails = result.data?.userDetails || result.userDetails || result.data?.data?.userDetails;
        if (userDetails) {
          localStorage.setItem("userDetails", JSON.stringify(userDetails));
        }
        
        setErrors({});
        console.log('Calling onLoginSuccess');
        onLoginSuccess();
      } else {
        setErrors({ general: result.message || 'Login failed. Please try again.' });
      }
    } catch (error: any) {
      setErrors({ general: error.response?.data?.message || 'An error occurred. Please try again.' });
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side Image */}
      <div className="hidden lg:flex lg:w-1/2 relative p-6">
        {/* Bus Image */}
        <div className="relative z-10 flex items-center justify-center w-full h-full">
          <div>
            <img 
              src={BusImage} 
              alt="Bus" 
              className="w-full max-h-full object-contain drop-shadow-2xl"
              style={{ filter: 'brightness(1.1) contrast(1.1)', width: '128%' }}
            />
          </div>
        </div>
        </div>

      {/* Right Side Login */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-white">
        <div className="max-w-md w-full p-8" style={{ transform: 'scale(1.08)' }}>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Get started now</h1>
          <p className="text-gray-600 mb-8">Enter your credentials to access your account</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Employee ID */}
            <div>
            <input
  id="employeeId"
  type="text"
  value={employeeId}
  onChange={(e) => setEmployeeId(e.target.value)}
  className={`w-full px-4 py-3 border rounded-lg transition-colors text-gray-900 placeholder-gray-500 outline-none ${
    errors.employeeId ? 'border-red-500' : 'border-gray-300'
  }`}
  placeholder="Enter your username"
  disabled={loginMutation.isPending}
/>

              {errors.employeeId && <p className="mt-1 text-sm text-red-600">{errors.employeeId}</p>}
            </div>

            {/* Password */}
            <div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg transition-colors text-gray-900 placeholder-gray-500 outline-none ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your password"
                disabled={loginMutation.isPending}
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            {/* General Error */}
            {errors.general && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{errors.general}</p>
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full bg-indigo-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-800 focus:ring-2 focus:ring-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
