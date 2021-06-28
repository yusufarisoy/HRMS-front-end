import axios from 'axios';

export default class EducationService {

    getByResumeId = resumeId => {
        return axios.get('http://localhost:8080/api/educations/get-by-resume-id?resumeId=' + resumeId);
    }

}