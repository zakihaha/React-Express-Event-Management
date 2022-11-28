import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import SBreadcrumb from '../../components/Breadcrumb';
import { config } from '../../configs';
import Form from './form'
import axios from 'axios';
import SAlert from '../../components/Alert';
import SNavbar from '../../components/Navbar';

function CategoryCreate() {
    const [form, setForm] = useState({
        name: ''
    })
    const [alert, setAlert] = useState({
        status: false,
        type: '',
        message: ''
    })
    const [loading, setLoading] = useState(false)
    const token = localStorage.getItem('token');
    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await axios.post(`${config.api_host_dev}/cms/categories`, form, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate('/categories')
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setAlert({
                ...alert,
                status: true,
                type: 'danger',
                message: error.response.data.msg
            })
        }
    }

    return (
        <>
            <SNavbar />
            <Container>
                <SBreadcrumb
                    textSecond={'Categories'}
                    urlSecond={'/categories'}
                    textThird={'Create'}
                />
                {alert.status && <SAlert type={alert.type} message={alert.message} />}
                <Form
                    form={form}
                    loading={loading}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />
            </Container>
        </>
    );
}

export default CategoryCreate;