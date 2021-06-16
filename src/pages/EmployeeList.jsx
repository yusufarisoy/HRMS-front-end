import React, { useState, useEffect } from 'react';
import { Icon, Menu, Table, Header, Image } from 'semantic-ui-react';
import EmployeeService from '../services/employeeService';
import { Link } from 'react-router-dom';

export default function EmployeeList() {

    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        let employeeService = new EmployeeService();
        employeeService.getEmployees().then(result => setEmployees(result.data.data));
    }, []);

    return (
        <div>
            <Table celled basic='very'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>TC No</Table.HeaderCell>
                        <Table.HeaderCell>Ad - Soyad</Table.HeaderCell>
                        <Table.HeaderCell>Pozisyonu</Table.HeaderCell>
                        <Table.HeaderCell>Şirketi</Table.HeaderCell>
                        <Table.HeaderCell>Şirketin Maili</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        employees.map(employee => (
                            <Table.Row key={employee.id}>
                                <Table.Cell>{employee.nationalityId}</Table.Cell>
                                <Table.Cell>
                                    <Header as='h4' image>
                                        <Image src='https://www.kindpng.com/picc/m/22-223941_transparent-avatar-png-male-avatar-icon-transparent-png.png' rounded size='mini' />
                                        <Header.Content>
                                            <Link to={`/employees/${employee.id}`}>{employee.name + ' ' + employee.surname}</Link>
                                            <Header.Subheader>{employee.mail}</Header.Subheader>
                                        </Header.Content>
                                    </Header></Table.Cell>
                                <Table.Cell>{employee.position === null ? 'Açık' : employee.position.name}</Table.Cell>
                                <Table.Cell>{employee.position === null ? '-' : employee.position.employer.name}</Table.Cell>
                                <Table.Cell>{employee.position === null ? '-' : employee.position.employer.mail}</Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>

                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='5'>
                            <Menu floated='right' pagination>
                                <Menu.Item as='a' icon><Icon name='chevron left' /></Menu.Item>
                                <Menu.Item as='a'>1</Menu.Item>
                                <Menu.Item as='a'>2</Menu.Item>
                                <Menu.Item as='a'>3</Menu.Item>
                                <Menu.Item as='a'>4</Menu.Item>
                                <Menu.Item as='a' icon><Icon name='chevron right' /></Menu.Item>
                            </Menu>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </div>
    );
}
