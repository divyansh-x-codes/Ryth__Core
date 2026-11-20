

require("dotenv").config();

const express = require("express");
const session = require("express-session");
const cors = require("cors");
const passport = require("./passport");

// 1. PRISMA DATABASE CLIENT (with safe fallback for demo)
let prisma = null;
try {
  const { PrismaClient } = require("@prisma/client");
  prisma = new PrismaClient();
} catch (e) {
  console.warn("Prisma Client running in memory fallback mode.");
}

const app = express();
const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";


// 2. MIDDLEWARES

// CORS setup: Allows React frontend to communicate with credentials (cookies)
app.use(
  cors({
    origin: [CLIENT_URL, "http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Express Session configuration
app.use(
  session({
    name: "sid",
    secret: process.env.SESSION_SECRET || "rythcore_session_secret_default_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // Set to true in HTTPS production
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// Initialize Passport & Session
app.use(passport.initialize());
app.use(passport.session());

// 3. IN-MEMORY FALLBACK DATA (For college demo when DB is not running)

let memoryStories = [
  {
    id: 1,
    title: "A Place for the Curious Mind: Welcome to RythCore",
    slug: "welcome-to-rythcore",
    excerpt: "Curious minds & writers sharing perspectives. Discover deep thinking and curated essays.",
    content: "Welcome to RythCore. A sanctuary for deep thinking, timeless wisdom, and original perspectives.",
    coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
    visibility: "PUBLIC",
    category: { id: 3, name: "Mindset" },
    publishedAt: "2026-11-16T10:00:00.000Z",
    author: { id: "u1", name: "Ryth Editorial", role: "editor" },
    likesCount: 24,
    commentsCount: 5,
    bookmarksCount: 9,
  },
  {
    id: 2,
    title: "The Architecture of Deep Focus in a Hyper-Connected World",
    slug: "architecture-of-deep-focus",
    excerpt: "Why attention is your highest leverage asset, and how to protect cognitive energy.",
    content: "Deep focus is an environment design problem. Systematically protect your attention blocks.",
    coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
    visibility: "PUBLIC",
    category: { id: 1, name: "Technology" },
    publishedAt: "2026-11-17T10:00:00.000Z",
    author: { id: "u2", name: "Alex Rivera", role: "writer" },
    likesCount: 42,
    commentsCount: 11,
    bookmarksCount: 18,
  },
];

const fallbackCategories = [
  { id: 1, name: "Technology", description: "Software, AI, and systems engineering" },
  { id: 2, name: "Business", description: "Startups, economics, and market design" },
  { id: 3, name: "Mindset", description: "Philosophy, cognition, and mental models" },
  { id: 4, name: "Health", description: "Wellness, physical fitness, and longevity" },
  { id: 5, name: "Culture", description: "Art, media, society, and creator perspectives" },
  { id: 6, name: "Creativity", description: "Writing, design, and storytelling craft" },
  { id: 7, name: "Career", description: "Leadership, career strategy, and agency" },
];

const fallbackPlans = [
  {
    id: 1,
    name: "Ryth Club+ Monthly",
    price: "499.00",
    durationMonths: 1,
    description: "Monthly access to exclusive masterclass books and audio summaries.",
  },
  {
    id: 2,
    name: "Ryth Club+ Yearly",
    price: "4999.00",
    durationMonths: 12,
    description: "Annual access with 2 months free + private creator circles.",
  },
];

// 4. GOOGLE OAUTH ROUTES (PURE REDIRECTS TO REACT - ZERO HTML STRINGS)

/**
 * Route: GET /
 * Redirects directly to React Frontend
 */
app.get("/", (req, res) => {
  res.redirect(CLIENT_URL);
});

/**
 * Route: GET /auth/google
 * Starts Google OAuth sign-in flow
 */
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

/**
 * Route: GET /auth/google/callback
 * Google sends back credentials here -> Passport authenticates -> Redirects to React Frontend
 */
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${CLIENT_URL}?login=failed`,
  }),
  (req, res) => {
    // Successfully authenticated -> redirect back to React frontend
    res.redirect(`${CLIENT_URL}?login=success`);
  }
);

/**
 * Route: GET & POST /logout
 * Destroys session, clears cookie, and redirects to frontend or returns JSON
 */
const handleLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy((err) => {
      if (err) return next(err);
      res.clearCookie("sid", { path: "/" });
      if (req.headers.accept?.includes("application/json")) {
        return res.json({ success: true, message: "Logged out successfully" });
      }
      return res.redirect(CLIENT_URL);
    });
  });
};
app.get("/logout", handleLogout);
app.post("/logout", handleLogout);

// 5. REST APIS (ALL RETURN PURE JSON)

/**
 * API: GET /api/auth/me
 * Returns current authenticated user profile to React frontend
 */
app.get("/api/auth/me", (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({
      success: true,
      isAuthenticated: true,
      user: req.user,
    });
  }
  return res.json({
    success: true,
    isAuthenticated: false,
    user: null,
  });
});

/**
 * API: GET /api/categories
 * Returns editorial categories list (from Prisma DB or memory fallback)
 */
app.get("/api/categories", async (req, res) => {
  try {
    if (prisma) {
      const categories = await prisma.category.findMany({
        orderBy: { id: "asc" },
      });
      return res.json({ success: true, categories });
    }
  } catch (e) {}

  return res.json({ success: true, categories: fallbackCategories });
});

/**
 * API: GET /api/stories
 * Returns stories feed with optional category filter & search
 */
app.get("/api/stories", async (req, res) => {
  try {
    if (prisma) {
      const { category, search } = req.query;
      const where = { visibility: "PUBLIC" };

      if (category && category !== "For you") {
        where.category = { name: category };
      }
      if (search) {
        where.title = { contains: search, mode: "insensitive" };
      }

      const stories = await prisma.story.findMany({
        where,
        orderBy: { publishedAt: "desc" },
        include: {
          author: { select: { id: true, name: true, image: true, role: true } },
          category: { select: { id: true, name: true } },
          _count: { select: { likes: true, comments: true, bookmarks: true } },
        },
      });

      return res.json({
        success: true,
        stories: stories.map((s) => ({
          ...s,
          likesCount: s._count?.likes || 0,
          commentsCount: s._count?.comments || 0,
          bookmarksCount: s._count?.bookmarks || 0,
        })),
      });
    }
  } catch (e) {}

  // Fallback memory stories
  return res.json({ success: true, stories: memoryStories });
});

/**
 * API: POST /api/stories
 * Publishes a new story (saves to PostgreSQL or memory array)
 */
app.post("/api/stories", async (req, res) => {
  try {
    const { title, excerpt, content, categoryId, coverImage, visibility = "PUBLIC" } = req.body;

    if (!title || !content) {
      return res.status(400).json({ success: false, message: "Title and content are required." });
    }

    const slug = title.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");

    // Try Prisma DB save if available
    if (prisma && req.user?.id) {
      const created = await prisma.story.create({
        data: {
          title,
          slug: `${slug}-${Math.random().toString(36).substring(2, 6)}`,
          excerpt: excerpt || content.substring(0, 140),
          content,
          coverImage,
          visibility,
          authorId: req.user.id,
          categoryId: categoryId || 1,
          publishedAt: new Date(),
        },
      });
      return res.status(201).json({ success: true, story: created });
    }

    // In-memory array fallback
    const newMemoryStory = {
      id: Date.now(),
      title,
      slug,
      excerpt: excerpt || content.substring(0, 140) + "...",
      content,
      coverImage: coverImage || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
      visibility,
      publishedAt: new Date().toISOString(),
      category: { name: "Mindset" },
      author: { name: req.user?.name || "Simply", role: "reader" },
      likesCount: 0,
      commentsCount: 0,
      bookmarksCount: 0,
    };
    memoryStories.unshift(newMemoryStory);

    return res.status(201).json({ success: true, story: newMemoryStory });
  } catch (error) {
    console.error("Create story error:", error);
    return res.status(500).json({ success: false, message: "Failed to publish story." });
  }
});

/**
 * API: GET /api/subscriptions/plans
 * Returns Ryth Club+ membership plans
 */
app.get("/api/subscriptions/plans", async (req, res) => {
  try {
    if (prisma) {
      const plans = await prisma.subscriptionPlan.findMany({
        where: { isActive: true },
      });
      return res.json({ success: true, plans });
    }
  } catch (e) {}

  return res.json({ success: true, plans: fallbackPlans });
});

// 6. GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ success: false, message: "Internal server error" });
});

// 7. START SERVER
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 RythCore API Server running at: http://localhost:${PORT}`);
  console.log(`🔐 Google OAuth Endpoint: http://localhost:${PORT}/auth/google`);
  console.log(`💻 React Client URL: ${CLIENT_URL}`);
  console.log(`=======================================================`);
});

module.exports = app;
