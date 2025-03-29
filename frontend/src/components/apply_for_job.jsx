import React, {useState} from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';

function Apply_for_job() {
    // const { jobId } = useParams();
    const [userId, setUserId] = useState('');
    const [jobId, setJobId] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('')
    const [uploadResume, setUploadResume] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const userFromSession = sessionStorage.getItem('userId');
    const userFromLocalStorage = localStorage.getItem('userId');
    const currentUserId = userFromSession || userFromLocalStorage;

    const theJobId = sessionStorage.getItem('jobId');
    const getJobId = localStorage.getItem('jobId');
    const currentJobId = getJobId || theJobId;

    const applyData = {
        jobId: jobId,
        userId: userId,
        fullName: fullName,
        email: email,
        password: password,
        phoneNumber: phoneNumber,
        uploadResume: uploadResume
    }
    const handleSubmit = async e => {
        e.preventDefault();
        setUserId(currentUserId);
        setJobId(currentJobId);
        setLoading(false);
        setError('')
        try {
            const response = await axios.post(`http://localhost:8084/apply/${jobId}`, applyData, {
                headers: {'Content-Type': 'application/json'}
            });

            const applyId = response.data.id;
            sessionStorage.setItem('applyId', applyId);
            localStorage.setItem('applyId', applyId);

            console.log('Job applied successfully:', response.data);
            alert("Job applied Successfully!");
        } catch (error) {
            console.error('Error applying for this job:', error.response ? error.response.data : error.message);
            setError("Error applying for this job");
        } finally {
            setLoading(false);
        }
    }
    return (
        <div>
            <div>
                <h3>Apply For This Job</h3>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            id="fullName"
                            value={fullName}
                            name="fullName"
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Enter full name"
                            type="text"
                        />
                    </div>
                    <div>
                        <input
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                            type="email"
                        />
                    </div>
                    <div>
                        <input
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            id="password"
                            type="password"
                        />
                    </div>
                    <div>
                        <input
                            name="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Enter your phoneNumber"
                            id="phoneNumber"
                            type="tel"
                        />
                    </div>
                    <div>
                        <input
                            onChange={(e) => setUploadResume(e.target.value)}
                            type="file"
                            id="uploadResume"
                            name="uploadResume"
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" disabled={loading}>
                            {loading ? 'Posting...' : 'Apply'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Apply_for_job;


