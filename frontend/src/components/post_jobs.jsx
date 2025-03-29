import React, {useState} from 'react';
import axios from "axios";

function Post(){
    const [userId, setUserId] = useState('');
    const [link, setLink] = useState('');
    const [title, setTitle] = useState('');
    const [post, setPost] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const userFromSession = sessionStorage.getItem('userId');
    const userFromLocalStorage = localStorage.getItem('userId');
    const currentUserId = userFromSession || userFromLocalStorage;


    const postData = {
        userId: userId,
        link: link,
        title: title,
    }
    const handleSubmit = async () => {
        setUserId(currentUserId);
        setLoading(false);
        setError('')
        try {
            const response = await axios.post('http://localhost:8084/posts', postData, {
                headers: {'Content-Type': 'application/json'}
            });

            setPost(response.data);
            const postId = response.data.id;
            sessionStorage.setItem('postId', postId);
            localStorage.setItem('postId', postId);

            console.log('Post created successfully:', response.data);
            alert("Post Created Successfully!");
        } catch (error) {
            console.error('Error creating Post:', error.response ? error.response.data : error.message);
            setError("Error creating Post");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        type="title"
                        id="title"
                        name="title"
                        value={title}
                        placeholder="Enter Title"
                    />
                </div>
                <div>
                    <label htmlFor="link">link</label>
                    <input
                        onChange={(e) => setLink(e.target.value)}
                        id="link"
                        name="link"
                        placeholder="Enter link"
                        type="link"
                        value={link}
                    />
                </div>
                <div className="form-group">
                    <button type="submit">Post</button>
                </div>
            </form>
        </div>
    )
}

export default Post;

