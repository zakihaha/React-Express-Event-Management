import React from 'react';
import { Form } from 'react-bootstrap';
import SButton from '../../components/Button';
import TextInputWithLabel from '../../components/TextInputWithLabel';

function CategoriesForm({ form, handleChange, handleSubmit, loading, edit }) {
    return (
        <Form onSubmit={handleSubmit}>
            <TextInputWithLabel
                label='Category name'
                type='text'
                name='name'
                value={form.name}
                placeholder='Enter category name'
                onChange={handleChange}
            />

            <SButton loading={loading} disabled={loading} variant="primary" type="submit">
                {edit ? 'Update' : 'Save'}
            </SButton>
        </Form>
    );
}

export default CategoriesForm;