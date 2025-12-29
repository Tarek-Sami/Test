// src/App.js

import React, { useState, useEffect, useRef } from 'react';

import './styles/App.css';

const heroVideoFile = '/intro.mp4';
const logoImageFile = '/omar.png';

const omarImg = '/assets/team/omar.png';
const mohamedImg = '/assets/team/mohamed.png';
const joyImg = '/assets/team/joy.png';
const andrewImg = '/assets/team/omar.png';
const mahmoudImg = '/assets/team/omar.png';
const yassinImg = '/assets/team/yassin.png';
const hamadaImg = '/assets/team/hamada.png';
const bahaaImg = '/assets/team/omar.png';
const abdullahImg = '/assets/team/omar.png';
const ammarImg = '/assets/team/omar.png';
const alaaImg = '/assets/team/alaa.png';
const ayatImg = '/assets/team/omar.png';
const habibaImg = '/assets/team/omar.png';
const lojainImg = '/assets/team/omar.png';
const mariamImg = '/assets/team/mariam.png';
const sebaImg = '/assets/team/omar.png';
const nadaImg = '/assets/team/omar.png';
const roaaImg = '/assets/team/omar.png';

const vidThumbnail = '/assets/thumbnails/thumbnail1.jpg';
const teamImg = '/assets/team/team.png';;
// import courseVideoFile from '';
// import testimonialVideoFile from '';

// IMPORTANT: Replace the placeholder paths with your actual asset paths.
// Example: '/assets/team-logo.png'

// ===================================================================
// 🛠️ 1. Dummy Data (English)
// ===================================================================

const changingTexts = [
  'Build your first project in two months.',
  'Learn coding, art, and market entry.',
  'Compete in the biggest Game Jam challenge.',
];

const heroVideoSrc = heroVideoFile; // Replace with your Intro video path
const courseVideoSrc = 'https://www.w3schools.com/html/mov_bbb.mp4'; // New video for Course Section

// Replace image URLs with actual paths (e.g., /assets/team/member1.jpg)
const teamMembersData = [
  { id: 1, name: 'Omar', title: 'Unity Track Lead', image: omarImg },
  { id: 2, name: 'mohamed', title: 'Technical Artist', image: mohamedImg },
  { id: 3, name: 'joy', title: 'Operations Manager', image: joyImg },
  {
    id: 4,
    name: 'yassin',
    title: 'Unreal Engine Instructor',
    image: yassinImg,
  },
  { id: 5, name: 'mariam', title: 'Level Designer', image: mariamImg },
  { id: 6, name: 'ahmed', title: 'Creative Director', image: hamadaImg },
  { id: 7, name: 'alaa', title: 'UI/UX Specialist', image: alaaImg },
  { id: 8, name: 'abdullah', title: 'Backend Programmer', image: abdullahImg },
  { id: 9, name: 'mahmoud', title: 'Concept Artist', image: mahmoudImg },
  { id: 11, name: 'roaa', title: 'AI Developer', image: roaaImg },
  { id: 12, name: 'andrew', title: 'AI Developer', image: andrewImg },
  { id: 13, name: 'nada', title: 'AI Developer', image: nadaImg },
  { id: 14, name: 'ammar', title: 'AI Developer', image: ammarImg },
  { id: 15, name: 'lojain', title: 'AI Developer', image: lojainImg },
  { id: 16, name: 'ayat', title: 'AI Developer', image: ayatImg },
  { id: 17, name: 'habiba', title: 'AI Developer', image: habibaImg },
  { id: 18, name: 'abdelrahman', title: 'AI Developer', image: bahaaImg },
  { id: 19, name: 'seba', title: 'AI Developer', image: sebaImg },
];

const totalThumbnails = 10; // عدد الصور الكلي الموجود لديك

const videoThumbnails = Array.from({ length: totalThumbnails }, (_, i) => {
  const index = i + 1;

  // 💡 المسار يبدأ من "/" (جذر الـ ../public)
  // المسار النهائي سيكون: /assets/thumbnails/thumbnail1.jpg
  const imagePath = vidThumbnail;

  return {
    id: index,
    thumbnail: imagePath, // ✅ استخدام المسار النسبي للصورة
    youtubeLink: `#`,
  };
});

const statsData = [
  { label: 'Total Trained Students', icon: '🧑‍🎓', value: 20 },
  { label: 'Certified Training Hours', icon: '⏳', value: 62 },
  { label: 'Graduation Projects Launched', icon: '🕹️', value: 20 },
  { label: 'Employment Rate from Club', icon: '💼', value: 15 },
];

// **********************************************
// ********* Logic for StatCard Count-Up **********
// **********************************************

const useInView = (ref) => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);
  return isIntersecting;
};

const useCounter = (targetValue, duration, isInView) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = parseInt(targetValue, 10);
    const stepTime = Math.abs(Math.floor(duration / (end - start)));

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [targetValue, duration, isInView]);

  return count;
};

const StatCard = ({ stat }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef);
  const duration = stat.value > 100 ? 2500 : 1500;
  const count = useCounter(stat.value, duration, isInView);
  const suffix = stat.label.includes('Employment Rate') ? '%' : '+';

  return (
    <div className="stat-card card-shadow-hover" ref={cardRef}>
      <div className="stat-icon">{stat.icon}</div>
      <div className="stat-value">
        {count}
        {suffix}
      </div>
      <h4 className="stat-label">{stat.label}</h4>
    </div>
  );
};

// ===================================================================
// 🧭 2. Navbar Component (GDClub Update)
// ===================================================================

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  // Replace with your actual logo image path
  const logoImagePath = logoImageFile;

  return (
    <nav className={`navbar ${isScrolled ? 'solid-bg' : 'transparent-bg'}`}>
      <div className="container navbar-container">
        <div className="logo">
          <div className="logo-icon-wrapper">
            <img src={logoImagePath} alt="GDClub Logo" />
          </div>
          <span>FCAI GDC</span>
        </div>

        <div className="nav-links">
          <a href="#intro" onClick={(e) => scrollToSection(e, 'intro')}>
            Home
          </a>
          <a
            href="#who-we-are"
            onClick={(e) => scrollToSection(e, 'who-we-are')}
          >
            About Us
          </a>
          <a href="#team" onClick={(e) => scrollToSection(e, 'team')}>
            Our Team
          </a>
          <a href="#courses" onClick={(e) => scrollToSection(e, 'courses')}>
            Tracks
          </a>
          <a
            href="#mission-vision"
            onClick={(e) => scrollToSection(e, 'mission-vision')}
          >
            Missions
          </a>{' '}
          {/* NEW LINK */}
          <a
            href="#testimonials"
            onClick={(e) => scrollToSection(e, 'testimonials')}
          >
            Testimonials
          </a>
          <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>
            Contact
          </a>
        </div>
        <a
          href="/registration-link"
          target="_blank"
          rel="noopener noreferrer"
          className="cta-button"
        >
          Register Now
        </a>
      </div>
    </nav>
  );
};

// ===================================================================
// 🌟 3. Hero Section (Intro) - Layout & Content Changed
// ===================================================================

const HeroSection = () => {
  // Typing Effect Logic
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = changingTexts[currentTextIndex];
    const handleTyping = () => {
      if (isDeleting) {
        setDisplayedText((prev) => prev.substring(0, prev.length - 1));
        if (displayedText === '') {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % changingTexts.length);
        }
      } else {
        setDisplayedText((prev) => fullText.substring(0, prev.length + 1));
        if (displayedText === fullText) {
          setTimeout(() => setIsDeleting(true), 2500);
        }
      }
    };

    const speed = isDeleting ? 70 : 120;
    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentTextIndex]);

  // Logic for Video (Right Side)
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log('Autoplay failed (muted) in Hero:', error);
      });
    }
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section id="intro" className="intro-section light-bg">
      <div className="container split-layout">
        {/* Left Content (Slogan) - Smaller Flex Basis */}
        <div className="left-content">
          <h1 className="giant-slogan">
            متخليش الدنيا
            <span className="highlight"> تبكسلك </span>
          </h1>
          <p className="sub-text">
            A student-run tech community focused on training FCAI CU students to
            master the art of digital game development from scratch to advanced
            stages.
          </p>
          <a
            href="/registration-link"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button"
          >
            Start Your Journey
          </a>
        </div>

        {/* Right Content (Video + Caption) - Larger Flex Basis */}
        <div className="right-content">
          <div className="hero-visual-container">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted={isMuted}
              playsInline // Important for mobile autoplay
              poster="https://via.placeholder.com/600x400?text=Hero+Video+Poster"
            >
              <source src={heroVideoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Mute/Unmute Button */}
            <button className="cta-button mute-toggle-btn" onClick={toggleMute}>
              {isMuted ? '🔇 Unmute' : '🔊 Mute'}
            </button>
            <p className="animated-caption">
              {displayedText} <span className="typing-cursor">|</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// ===================================================================
// 👥 4. Who We Are (Image Right/Text Left - Swapped)
// ===================================================================

const WhoWeAre = () => {
  return (
    <section id="who-we-are" className="who-we-are-section off-white-bg">
      <div className="container split-layout align-center">
        {/* RIGHT CONTENT (Image) - This DIV moves to the left in CSS (row-reverse) */}
        <div className="right-content">
          {/* Replace with your actual community image path */}
          <img src={teamImg} alt="Club Members Photo" />
        </div>

        {/* LEFT CONTENT (Text) - This DIV moves to the right in CSS (row-reverse) */}
        <div className="left-content">
          <h2>Who We Are & What We Offer</h2>
          <p>
            We are not just a club, but a mini-studio environment that simulates
            large game development companies. Our goal is to transform
            theoretical knowledge into practical, publishable projects,
            producing job-ready developers.
          </p>
          <ul className="features-list">
            <li>
              <span className="icon">✓</span> Training on industry-standard
              engines (Unity & Unreal).
            </li>
            <li>
              <span className="icon">✓</span> Building a strong, professional
              portfolio for every trainee.
            </li>
            <li>
              <span className="icon">✓</span> Intensive workshops in Art,
              Programming, and Game Design.
            </li>
          </ul>
          <a
            href="#team"
            onClick={() =>
              document
                .getElementById('team')
                .scrollIntoView({ behavior: 'smooth' })
            }
            className="cta-button"
            style={{ marginTop: '20px' }}
          >
            Meet Our Experts
          </a>
        </div>
      </div>
    </section>
  );
};

// ===================================================================
// 🤝 5. Team Section (No Flip, Scale Hover)
// ===================================================================

const TeamMemberCard = ({ member }) => (
  <div className="team-member-wrapper">
    {/* The main hover effect is now applied to card-flip-container */}
    <div className="card-flip-container">
      {/* Front Face (Only visible content) */}
      <div className="card-face card-front">
        <img src={member.image} alt={member.name} className="member-photo" />
        <h4 className="member-name">{member.name}</h4>
        <p className="member-title">{member.title}</p>
      </div>

      {/* Back Face is no longer used, but kept for safe deletion */}
      {/* <div className="card-face card-back">...</div> */}
    </div>
  </div>
);

const TeamSection = () => (
  <section id="team" className="team-section light-bg">
    <div className="container">
      <h2 className="section-title">Our Expert Team 💪</h2>
      <p className="section-subtitle">
        Meet the instructors and leaders who will guide you on your journey to
        becoming a game development professional.
      </p>
      <div className="team-grid">
        {teamMembersData.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  </section>
);

// ===================================================================
// 📚 6. Course Illustration (Split Layout + Carousel)
// ===================================================================

const CourseIllustration = () => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log('Autoplay failed (muted) in Courses:', error);
      });
    }
  }, []);

  return (
    <section id="courses" className="course-illustration-section off-white-bg">
      <div className="container">
        <div className="course-top-layout">
          {/* Left Side: Video */}
          <div className="video-side">
            <div className="large-video-box">
              <video
                ref={videoRef}
                controls
                muted={isMuted}
                autoPlay={false}
                poster="https://via.placeholder.com/600x400?text=Course+Intro+Poster"
              >
                <source src={courseVideoSrc} type="video/mp4" />
              </video>
            </div>
          </div>

          {/* Right Side: Text Content */}
          <div className="text-content">
            <h2>See Our Course</h2> {/* Changed Title */}
            <p className="section-subtitle" style={{ margin: 0, padding: 0 }}>
              Our training tracks are designed by industry professionals to take
              you from beginner to job-ready expert. Each track culminates in a
              published portfolio project.
            </p>
            <ul className="features-list">
              <li>
                <span className="icon">🎮</span> Focus on real-world game
                production pipelines.
              </li>
              <li>
                <span className="icon">🏆</span> Mentorship from professionals
                in top studios.
              </li>
              <li>
                <span className="icon">🌟</span> Guaranteed portfolio piece upon
                completion.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Carousel (No Change) */}
        <div
          className="thumbnail-carousel"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="carousel-view">
            <div className={`carousel-track ${isHovered ? 'paused' : ''}`}>
              {/* Duplicate the list for seamless looping */}
              {[...videoThumbnails, ...videoThumbnails].map((video, index) => (
                <a
                  key={index}
                  href={video.youtubeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="thumbnail-item card-shadow-hover"
                >
                  <img src={video.thumbnail} alt={`Track Video ${video.id}`} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ===================================================================
// 📈 7. Mission & Vision Section (Combined)
// ===================================================================

const MissionVisionSection = () => (
  <section id="mission-vision" className="mission-vision-section light-bg">
    <div className="container">
      <h2 className="section-title">Our Mission & Vision 🎯</h2>

      {/* NEW: Mission and Vision Cards */}
      <div className="mv-container">
        <div className="mv-card">
          <h3>Our Mission 🚀</h3>
          <p>
            To empower the next generation of game developers by providing
            hands-on, professional-grade training and mentorship, fostering a
            community that encourages creativity and technical excellence in
            digital media creation.
          </p>
        </div>
        <div className="mv-card">
          <h3>Our Vision ✨</h3>
          <p>
            To be the leading student community for game development in Egypt
            and the MENA region, recognized globally for producing highly
            skilled developers who successfully launch innovative and
            commercially viable game titles.
          </p>
        </div>
      </div>

      <h2 className="section-title" style={{ marginTop: '2rem' }}>
        We Believe in Numbers
      </h2>
      <p className="section-subtitle">
        Our achievements speak for themselves. Glimpses of the club's impact on
        the developer community.
      </p>
      <div className="stats-cards-container">
        {statsData.map((stat, index) => (
          <StatCard key={index} stat={stat} />
        ))}
      </div>
    </div>
  </section>
);

// ===================================================================
// 🗣️ 8. Testimonials Section (New)
// ===================================================================

const TestimonialsSection = () => {
  const videoRef = useRef(null);
  // Auto-play requirement: Keep muted to comply with most browser policies for auto-play
  const [isMuted, setIsMuted] = useState(true);

  // Replace with your actual testimonial video path
  const testimonialVideoSrc = 'https://www.w3schools.com/html/mov_bbb.mp4';

  useEffect(() => {
    // Ensure the video plays automatically when the component mounts
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log('Autoplay failed (muted):', error);
      });
    }
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section id="testimonials" className="testimonials-section off-white-bg">
      <div className="container">
        <h2 className="section-title">Voices of Our Members 🎙️</h2>
        <p className="section-subtitle">
          Hear directly from our alumni and current members about their growth
          journey with DGClub.
        </p>

        <div className="large-video-box">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted={isMuted}
            controls
            playsInline // Important for mobile autoplay
            poster="https://via.placeholder.com/900x500?text=Testimonial+Video+Poster"
          >
            <source src={testimonialVideoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <button
            className="cta-button"
            style={{
              position: 'absolute',
              top: '15px',
              right: '15px',
              padding: '8px 15px',
              zIndex: 10,
            }}
            onClick={toggleMute}
          >
            {isMuted ? '🔇 Unmute' : '🔊 Mute'}
          </button>
        </div>

        <p className="video-caption">
          "From zero knowledge to launching my first game on Steam." - Alumni,
          Class of 2024
        </p>
      </div>
    </section>
  );
};

// ===================================================================
// 📞 9. Contact Us
// ===================================================================

const ContactUsSection = () => (
  <section id="contact" className="contact-us-section light-bg">
    <div className="container">
      <h2 className="section-title">Get In Touch</h2>
      <p className="section-subtitle">
        We are ready to answer your questions, whether you're a student or a
        potential partner.
      </p>

      <div className="contact-split-container">
        {/* Left Side: Contact Info */}
        <div className="left-side">
          <h3 style={{ color: 'var(--color-primary)', marginBottom: '30px' }}>
            Contact Details
          </h3>

          <div className="contact-info-item">
            <div className="contact-icon-wrapper">📧</div>
            <div className="info-text">
              <strong>Email Address</strong>
              <a href="mailto:contact@dgclub.com">contact@dgclub.com</a>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-icon-wrapper">📍</div>
            <div className="info-text">
              <strong>Official Location</strong>
              <p>FCAI, Cairo University, Giza, Egypt</p>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-icon-wrapper">💬</div>
            <div className="info-text">
              <strong>Follow Us</strong>
              <div className="social-icons" style={{ marginTop: '5px' }}>
                <a href="#" target="_blank">
                  👍
                </a>
                <a href="#" target="_blank">
                  💼
                </a>
                <a href="#" target="_blank">
                  ▶️
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="right-side">
          <h3 style={{ color: 'var(--color-primary)', marginBottom: '30px' }}>
            Send Us a Message
          </h3>
          <form className="contact-form">
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email Address" required />
            <input type="text" placeholder="Subject" />
            <textarea placeholder="Your Message..." required></textarea>
            <button
              type="submit"
              className="cta-button"
              style={{ width: '100%', borderRadius: '8px' }}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

// ===================================================================
// 📝 10. Footer
// ===================================================================

const Footer = () => {
  const scrollToSection = (e, id) => {
    e.preventDefault();
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  // Replace with your actual logo image path
  const logoImagePath = 'https://via.placeholder.com/30x30?text=DG';

  return (
    <footer className="site-footer dark-bg">
      <div className="container">
        <div className="footer-content-main-row">
          {/* 1. Left Section: Logo & Slogan */}
          <div className="footer-section logo-slogan-col">
            <h3
              className="footer-heading"
              style={{ color: 'var(--color-text-dark)' }}
            >
              <img
                src={logoImagePath}
                alt="DGClub Logo"
                style={{ width: '30px', marginRight: '10px' }}
              />
              DGClub
            </h3>
            <p>
              The leading game development community at FCAI, Cairo University.
              We offer specialized training to build the next generation of game
              developers.
            </p>
            <div className="social-icons">
              <a href="#" target="_blank">
                👍
              </a>
              <a href="#" target="_blank">
                💼
              </a>
              <a href="#" target="_blank">
                ▶️
              </a>
            </div>
          </div>

          {/* 2. Middle Section: Quick Links */}
          <div className="footer-section quick-links-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul>
              <li>
                <a
                  href="#who-we-are"
                  onClick={(e) => scrollToSection(e, 'who-we-are')}
                >
                  About Us
                </a>
              </li>
              <li>
                <a href="#team" onClick={(e) => scrollToSection(e, 'team')}>
                  Our Team
                </a>
              </li>
              <li>
                <a
                  href="#courses"
                  onClick={(e) => scrollToSection(e, 'courses')}
                >
                  Training Tracks
                </a>
              </li>
              <li>
                <a
                  href="#mission-vision"
                  onClick={(e) => scrollToSection(e, 'mission-vision')}
                >
                  Mission & Vision
                </a>
              </li>
              <li>
                <a href="/privacy">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* 3. Right Section: Contact Info */}
          <div className="footer-section contact-info-col">
            <h4 className="footer-heading">Contact Us</h4>
            <p>
              <strong>Location:</strong> Cairo University, Giza.
            </p>
            <p>
              <strong>Email:</strong> contact@dgclub.com
            </p>
            <p>
              <strong>Support:</strong> Available 24/7 online.
            </p>
          </div>
        </div>

        {/* 4. Copyright Row */}
        <div className="footer-copyright-row">
          <p>&copy; {new Date().getFullYear()} DGClub. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// ===================================================================
// 🏠 11. Main Component (App)
// ===================================================================

function App() {
  return (
    <div className="App">
      <Navbar />

      <main>
        <HeroSection />
        <WhoWeAre />
        <TeamSection />
        <CourseIllustration />
        <MissionVisionSection /> {/* Renamed Section */}
        <TestimonialsSection />
        <ContactUsSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;
