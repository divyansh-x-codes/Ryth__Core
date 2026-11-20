
const STORAGE_KEY = "rythcore_published_stories";

// Default Initial Stories (agar localStorage me pehle se data na ho)
export const DEFAULT_STORIES = [
  {
    id: 1,
    title: "A Place for the Curious Mind: Welcome to RythCore",
    slug: "welcome-to-rythcore",
    excerpt: "Curious minds & writers sharing perspectives. Discover deep thinking and curated essays.",
    content: "Welcome to RythCore. In a world of infinite noise and short attention spans, RythCore is designed as a sanctuary for deep thinking, timeless wisdom, and original perspectives.",
    coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
    category: { name: "Mindset" },
    publishedAt: "Nov 16, 2026",
    author: {
      name: "Ryth Editorial",
      role: "Editor",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    },
    likesCount: 24,
    commentsCount: 5,
    bookmarksCount: 9,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 2,
    title: "The Architecture of Deep Focus in a Hyper-Connected World",
    slug: "architecture-of-deep-focus",
    excerpt: "Why attention is your highest leverage asset, and how to protect cognitive energy.",
    content: "Deep focus is not merely about ignoring your phone; it requires systematic design of your environment and intentional prioritization of deep work.",
    coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
    category: { name: "Technology" },
    publishedAt: "Nov 17, 2026",
    author: {
      name: "Alex Rivera",
      role: "Systems Architect",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    },
    likesCount: 42,
    commentsCount: 11,
    bookmarksCount: 18,
    isLiked: true,
    isBookmarked: true,
  },
  {
    id: 3,
    title: "Mental Models for Asymmetric Career Bets",
    slug: "mental-models-asymmetric-bets",
    excerpt: "Navigating non-linear opportunities in modern tech and creator economies.",
    content: "When the downside is capped and the upside is open-ended, you have an asymmetric opportunity. The modern economy rewards high-agency thinkers who take calculated risks.",
    coverImage: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800",
    category: { name: "Business" },
    publishedAt: "Nov 18, 2026",
    author: {
      name: "Dr. Maya Patel",
      role: "Cognitive Neuroscientist",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
    },
    likesCount: 31,
    commentsCount: 8,
    bookmarksCount: 14,
    isLiked: false,
    isBookmarked: false,
  },
];

/**
 * 1. Get Stored Stories:
 * Pehle localStorage check karta hai. Agar pehle se saved hain toh wahi load karega,
 * warna default stories dega.
 */
export function getStoredStories() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (error) {
    console.warn("Could not read from localStorage, using default stories:", error);
  }
  return DEFAULT_STORIES;
}

/**
 * 2. Save Stories:
 * Array ko localStorage me synchronize karta hai.
 */
export function saveStoriesToStorage(storiesArray) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storiesArray));
  } catch (error) {
    console.warn("Could not write to localStorage:", error);
  }
}

/**
 * 3. Add a New Story:
 * Nayi story ko array ke top par (index 0) add karta hai aur save karta hai.
 */
export function addNewStory(newStory, currentStories) {
  const updated = [newStory, ...currentStories];
  saveStoriesToStorage(updated);
  return updated;
}

/**
 * 4. Toggle Like:
 * Story like count ko increment/decrement karta hai.
 */
export function toggleLikeStory(storyId, currentStories) {
  const updated = currentStories.map((story) => {
    if (story.id === storyId) {
      const isLiked = !story.isLiked;
      return {
        ...story,
        isLiked,
        likesCount: isLiked ? story.likesCount + 1 : Math.max(0, story.likesCount - 1),
      };
    }
    return story;
  });
  saveStoriesToStorage(updated);
  return updated;
}

/**
 * 5. Toggle Bookmark:
 * Story bookmark status ko toggle karta hai.
 */
export function toggleBookmarkStory(storyId, currentStories) {
  const updated = currentStories.map((story) => {
    if (story.id === storyId) {
      return {
        ...story,
        isBookmarked: !story.isBookmarked,
        bookmarksCount: !story.isBookmarked
          ? story.bookmarksCount + 1
          : Math.max(0, story.bookmarksCount - 1),
      };
    }
    return story;
  });
  saveStoriesToStorage(updated);
  return updated;
}