const apiRoute = (route) =>{
    const api ={
        signup: "http://localhost:8080/api/users/signup",
        login: "http://localhost:8080/api/users/login",
        getOneUser: "http://localhost:8080/api/users/",
        message: "http://localhost:8080/api/messages/",
        comment: "http://localhost:8080/api/comments/"
    }
    return api[route];
};

/**
 * Get user ID and return his name
 * @param {Number} userId 
 * @returns String
 */
const getName = async (userId)=>{
    const getUser = await fetch(apiRoute("getOneUser")+userId, { 
        method: "GET", 
        headers:{ Accept: "application/json", Authorization: "Bearer "+sessionStorage.token}
    });
    const user = await getUser.json();
    const firstName = user.firstName;
    const lastName = user.lastName;
    const name = firstName +" "+ lastName;
    return name;
};

/**
 * Get a message Id and return number of comments it has
 * @param {Number} messageId 
 * @returns Number
 */
const getNbComments = async (messageId) =>{
    const NbComments = await fetch(apiRoute("comment")+messageId, {
        method: "GET",
        headers: { Accept: "application/json", Authorization: "Bearer "+sessionStorage.token }
    });
    const comments = await NbComments.json();
    const countComments = comments.count;
    return countComments;
};

/**
 * Get message ID, return all its comments
 * @param {Number} messageId 
 * @returns Array
 */
const getAllComments = async (messageId) =>{
    const NbComments = await fetch(apiRoute("comment")+messageId, {
        method: "GET",
        headers: { Accept: "application/json", Authorization: "Bearer "+sessionStorage.token }
    });
    const allcomments = await NbComments.json();
    const comments = allcomments.rows;
    return comments;
};