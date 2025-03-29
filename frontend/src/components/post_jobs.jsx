import React, {useEffect, useState} from 'react';
import '../styles/Post_jobs.css'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Post_jobs(){
    const [job, setJob] = useState('');
    const [userId, setUserId] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companyDescription, setCompanyDescription] = useState('');
    const [companyEmail, setCompanyEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [companyUrl, setCompanyUrl] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [jobType, setJobType] = useState('');
    const [jobLocation, setJobLocation] = useState('');
    const [salary, setSalary] = useState('');
    const [jobBenefits, setJobBenefits] = useState('');
    const [applicationDeadline, setApplicationDeadline] = useState('');
    const [jobPostedDate, setJobPostedDate] = useState('');
    const [employmentStatus, setEmploymentStatus] = useState('');
    const [applicationInstructions, setApplicationInstructions] = useState('');
    const [contactPerson, setContactPerson] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [jobLink, setJobLink] = useState('');

    const navigate = useNavigate()

    const userFromSession = sessionStorage.getItem('userId');
    const userFromLocalStorage = localStorage.getItem('userId');
    const currentUserId = userFromSession || userFromLocalStorage;

    const postData = {
        userId: currentUserId,
        companyName: companyName,
        companyDescription: companyDescription,
        companyEmail: companyEmail,
        phoneNumber: phoneNumber,
        companyUrl: companyUrl,
        jobTitle: jobTitle,
        jobDescription: jobDescription,
        jobType: jobType,
        jobLocation: jobLocation,
        salary: salary,
        jobBenefits: jobBenefits,
        applicationDeadline: applicationDeadline,
        jobPostedDate: jobPostedDate,
        employmentStatus: employmentStatus,
        applicationInstructions: applicationInstructions,
        contactPerson: contactPerson,
        jobLink: jobLink
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!companyName || !companyDescription || !companyEmail || !phoneNumber || !companyUrl ||
            !jobTitle || !jobDescription || !jobType || !jobLocation || !salary || !jobBenefits ||
            !applicationDeadline || !jobPostedDate || !employmentStatus || !applicationInstructions || !contactPerson) {

            setError("All fields are required.");
            return;
        }

        if(currentUserId){
            setUserId(currentUserId);
        }
        if(!currentUserId){
            setError("User is not authenticated.")
            return;
        }
        console.log('Current User ID:', userId);
        setLoading(false);
        setError('')

        try {
            const response = await axios.post(`http://localhost:8084/posts?userId=${currentUserId}`, postData, {
                headers: {'Content-Type': 'application/json'}
            });
            setJob(response.data);
            const jobId = response.data.id;
            const postLink = `/apply/${jobId}`;
            setJobLink(postLink);
            sessionStorage.setItem('jobId', jobId);
            localStorage.setItem('jobId', jobId);
            console.log('Post ID saved:', jobId);
            console.log('Post_jobs created successfully:', response.data);
            alert("Post_jobs Created Successfully!");
            navigate(postLink);

        } catch (error) {
            console.error('Error creating Post_jobs:', error.response ? error.response.data : error.message);
            setError("Error creating Post_jobs");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            <h2>Post a Job</h2>
            <form className="form" onSubmit={handleSubmit}>
                <h3>Employer Details:</h3>

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
                <div>
                    <label htmlFor="companyDescription">Company Description</label>
                    <textarea
                        onChange={(e) => setCompanyDescription(e.target.value)}
                        id="companyDescription"
                        name="companyDescription"
                        placeholder="Enter company description"
                        value={companyDescription}
                        type="text"
                    />
                </div>
                <div>
                    <label htmlFor="companyEmail">Company Email</label>
                    <input
                        onChange={(e) => setCompanyEmail(e.target.value)}
                        id="companyEmail"
                        name="companyEmail"
                        placeholder="Enter company email"
                        type="email"
                        value={companyEmail}
                    />
                </div>
                <div>
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        id="phoneNumber"
                        name="phoneNumber"
                        placeholder="Enter phone number"
                        type="tel"
                        value={phoneNumber}
                    />
                </div>
                <div>
                    <label htmlFor="companyUrl">Company URL</label>
                    <input
                        onChange={(e) => setCompanyUrl(e.target.value)}
                        id="companyUrl"
                        name="companyUrl"
                        placeholder="Enter company URL"
                        type="url"
                        value={companyUrl}
                    />
                </div>

                <h3>Job Posting Details:</h3>

                <div>
                    <label htmlFor="jobTitle">Job Title</label>
                    <input
                        onChange={(e) => setJobTitle(e.target.value)}
                        id="jobTitle"
                        name="jobTitle"
                        placeholder="Enter job title"
                        value={jobTitle}
                        type="text"
                    />
                </div>
                <div>
                    <label htmlFor="jobDescription">Job Description</label>
                    <textarea
                        onChange={(e) => setJobDescription(e.target.value)}
                        id="jobDescription"
                        name="jobDescription"
                        placeholder="Enter job description"
                        value={jobDescription}
                        type="text"
                    />
                </div>
                <div>
                    <label htmlFor="jobType">Job Type</label>
                    <input
                        onChange={(e) => setJobType(e.target.value)}
                        id="jobType"
                        name="jobType"
                        placeholder="Enter job type"
                        value={jobType}
                        type="text"
                    />
                </div>
                <div>
                    <label htmlFor="jobLocation">Job Location</label>
                    <input
                        onChange={(e) => setJobLocation(e.target.value)}
                        id="jobLocation"
                        name="jobLocation"
                        placeholder="Enter job location"
                        value={jobLocation}
                        type="text"
                    />
                </div>
                <div>
                    <label htmlFor="salary">Salary</label>
                    <input
                        onChange={(e) => setSalary(e.target.value)}
                        id="salary"
                        name="salary"
                        placeholder="Enter salary"
                        value={salary}
                        type="number"
                    />
                </div>
                <div>
                    <label htmlFor="jobBenefits">Job Benefits</label>
                    <textarea
                        onChange={(e) => setJobBenefits(e.target.value)}
                        id="jobBenefits"
                        name="jobBenefits"
                        placeholder="Enter job benefits"
                        value={jobBenefits}
                    />
                </div>
                <div>
                    <label htmlFor="applicationDeadline">Application Deadline</label>
                    <input
                        onChange={(e) => setApplicationDeadline(e.target.value)}
                        id="applicationDeadline"
                        name="applicationDeadline"
                        type="date"
                        value={applicationDeadline}
                    />
                </div>
                <div>
                    <label htmlFor="jobPostedDate">Job Posted Date</label>
                    <input
                        onChange={(e) => setJobPostedDate(e.target.value)}
                        id="jobPostedDate"
                        name="jobPostedDate"
                        type="date"
                        value={jobPostedDate}
                    />
                </div>
                <div>
                    <label htmlFor="employmentStatus">Employment Status</label>
                    <input
                        onChange={(e) => setEmploymentStatus(e.target.value)}
                        id="employmentStatus"
                        name="employmentStatus"
                        placeholder="Enter employment status"
                        value={employmentStatus}
                        type="text"
                    />
                </div>

                <h3>Contact Information (for Job Applicants):</h3>

                <div>
                    <label htmlFor="applicationInstructions">Application Instructions</label>
                    <textarea
                        onChange={(e) => setApplicationInstructions(e.target.value)}
                        id="applicationInstructions"
                        name="applicationInstructions"
                        placeholder="Enter application instructions"
                        value={applicationInstructions}
                        type="text"
                    />
                </div>
                <div>
                    <label htmlFor="contactPerson">Contact Person</label>
                    <input
                        onChange={(e) => setContactPerson(e.target.value)}
                        id="contactPerson"
                        name="contactPerson"
                        placeholder="Enter contact person"
                        value={contactPerson}
                        type="tel"
                    />
                </div>

                <div className="form-group">
                    <button type="submit" disabled={loading}>
                        {loading ? 'Posting...' : 'Post Job'}
                    </button>
                </div>
                {error && <div className="error-message">{error}</div>}
                {error && <div className="error">{error}</div>}

                {job && (
                    <div className="product-details">
                        <h2>Created Job Post:</h2>
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
                )}

            </form>
        </div>
    );
}

export default Post_jobs;


