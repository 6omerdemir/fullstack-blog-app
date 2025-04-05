import axios from './axios';

export default class FollowService {
    followUser(userId, targetId) {
        return axios.post(`/follow/${userId}/follow/${targetId}`);
    }

    unfollowUser(userId, targetId) {
        return axios.post(`/follow/${userId}/unfollow/${targetId}`);
    }

    getFollowing(userId) {
        return axios.get(`/follow/${userId}/following`);
    }

    getFollowers(userId) {
        return axios.get(`/follow/${userId}/followers`);
    }
}