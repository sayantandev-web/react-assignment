import ProfileCard from "./components/Portfolio/ProfileCard";
import MovieApp from "./components/MovieApp/MovieApp";

function App() {
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
        <div style={{ textAlign: "center" }}>
            <h1>Portfolio Slider</h1>
            <ProfileCard profiles={profiles} />
            <hr style={{ margin: "40px 0" }} />
            <MovieApp />
        </div>
    );
}

export default App;