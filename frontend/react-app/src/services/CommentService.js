import axios from './axios';

export default class CommentService {

    getAllComments() {
        return axios.get('/comments');
    }

    getCommentsByUserId(userId) {
        return axios.get(`/comments/userId/${userId}`);
    }

    getCommentsByPostId(postId) {
        return axios.get(`/comments/postId/${postId}`);
    }

    getCommentsByUserIdAndPostId(userId, postId) {
        return axios.get(`/comments/userId/${userId}/postId/${postId}`);
    }

    getOneCommentById(commentId) {
        return axios.get(`/comments/${commentId}`);
    }

    createOneComment(commentData) {
        return axios.post('/comments', commentData);
    }

    updateOneCommentById(commentId, commentData) {
        return axios.put(`/comments/${commentId}`, commentData);
    }

    deleteOneCommentById(commentId) {
        return axios.delete(`/comments/${commentId}`);
    }
}
