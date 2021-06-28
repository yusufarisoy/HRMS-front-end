import React from 'react';
import EmployeeList from '../pages/EmployeeList';
import EmployeeDetail from '../pages/EmployeeDetail';
import EmployerList from '../pages/EmployerList';
import EmployerDetail from '../pages/EmployerDetail';
import JobAdvertisementList from '../pages/JobAdvertisementList';
import JobAdvertisementDetail from '../pages/JobAdvertisementDetail';
import JobAdvertisementAdd from '../pages/JobAdvertisementAdd';
import { Grid } from 'semantic-ui-react';
import { Route } from 'react-router';
import ResumeEdit from '../pages/ResumeEdit';
import ResumeList from '../pages/ResumeList';
import EmployerEdit from '../pages/EmployerEdit';
import SystemStaffEdit from '../pages/SystemStaffEdit';

export default function Main() {
    return (
        <div className='main-content'>
            <Grid centered>
                <Route exact path='/' component={JobAdvertisementList} />
                <Route exact path='/job-ads' component={JobAdvertisementList} />
                <Route exact path='/job-ads/detail/:id' component={JobAdvertisementDetail} />
                <Route exact path='/job-ads/add' component={JobAdvertisementAdd} />

                <Route exact path='/employees' component={EmployeeList} />
                <Route exact path='/employees/detail/:id' component={EmployeeDetail} />

                <Route exact path='/employers' component={EmployerList} />
                <Route exact path='/employers/detail/:id' component={EmployerDetail} />

                <Route exact path='/employee/resumes' component={ResumeList} />
                <Route exact path='/employee/resumes/edit/:id' component={ResumeEdit} />
                
                <Route exact path='/employer/profile/edit' component={EmployerEdit} />
                
                <Route exact path='/system-staff/profile/edit' component={SystemStaffEdit} />
            </Grid>
        </div>
    );
}
