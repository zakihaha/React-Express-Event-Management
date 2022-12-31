import React, { useState } from 'react';
import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SAlert from '../../components/Alert';
import SBreadcrumb from '../../components/Breadcrumb';
import SButton from '../../components/Button';
import Table from '../../components/TableWithAction';
import { accessEvents } from '../../const/access';
import { setNotif } from '../../redux/notif/actions';
import { fetchEvents, setCategory, setKeyword, setTalent } from '../../redux/events/actions';
import Swal from 'sweetalert2';
import { deleteData } from '../../utils/fetch';
import SearchInput from '../../components/SearchInput';
import { fetchListsCategories, fetchListsTalents } from '../../redux/lists/actions';
import SelectBox from '../../components/SelectBox';

function EventsPage(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const notif = useSelector((state) => state.notif)
    const events = useSelector(state => state.events)
    const lists = useSelector(state => state.lists)
    const [access, setAccess] = useState({
        tambah: false,
        hapus: false,
        edit: false,
    })

    const checkAccess = () => {
        let { role } = localStorage.getItem('auth')
            ? JSON.parse(localStorage.getItem('auth'))
            : {};

        const access = { tambah: false, hapus: false, edit: false }

        Object.keys(accessEvents).forEach(function (key, index) {
            if (accessEvents[key].indexOf(role) >= 0) {
                access[key] = true
            }
        })
        setAccess(access)
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This action will cause a permanent changes',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085D6',
            cancelButtonColor: '#D33',
            confirmButtonText: 'Yes, delete',
            cancelButtonText: 'Cancel'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await deleteData(`/cms/events/${id}`)

                dispatch(
                    setNotif(
                        true,
                        'success',
                        `Successfully delete event ${res.data.data.type}`
                    )
                )

                dispatch(fetchEvents())
            }
        })
    }

    useEffect(() => {
        checkAccess()
    }, [])

    useEffect(() => {
        dispatch(fetchEvents())
    }, [dispatch, events.keyword, events.category, events.talent])

    useEffect(() => {
        dispatch(fetchListsTalents())
        dispatch(fetchListsCategories())
    }, [dispatch])

    return (
        <Container className='mt-3'>

            {
                access.tambah && (
                    <SButton action={() => navigate('/events/create')}>Tambah</SButton>

                )
            }

            <SBreadcrumb textSecound={'Events'} />
            <Row>
                <Col>
                    <SearchInput
                        name='keyword'
                        query={events.keyword}
                        handleChange={(e) => dispatch(setKeyword(e.target.value))}
                    />
                </Col>
                <Col>
                    <SelectBox
                        placeholder={'Masukan pencarian kategori'}
                        name='category'
                        value={events.category}
                        options={lists.categories}
                        isClearable={true}
                        handleChange={(e) => dispatch(setCategory(e))}
                    />
                </Col>
                <Col>
                    <SelectBox
                        placeholder={'Masukan pencarian pembicara'}
                        name='talents'
                        value={events.talent}
                        options={lists.talents}
                        isClearable={true}
                        handleChange={(e) => dispatch(setTalent(e))}
                    />
                </Col>
            </Row>

            {notif.status && (
                <SAlert type={notif.typeNotif} message={notif.message} />
            )}
            <Table
                status={events.status}
                thead={[
                    'Judul',
                    'Tanggal',
                    'Tempat',
                    'Status',
                    'Kategori',
                    'Pembicara',
                    'Aksi',
                ]}
                data={events.data}
                tbody={[
                    'title',
                    'date',
                    'venueName',
                    'statusEvent',
                    'categoryName',
                    'talentName',
                ]}
                editUrl={access.edit ? `/events/edit` : null}
                deleteAction={access.hapus ? (id) => handleDelete(id) : null}
                // customAction={(id, status = '') => {
                //     return (
                //         <SButton
                //             className={'mx-2'}
                //             variant='primary'
                //             size={'sm'}
                //             action={() => handleChangeStatus(id, status)}
                //         >
                //             Change Status
                //         </SButton>
                //     );
                // }}
                withoutPagination
            />
        </Container>
    );
}

export default EventsPage;