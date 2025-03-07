import React from "react";

const TopNiches = () => {
  const services = [
    {
      id: 1,
      service: "Tech Reviews and Tutorials",
      description:
        "Covering the latest gadgets, software reviews, tech news, and how-to guides.",
      url: "https://www.wisestamp.com/partners/",
    },
    {
      id: 2,
      service: "Gaming",
      description:
        "Including game reviews, gameplay walkthroughs, live streaming, and eSports commentary.",
      url: "https://vidiq.com/blog/post/tips-creating-youtube-gaming-channel/",
    },
    {
      id: 3,
      service: "Travel and Adventure",
      description:
        "Content about travel experiences, destination guides, adventure activities, and travel tips.",
      url: "https://greatcontent.com/travel-content-ideas/",
    },
    {
      id: 4,
      service: "DIY and Crafts",
      description:
        "Tutorials and projects related to home improvement, crafts, and creative hobbies.",
      url: "https://www.goodhousekeeping.com/home/craft-ideas/g32336151/adult-craft-ideas/",
    },
    {
      id: 5,
      service: "Food and Cooking",
      description:
        "Recipes, cooking techniques, food reviews, and culinary experiences.",
      url: "https://example.com/food",
    },
    {
      id: 6,
      service: "Education and E-Learning",
      description:
        "Creating educational content, online courses, and tutorials on various subjects.",
      url: "https://example.com/education",
    },
  ];

  return (
    <>
      <style jsx>{`
        .top-niches-container {
          padding: 60px 20px;
          background: linear-gradient(135deg, rgb(0, 1, 3), rgb(120, 118, 118));
          color: #333;
          text-align: center;
        }

        .top-niches-container h3 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 40px;
        }

        .niche-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
        }

        .niche-card {
          background: #ffffff;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          padding: 20px;
          max-width: 350px;
          flex: 1 1 300px;
          transition: transform 0.3s, box-shadow 0.3s;
          text-decoration: none; /* Ensures the text itself is not underlined */
        }

        .niche-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 6px 14px rgba(0, 0, 0, 0.15);
        }

        .niche-card h4 {
          font-size: 1.6rem;
          font-weight: 600;
          margin-bottom: 15px;
        }

        .niche-card p {
          font-size: 1rem;
          color: #666;
        }
      `}</style>
      <section className="top-niches-container">
        <h3>Top Niches</h3>
        <div className="niche-grid">
          {services.map((element) => (
            <a
              className="niche-card"
              href={element.url}
              key={element.id}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h4>{element.service}</h4>
              <p>{element.description}</p>
            </a>
          ))}
        </div>
      </section>
    </>
  );
};

export default TopNiches;
