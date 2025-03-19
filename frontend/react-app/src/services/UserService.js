import axios from './axios';
export default class UserService {

getAllUsers() {
        return axios.get('users')
}

 getOneUserById(userId){
    return axios.get(`/users/${userId}`)
}

 createUser(userData){
    return axios.post('/users', userData)
}

 updateUserById(userId, userData){
    return axios.put(`/users/${userId}`, userData)
}

 deleteUserById(userId){
    return axios.delete(`/users/${userId}`)
}

searchUsers(query) {
    return axios.get('/users/search', { params: { q: query } });
}
}