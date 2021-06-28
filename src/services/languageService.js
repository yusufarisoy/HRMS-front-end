import axios from 'axios';

export default class LanguageService {

    getByResumeId = resumeId => {
        return axios.get('http://localhost:8080/api/languages/get-by-resume-id?resumeId=' + resumeId);
    }
   
}