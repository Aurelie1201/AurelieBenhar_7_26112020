const apiRoute = (route) =>{
    const api ={
        signup: "http://localhost:8080/api/users/signup",
        login: "http://localhost:8080/api/users/login",
        getOneUser: "http://localhost:8080/api/users/",
        postMessage: "http://localhost:8080/api/messages/"
    }
    return api[route];
};