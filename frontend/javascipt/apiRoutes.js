const apiRoute = (route) =>{
    const api ={
        signup: "http://localhost:8080/api/users/signup",
        login: "http://localhost:8080/api/users/login"
    }
    return api[route];
};