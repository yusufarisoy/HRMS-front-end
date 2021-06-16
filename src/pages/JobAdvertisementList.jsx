import React, { useState, useEffect } from 'react';
import JobAdvertisementService from '../services/jobAdvertisementService';
import { Card, Image, Icon, Button } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';

export default function JobAdvertisementList() {

    const [jobAdvertisements, setJobAdvertisements] = useState([]);

    useEffect(() => {
        let jobAdvertisementsService = new JobAdvertisementService();
        jobAdvertisementsService.getJobAdvertisementsByStatus(true, true).then(result => setJobAdvertisements(result.data.data));
    }, []);

    return (
        <div>
            <Card.Group itemsPerRow={3} style={{marginBottom: '2em'}}>
                {
                    jobAdvertisements.map(ad => (
                        <Card color={ad.minSalary > 10000 ? 'red' : 'teal'} key={ad.id} as={NavLink} to={`/job-ads/get/${ad.id}`} >
                            <Image label={{
                                color: ad.workStyle === 'Uzaktan' ? 'blue' : 'teal',
                                content: ad.workStyle,
                                icon: ad.workStyle === 'Uzaktan' ? 'desktop' : 'suitcase',
                                ribbon: true
                            }}
                                src={ad.id % 2 === 0 ? 'https://www.onlinelogomaker.com/blog/wp-content/uploads/2017/07/door-company-logo.jpg' : 'https://image.freepik.com/free-vector/technology-company-logo-template_1061-20.jpg'} wrapped ui={false} />
                            <Card.Content>
                                <Card.Header>{ad.position.name}</Card.Header>
                                <Card.Meta>{ad.position.employer.name}</Card.Meta>
                                <Card.Meta style={{ marginBottom: '1em' }}>{ad.city} <Icon name='map marker alternate' /></Card.Meta>
                                <Card.Description>{ad.description}</Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <Icon name='check' color='green' /> {ad.positionCount} pozisyon
                            </Card.Content>
                        </Card>
                    ))
                }
            </Card.Group>
            <Button as={NavLink} to='/job-ads/add' animated='fade' floated='right' circular size='large' color='blue' style={{width: '120px'}}>
                <Button.Content visible><Icon name='add'/></Button.Content>
                <Button.Content hidden>Ekle</Button.Content>
            </Button>
        </div>
    );
}
