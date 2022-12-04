import React from 'react';
import { Container, Table } from 'react-bootstrap';
import SBreadcrumb from '../../components/Breadcrumb';

function Dashboard(props) {
    return (
        <Container className='mt-3'>
            <SBreadcrumb />
            <h1>dashboard</h1>
        </Container>
    );
}

export default Dashboard;