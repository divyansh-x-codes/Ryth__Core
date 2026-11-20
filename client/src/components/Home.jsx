
//  RythCore - Home Component (Home.jsx)


import { useState } from "react";
import "../styles/Home.css";

// Supported editorial categories
const CATEGORIES = [
  "For you",
  "Technology",
  "Business",
  "Mindset",
  "Health",
  "Culture",
  "Creativity",
  "Career",
];

function Home({ stories = [], onNavigate, onOpenWrite, onToggleLike, onToggleBookmark }) {
  // --- Active category filter state (default: "For you" shows all) ---
  const [selectedCat, setSelectedCat] = useState("For you");

  // --- Sort order state ---
  const [sortOrder, setSortOrder] = useState("Latest");

  // LOGIC: Filter stories based on selected category & sort order
  let filteredStories = stories.filter((story) => {
    if (selectedCat === "For you") return true;
    return story.category?.name?.toLowerCase() === selectedCat.toLowerCase();
  });

  if (sortOrder === "Popular") {
    filteredStories = [...filteredStories].sort((a, b) => (b.likesCount || 0) - (a.likesCount || 0));
  } else if (sortOrder === "Oldest") {
    filteredStories = [...filteredStories].reverse();
  }

  return (
    <div className="home-page">
      {/* 1. HERO SECTION         */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-tag">
            ✧ IDEAS • PEOPLE • PERSPECTIVES
          </div>

          <h1>
            A place for the
            <br />
            curious <em>mind.</em>
          </h1>

          <div className="hero-buttons">
            <button className="explore-button" onClick={() => onNavigate("STORIES")}>
              Explore Stories →
            </button>
            <button
              className="watch-button"
              onClick={() => alert("RythCore: Where curious minds explore technology, philosophy, and original perspectives.")}
            >
              ⏵ Watch Intro
            </button>
          </div>

          <div className="hero-footer">
            <div className="hero-avatars">
              <span>D</span>
              <span>R</span>
              <span>S</span>
            </div>
            <p>Curious minds & writers sharing perspectives</p>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY FILTER & SORT BAR                                */}
      <div className="category-bar">
        <div className="categories">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={selectedCat === cat ? "selected" : ""}
              onClick={() => setSelectedCat(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <select
          className="sort-select"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="Latest">Latest</option>
          <option value="Popular">Popular</option>
          <option value="Oldest">Oldest</option>
        </select>
      </div>

      {/* 3. STORIES FEED / CLEAN EMPTY STATE                         */}
      {filteredStories.length > 0 ? (
        <div className="stories-feed-grid">
          {filteredStories.map((story) => (
            <article key={story.id} className="home-story-card">
              {story.coverImage && (
                <div className="story-card-thumb">
                  <img src={story.coverImage} alt={story.title} />
                  <span className="story-cat-badge">{story.category?.name || "General"}</span>
                </div>
              )}

              <div className="story-card-info">
                {/* Author Info Header */}
                <div className="story-author-row">
                  <div className="author-circle">
                    {story.author?.name ? story.author.name[0] : "R"}
                  </div>
                  <div>
                    <strong>{story.author?.name || "Ryth Editorial"}</strong>
                    <small>{story.publishedAt || "Recently Published"}</small>
                  </div>
                </div>

                {/* Title & Excerpt */}
                <h3>{story.title}</h3>
                <p className="story-card-excerpt">{story.excerpt}</p>

                {/* Footer with read time & interaction buttons */}
                <div className="story-card-footer">
                  <span className="read-time">4 min read</span>
                  <div className="story-interactions">
                    {/* Like Button */}
                    <button
                      className={`action-btn ${story.isLiked ? "active" : ""}`}
                      onClick={() => onToggleLike && onToggleLike(story.id)}
                      title="Like this story"
                    >
                      {story.isLiked ? "❤️" : "🤍"} {story.likesCount || 0}
                    </button>

                    {/* Bookmark Button */}
                    <button
                      className={`action-btn ${story.isBookmarked ? "active" : ""}`}
                      onClick={() => onToggleBookmark && onToggleBookmark(story.id)}
                      title="Bookmark this story"
                    >
                      {story.isBookmarked ? "🔖" : "📑"}
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        /* Empty State matching Image 1 when no stories exist */
        <section className="stories-empty">
          <div className="empty-icon">✧</div>
          <h2>No stories published yet</h2>
          <p>
            All demo data has been cleared. Be the first to publish a
            <br />
            new story and share your perspective.
          </p>
          <button className="write-story-button" onClick={onOpenWrite}>
            Write a Story →
          </button>
        </section>
      )}
    </div>
  );
}

export default Home;