
import { useState } from "react";
import "../styles/Stories.css";

// Media Formats
const FORMATS = [
  { id: "articles", title: "Articles", desc: "Long-form reading", color: "articles" },
  { id: "videos", title: "Videos", desc: "Visual essays", color: "videos" },
  { id: "shorts", title: "Shorts", desc: "Quick insights", color: "shorts" },
  { id: "podcasts", title: "Podcasts", desc: "Audio dialogues", color: "podcasts" },
  { id: "interviews", title: "Interviews", desc: "Founder dialogues", color: "interviews" },
  { id: "series", title: "Series", desc: "Curated editions", color: "series" },
];

// Trending Videos matching Image 2
const TRENDING_VIDEOS = [
  {
    id: 1,
    title: "The AI Revolution Explained Simply",
    tag: "THE AI REVOLUTION",
    meta: "Featured editorial • Recent",
    duration: "12:45",
    type: "ai-video",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600",
  },
  {
    id: 2,
    title: "How to Stay Focused in a Distracted World",
    tag: "DEEP FOCUS",
    meta: "Deep dive • Recent",
    duration: "8:21",
    type: "focus-video",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600",
  },
  {
    id: 3,
    title: "A New Way of Thinking",
    tag: "COGNITION",
    meta: "Perspective • Recent",
    duration: "10:12",
    type: "thinking-video",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600",
  },
  {
    id: 4,
    title: "Building a Life You're Proud Of",
    tag: "LIFE ARCHITECTURE",
    meta: "Workshop • Recent",
    duration: "14:36",
    type: "life-video",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600",
  },
];

function Stories({ stories = [], onToggleLike, onToggleBookmark, onOpenWrite }) {
  const [selectedFormat, setSelectedFormat] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(null);

  return (
    <div className="stories-page">
      {/* 1. STORIES FOR YOU */}
      <section className="story-section">
        <div className="section-heading">
          <h2>Stories for You</h2>
          <a href="#browse-formats" onClick={(e) => e.preventDefault()}>See all →</a>
        </div>

        {stories.length > 0 ? (
          <div className="stories-grid-carousel">
            {stories.map((story) => (
              <div key={story.id} className="carousel-story-card">
                {story.coverImage && (
                  <div className="carousel-story-thumb">
                    <img src={story.coverImage} alt={story.title} />
                  </div>
                )}
                <div className="carousel-story-body">
                  <span className="carousel-story-tag">{story.category?.name || "Perspective"}</span>
                  <h4>{story.title}</h4>
                  <p>{story.excerpt}</p>
                  <div className="carousel-story-bottom">
                    <small>{story.author?.name || "Author"}</small>
                    <div className="carousel-btns">
                      <button
                        className={`action-btn-sm ${story.isLiked ? "active" : ""}`}
                        onClick={() => onToggleLike && onToggleLike(story.id)}
                      >
                        {story.isLiked ? "❤️" : "🤍"} {story.likesCount || 0}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-stories-box">
            <p>No published stories yet.</p>
            <button className="write-btn-inline" onClick={onOpenWrite}>Write First Story →</button>
          </div>
        )}
      </section>

      {/* 2. BROWSE BY FORMAT */}
      <section className="story-section" id="browse-formats">
        <h2 className="section-title">Browse by Format</h2>
        <div className="format-grid">
          {FORMATS.map((fmt) => (
            <div
              key={fmt.id}
              className={`format-card ${fmt.color} ${selectedFormat === fmt.id ? "format-active" : ""}`}
              onClick={() => setSelectedFormat(selectedFormat === fmt.id ? null : fmt.id)}
              style={{ cursor: "pointer" }}
            >
              <h3>{fmt.title}</h3>
              <p>{fmt.desc}</p>
              <span>→</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. TRENDING VIDEOS */}
      <section className="story-section trending-section">
        <div className="section-heading">
          <h2>Trending Videos</h2>
          <a href="#trending" onClick={(e) => e.preventDefault()}>See all →</a>
        </div>

        <div className="video-grid">
          {TRENDING_VIDEOS.map((vid) => (
            <div
              key={vid.id}
              className="video-card"
              onClick={() => setPlayingVideo(vid)}
              style={{ cursor: "pointer" }}
            >
              <div className="video-image">
                <img src={vid.image} alt={vid.title} className="video-poster-img" />
                <strong>{vid.tag}</strong>
                <span className="play-button">▶</span>
                <small>{vid.duration}</small>
              </div>
              <h3>{vid.title}</h3>
              <p>{vid.meta}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. VIDEO PREVIEW MODAL */}
      {playingVideo && (
        <div className="video-modal-backdrop" onClick={() => setPlayingVideo(null)}>
          <div className="video-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="video-modal-header">
              <h3>{playingVideo.title}</h3>
              <button className="close-btn" onClick={() => setPlayingVideo(null)}>✕</button>
            </div>
            <div className="video-player-container">
              <img src={playingVideo.image} alt={playingVideo.title} />
              <div className="player-overlay">
                <span className="player-big-btn">▶</span>
                <p>Playing: {playingVideo.title} ({playingVideo.duration})</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Stories;
