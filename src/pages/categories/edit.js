import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import SAlert from '../../components/Alert';
import SBreadcrumb from '../../components/Breadcrumb';
import SNavbar from '../../components/Navbar';
import Form from './form';

function CategoryEdit(props) {
    const [form, setForm] = useState({
        name: ''
    })
    const [alert, setAlert] = useState({
        status: false,
        type: '',
        message: ''
    })
    const [loading, setLoading] = useState(false)
    const { categoryId } = useParams()
    const token = localStorage.getItem('token');
    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {

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

    const fetchOneCategories = async () => {

    }

    useEffect(() => {
        // fetchOneCategories()
    }, [])

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
                    // edit
                    form={form}
                    loading={loading}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />
            </Container>
        </>
    );
}

export default CategoryEdit;