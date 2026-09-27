import { useState } from 'react';
import { ArrowRight, Check, ChevronRight, FileText, LayoutDashboard, Package, Search, ShoppingBag, Sparkles, Users } from 'lucide-react';

type OsPage = 'Dashboard' | 'Product Studio' | 'Orders' | 'Custom Requests' | 'Customers' | 'Invoices' | 'Reports';
type Product = { id:string; name:string; price:string; template:string; category:string; description:string; publishedAt:string };

const templates = [
  { name: 'Apparel', category: 'Shop / Apparel', note: 'Sizes, colors, variants, inventory' },
  { name: 'Home', category: 'Shop / Home', note: 'Decor, pillows, signs, blankets' },
  { name: 'Kitchen', category: 'Shop / Kitchen', note: 'Aprons, towels, bakeware, serving pieces' },
  { name: 'Cozy Nights', category: 'Shop / Cozy Nights', note: 'Pajamas, robes, pillowcases, blankets' },
  { name: 'Campfire', category: 'Shop / Campfire', note: 'Outdoor goods and weekend pieces' },
  { name: 'Book', category: 'Books + Stories', note: 'Title, subtitle, age range, publishing status' },
  { name: 'Custom', category: 'Custom Orders', note: 'Proof, due date, customer details, production' },
];

const seedProducts = [
  { name:'The Everyday Crew', category:'Apparel', price:'68', tone:'cream' },
  { name:'Better Days Market Tote', category:'Gifts', price:'34', tone:'oat' },
  { name:'The Sunday Mug', category:'Kitchen', price:'28', tone:'sand' },
  { name:'Sweet Dreams Pillowcase', category:'Cozy Nights', price:'42', tone:'sage' },
];

function BrandLockup({ dark = false }: { dark?: boolean }) {
  return <div className={`brand-lockup ${dark ? 'brand-lockup-dark' : ''}`}><span className="brand-script">Positively</span><span className="brand-made">MADE</span></div>;
}

export default function App() {
  const [showOS, setShowOS] = useState(false);
  const [page, setPage] = useState<OsPage>('Dashboard');
  const [products, setProducts] = useState<Product[]>(() => {
    try { return JSON.parse(localStorage.getItem('pm-demo-products') || '[]'); } catch { return []; }
  });

  const publishProduct = (product:Product) => {
    const next = [product, ...products.filter(p => p.id !== product.id)];
    setProducts(next);
    localStorage.setItem('pm-demo-products', JSON.stringify(next));
    setShowOS(false);
    setTimeout(() => document.getElementById('new-arrivals')?.scrollIntoView({ behavior:'smooth' }), 80);
  };

  if (showOS) return <BusinessOS page={page} setPage={setPage} onViewSite={() => setShowOS(false)} onPublish={publishProduct} />;

  return <div className="site-shell luxe-shop">
    <div className="announcement">COMPLIMENTARY SHIPPING ON ORDERS $100+ <span>•</span> MADE WITH INTENTION</div>
    <header className="luxe-nav">
      <nav className="nav-links"><a href="#new-arrivals">New</a><a href="#collections">Collections</a><a href="#custom">Custom</a></nav>
      <a className="nav-logo" href="#top"><BrandLockup /></a>
      <div className="nav-actions"><a href="#story">Our Story</a><Search size={17}/><ShoppingBag size={17}/></div>
    </header>

    <section className="luxe-hero" id="top">
      <div className="luxe-hero-copy">
        <p className="eyebrow">THE POSITIVELY MADE EDIT</p>
        <h1>Better days<br/>are <em>made.</em></h1>
        <p>Thoughtful goods for home, family, gifting, and the everyday rituals worth making a little better.</p>
        <a href="#new-arrivals" className="luxe-link">Shop the edit <ArrowRight size={15}/></a>
      </div>
      <div className="luxe-hero-art">
        <div className="sun-orbit"><img src="/brand/sun.svg" alt=""/></div>
        <div className="hero-object hero-object-one"><span>BETTER</span><strong>DAYS</strong><small>ARE MADE.</small></div>
        <div className="hero-object hero-object-two"><img src="/brand/pm-monogram.svg" alt="PM"/></div>
        <p>POSITIVELY MADE / 2026</p>
      </div>
    </section>

    <section className="shop-intro"><p className="eyebrow">NEW ARRIVALS</p><h2>Small things. Better days.</h2><a href="#new-arrivals">View all <ArrowRight size={14}/></a></section>

    <section className="product-section" id="new-arrivals">
      <div className="product-grid">
        {products.map((product,i) => <article className="lux-product live" key={product.id}>
          <div className={`lux-product-art tone-${['sand','cream','sage','oat'][i%4]}`}><img src="/brand/sun.svg" alt=""/><span className="live-tag">JUST ADDED</span><button>Quick view</button></div>
          <div className="lux-product-meta"><small>{product.category.replace('Shop / ','')}</small><h3>{product.name}</h3><span>${Number(product.price || 0).toFixed(2)}</span></div>
        </article>)}
        {seedProducts.map((product,i) => <article className="lux-product" key={product.name}>
          <div className={`lux-product-art tone-${product.tone}`}><div className="product-mark"><img src={i%2===0?'/brand/pm-monogram.svg':'/brand/sun.svg'} alt=""/></div><span className="product-kicker">POSITIVELY MADE</span><button>Quick view</button></div>
          <div className="lux-product-meta"><small>{product.category}</small><h3>{product.name}</h3><span>${Number(product.price).toFixed(2)}</span></div>
        </article>)}
      </div>
    </section>

    <section className="collection-editorial" id="collections">
      <article className="collection-feature home-edit"><div className="collection-number">01</div><div><p className="eyebrow">THE HOME EDIT</p><h2>Better days<br/>begin at home.</h2><p>Soft goods, useful objects, and pieces made for the spaces where real life happens.</p><a href="#">Shop Home <ArrowRight size={14}/></a></div><img src="/brand/pm-monogram.svg" alt=""/></article>
      <article className="collection-feature little-edit"><div className="collection-number">02</div><div><p className="eyebrow">BOOKS + STORIES</p><h2>Little books.<br/>Big ideas.</h2><p>Stories about sharing, listening, helping, learning, friendship, and family.</p><a href="#">Discover Books <ArrowRight size={14}/></a></div><img src="/brand/sun.svg" alt=""/></article>
      <article className="collection-feature kitchen-edit"><div className="collection-number">03</div><div><p className="eyebrow">AROUND THE TABLE</p><h2>Made for<br/>gathering.</h2><p>Kitchen pieces, linens, and objects for the everyday rituals that bring people together.</p><a href="#">Shop Kitchen <ArrowRight size={14}/></a></div><span className="giant-pm">PM</span></article>
    </section>

    <section className="brand-pause" id="story"><img src="/brand/sun.svg" alt=""/><p>OUR WHY</p><h2>Made from love.<br/>Built for real life.</h2><div><p>Positively Made began with a desire to make everyday life better for the people who matter most — Ryan, Knyx, and Lucy.</p><p>The idea also celebrates the many ways families are made, and the belief that something meaningful can come from every different path.</p></div><small>CREATIVE INFLUENCE + TECHNICAL DIRECTION BY AVA GRACE.</small></section>

    <section className="custom-luxe" id="custom"><div><p className="eyebrow light">CUSTOM / MADE SIMPLE</p><h2>Your idea.<br/><em>Positively made.</em></h2><p>Schools, teams, events, businesses, and one-of-one gifts — with a clear proof-to-production process behind every order.</p><a href="#">Start a custom order <ArrowRight size={15}/></a></div><div className="custom-mark"><img src="/brand/pm-monogram.svg" alt="PM"/></div></section>

    <section className="newsletter"><p className="eyebrow">FROM THE STUDIO</p><h2>A little more good,<br/>straight to your inbox.</h2><div><input placeholder="Email address"/><button>Join <ArrowRight size={14}/></button></div></section>

    <footer className="site-footer"><BrandLockup dark/><p>SHOP • CUSTOM • BOOKS • HOME • KITCHEN</p><button onClick={() => {setPage('Dashboard');setShowOS(true)}}>Owner workspace <ArrowRight size={14}/></button></footer>
  </div>;
}

function BusinessOS({ page, setPage, onViewSite, onPublish }:{ page:OsPage; setPage:(p:OsPage)=>void; onViewSite:()=>void; onPublish:(p:Product)=>void }) {
  const nav: [OsPage, any][] = [['Dashboard',LayoutDashboard],['Product Studio',Sparkles],['Orders',Package],['Custom Requests',Sparkles],['Customers',Users],['Invoices',FileText],['Reports',LayoutDashboard]];
  return <div className="os-demo-simple">
    <aside><div className="os-brand-simple"><img src="/brand/pm-monogram.svg" alt="PM"/><div><strong>POSITIVELY MADE</strong><span>BUSINESS OS</span></div></div>
      <nav>{nav.map(([label,Icon]) => <button key={label} className={page===label?'active':''} onClick={()=>setPage(label)}><Icon size={15}/><span>{label}</span></button>)}</nav>
      <button className="back-site" onClick={onViewSite}>View customer website <ArrowRight size={14}/></button>
    </aside>
    <main><header><div><small>OWNER WORKSPACE</small><h1>{page}</h1></div><div className="owner-pill">SM</div></header>
      {page==='Dashboard' ? <Dashboard setPage={setPage}/> : page==='Product Studio' ? <ProductStudio onPublish={onPublish}/> : <SimpleWorkspace page={page}/>} 
    </main>
  </div>;
}

function Dashboard({setPage}:{setPage:(p:OsPage)=>void}) {
  return <><section className="os-welcome"><div><small>TODAY</small><h2>Good morning, Stephanie.</h2><p>Everything important, in one place.</p></div><img src="/brand/sun.svg" alt=""/></section>
    <section className="os-metrics"><article><strong>12</strong><span>Open orders</span></article><article><strong>4</strong><span>Proofs waiting</span></article><article><strong>7</strong><span>In production</span></article><article><strong>$4,280</strong><span>This month</span></article></section>
    <section className="os-lower"><div><small>ACTIVE WORK</small><h3>Orders</h3><p>Lincoln PTO — Proof Needed</p><p>Megan R. — In Production</p><p>Bayside Soccer — Awaiting Approval</p></div><div><small>TRY IT</small><h3>Test the system</h3><p>Add a product, publish it, and watch it appear inside New Arrivals on the luxury storefront.</p><button className="demo-launch" onClick={()=>setPage('Product Studio')}>Start guided test <ArrowRight size={14}/></button></div></section></>;
}

function ProductStudio({onPublish}:{onPublish:(p:Product)=>void}){
  const [step,setStep] = useState(1);
  const [template,setTemplate] = useState(templates[2]);
  const [name,setName] = useState('Better Days Ceramic Mug');
  const [price,setPrice] = useState('28');
  const [description,setDescription] = useState('A thoughtful everyday piece made to bring a little more good into the routine.');
  const steps = ['Choose template','Product details','Placement','Review'];
  const publish = () => onPublish({ id:`demo-${Date.now()}`, name, price, description, template:template.name, category:template.category, publishedAt:new Date().toISOString() });
  return <div className="studio-shell"><div className="test-banner"><Sparkles size={15}/><div><strong>DEMO MODE</strong><span>Publishing here updates this prototype website only — perfect for testing the workflow.</span></div></div>
    <div className="studio-head"><div><p>GUIDED WORKFLOW</p><h2>Add a new product</h2><span>The system asks the questions, then places the product in the right part of the website automatically.</span></div><button onClick={()=>setStep(1)}>Start over</button></div>
    <div className="step-track">{steps.map((s,i)=><div key={s} className={step>=i+1?'on':''}><span>{step>i+1?<Check size={12}/>:i+1}</span><b>{s}</b></div>)}</div>
    <div className="studio-card">{step===1 && <><p className="studio-label">STEP 1 / WHAT ARE YOU ADDING?</p><h3>Choose a product template</h3><div className="template-grid">{templates.map(t=><button key={t.name} className={template.name===t.name?'selected':''} onClick={()=>setTemplate(t)}><strong>{t.name}</strong><span>{t.note}</span><small>{t.category}</small></button>)}</div></>}
      {step===2 && <><p className="studio-label">STEP 2 / PRODUCT DETAILS</p><h3>Fill in the basics</h3><div className="form-grid"><label>Product name<input value={name} onChange={e=>setName(e.target.value)}/></label><label>Price<input value={price} onChange={e=>setPrice(e.target.value)}/></label><label className="wide">Description<textarea value={description} onChange={e=>setDescription(e.target.value)}/></label></div></>}
      {step===3 && <><p className="studio-label">STEP 3 / WEBSITE PLACEMENT</p><h3>We already know where it belongs.</h3><div className="route-card"><span>AUTOMATIC ROUTING</span><strong>{template.category}</strong><p>Because you chose the <b>{template.name}</b> template, this product will appear in New Arrivals and its correct collection.</p><div><Check size={15}/> Product page created</div><div><Check size={15}/> Category connected</div><div><Check size={15}/> Inventory fields matched</div></div></>}
      {step===4 && <><p className="studio-label">STEP 4 / REVIEW</p><h3>Preview before publishing</h3><div className="review-grid"><div className="product-preview"><div className="preview-art"><img src="/brand/sun.svg" alt=""/></div><small>{template.category}</small><strong>{name}</strong><span>${Number(price || 0).toFixed(2)}</span></div><div className="review-list"><p><span>Template</span><b>{template.name}</b></p><p><span>Website category</span><b>{template.category}</b></p><p><span>Status</span><b>Ready</b></p><p><span>Next step</span><b>Publish to demo website</b></p></div></div></>}
      <div className="studio-actions"><button disabled={step===1} onClick={()=>setStep(s=>Math.max(1,s-1))}>Back</button>{step<4?<button className="primary" onClick={()=>setStep(s=>Math.min(4,s+1))}>Continue <ChevronRight size={14}/></button>:<button className="primary" onClick={publish}>Publish to website <ArrowRight size={14}/></button>}</div></div></div>;
}

function SimpleWorkspace({page}:{page:OsPage}){
  const text:Record<string,string> = {Orders:'Track every order, due date, payment, and production step.', 'Custom Requests':'Move a custom request from idea to proof to finished product.', Customers:'Keep customer history, notes, and repeat orders together.', Invoices:'See what is sent, paid, and overdue.', Reports:'See sales, best sellers, and what is growing.'};
  return <div className="simple-page"><div className="simple-intro"><p className="eyebrow">ONE PLACE. LESS TO REMEMBER.</p><h2>{text[page]}</h2></div><div className="panel simple-panel"><div className="panel-head"><div><p className="os-label">PREVIEW</p><h3>{page}</h3></div><button className="button-small">+ Add new</button></div><div className="placeholder-grid"><article><strong>Simple</strong><span>Only the information she actually needs.</span></article><article><strong>Connected</strong><span>Changes flow to the right customer-facing area.</span></article><article><strong>Repeatable</strong><span>Templates keep the process the same every time.</span></article></div></div></div>;
}
