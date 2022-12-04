import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import SAlert from '../../components/Alert';
import SBreadcrumb from '../../components/Breadcrumb';
import { setNotif } from '../../redux/notif/actions';
import { getData, putData } from '../../utils/fetch';
import Form from './form';

function CategoryEdit(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { categoryId } = useParams()

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

    const fetchOneCategories = async () => {
        const res = await getData(`/cms/categories/${categoryId}`)

        setForm({ ...form, name: res.data.data.name })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await putData(`/cms/categories/${categoryId}`, form)
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


    useEffect(() => {
        fetchOneCategories()
    }, [])

    return (
        <Container>
            <SBreadcrumb
                textSecond={'Categories'}
                urlSecond={'/categories'}
                textThird={'Create'}
            />
            {alert.status && <SAlert type={alert.type} message={alert.message} />}
            <Form
                edit
                form={form}
                loading={loading}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </Container>
    );
}

export default CategoryEdit;