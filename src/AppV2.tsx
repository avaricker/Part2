import { useState } from 'react';
import { ArrowRight, BookOpen, ChevronRight, CircleDollarSign, FileText, Home, LayoutDashboard, Mail, Menu, Package, Search, ShoppingBag, Sparkles, Users, X } from 'lucide-react';

type Mode = 'site' | 'os';
type OsPage = 'Dashboard' | 'Orders' | 'Custom Requests' | 'Customers' | 'Publishing' | 'Collections' | 'Messages' | 'Invoices';

const divisions = [
  { kicker: '01 / LITTLE DAYS', title: 'Books for better days', copy: 'Simple stories for sharing, listening, learning, helping, and becoming a good friend.', image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1400&q=88' },
  { kicker: '02 / AT HOME', title: 'Better days are made at home', copy: 'Objects for the rooms where real life happens — thoughtful, useful, warm, and made to keep.', image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1400&q=88' },
  { kicker: '03 / IN THE KITCHEN', title: 'Made around the table', copy: 'Aprons, towels, bakeware, serving pieces, and the little rituals that turn meals into memories.', image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1400&q=88' },
  { kicker: '04 / COZY NIGHTS', title: 'Better days start with sweet dreams', copy: 'Pajamas, robes, pillowcases, blankets, and soft pieces designed for the end of the day.', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=88' },
  { kicker: '05 / OUT THERE', title: 'Around the campfire', copy: 'Comfort, connection, and useful pieces for weekends outside and nights under the stars.', image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?auto=format&fit=crop&w=1400&q=88' },
  { kicker: '06 / CUSTOM', title: 'Your idea, positively made', copy: 'Schools, teams, events, gifts, and one-off pieces — built with a clear proof-to-production process.', image: 'https://images.unsplash.com/photo-1520975682031-a0a7a0a44e58?auto=format&fit=crop&w=1400&q=88' },
];

const bookTitles = [
  'Better Days Are Made When We Share',
  'Better Days Are Made When We Take Turns',
  'Better Days Are Made When We Clean Up',
  'Better Days Are Made When We Are a Good Friend',
  'Better Days Are Made When We Help Others',
  'Better Days Are Made When We Are Good Listeners',
  'Better Days Are Made When We Are Learning',
];

const orders = [
  ['Lincoln PTO','Spirit Wear Order','Proof Needed','Oct 02','$1,280'],
  ['Megan R.','Custom Crewneck','In Production','Oct 04','$86'],
  ['Bayside Soccer','Team Tote Bags','Awaiting Approval','Oct 07','$720'],
  ['Caroline B.','Gift Set','Ready','Today','$112'],
];

function BrandMark({ light = false }: { light?: boolean }) {
  return <div className={`brand-word ${light ? 'light' : ''}`}><span>POSITIVELY</span><strong>MADE</strong></div>;
}

export default function AppV2(){
  const [mode,setMode] = useState<Mode>('site');
  const [page,setPage] = useState<OsPage>('Dashboard');
  const [menu,setMenu] = useState(false);
  return <main>
    <div className="prototype-switcher"><button className={mode==='site'?'active':''} onClick={()=>setMode('site')}>Customer Website</button><span/><button className={mode==='os'?'active':''} onClick={()=>setMode('os')}>Business OS</button></div>
    {mode==='site' ? <Site onOpenOS={()=>setMode('os')} menu={menu} setMenu={setMenu}/> : <OS page={page} setPage={setPage} onViewSite={()=>setMode('site')}/>} 
  </main>
}

function Site({onOpenOS,menu,setMenu}:{onOpenOS:()=>void;menu:boolean;setMenu:(v:boolean)=>void}){
  return <div className="pm-site">
    <header className="pm-nav">
      <button className="pm-menu" onClick={()=>setMenu(!menu)}>{menu?<X size={18}/>:<Menu size={18}/>}</button>
      <nav className={menu?'open':''}><a href="#world">The World</a><a href="#books">Books</a><a href="#story">Our Why</a><a href="#custom">Custom</a></nav>
      <a href="#top" className="pm-logo"><BrandMark light/></a>
      <div className="pm-actions"><Search size={17}/><ShoppingBag size={17}/></div>
    </header>

    <section className="pm-hero" id="top">
      <div className="hero-photo"/>
      <div className="hero-film"/>
      <div className="hero-copy-v2">
        <p>POSITIVELY MADE / A LIFE BRAND</p>
        <h1>Better days<br/><em>are made.</em></h1>
        <span>Thoughtful things for the people, places, and little rituals that make life feel better.</span>
        <a href="#world">Enter the world <ArrowRight size={15}/></a>
      </div>
      <img className="hero-sun-v2" src="/brand/sun.svg" alt=""/>
    </section>

    <section className="brand-intro" id="story">
      <div className="intro-index">01</div>
      <div className="intro-main"><p className="pm-eyebrow">THE IDEA</p><h2>A brand about how<br/>good things get made.</h2></div>
      <div className="intro-copy"><p>Positively Made began with a desire to make everyday life better for the people who matter most — Ryan, Knyx, and Lucy.</p><p>It grew into something bigger: a way to celebrate families, friendships, routines, learning, home, and the many different ways a life can be built.</p><small>Creative influence + technical direction by Ava Grace.</small></div>
    </section>

    <section className="world-head" id="world"><p className="pm-eyebrow">THE WORLD OF POSITIVELY MADE</p><h2>One idea.<br/>Many ways to live it.</h2></section>
    <section className="division-grid">
      {divisions.map((d,i)=><article className={`division-card d${i+1}`} key={d.title}>
        <img src={d.image} alt=""/><div className="division-shade"/><div className="division-copy"><p>{d.kicker}</p><h3>{d.title}</h3><span>{d.copy}</span><button>Explore <ArrowRight size={14}/></button></div>
      </article>)}
    </section>

    <section className="books-section" id="books">
      <div className="book-art"><div className="book-cover"><img src="/brand/sun.svg" alt=""/><small>POSITIVELY MADE PRESENTS</small><h3>Better Days<br/>Are Made<br/><em>When We Share.</em></h3><span>A LITTLE BOOK ABOUT BIG THINGS</span></div></div>
      <div className="books-copy"><p className="pm-eyebrow">POSITIVELY MADE / PUBLISHING</p><h2>Little books for<br/>big life lessons.</h2><p>A children’s series built around simple, repeatable ideas children can understand and grown-ups actually want to read.</p><div className="book-list">{bookTitles.map((t,i)=><div key={t}><span>0{i+1}</span><strong>{t}</strong><ChevronRight size={14}/></div>)}</div></div>
    </section>

    <section className="family-section">
      <div className="family-copy"><p className="pm-eyebrow">POSITIVELY MADE, IN EVERY SENSE</p><h2>Families are made<br/>in more than one way.</h2><p>Some families are built with science. Some grow and change after divorce. Some look nothing like the picture people expected at the beginning. The common thread is not perfection — it is that the people inside them are wanted, loved, and positively made.</p><a href="#">Read the story <ArrowRight size={14}/></a></div>
      <div className="family-photo"/>
    </section>

    <section className="custom-v2" id="custom"><div className="custom-photo-v2"/><div className="custom-copy-v2"><p className="pm-eyebrow light">CUSTOM / MADE SIMPLE</p><h2>Your idea.<br/><em>Made personal.</em></h2><p>One request. One proof. One clear place to follow the work from idea to finished piece.</p><button>Start a custom order <ArrowRight size={14}/></button></div></section>

    <section className="pm-manifesto"><img src="/brand/sun.svg" alt=""/><p>BETTER DAYS ARE MADE.</p><span>AT HOME. AROUND THE TABLE. IN THE CLASSROOM. UNDER THE STARS. TOGETHER.</span></section>
    <footer className="pm-footer"><BrandMark light/><p>POSITIVELY MADE © 2026</p><button onClick={onOpenOS}>Owner Workspace <ArrowRight size={13}/></button></footer>
  </div>
}

function OS({page,setPage,onViewSite}:{page:OsPage;setPage:(p:OsPage)=>void;onViewSite:()=>void}){
  const pages:[OsPage, any][] = [['Dashboard',LayoutDashboard],['Orders',Package],['Custom Requests',Sparkles],['Customers',Users],['Publishing',BookOpen],['Collections',Home],['Messages',Mail],['Invoices',FileText]];
  return <div className="os-v2"><aside><div className="os-brand-v2"><img src="/brand/pm-monogram.svg"/><div><b>POSITIVELY MADE</b><span>BUSINESS OS</span></div></div><p className="side-label">WORKSPACE</p>{pages.map(([p,I])=><button className={page===p?'active':''} onClick={()=>setPage(p)} key={p}><I size={16}/><span>{p}</span></button>)}<div className="os-bottom"><button onClick={onViewSite}>View customer website <ArrowRight size={13}/></button><em>Better days are made.</em></div></aside>
    <section className="os-content"><header><div><p>OWNER WORKSPACE / POSITIVELY MADE</p><h1>{page}</h1></div><div className="owner"><Search size={17}/><span>SM</span><div><b>Stephanie</b><small>Owner</small></div></div></header>{page==='Dashboard'?<Dashboard setPage={setPage}/>:<WorkspacePage page={page}/>}</section>
  </div>
}

function Dashboard({setPage}:{setPage:(p:OsPage)=>void}){
  return <div className="dash-v2"><section className="hello"><div><p>SUNDAY / SEPTEMBER 27</p><h2>Good morning, Stephanie.</h2><span>Three things need your attention today.</span></div><img src="/brand/sun.svg"/></section>
    <section className="metric-v2">{[['12','Open orders','4 need attention'],['4','Proofs waiting','2 due today'],['7','In production','On schedule'],['$4,280','This month','+18% vs last month']].map(x=><article key={x[1]}><strong>{x[0]}</strong><b>{x[1]}</b><small>{x[2]}</small></article>)}</section>
    <section className="dash-grid-v2"><div className="panel-v2"><div className="panel-title"><div><p>ACTIVE WORK</p><h3>Orders</h3></div><button onClick={()=>setPage('Orders')}>View all <ChevronRight size={14}/></button></div>{orders.map(o=><div className="order-v2" key={o[0]+o[1]}><div><b>{o[0]}</b><small>{o[1]}</small></div><span>{o[2]}</span><div><small>Due</small><b>{o[3]}</b></div><strong>{o[4]}</strong><ChevronRight size={14}/></div>)}</div>
      <div className="panel-v2 attention-v2"><div className="panel-title"><div><p>TODAY</p><h3>Needs attention</h3></div><i>3</i></div>{[['Approve Lincoln PTO proof','Proof'],['Reply to Bayside Soccer','Message'],['Invoice #1048 is overdue','Invoice']].map(a=><button key={a[0]}><span/><div><b>{a[0]}</b><small>{a[1]}</small></div><ChevronRight size={14}/></button>)}</div></section>
    <section className="pipeline-v2 panel-v2"><div className="panel-title"><div><p>PRODUCTION</p><h3>Order pipeline</h3></div></div><div>{[['New','3'],['Design','2'],['Approval','4'],['Production','7'],['Ready','2'],['Complete','18']].map((x,i)=><article key={x[0]}><span>0{i+1}</span><strong>{x[1]}</strong><b>{x[0]}</b></article>)}</div></section>
  </div>
}

function WorkspacePage({page}:{page:OsPage}){
  const copy:Record<OsPage,string>={Dashboard:'',Orders:'Every order, due date, payment, and next step — in one place.','Custom Requests':'Capture the idea once, then move it cleanly from request to proof to production.',Customers:'Customer details, order history, notes, and repeat business without the digging.',Publishing:'Manage children’s book concepts, manuscripts, illustration status, and launch plans.',Collections:'Organize Home, Kitchen, Cozy Nights, Campfire, apparel, gifts, and future lines.',Messages:'Keep questions, approvals, and customer communication attached to the work.',Invoices:'Know what has been sent, paid, and what needs a follow-up.'};
  return <div className="workspace-page"><p className="pm-eyebrow">ONE PLACE. LESS TO REMEMBER.</p><h2>{copy[page]}</h2><div className="panel-v2 coming"><span>{page}</span><strong>Workspace preview</strong><p>This section can be built around the exact way Positively Made runs this part of the business.</p><button>+ Add new</button></div></div>
}
