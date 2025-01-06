import axios from './axios';
export default class PostService {

getAllPosts(userId) {
        var url = userId ? `/posts?userId=${userId}` : '/posts';
        return axios.get(url);
};

 getOnePostById(postId){
    return axios.get(`/posts/${postId}`)
};

// Yeni post oluşturma
 createPost(postData){
    return axios.post('/posts', postData)
};

// Post güncelleme
 updatePostById(postId, postData){
    return axios.put(`/posts/${postId}`, postData)
};

// Post silme
 deletePostById(postId){
    return axios.delete(`/posts/${postId}`)
};
}; 