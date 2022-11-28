import React from 'react'
import Alert from 'react-bootstrap/Alert';

function SAlert({ type, message }) {
    return <Alert variant={type}>{message}</Alert>
}

export default SAlert;