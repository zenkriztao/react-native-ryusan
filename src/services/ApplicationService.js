import ApiService from "./ApiService";

let _applicationService = null;

class ApplicationService {
    getLeaderboard() {
        return new Promise((resolve, reject) => {
            return ApiService.get("/quizzes/stats")
                .then(response => {
                    resolve(response);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    getQuizList() {
        return new Promise((resolve, reject) => {
            return ApiService.get("/quizzes")
                .then(response => {
                    resolve(response);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    getUserToken() {
        return localStorage.getItem("token");
    }

    removeUserToken() {
        return localStorage.removeItem("token");
    }

    setUserToken(token) {
        return localStorage.setItem("token", token);
    }

    logout() {
        return new Promise((resolve, reject) => {
            ApiService.post("/auth/logout")
                .then(response => {
                    this.removeUserToken();
                    resolve(response.data);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    authenticateUser() {
        return new Promise((resolve, reject) => {
            ApiService.get("/auth/user")
                .then(response => {
                    resolve(response.data);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    register(name = null, password = null) {
        return new Promise((resolve, reject) => {
            ApiService.post("/auth/signup", { name, password })
                .then(response => {
                    resolve(response.data);
                })
                .catch(err => {
                    reject(err.response.data.errors);
                });
        });
    }

    login(name = null, password = null) {
        return new Promise((resolve, reject) => {
            ApiService.post("/auth/login", { name, password })
                .then(response => {
                    this.setUserToken(response.data.token);
                    resolve(response.data);
                })
                .catch(err => {
                    reject(err.response.data.errors);
                });
        });
    }
}

_applicationService = new ApplicationService();
export default _applicationService;
