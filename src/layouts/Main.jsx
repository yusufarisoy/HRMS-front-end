import React from 'react';
import EmployeeList from '../pages/EmployeeList';
import EmployeeDetail from '../pages/EmployeeDetail';
import EmployerList from '../pages/EmployerList';
import EmployerDetail from '../pages/EmployerDetail';
import JobAdvertisementList from '../pages/JobAdvertisementList';
import JobAdvertisementDetail from '../pages/JobAdvertisementDetail';
import JobAdvertisementAdd from '../pages/JobAdvertisementAdd';
import Filters from './Filters';
import { Grid } from 'semantic-ui-react';
import { Route } from 'react-router';

export default function Main() {
    return (
        <div className='main-content'>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <Filters />
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Route exact path='/' component={JobAdvertisementList} />
                        <Route exact path='/job-ads/get/:id' component={JobAdvertisementDetail} />
                        <Route exact path='/job-ads/add' component={JobAdvertisementAdd} />

                        <Route exact path='/employees' component={EmployeeList} />
                        <Route exact path='/employees/:id' component={EmployeeDetail} />
                        
                        <Route exact path='/employers' component={EmployerList} />
                        <Route exact path='/employers/:id' component={EmployerDetail} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    );
}
