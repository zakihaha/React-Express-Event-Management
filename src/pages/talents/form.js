import React from 'react';
import { Figure, Form } from 'react-bootstrap';
import SButton from '../../components/Button';
import TextInputWithLabel from '../../components/TextInputWithLabel';
import { config } from '../../configs';

function TalentsForm({
    handleSubmit,
    form,
    handleChange,
    loading,
    edit,
}) {
    return (
        <Form onSubmit={handleSubmit}>
            <TextInputWithLabel
                placeholder={'Masukan nama pembicara'}
                label={'Nama'}
                name='name'
                value={form.name}
                type='text'
                onChange={handleChange}
            />
            <TextInputWithLabel
                placeholder={'Masukan role'}
                label={'Role'}
                name='role'
                value={form.role}
                type='text'
                onChange={handleChange}
            />
            <TextInputWithLabel
                placeholder={'Masukan Avatar'}
                label={'Avatar'}
                name='avatar'
                // value={form.avatar}
                type='file'
                onChange={handleChange}
            />
            {form.avatar !== '' && (
                <div>
                    <Figure>
                        <Figure.Image
                            width={171}
                            height={180}
                            alt='171x180'
                            src={`${config.api_image}/${form.avatar}`}
                        />

                        <Figure.Caption>Perview image avatar</Figure.Caption>
                    </Figure>
                </div>
            )}
            <SButton variant='primary' disabled={loading} type={"submit"}>
                {edit ? 'Update' : 'Save'}
            </SButton>
        </Form>
    );
}

export default TalentsForm;