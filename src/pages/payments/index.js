import React, { useState } from 'react';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SAlert from '../../components/Alert';
import SBreadcrumb from '../../components/Breadcrumb';
import SButton from '../../components/Button';
import Table from '../../components/TableWithAction';
import { accessPayments } from '../../const/access';
import { setNotif } from '../../redux/notif/actions';
import { fetchPayments, setKeyword } from '../../redux/payments/actions';
import Swal from 'sweetalert2';
import { deleteData } from '../../utils/fetch';
import SearchInput from '../../components/SearchInput';

function PaymentsPage(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const notif = useSelector((state) => state.notif)
    const payments = useSelector(state => state.payments)
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

        Object.keys(accessPayments).forEach(function (key, index) {
            if (accessPayments[key].indexOf(role) >= 0) {
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
                const res = await deleteData(`/cms/payments/${id}`)

                dispatch(
                    setNotif(
                        true,
                        'success',
                        `Successfully delete payment ${res.data.data.type}`
                    )
                )

                dispatch(fetchPayments())
            }
        })
    }

    useEffect(() => {
        checkAccess()
    }, [])

    useEffect(() => {
        dispatch(fetchPayments())
    }, [dispatch, payments.keyword])

    return (
        <Container className='mt-3'>
            <SBreadcrumb textSecond='Payments' />

            {
                access.tambah && (
                    <SButton action={() => navigate('/payments/create')}>Tambah</SButton>

                )
            }

            {
                notif.status && (
                    <SAlert type={notif.typeNotif} message={notif.message} />
                )
            }

            <SearchInput
                query={payments.keyword}
                handleChange={(e) => dispatch(setKeyword(e.target.value))}
            />

            <Table
                status={payments.status}
                thead={['Nama', 'Avatar', 'Aksi']}
                data={payments.data}
                tbody={['type', 'avatar']}
                editUrl={access.edit ? `/payments/edit` : null}
                deleteAction={access.hapus ? (id) => handleDelete(id) : null}
                withoutPagination
            />
        </Container>
    );
}

export default PaymentsPage;