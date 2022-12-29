import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Form from './form'
import SAlert from '../../components/Alert';
import SBreadcrumb from '../../components/Breadcrumb';
import { postData } from '../../utils/fetch';
import { setNotif } from '../../redux/notif/actions';

function TalentsCreate(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [form, setForm] = useState({
        name: '',
        role: '',
        file: '',
        avatar: ''
    })

    const [alert, setAlert] = useState({
        status: false,
        type: '',
        message: ''
    })

    const [loading, setLoading] = useState(false)

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
                role: form.role,
                name: form.name
            }

            let res = await postData('/cms/talents', payload)

            dispatch(
                setNotif(
                    true,
                    'success',
                    `Successfully add new talent ${res.data.data.name}`
                )
            )

            navigate('/talents')
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
                textSecond={'Talents'}
                urlSecond={'/talents'}
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

export default TalentsCreate;