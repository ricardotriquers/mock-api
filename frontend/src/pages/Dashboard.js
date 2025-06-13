import React, { useState } from 'react';
import { Button } from '@mui/material';
import EndpointForm from '../components/endpoints/EndpointForm';
import EndpointList from '../components/endpoints/EndpointList';
import Layout from '../components/layout/Layout';
import { endpointsApi } from '../api/api';

const Dashboard = () => {
    const [editingEndpoint, setEditingEndpoint] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = async (data) => {
        try {
            if (editingEndpoint) {
                await endpointsApi.update(editingEndpoint.id, data);
            } else {
                await endpointsApi.create(data);
            }
            setShowForm(false);
            setEditingEndpoint(null);
        } catch (error) {
            console.error("Failed to save endpoint:", error);
        }
    };

    return (
        <Layout>
            {showForm || editingEndpoint ? (
                <EndpointForm 
                    onSubmit={handleSubmit} 
                    initialData={editingEndpoint} 
                    onCancel={() => {
                        setShowForm(false);
                        setEditingEndpoint(null);
                    }}
                />
            ) : (
                <>
                    <Button 
                        variant="contained" 
                        onClick={() => setShowForm(true)}
                        sx={{ mb: 2 }}
                    >
                        Create New Endpoint
                    </Button>
                    <EndpointList onEdit={setEditingEndpoint} />
                </>
            )}
        </Layout>
    );
};

export default Dashboard;