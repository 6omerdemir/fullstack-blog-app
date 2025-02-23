import React, { useState, useEffect } from 'react';
import { Container, Button } from 'semantic-ui-react';
import { useParams, useLocation, useNavigate } from 'react-router-dom'; 
import TextareaAutosize from 'react-textarea-autosize';
import PostService from '../../services/PostService';

function PostForm() {
    const userId = localStorage.getItem('userId');
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const { postId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { title: initialTitle, text: initialText } = location.state || {}; 

  
    useEffect(() => {
        if (initialTitle && initialText) {
            setTitle(initialTitle);
            setText(initialText);
        }
    }, [initialTitle, initialText]);

    const handleTitle = (event) => {
        setTitle(event.target.value);
    };

    const handleText = (event) => {
        setText(event.target.value);
    };

    const handlePublish = async () => {
        if (!userId) {
            console.error('User ID is missing');
            return;
        }

        const postData = {
            "userId": userId,
            "title": title,
            "text": text,
        };

        try {
            const postService = new PostService();
            if (postId) {
                // Update mode
                const response = await postService.updatePostById(postId, postData);
                console.log('Post updated:', response.data);
                navigate(`/posts/${postId}`); 
            } else {
                // Create mode
                const response = await postService.createPost(postData);
                console.log('Post created:', response.data);
                navigate('/'); 
            }
            setTitle('');
            setText('');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Container style={{ marginTop: '50px', width: '50%' }}>
            <div>
                <TextareaAutosize
                    placeholder='Title'
                    value={title}
                    onChange={handleTitle}
                    style={{
                        fontSize: '40px',
                        width: '100%',
                        border: 'none',
                        outline: 'none',
                        resize: 'none',
                        marginBottom: '20px',
                    }}
                    minRows={1}
                />
                <TextareaAutosize
                    placeholder='Write...'
                    value={text}
                    onChange={handleText}
                    style={{
                        fontSize: '20px',
                        width: '100%',
                        border: 'none',
                        outline: 'none',
                        resize: 'none',
                        marginBottom: '20px',
                    }}
                    minRows={1}
                />
            </div>
            <div>
                <Button color='green' onClick={handlePublish}>
                    {postId ? 'Update' : 'Publish'}
                </Button>
            </div>
        </Container>
    );
}

export default PostForm;