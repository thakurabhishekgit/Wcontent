import React, { useEffect } from "react";
import styled from "styled-components";
import TopNiches from "../components/TopNiches";
import HowItWorks from "../components/HowItWorks";
import Hero from "../components/Hero";
import { Link } from "react-router-dom";

// Slide Components
const Slide1 = () => (
  <Slide>
    <Card>
      <TextContent>
        <h2>AI-Powered Reach Prediction</h2>
        <p>
          Predict your future YouTube growth using AI-driven insights from
          comments, likes, and subscriber data. Stay ahead with data-driven
          decisions! 🚀
        </p>
      </TextContent>
      <img
        src="https://images.unsplash.com/photo-1673648954658-212203f00a0d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzB8fGNvbnRlbnQlMjBjcmVhdG9yfGVufDB8fDB8fHww"
        alt="Welcome"
      />
    </Card>
  </Slide>
);

const Slide2 = () => (
  <Slide>
    <Card>
      <TextContent>
        <h2> Smart Comment Summarization</h2>
        <p>
          Upload your YouTube video URL and get a quick AI-generated summary of
          viewer feedback. Understand your audience instantly! 🎯
        </p>
      </TextContent>
      <img
        src="https://images.unsplash.com/photo-1621184078796-c7452e5a5f65?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjR8fGNvbnRlbnQlMjBjcmVhdG9yfGVufDB8fDB8fHww"
        alt="Features"
      />
    </Card>
  </Slide>
);

const Slide3 = () => (
  <Slide>
    <Card>
      <TextContent>
        <h2>Collaboration & Sponsorships</h2>
        <p>
          Connect with creators, find sponsorships, and grow your network. Post
          and apply for collaboration requests with real-time updates! 🤝
        </p>
      </TextContent>
      <img
        src="https://images.unsplash.com/photo-1642491068210-943797352958?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDh8fGNvbnRlbnQlMjBjcmVhdG9yfGVufDB8fDB8fHww"
        alt="Get Started"
      />
    </Card>
  </Slide>
);

const FeatureSection = () => (
  <Features>
    <h2>Our Key Features</h2>
    <StyledLink to="/predict">
      <FeatureCard>
        <img
          src="data:image/png;base64,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"
          alt="Predict Reach"
        />
        <div>
          <h3>1. AI-Powered Reach Prediction</h3>
          <p>
            Use machine learning to forecast the potential reach of your
            ContentOptions
          </p>
        </div>
      </FeatureCard>
    </StyledLink>
    <StyledLink to="/generate-content">
      <FeatureCard>
        <img
          src="data:image/jpeg;base64,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"
          alt="Generate Content"
        />
        <div>
          <h3>2 Smart Comment Summarization</h3>
          <p>
            Quickly understand audience feedback with AI-generated summaries of
            YouTube comments.
          </p>
        </div>
      </FeatureCard>
    </StyledLink>
    <StyledLink to="/jobs">
      <FeatureCard>
        <img
          src="data:image/jpeg;base64,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"
          alt="Hire Team"
        />
        <div>
          <h3>Collaboration & Sponsorship Hub</h3>
          <p>
            Find creators, secure sponsorships, and expand your network with
            real-time notifications.
          </p>
        </div>
      </FeatureCard>
    </StyledLink>
  </Features>
);

const First = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  const slides = [<Slide1 key="1" />, <Slide2 key="2" />, <Slide3 key="3" />];

  return (
    <Container>
      <IntroSection>
        <Hero />
      </IntroSection>
      <Carousel>
        {slides.map((slide, index) => (
          <div key={index} className="slide">
            {slide}
          </div>
        ))}
      </Carousel>
      <FeatureSection />
      <AdditionalInfo>
        <TopNiches />
        <HowItWorks />
      </AdditionalInfo>
    </Container>
  );
};

export default First;

// Styled Components
const Container = styled.div`
  font-family: Arial, sans-serif;
  color: #fff; /* Light text for dark theme */
  text-align: center;
  padding: 0 20px;
  background: linear-gradient(135deg, #0a0b0b, #000000); /* Dark gradient */
`;

const IntroSection = styled.section`
  padding: 60px 20px;
  background-color: #0d0d0d; /* Dark background */
  border-bottom: 1px solid #444; /* Darker border */

  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    color: #1e90ff; /* Accent color */
  }

  p {
    font-size: 1.2rem;
    color: #aaa; /* Lighter text for readability */
  }
`;

const Carousel = styled.div`
  display: flex;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  height: 600px; /* Increased height */
  border-bottom: 1px solid #444; /* Darker border */

  .slide {
    flex: none;
    scroll-snap-align: start;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Slide = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #222; /* Dark background */
  color: #fff; /* Light text */
`;

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  height: 80%;
  background-color: #333; /* Darker background */
  padding: 20px;
  border-radius: 10px;

  img {
    width: 45%;
    height: auto;
    border-radius: 10px;
  }
`;

const TextContent = styled.div`
  width: 50%;
  text-align: left;

  h2 {
    font-size: 2rem;
    margin: 0;
    color: #fff; /* Light text */
  }

  p {
    font-size: 1.2rem;
    margin-top: 10px;
    color: #aaa; /* Lighter text for readability */
  }
`;

const Features = styled.section`
  padding: 60px 20px;
  background: linear-gradient(135deg, #1a1a1a, #333); /* Dark gradient */
  border-bottom: 1px solid #444; /* Darker border */

  h2 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: #1e90ff; /* Accent color */
  }
`;

const FeatureCard = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  padding: 20px;
  background-color: #2a2a2a; /* Dark background */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Darker shadow */

  img {
    width: 150px;
    height: auto;
    margin-right: 20px;
    border-radius: 10px;
  }

  div {
    text-align: left;

    h3 {
      font-size: 1.8rem;
      margin-bottom: 10px;
      color: #fff; /* Light text */
    }

    p {
      font-size: 1.2rem;
      color: #aaa; /* Lighter text for readability */
    }
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: none;
    color: inherit;
  }
`;

const AdditionalInfo = styled.section`
  padding: 60px 20px;
  background-color: #1a1a1a; /* Dark background */
  color: #fff; /* Light text */

  /* Add styles for additional information here */
`;
