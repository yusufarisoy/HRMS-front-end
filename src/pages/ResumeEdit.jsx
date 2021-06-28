import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import { Grid, Button, Divider, Form as SemanticForm, Icon, Message } from 'semantic-ui-react';
import EducationService from '../services/educationService';
import ExperienceService from '../services/experienceService';
import LanguageService from '../services/languageService';
import TechnologyService from '../services/technologyService';
import ResumeService from '../services/resumeService';

export default function ResumeEdit() {

    const resumeId = 2;
    const [resume, setResume] = useState({
        photoUrl: '',
        githubUrl: '',
        linkedInUrl: '',
        description: '',
    });
    const [educations, setEducations] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [technologies, setTechnologies] = useState([]);

    const deletedEducations = [];
    const deletedExperiences = [];
    const deletedLanguages = [];
    const deletedTechnologies = [];
    const history = useHistory();

    useEffect(() => {
        let resumeService = new ResumeService();
        resumeService.getById(resumeId).then(results => setResume(results.data.data));

        let educationService = new EducationService();
        educationService.getByResumeId(resumeId).then(results => {
            results.data.data.forEach(result => {
                result.startDate = result.startDate.slice(0, 10);
                result.finishDate = result.finishDate.slice(0, 10);
            });
            setEducations(results.data.data);
        });

        let experienceService = new ExperienceService();
        experienceService.getByResumeId(resumeId).then(results => {
            results.data.data.forEach(result => {
                result.startDate = result.startDate.slice(0, 10);
                result.finishDate = result.finishDate.slice(0, 10);
            });
            setExperiences(results.data.data);
        });

        let languageService = new LanguageService();
        languageService.getByResumeId(resumeId).then(results => setLanguages(results.data.data));

        let technologyService = new TechnologyService();
        technologyService.getByResumeId(resumeId).then(results => setTechnologies(results.data.data));
    }, []);

    function addToDeletedEducations(id) {
        if (id !== -1) {
            deletedEducations.push(id);
        }
    }
    function addToDeletedExperiences(id) {
        if (id !== -1) {
            deletedExperiences.push(id);
        }
    }
    function addToDeletedLanguages(id) {
        if (id !== -1) {
            deletedLanguages.push(id);
        }
    }
    function addToDeletedTechnologies(id) {
        if (id !== -1) {
            deletedTechnologies.push(id);
        }
    }

    const initialValues = {
        id: resumeId,
        photoUrl: resume.photoUrl,
        githubUrl: resume.githubUrl,
        linkedInUrl: resume.linkedInUrl,
        description: resume.description,
        educationEditDtoList: educations,
        experienceEditDtoList: experiences,
        languageEditDtoList: languages,
        technologyEditDtoList: technologies,
        educationDeleteList: [],
        experienceDeleteList: [],
        languageDeleteList: [],
        technologyDeleteList: []
    };

    const educationsValidationSchema = Yup.object().shape({
        id: Yup.number(),
        name: Yup.string().required('Boş bırakılamaz'),
        department: Yup.string().required('Boş bırakılamaz'),
        startDate: Yup.date().required('Boş bırakılamaz'),
        finishDate: Yup.date().required('Boş bırakılamaz')
    });

    const experiencesValidationSchema = Yup.object().shape({
        id: Yup.number(),
        name: Yup.string().required('Boş bırakılamaz'),
        department: Yup.string().required('Boş bırakılamaz'),
        startDate: Yup.date().required('Boş bırakılamaz'),
        finishDate: Yup.date().required('Boş bırakılamaz')
    });

    const languagesValidationSchema = Yup.object().shape({
        id: Yup.number(),
        name: Yup.string().required('Boş bırakılamaz'),
        level: Yup.number().required('Boş bırakılamaz')
    });

    const technologiesValidationSchema = Yup.object().shape({
        id: Yup.number(),
        name: Yup.string().required('Boş bırakılamaz')
    });

    const validationSchema = Yup.object({
        id: Yup.number(),
        photoUrl: Yup.string(),
        linkedInUrl: Yup.string().required('Boş bırakılamaz'),
        githubUrl: Yup.string(),
        description: Yup.string().required('Boş bırakılamaz'),
        educationEditDtoList: Yup.array().of(educationsValidationSchema),
        experienceEditDtoList: Yup.array().of(experiencesValidationSchema),
        languageEditDtoList: Yup.array().of(languagesValidationSchema),
        technologyEditDtoList: Yup.array().of(technologiesValidationSchema)
    });

    return (
        <Grid.Row>
            <Grid.Column width={12}>
                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        values.educationDeleteList = deletedEducations;
                        values.experienceDeleteList = deletedExperiences;
                        values.languageDeleteList = deletedLanguages;
                        values.technologyDeleteList = deletedTechnologies;
                        let resumeService = new ResumeService();
                        resumeService.edit(values);
                        history.push('/resumes');
                    }}>

                    {({ values }) => (
                        <Form className='ui form' style={{ padding: '1em', marginBottom: '2em', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px', borderRadius: '10px' }}>
                            <Divider horizontal style={{ marginBottom: '2em' }}>CV Duzenle</Divider>
                            <SemanticForm.Field>
                                <label>Resim URL</label>
                                <Field name='photoUrl' placeholder='Resim' />
                                <ErrorMessage name="photoUrl" render={msg => <Message error header='Hata' content={msg} />} />
                            </SemanticForm.Field>

                            <SemanticForm.Field style={{ marginTop: '1em' }}>
                                <label>Github</label>
                                <Field name='githubUrl' placeholder='www.github.com/' />
                                <ErrorMessage name="githubUrl" />
                            </SemanticForm.Field>

                            <SemanticForm.Field style={{ marginTop: '1em' }}>
                                <label>LinkedIn</label>
                                <Field name='linkedInUrl' placeholder='www.linkedin.com/' />
                                <ErrorMessage name="linkedInUrl" />
                            </SemanticForm.Field>

                            <SemanticForm.Field style={{ marginTop: '1em', marginBottom: '3em' }} >
                                <label>Aciklama</label>
                                <Field name='description' placeholder='Açıklama' />
                                <ErrorMessage name="description" />
                            </SemanticForm.Field>

                            <FieldArray name='educationEditDtoList' render={arrayHelpers => (
                                <div style={{ clear: 'both', border: '1px solid #d1d4d7', borderRadius: '10px', padding: '1em 1em 0 1em', overflow: 'auto', marginBottom: '2em' }}>
                                    <div>
                                        <h3 style={{ float: 'left', marginBottom: '1em', paddingTop: '8px' }}>Eğitim</h3>
                                        <Button onClick={() => arrayHelpers.push({ id: -1, name: '', department: '', startDate: '', finishDate: '' })} type='button' color='teal' floated='right'><Icon name='add' /> Ekle</Button>
                                    </div>
                                    {values.educationEditDtoList.map((education, index) => (
                                        <div key={index}>
                                            <SemanticForm.Group widths='equal' style={{ clear: 'both' }} >
                                                <Field name={`educationEditDtoList[${index}].name`} placeholder='Okul Adı' style={{ marginRight: '1em' }} />
                                                <Field name={`educationEditDtoList[${index}].department`} placeholder='Bölümü' />
                                            </SemanticForm.Group>
                                            <SemanticForm.Group widths='equal'>
                                                <Field name={`educationEditDtoList[${index}].startDate`} type='date' style={{ marginRight: '1em' }} />
                                                <Field name={`educationEditDtoList[${index}].finishDate`} type='date' />
                                            </SemanticForm.Group>
                                            <Button onClick={() => { arrayHelpers.remove(index); addToDeletedEducations(education.id); }} type='button' color='red' icon floated='right' style={{ marginBottom: '1em', marginTop: '-0.5em' }}><Icon name='trash' /></Button>
                                        </div>
                                    ))}
                                </div>
                            )} />

                            <FieldArray name='experienceEditDtoList' render={arrayHelpers => (
                                <div style={{ clear: 'both', border: '1px solid #d1d4d7', borderRadius: '10px', padding: '1em 1em 0 1em', overflow: 'auto', marginBottom: '2em' }}>
                                    <div>
                                        <h3 style={{ float: 'left', marginBottom: '1em', paddingTop: '8px' }}>Tecrübe</h3>
                                        <Button onClick={() => arrayHelpers.push({ id: -1, name: '', department: '', startDate: '', finishDate: '' })} type='button' color='teal' floated='right'><Icon name='add' /> Ekle</Button>
                                    </div>
                                    {values.experienceEditDtoList.map((experience, index) => (
                                        <div key={index}>
                                            <SemanticForm.Group widths='equal' style={{ clear: 'both' }}>
                                                <Field name={`experienceEditDtoList[${index}].name`} placeholder='İşyeri Adı' style={{ marginRight: '1em' }} />
                                                <Field name={`experienceEditDtoList[${index}].department`} placeholder='Departmanı' />
                                            </SemanticForm.Group>
                                            <SemanticForm.Group widths='equal'>
                                                <Field name={`experienceEditDtoList[${index}].startDate`} type='date' style={{ marginRight: '1em' }} />
                                                <Field name={`experienceEditDtoList[${index}].finishDate`} type='date' />
                                            </SemanticForm.Group>
                                            <Button onClick={() => { arrayHelpers.remove(index); addToDeletedExperiences(experience.id); }} type='button' color='red' icon floated='right' style={{ marginBottom: '1em', marginTop: '-0.5em' }}><Icon name='trash' /></Button>
                                        </div>
                                    ))}
                                </div>
                            )} />

                            <FieldArray name='languageEditDtoList' render={arrayHelpers => (
                                <div style={{ clear: 'both', border: '1px solid #d1d4d7', borderRadius: '10px', padding: '1em 1em 0 1em', overflow: 'auto', marginBottom: '2em' }}>
                                    <div>
                                        <h3 style={{ float: 'left', marginBottom: '1em', paddingTop: '8px' }}>Dil</h3>
                                        <Button onClick={() => arrayHelpers.push({ id: -1, name: '', level: '' })} type='button' color='teal' floated='right'><Icon name='add' /> Ekle</Button>
                                    </div>
                                    {values.languageEditDtoList.map((language, index) => (
                                        <div key={index}>
                                            <SemanticForm.Group widths='equal' style={{ clear: 'both' }}>
                                                <Field name={`languageEditDtoList[${index}].name`} placeholder='Dil' style={{ marginRight: '1em' }} />
                                                <Field name={`languageEditDtoList[${index}].level`} placeholder='Seviye' />
                                            </SemanticForm.Group>
                                            <Button onClick={() => { arrayHelpers.remove(index); addToDeletedLanguages(language.id); }} type='button' color='red' icon floated='right' style={{ marginBottom: '1em', marginTop: '-0.5em' }}><Icon name='trash' /></Button>
                                        </div>
                                    ))}
                                </div>
                            )} />

                            <FieldArray name='technologyEditDtoList' render={arrayHelpers => (
                                <div style={{ clear: 'both', border: '1px solid #d1d4d7', borderRadius: '10px', padding: '1em 1em 0 1em', overflow: 'auto', marginBottom: '2em' }}>
                                    <div>
                                        <h3 style={{ float: 'left', marginBottom: '1em', paddingTop: '8px' }}>Teknoloji</h3>
                                        <Button onClick={() => arrayHelpers.push({ id: -1, name: '', level: '' })} type='button' color='teal' floated='right'><Icon name='add' /> Ekle</Button>
                                    </div>
                                    {values.technologyEditDtoList.map((technology, index) => (
                                        <div key={index}>
                                            <Field name={`technologyEditDtoList[${index}].name`} placeholder='Dil' style={{ clear: 'both' }} />
                                            <Button onClick={() => { arrayHelpers.remove(index); addToDeletedTechnologies(technology.id); }} type='button' color='red' icon floated='right' style={{ marginBottom: '1em', marginTop: '0.5em' }}><Icon name='trash' /></Button>
                                        </div>
                                    ))}
                                </div>
                            )} />

                            <div style={{ clear: 'both' }}>
                                <Button as={Link} to='/resumes' type='button' style={{ width: '49%' }}>Vazgec</Button>
                                <Button color='linkedin' type='submit' style={{ width: '49%', marginLeft: '1%' }}>Kaydet</Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Grid.Column>
        </Grid.Row >
    );
}
