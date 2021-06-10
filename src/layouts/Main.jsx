import React from 'react';
import EmployeeList from '../pages/EmployeeList';
import Filters from './Filters';
import { Grid } from 'semantic-ui-react';

export default function Main() {
    return (
        <div className='main-content'>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <Filters />
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <EmployeeList />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    );
}
