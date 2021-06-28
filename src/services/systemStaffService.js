import axios from 'axios';

export default class SystemStaffService {

    updateInformation = body => {
        return axios.post('http://localhost:8080/api/system-staff/profile/edit', body);
    }
}