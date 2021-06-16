import React, { useState, useEffect } from 'react';
import EmployerService from '../services/employerService';
import { Icon, Card, Image, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

export default function EmployerList() {

    const [employers, setEmployers] = useState([]);

    useEffect(() => {
        let employerService = new EmployerService();
        employerService.getEmployers().then(result => setEmployers(result.data.data));
    }, []);

    return (
        <div>
            <Card.Group itemsPerRow={2}>
                {
                    employers.map(employer => (
                        <Card key={employer.id} as={NavLink} to={`/employers/${employer.id}`} >
                            <Card.Content verticalAlign='middle' style={{ textAlign: 'center' }}>
                                <Image style={{width: '100px', height: '100px'}} src={employer.id % 2 === 0 ? 'https://www.onlinelogomaker.com/blog/wp-content/uploads/2017/07/door-company-logo.jpg' : 'https://image.freepik.com/free-vector/technology-company-logo-template_1061-20.jpg'} />
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
        </div>
    );
}
