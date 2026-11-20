import { useState } from "react";
import "../styles/Profile.css";

function Profile() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="profile-page">
      {/* 1. PROFILE HEADER CARD */}
      <div className="profile-hero-card">
        <div className="profile-main-info">
          <div className="profile-big-avatar">S</div>
          <div>
            <div className="profile-name-row">
              <h2>Simply</h2>
              <span className="profile-role-tag">Curator & Reader</span>
            </div>
            <p className="profile-email">reader@rythcore.com</p>
            <p className="profile-bio">
              "Curious mind exploring deep technology, mindset shifts, and lifelong learning."
            </p>
          </div>
        </div>

        {/* Action Button: Google Sign-in */}
        <div className="profile-actions">
          <a
            href="http://localhost:3000/auth/google"
            className="google-connect-btn"
            target="_blank"
            rel="noreferrer"
          >
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Sign in with Google
          </a>
        </div>
      </div>

      {/* 2. STATS ROW */}
      <div className="profile-stats-grid">
        <div className="stat-card">
          <span className="stat-num">3</span>
          <span className="stat-label">Stories Written</span>
        </div>
        <div className="stat-card">
          <span className="stat-num">14</span>
          <span className="stat-label">Stories Liked</span>
        </div>
        <div className="stat-card">
          <span className="stat-num">8</span>
          <span className="stat-label">Bookmarks Saved</span>
        </div>
        <div className="stat-card">
          <span className="stat-num highlight">Club+</span>
          <span className="stat-label">Membership Tier</span>
        </div>
      </div>

      {/* 3. PROFILE TABS */}
      <div className="profile-tabs">
        <button
          className={`tab-item ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={`tab-item ${activeTab === "bookmarks" ? "active" : ""}`}
          onClick={() => setActiveTab("bookmarks")}
        >
          Saved Bookmarks
        </button>
        <button
          className={`tab-item ${activeTab === "activity" ? "active" : ""}`}
          onClick={() => setActiveTab("activity")}
        >
          Recent Activity
        </button>
      </div>

      {/* 4. TAB PANELS */}
      <div className="profile-tab-content">
        {activeTab === "overview" && (
          <div className="overview-section">
            <h3>About RythCore Account</h3>
            <p>
              Your account is connected to the PostgreSQL database with the normalized 3NF/BCNF schema.
              All your interactions (likes, bookmarks, comments, and story publications) are synchronized.
            </p>

            <div className="system-sync-box">
              <strong>Database Status:</strong> Synchronized with <code>localhost:3000</code>
              <br />
              <strong>Google OAuth:</strong> Configured with Passport.js & Express Session
            </div>
          </div>
        )}

        {activeTab === "bookmarks" && (
          <div className="bookmarks-list">
            <div className="bookmark-item">
              <div>
                <h4>Atomic Habits: The Power of Tiny Changes</h4>
                <small>James Clear • Self Improvement</small>
              </div>
              <button className="open-btn">Read →</button>
            </div>
            <div className="bookmark-item">
              <div>
                <h4>The Psychology of Money: Timeless Lessons</h4>
                <small>Morgan Housel • Business & Mindset</small>
              </div>
              <button className="open-btn">Read →</button>
            </div>
          </div>
        )}

        {activeTab === "activity" && (
          <div className="activity-timeline">
            <div className="activity-point">
              <span className="dot"></span>
              <p>Liked story <strong>"The AI Revolution Explained Simply"</strong> <small>2 hours ago</small></p>
            </div>
            <div className="activity-point">
              <span className="dot"></span>
              <p>Bookmarked <strong>"Zero to One"</strong> by Peter Thiel <small>Yesterday</small></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;