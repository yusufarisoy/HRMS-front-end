import React from 'react';
import { Container, Menu, Input, Button } from 'semantic-ui-react';

export default function Navbar() {
    return (
        <div>
            <Menu inverted>
                <Container>
                    <Menu.Item>
                        <Button inverted>Home</Button>
                    </Menu.Item>
                    <Menu.Item>
                        <Button inverted color='red'>Job Ads</Button>
                    </Menu.Item>
                    <Menu.Item>
                        <Button inverted color='blue'>Employees</Button>
                    </Menu.Item>
                    <Menu.Item>
                        <Button inverted color='blue'>Employers</Button>
                    </Menu.Item>

                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Input icon='search' placeholder='Search...' />
                        </Menu.Item>
                        <Menu.Item>
                            <Button primary>Sign Up</Button>
                        </Menu.Item>
                    </Menu.Menu>
                </Container>
            </Menu>
        </div>
    );
}
