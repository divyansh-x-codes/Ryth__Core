
import { useState, useEffect } from "react";

// --- Components ---
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import RightSidebar from "./components/RightSidebar";
import Home from "./components/Home";
import Stories from "./components/Stories";
import Books from "./components/Books";
import Messages from "./components/Messages";
import Club from "./components/Club";
import Profile from "./components/Profile";
import WriteStoryModal from "./components/WriteStoryModal";

// --- Data Store & Persistence ---
import {
  getStoredStories,
  addNewStory,
  toggleLikeStory,
  toggleBookmarkStory,
} from "./data/storiesStore";

// --- Global Styles ---
import "./styles/index.css";

function App() {
  // STATE 1: Active Page Navigation
  // Default is "HOME"

  const [page, setPage] = useState("HOME");

  // STATE 2: Stories Array (Persistent via localStorage store)

  const [stories, setStories] = useState(() => getStoredStories());

  // STATE 3: Write Story Modal Visibility
  
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  // LOGIC: Toggle Like on Story

  const handleToggleLike = (storyId) => {
    setStories((prev) => toggleLikeStory(storyId, prev));
  };

  
  // LOGIC: Toggle Bookmark on Story

  const handleToggleBookmark = (storyId) => {
    setStories((prev) => toggleBookmarkStory(storyId, prev));
  };

  // LOGIC: Save a newly written story
  // Modal se story aate hi array me save hoti hai aur persist hoti hai

  const handleStoryCreated = (newStory) => {
    setStories((prev) => addNewStory(newStory, prev));
  };

  return (
    <>
      {/* 1. TOP NAVIGATION BAR */}
      <Navbar
        onNavigate={setPage}
        onOpenWrite={() => setIsWriteModalOpen(true)}
      />

      {/* 2. MAIN APP THREE-COLUMN / TWO-COLUMN LAYOUT */}
      <div className="app-layout">
        {/* Left Navigation Sidebar */}
        <Sidebar page={page} setPage={setPage} />

        {/* Central Workspace Content Area */}
        <main className={`main-content ${page === "MESSAGES" ? "full-messages" : ""}`}>
          {/* HOME TAB */}
          {page === "HOME" && (
            <Home
              stories={stories}
              onNavigate={setPage}
              onOpenWrite={() => setIsWriteModalOpen(true)}
              onToggleLike={handleToggleLike}
              onToggleBookmark={handleToggleBookmark}
            />
          )}

          {/* STORIES TAB */}
          {page === "STORIES" && (
            <Stories
              stories={stories}
              onToggleLike={handleToggleLike}
              onToggleBookmark={handleToggleBookmark}
              onOpenWrite={() => setIsWriteModalOpen(true)}
            />
          )}

          {/* BOOKS TAB */}
          {page === "BOOKS" && (
            <Books onOpenClub={() => setPage("CLUB")} />
          )}

          {/* MESSAGES TAB */}
          {page === "MESSAGES" && <Messages />}

          {/* RYTH CLUB+ TAB */}
          {page === "CLUB" && <Club />}

          {/* PROFILE TAB */}
          {page === "PROFILE" && <Profile />}

          {/* LEARN TAB (Coming Soon placeholder) */}
          {page === "LEARN" && (
            <div style={{ padding: "50px 20px", textAlign: "center" }}>
              <span style={{ fontSize: "42px", display: "block", marginBottom: "12px" }}>♧</span>
              <h2 style={{ fontFamily: "Georgia, serif", fontSize: "28px", color: "#0f172a", marginBottom: "10px" }}>
                RythCore Learn
              </h2>
              <p style={{ color: "#64748b", fontSize: "15px", maxWidth: "480px", margin: "0 auto 20px" }}>
                Interactive guided courses, mental model deep dives, and creator workshops are launching soon.
              </p>
              <button
                className="explore-button"
                onClick={() => setPage("HOME")}
                style={{ padding: "10px 20px", background: "#0f172a", color: "#ffffff", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "bold" }}
              >
                ← Return to Home
              </button>
            </div>
          )}
        </main>

        {/* Right Sidebar (Hidden on Messages for wide view, custom on Books) */}
        {page !== "MESSAGES" && (
          <RightSidebar page={page} onExploreBooks={() => setPage("BOOKS")} />
        )}
      </div>

      {/* 3. POPUP MODAL: WRITE STORY */}
      <WriteStoryModal
        isOpen={isWriteModalOpen}
        onClose={() => setIsWriteModalOpen(false)}
        onStoryCreated={handleStoryCreated}
      />
    </>
  );
}

export default App;