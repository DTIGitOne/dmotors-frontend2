import React, { useState } from 'react';
import { useNavigate , useLocation } from 'react-router-dom';
import axiosInstance from '../API/axios';
import { Button, TextField, InputAdornment , IconButton } from '@mui/material';
import LoaderIcon from '../SVG/LoaderIcon';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [newPasswordError, setNewPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const history = useNavigate();
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleClickShowNewPassword = () => setShowNewPassword(!showNewPassword);

    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    const navigate = useNavigate();

    const passwordChange = (e) => {
        setConfirmPassword(e.target.value);
        setConfirmPasswordError(false);
    }

    const newPasswordChange = (e) => {
        setNewPassword(e.target.value);
        setNewPasswordError(false);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (newPassword !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match');
            return;
        }

        try {
            setLoading(true)
            const response = await axiosInstance.patch('/users/reset-password', { token, newPassword });

            if (response.status === 200) {
                alert('Password reset successful');
                history.push('/Login');
                navigate('/Login')
            } else {
                setConfirmPasswordError(response.data.message || 'An error occurred');
            } 
        } catch (error) {
            setError('An error occurred');
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="h-screen w-screen bg-slate-100 flex justify-center items-center">
          {loading ? (
            <LoaderIcon />
          ) : (
            <div className="h-64 w-4/5 bg-white rounded-3xl flex justify-center items-center flex-col">
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <form
                className="h-full w-full flex justify-center items-center flex-col"
                onSubmit={handleSubmit}
              >
                <div className="h-16 w-4/5">
                  <TextField
                    required
                    className="w-full"
                    value={newPassword}
                    helperText={newPasswordError}
                    onChange={(e) => newPasswordChange(e)}
                    error={Boolean(newPasswordError)}
                    id="newPassword"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="New Password"
                    variant="standard"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div className="h-16 w-4/5">
                  <TextField
                    required
                    className="w-full"
                    value={confirmPassword}
                    helperText={confirmPasswordError}
                    onChange={(e) => passwordChange(e)}
                    error={Boolean(confirmPasswordError)}
                    id="confirmPassword"
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    variant="standard"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowNewPassword}
                          >
                            {showNewPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <Button size="large" variant="contained" type="submit">
                  <p style={{ fontFamily: 'Poppins' }}>Reset Password</p>
                </Button>
              </form>
            </div>
          )}
        </div>
      );
};

export default ResetPassword;
