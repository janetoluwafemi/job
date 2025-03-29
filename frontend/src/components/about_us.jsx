import React from 'react';
import {Link} from "react-router-dom";
import image2 from '../image/1600w-1Sj7hfK0Bcc.webp'
import '../styles/about_us.css'

function about_us() {
    return (
        <div>
            <div className="about_us">About Us Page</div>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/post_jobs">Post</Link></li>
                        <li><Link to="/get_post">Get Post</Link></li>
                        <li><Link to="/delete_post">Delete Post</Link></li>
                        <li><Link to="/apply_for_job">Apply For Job</Link></li>
                    </ul>
                </nav>
            </div>
            <div>
                <img src={image2} alt="Product" className="image" />
            </div>
            <div className="text">
                <p>This is a free mobile app designed to allow users to post</p>
                <p>jobs for people to apply and get employed  after an interview</p>
                <p>has been conducted, at first the user is expected to register</p>
                <p>first, the employer will ensure that a link will be provided </p>
                <p>where the employee can apply for the job, once the employee has </p>
                <p> applied for the job an email will be sent to them where they </p>
                <p>will conduct their interview or how the interview will be conducted</p>
            </div>
        </div>
    )
}
export default about_us;

