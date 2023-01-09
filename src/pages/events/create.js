import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Form from './form'
import SAlert from '../../components/Alert';
import SBreadcrumb from '../../components/Breadcrumb';
import { postData } from '../../utils/fetch';
import { setNotif } from '../../redux/notif/actions';
import { useEffect } from 'react';
import { fetchListsCategories, fetchListsTalents } from '../../redux/lists/actions';

function EventsCreate(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const lists = useSelector((state) => state.lists)
    const [form, setForm] = useState({
        title: '',
        price: '',
        date: '',
        file: '',
        avatar: '',
        about: '',
        venueName: '',
        tagline: '',
        keyPoint: [''],
        tickets: [
            {
                type: '',
                statusTicketCategories: '',
                stock: '',
                price: '',
            },
        ],
        category: '',
        talent: '',
        stock: '',
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
        } else if (e.target.name === 'category' || e.target.name === 'talent') {
            setForm({ ...form, [e.target.name]: e });
        } else {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
    }

    // handle keypoint
    const handleChangeKeyPoint = (e, i) => {
        let _temp = [...form.keyPoint]
        _temp[i] = e.target.value
        setForm({ ...form, keyPoint: _temp })
    }

    const handlePlusKeyPoint = () => {
        let _temp = [...form.keyPoint]
        _temp.push('')
        setForm({ ...form, keyPoint: _temp })
    }

    const handleMinusKeyPoint = (index) => {
        let _temp = [...form.keyPoint]

        let removeIndex = _temp.map(function (_, i) {
            return i
        }).indexOf(index)

        _temp.splice(removeIndex, 1)

        setForm({ ...form, keyPoint: _temp })
    }

    // handle ticket
    const handleChangeTicket = (e, i) => {
        let _temp = [...form.tickets]

        _temp[i][e.target.name] = e.target.value

        setForm({ ...form, tickets: _temp })
    }

    const handlePlusTicket = () => {
        let _temp = [...form.tickets]
        _temp.push({
            type: '',
            statusTicketCategories: '',
            stock: '',
            price: '',
        })

        setForm({ ...form, tickets: _temp })
    }

    const handleMinusTicket = (index) => {
        let _temp = [...form.tickets]

        let removeIndex = _temp.map(function (_, i) {
            return i
        }).indexOf(index)

        _temp.splice(removeIndex, 1)

        setForm({ ...form, tickets: _temp })
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const payload = {
                date: form.date,
                image: form.file,
                title: form.title,
                price: form.price,
                about: form.about,
                venueName: form.venueName,
                tagline: form.tagline,
                keyPoint: form.keyPoint,
                category: form.category.value,
                talent: form.talent.value,
                status: form.status,
                tickets: form.tickets,
            }

            let res = await postData('/cms/events', payload)

            dispatch(
                setNotif(
                    true,
                    'success',
                    `Successfully add new event ${res.data.data.title}`
                )
            )

            navigate('/events')
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
        dispatch(fetchListsTalents())
        dispatch(fetchListsCategories())
    }, [dispatch])

    return (
        <Container>
            <SBreadcrumb
                textSecond={'Events'}
                urlSecond={'/events'}
                textThird={'Create'}
            />
            {alert.status && <SAlert type={alert.type} message={alert.message} />}
            <Form
                form={form}
                loading={loading}
                lists={lists}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleChangeKeyPoint={handleChangeKeyPoint}
                handlePlusKeyPoint={handlePlusKeyPoint}
                handleMinusKeyPoint={handleMinusKeyPoint}
                handlePlusTicket={handlePlusTicket}
                handleMinusTicket={handleMinusTicket}
                handleChangeTicket={handleChangeTicket}
            />
        </Container>
    );
}

export default EventsCreate;