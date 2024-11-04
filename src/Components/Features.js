import React from 'react'
import './Features.css'
import "bootstrap/dist/css/bootstrap.min.css";


const Features = () => {
  return (
    <section class="features-section">
        <div class="container text-center">
            <h2>Why Choose NexMeet?</h2>
            <div class="row">
                <div class="col-md-3 mr-2">
                    <h3>Connect</h3>
                    <p>Seamlessly connect with friends and family across the globe.</p>
                </div>
                <div class="col-md-3 mr-2">
                    <h3>Share</h3>
                    <p>Share your favorite moments with photos, stories, and posts.</p>
                </div>
                <div class="col-md-3">
                    <h3>Discover</h3>
                    <p>Find new content and meet people who share your interests.</p>
                </div>
            </div>
        </div>
    </section>

)
}

export default Features