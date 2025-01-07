import axios from './axios';

export default class LikeService {

    getAllLikes() {
        return axios.get('/likes');
    }

    getLikesByUserId(userId) {
        return axios.get(`/likes/userId/${userId}`);
    }

    getLikesByPostId(postId) {
        return axios.get(`/likes/postId/${postId}`);
    }

    getLikesByUserIdAndPostId(userId, postId) {
        return axios.get(`/likes/userId/${userId}/postId/${postId}`);
    }

    getOneLikeById(likeId) {
        return axios.get(`/likes/${likeId}`);
    }

    createOneLike(likeData) {
        return axios.post('/likes', likeData);
    }

    deleteOneLikeById(likeId) {
        return axios.delete(`/likes/${likeId}`);
    }
}
