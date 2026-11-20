
import "../styles/RightSidebar.css";

function RightSidebar({ page = "HOME", onExploreBooks }) {

  // CASE 1: Books Page Right Sidebar (matches Image 3 & 4)
  if (page === "BOOKS") {
    return (
      <aside className="right-sidebar">
        {/* 1. My Reading Journey Donut Chart */}
        <div className="right-card">
          <h3>MY READING JOURNEY</h3>
          <div className="reading-journey-body">
            <div className="donut-circle">
              <span className="donut-num">0</span>
              <span className="donut-label">Books</span>
            </div>

            <div className="journey-legend">
              <div className="legend-row">
                <span className="dot dot-blue"></span>
                <span><strong>0</strong> In Progress</span>
              </div>
              <div className="legend-row">
                <span className="dot dot-green"></span>
                <span><strong>0</strong> Completed</span>
              </div>
              <div className="legend-row">
                <span className="dot dot-orange"></span>
                <span><strong>0</strong> Saved</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Continue Reading */}
        <div className="right-card">
          <h3>CONTINUE READING</h3>
          <div className="continue-reading-body">
            <p>
              No books currently in progress. Select any title to start your reading journey.
            </p>
            <button className="explore-lib-btn" onClick={onExploreBooks}>
              Explore Library →
            </button>
          </div>
        </div>

        {/* 3. Trending Books This Week */}
        <div className="right-card">
          <h3>TRENDING BOOKS THIS WEEK</h3>
          <div className="trending-books-list">
            <div className="trending-book-row">
              <span className="rank-num">01</span>
              <div className="book-mini-cover">
                <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=100" alt="Atomic Habits" />
              </div>
              <div className="trending-book-meta">
                <strong>Atomic Habits</strong>
                <small>James Clear</small>
              </div>
              <span className="trending-likes">❤️ 2.1k</span>
            </div>

            <div className="trending-book-row">
              <span className="rank-num">02</span>
              <div className="book-mini-cover">
                <img src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=100" alt="Psychology of Money" />
              </div>
              <div className="trending-book-meta">
                <strong>The Psychology of Money</strong>
                <small>Morgan Housel</small>
              </div>
              <span className="trending-likes">❤️ 1.8k</span>
            </div>

            <div className="trending-book-row">
              <span className="rank-num">03</span>
              <div className="book-mini-cover">
                <img src="https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=100" alt="The 5 AM Club" />
              </div>
              <div className="trending-book-meta">
                <strong>The 5 AM Club</strong>
                <small>Robin Sharma</small>
              </div>
              <span className="trending-likes">❤️ 1.6k</span>
            </div>
          </div>
        </div>

        {/* 4. Top Readers */}
        <div className="right-card">
          <h3>TOP READERS</h3>
          <div className="top-readers-row">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80" alt="Reader" className="reader-avatar" />
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80" alt="Reader" className="reader-avatar" />
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80" alt="Reader" className="reader-avatar" />
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80" alt="Reader" className="reader-avatar" />
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80" alt="Reader" className="reader-avatar" />
          </div>
        </div>
      </aside>
    );
  }


  // CASE 2: Default Home / Stories Right Sidebar (matches Image 1 & 2)

  return (
    <aside className="right-sidebar">
      {/* 1. Today's Thought */}
      <div className="right-card">
        <h3>TODAY'S THOUGHT</h3>
        <div className="thought-content">
          <div className="quote-icon">❞</div>
          <p>
            "Discipline is not about doing what you love, but about doing what your future self will thank you for."
          </p>
          <strong>— RythCore</strong>
        </div>
      </div>

      {/* 2. Trending This Week */}
      <div className="right-card">
        <h3>TRENDING THIS WEEK</h3>
        <div className="empty-content">
          No trending stories yet.
        </div>
      </div>

      {/* 3. Top Creators */}
      <div className="right-card">
        <h3>TOP CREATORS</h3>
        <div className="empty-content">
          No creators found.
        </div>
      </div>

      {/* 4. RythCore Picks */}
      <div className="right-card">
        <h3>RYTHCORE PICKS</h3>
        <div className="empty-content">
          Curated perspectives coming soon.
        </div>
      </div>
    </aside>
  );
}

export default RightSidebar;
