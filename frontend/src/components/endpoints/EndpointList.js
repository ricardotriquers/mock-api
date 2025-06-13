import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton } from '@mui/material';
import { endpointsApi } from '../../api/api';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const EndpointList = ({ onEdit }) => {
    const [endpoints, setEndpoints] = useState([]);

    useEffect(() => {
        const fetchEndpoints = async () => {
            try {
                const response = await endpointsApi.getAll();
                setEndpoints(response.data);
            } catch (error) {
                console.error("Failed to fetch endpoints:", error);
            }
        };
        fetchEndpoints();
    }, []);

    const handleDelete = async (id) => {
        try {
            await endpointsApi.delete(id);
            setEndpoints(endpoints.filter(endpoint => endpoint.id !== id));
        } catch (error) {
            console.error("Failed to delete endpoint:", error);
        }
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Path</TableCell>
                        <TableCell>Method</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {endpoints.map((endpoint) => (
                        <TableRow key={endpoint.id}>
                            <TableCell>{endpoint.path}</TableCell>
                            <TableCell>{endpoint.httpMethod}</TableCell>
                            <TableCell>{endpoint.responseStatus}</TableCell>
                            <TableCell>
                                <IconButton onClick={() => onEdit(endpoint)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handleDelete(endpoint.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default EndpointList;