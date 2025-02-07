import React, { useState } from 'react';
import CommentService from '../../services/CommentService';
import { useParams } from 'react-router-dom';
import {
    Header,
    CommentText,
    CommentMetadata,
    CommentGroup,
    CommentContent,
    CommentAvatar,
    CommentActions,
    CommentAction,
    CommentAuthor,
    FormTextArea,
    Button,
    Comment,
    Form,
} from 'semantic-ui-react';
function Comments() {
    const {postId, userId} = useParams();
    const [text, setText] = useState('');
    const handleAddReply = async () => {
        if (!userId) {
            console.error('User ID is missing');
            return;
        }

        const commentData = {
            userId,
            postId,
            text,
        };

        try {
            const commentService = new CommentService();
            const response = await commentService.createOneComment(commentData);
            console.log('Comment created:', response.data);
            setText('');
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };
    return (
        <div>
            <div>
                <CommentGroup>
                    <Header as='h3' dividing>
                        Comments
                    </Header>

                    <Comment>
                        <Comment.Avatar
                            style={{
                                backgroundColor: '#2185d0',
                                color: 'white',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                width: '40px',
                                height: '40px',
                            }}
                        >
                            M
                        </Comment.Avatar>
                        <CommentContent>
                            <CommentAuthor as='a'>Matt</CommentAuthor>
                            <CommentMetadata>
                                <div>Today at 5:42PM</div>
                            </CommentMetadata>
                            <CommentText>How artistic!</CommentText>
                            <CommentActions>
                                <CommentAction>Reply</CommentAction>
                            </CommentActions>
                        </CommentContent>
                    </Comment>

                    <Comment>
                        <CommentAvatar src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
                        <CommentContent>
                            <CommentAuthor as='a'>Elliot Fu</CommentAuthor>
                            <CommentMetadata>
                                <div>Yesterday at 12:30AM</div>
                            </CommentMetadata>
                            <CommentText>
                                <p>This has been very useful for my research. Thanks as well!</p>
                            </CommentText>
                            <CommentActions>
                                <CommentAction>Reply</CommentAction>
                            </CommentActions>
                        </CommentContent>
                        <CommentGroup>
                            <Comment>
                                <CommentAvatar src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
                                <CommentContent>
                                    <CommentAuthor as='a'>Jenny Hess</CommentAuthor>
                                    <CommentMetadata>
                                        <div>Just now</div>
                                    </CommentMetadata>
                                    <CommentText>Elliot you are always so right :)</CommentText>
                                    <CommentActions>
                                        <CommentAction>Reply</CommentAction>
                                    </CommentActions>
                                </CommentContent>
                            </Comment>
                        </CommentGroup>
                    </Comment>

                    <Comment>
                        <CommentAvatar src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
                        <CommentContent>
                            <CommentAuthor as='a'>Joe Henderson</CommentAuthor>
                            <CommentMetadata>
                                <div>5 days ago</div>
                            </CommentMetadata>
                            <CommentText>Dude, this is awesome. Thanks so much</CommentText>
                            <CommentActions>
                                <CommentAction>Reply</CommentAction>
                            </CommentActions>
                        </CommentContent>
                    </Comment>

                    <Form reply>
                        <FormTextArea />
                        <Button content='Add Reply' labelPosition='left' icon='edit' primary onClick={handleAddReply} />
                    </Form>
                </CommentGroup>
            </div>
        </div>
    );
}
export default Comments;