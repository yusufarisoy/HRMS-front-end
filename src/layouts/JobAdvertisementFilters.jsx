import React, { useState } from 'react';
import { Label, Menu, Form, Select, Button, Icon } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';

export default function JobAdvertisementFilters({ adCount, applyFilters, handlePageSizeChange }) {

    const [filterCity, setFilterCity] = useState('');
    const [filterJobTime, setFilterJobTime] = useState('');

    const cities = [
        { key: 'cityIstanbul', text: 'İstanbul', value: 'İstanbul' },
        { key: 'cityAnkara', text: 'Ankara', value: 'Ankara' },
        { key: 'cityBursa', text: 'Bursa', value: 'Bursa' },
        { key: 'cityIzmir', text: 'İzmir', value: 'İzmir' },
        { key: 'cityKirklareli', text: 'Kırklareli', value: 'Kırklareli' }
    ];

    const pageSizes = [
        { key: 'pageSize10', text: '10', value: '10' },
        { key: 'pageSize20', text: '20', value: '20' },
        { key: 'pageSize50', text: '50', value: '50' },
        { key: 'pageSize100', text: '100', value: '100' }
    ];

    function filterCityChangeHander(event, { name, value }) {
        setFilterCity(value);
    }

    function filterJobTimeChangeHander(event, { name, value }) {
        setFilterJobTime(value);
    }

    function filterSubmitHandler(event) {
        event.preventDefault();
        if (filterCity !== '' || filterJobTime !== '') {
            applyFilters(filterCity, filterJobTime);
        }
    }

    function pageSizeChangeHandler(event, { name, value }) {
        handlePageSizeChange(value);
    }

    return (
        <div>
            <Menu vertical>
                <Form onSubmit={filterSubmitHandler}>
                    <Menu.Item>
                        <Label color='teal'>{adCount}</Label>
                        Ilan sayisi
                    </Menu.Item>

                    <Menu.Item style={{ paddingLeft: '0.4em' }}>
                        <Select onChange={filterCityChangeHander} name='filterCity' placeholder='Sehir secin' options={cities} />
                    </Menu.Item>

                    <Menu.Item>
                        <Form.Group grouped>
                            <Form.Radio onChange={filterJobTimeChangeHander} value='Tam Zamanlı' label='Tam Zamanlı' name='filterJobTime' />
                            <Form.Radio onChange={filterJobTimeChangeHander} value='Yarı Zamanlı' label='Yarı Zamanlı' name='filterJobTime' />
                        </Form.Group>
                    </Menu.Item>

                    <Menu.Item>
                        <Button color='blue' type='submit' fluid>Filtrele</Button>
                    </Menu.Item>
                </Form>
            </Menu>
            <Form.Group>
                <label>Sayfa Basi Ilan</label>
                <Select onChange={pageSizeChangeHandler} name='pageSize' options={pageSizes} defaultValue='10' labeled />
            </Form.Group>
            <Button as={NavLink} to='/job-ads/add' animated='fade' circular size='large' color='teal' style={{ marginTop: '1.5em', width: '210px', boxShadow: 'rgba(0, 0, 0, 0.3) 0px 15px 38px, rgba(0, 0, 0, 0.22) 0px 10px 12px' }}>
                <Button.Content visible>Yeni Ilan Ekle</Button.Content>
                <Button.Content hidden><Icon name='add' /></Button.Content>
            </Button>
        </div>
    );
}
