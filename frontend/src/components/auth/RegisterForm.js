import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box } from '@mui/material';
import { authApi } from '../../api/api';

const RegisterForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            await authApi.register(data);
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                fullWidth
                label="Username"
                autoFocus
                {...register('username', { required: 'Username is required' })}
                error={!!errors.username}
                helperText={errors.username?.message}
            />
            <TextField
                margin="normal"
                fullWidth
                label="Email"
                type="email"
                {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                    }
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
            />
            <TextField
                margin="normal"
                fullWidth
                label="Password"
                type="password"
                {...register('password', { 
                    required: 'Password is required',
                    minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters'
                    }
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Register
            </Button>
        </Box>
    );
};

export default RegisterForm;