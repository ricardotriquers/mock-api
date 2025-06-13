import React from 'react';
import { Grid, Link, Typography } from '@mui/material';
import LoginForm from '../components/auth/LoginForm';
import Layout from '../components/layout/Layout';

const Login = () => {
    return (
        <Layout>
            <Grid container justifyContent="center">
                <Grid item xs={12} sm={8} md={6} lg={4}>
                    <Typography variant="h5" gutterBottom>
                        Sign in
                    </Typography>
                    <LoginForm />
                    <Typography variant="body2" sx={{ mt: 2 }}>
                        Don't have an account? <Link href="/register">Register</Link>
                    </Typography>
                </Grid>
            </Grid>
        </Layout>
    );
};

export default Login;