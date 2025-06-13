import React from 'react';
import { Grid, Link, Typography } from '@mui/material';
import RegisterForm from '../components/auth/RegisterForm';
import Layout from '../components/layout/Layout';

const Register = () => {
    return (
        <Layout>
            <Grid container justifyContent="center">
                <Grid item xs={12} sm={8} md={6} lg={4}>
                    <Typography variant="h5" gutterBottom>
                        Register
                    </Typography>
                    <RegisterForm />
                    <Typography variant="body2" sx={{ mt: 2 }}>
                        Already have an account? <Link href="/login">Sign in</Link>
                    </Typography>
                </Grid>
            </Grid>
        </Layout>
    );
};

export default Register;