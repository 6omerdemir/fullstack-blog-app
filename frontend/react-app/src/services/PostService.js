import axios from './axios';
export default class PostService {

 getAllPosts(){
    return axios.get('/posts');
};

 getPostById = (postId) => {
    return axios.get(`/posts/${postId}`)
};

// Yeni post oluşturma
 createPost = (postData) => {
    return axios.post('/posts', postData)
        .then(response => response.data);
};

// Post güncelleme
 updatePost = (postId, postData) => {
    return axios.put(`/posts/${postId}`, postData)
        .then(response => response.data);
};

// Post silme
 deletePost = (postId) => {
    return axios.delete(`/posts/${postId}`)
        .then(response => response.data);
};
}; 