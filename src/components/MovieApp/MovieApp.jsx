import React, { useState, useEffect } from "react";
import { Sun, Moon, X, RotateCcw, Star, Heart, AlertCircle } from "lucide-react";

const moviesData = [
    {
        id: 1,
        title: "Interstellar",
        year: 2014,
        genre: "Sci-Fi",
        rating: 8.6,
        tags: ["Adventure", "Space", "Time"],
    },
    {
        id: 2,
        title: "Star Wars: A New Hope",
        year: 1977,
        genre: "Sci-Fi",
        rating: 8.6,
        tags: ["Space Opera", "Rebels", "Galaxy"],
    },
    {
        id: 3,
        title: "The Star",
        year: 2017,
        genre: "Animation",
        rating: 6.1,
        tags: ["Family", "Journey", "Friends"],
    },
];

function MovieApp() {
    const [search, setSearch] = useState("");
    const [favorites, setFavorites] = useState([]);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites");
        if (storedFavs) setFavorites(JSON.parse(storedFavs));

        const storedTheme = localStorage.getItem("theme");
        if (storedTheme === "dark") setDarkMode(true);
    }, []);

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    useEffect(() => {
        localStorage.setItem("theme", darkMode ? "dark" : "light");
    }, [darkMode]);

    const filteredMovies = search
        ? moviesData.filter((movie) =>
            movie.title.toLowerCase().includes(search.toLowerCase())
        )
        : moviesData;

    const toggleFavorite = (movie) => {
        const exists = favorites.find((fav) => fav.id === movie.id);
        if (exists) {
            setFavorites(favorites.filter((fav) => fav.id !== movie.id));
        } else {
            setFavorites([...favorites, movie]);
        }
    };

    const isFavorite = (id) => favorites.some((fav) => fav.id === id);

    const handleReset = () => {
        setSearch("");
        setFavorites([]);
    };

    const theme = darkMode ? darkStyles : lightStyles;

    return (
        <div style={theme.page}>
            <button style={theme.toggleBtn} onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <Sun size={20} style={{ marginRight: "8px" }} /> : <Moon size={20} style={{ marginRight: "8px" }} />}
                {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
            <div style={theme.cardContainer}>
                <div style={theme.header}>
                    <h1 style={{ margin: "0 0 5px 0", color: "#aaa", lineHeight: "normal" }}>Movie Explorer</h1>
                    <p style={theme.subText}>Search, filter, and favorite movies.</p>
                </div>
                <div style={theme.searchRow}>
                    <input placeholder='Search movies (e.g. "Interstellar", "Star")' value={search} onChange={(e) => setSearch(e.target.value)} style={theme.input}/>
                    {search && (
                        <button style={theme.clear} onClick={() => setSearch("")} title="Clear search">
                            <X size={18} />
                        </button>
                    )}
                    <button style={theme.resetBtn} onClick={handleReset} title="Reset all">
                        <RotateCcw size={18} style={{ marginRight: "6px" }} />
                        Reset All
                    </button>
                </div>
                <div style={theme.resultInfo}>{search ? `${filteredMovies.length} results for "${search}"` : `Showing all movies`}</div>
                <div style={theme.content}>
                    <div style={theme.left}>
                        <h3>Matching Movies</h3>
                        {filteredMovies.length === 0 ? (
                            <div style={{ display: "flex", alignItems: "center", gap: "10px", ...theme.info }}>
                                <AlertCircle size={20} />
                                <span>No movies found</span>
                            </div>
                        ) : (
                            filteredMovies.map((movie) => (
                                <div key={movie.id} style={theme.movieCard}>
                                    <div>
                                        <strong>{movie.title} <span style={theme.muted}>{movie.year}</span></strong>
                                        <div style={theme.tagsRow}>
                                            <span style={theme.badge}>
                                                <Star size={14} style={{ marginRight: "4px" }} />
                                                {movie.rating}
                                            </span>
                                            {movie.tags.map((tag, i) => (
                                                <span key={i} style={theme.tag}>{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <button onClick={() => toggleFavorite(movie)} style={{...theme.favBtn, background: isFavorite(movie.id) ? "#ff4d4f" : theme.favBtn.background, color: isFavorite(movie.id) ? "white" : theme.text, display: "flex", alignItems: "center", gap: "8px"}}>
                                        {isFavorite(movie.id) ? (
                                            <>
                                                <Heart size={18} fill="currentColor" />
                                                Favorited
                                            </>
                                        ) : (
                                            <>
                                                <Heart size={18} />
                                                Favorite
                                            </>
                                        )}
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                    <div style={theme.right}>
                        <h3>Favorite Movies ({favorites.length})</h3>
                        {favorites.length === 0 ? (
                            <p style={theme.info}>You haven't added any favorites yet.</p>
                        ) : (
                            <div>
                                {favorites.map((movie) => (
                                    <div key={movie.id} style={theme.favoriteItem}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                <Heart size={16} fill="currentColor" />
                                                {movie.title}
                                            </span>
                                            <span style={theme.muted}>({movie.year})</span>
                                        </div>
                                    </div>
                                ))}
                                <button onClick={() => setFavorites([])} style={{...theme.resetBtn, width: "100%", marginTop: "10px"}}>
                                    Clear Favorites
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// LIGHT THEME
const lightStyles = {
    text: "black",
    page: {
        background: "#f5f7fb",
        minHeight: "100vh",
        padding: "40px",
        fontFamily: "sans-serif",
    },
    cardContainer: {
        background: "white",
        borderRadius: "16px",
        padding: "20px",
        maxWidth: "900px",
        margin: "auto",
    },
    header: { display: "block", textAlign: "start" },
    subText: { color: "#aaa", margin: "0 0 10px 0", lineHeight: "normal" },
    toggleBtn: { padding: "10px 15px", cursor: "pointer", background: "white", border: "1px solid #ddd", borderRadius: "8px", display: "flex", alignItems: "center", marginBottom: "20px", color: "black" },
    searchRow: { display: "flex", gap: "10px", marginBottom: "15px" },
    input: { flex: 1, padding: "10px", border: "1px solid #ddd", borderRadius: "6px" },
    clear: { cursor: "pointer", background: "none", border: "none", padding: "8px", display: "flex", alignItems: "center", color: "#666" },
    resetBtn: { background: "rgb(36, 99, 234)", color: "white", padding: "10px 15px", borderRadius: "6px", border: "none", cursor: "pointer", display: "flex", alignItems: "center", fontWeight: "bold" },
    resultInfo: { color: "gray", margin: "10px 0", fontSize: "14px" },
    content: { display: "flex", gap: "20px", marginTop: "20px" },
    left: { flex: 2 },
    right: { flex: 1 },
    movieCard: {
        display: "flex",
        justifyContent: "space-between",
        background: "#eef2f7",
        padding: "12px",
        marginBottom: "10px",
        borderRadius: "6px",
        alignItems: "center",
        gap: "10px",
    },
    favoriteItem: { background: "#f1f5f9", padding: "10px", marginBottom: "8px", borderRadius: "6px", fontSize: "14px" },
    favBtn: { background: "#ddd", padding: "8px 12px", minHeight: "35px", border: "none", borderRadius: "6px", cursor: "pointer", whiteSpace: "nowrap" },
    badge: { background: "gold", padding: "4px 8px", borderRadius: "4px", display: "inline-flex", alignItems: "center", fontSize: "13px" },
    tag: { background: "#ddd", padding: "4px 8px", marginLeft: "5px", borderRadius: "4px", fontSize: "12px", display: "inline-block" },
    tagsRow: { marginTop: "8px" },
    muted: { color: "gray", fontSize: "13px" },
    info: { color: "gray", fontSize: "14px", padding: "10px" },
};

// DARK THEME
const darkStyles = {
    text: "white",
    page: {
        background: "#0f172a",
        minHeight: "100vh",
        padding: "40px",
        fontFamily: "sans-serif",
        color: "white",
    },
    cardContainer: {
        background: "#1e293b",
        borderRadius: "16px",
        padding: "20px",
        maxWidth: "900px",
        margin: "auto",
    },
    header: { display: "block", textAlign: "start" },
    subText: { color: "#94a3b8", margin: "0 0 10px 0", lineHeight: "normal" },
    toggleBtn: { padding: "10px 15px", cursor: "pointer", background: "#334155", border: "1px solid #475569", borderRadius: "8px", color: "white", display: "flex", alignItems: "center", marginBottom: "20px" },
    searchRow: { display: "flex", gap: "10px", marginBottom: "15px" },
    input: { flex: 1, padding: "10px", background: "#334155", color: "white", border: "1px solid #475569", borderRadius: "6px" },
    clear: { cursor: "pointer", background: "none", border: "none", padding: "8px", display: "flex", alignItems: "center", color: "#94a3b8" },
    resetBtn: { background: "rgb(36, 99, 234)", color: "white", padding: "10px 15px", borderRadius: "6px", border: "none", cursor: "pointer", display: "flex", alignItems: "center", fontWeight: "bold" },
    resultInfo: { color: "#94a3b8", margin: "10px 0", fontSize: "14px" },
    content: { display: "flex", gap: "20px", marginTop: "20px" },
    left: { flex: 2 },
    right: { flex: 1 },
    movieCard: {
        display: "flex",
        justifyContent: "space-between",
        background: "#334155",
        padding: "12px",
        marginBottom: "10px",
        borderRadius: "6px",
        alignItems: "center",
        gap: "10px",
    },
    favoriteItem: { background: "#334155", padding: "10px", marginBottom: "8px", borderRadius: "6px", fontSize: "14px" },
    favBtn: { background: "#475569", padding: "8px 12px", border: "none", borderRadius: "6px", cursor: "pointer", color: "white", whiteSpace: "nowrap" },
    badge: { background: "#facc15", padding: "4px 8px", borderRadius: "4px", display: "inline-flex", alignItems: "center", fontSize: "13px", color: "black" },
    tag: { background: "#475569", padding: "4px 8px", marginLeft: "5px", borderRadius: "4px", fontSize: "12px", display: "inline-block" },
    tagsRow: { marginTop: "8px" },
    muted: { color: "#94a3b8", fontSize: "13px" },
    info: { color: "#94a3b8", fontSize: "14px", padding: "10px" },
};

export default MovieApp;
