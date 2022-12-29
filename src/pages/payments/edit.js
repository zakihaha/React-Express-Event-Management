import React, { useState } from 'react';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Form from './form'
import SAlert from '../../components/Alert';
import SBreadcrumb from '../../components/Breadcrumb';
import { getData, postData, putData } from '../../utils/fetch';
import { setNotif } from '../../redux/notif/actions';

function PaymentsEdit(props) {
    const { paymentId } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [form, setForm] = useState({
        name: '',
        file: '',
        avatar: ''
    })

    const [alert, setAlert] = useState({
        status: false,
        type: '',
        message: ''
    })

    const [loading, setLoading] = useState(false)

    const fetchOnePayment = async () => {
        const res = await getData(`/cms/payments/${paymentId}`)

        setForm({
            ...form,
            name: res.data.data.type,
            avatar: res.data.data.image.name,
            file: res.data.data.image._id
        })
    }

    const uploadImage = async (file) => {
        let formData = new FormData();
        formData.append('avatar', file);
        const res = await postData('/cms/images', formData, true)
        return res;
    }

    const handleChange = async (e) => {
        if (e.target.name === 'avatar') {
            if (
                e.target.files[0]?.type === 'image/jpeg' ||
                e.target.files[0]?.type === 'image/jpg' ||
                e.target.files[0]?.type === 'image/png'
            ) {
                var size = parseFloat(e.target.files[0].size / 3145728).toFixed(2);

                if (size > 2) {
                    setAlert({
                        ...alert,
                        status: true,
                        type: 'danger',
                        message: 'Image size must be less than 3MB'
                    })
                    setForm({
                        ...form,
                        file: '',
                        [e.target.name]: ''
                    })
                } else {
                    const res = await uploadImage(e.target.files[0])

                    setAlert({
                        status: false,
                        type: '',
                        message: ''
                    })

                    setForm({
                        ...form,
                        file: res.data.data._id,
                        [e.target.name]: res.data.data.name
                    })
                }
            } else {
                setAlert({
                    ...alert,
                    status: true,
                    type: 'danger',
                    message: 'Image extension must be either .jpg, .jpeg, or .png'
                })
                setForm({
                    ...form,
                    file: '',
                    [e.target.name]: '',
                });
            }
        } else {
            setForm({ ...form, [e.target.name]: e.target.value })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const payload = {
                image: form.file,
                type: form.name
            }

            let res = await putData(`/cms/payments/${paymentId}`, payload)
            dispatch(
                setNotif(
                    true,
                    'success',
                    `Successfully update payment ${res.data.data.name}`
                )
            )
            navigate('/payments')
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
        fetchOnePayment()
    }, [])

    return (
        <Container>
            <SBreadcrumb
                textSecond={'Payments'}
                urlSecond={'/payments'}
                textThird='Edit'
            />
            {alert.status && <SAlert type={alert.type} message={alert.message} />}
            <Form
                form={form}
                loading={loading}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                edit
            />
        </Container>
    );
}

export default PaymentsEdit;