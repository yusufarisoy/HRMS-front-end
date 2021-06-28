import axios from 'axios';

export default class EmployerService {

    login = () => {
        //TODO
    }

    register = () => {
        //TODO: implement
    }

    getEmployers = () => {
        return axios.get('http://localhost:8080/api/employers/get-all');
    }

    //INFORMATION UPDATE
    addInformationUpdate = body => {
        return axios.post('http://localhost:8080/api/employer-information-updates/add', body);
    }

    getWaitingUpdateByEmployerId = employerId => {
        return axios.get('http://localhost:8080/api/employer-information-updates/get-waiting-update-by-employer-id?employerId=' + employerId);
    }
}