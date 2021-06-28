import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Grid, Button, Divider, Form as SemanticForm, Message } from 'semantic-ui-react';
import SystemStaffService from '../services/systemStaffService';

export default function SystemStaffEdit() {
    
    const history = useHistory();

    //Static for now, will come from session
    const systemStaff = {
        id: 1,
        name: 'Ali Kaya',
        mail: 'ali@staff.com',
        phone: '05549752362'
    };

    const initialValues = {
        id: systemStaff.id,
        name: systemStaff.name,
        mail: systemStaff.mail,
        password: '',
        phone: systemStaff.phone
    };

    const validationSchema = Yup.object({
        id: Yup.number(),
        name: Yup.string().required('Bos birakilamaz'),
        mail: Yup.string().required('Bos birakilamaz'),
        password: Yup.string(),
        phone: Yup.string().required('Bos birakilamaz')
    });

    return (
        <Grid.Row>
            <Grid.Column width={12}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        console.log(values);
                        let systemStaffService = new SystemStaffService();
                        systemStaffService.updateInformation(values);
                        history.push('/job-ads');
                    }}>

                    <Form className='ui form' style={{ padding: '3em', marginBottom: '2em', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px', borderRadius: '10px' }}>
                        <Divider horizontal style={{ marginBottom: '2em' }}>Bilgileri Duzenle</Divider>
                        <SemanticForm.Field>
                            <label>Ad - Soyad</label>
                            <Field name='name' type='text' />
                            <ErrorMessage name="name" render={msg => <Message error header='Hata' content={msg} />} />
                        </SemanticForm.Field>
                        <SemanticForm.Field>
                            <label>Email</label>
                            <Field name='mail' />
                            <ErrorMessage name="mail" render={msg => <Message error header='Hata' content={msg} />} />
                        </SemanticForm.Field>
                        <SemanticForm.Field>
                            <label>Sifre</label>
                            <Field name='password' placeholder='**********' />
                            <ErrorMessage name="password" render={msg => <Message error header='Hata' content={msg} />} />
                        </SemanticForm.Field>
                        <SemanticForm.Field>
                            <label>Telefon Numarasi</label>
                            <Field name='phone' type='tel' />
                            <ErrorMessage name="phone" render={msg => <Message error header='Hata' content={msg} />} />
                        </SemanticForm.Field>
                        <SemanticForm.Group widths='equal'>
                            <Button as={Link} to='/job-ads' type='button' fluid>Vazgec</Button>
                            <Button color='orange' type='submit' fluid>Kaydet</Button>
                        </SemanticForm.Group>
                    </Form>
                </Formik>
            </Grid.Column>
        </Grid.Row>
    );
}
