import React from 'react';
import { Form } from 'react-bootstrap';
import SButton from '../../components/Button';
import TextInputWithLabel from '../../components/TextInputWithLabel';

function SForm({ form, handleChange, handleSubmit, loading }) {
    return (
        <Form onSubmit={handleSubmit}>
            <TextInputWithLabel
                label='Email'
                type='email'
                name='email'
                value={form.email}
                placeholder='Enter email'
                onChange={handleChange}
            />

            <TextInputWithLabel
                label='Password'
                type='password'
                name='password'
                value={form.password}
                placeholder='Enter password'
                onChange={handleChange}
            />

            <SButton loading={loading} disabled={loading} variant="primary" type="submit">
                Submit
            </SButton>
        </Form>
    );
}

export default SForm;