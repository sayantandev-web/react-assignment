import { useState } from "react";
import { Moon, Sun, Heart, Mail, ChevronLeft, ChevronRight } from "lucide-react";

const ProfileCard = ({ profiles }) => {
    const [darkMode, setDarkMode] = useState(false);
    const [likes, setLikes] = useState({});
    const [index, setIndex] = useState(0);

    const currentProfile = profiles[index];
    const toggleDarkMode = () => setDarkMode(!darkMode);
    const previousProfile = () => {
        setIndex((index - 1 + profiles.length) % profiles.length);
    };
    const nextProfile = () => {
        setIndex((index + 1) % profiles.length);
    };
    const handleLike = (profileName) => {
        setLikes((prevLikes) => ({
            ...prevLikes,
            [profileName]: (prevLikes[profileName] || 0) + 1
        }));
    };
    return (
        <div>
            <span onClick={toggleDarkMode} style={{cursor: "pointer", padding: "8px 16px", borderRadius: "25px", background: "color(srgb 0.8994 0.9342 0.9728)", fontWeight: "700", color: "color(srgb 0.2482 0.2836 0.3466)", marginLeft: "25%", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                {darkMode ? "Light" : "Dark"}
            </span>
            <div style={{ backgroundColor: darkMode ? "#333" : "#fff", color: darkMode ? "#fff" : "#000", padding: "20px", borderRadius: "10px", maxWidth: "400px", margin: "20px auto", textAlign: "center" }}>
                <div style={{ display: "flex", marginBottom: "20px" }}>
                    <img src={currentProfile.image} alt="Profile" style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover" }} />
                    <div style={{ marginLeft: "20px", textAlign: "left", marginTop: "20px" }}>
                        <h2 style={{ color: darkMode ? "#fff" : "#000", fontSize: "30px", margin: "0" }}>{currentProfile.name}</h2>
                        <h4 style={{ margin: "5px 0 0 0", color: "#aaa" }}>{currentProfile.title}</h4>
                    </div>
                </div>
                <p style={{ textAlign: "start", letterSpacing: "-1px", lineHeight: "25px" }}>{currentProfile.bio}</p>
                <div style={{ textAlign: "start", marginTop: "15px", color: "#aaa" }}>Skills</div>
                <ul style={{ textAlign: "start", listStyleType: "none", padding: "0" }}>
                    {currentProfile.skills.map((skill, idx) => (
                        <li style={{ display: "inline-block", padding: "5px 10px", borderRadius: "25px", marginRight: "5px", background: "color(srgb 0.8994 0.9342 0.9728)", fontWeight: "700", color: "color(srgb 0.2482 0.2836 0.3466)" }} key={idx}>{skill}</li>
                    ))}
                </ul>
                <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "20px"}}>
                    <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                        <button onClick={previousProfile} style={{ cursor: "pointer", fontSize: "18px", background: "none", border: "none", color: darkMode ? "#fff" : "#000", padding: "5px", display: "flex", alignItems: "center" }}>
                            <ChevronLeft size={24} />
                        </button>
                        <span style={{ fontWeight: "bold" }}>{index + 1} / {profiles.length}</span>
                        <button onClick={nextProfile} style={{ cursor: "pointer", fontSize: "18px", background: "none", border: "none", color: darkMode ? "#fff" : "#000", padding: "5px", display: "flex", alignItems: "center" }}>
                            <ChevronRight size={24} />
                        </button>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                        <button onClick={() => handleLike(currentProfile.name)} style={{ cursor: "pointer", background: "none", border: "none", color: darkMode ? "#fff" : "#000", display: "flex", alignItems: "center", gap: "5px", fontSize: "16px" }}>
                            <Heart size={20} fill={likes[currentProfile.name] > 0 ? "currentColor" : "none"} />
                            {likes[currentProfile.name] || 0}
                        </button>
                        <button style={{ background: "#2d6cdf", color: "#fff", border: "none", padding: "8px 15px", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
                            <Mail size={18} />
                            Contact
                        </button>
                    </div>
                </div>
            </div>
        </div>  
    );
}
export default ProfileCard;