import React, { useState } from 'react';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Form from './form'
import SAlert from '../../components/Alert';
import SBreadcrumb from '../../components/Breadcrumb';
import { getData, postData, putData } from '../../utils/fetch';
import { setNotif } from '../../redux/notif/actions';
import { fetchListsCategories, fetchListsTalents } from '../../redux/lists/actions';
import moment from 'moment';

function EventsEdit(props) {
    const { eventId } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const lists = useSelector((state) => state.lists);
    const [form, setForm] = useState({
        title: '',
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
    });

    const [alert, setAlert] = useState({
        status: false,
        type: '',
        message: ''
    })

    const [loading, setLoading] = useState(false)


    const fetchOneCategories = async () => {
        const res = await getData(`/cms/events/${eventId}`);

        setForm({
            ...form,
            title: res.data.data.title,
            date: moment(res.data.data.date).format('YYYY-MM-DDTHH:SS'),
            file: res.data.data.image._id,
            avatar: res.data.data.image.name,
            about: res.data.data.about,
            venueName: res.data.data.venueName,
            tagline: res.data.data.tagline,
            keyPoint: res.data.data.keyPoint,
            category: {
                label: res?.data?.data?.category?.name,
                target: { name: 'category', value: res?.data?.data?.category?._id },
                value: res?.data?.data?.category?._id,
            },
            talent: {
                label: res?.data?.data?.talent?.name,
                target: { name: 'talent', value: res?.data?.data?.talent?._id },
                value: res?.data?.data?.talent?._id,
            },
            tickets: res.data.data.tickets,
        });
    };

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

            const res = await putData(`/cms/events/${eventId}`, payload);

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
        fetchOneCategories();
    }, []);

    useEffect(() => {
        dispatch(fetchListsTalents());
        dispatch(fetchListsCategories());
    }, [dispatch]);

    return (
        <Container>
            <SBreadcrumb
                textSecond={'Events'}
                urlSecond={'/events'}
                textThird='Edit'
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
                edit
            />
        </Container>
    );
}

export default EventsEdit;