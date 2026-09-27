import { useState } from 'react';
import { ArrowRight, Check, ChevronRight, FileText, LayoutDashboard, Package, Search, ShoppingBag, Sparkles, Users } from 'lucide-react';

type OsPage = 'Dashboard' | 'Product Studio' | 'Orders' | 'Custom Requests' | 'Customers' | 'Invoices' | 'Reports';

const templates = [
  { name: 'Apparel', category: 'Shop / Apparel', note: 'Sizes, colors, variants, inventory' },
  { name: 'Home', category: 'Shop / Home', note: 'Decor, pillows, signs, blankets' },
  { name: 'Kitchen', category: 'Shop / Kitchen', note: 'Aprons, towels, bakeware, serving pieces' },
  { name: 'Cozy Nights', category: 'Shop / Cozy Nights', note: 'Pajamas, robes, pillowcases, blankets' },
  { name: 'Campfire', category: 'Shop / Campfire', note: 'Outdoor goods and weekend pieces' },
  { name: 'Book', category: 'Books + Stories', note: 'Title, subtitle, age range, publishing status' },
  { name: 'Custom', category: 'Custom Orders', note: 'Proof, due date, customer details, production' },
];

function BrandLockup({ dark = false }: { dark?: boolean }) {
  return <div className={`brand-lockup ${dark ? 'brand-lockup-dark' : ''}`}><span className="brand-script">Positively</span><span className="brand-made">MADE</span></div>;
}

export default function App() {
  const [showOS, setShowOS] = useState(false);
  const [page, setPage] = useState<OsPage>('Dashboard');

  if (showOS) return <BusinessOS page={page} setPage={setPage} onViewSite={() => setShowOS(false)} />;

  return <div className="site-shell">
    <header className="site-nav">
      <nav className="nav-links"><a href="#shop">Shop</a><a href="#custom">Custom</a><a href="#story">Our Story</a></nav>
      <a className="nav-logo" href="#top"><BrandLockup /></a>
      <div className="nav-actions"><Search size={18}/><ShoppingBag size={18}/></div>
    </header>

    <section className="cinematic-hero" id="top">
      <div className="hero-glow hero-glow-one"/><div className="hero-glow hero-glow-two"/>
      <div className="hero-monogram"><img src="/brand/pm-monogram.svg" alt="PM"/></div>
      <div className="hero-copy">
        <p className="eyebrow light">POSITIVELY MADE / EST. 2026</p>
        <h1>Better days<br/><em>are made.</em></h1>
        <p className="hero-sub">Thoughtful goods, custom pieces, and stories made to bring a little more good into everyday life.</p>
        <a href="#shop" className="hero-cta">Discover the brand <ArrowRight size={16}/></a>
      </div>
      <div className="hero-sun-wrap"><img src="/brand/sun.svg" alt=""/></div>
    </section>

    <section className="statement-section"><p className="eyebrow">THE IDEA</p><h2>Made for the little things<br/>that make life better.</h2><p>Positively Made is rooted in kindness, creativity, family, and the belief that better days are something we help create.</p></section>

    <section className="pathways" id="shop">
      <article className="path-card path-card-light"><span>01</span><div><p className="eyebrow">SHOP</p><h3>Everyday goods,<br/>made with meaning.</h3><p>Apparel, gifts, home pieces, and future collections shaped by the Positively Made point of view.</p><button>Explore the shop <ArrowRight size={15}/></button></div></article>
      <article className="path-card path-card-oat" id="custom"><span>02</span><div><p className="eyebrow">CUSTOM</p><h3>Your idea.<br/>Made personal.</h3><p>Custom pieces for schools, teams, events, businesses, gifts, and meaningful moments.</p><button>Start a custom order <ArrowRight size={15}/></button></div></article>
      <article className="path-card path-card-mocha"><span>03</span><div><p className="eyebrow">BOOKS + STORIES</p><h3>Better days,<br/>made together.</h3><p>A children’s book world about sharing, helping, listening, learning, friendship, and family.</p><button>Discover the idea <ArrowRight size={15}/></button></div></article>
    </section>

    <section className="story-section" id="story"><div className="story-mark"><img src="/brand/pm-monogram.svg" alt="PM"/></div><div className="story-copy"><p className="eyebrow">OUR WHY</p><h2>Made from love.<br/>Built for real life.</h2><p>Positively Made began with a desire to make everyday life better for the people who matter most — Ryan, Knyx, and Lucy.</p><p className="story-small">The idea also leaves room for the many ways families are made: through IVF, blended families, divorce, chosen family, and every different path that can still lead to something deeply good.</p><div className="story-credit">Creative influence + technical direction by Ava Grace.</div></div></section>

    <section className="wordmark-section"><img src="/brand/sun.svg" alt=""/><p>BETTER DAYS ARE MADE.</p></section>
    <footer className="site-footer"><BrandLockup dark/><p>THOUGHTFUL GOODS • CUSTOM • BOOKS • HOME</p><button onClick={() => setShowOS(true)}>Owner login <ArrowRight size={14}/></button></footer>
  </div>;
}

function BusinessOS({ page, setPage, onViewSite }:{ page:OsPage; setPage:(p:OsPage)=>void; onViewSite:()=>void }) {
  const nav: [OsPage, any][] = [['Dashboard',LayoutDashboard],['Product Studio',Sparkles],['Orders',Package],['Custom Requests',Sparkles],['Customers',Users],['Invoices',FileText],['Reports',LayoutDashboard]];
  return <div className="os-demo-simple">
    <aside><div className="os-brand-simple"><img src="/brand/pm-monogram.svg" alt="PM"/><div><strong>POSITIVELY MADE</strong><span>BUSINESS OS</span></div></div>
      <nav>{nav.map(([label,Icon]) => <button key={label} className={page===label?'active':''} onClick={()=>setPage(label)}><Icon size={15}/><span>{label}</span></button>)}</nav>
      <button className="back-site" onClick={onViewSite}>View customer website <ArrowRight size={14}/></button>
    </aside>
    <main><header><div><small>OWNER WORKSPACE</small><h1>{page}</h1></div><div className="owner-pill">SM</div></header>
      {page==='Dashboard' ? <Dashboard setPage={setPage}/> : page==='Product Studio' ? <ProductStudio/> : <SimpleWorkspace page={page}/>} 
    </main>
  </div>;
}

function Dashboard({setPage}:{setPage:(p:OsPage)=>void}) {
  return <>
    <section className="os-welcome"><div><small>TODAY</small><h2>Good morning, Stephanie.</h2><p>Everything important, in one place.</p></div><img src="/brand/sun.svg" alt=""/></section>
    <section className="os-metrics"><article><strong>12</strong><span>Open orders</span></article><article><strong>4</strong><span>Proofs waiting</span></article><article><strong>7</strong><span>In production</span></article><article><strong>$4,280</strong><span>This month</span></article></section>
    <section className="os-lower"><div><small>ACTIVE WORK</small><h3>Orders</h3><p>Lincoln PTO — Proof Needed</p><p>Megan R. — In Production</p><p>Bayside Soccer — Awaiting Approval</p></div><div><small>TRY IT</small><h3>Test the system</h3><p>Walk through adding a product and see exactly where it lands on the website.</p><button className="demo-launch" onClick={()=>setPage('Product Studio')}>Start guided test <ArrowRight size={14}/></button></div></section>
  </>;
}

function ProductStudio(){
  const [step,setStep] = useState(1);
  const [template,setTemplate] = useState(templates[0]);
  const [name,setName] = useState('Better Days Ceramic Mug');
  const [price,setPrice] = useState('28');
  const [done,setDone] = useState(false);
  const steps = ['Choose template','Product details','Placement','Review'];
  const goNext = () => setStep(s=>Math.min(4,s+1));

  return <div className="studio-shell">
    <div className="test-banner"><Sparkles size={15}/><div><strong>TEST MODE</strong><span>Nothing here publishes for real. Click through it like you are adding a new product.</span></div></div>
    <div className="studio-head"><div><p>GUIDED WORKFLOW</p><h2>Add a new product</h2><span>The system asks the questions, then places the product in the right part of the website automatically.</span></div><button onClick={()=>{setStep(1);setDone(false)}}>Start over</button></div>
    <div className="step-track">{steps.map((s,i)=><div key={s} className={step>=i+1?'on':''}><span>{step>i+1?<Check size={12}/>:i+1}</span><b>{s}</b></div>)}</div>

    {!done && <div className="studio-card">
      {step===1 && <><p className="studio-label">STEP 1 / WHAT ARE YOU ADDING?</p><h3>Choose a product template</h3><div className="template-grid">{templates.map(t=><button key={t.name} className={template.name===t.name?'selected':''} onClick={()=>setTemplate(t)}><strong>{t.name}</strong><span>{t.note}</span><small>{t.category}</small></button>)}</div></>}
      {step===2 && <><p className="studio-label">STEP 2 / PRODUCT DETAILS</p><h3>Fill in the basics</h3><div className="form-grid"><label>Product name<input value={name} onChange={e=>setName(e.target.value)}/></label><label>Price<input value={price} onChange={e=>setPrice(e.target.value)}/></label><label className="wide">Description<textarea defaultValue="A thoughtful everyday piece made to bring a little more good into the routine."/></label></div></>}
      {step===3 && <><p className="studio-label">STEP 3 / WEBSITE PLACEMENT</p><h3>We already know where it belongs.</h3><div className="route-card"><span>AUTOMATIC ROUTING</span><strong>{template.category}</strong><p>Because you chose the <b>{template.name}</b> template, this product will automatically appear in this category on the customer website.</p><div><Check size={15}/> Product page created</div><div><Check size={15}/> Category connected</div><div><Check size={15}/> Inventory fields matched</div></div></>}
      {step===4 && <><p className="studio-label">STEP 4 / REVIEW</p><h3>Preview before publishing</h3><div className="review-grid"><div className="product-preview"><div className="preview-art"><img src="/brand/sun.svg" alt=""/></div><small>{template.category}</small><strong>{name}</strong><span>${price}.00</span></div><div className="review-list"><p><span>Template</span><b>{template.name}</b></p><p><span>Website category</span><b>{template.category}</b></p><p><span>Status</span><b>Draft</b></p><p><span>Next step</span><b>Publish when ready</b></p></div></div></>}
      <div className="studio-actions"><button disabled={step===1} onClick={()=>setStep(s=>Math.max(1,s-1))}>Back</button>{step<4?<button className="primary" onClick={goNext}>Continue <ChevronRight size={14}/></button>:<button className="primary" onClick={()=>setDone(true)}>Finish test <Check size={14}/></button>}</div>
    </div>}

    {done && <div className="success-card"><img src="/brand/sun.svg" alt=""/><p>TEST COMPLETE</p><h3>{name} is ready to publish.</h3><span>In the real system, one click would create the product page, connect it to <b>{template.category}</b>, and add it to the operations catalog.</span><button onClick={()=>{setStep(1);setDone(false)}}>Test another product</button></div>}
  </div>;
}

function SimpleWorkspace({page}:{page:OsPage}){
  const text:Record<string,string> = {Orders:'Track every order, due date, payment, and production step.', 'Custom Requests':'Move a custom request from idea to proof to finished product.', Customers:'Keep customer history, notes, and repeat orders together.', Invoices:'See what is sent, paid, and overdue.', Reports:'See sales, best sellers, and what is growing.'};
  return <div className="simple-page"><div className="simple-intro"><p className="eyebrow">ONE PLACE. LESS TO REMEMBER.</p><h2>{text[page]}</h2></div><div className="panel simple-panel"><div className="panel-head"><div><p className="os-label">PREVIEW</p><h3>{page}</h3></div><button className="button-small">+ Add new</button></div><div className="placeholder-grid"><article><strong>Simple</strong><span>Only the information she actually needs.</span></article><article><strong>Connected</strong><span>Changes flow to the right customer-facing area.</span></article><article><strong>Repeatable</strong><span>Templates keep the process the same every time.</span></article></div></div></div>;
}

const studioStyles = `
.os-demo-simple nav button{align-items:center;gap:10px}.demo-launch{margin-top:16px;border:1px solid rgba(46,46,46,.2);background:transparent;padding:11px 13px;display:inline-flex;gap:8px;align-items:center;font-size:9px;letter-spacing:.1em;text-transform:uppercase}.studio-shell{padding:34px 40px 60px}.test-banner{display:flex;gap:12px;align-items:center;background:#e8ede7;border:1px solid rgba(46,46,46,.1);padding:15px 18px;margin-bottom:18px}.test-banner div{display:flex;flex-direction:column;gap:3px}.test-banner strong{font-size:9px;letter-spacing:.14em}.test-banner span{font-size:10px;color:#6f756e}.studio-head{display:flex;justify-content:space-between;align-items:flex-end;margin:26px 0}.studio-head p,.studio-label{font-size:8px;letter-spacing:.18em;color:#8b8179;margin:0 0 7px}.studio-head h2,.studio-card h3,.success-card h3{font-family:'Bodoni Moda',serif;font-weight:400;color:var(--mocha)}.studio-head h2{font-size:40px;margin:0 0 8px}.studio-head span{font-size:11px;color:#786f68}.studio-head>button{border:0;background:transparent;font-size:9px;text-transform:uppercase;letter-spacing:.1em}.step-track{display:grid;grid-template-columns:repeat(4,1fr);margin-bottom:14px}.step-track div{border-top:1px solid rgba(46,46,46,.15);padding:12px 0;display:flex;gap:8px;align-items:center;color:#999}.step-track div.on{color:var(--mocha);border-color:var(--mocha)}.step-track span{width:22px;height:22px;border:1px solid currentColor;border-radius:50%;display:grid;place-items:center;font-size:9px}.step-track b{font-size:9px;font-weight:500}.studio-card,.success-card{background:var(--cream);border:1px solid rgba(46,46,46,.12);padding:28px}.studio-card h3{font-size:30px;margin:0 0 22px}.template-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.template-grid button{background:#f3ede4;border:1px solid transparent;padding:18px;text-align:left;min-height:126px}.template-grid button.selected{border-color:var(--mocha);background:#eee4d8}.template-grid strong,.template-grid span,.template-grid small{display:block}.template-grid strong{font-family:'Bodoni Moda',serif;font-size:20px;font-weight:400}.template-grid span{font-size:10px;line-height:1.5;color:#6f675f;margin:9px 0}.template-grid small{font-size:8px;letter-spacing:.08em;text-transform:uppercase;color:#91867d}.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}.form-grid label{font-size:9px;text-transform:uppercase;letter-spacing:.12em}.form-grid label.wide{grid-column:1/-1}.form-grid input,.form-grid textarea{width:100%;margin-top:7px;border:1px solid rgba(46,46,46,.15);background:#fffaf4;padding:12px;font:inherit}.form-grid textarea{min-height:110px}.route-card{background:#f0e8dd;padding:24px;max-width:720px}.route-card>span{font-size:8px;letter-spacing:.14em;color:#857970}.route-card>strong{display:block;font-family:'Bodoni Moda',serif;font-size:34px;color:var(--mocha);font-weight:400;margin:8px 0}.route-card p{font-size:11px;line-height:1.7;color:#6f675f}.route-card div{display:flex;gap:8px;align-items:center;font-size:10px;margin-top:9px}.review-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}.product-preview{background:#efe8de;padding:20px}.preview-art{height:220px;background:#d8c7b5;display:grid;place-items:center;margin-bottom:16px}.preview-art img{width:90px;opacity:.65}.product-preview small,.product-preview strong,.product-preview span{display:block}.product-preview small{font-size:8px;letter-spacing:.12em;text-transform:uppercase}.product-preview strong{font-family:'Bodoni Moda',serif;font-size:26px;font-weight:400;margin:8px 0}.review-list p{display:flex;justify-content:space-between;padding:13px 0;border-bottom:1px solid rgba(46,46,46,.12);margin:0;font-size:10px}.review-list span{color:#8b8179}.studio-actions{display:flex;justify-content:space-between;margin-top:24px}.studio-actions button,.success-card button{border:1px solid rgba(46,46,46,.2);background:transparent;padding:11px 14px;font-size:9px;text-transform:uppercase;letter-spacing:.1em;display:flex;gap:8px;align-items:center}.studio-actions button.primary,.success-card button{background:var(--mocha);color:var(--cream);border-color:var(--mocha)}.studio-actions button:disabled{opacity:.35}.success-card{text-align:center;padding:55px}.success-card img{width:110px;margin:0 auto 18px}.success-card p{font-size:8px;letter-spacing:.18em}.success-card h3{font-size:36px;margin:8px 0 14px}.success-card span{display:block;max-width:620px;margin:0 auto 24px;font-size:11px;line-height:1.7}.success-card button{margin:0 auto}.simple-page{padding:38px 40px}.simple-intro h2{font-family:'Bodoni Moda',serif;font-size:36px;font-weight:400;color:var(--mocha);max-width:800px}.panel{background:var(--cream);border:1px solid rgba(46,46,46,.12)}.panel-head{display:flex;justify-content:space-between;align-items:center;padding:18px 20px;border-bottom:1px solid rgba(46,46,46,.12)}.panel-head h3{font-family:'Bodoni Moda',serif;font-size:24px;font-weight:400;margin:2px 0}.os-label{font-size:7px;letter-spacing:.16em;color:#8b8179}.button-small{border:1px solid rgba(46,46,46,.15);background:transparent;padding:9px 11px}.placeholder-grid{display:grid;grid-template-columns:repeat(3,1fr)}.placeholder-grid article{padding:24px;border-right:1px solid rgba(46,46,46,.1)}.placeholder-grid strong{display:block;font-family:'Bodoni Moda',serif;font-size:22px;font-weight:400}.placeholder-grid span{display:block;font-size:10px;line-height:1.6;color:#7b7169;margin-top:6px}@media(max-width:900px){.template-grid,.review-grid,.form-grid{grid-template-columns:1fr}.step-track{grid-template-columns:1fr 1fr}.placeholder-grid{grid-template-columns:1fr}}
`;

export function ProductStudioStyles(){ return <style>{studioStyles}</style>; }
