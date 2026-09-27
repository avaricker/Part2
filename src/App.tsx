import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, ChevronRight, FileText, LayoutDashboard, Minus, Package, Plus, Search, ShoppingBag, Sparkles, Users, X } from 'lucide-react';

type OsPage = 'Dashboard' | 'Product Studio' | 'Orders' | 'Custom Requests' | 'Customers' | 'Invoices' | 'Reports';
type StorePage = 'home' | 'collection' | 'product' | 'story' | 'custom';
type Product = { id:string; name:string; price:string; template:string; category:string; description:string; publishedAt:string; collection?:string };
type CatalogProduct = Product & { collection:string; tone:string; editorial:string };

const templates = [
  { name: 'Apparel', category: 'Shop / Apparel', note: 'Sizes, colors, variants, inventory' },
  { name: 'Home', category: 'Shop / Home', note: 'Decor, pillows, signs, blankets' },
  { name: 'Kitchen', category: 'Shop / Kitchen', note: 'Aprons, towels, bakeware, serving pieces' },
  { name: 'Cozy Nights', category: 'Shop / Cozy Nights', note: 'Pajamas, robes, pillowcases, blankets' },
  { name: 'Campfire', category: 'Shop / Campfire', note: 'Outdoor goods and weekend pieces' },
  { name: 'Book', category: 'Books + Stories', note: 'Title, subtitle, age range, publishing status' },
  { name: 'Custom', category: 'Custom Orders', note: 'Proof, due date, customer details, production' },
];

const seedProducts:CatalogProduct[] = [
  { id:'crew', name:'The Everyday Crew', category:'Apparel', collection:'Apparel', price:'68', tone:'cream', editorial:'Soft structure. Easy layers. Made for repeat wear.', description:'A soft everyday crew designed around comfort, clean lines, and the kind of piece you reach for without thinking.', template:'Apparel', publishedAt:'' },
  { id:'tote', name:'Better Days Market Tote', category:'Gifts', collection:'Home', price:'34', tone:'oat', editorial:'A useful carryall with a quiet point of view.', description:'A roomy everyday tote for errands, weekends, school runs, and all the little things that make up a day.', template:'Home', publishedAt:'' },
  { id:'mug', name:'The Sunday Mug', category:'Kitchen', collection:'Kitchen', price:'28', tone:'sand', editorial:'Made for slow mornings and second cups.', description:'A warm ceramic mug with an understated Positively Made mark and an easy, substantial feel.', template:'Kitchen', publishedAt:'' },
  { id:'pillow', name:'Sweet Dreams Pillowcase', category:'Cozy Nights', collection:'Cozy Nights', price:'42', tone:'sage', editorial:'A softer ending to the day.', description:'A calm, giftable pillowcase designed to make bedtime feel a little more intentional.', template:'Cozy Nights', publishedAt:'' },
  { id:'book', name:'Better Days Are Made When We Share', category:'Books + Stories', collection:'Books + Stories', price:'24', tone:'cream', editorial:'A little book about a big idea.', description:'A gentle children’s story built around simple, repeatable lessons about sharing and growing together.', template:'Book', publishedAt:'' },
  { id:'blanket', name:'The Fireside Throw', category:'Campfire', collection:'Campfire', price:'88', tone:'oat', editorial:'Warm enough for outside. Good enough for the sofa.', description:'A substantial throw designed for campfire nights, movie nights, and wherever everyone ends up together.', template:'Campfire', publishedAt:'' },
];

const collectionData:Record<string,{eyebrow:string;title:string;sub:string;className:string;quote:string}> = {
  'Home': {eyebrow:'THE HOME EDIT', title:'Better days begin at home.', sub:'Soft goods, useful objects, and pieces made for the spaces where real life happens.', className:'home-image', quote:'For the rooms where everyone gathers, resets, and starts again.'},
  'Books + Stories': {eyebrow:'BOOKS + STORIES', title:'Little books. Big ideas.', sub:'Stories about sharing, listening, helping, learning, friendship, and family.', className:'books-block', quote:'Simple words children can understand. Big ideas families can keep.'},
  'Kitchen': {eyebrow:'AROUND THE TABLE', title:'Made for gathering.', sub:'Kitchen pieces, linens, and objects for everyday rituals that bring people together.', className:'kitchen-image', quote:'Because some of the best parts of the day happen around the table.'},
  'Cozy Nights': {eyebrow:'COZY NIGHTS', title:'Better days start with sweet dreams.', sub:'Pajamas, robes, pillowcases, blankets, and softer endings to the day.', className:'cozy-block', quote:'A softer close to the day makes room for a better tomorrow.'},
  'Campfire': {eyebrow:'OUT THERE', title:'Around the campfire.', sub:'Comfort, connection, and useful pieces for weekends outside and nights under the stars.', className:'campfire-image', quote:'Made for the stories that get told after the sun goes down.'},
  'Apparel': {eyebrow:'WEAR THE IDEA', title:'Made to live in.', sub:'Everyday layers, clean shapes, and wearable reminders that better days are made.', className:'apparel-block', quote:'Easy pieces, repeated often, with meaning built in.'},
};

function BrandLockup({ dark = false }: { dark?: boolean }) {
  return <div className={`brand-lockup ${dark ? 'brand-lockup-dark' : ''}`}><span className="brand-script">Positively</span><span className="brand-made">MADE</span></div>;
}

export default function App() {
  const [showOS, setShowOS] = useState(false);
  const [page, setPage] = useState<OsPage>('Dashboard');
  const [storePage, setStorePage] = useState<StorePage>('home');
  const [activeCollection, setActiveCollection] = useState('Home');
  const [activeProduct, setActiveProduct] = useState<CatalogProduct | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [products, setProducts] = useState<Product[]>(() => {
    try { return JSON.parse(localStorage.getItem('pm-demo-products') || '[]'); } catch { return []; }
  });

  const allProducts = useMemo<CatalogProduct[]>(() => [
    ...products.map((p,i)=>({ ...p, collection:p.category.replace('Shop / ',''), tone:['sand','cream','sage','oat'][i%4], editorial:p.description })),
    ...seedProducts
  ], [products]);

  const goHome = () => { setStorePage('home'); window.scrollTo({top:0,behavior:'smooth'}); };
  const openCollection = (name:string) => { setActiveCollection(name); setStorePage('collection'); window.scrollTo({top:0,behavior:'smooth'}); };
  const openProduct = (p:CatalogProduct) => { setActiveProduct(p); setStorePage('product'); window.scrollTo({top:0,behavior:'smooth'}); };

  const publishProduct = (product:Product) => {
    const next = [product, ...products.filter(p => p.id !== product.id)];
    setProducts(next);
    localStorage.setItem('pm-demo-products', JSON.stringify(next));
    setShowOS(false);
    setStorePage('home');
    setTimeout(() => document.getElementById('new-arrivals')?.scrollIntoView({ behavior:'smooth' }), 80);
  };

  if (showOS) return <BusinessOS page={page} setPage={setPage} onViewSite={() => setShowOS(false)} onPublish={publishProduct} />;

  return <div className="site-shell luxe-shop">
    <div className="announcement">COMPLIMENTARY SHIPPING ON ORDERS $100+ <span>•</span> MADE WITH INTENTION</div>
    <StoreNav goHome={goHome} openCollection={openCollection} setStorePage={setStorePage} cartCount={cartCount} setCartOpen={setCartOpen}/>

    {storePage==='home' && <HomePage products={allProducts} openCollection={openCollection} openProduct={openProduct} setStorePage={setStorePage} />}
    {storePage==='collection' && <CollectionPage name={activeCollection} products={allProducts} openProduct={openProduct} goHome={goHome}/>} 
    {storePage==='product' && activeProduct && <ProductPage product={activeProduct} openCollection={openCollection} addToCart={()=>{setCartCount(c=>c+1);setCartOpen(true)}}/>}
    {storePage==='story' && <StoryPage goHome={goHome}/>} 
    {storePage==='custom' && <CustomPage goHome={goHome}/>} 

    <footer className="site-footer"><BrandLockup dark/><p>SHOP • CUSTOM • BOOKS • HOME • KITCHEN</p><button onClick={() => {setPage('Dashboard');setShowOS(true)}}>Owner workspace <ArrowRight size={14}/></button></footer>

    {cartOpen && <div className="cart-drawer-wrap" onClick={()=>setCartOpen(false)}><aside className="cart-drawer" onClick={e=>e.stopPropagation()}><button className="cart-close" onClick={()=>setCartOpen(false)}><X size={18}/></button><p className="eyebrow">YOUR BAG</p><h2>{cartCount ? `${cartCount} item${cartCount===1?'':'s'}` : 'Your bag is empty.'}</h2>{cartCount>0 && <><div className="cart-mini"><div className="cart-art"><img src="/brand/sun.svg" alt=""/></div><div><strong>Positively Made piece</strong><span>Ready for checkout</span></div></div><button className="checkout-btn">Checkout <ArrowRight size={14}/></button></>}</aside></div>}
  </div>;
}

function StoreNav({goHome,openCollection,setStorePage,cartCount,setCartOpen}:{goHome:()=>void;openCollection:(n:string)=>void;setStorePage:(p:StorePage)=>void;cartCount:number;setCartOpen:(v:boolean)=>void}){
  const [shopOpen,setShopOpen] = useState(false);
  return <>
    <header className="luxe-nav">
      <nav className="nav-links"><button onMouseEnter={()=>setShopOpen(true)} onClick={()=>setShopOpen(v=>!v)}>Shop</button><button onClick={()=>openCollection('Books + Stories')}>Books</button><button onClick={()=>setStorePage('custom')}>Custom</button></nav>
      <button className="nav-logo" onClick={goHome}><BrandLockup /></button>
      <div className="nav-actions"><button onClick={()=>setStorePage('story')}>Our Story</button><Search size={17}/><button className="bag-button" onClick={()=>setCartOpen(true)}><ShoppingBag size={17}/>{cartCount>0&&<span>{cartCount}</span>}</button></div>
    </header>
    {shopOpen && <div className="mega-menu" onMouseLeave={()=>setShopOpen(false)}><div><p className="eyebrow">SHOP THE WORLD</p><h3>Better days,<br/>by collection.</h3></div><div className="mega-links">{['Home','Kitchen','Apparel','Cozy Nights','Campfire','Books + Stories'].map((c,i)=><button key={c} onClick={()=>{openCollection(c);setShopOpen(false)}}><span>0{i+1}</span>{c}<ArrowRight size={14}/></button>)}</div><div className="mega-art"><img src="/brand/pm-monogram.svg" alt="PM"/><span>POSITIVELY MADE</span></div></div>}
  </>;
}

function HomePage({products,openCollection,openProduct,setStorePage}:{products:CatalogProduct[];openCollection:(n:string)=>void;openProduct:(p:CatalogProduct)=>void;setStorePage:(p:StorePage)=>void}){
  return <>
    <section className="luxe-hero" id="top">
      <div className="luxe-hero-copy"><p className="eyebrow">THE POSITIVELY MADE EDIT</p><h1>Better days<br/>are <em>made.</em></h1><p>Thoughtful goods for home, family, gifting, and the everyday rituals worth making a little better.</p><button className="luxe-link" onClick={()=>document.getElementById('new-arrivals')?.scrollIntoView({behavior:'smooth'})}>Shop the edit <ArrowRight size={15}/></button></div>
      <div className="luxe-hero-art"><div className="sun-orbit"><img src="/brand/sun.svg" alt=""/></div><div className="hero-object hero-object-one"><span>BETTER</span><strong>DAYS</strong><small>ARE MADE.</small></div><div className="hero-object hero-object-two"><img src="/brand/pm-monogram.svg" alt="PM"/></div><p>POSITIVELY MADE / 2026</p></div>
    </section>

    <section className="shop-intro"><p className="eyebrow">NEW ARRIVALS</p><h2>Small things. Better days.</h2><button onClick={()=>openCollection('Home')}>View the edit <ArrowRight size={14}/></button></section>
    <section className="product-section" id="new-arrivals"><div className="product-grid">{products.slice(0,8).map((p,i)=><ProductCard p={p} i={i} key={p.id} openProduct={openProduct}/>)}</div></section>

    <section className="collection-editorial" id="collections">
      <CollectionTile num="01" name="Home" cls="home-image image-edit" openCollection={openCollection}/>
      <CollectionTile num="02" name="Books + Stories" cls="books-block" openCollection={openCollection}/>
      <CollectionTile num="03" name="Kitchen" cls="kitchen-image image-edit" openCollection={openCollection}/>
      <CollectionTile num="04" name="Cozy Nights" cls="cozy-block" openCollection={openCollection}/>
      <CollectionTile num="05" name="Campfire" cls="campfire-image image-edit" openCollection={openCollection}/>
      <CollectionTile num="06" name="Apparel" cls="apparel-block" openCollection={openCollection}/>
    </section>

    <section className="brand-pause" id="story"><img src="/brand/sun.svg" alt=""/><p>OUR WHY</p><h2>Made from love.<br/>Built for real life.</h2><div><p>Positively Made began with a desire to make everyday life better for the people who matter most — Ryan, Knyx, and Lucy.</p><p>The idea celebrates the many ways families are made, and the belief that something meaningful can come from every different path.</p></div><button className="story-link" onClick={()=>setStorePage('story')}>Read our story <ArrowRight size={14}/></button><small>CREATIVE INFLUENCE + TECHNICAL DIRECTION BY AVA GRACE.</small></section>

    <section className="custom-luxe" id="custom"><div><p className="eyebrow light">CUSTOM / MADE SIMPLE</p><h2>Your idea.<br/><em>Positively made.</em></h2><p>Schools, teams, events, businesses, and one-of-one gifts — with a clear proof-to-production process behind every order.</p><button onClick={()=>setStorePage('custom')}>Start a custom order <ArrowRight size={15}/></button></div><div className="custom-mark"><img src="/brand/pm-monogram.svg" alt="PM"/></div></section>

    <section className="newsletter"><p className="eyebrow">FROM THE STUDIO</p><h2>A little more good,<br/>straight to your inbox.</h2><div><input placeholder="Email address"/><button>Join <ArrowRight size={14}/></button></div></section>
  </>;
}

function ProductCard({p,i,openProduct}:{p:CatalogProduct;i:number;openProduct:(p:CatalogProduct)=>void}){
  return <article className="lux-product" onClick={()=>openProduct(p)}><div className={`lux-product-art tone-${p.tone}`}><div className="product-mark"><img src={i%2===0?'/brand/pm-monogram.svg':'/brand/sun.svg'} alt=""/></div><span className="product-kicker">POSITIVELY MADE</span><button onClick={e=>{e.stopPropagation();openProduct(p)}}>Quick view</button></div><div className="lux-product-meta"><small>{p.category.replace('Shop / ','')}</small><h3>{p.name}</h3><span>${Number(p.price).toFixed(2)}</span></div></article>;
}

function CollectionTile({num,name,cls,openCollection}:{num:string;name:string;cls:string;openCollection:(n:string)=>void}){
  const d=collectionData[name];
  return <article className={`collection-feature ${cls}`} onClick={()=>openCollection(name)}><div className="collection-number">{num}</div><div><p className="eyebrow">{d.eyebrow}</p><h2>{d.title}</h2><p>{d.sub}</p><button>Explore <ArrowRight size={14}/></button></div><img className="collection-accent" src={name==='Books + Stories'?'/brand/sun.svg':'/brand/pm-monogram.svg'} alt=""/></article>;
}

function CollectionPage({name,products,openProduct,goHome}:{name:string;products:CatalogProduct[];openProduct:(p:CatalogProduct)=>void;goHome:()=>void}){
  const d=collectionData[name] || collectionData.Home;
  const filtered=products.filter(p=>p.collection===name || p.category.replace('Shop / ','')===name);
  const list=filtered.length?filtered:seedProducts.slice(0,4);
  return <main className="collection-page"><section className={`collection-landing ${d.className} ${d.className.includes('image')?'image-landing':''}`}><button className="back-home" onClick={goHome}><ArrowLeft size={14}/> Home</button><div className="collection-landing-copy"><p className="eyebrow">{d.eyebrow}</p><h1>{d.title}</h1><p>{d.sub}</p><button onClick={()=>document.getElementById('collection-shop')?.scrollIntoView({behavior:'smooth'})}>Shop the collection <ArrowRight size={14}/></button></div><div className="landing-index">POSITIVELY MADE / {name.toUpperCase()}</div></section><section className="collection-quote"><p>{d.quote}</p></section><section className="collection-shop" id="collection-shop"><div className="collection-shop-head"><div><p className="eyebrow">THE COLLECTION</p><h2>{name}</h2></div><span>{list.length} pieces</span></div><div className="product-grid">{list.map((p,i)=><ProductCard key={p.id} p={p} i={i} openProduct={openProduct}/>)}</div></section><section className="collection-story-strip"><div><span>01</span><p>Thoughtful by design.</p></div><div><span>02</span><p>Made for real life.</p></div><div><span>03</span><p>Connected to the bigger idea.</p></div></section></main>;
}

function ProductPage({product,openCollection,addToCart}:{product:CatalogProduct;openCollection:(n:string)=>void;addToCart:()=>void}){
  const [qty,setQty]=useState(1);
  return <main className="product-page"><section className="product-detail"><div className={`product-detail-art tone-${product.tone}`}><button className="back-product" onClick={()=>openCollection(product.collection)}><ArrowLeft size={14}/> Back to {product.collection}</button><img src="/brand/pm-monogram.svg" alt="PM"/><span>POSITIVELY MADE</span></div><div className="product-detail-info"><p className="eyebrow">{product.collection}</p><h1>{product.name}</h1><div className="product-price">${Number(product.price).toFixed(2)}</div><p className="product-editorial">{product.editorial}</p><p className="product-description">{product.description}</p><div className="qty"><button onClick={()=>setQty(q=>Math.max(1,q-1))}><Minus size={13}/></button><span>{qty}</span><button onClick={()=>setQty(q=>q+1)}><Plus size={13}/></button></div><button className="add-cart" onClick={addToCart}>Add to bag <ShoppingBag size={15}/></button><div className="detail-notes"><p><span>01</span> Thoughtfully designed</p><p><span>02</span> Gift-ready presentation</p><p><span>03</span> Part of the Positively Made world</p></div></div></section><section className="product-manifesto"><img src="/brand/sun.svg" alt=""/><p>BETTER DAYS ARE MADE.</p></section></main>;
}

function StoryPage({goHome}:{goHome:()=>void}){
  return <main className="story-page"><section className="story-hero"><button onClick={goHome}><ArrowLeft size={14}/> Home</button><p className="eyebrow">OUR STORY</p><h1>Made from love.<br/>Built for real life.</h1><img src="/brand/sun.svg" alt=""/></section><section className="story-chapters"><article><span>01</span><h2>It started small.</h2><p>Positively Made began with a desire to make everyday life better for Ryan, Knyx, and Lucy — through the things we use, give, read, wear, and keep around us.</p></article><article><span>02</span><h2>Then the idea got bigger.</h2><p>Better days are made in routines, around tables, inside homes, in classrooms, under the stars, and in all the different ways a family can become a family.</p></article><article><span>03</span><h2>The point is simple.</h2><p>Thoughtful things can carry meaning without being overly precious. Warm, useful, encouraging, and made to live with.</p></article></section></main>;
}

function CustomPage({goHome}:{goHome:()=>void}){
  const [step,setStep]=useState(1);
  return <main className="custom-page"><section className="custom-landing"><button onClick={goHome}><ArrowLeft size={14}/> Home</button><p className="eyebrow light">CUSTOM / MADE SIMPLE</p><h1>Your idea.<br/><em>Positively made.</em></h1><p>Tell us what you have in mind. We’ll guide you from idea to proof to finished piece.</p></section><section className="custom-flow"><div className="custom-progress">{['The idea','The details','The plan'].map((x,i)=><div className={step>=i+1?'active':''} key={x}><span>0{i+1}</span><b>{x}</b></div>)}</div><div className="custom-form-card">{step===1&&<><p className="eyebrow">STEP 01</p><h2>What are we making?</h2><div className="choice-grid">{['School or team','Event','Business','Gift','Something else'].map(x=><button key={x} onClick={()=>setStep(2)}>{x}<ArrowRight size={14}/></button>)}</div></>}{step===2&&<><p className="eyebrow">STEP 02</p><h2>Give us the basics.</h2><div className="form-grid"><label>Project name<input placeholder="Spring fundraiser sweatshirts"/></label><label>Target date<input type="date"/></label><label className="wide">Tell us about it<textarea placeholder="What do you want made, for how many people, and what should it feel like?"/></label></div><button className="flow-next" onClick={()=>setStep(3)}>Continue <ArrowRight size={14}/></button></>}{step===3&&<><p className="eyebrow">STEP 03</p><h2>That’s enough to get started.</h2><p className="custom-complete">The real system would create a custom request in the Business OS, assign the next step, and keep the customer-facing status connected from here.</p><button className="flow-next" onClick={goHome}>Finish demo <Check size={14}/></button></>}</div></section></main>;
}

function BusinessOS({ page, setPage, onViewSite, onPublish }:{ page:OsPage; setPage:(p:OsPage)=>void; onViewSite:()=>void; onPublish:(p:Product)=>void }) {
  const nav: [OsPage, any][] = [['Dashboard',LayoutDashboard],['Product Studio',Sparkles],['Orders',Package],['Custom Requests',Sparkles],['Customers',Users],['Invoices',FileText],['Reports',LayoutDashboard]];
  return <div className="os-demo-simple"><aside><div className="os-brand-simple"><img src="/brand/pm-monogram.svg" alt="PM"/><div><strong>POSITIVELY MADE</strong><span>BUSINESS OS</span></div></div><nav>{nav.map(([label,Icon]) => <button key={label} className={page===label?'active':''} onClick={()=>setPage(label)}><Icon size={15}/><span>{label}</span></button>)}</nav><button className="back-site" onClick={onViewSite}>View customer website <ArrowRight size={14}/></button></aside><main><header><div><small>OWNER WORKSPACE</small><h1>{page}</h1></div><div className="owner-pill">SM</div></header>{page==='Dashboard' ? <Dashboard setPage={setPage}/> : page==='Product Studio' ? <ProductStudio onPublish={onPublish}/> : <SimpleWorkspace page={page}/>}</main></div>;
}

function Dashboard({setPage}:{setPage:(p:OsPage)=>void}) {
  return <><section className="os-welcome"><div><small>TODAY</small><h2>Good morning, Stephanie.</h2><p>Everything important, in one place.</p></div><img src="/brand/sun.svg" alt=""/></section><section className="os-metrics"><article><strong>12</strong><span>Open orders</span></article><article><strong>4</strong><span>Proofs waiting</span></article><article><strong>7</strong><span>In production</span></article><article><strong>$4,280</strong><span>This month</span></article></section><section className="os-lower"><div><small>ACTIVE WORK</small><h3>Orders</h3><p>Lincoln PTO — Proof Needed</p><p>Megan R. — In Production</p><p>Bayside Soccer — Awaiting Approval</p></div><div><small>TRY IT</small><h3>Test the system</h3><p>Add a product, publish it, and watch it appear inside New Arrivals on the luxury storefront.</p><button className="demo-launch" onClick={()=>setPage('Product Studio')}>Start guided test <ArrowRight size={14}/></button></div></section></>;
}

function ProductStudio({onPublish}:{onPublish:(p:Product)=>void}){
  const [step,setStep] = useState(1);
  const [template,setTemplate] = useState(templates[2]);
  const [name,setName] = useState('Better Days Ceramic Mug');
  const [price,setPrice] = useState('28');
  const [description,setDescription] = useState('A thoughtful everyday piece made to bring a little more good into the routine.');
  const steps = ['Choose template','Product details','Placement','Review'];
  const publish = () => onPublish({ id:`demo-${Date.now()}`, name, price, description, template:template.name, category:template.category, publishedAt:new Date().toISOString() });
  return <div className="studio-shell"><div className="test-banner"><Sparkles size={15}/><div><strong>DEMO MODE</strong><span>Publishing here updates this prototype website only — perfect for testing the workflow.</span></div></div><div className="studio-head"><div><p>GUIDED WORKFLOW</p><h2>Add a new product</h2><span>The system asks the questions, then places the product in the right part of the website automatically.</span></div><button onClick={()=>setStep(1)}>Start over</button></div><div className="step-track">{steps.map((s,i)=><div key={s} className={step>=i+1?'on':''}><span>{step>i+1?<Check size={12}/>:i+1}</span><b>{s}</b></div>)}</div><div className="studio-card">{step===1 && <><p className="studio-label">STEP 1 / WHAT ARE YOU ADDING?</p><h3>Choose a product template</h3><div className="template-grid">{templates.map(t=><button key={t.name} className={template.name===t.name?'selected':''} onClick={()=>setTemplate(t)}><strong>{t.name}</strong><span>{t.note}</span><small>{t.category}</small></button>)}</div></>}{step===2 && <><p className="studio-label">STEP 2 / PRODUCT DETAILS</p><h3>Fill in the basics</h3><div className="form-grid"><label>Product name<input value={name} onChange={e=>setName(e.target.value)}/></label><label>Price<input value={price} onChange={e=>setPrice(e.target.value)}/></label><label className="wide">Description<textarea value={description} onChange={e=>setDescription(e.target.value)}/></label></div></>}{step===3 && <><p className="studio-label">STEP 3 / WEBSITE PLACEMENT</p><h3>We already know where it belongs.</h3><div className="route-card"><span>AUTOMATIC ROUTING</span><strong>{template.category}</strong><p>Because you chose the <b>{template.name}</b> template, this product will appear in New Arrivals and its correct collection.</p><div><Check size={15}/> Product page created</div><div><Check size={15}/> Category connected</div><div><Check size={15}/> Inventory fields matched</div></div></>}{step===4 && <><p className="studio-label">STEP 4 / REVIEW</p><h3>Preview before publishing</h3><div className="review-grid"><div className="product-preview"><div className="preview-art"><img src="/brand/sun.svg" alt=""/></div><small>{template.category}</small><strong>{name}</strong><span>${Number(price || 0).toFixed(2)}</span></div><div className="review-list"><p><span>Template</span><b>{template.name}</b></p><p><span>Website category</span><b>{template.category}</b></p><p><span>Status</span><b>Ready</b></p><p><span>Next step</span><b>Publish to demo website</b></p></div></div></>}<div className="studio-actions"><button disabled={step===1} onClick={()=>setStep(s=>Math.max(1,s-1))}>Back</button>{step<4?<button className="primary" onClick={()=>setStep(s=>Math.min(4,s+1))}>Continue <ChevronRight size={14}/></button>:<button className="primary" onClick={publish}>Publish to website <ArrowRight size={14}/></button>}</div></div></div>;
}

function SimpleWorkspace({page}:{page:OsPage}){
  const text:Record<string,string> = {Orders:'Track every order, due date, payment, and production step.', 'Custom Requests':'Move a custom request from idea to proof to finished product.', Customers:'Keep customer history, notes, and repeat orders together.', Invoices:'See what is sent, paid, and overdue.', Reports:'See sales, best sellers, and what is growing.'};
  return <div className="simple-page"><div className="simple-intro"><p className="eyebrow">ONE PLACE. LESS TO REMEMBER.</p><h2>{text[page]}</h2></div><div className="panel simple-panel"><div className="panel-head"><div><p className="os-label">PREVIEW</p><h3>{page}</h3></div><button className="button-small">+ Add new</button></div><div className="placeholder-grid"><article><strong>Simple</strong><span>Only the information she actually needs.</span></article><article><strong>Connected</strong><span>Changes flow to the right customer-facing area.</span></article><article><strong>Repeatable</strong><span>Templates keep the process the same every time.</span></article></div></div></div>;
}
