import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import SButton from '../../components/Button';
import SBreadcrumb from '../../components/Breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import { accessCategories } from '../../const/access';
import { fetchCategories } from '../../redux/categories/actions';
import Table from '../../components/TableWithAction';
import SAlert from '../../components/Alert';
import { setNotif } from '../../redux/notif/actions'
import Swal from 'sweetalert2';
import { deleteData } from '../../utils/fetch';

function PageCategories(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const notif = useSelector((state) => state.notif)
    const categories = useSelector((state) => state.categories)
    const [access, setAccess] = useState({
        tambah: false,
        hapus: false,
        edit: false,
    })

    const [loading, setLoading] = useState(false)

    const checkAccess = () => {
        let { role } = localStorage.getItem('auth')
            ? JSON.parse(localStorage.getItem('auth'))
            : {};

        const access = { tambah: false, hapus: false, edit: false }

        Object.keys(accessCategories).forEach(function (key, index) {
            if (accessCategories[key].indexOf(role) >= 0) {
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
                const res = await deleteData(`/cms/categories/${id}`)

                dispatch(
                    setNotif(
                        true,
                        'success',
                        `Successfully delete category ${res.data.data.name}`
                    )
                )

                dispatch(fetchCategories())
            }
        })
    }

    useEffect(() => {
        checkAccess()
    }, [])

    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch])

    return (
        <Container className='mt-3'>
            <SBreadcrumb textSecond='Categories' />

            {
                access.tambah && (
                    <SButton action={() => navigate('/categories/create')}>Tambah</SButton>

                )
            }

            {
                notif.status && (
                    <SAlert type={notif.typeNotif} message={notif.message} />
                )
            }

            <Table
                status={categories.status}
                thead={['Nama', 'Aksi']}
                data={categories.data}
                tbody={['name']}
                editUrl={access.edit ? `/categories/edit` : null}
                deleteAction={access.hapus ? (id) => handleDelete(id) : null}
                withoutPagination
            />
        </Container>
    );
}

export default PageCategories;