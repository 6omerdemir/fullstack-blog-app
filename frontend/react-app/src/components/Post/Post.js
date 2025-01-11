import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Header, CommentText,
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
    Form,} from 'semantic-ui-react';
import PostService from '../../services/PostService';

function Post() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [post, setPost] = useState(null);
    const { postId } = useParams();

    useEffect(() => {
        let postService = new PostService();
        postService.getOnePostById(postId)
            .then(result => {
                setPost(result.data);
                setIsLoaded(true);
            })
            .catch(error => {
                setError(error);
                setIsLoaded(true);
            });
    }, [postId]);

    if (error) return <div>Error: {error.message}</div>;
    if (!isLoaded) return <div>Loading...</div>;
    if (!post) return <div>Post not found</div>;

    return (
        <Container style={{ marginTop: '50px', width: '50%' }}>
            <div style={{
                fontSize: '40px',
                width: '100%',
                border: 'none',
                outline: 'none',
                resize: 'none',
                marginBottom: '20px',
            }}>
                <Header as='h1'>{post.title}</Header>
            </div>
            <div style={{
                marginTop: '20px',
                fontSize: '20px',
                width: '100%',
                border: 'none',
                outline: 'none',
                resize: 'none',
                marginBottom: '20px',
            }}>
                <p>{post.text}</p>
            </div>
            <div>
                <CommentGroup>
                    <Header as='h3' dividing>
                        Comments
                    </Header>

                    <Comment>
                        <CommentAvatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
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
                        <Button content='Add Reply' labelPosition='left' icon='edit' primary />
                    </Form>
                </CommentGroup>
            </div>
        </Container>
    );
}

export default Post;