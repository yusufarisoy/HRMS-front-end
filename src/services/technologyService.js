import axios from 'axios';

export default class TechnologyService {

    getByResumeId = resumeId => {
        return axios.get('http://localhost:8080/api/technologies/get-by-resume-id?resumeId=' + resumeId);
    }

}