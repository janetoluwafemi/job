// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
//
// function GetPost() {
//     const [companyName, setCompanyName] = useState('');
//     const [userId, setUserId] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState('');
//     const [error, setError] = useState('');
//     const [job, setJob] = useState(null);
//     const [jobLink, setJobLink] = useState('');
//
//     const userFromSession = sessionStorage.getItem('userId');
//     const userFromLocalStorage = localStorage.getItem('userId');
//     const currentUserId = userFromSession || userFromLocalStorage;
//
//     const navigate = useNavigate();
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!companyName) {
//             alert('Please enter a company name.');
//             return;
//         }
//
//         setLoading(true);
//         setError('');
//         setMessage('');
//         setJob([]);
//
//         try {
//             const url = `http://localhost:8084/posts?companyName=${companyName}`;
//             console.log('Making API request to:', url);
//
//             const response = await axios.get(url);
//             console.log('API Response:', response);
//
//             if (response.data && response.data.length > 0) {
//                 setJob(response.data);
//                 setMessage(`Product found: ${job.companyName} (ID: ${job.jobId})`);
//
//                 const postLink = `/apply/${job.jobId}`;
//                 setJobLink(postLink);
//
//                 localStorage.setItem('jobId', job.jobId);
//                 console.log('JOb Found successfully:', job);
//                 navigate(postLink);
//             } else {
//                 setError('Job not found.');
//             }
//
//         } catch (error) {
//             console.error('Error getting Post_jobs:', error.response ? error.response.data : error.message);
//             setError('Error getting Post_jobs');
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     return (
//         <div>
//             <div>
//                 <p>Get the Job posted</p>
//             </div>
//             <div>
//                 <form onSubmit={handleSubmit}>
//                     <div>
//                         <label htmlFor="companyName"></label>
//                         <input
//                             onChange={(e) => setCompanyName(e.target.value)}
//                             type="text"
//                             id="companyName"
//                             name="companyName"
//                             value={companyName}
//                             placeholder="Enter company name"
//                             className="companyName"
//                         />
//                     </div>
//
//                     <div className="form-group">
//                         <button type="submit" disabled={loading}>
//                             {loading ? 'Getting...' : 'Get Job'}
//                         </button>
//                     </div>
//
//                     {job && (
//                         <div className="product-details">
//                             <h2>Created Job Post:</h2>
//                             <p><strong>Company Name:</strong> {job.companyName}</p>
//                             <p><strong>Job Title:</strong> {job.jobTitle}</p>
//                             <p><strong>Job Description:</strong> {job.jobDescription}</p>
//                             <p><strong>Job Type:</strong> {job.jobType}</p>
//                             <p><strong>Job Location:</strong> {job.jobLocation}</p>
//                             <p><strong>Salary:</strong> {job.salary}</p>
//                             <p><strong>Job Benefits:</strong> {job.jobBenefits}</p>
//                             <p><strong>Application Deadline:</strong> {job.applicationDeadline}</p>
//                             <p><strong>Job Posted Date:</strong> {job.jobPostedDate}</p>
//                             <p><strong>Employment Status:</strong> {job.employmentStatus}</p>
//                             <p><strong>Application Instructions:</strong> {job.applicationInstructions}</p>
//                             <p><strong>Contact Person:</strong> {job.contactPerson}</p>
//                             <p><strong>Job Link:</strong>
//                                 <button
//                                     onClick={() => navigate(`/apply/${job.jobId}`)}
//                                     style={{
//                                         color: 'blue',
//                                         textDecoration: 'underline',
//                                         border: 'none',
//                                         background: 'none',
//                                         cursor: 'pointer'
//                                     }}
//                                 >
//                                     Apply for this job
//                                 </button>
//                             </p>
//                         </div>
//                     )}
//                 </form>
//             </div>
//         </div>
//     );
// }
//
// export default GetPost;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function GetPost() {
    const [companyName, setCompanyName] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [jobs, setJobs] = useState([]);

    const userFromSession = sessionStorage.getItem('userId');
    const userFromLocalStorage = localStorage.getItem('userId');
    const currentUserId = userFromSession || userFromLocalStorage;

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!companyName) {
            alert('Please enter a company name.');
            return;
        }

        setLoading(true);
        setError('');
        setMessage('');
        setJobs([]);

        try {
            const url = `http://localhost:8084/posts?companyName=${companyName}`;
            console.log('Making API request to:', url);

            const response = await axios.get(url);
            console.log('API Response:', response);

            if (response.data && response.data.length > 0) {
                setJobs(response.data);
                setMessage(`Found ${response.data.length} job(s)`);
                window.location.href = "/delete_post";
            } else {
                setError('No jobs found for this company.');
            }

        } catch (error) {
            console.error('Error getting jobs:', error.response ? error.response.data : error.message);
            setError('Error getting jobs');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div>
                <p>Get the Job posted</p>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="companyName">Company Name</label>
                        <input
                            onChange={(e) => setCompanyName(e.target.value)}
                            type="text"
                            id="companyName"
                            name="companyName"
                            value={companyName}
                            placeholder="Enter company name"
                            className="companyName"
                        />
                    </div>

                    <div className="form-group">
                        <button type="submit" disabled={loading}>
                            {loading ? 'Getting Jobs...' : 'Get Jobs'}
                        </button>
                    </div>

                    {message && <div>{message}</div>}
                    {error && <div className="error">{error}</div>}

                    {jobs.length > 0 && (
                        <div className="job-details">
                            <h2>Job Posts for {companyName}:</h2>
                            {jobs.map((job) => (
                                <div key={job.jobId} className="job-item">
                                    <p><strong>Company Name:</strong> {job.companyName}</p>
                                    <p><strong>Job Title:</strong> {job.jobTitle}</p>
                                    <p><strong>Job Description:</strong> {job.jobDescription}</p>
                                    <p><strong>Job Type:</strong> {job.jobType}</p>
                                    <p><strong>Job Location:</strong> {job.jobLocation}</p>
                                    <p><strong>Salary:</strong> {job.salary}</p>
                                    <p><strong>Job Benefits:</strong> {job.jobBenefits}</p>
                                    <p><strong>Application Deadline:</strong> {job.applicationDeadline}</p>
                                    <p><strong>Job Posted Date:</strong> {job.jobPostedDate}</p>
                                    <p><strong>Employment Status:</strong> {job.employmentStatus}</p>
                                    <p><strong>Application Instructions:</strong> {job.applicationInstructions}</p>
                                    <p><strong>Contact Person:</strong> {job.contactPerson}</p>
                                    <p><strong>Job Link:</strong>
                                        <button
                                            onClick={() => navigate(`/apply/${job.jobId}`)}
                                            style={{
                                                color: 'blue',
                                                textDecoration: 'underline',
                                                border: 'none',
                                                background: 'none',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Apply for this job
                                        </button>
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default GetPost;
