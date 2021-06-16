import axios from 'axios';

export default class PositionService {
    getPositions = () => {
        return axios.get('http://localhost:8080/api/positions/get-all');
    }

    getPositionsByEmployerId = (employerId) => {
        return axios.get('http://localhost:8080/api/positions/get-by-employer-id?employerId=' + employerId);
    }

    addPosition = () => {
        //TODO: implement
    }
}
