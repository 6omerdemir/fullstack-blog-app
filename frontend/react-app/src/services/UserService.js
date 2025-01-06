import axios from './axios';
export default class UserService {

getAllUsers() {
        return axios.get('users')
}

 getOneUserById(userId){
    return axios.get(`/users/${userId}`)
}

// Yeni post oluşturma
 createUser(userData){
    return axios.post('/users', userData)
}

// Post güncelleme
 updateUserById(userId, userData){
    return axios.put(`/users/${userId}`, userData)
}

// Post silme
 deleteUserById(userId){
    return axios.delete(`/users/${userId}`)
}
}