import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PositionService from '../services/positionService';
import JobAdvertisementService from '../services/jobAdvertisementService';
import { Form, Button, Divider, Icon } from 'semantic-ui-react'

export default function JobAdvertisementAdd() {

    const jobAdvertisementService = new JobAdvertisementService();
    const [positions, setPositions] = useState([]);
    const history = useHistory();

    useEffect(() => {
        let positionService = new PositionService();
        positionService.getPositionsByEmployerId(2).then(result => setPositions(result.data.data));
    }, []);

    const cities = [
        { key: 'cityIstanbul', text: 'İstanbul', value: 'İstanbul' },
        { key: 'cityAnkara', text: 'Ankara', value: 'Ankara' },
        { key: 'cityBursa', text: 'Bursa', value: 'Bursa' },
        { key: 'cityIzmir', text: 'İzmir', value: 'İzmir' },
        { key: 'cityKirklareli', text: 'Kırklareli', value: 'Kırklareli' }
    ];

    const workStyles = [
        { key: 'workStyleInPlace', text: 'Yerinde', value: 'yerinde' },
        { key: 'workStyleRemote', text: 'Uzaktan', value: 'Uzaktan' }
    ];

    const optionsPositions = positions.map(position => ({
        key: position.id,
        text: position.name,
        value: position.id
    }));

    const handleSelectOnChange = (value, name) => formik.setFieldValue(name, value);

    const formik = useFormik({
        initialValues: {
            positionId: '',//
            description: '',//text area - solo
            city: '', workStyle: '',
            minSalary: '', maxSalary: '',
            positionCount: '', lastApplyDate: '',
            jobTimeName: ''//aside with position - input
        },
        validationSchema: Yup.object({
            positionId: Yup.number().required('Pozisyon seçin'),
            description: Yup.string().required('Açıklama giriniz'),
            city: Yup.string().required('Şehir seçiniz'),
            minSalary: Yup.number()
                .typeError('Min. maaş rakam olmalıdır')
                .required('Min. maaş giriniz')
                .min(0, 'Eksi değer olamaz'),
            maxSalary: Yup.number()
                .typeError('Max. maaş rakam olmalıdır')
                .required('Max. maaş giriniz')
                .min(0, 'Eksi değer olamaz'),
            positionCount: Yup.number()
                .typeError('Açık pozisyon rakam olmalıdır')
                .required('Açık pozisyon sayısı girin'),
            workStyle: Yup.string().required('Çalışma şekli seçin'),
            lastApplyDate: Yup.date().required('Son başvuru tarihi girin'),
            jobTimeName: Yup.string().required('Çalışma zamanını seçin')
        }),
        onSubmit: values => {
            values.positionId = 3;//Static for now - React JS Developer
            console.log(values);
            jobAdvertisementService.add(values).then(result => {
                console.log(result.data.success);
                history.push('/');
            })
            //jobservice add(values).then(result => result.data.success);
            //history.push('/');
        }
    });

    return (
        <div style={{ paddingBottom: '3em' }}>
            <Divider horizontal>Yeni İlan Oluştur</Divider>
            <Form onSubmit={formik.handleSubmit} style={{ textAlign: 'start', padding: '2em', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px', borderRadius: '10px' }}>
                <Form.Select
                    onChange={(_event, data) => handleSelectOnChange(data.value, 'positionId')}
                    value={formik.values.positionId}
                    id='positionId' name='positionId'
                    label='İş Pozisyonu' placeholder='Pozisyon Seçin'
                    options={optionsPositions} clearable onBlur={formik.onBlur}
                    {...formik.errors.positionId && formik.touched.positionId ? { error: { content: formik.errors.positionId, pointing: 'below' } } : {}} />

                <Form.Group widths='equal'>
                    <Form.Select
                        onChange={(_event, data) => handleSelectOnChange(data.value, 'city')}
                        value={formik.values.city}
                        id='city' name='city'
                        label='Şehir' placeholder='Şehir Seçin'
                        options={cities} clearable onBlur={formik.onBlur}
                        {...formik.errors.city && formik.touched.city ? { error: { content: formik.errors.city, pointing: 'below' } } : {}} />

                    <Form.Select
                        onChange={(_event, data) => handleSelectOnChange(data.value, 'workStyle')}
                        value={formik.values.workStyle}
                        id='workStyle' name='workStyle'
                        label='Çalışma Şekli' placeholder='Seçin'
                        options={workStyles} clearable onBlur={formik.onBlur}
                        {...formik.errors.workStyle && formik.touched.workStyle ? { error: { content: formik.errors.workStyle, pointing: 'below' } } : {}} />
                </Form.Group>

                <Form.Input onChange={formik.handleChange} value={formik.values.jobTimeName} id='jobTimeName' name='jobTimeName' type='text' label='Çalışma Zamanı' placeholder='Örneğin: Tam zamanlı'
                    {...formik.errors.jobTimeName && formik.touched.jobTimeName ? { error: { content: formik.errors.jobTimeName, pointing: 'below' } } : {}} />

                <Form.Group widths='equal'>
                    <Form.Input onChange={formik.handleChange} value={formik.values.minSalary} id='minSalary' name='minSalary' type='number' label='Minimum Maaş' placeholder='5000₺'
                        {...formik.errors.minSalary && formik.touched.minSalary ? { error: { content: formik.errors.minSalary, pointing: 'below' } } : {}} />

                    <Form.Input onChange={formik.handleChange} value={formik.values.maxSalary} id='maxSalary' name='maxSalary' type='number' label='Maximum Maaş' placeholder='10000₺'
                        {...formik.errors.maxSalary && formik.touched.maxSalary ? { error: { content: formik.errors.maxSalary, pointing: 'below' } } : {}} />
                </Form.Group>

                <Form.Group widths='equal'>
                    <Form.Input onChange={formik.handleChange} value={formik.values.positionCount} id='positionCount' name='positionCount' type='number' label='Açık Pozisyon Sayısı'
                        {...formik.errors.positionCount && formik.touched.positionCount ? { error: { content: formik.errors.positionCount, pointing: 'below' } } : {}} />
                    <Form.Input onChange={formik.handleChange} value={formik.values.lastApplyDate} id='lastApplyDate' name='lastApplyDate' type='date' label='Son Başvuru Tarihi'
                        {...formik.errors.lastApplyDate && formik.touched.lastApplyDate ? { error: { content: formik.errors.lastApplyDate, pointing: 'below' } } : {}} />
                </Form.Group>

                <Form.TextArea onChange={formik.handleChange} value={formik.values.description} id='description' name='description' label='Açıklama' placeholder='İlanınızı ve isteklerinizi açıklayın...'
                    {...formik.errors.description && formik.touched.description ? { error: { content: formik.errors.description, pointing: 'below' } } : {}} />

                <Button id='submitButton' type='submit' fluid circular color='vk' style={{ marginTop: '2em' }} animated='vertical'>
                    <Button.Content visible>Oluştur</Button.Content>
                    <Button.Content hidden>
                        <Icon name='add' />
                    </Button.Content>
                </Button>
            </Form>
        </div>
    );
}
