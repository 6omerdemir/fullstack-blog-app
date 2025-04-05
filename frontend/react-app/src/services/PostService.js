import axios from './axios';

export default class PostService {

getAllPosts(userId) {
        var url = userId ? `/posts?userId=${userId}` : '/posts'
        return axios.get(url)
}

 getOnePostById(postId){
    return axios.get(`/posts/${postId}`)
}

 createPost(postData){
    return axios.post('/posts', postData)
}

 updatePostById(postId, postData){
    return axios.put(`/posts/${postId}`, postData)
}

 deletePostById(postId){
    return axios.delete(`/posts/${postId}`)
}

searchPosts(query) {
    return axios.get('/posts/search', { params: { q: query } })
}

getFollowingPosts(userId) {
    return axios.get(`/posts/following/${userId}`)
}
}