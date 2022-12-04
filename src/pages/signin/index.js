import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { Card, Container } from 'react-bootstrap';
import SForm from './form';
import SAlert from '../../components/Alert';
import { postData } from '../../utils/fetch';
import { userLogin } from '../../redux/auth/actions';

function SignIn() {
    const [alert, setAlert] = useState({ show: false, message: '', type: '' });
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        email: 'organizer1@gmail.com',
        password: 'rahasia'
    });

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await postData(`/cms/auth/signin`, form);

            dispatch(userLogin(data.data.token, data.data.role))
            setLoading(false);
            navigate('/');
        } catch (error) {
            setLoading(false);
            setAlert({ show: true, message: error?.response?.data?.msg ?? 'Internal server error', type: 'danger' });
        }
    }

    return (
        <Container md={12}>
            <div style={{ width: '50%' }} className='m-auto'>
                {alert.show && <SAlert type={alert.type} message={alert.message} />}
            </div>
            <Card style={{ width: '50%' }} className='m-auto mt-5'>
                <Card.Body>
                    <Card.Title className='mb-3'>Sign In</Card.Title>
                    <SForm form={form} handleChange={handleChange} handleSubmit={handleSubmit} loading={loading} />
                </Card.Body>
            </Card>
        </Container>

    );
}

export default SignIn;