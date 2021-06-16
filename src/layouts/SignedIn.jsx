import React from 'react';
import { Menu, Image, Dropdown } from 'semantic-ui-react';

export default function SignedIn({ signOut, session }) {
    return (
        <div>
            <Menu.Item>
                <Image avatar spaced='right' src='https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4.png' />
                <Dropdown pointing='top left' text={session.name}>
                    <Dropdown.Menu>
                        <Dropdown.Item text='Bilgilerim' icon='info' />
                        <Dropdown.Item onClick={signOut} text='Çıkış Yap' icon='sign-out' />
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
        </div>
    );
}
