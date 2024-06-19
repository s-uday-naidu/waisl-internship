import React, { useEffect, useState } from 'react';
import './Home.css'; // Import the CSS file

export default function Home() {
  const [slideIndex, setSlideIndex] = useState(0);

  const slides = [
    { image: 'airport2.jpg', text: 'Welcome to WAR-Alpha', subtext: 'Streamline Your Asset Tracking', alt: 'Slide 1' },
    { image: 'airport3.jpg', text: 'Unique Asset Tagging', subtext: 'Efficient and Reliable', alt: 'Slide 2' },
    { image: 'airport4.jpg', text: 'Real-time Inventory', subtext: 'Track Your Assets Anywhere, Anytime', alt: 'Slide 3' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex(prevIndex => (prevIndex + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const currentSlide = (index) => {
    setSlideIndex(index);
  };

  useEffect(() => {
    // Log the constructed image URLs to the console
    slides.forEach(slide => {
      console.log(`Image URL: ${process.env.PUBLIC_URL}/${slide.image}`);
    });
  }, [slides]);

  return (
    <div className="home-container">
      {/* Full-page Hero Image Section */}
      <div className="hero-container">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={slideIndex === index ? 'hero-image active' : 'hero-image'}
            style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/${slide.image})` }}
            onMouseEnter={() => setSlideIndex(index)} // Zoom in on hover
          >
            <div className="hero-text">
              <h1>{slide.text}<span>.</span></h1> {/* Added a span for dot */}
              <p>{slide.subtext}</p>
            </div>
          </div>
        ))}
        <div className="dots-container">
          {slides.map((_, index) => (
            <span
              key={index}
              className={slideIndex === index ? 'dot active' : 'dot'}
              onClick={() => currentSlide(index)}
            ></span>
          ))}
        </div>
      </div>

      {/* About the Application */}
      {/*<div className="section about-section">
        <h2>Summary</h2>
        <p></p>
      </div>*/}

      {/* Key Features */}
     {/* <div className="section features-section">
        <h2>Key Features</h2>
        <ul>
          <li>Automated asset tag generation</li>
          <li>Real-time inventory tracking</li>
          <li>Comprehensive reporting tools</li>
          <li>User-friendly interface</li>
        </ul>
      </div>*/}

      {/* Footer */}
      {/*<div className="section footer">
        <h3>Contact Us</h3>
        <p>Email: Uday.Sesharatnam@waisl.in</p>
        <div className="social-links">
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">LinkedIn</a>
        </div>
      </div>*/}
    </div>
  );
}
