import axios from 'axios';

export default class EmployeeService {
    getEmployees = () => {
        return axios.get('http://localhost:8080/api/employees/get-all');
    }

    addEmployee = () => {
        //TODO: implement
    }

    addJobAdvertisementToFavorites = body => {
        return axios.post('http://localhost:8080/api/employee-favorite-job-advertisements/add', body);
    }
}
