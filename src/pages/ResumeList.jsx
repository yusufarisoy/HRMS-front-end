import React, { useState, useEffect } from 'react';
import { Button, Grid, Card } from 'semantic-ui-react';
import ResumeService from '../services/resumeService';
import { NavLink } from 'react-router-dom';

export default function ResumeList() {

    const [resumes, setResumes] = useState([]);

    useEffect(() => {
        let resumeService = new ResumeService();
        resumeService.getResumesByEmployee(2).then(results => setResumes(results.data.data));
    }, [])

    return (
        <Grid.Row>
            <Grid.Column width={16}>
                <Card.Group itemsPerRow={3}>
                    {
                        resumes.map(resume => (
                            <Card key={resume.id}>
                                <Card.Content>
                                    <Card.Header>{resume.createDate.slice(0, 10)}</Card.Header>
                                    <Card.Meta>{resume.linkedInUrl}</Card.Meta>
                                    <Card.Meta>{resume.githubUrl}</Card.Meta>
                                    <Card.Description>{resume.description}</Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <Button as={NavLink} to={`/employee/resumes/edit/${resume.id}`} color='blue' floated='right' size='tiny'>Düzenle</Button>
                                </Card.Content>
                            </Card>
                        ))
                    }
                </Card.Group>
            </Grid.Column>
        </Grid.Row>
    );
}
