import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import SignedIn from './SignedIn';
import SignedOut from './SignedOut';
import { Container, Menu, Input } from 'semantic-ui-react';

export default function Navbar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [session, setSession] = useState({})
    const history = useHistory();

    function handleSignOut() {
        setSession({});
        setIsAuthenticated(false);
        history.push('/');
    }

    function handleSignIn() {
        setIsAuthenticated(true);
        setSession({ id: 1, name: 'Ali Kaya' });//Static for now
    }

    return (
        <div>
            <Menu inverted>
                <Container>
                    <Menu.Item as={NavLink} to='/job-ads' name='Job Ads'/>
                    <Menu.Item as={NavLink} to='/employees' name='Employees'/>
                    <Menu.Item as={NavLink} to='/employers' name='Employers'/>

                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Input icon='search' placeholder='Search...' />
                        </Menu.Item>
                        { isAuthenticated ? <SignedIn session={session} signOut={handleSignOut}/> : <SignedOut signIn={handleSignIn}/> }
                    </Menu.Menu>
                </Container>
            </Menu>
        </div>
    );
}
