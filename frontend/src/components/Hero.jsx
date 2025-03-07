import styled from "styled-components";

const HeroSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 80px 20px;
  background: linear-gradient(135deg, #121212, #1a1a1a);
  color: #fff;
  text-align: left;
`;

const HeroContent = styled.div`
  flex: 1;
  max-width: 50%;
  margin-right: 20px;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 20px;
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
`;

const HeroSubtitle = styled.h4`
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 30px;
  color: #bbb;
`;

const HeroDescription = styled.p`
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: 30px;
  color: #ccc;
`;

const HeroCallout = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #00bcd4;
  margin-top: 20px;
  text-shadow: 0 0 10px rgba(0, 188, 212, 0.6);
`;

const HeroImage = styled.img`
  flex: 1;
  max-width: 50%;
  height: auto;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 188, 212, 0.3);
`;

const Hero = () => {
  return (
    <HeroSection>
      <HeroContent>
        <HeroTitle>🚀 Elevate Your Content Game with WContent!</HeroTitle>
        <HeroSubtitle>Discover the future of AI-powered solutions</HeroSubtitle>
        <HeroDescription>
          WContent is an AI-powered platform for content creators, offering
          reach prediction, comment summarization, and collaboration
          opportunities. Analyze YouTube stats, connect with sponsors, and get
          real-time updates—all in one place! 🚀
        </HeroDescription>
        <HeroCallout>Take control of your content strategy today!</HeroCallout>
      </HeroContent>
      <HeroImage
        src="https://img.freepik.com/premium-vector/characters-holding-like-notifications-male-female-followers-gives-like-networks-people-with-hearts-thumb-up_1016-14497.jpg?w=1800"
        alt="Hero"
      />
    </HeroSection>
  );
};

export default Hero;
