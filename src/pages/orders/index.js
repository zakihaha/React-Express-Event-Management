import React, { useState } from 'react';
import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import SBreadcrumb from '../../components/Breadcrumb';
import Table from '../../components/TableWithAction';
import { fetchOrders, setDate, setPage } from '../../redux/orders/actions';
import SearchInput from '../../components/SearchInput';
import { fetchListsEvents } from '../../redux/lists/actions';
import InputDate from '../../components/InputDate';
import { formatDate } from '../../utils/formatDate';

function OrdersPage(props) {
    const dispatch = useDispatch()

    const orders = useSelector(state => state.orders)

    let [isShowed, setIsShowed] = useState(false)

    useEffect(() => {
        dispatch(fetchOrders())
    }, [dispatch, orders.page, orders.date])

    useEffect(() => {
        dispatch(fetchListsEvents())
    }, [dispatch])

    const displayDate = `${orders.date?.startDate ? formatDate(orders.date?.startDate) : ''} ${orders.date?.endDate ? ' - ' + formatDate(orders.date.endDate) : ''}`

    return (
        <Container className='mt-3'>
            <SBreadcrumb textSecond='Orders' />
            <Row>
                <Col
                    className='cursor-pointer position-relative'
                    onClick={() => setIsShowed(true)}
                >
                    <SearchInput disabled query={displayDate} />
                    {
                        isShowed ? (
                            <InputDate
                                date={orders.date}
                                setIsShowed={() => setIsShowed()}
                                onChangeDate={(ranges) => dispatch(setDate(ranges.selection))}
                            />
                        ) : ('')
                    }
                </Col>
                <Col></Col>
                <Col></Col>
            </Row>

            <Table
                status={orders.status}
                thead={['Nama', 'Email', 'Judul', 'Tanggal', 'Tanggal Order', 'Tempat']}
                data={orders.data}
                tbody={['name', 'email', 'title', 'date', 'orderDate', 'venueName']}
                pages={orders.pages}
                actionNotDisplay
                handlePageClick={({ selected }) => dispatch(setPage(selected + 1))}
            />
        </Container>
    );
}

export default OrdersPage;