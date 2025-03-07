import React, { useState, useEffect } from "react";
import run from "../api/gemini";

const GenerateContent = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const predefinedPrompts = [
    {
      heading: "hi",
      description:
        "Explore how artificial intelligence is transforming content creation and enhancing productivity in digital marketing.",
    },
    {
      heading: "Trends in Content Marketing for 2024",
      description:
        "Discover the latest trends in content marketing and strategies to stay ahead in the digital landscape.",
    },
    {
      heading: "Leveraging Data Analytics for Content Strategy",
      description:
        "Learn how to use data analytics to inform and optimize your content strategy for better engagement and results.",
    },
    {
      heading: "The Role of Personalization in Content Creation",
      description:
        "Understand the importance of personalized content and how to create tailored experiences for your audience.",
    },
    {
      heading: "Emerging Content Formats and Their Benefits",
      description:
        "Stay updated on new content formats such as interactive videos and podcasts, and their advantages for audience engagement.",
    },
    {
      heading: "Building Brand Authority Through Content",
      description:
        "Strategies for using content to establish and reinforce your brand’s authority in your industry.",
    },
  ];

  useEffect(() => {
    const savedHistory =
      JSON.parse(localStorage.getItem("searchHistory")) || [];
    const timestamp = localStorage.getItem("historyTimestamp");
    const now = new Date().getTime();

    // Check if the saved history is older than 1 day (24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
    if (timestamp && now - timestamp > 24 * 60 * 60 * 1000) {
      localStorage.removeItem("searchHistory");
      localStorage.removeItem("historyTimestamp");
    } else {
      setHistory(savedHistory);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    generateResponse(prompt);
    addToHistory(prompt);
  };

  const handleCardClick = (heading) => {
    generateResponse(heading);
    addToHistory(heading);
  };

  const generateResponse = async (inputPrompt) => {
    setLoading(true);
    const generatedResponse = await run(inputPrompt);
    const formattedResponse = formatResponse(generatedResponse);
    setResponse(formattedResponse);
    setLoading(false);
  };

  const addToHistory = (newPrompt) => {
    const newHistory = [newPrompt, ...history].slice(0, 10); // Keep only the latest 10 searches
    setHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
    localStorage.setItem("historyTimestamp", new Date().getTime());
  };

  const handleHistoryClick = (historyPrompt) => {
    setPrompt(historyPrompt);
    generateResponse(historyPrompt);
  };

  const formatResponse = (response) => {
    // Split the response into sections based on headings and paragraphs
    const sections = response.split(/(?=\*\*|^##)/); // Splits at headings and bullet points

    // Process each section
    return sections.map((section, index) => {
      if (section.startsWith("**")) {
        // Handle bullet points
        return (
          <ul key={index} style={styles.list}>
            {section
              .split("\n")
              .filter((line) => line.startsWith("*"))
              .map((item, i) => (
                <li key={i} style={styles.listItem}>
                  {item.replace(/^\*\s*/, "")}
                </li>
              ))}
          </ul>
        );
      } else if (section.startsWith("##")) {
        // Handle headings
        return (
          <div key={index} style={styles.headingContainer}>
            <h2 style={styles.heading}>{section.replace(/^##\s*/, "")}</h2>
          </div>
        );
      } else {
        // Handle paragraphs
        return (
          <p key={index} style={styles.paragraph}>
            {section.trim()}
          </p>
        );
      }
    });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Generate Content using AI</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt"
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Generate
        </button>
      </form>
      {loading && <div style={styles.loading}>Loading...</div>}
      {response && !loading && (
        <div style={styles.response}>
          <h2 style={styles.responseTitle}>Response:</h2>
          <div style={styles.responseContent}>{response}</div>
        </div>
      )}
      <br />
      <br />
      <h2 style={styles.subTitle}>Some recent viral prompts</h2>
      <br />
      <br />
      <div style={styles.cardContainer}>
        {predefinedPrompts.map((prompt, index) => (
          <div
            key={index}
            style={styles.card}
            onClick={() => handleCardClick(prompt.heading)}
          >
            <h3 style={styles.cardHeading}>{prompt.heading}</h3>
            <hr style={styles.cardDivider} />
            <p style={styles.cardDescription}>{prompt.description}</p>
          </div>
        ))}
      </div>
      {history.length > 0 && (
        <div style={styles.historyContainer}>
          <h2 style={styles.historyTitle}>Previous Searches</h2>
          <ul style={styles.historyList}>
            {history.map((item, index) => (
              <li
                key={index}
                style={styles.historyItem}
                onClick={() => handleHistoryClick(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#1a1a1a",
    minHeight: "100vh",
    color: "#fff",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "20px",
    color: "#fff",
  },
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "20px",
    marginBottom: "20px",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#2a2a2a",
    border: "1px solid #444",
    borderRadius: "12px",
    padding: "20px",
    width: "320px",
    cursor: "pointer",
    textAlign: "center",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
    transition: "transform 0.3s, box-shadow 0.3s",
  },
  cardHeading: {
    fontSize: "1.5rem",
    fontWeight: "600",
    marginBottom: "10px",
    color: "#007bff",
  },
  cardDivider: {
    width: "80%",
    height: "1px",
    backgroundColor: "#444",
    border: "none",
    margin: "10px auto",
  },
  cardDescription: {
    color: "#ccc",
    fontSize: "1rem",
  },
  form: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
  input: {
    padding: "14px",
    marginRight: "10px",
    width: "300px",
    border: "1px solid #444",
    borderRadius: "8px",
    fontSize: "1rem",
    outline: "none",
    backgroundColor: "#333",
    color: "#fff",
    transition: "border-color 0.3s",
  },
  button: {
    padding: "14px 24px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#007bff",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.3s",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
  },
  response: {
    marginTop: "20px",
    width: "80%",
    border: "1px solid #444",
    borderRadius: "12px",
    padding: "20px",
    backgroundColor: "#2a2a2a",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
  },
  responseTitle: {
    fontSize: "1.5rem",
    marginBottom: "15px",
    color: "#fff",
  },
  responseContent: {
    lineHeight: "1.8",
    fontSize: "1rem",
    color: "#ccc",
  },
  headingContainer: {
    marginBottom: "15px",
  },
  heading: {
    fontSize: "1.75rem",
    fontWeight: "700",
    color: "#007bff",
    marginBottom: "10px",
  },
  list: {
    paddingLeft: "20px",
    marginBottom: "15px",
    listStyleType: "disc",
  },
  listItem: {
    fontSize: "1rem",
    lineHeight: "1.8",
    color: "#ccc",
  },
  paragraph: {
    fontSize: "1rem",
    lineHeight: "1.8",
    color: "#ccc",
    marginBottom: "15px",
  },
  loading: {
    marginTop: "20px",
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#007bff",
  },
  historyContainer: {
    marginTop: "20px",
    width: "80%",
    border: "1px solid #444",
    borderRadius: "12px",
    padding: "20px",
    backgroundColor: "#2a2a2a",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
  },
  historyTitle: {
    fontSize: "1.5rem",
    marginBottom: "15px",
    color: "#fff",
  },
  historyList: {
    listStyleType: "disc",
    paddingLeft: "20px",
  },
  historyItem: {
    fontSize: "1rem",
    lineHeight: "1.8",
    color: "#ccc",
    cursor: "pointer",
  },
};

export default GenerateContent;
