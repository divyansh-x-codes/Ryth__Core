import { useState } from "react";
import "../styles/Books.css";

// Premium locked books (Ryth Club+)
const MASTERCLASS_BOOKS = [
  {
    id: "m1",
    title: "Principles: Life and Work",
    author: "Ray Dalio",
    badge: "Executive Masterclass",
    cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500",
  },
  {
    id: "m2",
    title: "High Output Management",
    author: "Andrew Grove",
    badge: "Club+ Exclusive",
    cover: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500",
  },
  {
    id: "m3",
    title: "Good to Great",
    author: "Jim Collins",
    badge: "Masterclass",
    cover: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500",
  },
  {
    id: "m4",
    title: "The Almanack of Naval",
    author: "Eric Jorgenson",
    badge: "Bestseller",
    cover: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500",
  },
];

// Curated library collection
const CURATED_BOOKS = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self Improvement",
    desc: "Build better habits and break bad ones with practical strategies.",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
    summary: `Atomic Habits by James Clear provides a proven framework for improving every day.

Key Takeaways:
1. Small habits make a big difference: 1% better every day counts for 37x improvement in a year.
2. Focus on systems instead of goals: You do not rise to the level of your goals; you fall to the level of your systems.
3. The 4 Laws of Behavior Change: Make it obvious, attractive, easy, and satisfying.`,
  },
  {
    id: 2,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    category: "Business",
    desc: "Timeless lessons on wealth, greed and happiness.",
    cover: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=500",
    summary: `The Psychology of Money explores how people think about money and teaches you how to make better sense of one of life's most important topics.

Key Takeaways:
1. Doing well with money has little to do with how smart you are and a lot to do with how you behave.
2. Freedom is the highest dividend money pays: The ability to do what you want, when you want, with who you want.
3. Compounding works best when you give assets years or decades to grow uninterrupted.`,
  },
  {
    id: 3,
    title: "Zero to One",
    author: "Peter Thiel",
    category: "Business",
    desc: "Notes on startups, or how to build the future by creating monopolies.",
    cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500",
    summary: `Zero to One presents at once an optimistic view of the future of progress in America and a new way of thinking about innovation.

Key Takeaways:
1. Going from 0 to 1 means creating something completely new (vertical progress / technology).
2. Monopolies drive progress because creative monopolies give customers more choices by adding entirely new categories.
3. The power law dominates all venture investments.`,
  },
  {
    id: 4,
    title: "The Lean Startup",
    author: "Eric Ries",
    category: "Business",
    desc: "Build and grow successful startups with lean principles.",
    cover: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=500",
    summary: `The Lean Startup method fosters companies that are both more capital efficient and that leverage human creativity more effectively.

Key Takeaways:
1. Build-Measure-Learn feedback loop is the core of lean startup methodology.
2. Develop a Minimum Viable Product (MVP) to begin learning immediately.
3. Pivot or persevere based on validated learning from real users.`,
  },
  {
    id: 5,
    title: "Deep Work",
    author: "Cal Newport",
    category: "Mindset",
    desc: "Rules for focused success in a distracted world.",
    cover: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500",
    summary: `Deep Work is the ability to focus without distraction on a cognitively demanding task.

Key Takeaways:
1. Deep work is becoming increasingly rare at the exact same time it is becoming increasingly valuable in our economy.
2. Work deeply by scheduling distraction-free blocks and eliminating social media.
3. Embrace boredom to train mental resistance against constant stimulation.`,
  },
  {
    id: 6,
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    category: "Mindset",
    desc: "Understand how your mind works and how decisions are formed.",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500",
    summary: `Nobel laureate Daniel Kahneman takes us on a groundbreaking tour of the mind and explains the two systems that drive the way we think.

Key Takeaways:
1. System 1 is fast, intuitive, and emotional.
2. System 2 is slower, more deliberative, and more logical.
3. Beware of cognitive biases like framing, availability heuristic, and loss aversion.`,
  },
  {
    id: 7,
    title: "The 5 AM Club",
    author: "Robin Sharma",
    category: "Self Improvement",
    desc: "Own your morning, elevate your life with world-class routines.",
    cover: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=500",
    summary: `The 5 AM Club reveals how morning routines build unstoppable willpower, focus, and physical energy.

Key Takeaways:
1. The 20/20/20 Formula: 20 mins Move, 20 mins Reflect, 20 mins Grow.
2. High-performance recovery and sleep are essential for daily peak performance.`,
  },
  {
    id: 8,
    title: "Man's Search for Meaning",
    author: "Viktor E. Frankl",
    category: "Mindset",
    desc: "The classic tribute to hope from the depths of suffering.",
    cover: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500",
    summary: `Psychiatrist Viktor Frankl discusses logotherapy and how humans can find meaning in any situation.

Key Takeaways:
1. He who has a why to live can bear almost any how.
2. Everything can be taken from a man but one thing: the freedom to choose one's attitude in any given set of circumstances.`,
  },
];

// Available categories
const CATEGORIES = [
  "All Books",
  "Self Improvement",
  "Business",
  "Technology",
  "Mindset",
  "Health",
  "Creativity",
  "Career",
  "Finance",
];

function Books({ onOpenClub }) {

  // Component states
  const [selectedCat, setSelectedCat] = useState("All Books");
  const [activeTab, setActiveTab] = useState("Recommended");
  const [savedBookIds, setSavedBookIds] = useState(new Set([1, 2]));
  const [readingBook, setReadingBook] = useState(null);

  // Save or remove a book from library
  const toggleSave = (id) => {
    setSavedBookIds((prev) => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  // Filter books according to selected category
  const filteredBooks = CURATED_BOOKS.filter((book) => {
    if (selectedCat === "All Books") return true;

    return (
      book.category.toLowerCase() === selectedCat.toLowerCase()
    );
  });

  return (
    <div className="books-page">

      {/* 1. HERO BANNER */}
      <section className="books-hero">

        <div className="books-hero-content">

          <span className="books-tag">
            ✧ CURATED BOOK LIBRARY
          </span>

          <h1>
            Knowledge for
            <br />
            a better <span>you.</span>
          </h1>

          <p className="hero-subquote">
            "Bro what do you even do on weekends when the markets are closed"
          </p>

          <div className="books-hero-buttons">

            <button
              className="btn-primary"
              onClick={() => setSelectedCat("All Books")}
            >
              Explore Books →
            </button>

            <button className="library-button">
              <span>▣</span> My Library
            </button>

          </div>

          <div className="hero-readers-counter">

            <div className="avatars-cluster">
              <span>J</span>
              <span>M</span>
              <span>A</span>
              <span>S</span>
            </div>

            <p>25K+ readers are learning with RythCore</p>

          </div>

        </div>

        <div className="books-hero-visual">

          <img
            src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900"
            alt="Focused reading workspace"
            className="hero-ambient-img"
          />

          <div className="hero-ambient-overlay">
            <blockquote>
              "Bro what do you even do on weekends when the markets are closed"
            </blockquote>
          </div>

        </div>

      </section>

      {/* 2. CATEGORIES FILTER BAR */}
      <section className="book-categories-scroll">

        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`cat-pill ${
              selectedCat === cat ? "category-active" : ""
            }`}
            onClick={() => setSelectedCat(cat)}
          >
            <span>{cat}</span>
          </button>
        ))}

      </section>

      {/* 3. PREMIUM MASTERCLASS BOOKS */}
      <section className="premium-books">

        <div className="premium-heading">

          <div>
            <h2>
              👑 RYTHCORE PREMIUM MASTERCLASS BOOKS
              <span className="members-badge">
                MEMBERS ONLY
              </span>
            </h2>

            <p>
              Curated executive breakdowns, high-leverage mental models & private audio summaries.
            </p>
          </div>

          <button
            className="unlock-club-btn"
            onClick={onOpenClub}
          >
            Unlock with Ryth Club+ →
          </button>

        </div>

        <div className="premium-grid">

          {MASTERCLASS_BOOKS.map((mb) => (
            <div
              key={mb.id}
              className="premium-card"
            >

              <div className="premium-card-bg">

                <img
                  src={mb.cover}
                  alt={mb.title}
                />

                <div className="premium-overlay">

                  <span className="premium-tier-tag">
                    👑 {mb.badge}
                  </span>

                  <div className="lock-icon-circle">
                    🔒 LOCKED
                  </div>

                  <h4>{mb.title}</h4>

                  <small>{mb.author}</small>

                </div>

              </div>

            </div>
          ))}

        </div>

      </section>

      {/* 4. CURATED GRID SUB-NAV */}
      <div className="curated-books-subnav">

        <div className="curated-tabs">

          {[
            "Recommended",
            "Bestsellers",
            "New Arrivals",
            "Most Saved",
            "Free Reads",
          ].map((tab) => (
            <button
              key={tab}
              className={`curated-tab ${
                activeTab === tab ? "active" : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}

        </div>

        <div className="curated-sort-group">

          <span className="filter-pill">
            Filter ▾
          </span>

          <span className="sort-pill">
            Latest ▾
          </span>

        </div>

      </div>

      {/* 5. CURATED BOOKS GRID */}
      <section className="books-grid">

        {filteredBooks.map((book) => {

          const isSaved = savedBookIds.has(book.id);

          return (
            <div
              key={book.id}
              className="book-card"
            >

              <div className="book-cover-wrapper">

                <img
                  src={book.cover}
                  alt={book.title}
                />

              </div>

              <h3>{book.title}</h3>

              <p className="book-author">
                {book.author}
              </p>

              <p className="book-desc">
                {book.desc}
              </p>

              <div className="book-actions">

                <button
                  className="read-btn"
                  onClick={() => setReadingBook(book)}
                >
                  Read
                </button>

                <button
                  className={`save-btn ${isSaved ? "saved" : ""}`}
                  onClick={() => toggleSave(book.id)}
                  title={isSaved ? "Saved to Library" : "Save for later"}
                >
                  {isSaved ? "🔖" : "📑"}
                </button>

              </div>

            </div>
          );

        })}

      </section>

      {/* 6. READER DRAWER MODAL */}
      {readingBook && (

        <div
          className="reader-modal-backdrop"
          onClick={() => setReadingBook(null)}
        >

          <div
            className="reader-drawer"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="reader-header">

              <div className="reader-title-area">

                <span className="reader-cat-tag">
                  {readingBook.category}
                </span>

                <h2>{readingBook.title}</h2>

                <small>
                  By {readingBook.author}
                </small>

              </div>

              <button
                className="drawer-close-btn"
                onClick={() => setReadingBook(null)}
              >
                ✕
              </button>

            </div>

            <div className="reader-content">

              <img
                src={readingBook.cover}
                alt={readingBook.title}
                className="reader-cover-thumb"
              />

              <div className="reader-text">

                <h3>
                  Executive Summary & Key Mental Models
                </h3>

                <pre>{readingBook.summary}</pre>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Books;