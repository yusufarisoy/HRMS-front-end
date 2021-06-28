import axios from 'axios';

export default class ResumeService {
    
    addEmployee = () => {
        //TODO: implement
    }

    uploadImage = () => {
        //TODO: implement
    }

    getResumesSortedByGraduationDate = () => {
        //TODO: implement
    }

    getResumesSortedByExperienceYear = () => {
        //TODO: implement
    }

    getById = id => {
        return axios.get('http://localhost:8080/api/resumes/get-by-id?id=' + id);
    }

    getResumesByEmployee = employeeId => {
        return axios.get('http://localhost:8080/api/resumes/get-by-employee-id?employeeId=' + employeeId);
    }

    edit = body => {
        return axios.post('http://localhost:8080/api/resumes/edit', body);
    }
}
