import React, { useState, useEffect } from 'react';
import EmployerService from '../services/employerService';
import { Grid, Icon, Card, Image, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import Filters from '../layouts/Filters';

export default function EmployerList() {

    const [employers, setEmployers] = useState([]);

    useEffect(() => {
        let employerService = new EmployerService();
        employerService.getEmployers().then(result => setEmployers(result.data.data));
    }, []);

    return (
        <Grid.Row>
            <Grid.Column width={4}>
                <Filters />
            </Grid.Column>
            <Grid.Column width={12}>
                <Card.Group itemsPerRow={3}>
                    {
                        employers.map(employer => (
                            <Card key={employer.id} as={NavLink} to={`/employers/detail/${employer.id}`} >
                                <Card.Content style={{ textAlign: 'center' }}>
                                    <Image style={{ width: '100px', height: '100px' }} src={employer.id % 2 === 0 ? 'https://www.onlinelogomaker.com/blog/wp-content/uploads/2017/07/door-company-logo.jpg' : 'https://image.freepik.com/free-vector/technology-company-logo-template_1061-20.jpg'} />
                                    <Card.Header>{employer.name}</Card.Header>
                                    <Card.Meta>{employer.mail}</Card.Meta>
                                    <Card.Description><Icon color='green' name='check' /> Onaylı</Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <Button size='small' fluid color='vk'>Başvur</Button>
                                </Card.Content>
                            </Card>
                        ))
                    }
                </Card.Group>
            </Grid.Column>
        </Grid.Row>
    );
}
