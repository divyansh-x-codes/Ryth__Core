
import { useState } from "react";
import "../styles/Club.css";

function Club() {
  const [selectedPlan, setSelectedPlan] = useState("yearly");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    setSubscribed(true);
  };

  return (
    <div className="club-page">
      {/* 1. HERO BANNER */}
      <section className="club-hero">
        <div className="club-hero-badge">👑 RYTH CLUB+ EXCLUSIVE</div>
        <h1>
          Elevate your mind with
          <br />
          <em>masterclass</em> perspectives.
        </h1>
        <p>
          Join 5,000+ founders, thinkers, and lifelong learners unlocking deep
          mental models, private audio summaries, and exclusive creator circles.
        </p>
      </section>

      {/* 2. SUCCESS FEEDBACK BANNER */}
      {subscribed && (
        <div className="subscription-success-banner">
          <span>🎉</span>
          <div>
            <strong>Welcome to Ryth Club+!</strong>
            <p>Your membership is now active. All premium masterclasses and locked books are unlocked.</p>
          </div>
        </div>
      )}

      {/* 3. PRICING CARDS */}
      <section className="club-plans-grid">
        {/* Monthly Plan */}
        <div
          className={`plan-card ${selectedPlan === "monthly" ? "active" : ""}`}
          onClick={() => setSelectedPlan("monthly")}
        >
          <div className="plan-badge">FLEXIBLE</div>
          <h3>Monthly Pass</h3>
          <p className="plan-desc">Full access billed every month. Cancel anytime.</p>
          <div className="plan-price">
            <span className="currency">₹</span>
            <span className="amount">499</span>
            <span className="period">/ month</span>
          </div>

          <ul className="plan-perks">
            <li>✓ Full access to all locked Masterclass books</li>
            <li>✓ High-leverage mental model summaries</li>
            <li>✓ Private audio dialogues & episodes</li>
            <li>✓ Community discussions & reading groups</li>
          </ul>

          <button
            className="select-plan-btn"
            onClick={handleSubscribe}
            disabled={subscribed}
          >
            {subscribed && selectedPlan === "monthly" ? "Active Plan ✓" : "Get Monthly Pass"}
          </button>
        </div>

        {/* Yearly Plan */}
        <div
          className={`plan-card featured ${selectedPlan === "yearly" ? "active" : ""}`}
          onClick={() => setSelectedPlan("yearly")}
        >
          <div className="plan-badge highlight">BEST VALUE • 2 MONTHS FREE</div>
          <h3>Annual Founder</h3>
          <p className="plan-desc">One full year of unlimited knowledge and creator circles.</p>
          <div className="plan-price">
            <span className="currency">₹</span>
            <span className="amount">4,999</span>
            <span className="period">/ year</span>
          </div>

          <ul className="plan-perks">
            <li>✓ Everything in Monthly Pass</li>
            <li>✓ 2 Months Free (Save ₹989 / year)</li>
            <li>✓ Direct 1-on-1 messaging with top authors</li>
            <li>✓ Downloadable executive audio cheat sheets</li>
            <li>✓ Exclusive invitations to live author AMAs</li>
          </ul>

          <button
            className="select-plan-btn primary"
            onClick={handleSubscribe}
            disabled={subscribed}
          >
            {subscribed && selectedPlan === "yearly" ? "Active Plan ✓" : "Join Annual Club+ →"}
          </button>
        </div>
      </section>

      {/* 4. PERKS & FEATURES GRID */}
      <section className="club-features-grid">
        <div className="feature-item">
          <div className="feature-icon">📚</div>
          <h4>Executive Breakdowns</h4>
          <p>Condense 300-page business and philosophy books into 15-minute actionable mental models.</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">🎙️</div>
          <h4>Private Audio Dialogues</h4>
          <p>Listen on the go with private studio recordings and narration by top thinkers.</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">🤝</div>
          <h4>Creator Network</h4>
          <p>Connect with authors, scientists, and systems thinkers in curated masterminds.</p>
        </div>
      </section>
    </div>
  );
}

export default Club;