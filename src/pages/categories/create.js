import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import SBreadcrumb from '../../components/Breadcrumb';
import Form from './form'
import SAlert from '../../components/Alert';
import { useDispatch } from 'react-redux';
import { postData } from '../../utils/fetch';
import { setNotif } from '../../redux/notif/actions';

function CategoryCreate() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [form, setForm] = useState({
        name: ''
    })
    const [alert, setAlert] = useState({
        status: false,
        type: '',
        message: ''
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            let res = await postData('/cms/categories', form)

            dispatch(
                setNotif(
                    true,
                    'success',
                    `Successfully add new category ${res.data.data.name}`
                )
            )

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
    );
}

export default CategoryCreate;