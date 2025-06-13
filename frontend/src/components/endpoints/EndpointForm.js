import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Grid, Box } from '@mui/material';
import dynamic from 'next/dynamic';

const JsonEditor = dynamic(() => import('react-json-view'), { ssr: false });

const EndpointForm = ({ onSubmit, initialData }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: initialData || {
            path: '',
            httpMethod: 'GET',
            responseStatus: 200,
            responseBody: '{}',
            requestBodyPattern: '',
            delayInMillis: 0,
            active: true
        }
    });

    const [responseBody, setResponseBody] = useState(initialData?.responseBody || {});
    const [responseHeaders, setResponseHeaders] = useState(initialData?.responseHeaders || {});

    const handleFormSubmit = (data) => {
        onSubmit({
            ...data,
            responseBody: JSON.stringify(responseBody),
            responseHeaders: responseHeaders
        });
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Path"
                        {...register('path', { required: 'Path is required' })}
                        error={!!errors.path}
                        helperText={errors.path?.message}
                    />
                </Grid>
                
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <InputLabel>HTTP Method</InputLabel>
                        <Select
                            label="HTTP Method"
                            {...register('httpMethod')}
                            defaultValue="GET"
                        >
                            {['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].map(method => (
                                <MenuItem key={method} value={method}>{method}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Request Body Pattern (Regex)"
                        {...register('requestBodyPattern')}
                        helperText="Leave empty to match any request body"
                    />
                </Grid>
                
                <Grid item xs={12}>
                    <Box mb={2}>
                        <InputLabel>Response Body</InputLabel>
                        <JsonEditor
                            src={responseBody}
                            onEdit={(e) => setResponseBody(e.updated_src)}
                            onAdd={(e) => setResponseBody(e.updated_src)}
                            onDelete={(e) => setResponseBody(e.updated_src)}
                        />
                    </Box>
                </Grid>
                
                <Grid item xs={12}>
                    <Box mb={2}>
                        <InputLabel>Response Headers</InputLabel>
                        <JsonEditor
                            src={responseHeaders}
                            onEdit={(e) => setResponseHeaders(e.updated_src)}
                            onAdd={(e) => setResponseHeaders(e.updated_src)}
                            onDelete={(e) => setResponseHeaders(e.updated_src)}
                        />
                    </Box>
                </Grid>
                
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Response Status"
                        type="number"
                        {...register('responseStatus', { 
                            required: 'Status is required',
                            min: { value: 100, message: 'Minimum status is 100' },
                            max: { value: 599, message: 'Maximum status is 599' }
                        })}
                        error={!!errors.responseStatus}
                        helperText={errors.responseStatus?.message}
                    />
                </Grid>
                
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Delay (ms)"
                        type="number"
                        {...register('delayInMillis', { 
                            min: { value: 0, message: 'Delay cannot be negative' }
                        })}
                        error={!!errors.delayInMillis}
                        helperText={errors.delayInMillis?.message}
                    />
                </Grid>
                
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">
                        {initialData ? 'Update' : 'Create'} Endpoint
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default EndpointForm;