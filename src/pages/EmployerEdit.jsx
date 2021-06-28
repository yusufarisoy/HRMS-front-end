import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Grid, Button, Divider, Form as SemanticForm, Message, Card } from 'semantic-ui-react';
import EmployerService from '../services/employerService';

export default function EmployerEdit() {

    //Static for now, will come from session
    const employer = {
        id: 1,
        name: 'Best Company',
        mail: 'best@exosoft.com',
        phone: '444 751 23'
    };

    const [informationUpdate, setInformationUpdate] = useState(null);

    useEffect(() => {
        let employerService = new EmployerService();
        employerService.getWaitingUpdateByEmployerId(employer.id).then(results => {
            if (results.data.success) {
                setInformationUpdate(results.data.data);
            }
        });
    }, [employer.id]);

    const history = useHistory();

    const initialValues = {
        employerId: employer.id,
        name: employer.name,
        mail: employer.mail,
        password: '',
        phone: employer.phone
    };

    const validationSchema = Yup.object({
        employerId: Yup.number(),
        name: Yup.string().required('Bos birakilamaz'),
        mail: Yup.string().required('Bos birakilamaz'),
        password: Yup.string(),
        phone: Yup.string().required('Bos birakilamaz')
    });

    return (
        <Grid.Row>
            <Grid.Column width={12}>
                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        let employerService = new EmployerService();
                        employerService.addInformationUpdate(values);
                        history.push('/employer/profile/edit');
                    }}>

                    <Form className='ui form' style={{ padding: '3em', marginBottom: '2em', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px', borderRadius: '10px' }}>
                        <Divider horizontal style={{ marginBottom: '2em' }}>Bilgileri Duzenle</Divider>
                        <SemanticForm.Field>
                            <label>Sirket Adi</label>
                            <Field name='name' type='text' placeholder='Example Firm' />
                            <ErrorMessage name="name" render={msg => <Message error header='Hata' content={msg} />} />
                        </SemanticForm.Field>
                        <SemanticForm.Field>
                            <label>Sirket Maili</label>
                            <Field name='mail' placeholder='example@company.com' />
                            <ErrorMessage name="mail" render={msg => <Message error header='Hata' content={msg} />} />
                        </SemanticForm.Field>
                        <SemanticForm.Field>
                            <label>Sifre</label>
                            <Field name='password' placeholder='**********' />
                            <ErrorMessage name="password" render={msg => <Message error header='Hata' content={msg} />} />
                        </SemanticForm.Field>
                        <SemanticForm.Field>
                            <label>Telefon Numarasi</label>
                            <Field name='phone' type='tel' placeholder='444 85 14' />
                            <ErrorMessage name="phone" render={msg => <Message error header='Hata' content={msg} />} />
                        </SemanticForm.Field>
                        {informationUpdate !== null ? (
                            <Card fluid style={{ marginTop: '2em', backgroundColor: '#d4edda', boxShadow: 'rgba(0, 0, 0, 0.15) 2.95px 2.95px 4.5px' }}>
                                <Card.Content>
                                    <Card.Header>Onay bekliyor</Card.Header>
                                    <Card.Meta>Degisiklik tarihi ve saati: {informationUpdate.updateDate.slice(0, 10)} | {informationUpdate.updateDate.slice(11, 16)}</Card.Meta>
                                </Card.Content>
                            </Card>
                        ) : (
                            <Button color='linkedin' type='submit' fluid>Kaydet</Button>
                        )}
                    </Form>
                </Formik>
            </Grid.Column>
        </Grid.Row>
    );
}