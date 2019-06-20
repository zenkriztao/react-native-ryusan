import axios from "axios";

let _apiService = null;

class ApiService {
    get(endpoint, options = null) {
        return axios.get(endpoint, options);
    }

    post(endpoint = "", data = {}, options) {
        return axios.post(endpoint, data, options);
    }
}

_apiService = new ApiService();
export default _apiService;
