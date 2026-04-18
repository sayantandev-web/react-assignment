import React, { useState, useEffect } from "react";

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

export default function MovieExplorer() {
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

    const theme = darkMode ? darkStyles : lightStyles;

    return (
        <div style={theme.page}>
            <button style={theme.toggleBtn} onClick={() => setDarkMode(!darkMode)}>{darkMode ? "☀ Toggle Theme" : "☀ Toggle Theme"}</button>
            <div style={theme.cardContainer}>
                <div style={theme.header}>
                    <h1 style={{ margin: "0 0 5px 0", color: "#aaa", lineHeight: "normal" }}>Movie Explorer</h1>
                    <p style={theme.subText}>Search, filter, and favorite movies.</p>
                </div>
                <div style={theme.searchRow}>
                    <input placeholder='Search movies (e.g. "Interstellar", "Star")' value={search} onChange={(e) => setSearch(e.target.value)} style={theme.input}/>
                    {search && (
                        <span style={theme.clear} onClick={() => setSearch("")}> ✕ </span>
                    )}
                    <button style={theme.resetBtn} onClick={() => setSearch("")}> Reset </button>
                </div>
                <div style={theme.resultInfo}>{search ? `${filteredMovies.length} results for "${search}"` : `Showing all movies`}</div>
                <div style={theme.content}>
                    <div style={theme.left}>
                        <h3>Matching Movies</h3>
                        {filteredMovies.length === 0 ? (
                            <p style={theme.info}>No movies found ❌</p>
                        ) : (
                            filteredMovies.map((movie) => (
                                <div key={movie.id} style={theme.movieCard}>
                                    <div>
                                        <strong>{movie.title} <span style={theme.muted}>{movie.year}</span></strong>
                                        <div style={theme.tagsRow}>
                                            <span style={theme.badge}>⭐ {movie.rating}</span>
                                            {movie.tags.map((tag, i) => (
                                                <span key={i} style={theme.tag}>{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <button onClick={() => toggleFavorite(movie)} style={{...theme.favBtn,background: isFavorite(movie.id) ? "#ff4d4f" : theme.favBtn.background, color: isFavorite(movie.id) ? "white" : theme.text,}}>
                                        {isFavorite(movie.id) ? "♥ Favorited" : "♡ Favorite"}
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                    <div style={theme.right}>
                        <h3>Favorite Movies</h3>
                        {favorites.length === 0 ? (
                            <p style={theme.info}>You haven't added any favorites yet.</p>
                        ) : (
                            favorites.map((movie) => (
                                <div key={movie.id} style={theme.favoriteItem}>♡ {movie.title} ({movie.year})</div>
                            ))
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
    toggleBtn: { padding: "8px", cursor: "pointer" },
    searchRow: { display: "flex", gap: "10px" },
    input: { flex: 1, padding: "10px" },
    clear: { cursor: "pointer" },
    resetBtn: { background: "rgb(36, 99, 234)", color: "white", padding: "8px", borderRadius: "10px", border: "none" },
    resultInfo: { color: "gray", margin: "10px 0" },
    content: { display: "flex", gap: "20px" },
    left: { flex: 2 },
    right: { flex: 1 },
    movieCard: {
        display: "flex",
        justifyContent: "space-between",
        background: "#eef2f7",
        padding: "10px",
        marginBottom: "10px",
        alignItems: "center",
    },
    favoriteItem: { background: "#f1f5f9", padding: "8px" },
    favBtn: { background: "#ddd", padding: "6px", minHeight: "35px" },
    badge: { background: "gold", padding: "4px" },
    tag: { background: "#ddd", padding: "4px", marginLeft: "5px" },
    tagsRow: { marginTop: "5px" },
    muted: { color: "gray" },
    info: { color: "gray" },
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
    toggleBtn: { padding: "8px", cursor: "pointer" },
    searchRow: { display: "flex", gap: "10px" },
    input: { flex: 1, padding: "10px", background: "#334155", color: "white" },
    clear: { cursor: "pointer" },
    resetBtn: { background: "rgb(36, 99, 234)", color: "white", padding: "8px", borderRadius: "10px", border: "none" },
    resultInfo: { color: "#94a3b8", margin: "10px 0" },
    content: { display: "flex", gap: "20px" },
    left: { flex: 2 },
    right: { flex: 1 },
    movieCard: {
        display: "flex",
        justifyContent: "space-between",
        background: "#334155",
        padding: "10px",
        marginBottom: "10px",
    },
    favoriteItem: { background: "#334155", padding: "8px" },
    favBtn: { background: "#475569", padding: "6px" },
    badge: { background: "#facc15", padding: "4px" },
    tag: { background: "#475569", padding: "4px", marginLeft: "5px" },
    tagsRow: { marginTop: "5px" },
    muted: { color: "#94a3b8" },
    info: { color: "#94a3b8" },
};
