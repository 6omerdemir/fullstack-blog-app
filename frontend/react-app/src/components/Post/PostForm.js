import React from 'react';
import { Container, Button} from 'semantic-ui-react';
import TextareaAutosize from 'react-textarea-autosize';

function PostForm() {
  return (
    <Container style={{ marginTop: '50px', width: '50%' }}>
      <div>

        <TextareaAutosize
          placeholder='Title'
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
      <Button color='green'>Submit</Button>
      </div>
    </Container>
  );
}

export default PostForm;
