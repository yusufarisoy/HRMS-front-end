import axios from 'axios';

export default class ExperienceService {

    getByResumeId = resumeId => {
        return axios.get('http://localhost:8080/api/experiences/get-by-resume-id?resumeId=' + resumeId);
    }

}