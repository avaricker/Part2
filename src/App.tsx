import { useMemo, useState } from 'react';
import {
  ArrowRight,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  FileText,
  LayoutDashboard,
  Mail,
  Menu,
  Package,
  Search,
  ShoppingBag,
  Sparkles,
  Users,
  X,
} from 'lucide-react';

type Mode = 'site' | 'os';
type OsPage = 'Dashboard' | 'Orders' | 'Custom Requests' | 'Customers' | 'Messages' | 'Invoices' | 'Reports';

const orders = [
  { customer: 'Lincoln PTO', item: 'Spirit Wear Order', status: 'Proof Needed', due: 'Oct 02', amount: '$1,280' },
  { customer: 'Megan R.', item: 'Custom Crewneck', status: 'In Production', due: 'Oct 04', amount: '$86' },
  { customer: 'Bayside Soccer', item: 'Team Tote Bags', status: 'Awaiting Approval', due: 'Oct 07', amount: '$720' },
  { customer: 'Caroline B.', item: 'Gift Set', status: 'Ready', due: 'Today', amount: '$112' },
];

const categories = [
  { name: 'Apparel', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=85' },
  { name: 'Gifts', image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=1200&q=85' },
  { name: 'Stickers', image: 'https://images.unsplash.com/photo-1580428180098-24b353d7e9d9?auto=format&fit=crop&w=1200&q=85' },
];

function BrandLockup({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`brand-lockup ${dark ? 'brand-lockup-dark' : ''}`} aria-label="Positively Made">
      <span className="brand-script">Positively</span>
      <span className="brand-made">MADE</span>
    </div>
  );
}

function App() {
  const [mode, setMode] = useState<Mode>('site');
  const [osPage, setOsPage] = useState<OsPage>('Dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <main>
      <div className="prototype-switcher">
        <button className={mode === 'site' ? 'active' : ''} onClick={() => setMode('site')}>Customer Website</button>
        <span />
        <button className={mode === 'os' ? 'active' : ''} onClick={() => setMode('os')}>Business OS</button>
      </div>
      {mode === 'site' ? (
        <WebsitePreview onOpenOS={() => setMode('os')} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      ) : (
        <BusinessOS page={osPage} setPage={setOsPage} onViewSite={() => setMode('site')} />
      )}
    </main>
  );
}

function WebsitePreview({ onOpenOS, mobileOpen, setMobileOpen }: { onOpenOS: () => void; mobileOpen: boolean; setMobileOpen: (v: boolean) => void }) {
  return (
    <div className="site-shell">
      <header className="site-nav">
        <button className="nav-menu" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav className={`nav-links ${mobileOpen ? 'open' : ''}`}>
          <a href="#shop">Shop</a>
          <a href="#custom">Custom</a>
          <a href="#story">Our Story</a>
        </nav>
        <a className="nav-logo" href="#top" aria-label="Positively Made home"><BrandLockup /></a>
        <div className="nav-actions">
          <Search size={18} />
          <ShoppingBag size={18} />
        </div>
      </header>

      <section className="cinematic-hero" id="top">
        <div className="hero-image hero-image-one" />
        <div className="hero-wash" />
        <div className="hero-sun-wrap"><img src="/brand/sun.svg" alt="" className="hero-sun" /></div>
        <div className="hero-copy">
          <p className="eyebrow light">POSITIVELY MADE / EST. 2026</p>
          <h1>Better days<br/><em>are made.</em></h1>
          <p className="hero-sub">Uplifting apparel, thoughtful goods, and custom pieces made to share a little joy.</p>
          <a href="#shop" className="hero-cta">Shop the collection <ArrowRight size={16} /></a>
        </div>
        <div className="scroll-cue"><span>SCROLL</span><i /></div>
      </section>

      <section className="statement-section">
        <p className="eyebrow">THE POSITIVELY MADE EDIT</p>
        <h2>Small things can<br/>change the whole day.</h2>
        <p>Pieces made for the everyday moments, meaningful gifts, and the people who make life feel a little lighter.</p>
      </section>

      <section className="category-grid" id="shop">
        {categories.map((category, index) => (
          <article className={`category-card category-${index + 1}`} key={category.name}>
            <img src={category.image} alt="" />
            <div className="category-overlay" />
            <div className="category-copy">
              <p>0{index + 1}</p>
              <h3>{category.name}</h3>
              <button>Explore <ArrowRight size={15}/></button>
            </div>
          </article>
        ))}
      </section>

      <section className="editorial-break" id="story">
        <div className="editorial-art">
          <img src="/brand/pm-monogram.svg" alt="PM" />
          <span className="editorial-rule" />
        </div>
        <div className="editorial-copy">
          <p className="eyebrow">OUR STORY</p>
          <h2>Encouragement,<br/>made tangible.</h2>
          <p>Positively Made began with a simple belief: better days are not something we only wait for. They are made through effort, kindness, positive people, and the choices we make.</p>
          <button className="text-link">Read our story <ArrowRight size={15}/></button>
        </div>
      </section>

      <section className="custom-section" id="custom">
        <div className="custom-image" />
        <div className="custom-panel">
          <p className="eyebrow">CUSTOM, WITHOUT THE CHAOS</p>
          <h2>Your idea.<br/>Made personal.</h2>
          <p>For teams, schools, events, businesses, and meaningful one-off pieces. Submit the details once, approve your proof, and follow your order from start to finish.</p>
          <button className="button-dark">Start a custom order <ArrowRight size={16}/></button>
        </div>
      </section>

      <section className="wordmark-section">
        <img src="/brand/sun.svg" alt="" />
        <p>BETTER DAYS ARE MADE.</p>
        <small>MADE TO SHARE A LITTLE JOY.</small>
      </section>

      <footer className="site-footer">
        <BrandLockup dark />
        <p>APPAREL &nbsp;•&nbsp; STICKERS &nbsp;•&nbsp; GIFTS &nbsp;•&nbsp; CUSTOM</p>
        <button onClick={onOpenOS}>Owner login <ArrowRight size={14}/></button>
      </footer>
    </div>
  );
}

function BusinessOS({ page, setPage, onViewSite }: { page: OsPage; setPage: (p: OsPage) => void; onViewSite: () => void }) {
  const pages: { label: OsPage; icon: typeof LayoutDashboard }[] = [
    { label: 'Dashboard', icon: LayoutDashboard },
    { label: 'Orders', icon: Package },
    { label: 'Custom Requests', icon: Sparkles },
    { label: 'Customers', icon: Users },
    { label: 'Messages', icon: Mail },
    { label: 'Invoices', icon: FileText },
    { label: 'Reports', icon: CircleDollarSign },
  ];

  return (
    <div className="os-shell">
      <aside className="os-sidebar">
        <div className="os-brand">
          <img src="/brand/pm-monogram.svg" alt="PM" />
          <div><strong>POSITIVELY MADE</strong><span>BUSINESS OS</span></div>
        </div>
        <nav>
          <p className="os-label">WORKSPACE</p>
          {pages.map(({ label, icon: Icon }) => (
            <button key={label} onClick={() => setPage(label)} className={page === label ? 'active' : ''}>
              <Icon size={17}/><span>{label}</span>{page === label && <i />}
            </button>
          ))}
        </nav>
        <div className="os-sidebar-bottom">
          <button onClick={onViewSite}>View customer website <ArrowRight size={14}/></button>
          <p>Better days are made.</p>
        </div>
      </aside>
      <section className="os-main">
        <OsHeader page={page}/>
        {page === 'Dashboard' ? <Dashboard setPage={setPage}/> : <SimplePage page={page}/>} 
      </section>
    </div>
  );
}

function OsHeader({ page }: { page: OsPage }) {
  return (
    <header className="os-header">
      <div>
        <p className="os-kicker">POSITIVELY MADE / OWNER WORKSPACE</p>
        <h1>{page}</h1>
      </div>
      <div className="os-header-right">
        <button className="icon-button"><Search size={18}/></button>
        <div className="owner-chip"><span>SM</span><div><strong>Stephanie</strong><small>Owner</small></div></div>
      </div>
    </header>
  );
}

function Dashboard({ setPage }: { setPage: (p: OsPage) => void }) {
  const metrics = [
    { value: '12', label: 'Open orders', note: '4 need attention' },
    { value: '4', label: 'Proofs waiting', note: '2 due today' },
    { value: '7', label: 'In production', note: 'On schedule' },
    { value: '$4,280', label: 'This month', note: '+18% vs. last month' },
  ];

  return (
    <div className="dashboard-content">
      <section className="welcome-panel">
        <div>
          <p className="eyebrow">SUNDAY, SEPTEMBER 27</p>
          <h2>Good morning, Stephanie.</h2>
          <p>Here is what needs your attention today.</p>
        </div>
        <img src="/brand/sun.svg" alt="" />
      </section>

      <section className="metric-grid">
        {metrics.map((m) => (
          <article key={m.label}><strong>{m.value}</strong><span>{m.label}</span><small>{m.note}</small></article>
        ))}
      </section>

      <section className="dashboard-grid">
        <div className="panel orders-panel">
          <div className="panel-head"><div><p className="os-label">ACTIVE WORK</p><h3>Orders</h3></div><button onClick={() => setPage('Orders')}>View all <ChevronRight size={15}/></button></div>
          <div className="order-list">
            {orders.map((order) => (
              <button className="order-row" key={`${order.customer}-${order.item}`}>
                <div className="order-main"><span className={`status-dot ${statusClass(order.status)}`} /><div><strong>{order.customer}</strong><small>{order.item}</small></div></div>
                <span className={`status-pill ${statusClass(order.status)}`}>{order.status}</span>
                <div className="order-due"><small>Due</small><strong>{order.due}</strong></div>
                <strong className="order-amount">{order.amount}</strong>
                <ChevronRight size={16}/>
              </button>
            ))}
          </div>
        </div>

        <div className="panel attention-panel">
          <div className="panel-head"><div><p className="os-label">TODAY</p><h3>Needs attention</h3></div><span className="attention-count">3</span></div>
          <div className="attention-list">
            <AttentionItem title="Approve Lincoln PTO proof" meta="Waiting since yesterday" type="Proof" />
            <AttentionItem title="Reply to Bayside Soccer" meta="Customer asked a question" type="Message" />
            <AttentionItem title="Invoice #1048 is overdue" meta="$240 • 3 days overdue" type="Invoice" />
          </div>
        </div>
      </section>

      <section className="panel pipeline-panel">
        <div className="panel-head"><div><p className="os-label">PRODUCTION</p><h3>Order pipeline</h3></div><button onClick={() => setPage('Orders')}>Manage orders <ChevronRight size={15}/></button></div>
        <div className="pipeline">
          {[
            ['New', '3'], ['Design', '2'], ['Approval', '4'], ['Production', '7'], ['Ready', '2'], ['Complete', '18']
          ].map(([label, value], index) => (
            <div className="pipeline-step" key={label}><span>0{index + 1}</span><strong>{value}</strong><p>{label}</p>{index < 5 && <ArrowRight size={15}/>}</div>
          ))}
        </div>
      </section>
    </div>
  );
}

function AttentionItem({ title, meta, type }: { title: string; meta: string; type: string }) {
  return (
    <button className="attention-item"><span className="attention-line"/><div><strong>{title}</strong><small>{meta}</small></div><em>{type}</em><ChevronRight size={15}/></button>
  );
}

function SimplePage({ page }: { page: OsPage }) {
  const description = useMemo(() => {
    const map: Record<OsPage, string> = {
      Dashboard: '',
      Orders: 'See every order, due date, status, payment, and next step in one place.',
      'Custom Requests': 'Move new custom requests from idea to proof to production without losing details.',
      Customers: 'Keep customer details, order history, notes, and repeat business organized.',
      Messages: 'Keep customer questions and order communication easy to find.',
      Invoices: 'Track what has been sent, paid, and what still needs follow-up.',
      Reports: 'See sales, order volume, best sellers, and what is driving the business.',
    };
    return map[page];
  }, [page]);

  return (
    <div className="simple-page">
      <div className="simple-intro"><p className="eyebrow">ONE PLACE. LESS TO REMEMBER.</p><h2>{description}</h2></div>
      <div className="panel simple-panel">
        <div className="panel-head"><div><p className="os-label">PREVIEW</p><h3>{page}</h3></div><button className="button-small">+ Add new</button></div>
        {page === 'Orders' ? (
          <div className="table-preview">
            {orders.concat([{ customer: 'Avery K.', item: 'Sticker Pack', status: 'New', due: 'Oct 09', amount: '$34' }]).map(order => (
              <div className="table-row" key={`${order.customer}-${order.item}`}><strong>{order.customer}</strong><span>{order.item}</span><span className={`status-pill ${statusClass(order.status)}`}>{order.status}</span><span>{order.due}</span><strong>{order.amount}</strong><ChevronRight size={15}/></div>
            ))}
          </div>
        ) : (
          <div className="placeholder-grid">
            <article><span>01</span><strong>Clear next steps</strong><p>No digging through texts, notes, and spreadsheets to figure out what happens next.</p></article>
            <article><span>02</span><strong>Simple status tracking</strong><p>Every item has one clear status, owner, and due date.</p></article>
            <article><span>03</span><strong>Built for the business</strong><p>The system follows the actual Positively Made workflow instead of forcing a generic process.</p></article>
          </div>
        )}
      </div>
    </div>
  );
}

function statusClass(status: string) {
  const s = status.toLowerCase();
  if (s.includes('ready')) return 'ready';
  if (s.includes('production')) return 'production';
  if (s.includes('approval') || s.includes('proof')) return 'approval';
  return 'new';
}

export default App;
