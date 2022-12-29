import React from 'react';
import { Form } from 'react-bootstrap';

function SearchInput({ handleChange, query, disabled }) {
    return (
        <Form.Group className='mb-3'>
            <Form.Control
                disabled={disabled}
                type='text'
                placeholder='Search'
                value={query}
                onChange={handleChange}
                name='query'
            />
        </Form.Group>
    );
}

export default SearchInput;