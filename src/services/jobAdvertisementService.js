import axios from 'axios';

export default class JobAdvertisementService {
    add = body => {
        return axios.post('http://localhost:8080/api/job-advertisements/add', body);
    }

    getJobAdvertisementsByStatus = (approvalStatus, status, page, pageSize) => {
        return axios.get('http://localhost:8080/api/job-advertisements/get-by-status?approvalStatus=' + approvalStatus + '&page=' + page + '&pageSize=' + pageSize + '&status=' + status);
    }

    //Filters
    getByStatusAndCityAndJobTimeName = (status, city, jobTimeName) => {
        return axios.get('http://localhost:8080/api/job-advertisements/get-by-status-and-city-and-job-time-name?city=' + city + '&jobTimeName=' + jobTimeName + '&status=' + status);
    }
    getByStatusAndCity = (status, city) => {
        return axios.get('http://localhost:8080/api/job-advertisements/get-by-status-and-city?city=' + city + '&status=' + status);
    }
    getByStatusAndJobTimeName = (status, jobTimeName) => {
        return axios.get('http://localhost:8080/api/job-advertisements/get-by-status-and-job-time-name?jobTimeName=' + jobTimeName + '&status=' + status);
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
