import axios from 'axios';

export default class JobAdvertisementService {
    add = body => {
        return axios.post('http://localhost:8080/api/job-advertisements/add', body);
    }

    getJobAdvertisementsByStatus = (approvalStatus, status) => {
        return axios.get('http://localhost:8080/api/job-advertisements/get-by-status?approvalStatus=' + approvalStatus + '&status=' + status);
    }

    getJobAdvertisementsByStatusAndReleaseDate = () => {
        //TODO: implement
    }

    getJobAdvertisementsByStatusAndEmployer = () => {
        //TODO: implement
    }

    closeJobAdvertisement = () => {
        //TODO: implement
    }
}
