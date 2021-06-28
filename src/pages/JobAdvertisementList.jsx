import React, { useState, useEffect } from 'react';
import JobAdvertisementService from '../services/jobAdvertisementService';
import { Grid, Card, Image, Icon, Button, Pagination } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';
import JobAdvertisementFilters from '../layouts/JobAdvertisementFilters';
import EmployeeService from '../services/employeeService';

export default function JobAdvertisementList() {

    const [adCount, setAdCount] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const employeeService = new EmployeeService();
    const jobAdvertisementsService = new JobAdvertisementService();
    const [jobAdvertisements, setJobAdvertisements] = useState([]);

    useEffect(() => {
        let jobAdvertisementsService = new JobAdvertisementService();
        jobAdvertisementsService.getJobAdvertisementsByStatus(1, true, page, pageSize).then(results => {
            setJobAdvertisements(results.data.data);
            setAdCount(results.data.data.length);
        });
    }, []);

    function addToFavorite(jobAdvertisementId) {
        //Employee id is static for now, will come from session
        employeeService.addJobAdvertisementToFavorites({ employeeId: 1, jobAdvertisementId: jobAdvertisementId });
    };

    function applyFilters(city, jobTime) {
        if (city !== '' && jobTime !== '') {
            jobAdvertisementsService.getByStatusAndCityAndJobTimeName(true, city, jobTime).then(results => {
                setJobAdvertisements(results.data.data);
                setAdCount(results.data.data.length);
            });
        } else if (city !== '') {
            jobAdvertisementsService.getByStatusAndCity(true, city).then(results => {
                setJobAdvertisements(results.data.data);
                setAdCount(results.data.data.length);
            });
        } else {
            jobAdvertisementsService.getByStatusAndJobTimeName(true, jobTime).then(results => {
                setJobAdvertisements(results.data.data);
                setAdCount(results.data.data.length);
            });
        }
    }

    function handlePageChange(event, { activePage }) {
        setPage(activePage);
        jobAdvertisementsService.getJobAdvertisementsByStatus(1, true, activePage, pageSize).then(results => {
            setJobAdvertisements(results.data.data);
            setAdCount(results.data.data.length);
        });
    }

    function handlePageSizeChange(selectedPageSize) {
        setPageSize(parseInt(selectedPageSize));
        jobAdvertisementsService.getJobAdvertisementsByStatus(1, true, page, pageSize).then(results => {
            setJobAdvertisements(results.data.data);
            setAdCount(results.data.data.length);
            console.log(page)
            console.log(pageSize)
        });
    }

    return (
        <Grid.Row>
            <Grid.Column width={4}>
                <JobAdvertisementFilters adCount={adCount} applyFilters={applyFilters} handlePageSizeChange={handlePageSizeChange} />
            </Grid.Column>
            <Grid.Column width={12}>
                <Card.Group itemsPerRow={3} style={{ marginBottom: '2em' }}>
                    {
                        jobAdvertisements.map(ad => (
                            <Card color={ad.minSalary > 10000 ? 'red' : 'teal'} key={ad.id}>
                                <Image as={NavLink} to={`/job-ads/detail/${ad.id}`} label={{
                                    color: ad.workStyle === 'Uzaktan' ? 'blue' : 'teal',
                                    content: ad.workStyle,
                                    icon: ad.workStyle === 'Uzaktan' ? 'desktop' : 'suitcase',
                                    ribbon: true
                                }}
                                    src={ad.id % 2 === 0 ? 'https://www.onlinelogomaker.com/blog/wp-content/uploads/2017/07/door-company-logo.jpg' : 'https://image.freepik.com/free-vector/technology-company-logo-template_1061-20.jpg'} wrapped ui={false} />
                                <Card.Content as={NavLink} to={`/job-ads/detail/${ad.id}`}>
                                    <Card.Header>{ad.position.name}</Card.Header>
                                    <Card.Meta>{ad.position.employer.name}</Card.Meta>
                                    <Card.Meta style={{ marginBottom: '1em' }}>{ad.city} <Icon name='map marker alternate' /></Card.Meta>
                                    <Card.Description>{ad.description}</Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <Icon name='check' color='green' /> {ad.positionCount} pozisyon
                                    <Button onClick={() => addToFavorite(ad.id)} floated='right' circular icon basic><Icon name='bookmark outline' /></Button>
                                </Card.Content>
                            </Card>
                        ))
                    }
                </Card.Group>

                <Pagination
                    activePage={page}
                    boundaryRange={1}
                    siblingRange={1}
                    onPageChange={handlePageChange}
                    totalPages={10}
                    ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
                    firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                    lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                    prevItem={{ content: <Icon name='angle left' />, icon: true }}
                    nextItem={{ content: <Icon name='angle right' />, icon: true }} />
            </Grid.Column>
        </Grid.Row>
    );
}
