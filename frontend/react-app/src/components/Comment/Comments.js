import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Comment, Form, Button, Header, Segment } from 'semantic-ui-react';
import CommentService from '../../services/CommentService';

function Comments({ postId }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const currentUserId = parseInt(localStorage.getItem('userId'), 10);
    const navigate = useNavigate(); 

    useEffect(() => {
        const commentService = new CommentService();
        setLoading(true);
        commentService.getCommentsByPostId(postId)
            .then(result => {
                // console.log(`Comments for post ${postId}:`, result.data);
                setComments(result.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Comments yükleme hatası:', err);
                setError(err.message);
                setLoading(false);
            });
    }, [postId]);

    const handleAddReply = () => {
        if (!currentUserId) {
            alert('Please log in to add a comment!');
            return;
        }
        if (!newComment.trim()) {
            alert('Comment cannot be empty!');
            return;
        }

        const commentService = new CommentService();
        const commentData = {
            userId: currentUserId,
            postId: parseInt(postId, 10),
            text: newComment,
        };

        setLoading(true);
        commentService.createOneComment(commentData)
            .then(result => {
                // console.log('Comment created:', result.data);
                setComments([...comments, result.data]);
                setNewComment('');
                setLoading(false);
            })
            .catch(error => {
                console.error('Error creating comment:', error.response?.data || error.message);
                setError(error.response?.data?.message || error.message);
                setLoading(false);
            });
    };

    const handleReplyClick = (userName) => {
        setNewComment(`@${userName} `);
    };

    const handleDeleteComment = (commentId) => {
        const commentService = new CommentService();
        setLoading(true);
        commentService.deleteOneCommentById(commentId)
            .then(() => {
                // console.log(`Comment ${commentId} deleted`);
                setComments(comments.filter(comment => comment.id !== commentId));
                setLoading(false);
            })
            .catch(error => {
                console.error('Error deleting comment:', error.response?.data || error.message);
                setError(error.response?.data?.message || error.message);
                setLoading(false);
            });
    };

    const handleUserClick = (userId) => {
        navigate(`/users/${userId}`);
    };

    if (error) return <div>Error: {error}</div>;
    if (loading) return <div>Loading comments...</div>;

    return (
        <Segment>
            <Comment.Group>
                <Header as="h3" dividing>
                    Comments
                </Header>
                {comments.length === 0 ? (
                    <p>No comments yet.</p>
                ) : (
                    comments.map(comment => (
                        <Comment key={comment.id}>
                            <div
                                style={{
                                    backgroundColor: comment.profileColor || '#ffffff',
                                    color: "black",
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    fontSize: '1.5rem',
                                    fontWeight: 'bold',
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    float: 'left',
                                    marginRight: '10px',
                                }}
                            >
                                {comment.userName?.charAt(0) || 'U'}
                            </div>
                            <Comment.Content>
                                <Comment.Author 
                                    as="a" 
                                    onClick={() => handleUserClick(comment.userId)} 
                                    style={{ cursor: 'pointer' }}
                                >
                                    {comment.userName || 'Unknown'}
                                </Comment.Author>
                                <Comment.Metadata>
                                    <div>{comment.createDate ? new Date(comment.createDate).toLocaleString() : 'Unknown'}</div>
                                </Comment.Metadata>
                                <Comment.Text>{comment.text}</Comment.Text>
                                <Comment.Actions
                                    style={{
                                        textAlign: 'left',
                                        marginLeft: '50px',
                                    }}
                                >
                                    <Comment.Action onClick={() => handleReplyClick(comment.userName || 'Unknown')}>
                                        Reply
                                    </Comment.Action>
                                    {comment.userId === currentUserId && (
                                        <Comment.Action onClick={() => handleDeleteComment(comment.id)}>
                                            Delete
                                        </Comment.Action>
                                    )}
                                </Comment.Actions>
                            </Comment.Content>
                        </Comment>
                    ))
                )}

                <Form>
                    <Form.TextArea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                    />
                    <Button
                        content="Add Comment"
                        labelPosition="left"
                        icon="edit"
                        primary
                        onClick={handleAddReply}
                        disabled={loading || !currentUserId}
                    />
                </Form>
            </Comment.Group>
        </Segment>
    );
}

export default Comments;