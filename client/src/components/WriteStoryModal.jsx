
import { useState } from "react";
import "../styles/WriteStoryModal.css";

const CATEGORIES = [
  "Technology",
  "Business",
  "Mindset",
  "Health",
  "Culture",
  "Creativity",
  "Career"
];

function WriteStoryModal({ isOpen, onClose, onStoryCreated }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Mindset");
  const [visibility, setVisibility] = useState("PUBLIC");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  
  // LOGIC: Form Submission Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setLoading(true);

    // Formatted Story Object matching Prisma Story Model
    const newStory = {
      id: Date.now(),
      title: title.trim(),
      slug: title.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-"),
      excerpt: excerpt.trim() || content.substring(0, 140) + "...",
      content: content.trim(),
      category: { name: category },
      visibility,
      coverImage:
        coverImage.trim() ||
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
      publishedAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      author: {
        name: "Simply",
        role: "Author",
        image: null,
      },
      likesCount: 0,
      commentsCount: 0,
      bookmarksCount: 0,
      isLiked: false,
      isBookmarked: false,
    };

    // Simulate clean publishing delay
    setTimeout(() => {
      onStoryCreated(newStory);
      setLoading(false);
      onClose();

      // Clear input fields
      setTitle("");
      setExcerpt("");
      setContent("");
      setCoverImage("");
    }, 250);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <h3>Create a New Story</h3>
          <button className="close-btn" onClick={onClose} title="Close">✕</button>
        </div>

        {/* Story Form */}
        <form onSubmit={handleSubmit} className="write-story-form">
          <div className="form-group">
            <label>Story Title *</label>
            <input
              type="text"
              placeholder="e.g. The Architecture of High-Leverage Thinking"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category *</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Visibility</label>
              <select value={visibility} onChange={(e) => setVisibility(e.target.value)}>
                <option value="PUBLIC">Public (All Readers)</option>
                <option value="SUBSCRIBERS_ONLY">Subscribers Only (Ryth Club+)</option>
                <option value="DRAFT">Draft</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Short Excerpt</label>
            <input
              type="text"
              placeholder="One or two sentences summarizing the core idea..."
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Cover Image URL (optional)</label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Content *</label>
            <textarea
              rows={8}
              placeholder="Write your story, thoughts, and insights here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-publish" disabled={loading}>
              {loading ? "Publishing..." : "Publish Story →"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default WriteStoryModal;