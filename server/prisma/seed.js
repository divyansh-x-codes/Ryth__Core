const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting RythCore database seed...");

  // 1. Seed Categories
  const categories = [
    { name: "Technology", description: "Articles on software, AI, engineering, and technology trends." },
    { name: "Business", description: "Startups, markets, economics, and entrepreneurship." },
    { name: "Mindset", description: "Philosophy, productivity, psychology, and personal growth." },
    { name: "Health", description: "Wellness, physical fitness, mental health, and longevity." },
    { name: "Culture", description: "Art, society, media, and human perspectives." },
    { name: "Creativity", description: "Writing, design, filmmaking, and creative craft." },
    { name: "Career", description: "Leadership, work strategies, and professional development." },
  ];

  console.log("Creating categories...");
  for (const cat of categories) {
    await prisma.category.upsert({
      where: { name: cat.name },
      update: {},
      create: cat,
    });
  }

  // 2. Seed Subscription Plans
  console.log("Creating subscription plans...");
  const plans = [
    {
      name: "Ryth Club+ Monthly",
      description: "Full access to Ryth Club+ exclusive masterclasses, essays, and community.",
      price: 499.00,
      durationMonths: 1,
      isActive: true,
    },
    {
      name: "Ryth Club+ Yearly",
      description: "Annual access with 2 months free, creator circles, and premium reading notes.",
      price: 4999.00,
      durationMonths: 12,
      isActive: true,
    },
  ];

  for (const plan of plans) {
    await prisma.subscriptionPlan.upsert({
      where: { name: plan.name },
      update: { price: plan.price, description: plan.description },
      create: plan,
    });
  }

  // 3. Seed Demo Editorial Author
  console.log("Creating default editorial author...");
  const editorialUser = await prisma.user.upsert({
    where: { email: "editorial@rythcore.com" },
    update: {},
    create: {
      name: "Ryth Editorial",
      email: "editorial@rythcore.com",
      emailVerified: true,
      role: "editor",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    },
  });

  // 4. Seed Welcome Story
  const mindsetCategory = await prisma.category.findUnique({
    where: { name: "Mindset" },
  });

  if (mindsetCategory) {
    console.log("Creating welcome story...");
    await prisma.story.upsert({
      where: { slug: "welcome-to-rythcore" },
      update: {},
      create: {
        title: "A Place for the Curious Mind: Welcome to RythCore",
        slug: "welcome-to-rythcore",
        excerpt: "Curious minds & writers sharing perspectives. Discover deep thinking and curated essays.",
        content: `Welcome to RythCore.

In a world filled with short-lived notifications and endless noise, RythCore is designed as a sanctuary for curious minds.

Here, ideas take center stage:
1. Deep-dive perspectives on modern technology and culture.
2. Timeless models for self-improvement and clear thinking.
3. Creator stories crafted with nuance, depth, and clarity.

Start reading, share your own voice, or join Ryth Club+ for exclusive long-form masterclasses.`,
        coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200",
        visibility: "PUBLIC",
        authorId: editorialUser.id,
        categoryId: mindsetCategory.id,
        publishedAt: new Date(),
      },
    });
  }

  console.log("✅ Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });