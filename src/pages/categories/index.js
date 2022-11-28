import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Spinner, Table } from 'react-bootstrap';
import SButton from '../../components/Button';
import SBreadcrumb from '../../components/Breadcrumb';
import SNavbar from '../../components/Navbar';
import { config } from '../../configs';

function PageCategories(props) {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)

    const token = localStorage.getItem('token');
    const navigate = useNavigate()

    const getCategoriesAPI = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(`${config.api_host_dev}/cms/categories`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setCategories(data.data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }

    useEffect(() => {
        getCategoriesAPI()
    }, [])

    if (!token) return <Navigate to='/signin' replace={true} />

    return (
        <>
            <SNavbar />

            <Container className='mt-3'>
                <SBreadcrumb textSecond='Categories' />
                <SButton action={() => navigate('/categories/create')}>Tambah</SButton>

                <Table className='mt-3' striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loading ?
                                <tr>
                                    <td colSpan={3} className="text-center">
                                        <Spinner animation="border" variant="primary" />
                                    </td>
                                </tr>
                                :
                                categories.map((category, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{category.name}</td>
                                        <td>Action</td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </Table>

            </Container>
        </>
    );
}

export default PageCategories;