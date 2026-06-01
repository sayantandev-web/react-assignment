import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Film, User } from "lucide-react";
import ProfileCard from "./components/Portfolio/ProfileCard";
import MovieApp from "./components/MovieApp/MovieApp";

function Home() {
    return (
        <div style={{ textAlign: "center", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white", fontFamily: "sans-serif" }}>
            <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>Welcome to My Projects</h1>
            <p style={{ fontSize: "18px", marginBottom: "40px", maxWidth: "500px" }}>Explore my portfolio and movie collection</p>
            <div style={{ display: "flex", gap: "20px" }}>
                <Link to="/portfolio" style={{ textDecoration: "none" }}>
                    <button style={{ display: "flex", alignItems: "center", gap: "10px", padding: "15px 30px", background: "white", color: "#667eea", border: "none", borderRadius: "8px", fontSize: "16px", fontWeight: "bold", cursor: "pointer", transition: "transform 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"} onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>
                        <User size={20} />
                        Portfolio
                    </button>
                </Link>
                <Link to="/movies" style={{ textDecoration: "none" }}>
                    <button style={{ display: "flex", alignItems: "center", gap: "10px", padding: "15px 30px", background: "white", color: "#764ba2", border: "none", borderRadius: "8px", fontSize: "16px", fontWeight: "bold", cursor: "pointer", transition: "transform 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"} onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>
                        <Film size={20} />
                        Movie Explorer
                    </button>
                </Link>
            </div>
        </div>
    );
}

function PortfolioPage() {
    const profiles = [
        {
            name: "Sayantan Bhakta",
            title: "Aspiring Developer",
            bio: "Enthusiastic about learning new technologies. Currently exploring the world of web development. Always eager to take on new challenges and grow as a developer.",
            skills: ["React", "JavaScript", "HTML", "CSS"],
            image: "/profile_img/potrait-1.jpg"
        },
        {
            name: "Rahul Sharma",
            title: "Frontend Developer",
            bio: "Passionate about UI/UX design. Enjoys creating visually appealing and user-friendly interfaces. Always looking for ways to improve user experience.",
            skills: ["React", "Tailwind", "Figma"],
            image: "/profile_img/potrait-2.jpg"
        },
        {
            name: "Anjali Verma",
            title: "Full Stack Developer",
            bio: "Loves building scalable apps. Experienced in both frontend and backend development. Always eager to learn new technologies and improve coding skills. ",
            skills: ["Node.js", "MongoDB", "React"],
            image: "/profile_img/potrait-3.jpg"
        }
    ];

    return (
        <div style={{ textAlign: "center", minHeight: "100vh", padding: "40px 20px" }}>
            <Link to="/" style={{ textDecoration: "none" }}>
                <button style={{ padding: "10px 20px", background: "#667eea", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", marginBottom: "20px", fontWeight: "bold" }}>
                    ← Back to Home
                </button>
            </Link>
            <h1>Portfolio Slider</h1>
            <ProfileCard profiles={profiles} />
        </div>
    );
}

function MoviePage() {
    return (
        <div style={{ minHeight: "100vh" }}>
            <div style={{ padding: "20px", background: "#f5f7fb" }}>
                <Link to="/" style={{ textDecoration: "none" }}>
                    <button style={{ padding: "10px 20px", background: "#667eea", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>
                        ← Back to Home
                    </button>
                </Link>
            </div>
            <MovieApp />
        </div>
    );
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/portfolio" element={<PortfolioPage />} />
                <Route path="/movies" element={<MoviePage />} />
            </Routes>
        </Router>
    );
}

export default App;