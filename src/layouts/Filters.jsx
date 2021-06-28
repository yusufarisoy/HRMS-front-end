import React from 'react';
import { Label, Menu, Form, Select, Button } from 'semantic-ui-react'

export default function Filters() {

    const cities = [
        { key: 'cityIstanbul', text: 'İstanbul', value: 'İstanbul' },
        { key: 'cityAnkara', text: 'Ankara', value: 'Ankara' },
        { key: 'cityBursa', text: 'Bursa', value: 'Bursa' },
        { key: 'cityIzmir', text: 'İzmir', value: 'İzmir' },
        { key: 'cityKirklareli', text: 'Kırklareli', value: 'Kırklareli' }
    ];

    return (
        <div>
            <Menu vertical>
                <Form>
                    <Menu.Item>
                        <Label color='teal'>1</Label>
                        Ilan sayisi
                    </Menu.Item>

                    <Menu.Item style={{ paddingLeft: '0.4em' }}>
                        <Select name='filterCity' placeholder='Sehir secin' options={cities} />
                    </Menu.Item>

                    <Menu.Item>
                        <Form.Group grouped>
                            <Form.Radio value='Tam Zamanlı' label='Tam Zamanli' name='filterJobTime' />
                            <Form.Radio value='Yarı Zamanlı' label='Yari Zamanli' name='filterJobTime' />
                        </Form.Group>
                    </Menu.Item>

                    <Menu.Item>
                        <Button color='blue' type='button' fluid>Filtrele</Button>
                    </Menu.Item>
                </Form>
            </Menu>
        </div>
    );
}
