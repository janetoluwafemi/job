import React from 'react';
import axios from "axios";

function delete_post(){
    const [error,setError] = React.useState('');
    const [loading,setLoading] = React.useState(false);
    const [message,setMessage] = React.useState('');
    const [jobId, setJobId] = React.useState('');

    const postFromSession = sessionStorage.getItem('jobId');
    const postFromLocalStorage = localStorage.getItem('jobId');
    console.log('Session Storage jobId:', postFromSession);
    console.log('Local Storage jobId:', postFromLocalStorage);
    const currentPostId = postFromSession || postFromLocalStorage;
    console.log(currentPostId, 'currentPostId in handleDelete');

    const handleDelete = async (e) => {
        e.preventDefault();

        if(currentPostId){
            setJobId(currentPostId);
        }
        if(!currentPostId){
            alert("Job post not found")
            return;
        }
        setLoading(false);
        setError('');
        setMessage('');
        try {
            // const url = `http://localhost:8084/posts?jobId=${currentPostId}`
            const url = `http://localhost:8084/posts/${currentPostId}`
            const response = await axios.delete(url)
            console.log('API Response:', response);
            setMessage(response.data.message);
            console.log('Product Deleted Successfully:', response.data);
        } catch (error) {
            console.error('There was an error deleting the product!', error);
            setError('Failed to delete the product. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <div>
                <h1>Delete Job Post</h1>
                <form onSubmit={handleDelete} className="delete-product-form">
                    {error && <div className="error-message">{error}</div>}
                    {message && <div className="success-message">{message}</div>}
                    <button type="submit" disabled={loading}>
                        {loading ? 'Deleting...' : 'Delete Product'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default delete_post;

