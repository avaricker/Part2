import { useState } from 'react';
import { ArrowRight, Search, ShoppingBag } from 'lucide-react';

function BrandLockup({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`brand-lockup ${dark ? 'brand-lockup-dark' : ''}`} aria-label="Positively Made">
      <span className="brand-script">Positively</span>
      <span className="brand-made">MADE</span>
    </div>
  );
}

export default function App() {
  const [showOS, setShowOS] = useState(false);

  if (showOS) {
    return (
      <div className="os-demo-simple">
        <aside>
          <div className="os-brand-simple"><img src="/brand/pm-monogram.svg" alt="PM"/><div><strong>POSITIVELY MADE</strong><span>BUSINESS OS</span></div></div>
          <nav><button className="active">Dashboard</button><button>Orders</button><button>Custom Requests</button><button>Customers</button><button>Invoices</button><button>Reports</button></nav>
          <button className="back-site" onClick={() => setShowOS(false)}>View customer website <ArrowRight size={14}/></button>
        </aside>
        <main>
          <header><div><small>OWNER WORKSPACE</small><h1>Dashboard</h1></div><div className="owner-pill">SM</div></header>
          <section className="os-welcome"><div><small>SUNDAY, SEPTEMBER 27</small><h2>Good morning, Stephanie.</h2><p>Here is what needs your attention today.</p></div><img src="/brand/sun.svg" alt=""/></section>
          <section className="os-metrics"><article><strong>12</strong><span>Open orders</span></article><article><strong>4</strong><span>Proofs waiting</span></article><article><strong>7</strong><span>In production</span></article><article><strong>$4,280</strong><span>This month</span></article></section>
          <section className="os-lower"><div><small>ACTIVE WORK</small><h3>Orders</h3><p>Lincoln PTO — Proof Needed</p><p>Megan R. — In Production</p><p>Bayside Soccer — Awaiting Approval</p></div><div><small>TODAY</small><h3>Needs attention</h3><p>Approve Lincoln PTO proof</p><p>Reply to Bayside Soccer</p><p>Invoice #1048 is overdue</p></div></section>
        </main>
      </div>
    );
  }

  return (
    <div className="site-shell">
      <header className="site-nav">
        <nav className="nav-links"><a href="#shop">Shop</a><a href="#custom">Custom</a><a href="#story">Story</a></nav>
        <a className="nav-logo" href="#top"><BrandLockup/></a>
        <div className="nav-actions"><Search size={18}/><ShoppingBag size={18}/></div>
      </header>

      <section className="cinematic-hero" id="top">
        <div className="hero-orbit orbit-one"/><div className="hero-orbit orbit-two"/>
        <div className="hero-monogram"><img src="/brand/pm-monogram.svg" alt="PM"/></div>
        <div className="hero-copy">
          <p className="eyebrow light">POSITIVELY MADE / EST. 2026</p>
          <h1>Better days<br/><em>are made.</em></h1>
          <p className="hero-sub">Thoughtful goods, custom pieces, and stories made to bring a little more good into everyday life.</p>
          <a href="#shop" className="hero-cta">Explore Positively Made <ArrowRight size={16}/></a>
        </div>
        <div className="hero-sun-wrap"><img src="/brand/sun.svg" alt=""/></div>
      </section>

      <section className="statement-section">
        <p className="eyebrow">THE IDEA</p>
        <h2>Made for the little things<br/>that make life better.</h2>
        <p>Positively Made is a growing lifestyle brand rooted in kindness, encouragement, family, creativity, and the belief that better days are something we help create.</p>
      </section>

      <section className="pathways" id="shop">
        <article className="path-card path-card-light"><span>01</span><div><p className="eyebrow">SHOP</p><h3>Everyday goods,<br/>made with meaning.</h3><p>Apparel, gifts, home pieces, and future collections designed around the Positively Made point of view.</p><button>Explore the shop <ArrowRight size={15}/></button></div></article>
        <article className="path-card path-card-oat" id="custom"><span>02</span><div><p className="eyebrow">CUSTOM</p><h3>Your idea.<br/>Made personal.</h3><p>Custom pieces for schools, teams, events, businesses, gifts, and the moments worth making your own.</p><button>Start a custom order <ArrowRight size={15}/></button></div></article>
        <article className="path-card path-card-mocha"><span>03</span><div><p className="eyebrow">BOOKS + STORIES</p><h3>Better days,<br/>made together.</h3><p>A future children’s book series centered on sharing, helping, learning, listening, friendship, and the many ways families are made.</p><button>Discover the idea <ArrowRight size={15}/></button></div></article>
      </section>

      <section className="story-section" id="story">
        <div className="story-mark"><img src="/brand/pm-monogram.svg" alt="PM"/></div>
        <div className="story-copy"><p className="eyebrow">WHY POSITIVELY MADE</p><h2>Different stories.<br/>The same worth.</h2><p>Positively Made was inspired by a desire to make everyday life better for the people who matter most — Ryan, Knyx, and Lucy — and by the belief that every family, every child, and every story can be made in its own meaningful way.</p><p className="story-small">The brand leaves room for those stories too: IVF, blended families, children of divorce, chosen family, and all the different paths that can still lead to something deeply good.</p><div className="story-credit">Creative influence + technical direction by Ava Grace.</div></div>
      </section>

      <section className="wordmark-section"><img src="/brand/sun.svg" alt=""/><p>BETTER DAYS ARE MADE.</p></section>
      <footer className="site-footer"><BrandLockup dark/><p>THOUGHTFUL GOODS • CUSTOM • BOOKS • HOME</p><button onClick={() => setShowOS(true)}>Owner login <ArrowRight size={14}/></button></footer>
    </div>
  );
}
