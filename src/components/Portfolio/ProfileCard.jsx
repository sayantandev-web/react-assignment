import { useState } from "react";

const ProfileCard = ({ profiles }) => {
    const [darkMode, setDarkMode] = useState(false);
    const [likes, setLikes] = useState({});
    const [index, setImgIndex] = useState(0);

    const currentProfile = profiles[index];
    const toggleDarkMode = () => setDarkMode(!darkMode);
    const previousProfile = () => {
        setImgIndex((index - 1 + profiles.length) % profiles.length);
    };
    const nextProfile = () => {
        setImgIndex((index + 1) % profiles.length);
    };
    const handleLike = (profileName) => {
        setLikes((prevLikes) => ({
            ...prevLikes,
            [profileName]: (prevLikes[profileName] || 0) + 1
        }));
    };
    return (
        <div>
            <span onClick={toggleDarkMode} style={{cursor: "pointer", padding: "5px 10px", borderRadius: "25px", background: "color(srgb 0.8994 0.9342 0.9728)", fontWeight: "700", color: "color(srgb 0.2482 0.2836 0.3466)", marginLeft: "25%" }}>☀ {darkMode ? "Toggle Theme" : "Toggle Theme"}</span>
            <div style={{ backgroundColor: darkMode ? "#333" : "#fff", color: darkMode ? "#fff" : "#000", padding: "20px", borderRadius: "10px", maxWidth: "400px", margin: "20px auto", textAlign: "center" }}>
                <div style={{ display: "flex", marginBottom: "20px" }}>
                    <img src={currentProfile.image} alt="Profile" style={{ width: "100px", height: "100px", borderRadius: "50%" }} />
                    <div style={{ marginLeft: "20px", textAlign: "left", marginTop: "20px" }}>
                        <h2 style={{ color: darkMode ? "#fff" : "#000", fontSize: "30px" }}>{currentProfile.name}</h2>
                        <h4 style={{ margin: "0px", color: "#aaa" }}>{currentProfile.title}</h4>
                    </div>
                </div>
                <p style={{ textAlign: "start", letterSpacing: "-1px", lineHeight: "25px" }}>{currentProfile.bio}</p>
                <div style={{ textAlign: "start", marginTop: "15px", color: "#aaa" }}>Skills</div>
                <ul style={{ textAlign: "start", listStyleType: "none", padding: "0" }}>
                    {currentProfile.skills.map((skill, index) => (
                        <li style={{ display: "inline-block", padding: "5px 10px", borderRadius: "25px", marginRight: "5px", background: "color(srgb 0.8994 0.9342 0.9728)", fontWeight: "700", color: "color(srgb 0.2482 0.2836 0.3466)" }} key={index}>{skill}</li>
                    ))}
                </ul>
                <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                    <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                        <span onClick={toggleDarkMode} style={{ cursor: "pointer" }}>🌙 {darkMode ? "Light" : "Dark"}</span>
                        <span onClick={previousProfile} style={{ cursor: "pointer", fontSize: "18px" }}>‹</span>
                        <span onClick={nextProfile} style={{ cursor: "pointer", fontSize: "18px" }}>›</span>
                        <span>{index + 1} / {profiles.length}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                        {/* <span onClick={() => setLikes(likes + 1)} style={{ cursor: "pointer" }}>🤍 {likes}</span> */}
                        <span onClick={() => handleLike(currentProfile.name)} style={{ cursor: "pointer" }}>🤍 {likes[currentProfile.name] || 0}</span>
                        <button style={{ background: "#2d6cdf", color: "#fff", border: "none", padding: "8px 15px", borderRadius: "8px", cursor: "pointer"}}>📩 Contact</button>
                    </div>
                </div>
            </div>
        </div>  
    );
}
export default ProfileCard;