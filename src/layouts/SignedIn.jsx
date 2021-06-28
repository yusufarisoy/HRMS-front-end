import React from 'react';
import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function SignedIn({ signOut, session }) {

    return (
        <div>
            <Menu.Item>
                <Image avatar spaced='right' src='https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4.png' />
                <Dropdown pointing='top right' text={session.name}>
                    <Dropdown.Menu>
                        <Dropdown.Item as={Link} to='/system-staff/profile/edit' text='Bilgilerim (System Staff)' icon='user secret' />
                        <Dropdown.Divider />
                        <Dropdown.Item as={Link} to='/employer/profile/edit' text='Bilgilerim (Employer)' icon='user circle' />
                        <Dropdown.Divider />
                        <Dropdown.Item as={Link} to='/employee/favorites' text='Favorilerim (Employee)' icon='heart' />
                        <Dropdown.Item as={Link} to='/employee/resumes' text='CVlerim' icon='file text' />
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={signOut} text='Çıkış Yap' icon='sign-out' />
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
        </div>
    );
}
