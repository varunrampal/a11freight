import React from 'react'
import backgroundImage1 from '../assets/images/hero_2.jpg'

const BannerBottom = () => {
  return (
    <div class="site-section bg-image overlay"  style={{
                       backgroundImage: `url(${backgroundImage1})`
    
                    }}
    >
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-7 text-center">
            <h2 class="text-white">Get In Touch With Us</h2>
            <p class="lead text-white">Got questions? Just reach out — we’re happy to help!</p>
            <p class="mb-0"><a href="/contact" class="btn btn-warning py-3 px-5 text-white">Contact Us</a></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BannerBottom