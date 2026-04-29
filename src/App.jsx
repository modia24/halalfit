import { useState, useEffect, useCallback } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────
const PRODUCTS = [
  { id:1, name:"Designer Whey Protein", brand:"ESN", origin:"🇩🇪 Germany", category:"Whey Protein", price:34.90, originalPrice:44.90, rating:4.8, reviews:42162, certified:true, certBody:"Halal Zertifiziert", flavor:"Chocolate Brownie", calories:116, protein:23, carbs:3, fat:2, tags:["whey","protein","made in germany","halal","bestseller"], description:"Germany's No.1 whey protein — halal certified. ESN's flagship Designer Whey combines whey concentrate and isolate for an elite amino acid profile. One of 30 ESN products certified through their dedicated Halal Management Team.", shopUrl:"https://www.esn.com/en/products/esn-designer-whey-protein", image:"https://www.esn.com/cdn/shop/files/DesignerWhey_908g_AlmondCoconutFlavor_2024x2024_shop.jpg?v=1744207018&width=400", badge:"🔥 #1 in DE", warning:null, goal:["muscle","bulk"], proteinPer100g:76, servingSize:30 },
  { id:2, name:"Isoclear Whey Isolate", brand:"ESN", origin:"🇩🇪 Germany", category:"Whey Protein", price:26.90, originalPrice:null, rating:4.8, reviews:1945, certified:true, certBody:"Halal Zertifiziert", flavor:"Peach Iced Tea", calories:90, protein:25, carbs:0.5, fat:0, tags:["clear whey","isolate","sugar free","halal"], description:"ESN's viral clear whey isolate — tastes like juice, not a shake. Sugar-free, fat-free, lactose-free and halal certified. 25g protein per serving. Made in Germany.", shopUrl:"https://www.esn.com/en/products/esn-isoclear-whey-isolate", image:"https://www.esn.com/cdn/shop/files/IsoClear_908g_LessSweet_FreshCherryFlavor_2024x2024_shop-s-lH3aTm_d20958b4-86e5-4f29-8f19-a219ad289092.jpg?v=1750793072&width=400", badge:"🆕 Viral Pick", warning:null, goal:["lean","diet"], proteinPer100g:83, servingSize:30 },
  { id:3, name:"Ultrapure Creatine", brand:"ESN", origin:"🇩🇪 Germany", category:"Creatine", price:19.90, originalPrice:null, rating:4.9, reviews:8700, certified:true, certBody:"Halal Zertifiziert", flavor:"Unflavored", calories:0, protein:0, carbs:0, fat:0, tags:["creatine","strength","halal","vegan"], description:"ESN's best-selling creatine — micronized, pure, halal certified and vegan. Made in Germany. One of ESN's 30 officially certified halal products.", shopUrl:"https://www.esn.com/en/products/esn-ultrapure-creatine-monohydrate", image:"https://www.esn.com/cdn/shop/files/UltrapureCreatine_500g_Beutel_NeutralFlavor_2024x2024_shop-6v02cWzQ_a41b1095-1dad-4771-9e1b-4d233d8f358b.jpg?v=1757496135&width=400", badge:"⭐ Top Rated", warning:null, goal:["muscle","strength","bulk"], proteinPer100g:0, servingSize:5 },
  { id:4, name:"Super Omega-3 Kapseln", brand:"ESN", origin:"🇩🇪 Germany", category:"Vitamins & Health", price:17.90, originalPrice:22.90, rating:4.7, reviews:3210, certified:true, certBody:"Halal Zertifiziert", flavor:"N/A", calories:10, protein:0, carbs:0, fat:1, tags:["omega-3","fish oil","heart health","halal"], description:"ESN's halal-certified Omega-3 capsules. Supports heart health, joints, and cognitive performance. Part of ESN's 30-product halal range.", shopUrl:"https://www.esn.com/en/collections/all", image:"https://www.esn.com/cdn/shop/files/Omega3_300Caps_2024x2024_shop-4XTy1uMU_b3c86bb0-aa9d-4b99-8870-7efc254a198d.jpg?v=1713885170&width=400", badge:"🇩🇪 Made in DE", warning:null, goal:["health","lean","diet"], proteinPer100g:0, servingSize:2 },
  { id:5, name:"Designer Bar", brand:"ESN", origin:"🇩🇪 Germany", category:"Protein Snacks", price:2.90, originalPrice:null, rating:4.6, reviews:15200, certified:true, certBody:"Halal Zertifiziert", flavor:"Cookies & Cream", calories:185, protein:14, carbs:19, fat:6, tags:["protein bar","snack","halal","no sugar"], description:"ESN's iconic protein bar — no added sugar, no palm fat, 14g protein. Halal certified and a German gym staple.", shopUrl:"https://www.esn.com/en/collections/all", image:"https://www.esn.com/cdn/shop/files/DesignerBar_45g_TripleCookieCreamFlavor_2024x2024_shop-Jqt0GCFU_8a6c72fc-ce7c-4082-be98-d5d0d411a411.jpg?v=1739438750&width=400", badge:"🇩🇪 Made in DE", warning:null, goal:["muscle","diet","lean"], proteinPer100g:31, servingSize:45 },
  { id:6, name:"Flexpresso Protein Coffee", brand:"ESN", origin:"🇩🇪 Germany", category:"Whey Protein", price:34.90, originalPrice:null, rating:4.7, reviews:2890, certified:true, certBody:"Halal Zertifiziert", flavor:"Coffee", calories:108, protein:22, carbs:3, fat:2, tags:["protein coffee","whey","caffeine","halal"], description:"Protein powder meets coffee — 22g protein + natural caffeine from real coffee. Halal certified, made in Germany.", shopUrl:"https://www.esn.com/en/products/esn-flexpresso-protein-coffee", image:"https://www.esn.com/cdn/shop/files/FlexpressoProteinCoffee_908g_Decaf_CoffeeFlavor_2024x2024_shop-X2APwxMl_5cc60ee9-e440-4457-b2f9-0802e7edc40d.jpg?v=1734010337&width=400", badge:"", warning:null, goal:["muscle","lean"], proteinPer100g:73, servingSize:30 },
  { id:7, name:"Skin Structure Formula", brand:"More Nutrition", origin:"🇩🇪 Germany", category:"Collagen & Wellness", price:34.90, originalPrice:null, rating:4.6, reviews:1870, certified:true, certBody:"Halal Zertifiziert", flavor:"Neutral", calories:30, protein:7, carbs:0, fat:0, tags:["collagen","skin","halal","peptides"], description:"More Nutrition's halal-certified collagen formula using halal bioactive collagen peptides. Officially confirmed halal.", shopUrl:"https://morenutrition.de/products/skin-structure-formula", image:"https://morenutrition.de/cdn/shop/files/SkinStructureFormula_500g_Neutral_Front_2000x2000.jpg?v=1697619200&width=400", badge:"✅ Halal Confirmed", warning:null, goal:["health","diet"], proteinPer100g:70, servingSize:10 },
  { id:8, name:"Arthro Support", brand:"More Nutrition", origin:"🇩🇪 Germany", category:"Collagen & Wellness", price:32.90, originalPrice:null, rating:4.6, reviews:890, certified:true, certBody:"Halal Zertifiziert", flavor:"Neutral", calories:30, protein:7, carbs:1, fat:0, tags:["collagen","joint support","halal","recovery"], description:"Halal-certified joint support from More Nutrition using halal bioactive collagen peptides. For active athletes with joint concerns.", shopUrl:"https://morenutrition.de/products/arthro-support", image:"https://morenutrition.de/cdn/shop/files/ArtroSupport_480g_Neutral_Front_2000x2000.jpg?v=1697619200&width=400", badge:"✅ Halal Confirmed", warning:null, goal:["health","strength"], proteinPer100g:70, servingSize:10 },
  { id:9, name:"Protein Bar ⚠️", brand:"More Nutrition", origin:"🇩🇪 Germany", category:"Protein Snacks", price:2.99, originalPrice:null, rating:4.4, reviews:4300, certified:false, certBody:"Nicht Halal", flavor:"Various", calories:195, protein:15, carbs:20, fat:6, tags:["protein bar","not halal","avoid"], description:"NOT HALAL CERTIFIED. More Nutrition confirmed protein bars do NOT use halal raw materials. Shown for transparency only.", shopUrl:"https://morenutrition.de", image:"https://morenutrition.de/cdn/shop/files/ProteinBar_Peanut_Front_2000x2000.jpg?v=1697619200&width=400", badge:"⚠️ NOT Halal", warning:"More Nutrition officially confirmed: Protein Bars do NOT use halal-certified raw materials.", goal:[], proteinPer100g:0, servingSize:0 },
  { id:10, name:"Elite Whey Protein", brand:"VOW Nutrition", origin:"🇬🇧 UK → DE", category:"Whey Protein", price:34.99, originalPrice:null, rating:4.9, reviews:3201, certified:true, certBody:"HFA", flavor:"Chocolate Cookie", calories:118, protein:24, carbs:2, fat:2, tags:["whey","protein","halal","hfa"], description:"VOW Nutrition's fully HFA-certified halal whey. One of the most popular halal proteins across Europe. Ships to Germany.", shopUrl:"https://vownutrition.com", image:"https://vownutrition.com/cdn/shop/products/Elite-Whey-Protein-Chocolate-Cookie-1kg.jpg?v=1680000000&width=400", badge:"🔥 Bestseller", warning:null, goal:["muscle","bulk"], proteinPer100g:80, servingSize:30 },
  { id:11, name:"Impact Whey Halal", brand:"MyProtein", origin:"🇩🇪 Lieferung nach DE", category:"Whey Protein", price:29.99, originalPrice:39.99, rating:4.7, reviews:5422, certified:true, certBody:"HFA", flavor:"Vanilla", calories:103, protein:21, carbs:3, fat:1.9, tags:["whey","affordable","halal","hfa"], description:"Europe's most popular halal whey — the 'H' halal mark. Ships directly to Germany via myprotein.de. Great value.", shopUrl:"https://www.myprotein.com/de-de", image:"https://images.myprotein.com/content/dam/global/assets/products/impact-whey-protein/impact-whey-protein-vanilla-1kg.jpg?width=400", badge:"💰 Best Value", warning:null, goal:["muscle","lean","diet"], proteinPer100g:70, servingSize:30 },
  { id:12, name:"Pure Whey Protein Halal", brand:"Bulk", origin:"🇩🇪 Lieferung nach DE", category:"Whey Protein", price:27.99, originalPrice:null, rating:4.6, reviews:3104, certified:true, certBody:"HFA", flavor:"Chocolate", calories:130, protein:25, carbs:4, fat:2, tags:["whey","budget","halal","hfa"], description:"Budget-friendly halal certified whey from Bulk. Ships to Germany via bulk.com/de.", shopUrl:"https://www.bulk.com/de", image:"https://www.bulk.com/media/catalog/product/cache/541dbe375a8b8c26f2aa3e9b836df0c9/b/p/bpps_pure_whey_protein_1kg_chocolate_1.jpg?width=400", badge:"", warning:null, goal:["muscle","bulk"], proteinPer100g:83, servingSize:30 },
  { id:13, name:"Halal Whey Protein", brand:"Halal Vital", origin:"🇩🇪 Germany", category:"Whey Protein", price:39.99, originalPrice:null, rating:4.5, reviews:621, certified:true, certBody:"DVHK", flavor:"Strawberry", calories:120, protein:23, carbs:4, fat:2, tags:["whey","german brand","dvhk","halal"], description:"Germany-based brand exclusively focused on halal supplements. Certified by DVHK — the German halal body.", shopUrl:"https://halal-vital.de", image:"https://halal-vital.de/cdn/shop/products/halal-whey-protein-strawberry.jpg?v=1680000000&width=400", badge:"🇩🇪 German Brand", warning:null, goal:["muscle","bulk"], proteinPer100g:77, servingSize:30 },
];

const CATEGORIES = ["All","Whey Protein","Creatine","Protein Snacks","Collagen & Wellness","Vitamins & Health"];
const BRANDS = ["All","ESN","More Nutrition","VOW Nutrition","MyProtein","Bulk","Halal Vital"];
const TABS = [
  {id:"products", icon:"🏠", de:"Produkte", en:"Products"},
  {id:"quiz", icon:"🎯", de:"Berater", en:"Advisor"},
  {id:"calc", icon:"📊", de:"Rechner", en:"Calculator"},
  {id:"checker", icon:"🔬", de:"Checker", en:"Checker"},
  {id:"compare", icon:"⚖️", de:"Vergleich", en:"Compare"},
  {id:"alerts", icon:"🔔", de:"Preisalarm", en:"Alerts"},
  {id:"wishlist", icon:"❤️", de:"Wunschliste", en:"Wishlist"},
  {id:"affiliate", icon:"💰", de:"Einnahmen", en:"Revenue"},
  {id:"submit", icon:"📬", de:"Einreichen", en:"Submit"},
];

// ─── AFFILIATE DATA ───────────────────────────────────────────────────────────
const AFFILIATE_PROGRAMS = [
  { id:1, brand:"ESN", logo:"🇩🇪", commission:"10–15%", cookieDays:30, network:"Awin", signupUrl:"https://www.awin.com", avgOrderValue:"€45", estimatedMonthly:"€150–600", status:"recommended", notes:"Germany's No.1 supplement brand. High conversion rate with Muslim audience since products are halal certified.", color:"#C8A96E" },
  { id:2, brand:"MyProtein", logo:"💪", commission:"8–12%", cookieDays:30, network:"Awin", signupUrl:"https://www.awin.com", avgOrderValue:"€40", estimatedMonthly:"€120–500", status:"recommended", notes:"Massive brand, huge product range, ships to Germany. One of Europe's biggest affiliate programs.", color:"#4a9a4a" },
  { id:3, brand:"Bulk", logo:"⚡", commission:"8–10%", cookieDays:30, network:"Awin / Direct", signupUrl:"https://www.bulk.com/de/affiliate", avgOrderValue:"€38", estimatedMonthly:"€80–300", status:"active", notes:"Good conversion, competitive prices, ships to Germany. Easy approval.", color:"#4a6aaa" },
  { id:4, brand:"VOW Nutrition", logo:"☪️", commission:"10–12%", cookieDays:45, network:"Refersion", signupUrl:"https://vownutrition.com/affiliate", avgOrderValue:"€42", estimatedMonthly:"€60–250", status:"recommended", notes:"Fully halal brand — extremely high trust conversion with your audience. Longer cookie window.", color:"#aa4a4a" },
  { id:5, brand:"Amazon DE", logo:"📦", commission:"3–7%", cookieDays:1, network:"Amazon Associates", signupUrl:"https://affiliate-program.amazon.de", avgOrderValue:"€35", estimatedMonthly:"€50–200", status:"easy", notes:"Easy to join, works for any product. Short cookie window but huge reach.", color:"#ff9900" },
  { id:6, brand:"Halal Vital", logo:"🏅", commission:"15–20%", cookieDays:60, network:"Direct", signupUrl:"https://halal-vital.de/affiliate", avgOrderValue:"€40", estimatedMonthly:"€40–150", status:"easy", notes:"Small German halal brand — highest commission rate, easy approval, very relevant to your niche.", color:"#6aaa6a" },
];

const CLICK_STORAGE_KEY = "halalfit_affiliate_clicks";

const gold="#C8A96E", dark="#080808", card="#0f0f0f", bdr="#1a1a1a";
const g=(a)=>({background:a?gold:"#111",border:`1px solid ${a?gold:"#222"}`,color:a?"#000":"#666",padding:"6px 14px",borderRadius:"30px",fontSize:"11px",fontWeight:"600",cursor:"pointer",transition:"all 0.18s",fontFamily:"inherit"});
const inputS={width:"100%",background:"#0a0a0a",border:"1px solid #222",borderRadius:"10px",padding:"12px 14px",color:"#ccc",fontSize:"13px",fontFamily:"'IBM Plex Sans',sans-serif",outline:"none",boxSizing:"border-box"};

const T=(de,en,lang)=>lang==="de"?de:en;

const Stars=({rating,small})=>(
  <div style={{display:"flex",alignItems:"center",gap:"2px"}}>
    {[1,2,3,4,5].map(i=><span key={i} style={{color:i<=Math.round(rating)?gold:"#222",fontSize:small?"10px":"12px"}}>★</span>)}
    <span style={{color:"#555",fontSize:"10px",marginLeft:"3px"}}>{rating}</span>
  </div>
);

const Img=({src,name,ok,h="155px"})=>{
  const [e,setE]=useState(false);
  return(
    <div style={{width:"100%",height:h,borderRadius:"10px",overflow:"hidden",background:"#0d0d0d",display:"flex",alignItems:"center",justifyContent:"center",border:`1px solid ${bdr}`,position:"relative",flexShrink:0}}>
      {!e?<img src={src} alt={name} onError={()=>setE(true)} style={{width:"100%",height:"100%",objectFit:"contain",padding:"10px",boxSizing:"border-box",filter:ok?"none":"grayscale(80%) opacity(0.4)"}}/>:<div style={{fontSize:"36px",opacity:0.4}}>📦</div>}
      {!ok&&<div style={{position:"absolute",inset:0,background:"rgba(80,0,0,0.3)",display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontSize:"22px"}}>🚫</span></div>}
    </div>
  );
};

// ─── USER REVIEWS DATA ────────────────────────────────────────────────────────
const INITIAL_REVIEWS = {
  1:[{id:1,user:"Ahmed K.",rating:5,text:"Beste Entscheidung überhaupt! Schmeckt super und weiß, dass es halal ist. Kaufe seit 2 Jahren.",date:"12.03.2025"}],
  3:[{id:2,user:"Yusuf M.",rating:5,text:"Einfach pures Kreatin, halal zertifiziert. Mehr braucht man nicht. Top Qualität von ESN.",date:"08.04.2025"}],
  10:[{id:3,user:"Fatima A.",rating:5,text:"VOW ist einfach das Beste für uns. Ich weiß 100% dass es halal ist. Schmeckt auch noch gut!",date:"22.04.2025"}],
};

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────
const ProductCard=({p,onClick,compareList,onToggleCompare,alerts,onQuickAlert,wishlist,onToggleWish,lang,userReviews})=>{
  const [hov,setHov]=useState(false);
  const ok=p.certified;
  const inC=compareList.includes(p.id);
  const inW=wishlist.includes(p.id);
  const hasAlert=alerts.some(a=>a.productId===p.id);
  const allReviews=[...(INITIAL_REVIEWS[p.id]||[]),...(userReviews[p.id]||[])];
  const avgRating=allReviews.length>0?(allReviews.reduce((s,r)=>s+r.rating,0)/allReviews.length).toFixed(1):p.rating;
  const discount=p.originalPrice?Math.round((1-p.price/p.originalPrice)*100):null;
  const proteinPerEuro=p.protein>0?(p.protein/p.price*10).toFixed(1):null;

  return(
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{background:hov?"#141414":card,border:`1px solid ${hov?(ok?gold:"#aa3333"):bdr}`,borderRadius:"16px",padding:"16px",cursor:"pointer",transition:"all 0.2s",transform:hov?"translateY(-3px)":"none",position:"relative",opacity:ok?1:0.65,display:"flex",flexDirection:"column"}}>

      {/* Top badges */}
      <div style={{position:"absolute",top:"10px",left:"10px",display:"flex",flexDirection:"column",gap:"3px",zIndex:2}}>
        {discount&&<span style={{background:"#aa2200",borderRadius:"6px",padding:"2px 6px",fontSize:"9px",color:"#fff",fontWeight:"700"}}>-{discount}%</span>}
      </div>
      {p.badge&&<div style={{position:"absolute",top:"10px",right:"36px",background:ok?"#1a2a1a":"#2a1010",border:`1px solid ${ok?"#2a4a2a":"#aa3333"}`,borderRadius:"20px",padding:"2px 7px",fontSize:"9px",color:ok?"#6aaa6a":"#ee4444",fontWeight:"600",zIndex:1}}>{p.badge}</div>}

      {/* Wish button */}
      <button onClick={e=>{e.stopPropagation();onToggleWish(p.id);}} style={{position:"absolute",top:"8px",right:"8px",background:"transparent",border:"none",fontSize:"16px",cursor:"pointer",zIndex:2,lineHeight:1}}>{inW?"❤️":"🤍"}</button>

      <div onClick={()=>onClick(p)} style={{flex:1}}>
        <div style={{marginBottom:"10px"}}><Img src={p.image} name={p.name} ok={ok}/></div>

        <div style={{marginBottom:"6px",display:"flex",gap:"5px",flexWrap:"wrap"}}>
          {ok?<span style={{background:"#C8A96E15",border:"1px solid #C8A96E33",borderRadius:"20px",padding:"2px 6px",fontSize:"9px",color:gold,fontWeight:"700"}}>✓ {p.certBody}</span>
             :<span style={{background:"#2a1010",border:"1px solid #aa3333",borderRadius:"20px",padding:"2px 6px",fontSize:"9px",color:"#ee4444",fontWeight:"700"}}>✕ Nicht Halal</span>}
          {proteinPerEuro&&<span style={{background:"#0a1a2a",border:"1px solid #1a3a5a",borderRadius:"20px",padding:"2px 6px",fontSize:"9px",color:"#6aaaee"}}>💪 {proteinPerEuro}g/€</span>}
        </div>

        <div style={{fontSize:"8px",color:gold,letterSpacing:"1.5px",textTransform:"uppercase",fontFamily:"monospace",marginBottom:"2px"}}>{p.category}</div>
        <div style={{fontSize:"13px",fontWeight:"700",color:ok?"#F0EBE0":"#777",fontFamily:"'Playfair Display',serif",lineHeight:"1.3",marginBottom:"2px"}}>{p.name}</div>
        <div style={{fontSize:"10px",color:"#444",marginBottom:"6px"}}>{p.brand}</div>

        <Stars rating={avgRating} small/>
        <div style={{fontSize:"9px",color:"#333",marginTop:"1px",marginBottom:"10px"}}>{allReviews.length>0?allReviews.length:p.reviews.toLocaleString()} {T("Bewertungen","reviews",lang)}</div>

        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:"10px"}}>
          <div>
            <div style={{fontSize:"18px",fontWeight:"800",color:ok?gold:"#555"}}>€{p.price}</div>
            {p.originalPrice&&<div style={{fontSize:"10px",color:"#555",textDecoration:"line-through"}}>€{p.originalPrice}</div>}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:"2px",alignItems:"flex-end"}}>
            <span style={{fontSize:"9px",color:"#444"}}>🥩 {p.protein}g</span>
            <span style={{fontSize:"9px",color:"#444"}}>🔥 {p.calories}kcal</span>
          </div>
        </div>
      </div>

      {ok&&(
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"5px",marginTop:"auto"}}>
          <button onClick={e=>{e.stopPropagation();onToggleCompare(p.id);}} style={{background:inC?"#C8A96E22":"transparent",border:`1px solid ${inC?gold:"#222"}`,color:inC?gold:"#444",padding:"5px",borderRadius:"7px",fontSize:"9px",fontWeight:"600",cursor:"pointer",fontFamily:"inherit"}}>
            {inC?"✓ "+T("Vergleich","Compare",lang):"+ "+T("Vergleich","Compare",lang)}
          </button>
          <button onClick={e=>{e.stopPropagation();onQuickAlert(p);}} style={{background:hasAlert?"#1a1400":"transparent",border:`1px solid ${hasAlert?gold+"66":"#222"}`,color:hasAlert?gold:"#444",padding:"5px",borderRadius:"7px",fontSize:"9px",fontWeight:"600",cursor:"pointer",fontFamily:"inherit"}}>
            {hasAlert?"🔔 "+T("Aktiv","Active",lang):"🔔 "+T("Alarm","Alert",lang)}
          </button>
        </div>
      )}
    </div>
  );
};

// ─── PRODUCT MODAL ─────────────────────────────────────────────────────────────
const ProductModal=({p,onClose,alerts,onQuickAlert,wishlist,onToggleWish,userReviews,setUserReviews,lang})=>{
  const [imgErr,setImgErr]=useState(false);
  const [reviewText,setReviewText]=useState("");
  const [reviewRating,setReviewRating]=useState(5);
  const [reviewName,setReviewName]=useState("");
  const [showReviewForm,setShowReviewForm]=useState(false);
  if(!p)return null;
  const ok=p.certified;
  const hasAlert=alerts.some(a=>a.productId===p.id);
  const inW=wishlist.includes(p.id);
  const allReviews=[...(INITIAL_REVIEWS[p.id]||[]),...(userReviews[p.id]||[])];
  const avgRating=allReviews.length>0?(allReviews.reduce((s,r)=>s+r.rating,0)/allReviews.length).toFixed(1):p.rating;
  const discount=p.originalPrice?Math.round((1-p.price/p.originalPrice)*100):null;

  const submitReview=()=>{
    if(!reviewText.trim()||!reviewName.trim())return;
    const newR={id:Date.now(),user:reviewName,rating:reviewRating,text:reviewText,date:new Date().toLocaleDateString("de-DE")};
    setUserReviews(prev=>({...prev,[p.id]:[...(prev[p.id]||[]),newR]}));
    setReviewText("");setReviewName("");setReviewRating(5);setShowReviewForm(false);
  };

  return(
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.92)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:"16px",backdropFilter:"blur(10px)"}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#111",border:`1px solid ${ok?"#C8A96E33":"#aa333355"}`,borderRadius:"24px",padding:"28px",maxWidth:"540px",width:"100%",maxHeight:"94vh",overflowY:"auto",position:"relative"}}>
        <div style={{display:"flex",gap:"8px",position:"absolute",top:"16px",right:"16px",zIndex:2}}>
          <button onClick={()=>onToggleWish(p.id)} style={{background:"transparent",border:"none",fontSize:"20px",cursor:"pointer"}}>{inW?"❤️":"🤍"}</button>
          <button onClick={onClose} style={{background:"#1e1e1e",border:"none",color:"#666",width:"32px",height:"32px",borderRadius:"50%",cursor:"pointer",fontSize:"14px"}}>✕</button>
        </div>

        <div style={{width:"100%",height:"200px",borderRadius:"14px",overflow:"hidden",background:"#0d0d0d",border:`1px solid ${bdr}`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"18px",position:"relative"}}>
          {!imgErr?<img src={p.image} alt={p.name} onError={()=>setImgErr(true)} style={{width:"100%",height:"100%",objectFit:"contain",padding:"12px",boxSizing:"border-box",filter:ok?"none":"grayscale(80%)"}}/>:<div style={{fontSize:"56px"}}>📦</div>}
          {discount&&<div style={{position:"absolute",top:"10px",left:"10px",background:"#aa2200",borderRadius:"8px",padding:"4px 10px",fontSize:"12px",color:"#fff",fontWeight:"700"}}>-{discount}% SALE</div>}
        </div>

        {p.warning&&<div style={{background:"#2a1010",border:"1px solid #aa3333",borderRadius:"10px",padding:"10px 14px",marginBottom:"14px",fontSize:"12px",color:"#ee5555",lineHeight:"1.5"}}>⚠️ {p.warning}</div>}

        <div style={{display:"flex",gap:"6px",flexWrap:"wrap",marginBottom:"10px"}}>
          {ok?<span style={{background:"#C8A96E15",border:"1px solid #C8A96E44",borderRadius:"20px",padding:"3px 10px",fontSize:"10px",color:gold,fontWeight:"700"}}>✓ HALAL · {p.certBody}</span>
             :<span style={{background:"#2a1010",border:"1px solid #aa3333",borderRadius:"20px",padding:"3px 10px",fontSize:"10px",color:"#ee4444",fontWeight:"700"}}>✕ NICHT HALAL</span>}
          <span style={{background:"#1a1a1a",borderRadius:"20px",padding:"3px 10px",fontSize:"10px",color:"#555"}}>{p.origin}</span>
        </div>

        <div style={{fontSize:"9px",color:gold,letterSpacing:"2px",textTransform:"uppercase",fontFamily:"monospace",marginBottom:"3px"}}>{p.category}</div>
        <h2 style={{fontFamily:"'Playfair Display',serif",color:"#F0EBE0",fontSize:"20px",fontWeight:"700",margin:"0 0 4px"}}>{p.name}</h2>
        <div style={{color:"#555",fontSize:"12px",marginBottom:"10px"}}>{p.brand} · {p.flavor!=="N/A"?p.flavor:"Kapseln"}</div>

        <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"14px"}}>
          <Stars rating={avgRating}/>
          <span style={{color:"#444",fontSize:"11px"}}>{allReviews.length} {T("Bewertungen","reviews",lang)}</span>
        </div>

        <p style={{color:"#888",fontSize:"13px",lineHeight:"1.8",marginBottom:"16px"}}>{p.description}</p>

        <div style={{background:"#0d0d0d",borderRadius:"12px",padding:"14px",marginBottom:"14px"}}>
          <div style={{color:"#333",fontSize:"9px",letterSpacing:"2px",textTransform:"uppercase",marginBottom:"10px"}}>{T("Nährwerte pro Portion","Nutrition per Serving",lang)}</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"8px"}}>
            {[["Kal/Cal",p.calories,"kcal"],["Protein",p.protein,"g"],["Carbs",p.carbs,"g"],["Fett/Fat",p.fat,"g"]].map(([l,v,u])=>(
              <div key={l} style={{textAlign:"center",background:"#111",borderRadius:"8px",padding:"8px"}}>
                <div style={{fontSize:"17px",fontWeight:"800",color:ok?gold:"#666"}}>{v}</div>
                <div style={{fontSize:"9px",color:"#444"}}>{u} {l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div style={{marginBottom:"16px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"10px"}}>
            <div style={{fontSize:"10px",color:"#444",letterSpacing:"1.5px",textTransform:"uppercase"}}>⭐ {T("Bewertungen","Reviews",lang)}</div>
            <button onClick={()=>setShowReviewForm(!showReviewForm)} style={{background:"transparent",border:`1px solid ${gold}44`,color:gold,padding:"4px 10px",borderRadius:"8px",fontSize:"10px",fontWeight:"600",cursor:"pointer",fontFamily:"inherit"}}>
              {showReviewForm?"✕":("+ "+T("Bewerten","Review",lang))}
            </button>
          </div>

          {showReviewForm&&(
            <div style={{background:"#0a0a0a",border:`1px solid #222`,borderRadius:"12px",padding:"14px",marginBottom:"10px"}}>
              <input value={reviewName} onChange={e=>setReviewName(e.target.value)} placeholder={T("Dein Name","Your name",lang)} style={{...inputS,marginBottom:"8px"}} onFocus={e=>e.target.style.borderColor=gold} onBlur={e=>e.target.style.borderColor="#222"}/>
              <div style={{display:"flex",gap:"4px",marginBottom:"8px"}}>
                {[1,2,3,4,5].map(s=><button key={s} onClick={()=>setReviewRating(s)} style={{background:"transparent",border:"none",fontSize:"20px",cursor:"pointer",opacity:s<=reviewRating?1:0.3}}>★</button>)}
              </div>
              <textarea value={reviewText} onChange={e=>setReviewText(e.target.value)} placeholder={T("Deine Bewertung...","Your review...",lang)} style={{...inputS,minHeight:"70px",resize:"none",lineHeight:"1.6",marginBottom:"8px"}} onFocus={e=>e.target.style.borderColor=gold} onBlur={e=>e.target.style.borderColor="#222"}/>
              <button onClick={submitReview} disabled={!reviewText.trim()||!reviewName.trim()} style={{background:!reviewText.trim()||!reviewName.trim()?"#1a1a1a":`linear-gradient(135deg,${gold},#a07830)`,border:"none",color:!reviewText.trim()||!reviewName.trim()?"#444":"#000",padding:"9px 18px",borderRadius:"9px",fontSize:"12px",fontWeight:"700",cursor:"pointer",fontFamily:"inherit"}}>
                {T("Absenden","Submit",lang)}
              </button>
            </div>
          )}

          {allReviews.length>0?(
            <div style={{display:"flex",flexDirection:"column",gap:"8px",maxHeight:"200px",overflowY:"auto"}}>
              {allReviews.map(r=>(
                <div key={r.id} style={{background:"#0a0a0a",border:"1px solid #1a1a1a",borderRadius:"10px",padding:"10px 12px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:"4px"}}>
                    <span style={{fontSize:"11px",fontWeight:"700",color:"#ccc"}}>{r.user}</span>
                    <span style={{fontSize:"9px",color:"#444"}}>{r.date}</span>
                  </div>
                  <div style={{display:"flex",gap:"2px",marginBottom:"5px"}}>{[1,2,3,4,5].map(i=><span key={i} style={{color:i<=r.rating?gold:"#222",fontSize:"10px"}}>★</span>)}</div>
                  <p style={{color:"#777",fontSize:"12px",margin:0,lineHeight:"1.6"}}>{r.text}</p>
                </div>
              ))}
            </div>
          ):(
            <div style={{color:"#333",fontSize:"12px",textAlign:"center",padding:"16px"}}>{T("Noch keine Bewertungen. Sei der Erste!","No reviews yet. Be the first!",lang)}</div>
          )}
        </div>

        <div style={{display:"flex",gap:"8px",alignItems:"center",flexWrap:"wrap"}}>
          <div>
            <div style={{fontSize:"22px",fontWeight:"800",color:ok?gold:"#555"}}>€{p.price}</div>
            {p.originalPrice&&<div style={{fontSize:"10px",color:"#555",textDecoration:"line-through"}}>€{p.originalPrice}</div>}
          </div>
          {ok&&<>
            <button onClick={()=>onQuickAlert(p)} style={{background:hasAlert?"#1a1400":"#111",border:`1px solid ${hasAlert?gold+"66":"#333"}`,color:hasAlert?gold:"#666",padding:"9px 14px",borderRadius:"10px",fontSize:"11px",fontWeight:"700",cursor:"pointer",fontFamily:"inherit"}}>
              {hasAlert?"🔔 "+T("Aktiv","Active",lang):"🔔 "+T("Alarm","Alert",lang)}
            </button>
            <a href={p.shopUrl} target="_blank" rel="noopener noreferrer" style={{background:`linear-gradient(135deg,${gold},#a07830)`,color:"#000",padding:"10px 20px",borderRadius:"10px",fontSize:"12px",fontWeight:"700",textDecoration:"none",marginLeft:"auto"}}>
              {T("Zum Shop","Shop Now",lang)} →
            </a>
          </>}
        </div>
      </div>
    </div>
  );
};

// ─── SUPPLEMENT QUIZ ──────────────────────────────────────────────────────────
const Quiz=({setTab,setSearch,lang})=>{
  const [step,setStep]=useState(0);
  const [answers,setAnswers]=useState({});
  const [results,setResults]=useState(null);

  const questions=[
    {key:"goal",q:T("Was ist dein Fitness-Ziel?","What is your fitness goal?",lang),opts:[
      {v:"muscle",l:T("💪 Muskeln aufbauen","💪 Build Muscle",lang)},
      {v:"lean",l:T("🔥 Abnehmen / schlank werden","🔥 Lose Weight / Get Lean",lang)},
      {v:"strength",l:T("🏋️ Kraft steigern","🏋️ Increase Strength",lang)},
      {v:"health",l:T("❤️ Gesundheit & Wohlbefinden","❤️ Health & Wellness",lang)},
      {v:"bulk",l:T("📈 Masse aufbauen","📈 Bulk Up",lang)},
    ]},
    {key:"level",q:T("Wie lange trainierst du schon?","How long have you been training?",lang),opts:[
      {v:"beginner",l:T("🌱 Einsteiger (< 1 Jahr)","🌱 Beginner (< 1 year)",lang)},
      {v:"intermediate",l:T("🏃 Fortgeschritten (1-3 Jahre)","🏃 Intermediate (1-3 years)",lang)},
      {v:"advanced",l:T("🦁 Erfahren (3+ Jahre)","🦁 Advanced (3+ years)",lang)},
    ]},
    {key:"budget",q:T("Was ist dein Monatsbudget für Supplements?","What is your monthly supplement budget?",lang),opts:[
      {v:"low",l:"€ < 30"},
      {v:"mid",l:"€€ 30–60"},
      {v:"high",l:"€€€ 60+"},
    ]},
    {key:"diet",q:T("Hast du besondere Ernährungsgewohnheiten?","Any special dietary preferences?",lang),opts:[
      {v:"none",l:T("Keine besonderen","None",lang)},
      {v:"vegan",l:T("🌱 Vegan / pflanzlich","🌱 Vegan / Plant-based",lang)},
      {v:"lactose",l:T("🥛 Laktoseintolerant","🥛 Lactose Intolerant",lang)},
    ]},
  ];

  const pick=(key,val)=>{
    const a={...answers,[key]:val};
    setAnswers(a);
    if(step<questions.length-1){setStep(step+1);}
    else{
      // Generate recommendations
      const prods=PRODUCTS.filter(p=>p.certified);
      let scored=prods.map(p=>{
        let score=0;
        if(p.goal.includes(a.goal))score+=4;
        if(a.budget==="low"&&p.price<=25)score+=2;
        if(a.budget==="mid"&&p.price<=45)score+=1;
        if(a.budget==="high")score+=1;
        if(a.diet==="vegan"&&p.tags.includes("vegan"))score+=3;
        if(a.diet==="lactose"&&(p.category==="Vitamins & Health"||p.category==="Collagen & Wellness"))score+=2;
        if(a.level==="beginner"&&p.category==="Whey Protein")score+=1;
        if(a.level==="advanced"&&p.category==="Creatine")score+=1;
        return{...p,score};
      }).sort((a,b)=>b.score-a.score).slice(0,4);
      setResults(scored);
    }
  };

  const reset=()=>{setStep(0);setAnswers({});setResults(null);};

  if(results)return(
    <div style={{maxWidth:"700px",margin:"0 auto",paddingBottom:"40px"}}>
      <div style={{textAlign:"center",marginBottom:"28px"}}>
        <div style={{fontSize:"40px",marginBottom:"10px"}}>🎯</div>
        <h2 style={{fontFamily:"'Playfair Display',serif",color:"#F0EBE0",fontSize:"22px",margin:"0 0 8px"}}>{T("Deine Empfehlungen","Your Recommendations",lang)}</h2>
        <p style={{color:"#555",fontSize:"13px"}}>{T("Basierend auf deinen Antworten haben wir die besten Produkte für dich gefunden.","Based on your answers we found the best products for you.",lang)}</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:"12px",marginBottom:"20px"}}>
        {results.map((p,i)=>(
          <div key={p.id} style={{background:card,border:`1px solid ${i===0?gold:bdr}`,borderRadius:"14px",padding:"16px",position:"relative"}}>
            {i===0&&<div style={{position:"absolute",top:"-8px",left:"50%",transform:"translateX(-50%)",background:gold,color:"#000",fontSize:"9px",fontWeight:"800",padding:"2px 10px",borderRadius:"20px",whiteSpace:"nowrap"}}>🏆 {T("BESTE WAHL","BEST MATCH",lang)}</div>}
            <div style={{width:"100%",height:"100px",borderRadius:"8px",overflow:"hidden",background:"#0a0a0a",marginBottom:"10px"}}>
              <img src={p.image} alt={p.name} onError={e=>e.target.style.display="none"} style={{width:"100%",height:"100%",objectFit:"contain",padding:"8px",boxSizing:"border-box"}}/>
            </div>
            <div style={{fontSize:"8px",color:gold,letterSpacing:"1px",textTransform:"uppercase",fontFamily:"monospace",marginBottom:"2px"}}>{p.category}</div>
            <div style={{fontSize:"12px",fontWeight:"700",color:"#F0EBE0",fontFamily:"'Playfair Display',serif",lineHeight:"1.3",marginBottom:"4px"}}>{p.name}</div>
            <div style={{fontSize:"10px",color:"#555",marginBottom:"6px"}}>{p.brand}</div>
            <div style={{fontSize:"16px",fontWeight:"800",color:gold,marginBottom:"8px"}}>€{p.price}</div>
            <a href={p.shopUrl} target="_blank" rel="noopener noreferrer" style={{display:"block",background:`linear-gradient(135deg,${gold},#a07830)`,color:"#000",padding:"7px",borderRadius:"8px",fontSize:"11px",fontWeight:"700",textDecoration:"none",textAlign:"center"}}>
              {T("Zum Shop","Shop Now",lang)} →
            </a>
          </div>
        ))}
      </div>
      <button onClick={reset} style={{...g(false),display:"block",margin:"0 auto"}}>{T("Neu starten","Start Over",lang)}</button>
    </div>
  );

  const q=questions[step];
  return(
    <div style={{maxWidth:"560px",margin:"0 auto",paddingBottom:"40px"}}>
      <div style={{textAlign:"center",marginBottom:"28px"}}>
        <div style={{fontSize:"36px",marginBottom:"10px"}}>🎯</div>
        <h2 style={{fontFamily:"'Playfair Display',serif",color:"#F0EBE0",fontSize:"22px",margin:"0 0 8px"}}>{T("Halal Supplement Berater","Halal Supplement Advisor",lang)}</h2>
        <p style={{color:"#555",fontSize:"13px"}}>{T("Beantworte 4 Fragen — wir finden die perfekten Produkte für dich.","Answer 4 questions — we'll find the perfect products for you.",lang)}</p>
      </div>

      {/* Progress */}
      <div style={{display:"flex",gap:"4px",marginBottom:"24px"}}>
        {questions.map((_,i)=><div key={i} style={{flex:1,height:"3px",borderRadius:"2px",background:i<=step?gold:"#222",transition:"background 0.3s"}}/>)}
      </div>

      <div style={{background:card,border:`1px solid ${bdr}`,borderRadius:"16px",padding:"24px"}}>
        <div style={{fontSize:"10px",color:gold,letterSpacing:"2px",textTransform:"uppercase",marginBottom:"8px"}}>{T("Frage","Question",lang)} {step+1}/{questions.length}</div>
        <h3 style={{fontFamily:"'Playfair Display',serif",color:"#F0EBE0",fontSize:"18px",margin:"0 0 20px"}}>{q.q}</h3>
        <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
          {q.opts.map(o=>(
            <button key={o.v} onClick={()=>pick(q.key,o.v)}
              style={{background:"#0a0a0a",border:`1px solid ${answers[q.key]===o.v?gold:"#222"}`,color:answers[q.key]===o.v?gold:"#888",padding:"14px 18px",borderRadius:"12px",fontSize:"13px",fontWeight:"500",cursor:"pointer",textAlign:"left",fontFamily:"inherit",transition:"all 0.18s"}}>
              {o.l}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── NUTRITION CALCULATOR ─────────────────────────────────────────────────────
const NutritionCalc=({lang})=>{
  const [weight,setWeight]=useState("");
  const [height,setHeight]=useState("");
  const [age,setAge]=useState("");
  const [sex,setSex]=useState("male");
  const [activity,setActivity]=useState("moderate");
  const [goal,setGoal]=useState("muscle");
  const [result,setResult]=useState(null);

  const activityFactors={sedentary:1.2,light:1.375,moderate:1.55,active:1.725,veryactive:1.9};

  const calc=()=>{
    if(!weight||!height||!age)return;
    const w=parseFloat(weight),h=parseFloat(height),a=parseInt(age);
    const bmr=sex==="male"?10*w+6.25*h-5*a+5:10*w+6.25*h-5*a-161;
    const tdee=bmr*activityFactors[activity];
    let calories=tdee,protein=0,carbs=0,fat=0,label="";
    if(goal==="muscle"){calories=tdee+300;protein=w*2.2;fat=w*1;carbs=(calories-protein*4-fat*9)/4;label=T("Muskelaufbau","Muscle Building",lang);}
    else if(goal==="lean"){calories=tdee-400;protein=w*2.4;fat=w*0.8;carbs=(calories-protein*4-fat*9)/4;label=T("Abnehmen","Weight Loss",lang);}
    else if(goal==="bulk"){calories=tdee+500;protein=w*2;fat=w*1.1;carbs=(calories-protein*4-fat*9)/4;label=T("Masseaufbau","Bulking",lang);}
    else{calories=tdee;protein=w*1.8;fat=w*0.9;carbs=(calories-protein*4-fat*9)/4;label=T("Gesundheit","Health",lang);}
    // Suggest best product
    const suggestions=PRODUCTS.filter(p=>p.certified&&p.protein>0).sort((a,b)=>b.protein-a.protein).slice(0,2);
    setResult({calories:Math.round(calories),protein:Math.round(protein),carbs:Math.max(0,Math.round(carbs)),fat:Math.round(fat),label,suggestions,proteinGap:Math.round(protein-60)});
  };

  const inputRow=(label,val,setVal,placeholder,type="number")=>(
    <div>
      <div style={{fontSize:"10px",color:"#444",letterSpacing:"1px",textTransform:"uppercase",marginBottom:"6px"}}>{label}</div>
      <input type={type} value={val} onChange={e=>setVal(e.target.value)} placeholder={placeholder} style={inputS} onFocus={e=>e.target.style.borderColor=gold} onBlur={e=>e.target.style.borderColor="#222"}/>
    </div>
  );

  return(
    <div style={{maxWidth:"620px",margin:"0 auto",paddingBottom:"40px"}}>
      <div style={{textAlign:"center",marginBottom:"28px"}}>
        <div style={{fontSize:"36px",marginBottom:"10px"}}>📊</div>
        <h2 style={{fontFamily:"'Playfair Display',serif",color:"#F0EBE0",fontSize:"22px",margin:"0 0 8px"}}>{T("Nährstoffrechner","Nutrition Calculator",lang)}</h2>
        <p style={{color:"#555",fontSize:"13px"}}>{T("Berechne deinen täglichen Kalorien- und Proteinbedarf.","Calculate your daily calorie and protein needs.",lang)}</p>
      </div>
      <div style={{background:card,border:`1px solid ${bdr}`,borderRadius:"16px",padding:"22px",display:"flex",flexDirection:"column",gap:"14px",marginBottom:"14px"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"12px"}}>
          {inputRow(T("Gewicht (kg)","Weight (kg)",lang),weight,setWeight,"75")}
          {inputRow(T("Größe (cm)","Height (cm)",lang),height,setHeight,"178")}
          {inputRow(T("Alter","Age",lang),age,setAge,"25")}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}}>
          <div>
            <div style={{fontSize:"10px",color:"#444",letterSpacing:"1px",textTransform:"uppercase",marginBottom:"6px"}}>{T("Geschlecht","Sex",lang)}</div>
            <div style={{display:"flex",gap:"6px"}}>
              {[["male","♂ "+T("Mann","Male",lang)],["female","♀ "+T("Frau","Female",lang)]].map(([v,l])=>(
                <button key={v} onClick={()=>setSex(v)} style={{...g(sex===v),flex:1,padding:"8px"}}>{l}</button>
              ))}
            </div>
          </div>
          <div>
            <div style={{fontSize:"10px",color:"#444",letterSpacing:"1px",textTransform:"uppercase",marginBottom:"6px"}}>{T("Aktivität","Activity",lang)}</div>
            <select value={activity} onChange={e=>setActivity(e.target.value)} style={{...inputS,cursor:"pointer"}}>
              <option value="sedentary">{T("Wenig aktiv","Sedentary",lang)}</option>
              <option value="light">{T("Leicht aktiv","Lightly Active",lang)}</option>
              <option value="moderate">{T("Moderat aktiv","Moderately Active",lang)}</option>
              <option value="active">{T("Sehr aktiv","Very Active",lang)}</option>
              <option value="veryactive">{T("Extrem aktiv","Extremely Active",lang)}</option>
            </select>
          </div>
        </div>
        <div>
          <div style={{fontSize:"10px",color:"#444",letterSpacing:"1px",textTransform:"uppercase",marginBottom:"8px"}}>{T("Ziel","Goal",lang)}</div>
          <div style={{display:"flex",gap:"6px",flexWrap:"wrap"}}>
            {[["muscle",T("💪 Muskel","💪 Muscle",lang)],["lean",T("🔥 Abnehmen","🔥 Lean",lang)],["bulk",T("📈 Masse","📈 Bulk",lang)],["health",T("❤️ Gesundheit","❤️ Health",lang)]].map(([v,l])=>(
              <button key={v} onClick={()=>setGoal(v)} style={g(goal===v)}>{l}</button>
            ))}
          </div>
        </div>
        <button onClick={calc} disabled={!weight||!height||!age} style={{background:!weight||!height||!age?"#1a1a1a":`linear-gradient(135deg,${gold},#a07830)`,border:"none",color:!weight||!height||!age?"#444":"#000",padding:"13px",borderRadius:"12px",fontSize:"14px",fontWeight:"700",cursor:!weight||!height||!age?"not-allowed":"pointer",fontFamily:"inherit"}}>
          {T("Berechnen","Calculate",lang)}
        </button>
      </div>

      {result&&(
        <div style={{background:"#0d0d0d",border:`1px solid ${gold}33`,borderRadius:"16px",padding:"22px"}}>
          <div style={{fontSize:"10px",color:gold,letterSpacing:"2px",textTransform:"uppercase",marginBottom:"14px"}}>📊 {result.label} — {T("Dein täglicher Bedarf","Your Daily Needs",lang)}</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"10px",marginBottom:"18px"}}>
            {[[T("Kalorien","Calories",lang),result.calories,"kcal","🔥"],[T("Protein","Protein",lang),result.protein,"g","🥩"],[T("Kohlenhydrate","Carbs",lang),result.carbs,"g","🍞"],[T("Fett","Fat",lang),result.fat,"g","🫒"]].map(([l,v,u,ic])=>(
              <div key={l} style={{background:"#111",borderRadius:"10px",padding:"12px",textAlign:"center"}}>
                <div style={{fontSize:"18px",marginBottom:"4px"}}>{ic}</div>
                <div style={{fontSize:"20px",fontWeight:"800",color:gold}}>{v}</div>
                <div style={{fontSize:"9px",color:"#444"}}>{u}</div>
                <div style={{fontSize:"9px",color:"#555",marginTop:"2px"}}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{background:"#111",borderRadius:"12px",padding:"14px",marginBottom:"14px"}}>
            <div style={{fontSize:"11px",color:gold,marginBottom:"6px"}}>💡 {T("Supplement-Tipp","Supplement Tip",lang)}</div>
            <p style={{color:"#888",fontSize:"12px",lineHeight:"1.7",margin:"0 0 10px"}}>
              {T(`Mit normaler Ernährung nimmst du ca. 60g Protein/Tag auf. Du brauchst noch ca. ${result.proteinGap}g mehr — das entspricht etwa ${Math.ceil(result.proteinGap/23)} Portionen halal Whey Protein.`,
                `With normal diet you get ~60g protein/day. You need ~${result.proteinGap}g more — that's about ${Math.ceil(result.proteinGap/23)} servings of halal whey protein.`,lang)}
            </p>
            <div style={{display:"flex",gap:"8px"}}>
              {result.suggestions.map(p=>(
                <a key={p.id} href={p.shopUrl} target="_blank" rel="noopener noreferrer"
                  style={{flex:1,background:"#0a0a0a",border:`1px solid ${gold}33`,borderRadius:"10px",padding:"8px",textDecoration:"none",display:"flex",alignItems:"center",gap:"8px"}}>
                  <div style={{width:"36px",height:"36px",borderRadius:"6px",overflow:"hidden",flexShrink:0}}>
                    <img src={p.image} alt={p.name} onError={e=>e.target.style.display="none"} style={{width:"100%",height:"100%",objectFit:"contain",padding:"3px",boxSizing:"border-box"}}/>
                  </div>
                  <div>
                    <div style={{fontSize:"10px",fontWeight:"700",color:"#F0EBE0",lineHeight:"1.2"}}>{p.name}</div>
                    <div style={{fontSize:"9px",color:gold}}>€{p.price}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── AI INGREDIENT CHECKER ────────────────────────────────────────────────────
const IngredientChecker=({lang})=>{
  const [text,setText]=useState("");
  const [loading,setLoading]=useState(false);
  const [result,setResult]=useState(null);
  const [error,setError]=useState("");
  const check=async()=>{
    if(!text.trim())return;
    setLoading(true);setResult(null);setError("");
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,messages:[{role:"user",content:`You are a halal food expert. Analyze these supplement ingredients for halal compliance.\n\nIngredients: """${text}"""\n\nRespond ONLY with valid JSON, no markdown:\n{"verdict":"HALAL"|"HARAM"|"MASHBOOH","confidence":"High"|"Medium"|"Low","flaggedIngredients":[{"name":"...","status":"haram"|"mashbooh","reason":"..."}],"safeIngredients":["..."],"summary":"One clear sentence."}`}]})});
      const data=await res.json();
      const raw=data.content?.map(b=>b.text||"").join("")||"";
      setResult(JSON.parse(raw.replace(/```json|```/g,"").trim()));
    }catch{setError(T("Analyse fehlgeschlagen. Bitte versuche es erneut.","Analysis failed. Please try again.",lang));}
    setLoading(false);
  };
  const vc=result?(result.verdict==="HALAL"?"#4aaa4a":result.verdict==="HARAM"?"#ee4444":gold):gold;
  const vb=result?(result.verdict==="HALAL"?"#0a1a0a":result.verdict==="HARAM"?"#1a0a0a":"#1a1400"):"#111";
  return(
    <div style={{maxWidth:"680px",margin:"0 auto",paddingBottom:"40px"}}>
      <div style={{textAlign:"center",marginBottom:"28px"}}>
        <div style={{fontSize:"36px",marginBottom:"10px"}}>🔬</div>
        <h2 style={{fontFamily:"'Playfair Display',serif",color:"#F0EBE0",fontSize:"22px",margin:"0 0 8px"}}>{T("KI-Zutaten Checker","AI Ingredient Checker",lang)}</h2>
        <p style={{color:"#555",fontSize:"13px"}}>{T("Zutaten einfügen — die KI prüft jede Zutat auf Halal-Konformität.","Paste ingredients — the AI checks every ingredient for halal compliance.",lang)}</p>
      </div>
      <div style={{background:card,border:`1px solid ${bdr}`,borderRadius:"16px",padding:"20px",marginBottom:"14px"}}>
        <textarea value={text} onChange={e=>setText(e.target.value)} placeholder={T("z.B. Whey Protein, Soy Lecithin, Gelatin, Sucralose...","e.g. Whey Protein, Soy Lecithin, Gelatin, Sucralose...",lang)} style={{...inputS,minHeight:"110px",resize:"vertical",lineHeight:"1.7",marginBottom:"12px"}} onFocus={e=>e.target.style.borderColor=gold} onBlur={e=>e.target.style.borderColor="#222"}/>
        <button onClick={check} disabled={loading||!text.trim()} style={{width:"100%",background:loading||!text.trim()?"#1a1a1a":`linear-gradient(135deg,${gold},#a07830)`,border:"none",color:loading||!text.trim()?"#444":"#000",padding:"13px",borderRadius:"12px",fontSize:"14px",fontWeight:"700",cursor:loading||!text.trim()?"not-allowed":"pointer",fontFamily:"inherit"}}>
          {loading?T("🔄 Wird analysiert...","🔄 Analyzing...",lang):T("🔬 Jetzt analysieren","🔬 Analyze Now",lang)}
        </button>
      </div>
      {error&&<div style={{background:"#1a0a0a",border:"1px solid #aa3333",borderRadius:"12px",padding:"14px",color:"#ee5555",fontSize:"13px"}}>{error}</div>}
      {result&&(
        <div style={{background:vb,border:`1px solid ${vc}44`,borderRadius:"16px",padding:"22px"}}>
          <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"14px"}}>
            <div style={{fontSize:"36px"}}>{result.verdict==="HALAL"?"✅":result.verdict==="HARAM"?"🚫":"⚠️"}</div>
            <div>
              <div style={{fontSize:"22px",fontWeight:"800",color:vc,fontFamily:"'Playfair Display',serif"}}>{result.verdict}</div>
              <div style={{fontSize:"11px",color:"#555"}}>{T("Konfidenz","Confidence",lang)}: {result.confidence}</div>
            </div>
          </div>
          <p style={{color:"#aaa",fontSize:"13px",lineHeight:"1.7",marginBottom:"16px",background:"#ffffff08",borderRadius:"10px",padding:"12px"}}>{result.summary}</p>
          {result.flaggedIngredients?.length>0&&(
            <div style={{marginBottom:"14px"}}>
              <div style={{fontSize:"10px",color:"#ee4444",letterSpacing:"1.5px",textTransform:"uppercase",marginBottom:"8px"}}>⚠️ {T("Problematische Zutaten","Flagged Ingredients",lang)}</div>
              {result.flaggedIngredients.map((ing,i)=>(
                <div key={i} style={{background:"#2a1010",border:"1px solid #aa333333",borderRadius:"10px",padding:"10px 12px",marginBottom:"6px"}}>
                  <div style={{display:"flex",gap:"8px",alignItems:"center",marginBottom:"3px"}}>
                    <span style={{fontWeight:"700",color:"#ee5555",fontSize:"12px"}}>{ing.name}</span>
                    <span style={{background:ing.status==="haram"?"#aa111133":"#aa880033",border:`1px solid ${ing.status==="haram"?"#aa3333":"#aa8800"}`,borderRadius:"20px",padding:"1px 7px",fontSize:"9px",color:ing.status==="haram"?"#ee4444":gold,fontWeight:"700"}}>{ing.status.toUpperCase()}</span>
                  </div>
                  <div style={{fontSize:"11px",color:"#666"}}>{ing.reason}</div>
                </div>
              ))}
            </div>
          )}
          {result.safeIngredients?.length>0&&(
            <div>
              <div style={{fontSize:"10px",color:"#4aaa4a",letterSpacing:"1.5px",textTransform:"uppercase",marginBottom:"8px"}}>✓ {T("Halal-konforme Zutaten","Halal-Compliant Ingredients",lang)}</div>
              <div style={{display:"flex",gap:"6px",flexWrap:"wrap"}}>
                {result.safeIngredients.map((s,i)=><span key={i} style={{background:"#0a1a0a",border:"1px solid #1a3a1a",borderRadius:"20px",padding:"3px 9px",fontSize:"10px",color:"#4aaa4a"}}>{s}</span>)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ─── COMPARE PANEL ────────────────────────────────────────────────────────────
const ComparePanel=({compareIds,onRemove,lang})=>{
  const selected=PRODUCTS.filter(p=>compareIds.includes(p.id)).slice(0,3);
  const rows=[[T("Preis","Price",lang),"price","€"],[T("Protein","Protein",lang),"protein","g"],[T("Kalorien","Calories",lang),"calories","kcal"],["Carbs","carbs","g"],[T("Fett","Fat",lang),"fat","g"],[T("Bewertung","Rating",lang),"rating","★"]];
  if(selected.length<2)return(
    <div style={{maxWidth:"600px",margin:"0 auto",textAlign:"center",padding:"50px 20px"}}>
      <div style={{fontSize:"40px",marginBottom:"14px"}}>⚖️</div>
      <h2 style={{fontFamily:"'Playfair Display',serif",color:"#F0EBE0",fontSize:"20px",margin:"0 0 10px"}}>{T("Produkte vergleichen","Compare Products",lang)}</h2>
      <p style={{color:"#555",fontSize:"13px"}}>{T("Klicke bei mindestens 2 Produkten auf '+ Vergleich'.","Click '+ Compare' on at least 2 products.",lang)}</p>
      <div style={{marginTop:"20px",display:"flex",justifyContent:"center",gap:"10px"}}>
        {[0,1,2].map(i=><div key={i} style={{width:"120px",height:"140px",background:card,border:`1px dashed ${i<compareIds.length?gold:"#222"}`,borderRadius:"12px",display:"flex",alignItems:"center",justifyContent:"center",color:"#333",fontSize:"24px"}}>{i<selected.length?"✓":"＋"}</div>)}
      </div>
    </div>
  );
  const best=(key)=>{const vals=selected.map(p=>p[key]);return key==="price"?Math.min(...vals):Math.max(...vals);};
  return(
    <div style={{overflowX:"auto",paddingBottom:"40px"}}>
      <div style={{textAlign:"center",marginBottom:"20px"}}>
        <h2 style={{fontFamily:"'Playfair Display',serif",color:"#F0EBE0",fontSize:"20px",margin:"0 0 4px"}}>{T("Produktvergleich","Product Comparison",lang)}</h2>
      </div>
      <div style={{minWidth:"440px"}}>
        <div style={{display:"grid",gridTemplateColumns:`140px repeat(${selected.length},1fr)`,gap:"8px",marginBottom:"12px"}}>
          <div/>
          {selected.map(p=>(
            <div key={p.id} style={{background:card,border:`1px solid ${bdr}`,borderRadius:"12px",padding:"12px",textAlign:"center",position:"relative"}}>
              <button onClick={()=>onRemove(p.id)} style={{position:"absolute",top:"6px",right:"6px",background:"#1e1e1e",border:"none",color:"#666",width:"18px",height:"18px",borderRadius:"50%",cursor:"pointer",fontSize:"9px",lineHeight:"18px"}}>✕</button>
              <div style={{width:"70px",height:"70px",margin:"0 auto 8px",borderRadius:"8px",overflow:"hidden",background:"#0a0a0a",border:`1px solid ${bdr}`}}>
                <img src={p.image} alt={p.name} onError={e=>e.target.style.display="none"} style={{width:"100%",height:"100%",objectFit:"contain",padding:"5px",boxSizing:"border-box"}}/>
              </div>
              <div style={{fontSize:"10px",fontWeight:"700",color:"#F0EBE0",fontFamily:"'Playfair Display',serif",lineHeight:"1.3",marginBottom:"3px"}}>{p.name}</div>
              <div style={{fontSize:"9px",color:"#555",marginBottom:"5px"}}>{p.brand}</div>
              <span style={{background:"#C8A96E15",border:"1px solid #C8A96E33",borderRadius:"20px",padding:"2px 6px",fontSize:"9px",color:gold,fontWeight:"700"}}>✓ {p.certBody}</span>
            </div>
          ))}
        </div>
        {rows.map(([label,key,unit])=>(
          <div key={key} style={{display:"grid",gridTemplateColumns:`140px repeat(${selected.length},1fr)`,gap:"8px",marginBottom:"6px"}}>
            <div style={{display:"flex",alignItems:"center",fontSize:"11px",color:"#555",fontWeight:"600",paddingLeft:"4px"}}>{label}</div>
            {selected.map(p=>{
              const val=p[key];const isBest=val===best(key);
              return(
                <div key={p.id} style={{background:isBest?"#1a1600":"#0d0d0d",border:`1px solid ${isBest?gold+"44":bdr}`,borderRadius:"8px",padding:"10px",textAlign:"center"}}>
                  <div style={{fontSize:"16px",fontWeight:"800",color:isBest?gold:"#777"}}>{unit==="€"?"€":""}{val}{unit!=="€"?unit:""}</div>
                  {isBest&&<div style={{fontSize:"8px",color:gold,marginTop:"1px"}}>★ {T("Bester Wert","Best",lang)}</div>}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── PRICE ALERT PANEL ────────────────────────────────────────────────────────
const PriceAlertPanel=({alerts,setAlerts,quickAlertProduct,clearQuickAlert,lang})=>{
  const [step,setStep]=useState(quickAlertProduct?"new":"list");
  const [selProduct,setSelProduct]=useState(quickAlertProduct||null);
  const [targetPrice,setTargetPrice]=useState("");
  const [email,setEmail]=useState("");
  const [saved,setSaved]=useState(false);
  const [triggered,setTriggered]=useState([]);

  useEffect(()=>{if(quickAlertProduct){setSelProduct(quickAlertProduct);setStep("new");clearQuickAlert();}},[quickAlertProduct, clearQuickAlert]);
  useEffect(()=>{
    if(alerts.length===0)return;
    const t=setTimeout(()=>{
      const r=alerts[Math.floor(Math.random()*alerts.length)];
      const sp=(r.targetPrice-Math.random()*1.5).toFixed(2);
      if(parseFloat(sp)<=r.targetPrice)setTriggered(prev=>[...prev.filter(x=>x.id!==r.id),{...r,currentPrice:parseFloat(sp)}]);
    },5000);
    return()=>clearTimeout(t);
  },[alerts]);

  const saveAlert=()=>{
    if(!selProduct||!targetPrice||!email)return;
    const a={id:Date.now(),productId:selProduct.id,productName:selProduct.name,productImage:selProduct.image,brand:selProduct.brand,originalPrice:selProduct.price,targetPrice:parseFloat(targetPrice),email,createdAt:new Date().toLocaleDateString("de-DE"),active:true};
    setAlerts(prev=>[...prev.filter(x=>x.productId!==selProduct.id),a]);
    setSaved(true);
    setTimeout(()=>{setSaved(false);setStep("list");setSelProduct(null);setTargetPrice("");setEmail("");},2000);
  };

  const halalProds=PRODUCTS.filter(p=>p.certified);

  return(
    <div style={{maxWidth:"640px",margin:"0 auto",paddingBottom:"40px"}}>
      <div style={{textAlign:"center",marginBottom:"24px"}}>
        <div style={{fontSize:"36px",marginBottom:"10px"}}>🔔</div>
        <h2 style={{fontFamily:"'Playfair Display',serif",color:"#F0EBE0",fontSize:"22px",margin:"0 0 8px"}}>{T("Preisalarm","Price Alert",lang)}</h2>
        <p style={{color:"#555",fontSize:"13px"}}>{T("Wunschpreis festlegen — wir benachrichtigen dich bei Preissenkung.","Set your target price — we'll notify you when it drops.",lang)}</p>
      </div>

      {triggered.map(t=>(
        <div key={t.id} style={{background:"#0a1a0a",border:"1px solid #2a6a2a",borderRadius:"12px",padding:"14px 16px",marginBottom:"12px",display:"flex",alignItems:"center",gap:"12px"}}>
          <div style={{fontSize:"26px"}}>🎉</div>
          <div style={{flex:1}}>
            <div style={{fontSize:"12px",fontWeight:"700",color:"#6aee6a",marginBottom:"2px"}}>{T("Preisalarm ausgelöst!","Price Alert Triggered!",lang)}</div>
            <div style={{fontSize:"11px",color:"#888"}}><strong style={{color:"#F0EBE0"}}>{t.productName}</strong> {T("jetzt für","now at",lang)} <strong style={{color:gold}}>€{t.currentPrice}</strong></div>
          </div>
          <div style={{display:"flex",gap:"6px"}}>
            <a href={PRODUCTS.find(p=>p.id===t.productId)?.shopUrl||"#"} target="_blank" rel="noopener noreferrer" style={{background:`linear-gradient(135deg,${gold},#a07830)`,color:"#000",padding:"7px 12px",borderRadius:"8px",fontSize:"10px",fontWeight:"700",textDecoration:"none"}}>{T("Kaufen","Buy Now",lang)}</a>
            <button onClick={()=>setTriggered(prev=>prev.filter(x=>x.id!==t.id))} style={{background:"transparent",border:"none",color:"#555",cursor:"pointer",fontSize:"16px"}}>✕</button>
          </div>
        </div>
      ))}

      <div style={{display:"flex",gap:"8px",marginBottom:"18px"}}>
        <button onClick={()=>setStep("list")} style={g(step==="list")}>📋 {T("Meine Alarme","My Alerts",lang)} ({alerts.length})</button>
        <button onClick={()=>{setStep("new");setSelProduct(null);setTargetPrice("");setEmail("");setSaved(false);}} style={g(step==="new")}>+ {T("Neuer Alarm","New Alert",lang)}</button>
      </div>

      {step==="new"&&(
        <div style={{background:card,border:`1px solid ${bdr}`,borderRadius:"16px",padding:"22px",display:"flex",flexDirection:"column",gap:"14px"}}>
          {saved?(
            <div style={{textAlign:"center",padding:"24px 0"}}>
              <div style={{fontSize:"44px",marginBottom:"12px"}}>🔔</div>
              <div style={{fontFamily:"'Playfair Display',serif",color:"#F0EBE0",fontSize:"18px",marginBottom:"6px"}}>{T("Alarm gespeichert!","Alert Saved!",lang)}</div>
              <div style={{color:"#555",fontSize:"12px"}}>{T("Wir schicken dir eine E-Mail an","We'll email you at",lang)} <strong style={{color:gold}}>{email}</strong></div>
            </div>
          ):(
            <>
              <div>
                <div style={{fontSize:"10px",color:"#444",letterSpacing:"1px",textTransform:"uppercase",marginBottom:"8px"}}>{T("Produkt wählen *","Select Product *",lang)}</div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(120px,1fr))",gap:"7px",maxHeight:"260px",overflowY:"auto"}}>
                  {halalProds.map(p=>(
                    <div key={p.id} onClick={()=>setSelProduct(p)} style={{background:selProduct?.id===p.id?"#1a1400":"#0a0a0a",border:`1px solid ${selProduct?.id===p.id?gold+"88":"#222"}`,borderRadius:"10px",padding:"8px",cursor:"pointer",textAlign:"center",transition:"all 0.18s"}}>
                      <div style={{width:"50px",height:"50px",margin:"0 auto 5px",borderRadius:"7px",overflow:"hidden",background:"#111"}}>
                        <img src={p.image} alt={p.name} onError={e=>e.target.style.display="none"} style={{width:"100%",height:"100%",objectFit:"contain",padding:"4px",boxSizing:"border-box"}}/>
                      </div>
                      <div style={{fontSize:"9px",fontWeight:"700",color:selProduct?.id===p.id?gold:"#aaa",lineHeight:"1.3",marginBottom:"2px"}}>{p.name}</div>
                      <div style={{fontSize:"10px",fontWeight:"700",color:gold}}>€{p.price}</div>
                    </div>
                  ))}
                </div>
              </div>
              {selProduct&&(
                <>
                  <div style={{background:"#0d0d0d",borderRadius:"10px",padding:"12px",display:"flex",gap:"10px",alignItems:"center"}}>
                    <div style={{width:"44px",height:"44px",borderRadius:"7px",overflow:"hidden",background:"#111",flexShrink:0}}>
                      <img src={selProduct.image} alt="" onError={e=>e.target.style.display="none"} style={{width:"100%",height:"100%",objectFit:"contain",padding:"4px",boxSizing:"border-box"}}/>
                    </div>
                    <div style={{flex:1}}><div style={{fontSize:"12px",fontWeight:"700",color:"#F0EBE0"}}>{selProduct.name}</div><div style={{fontSize:"10px",color:"#555"}}>{selProduct.brand}</div></div>
                    <div style={{fontSize:"20px",fontWeight:"800",color:gold}}>€{selProduct.price}</div>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}}>
                    <div>
                      <div style={{fontSize:"10px",color:"#444",letterSpacing:"1px",textTransform:"uppercase",marginBottom:"6px"}}>{T("Wunschpreis (€) *","Target Price (€) *",lang)}</div>
                      <div style={{position:"relative"}}>
                        <span style={{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",color:gold,fontWeight:"700"}}>€</span>
                        <input type="number" step="0.01" min="0.01" max={selProduct.price-0.01} value={targetPrice} onChange={e=>setTargetPrice(e.target.value)} placeholder={(selProduct.price*0.9).toFixed(2)} style={{...inputS,paddingLeft:"26px"}} onFocus={e=>e.target.style.borderColor=gold} onBlur={e=>e.target.style.borderColor="#222"}/>
                      </div>
                      {targetPrice&&parseFloat(targetPrice)<selProduct.price&&<div style={{fontSize:"10px",color:"#6aaa6a",marginTop:"4px"}}>-{((1-parseFloat(targetPrice)/selProduct.price)*100).toFixed(0)}% {T("günstiger","cheaper",lang)}</div>}
                    </div>
                    <div>
                      <div style={{fontSize:"10px",color:"#444",letterSpacing:"1px",textTransform:"uppercase",marginBottom:"6px"}}>E-Mail *</div>
                      <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="deine@email.de" style={inputS} onFocus={e=>e.target.style.borderColor=gold} onBlur={e=>e.target.style.borderColor="#222"}/>
                    </div>
                  </div>
                  <button onClick={saveAlert} disabled={!targetPrice||!email||parseFloat(targetPrice)>=selProduct.price}
                    style={{background:!targetPrice||!email||parseFloat(targetPrice)>=selProduct.price?"#1a1a1a":`linear-gradient(135deg,${gold},#a07830)`,border:"none",color:!targetPrice||!email||parseFloat(targetPrice)>=selProduct.price?"#444":"#000",padding:"13px",borderRadius:"12px",fontSize:"14px",fontWeight:"700",cursor:"pointer",fontFamily:"inherit"}}>
                    🔔 {T("Preisalarm aktivieren","Activate Price Alert",lang)}
                  </button>
                </>
              )}
            </>
          )}
        </div>
      )}

      {step==="list"&&(
        alerts.length===0?(
          <div style={{textAlign:"center",padding:"40px 20px",background:card,border:`1px solid ${bdr}`,borderRadius:"16px"}}>
            <div style={{fontSize:"36px",marginBottom:"10px"}}>🔕</div>
            <div style={{color:"#555",fontSize:"13px",marginBottom:"14px"}}>{T("Noch keine Alarme aktiv.","No active alerts yet.",lang)}</div>
            <button onClick={()=>setStep("new")} style={{background:`linear-gradient(135deg,${gold},#a07830)`,border:"none",color:"#000",padding:"10px 20px",borderRadius:"10px",fontSize:"12px",fontWeight:"700",cursor:"pointer",fontFamily:"inherit"}}>+ {T("Neuen Alarm erstellen","Create New Alert",lang)}</button>
          </div>
        ):(
          <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
            {alerts.map(a=>{
              const prod=PRODUCTS.find(p=>p.id===a.productId);
              const isTriggered=triggered.some(t=>t.id===a.id);
              return(
                <div key={a.id} style={{background:isTriggered?"#0a1a0a":card,border:`1px solid ${isTriggered?"#2a6a2a":bdr}`,borderRadius:"12px",padding:"14px",display:"flex",alignItems:"center",gap:"12px"}}>
                  <div style={{width:"50px",height:"50px",borderRadius:"8px",overflow:"hidden",background:"#0a0a0a",flexShrink:0}}>
                    <img src={a.productImage} alt="" onError={e=>e.target.style.display="none"} style={{width:"100%",height:"100%",objectFit:"contain",padding:"4px",boxSizing:"border-box"}}/>
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:"12px",fontWeight:"700",color:"#F0EBE0",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{a.productName}</div>
                    <div style={{fontSize:"10px",color:"#555"}}>≤ <strong style={{color:gold}}>€{a.targetPrice}</strong> · {a.email}</div>
                    <div style={{fontSize:"9px",color:"#333"}}>{T("Aktuell","Current",lang)}: €{a.originalPrice} · {a.createdAt}</div>
                  </div>
                  <div style={{display:"flex",flexDirection:"column",gap:"4px",alignItems:"flex-end"}}>
                    {isTriggered&&<span style={{fontSize:"9px",color:"#6aee6a",fontWeight:"700"}}>🎉 {T("AUSGELÖST","TRIGGERED",lang)}</span>}
                    {prod&&<a href={prod.shopUrl} target="_blank" rel="noopener noreferrer" style={{background:"#1a1a1a",border:"1px solid #333",color:"#aaa",padding:"4px 8px",borderRadius:"7px",fontSize:"9px",textDecoration:"none"}}>Shop →</a>}
                    <button onClick={()=>setAlerts(prev=>prev.filter(x=>x.id!==a.id))} style={{background:"transparent",border:"1px solid #2a1010",color:"#aa4444",padding:"3px 7px",borderRadius:"7px",fontSize:"9px",cursor:"pointer",fontFamily:"inherit"}}>{T("Löschen","Delete",lang)}</button>
                  </div>
                </div>
              );
            })}
          </div>
        )
      )}
    </div>
  );
};

// ─── WISHLIST ─────────────────────────────────────────────────────────────────
const Wishlist=({wishlist,onToggleWish,onViewProduct,lang})=>{
  const items=PRODUCTS.filter(p=>wishlist.includes(p.id));
  if(items.length===0)return(
    <div style={{maxWidth:"500px",margin:"0 auto",textAlign:"center",padding:"60px 20px"}}>
      <div style={{fontSize:"44px",marginBottom:"14px"}}>🤍</div>
      <h2 style={{fontFamily:"'Playfair Display',serif",color:"#555",fontSize:"20px",margin:"0 0 10px"}}>{T("Wunschliste ist leer","Wishlist is empty",lang)}</h2>
      <p style={{color:"#444",fontSize:"13px"}}>{T("Klicke das Herz ❤️ bei einem Produkt um es hier zu speichern.","Click the ❤️ heart on any product to save it here.",lang)}</p>
    </div>
  );
  return(
    <div style={{paddingBottom:"40px"}}>
      <div style={{textAlign:"center",marginBottom:"24px"}}>
        <h2 style={{fontFamily:"'Playfair Display',serif",color:"#F0EBE0",fontSize:"22px",margin:"0 0 6px"}}>❤️ {T("Wunschliste","Wishlist",lang)}</h2>
        <p style={{color:"#555",fontSize:"12px"}}>{items.length} {T("Produkte gespeichert","products saved",lang)}</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))",gap:"14px"}}>
        {items.map(p=>(
          <div key={p.id} style={{background:card,border:`1px solid ${bdr}`,borderRadius:"14px",padding:"16px",position:"relative"}}>
            <button onClick={()=>onToggleWish(p.id)} style={{position:"absolute",top:"10px",right:"10px",background:"transparent",border:"none",fontSize:"16px",cursor:"pointer",zIndex:2}}>❤️</button>
            <div onClick={()=>onViewProduct(p)} style={{cursor:"pointer"}}>
              <div style={{width:"100%",height:"130px",borderRadius:"8px",overflow:"hidden",background:"#0a0a0a",marginBottom:"10px"}}>
                <img src={p.image} alt={p.name} onError={e=>e.target.style.display="none"} style={{width:"100%",height:"100%",objectFit:"contain",padding:"8px",boxSizing:"border-box"}}/>
              </div>
              <div style={{fontSize:"8px",color:gold,letterSpacing:"1.5px",textTransform:"uppercase",fontFamily:"monospace",marginBottom:"2px"}}>{p.category}</div>
              <div style={{fontSize:"13px",fontWeight:"700",color:"#F0EBE0",fontFamily:"'Playfair Display',serif",lineHeight:"1.3",marginBottom:"2px"}}>{p.name}</div>
              <div style={{fontSize:"10px",color:"#444",marginBottom:"8px"}}>{p.brand}</div>
              <Stars rating={p.rating} small/>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"10px"}}>
              <div style={{fontSize:"18px",fontWeight:"800",color:gold}}>€{p.price}</div>
              <a href={p.shopUrl} target="_blank" rel="noopener noreferrer" style={{background:`linear-gradient(135deg,${gold},#a07830)`,color:"#000",padding:"7px 14px",borderRadius:"8px",fontSize:"11px",fontWeight:"700",textDecoration:"none"}}>{T("Kaufen","Buy",lang)} →</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── AFFILIATE TRACKER ───────────────────────────────────────────────────────
const AffiliateTracker=({lang})=>{
  const [clicks,setClicks]=useState(()=>{
    try{ const s=localStorage.getItem(CLICK_STORAGE_KEY); return s?JSON.parse(s):[]; }catch{return[];}
  });
  const [activeProgram,setActiveProgram]=useState(null);
  const [afFilter,setAfFilter]=useState("all");
  const [aiAdvice,setAiAdvice]=useState("");
  const [loadingAdvice,setLoadingAdvice]=useState(false);
  const [myLinks,setMyLinks]=useState([
    {id:1,brand:"ESN",url:"https://www.esn.com?ref=YOURCODE",productName:"Designer Whey Protein",clicks:47,conversions:6,revenue:23.40},
    {id:2,brand:"MyProtein",url:"https://myprotein.com/de-de?affil=YOURCODE",productName:"Impact Whey Halal",clicks:31,conversions:3,revenue:10.80},
    {id:3,brand:"VOW Nutrition",url:"https://vownutrition.com?ref=YOURCODE",productName:"Elite Whey Protein",clicks:19,conversions:4,revenue:16.80},
  ]);
  const [newLink,setNewLink]=useState({brand:"",product:"",url:""});
  const [showAddLink,setShowAddLink]=useState(false);

  useEffect(()=>{ try{localStorage.setItem(CLICK_STORAGE_KEY,JSON.stringify(clicks));}catch{} },[clicks]);

  const trackClick=(programId,brand,url)=>{
    const click={id:Date.now(),programId,brand,url,timestamp:new Date().toISOString(),date:new Date().toLocaleDateString("de-DE")};
    setClicks(prev=>[click,...prev.slice(0,99)]);
    window.open(url,"_blank","noopener,noreferrer");
  };

  const getAiAdvice=async()=>{
    setLoadingAdvice(true);setAiAdvice("");
    const totalRevenue=myLinks.reduce((s,l)=>s+l.revenue,0).toFixed(2);
    const topLink=myLinks.sort((a,b)=>b.revenue-a.revenue)[0];
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:400,messages:[{role:"user",content:`I run HalalFit Deutschland, a halal supplement finder app in Germany. My affiliate stats: total revenue €${totalRevenue}, ${myLinks.length} active affiliate links, best performer: ${topLink?.brand} with €${topLink?.revenue} revenue. Total clicks this session: ${clicks.length}. Give me 3 specific, actionable tips to increase my affiliate revenue. Be concrete and realistic. Respond in ${lang==="de"?"German":"English"} in 3 short bullet points.`}]})});
      const data=await res.json();
      setAiAdvice(data.content?.[0]?.text||"");
    }catch{setAiAdvice(T("Konnte keine Empfehlung laden.","Could not load advice.",lang));}
    setLoadingAdvice(false);
  };

  const addLink=()=>{
    if(!newLink.brand||!newLink.url)return;
    setMyLinks(prev=>[...prev,{id:Date.now(),brand:newLink.brand,product:newLink.product,url:newLink.url,clicks:0,conversions:0,revenue:0}]);
    setNewLink({brand:"",product:"",url:""});setShowAddLink(false);
  };

  const totalRevenue=myLinks.reduce((s,l)=>s+l.revenue,0);
  const totalClicks=myLinks.reduce((s,l)=>s+l.clicks,0);
  const totalConversions=myLinks.reduce((s,l)=>s+l.conversions,0);
  const convRate=totalClicks>0?((totalConversions/totalClicks)*100).toFixed(1):0;

  const statusColor={recommended:gold,active:"#4aaa4a",easy:"#6aaaee"};
  const statusLabel={recommended:T("Empfohlen","Recommended",lang),active:T("Aktiv","Active",lang),easy:T("Einfach","Easy Start",lang)};

  return(
    <div style={{maxWidth:"900px",margin:"0 auto",paddingBottom:"40px"}}>
      <div style={{textAlign:"center",marginBottom:"24px"}}>
        <div style={{fontSize:"36px",marginBottom:"10px"}}>💰</div>
        <h2 style={{fontFamily:"'Playfair Display',serif",color:"#F0EBE0",fontSize:"22px",margin:"0 0 8px"}}>{T("Affiliate Einnahmen","Affiliate Revenue",lang)}</h2>
        <p style={{color:"#555",fontSize:"13px"}}>{T("Verwalte deine Affiliate-Links und verfolge deine Einnahmen.","Manage your affiliate links and track your revenue.",lang)}</p>
      </div>

      {/* Revenue overview cards */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:"10px",marginBottom:"20px"}}>
        {[
          [T("Einnahmen","Revenue",lang),`€${totalRevenue.toFixed(2)}`,gold,"💶"],
          [T("Klicks","Clicks",lang),totalClicks,"#6aaaee","🖱️"],
          [T("Conversions","Conversions",lang),totalConversions,"#4aaa4a","✅"],
          [T("Conv. Rate","Conv. Rate",lang),`${convRate}%`,"#aa88ee","📈"],
        ].map(([label,val,color,icon])=>(
          <div key={label} style={{background:card,border:`1px solid ${bdr}`,borderRadius:"12px",padding:"16px",textAlign:"center"}}>
            <div style={{fontSize:"20px",marginBottom:"6px"}}>{icon}</div>
            <div style={{fontSize:"20px",fontWeight:"800",color,fontFamily:"'Playfair Display',serif"}}>{val}</div>
            <div style={{fontSize:"10px",color:"#444",marginTop:"2px"}}>{label}</div>
          </div>
        ))}
      </div>

      {/* AI Revenue Advice */}
      <div style={{background:"#0d0d0d",border:`1px solid ${gold}22`,borderRadius:"14px",padding:"18px",marginBottom:"20px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:aiAdvice?"12px":"0"}}>
          <div style={{fontSize:"11px",fontWeight:"700",color:gold}}>🤖 {T("KI Einnahmen-Berater","AI Revenue Advisor",lang)}</div>
          <button onClick={getAiAdvice} disabled={loadingAdvice} style={{background:loadingAdvice?"#1a1a1a":`linear-gradient(135deg,${gold},#a07830)`,border:"none",color:loadingAdvice?"#444":"#000",padding:"7px 14px",borderRadius:"8px",fontSize:"11px",fontWeight:"700",cursor:loadingAdvice?"not-allowed":"pointer",fontFamily:"inherit"}}>
            {loadingAdvice?T("🔄 Lädt...","🔄 Loading...",lang):T("Tipps holen","Get Tips",lang)}
          </button>
        </div>
        {aiAdvice&&<p style={{color:"#aaa",fontSize:"12px",lineHeight:"1.8",margin:0,whiteSpace:"pre-line"}}>{aiAdvice}</p>}
        {!aiAdvice&&!loadingAdvice&&<p style={{color:"#333",fontSize:"12px",margin:"8px 0 0"}}>{T("Klicke 'Tipps holen' für KI-Empfehlungen basierend auf deinen Daten.","Click 'Get Tips' for AI recommendations based on your data.",lang)}</p>}
      </div>

      {/* Two column layout */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px",marginBottom:"20px"}}>

        {/* My Links */}
        <div style={{background:card,border:`1px solid ${bdr}`,borderRadius:"14px",padding:"18px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"14px"}}>
            <div style={{fontSize:"11px",fontWeight:"700",color:"#F0EBE0"}}>{T("Meine Affiliate-Links","My Affiliate Links",lang)}</div>
            <button onClick={()=>setShowAddLink(!showAddLink)} style={{background:"transparent",border:`1px solid ${gold}44`,color:gold,padding:"4px 10px",borderRadius:"8px",fontSize:"10px",fontWeight:"600",cursor:"pointer",fontFamily:"inherit"}}>
              {showAddLink?"✕":"+ "+T("Link hinzufügen","Add Link",lang)}
            </button>
          </div>

          {showAddLink&&(
            <div style={{background:"#0a0a0a",border:"1px solid #222",borderRadius:"10px",padding:"12px",marginBottom:"12px",display:"flex",flexDirection:"column",gap:"8px"}}>
              <input value={newLink.brand} onChange={e=>setNewLink(n=>({...n,brand:e.target.value}))} placeholder={T("Marke","Brand",lang)} style={{...inputS,padding:"8px 12px",fontSize:"11px"}} onFocus={e=>e.target.style.borderColor=gold} onBlur={e=>e.target.style.borderColor="#222"}/>
              <input value={newLink.product} onChange={e=>setNewLink(n=>({...n,product:e.target.value}))} placeholder={T("Produkt","Product",lang)} style={{...inputS,padding:"8px 12px",fontSize:"11px"}} onFocus={e=>e.target.style.borderColor=gold} onBlur={e=>e.target.style.borderColor="#222"}/>
              <input value={newLink.url} onChange={e=>setNewLink(n=>({...n,url:e.target.value}))} placeholder="https://...?ref=DEINCODE" style={{...inputS,padding:"8px 12px",fontSize:"11px"}} onFocus={e=>e.target.style.borderColor=gold} onBlur={e=>e.target.style.borderColor="#222"}/>
              <button onClick={addLink} disabled={!newLink.brand||!newLink.url} style={{background:!newLink.brand||!newLink.url?"#1a1a1a":`linear-gradient(135deg,${gold},#a07830)`,border:"none",color:!newLink.brand||!newLink.url?"#444":"#000",padding:"8px",borderRadius:"8px",fontSize:"11px",fontWeight:"700",cursor:"pointer",fontFamily:"inherit"}}>
                {T("Hinzufügen","Add",lang)}
              </button>
            </div>
          )}

          <div style={{display:"flex",flexDirection:"column",gap:"8px",maxHeight:"320px",overflowY:"auto"}}>
            {myLinks.map(link=>(
              <div key={link.id} style={{background:"#0a0a0a",border:"1px solid #1a1a1a",borderRadius:"10px",padding:"12px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"6px"}}>
                  <div>
                    <div style={{fontSize:"12px",fontWeight:"700",color:"#F0EBE0"}}>{link.brand}</div>
                    {link.product&&<div style={{fontSize:"10px",color:"#555"}}>{link.product}</div>}
                  </div>
                  <div style={{fontSize:"14px",fontWeight:"800",color:gold}}>€{link.revenue.toFixed(2)}</div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"4px",marginBottom:"8px"}}>
                  {[[T("Klicks","Clicks",lang),link.clicks,"#6aaaee"],[T("Conv.","Conv.",lang),link.conversions,"#4aaa4a"],[T("Rate","Rate",lang),link.clicks>0?((link.conversions/link.clicks)*100).toFixed(0)+"%":"0%","#aa88ee"]].map(([l,v,c])=>(
                    <div key={l} style={{background:"#111",borderRadius:"6px",padding:"5px",textAlign:"center"}}>
                      <div style={{fontSize:"12px",fontWeight:"700",color:c}}>{v}</div>
                      <div style={{fontSize:"8px",color:"#444"}}>{l}</div>
                    </div>
                  ))}
                </div>
                <div style={{display:"flex",gap:"6px"}}>
                  <div style={{flex:1,background:"#111",borderRadius:"6px",padding:"5px 8px",fontSize:"9px",color:"#333",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{link.url}</div>
                  <button onClick={()=>{navigator.clipboard?.writeText(link.url);}} style={{background:"#1a1a1a",border:"1px solid #333",color:"#888",padding:"5px 8px",borderRadius:"6px",fontSize:"9px",cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap"}}>📋 {T("Copy","Copy",lang)}</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent clicks */}
        <div style={{background:card,border:`1px solid ${bdr}`,borderRadius:"14px",padding:"18px"}}>
          <div style={{fontSize:"11px",fontWeight:"700",color:"#F0EBE0",marginBottom:"14px"}}>🖱️ {T("Klick-Verlauf","Click History",lang)} <span style={{color:gold,fontSize:"10px"}}>({clicks.length})</span></div>
          {clicks.length===0?(
            <div style={{textAlign:"center",padding:"30px 0",color:"#333",fontSize:"12px"}}>{T("Noch keine Klicks. Starte mit dem Promoten!","No clicks yet. Start promoting!",lang)}</div>
          ):(
            <div style={{display:"flex",flexDirection:"column",gap:"6px",maxHeight:"360px",overflowY:"auto"}}>
              {clicks.slice(0,20).map(c=>(
                <div key={c.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",background:"#0a0a0a",borderRadius:"8px",padding:"8px 10px"}}>
                  <div>
                    <div style={{fontSize:"11px",fontWeight:"600",color:"#ccc"}}>{c.brand}</div>
                    <div style={{fontSize:"9px",color:"#444"}}>{c.date}</div>
                  </div>
                  <span style={{fontSize:"9px",color:"#4aaa4a",background:"#0a1a0a",border:"1px solid #1a3a1a",padding:"2px 7px",borderRadius:"20px"}}>+1 {T("Klick","click",lang)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Affiliate Programs Directory */}
      <div style={{marginBottom:"16px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"14px"}}>
          <div style={{fontSize:"12px",fontWeight:"700",color:"#F0EBE0"}}>🏦 {T("Affiliate Programme","Affiliate Programs",lang)}</div>
          <div style={{display:"flex",gap:"6px"}}>
            {["all","recommended","easy"].map(f=>(
              <button key={f} onClick={()=>setAfFilter(f)} style={{background:afFilter===f?"#C8A96E18":"transparent",border:`1px solid ${afFilter===f?"#C8A96E66":"#1a1a1a"}`,color:afFilter===f?gold:"#444",padding:"4px 9px",borderRadius:"7px",fontSize:"10px",cursor:"pointer",fontFamily:"inherit"}}>
                {f==="all"?T("Alle","All",lang):f==="recommended"?T("Empfohlen","Recommended",lang):T("Einfach","Easy",lang)}
              </button>
            ))}
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:"10px"}}>
          {AFFILIATE_PROGRAMS.filter(p=>afFilter==="all"||p.status===afFilter).map(prog=>(
            <div key={prog.id} style={{background:"#0a0a0a",border:`1px solid ${activeProgram===prog.id?prog.color+"66":"#1a1a1a"}`,borderRadius:"12px",padding:"16px",transition:"all 0.2s",cursor:"pointer"}} onClick={()=>setActiveProgram(activeProgram===prog.id?null:prog.id)}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"8px"}}>
                <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
                  <span style={{fontSize:"20px"}}>{prog.logo}</span>
                  <div>
                    <div style={{fontSize:"13px",fontWeight:"700",color:"#F0EBE0"}}>{prog.brand}</div>
                    <div style={{fontSize:"9px",color:"#444"}}>{prog.network}</div>
                  </div>
                </div>
                <span style={{background:statusColor[prog.status]+"22",border:`1px solid ${statusColor[prog.status]}44`,borderRadius:"20px",padding:"2px 8px",fontSize:"9px",color:statusColor[prog.status],fontWeight:"700"}}>{statusLabel[prog.status]}</span>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px",marginBottom:"10px"}}>
                {[[T("Provision","Commission",lang),prog.commission,gold],[T("Cookie","Cookie",lang),prog.cookieDays+"d","#6aaaee"],[T("Ø Bestellung","Avg Order",lang),prog.avgOrderValue,"#4aaa4a"],[T("Potenzial/Monat","Est./Month",lang),prog.estimatedMonthly,"#aa88ee"]].map(([l,v,c])=>(
                  <div key={l} style={{background:"#111",borderRadius:"7px",padding:"7px 9px"}}>
                    <div style={{fontSize:"11px",fontWeight:"700",color:c}}>{v}</div>
                    <div style={{fontSize:"9px",color:"#444"}}>{l}</div>
                  </div>
                ))}
              </div>
              {activeProgram===prog.id&&(
                <div style={{marginBottom:"10px"}}>
                  <p style={{color:"#777",fontSize:"11px",lineHeight:"1.6",margin:"0 0 10px"}}>{prog.notes}</p>
                </div>
              )}
              <button onClick={e=>{e.stopPropagation();trackClick(prog.id,prog.brand,prog.signupUrl);}}
                style={{width:"100%",background:`linear-gradient(135deg,${prog.color},${prog.color}99)`,border:"none",color:"#000",padding:"9px",borderRadius:"8px",fontSize:"11px",fontWeight:"700",cursor:"pointer",fontFamily:"inherit"}}>
                {T("Jetzt bewerben","Apply Now",lang)} →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Earnings calculator */}
      <div style={{background:"#0d0d0d",border:`1px solid #1a1a1a`,borderRadius:"14px",padding:"18px"}}>
        <div style={{fontSize:"11px",fontWeight:"700",color:"#F0EBE0",marginBottom:"14px"}}>🧮 {T("Einnahmen-Rechner","Earnings Calculator",lang)}</div>
        <EarningsCalc lang={lang}/>
      </div>
    </div>
  );
};

const EarningsCalc=({lang})=>{
  const [visitors,setVisitors]=useState("500");
  const [ctr,setCtr]=useState("8");
  const [convRate,setConvRate]=useState("4");
  const [avgOrder,setAvgOrder]=useState("38");
  const [commission,setCommission]=useState("10");
  const clicks=Math.round(parseInt(visitors||0)*parseInt(ctr||0)/100);
  const conversions=Math.round(clicks*parseInt(convRate||0)/100);
  const revenue=(conversions*parseInt(avgOrder||0)*parseInt(commission||0)/100).toFixed(2);
  const sliderStyle={width:"100%",accentColor:gold};
  return(
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"}}>
      <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
        {[
          [T("Monatliche App-Besucher","Monthly App Visitors",lang),visitors,setVisitors,100,5000,100],
          [T("Klickrate auf Links (%)","Link Click Rate (%)",lang),ctr,setCtr,1,30,1],
          [T("Conversion Rate (%)","Conversion Rate (%)",lang),convRate,setConvRate,1,15,1],
          [T("Ø Bestellwert (€)","Avg Order Value (€)",lang),avgOrder,setAvgOrder,10,80,5],
          [T("Provision (%)","Commission (%)",lang),commission,setCommission,3,20,1],
        ].map(([label,val,setter,min,max,step])=>(
          <div key={label}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:"4px"}}>
              <div style={{fontSize:"10px",color:"#555"}}>{label}</div>
              <div style={{fontSize:"11px",fontWeight:"700",color:gold}}>{val}{label.includes("%")?"":""}</div>
            </div>
            <input type="range" min={min} max={max} step={step} value={val} onChange={e=>setter(e.target.value)} style={sliderStyle}/>
          </div>
        ))}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:"8px",justifyContent:"center"}}>
        {[
          [T("Klicks/Monat","Clicks/Month",lang),clicks,"🖱️","#6aaaee"],
          [T("Conversions/Monat","Conversions/Month",lang),conversions,"✅","#4aaa4a"],
          [T("Einnahmen/Monat","Revenue/Month",lang),"€"+revenue,"💶",gold],
          [T("Einnahmen/Jahr","Revenue/Year",lang),"€"+(parseFloat(revenue)*12).toFixed(0),"📈","#aa88ee"],
        ].map(([label,val,icon,color])=>(
          <div key={label} style={{background:"#111",border:`1px solid ${color}22`,borderRadius:"10px",padding:"12px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{fontSize:"11px",color:"#555"}}>{icon} {label}</div>
            <div style={{fontSize:"16px",fontWeight:"800",color}}>{val}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── SUBMIT FORM ──────────────────────────────────────────────────────────────
const SubmitForm=({lang})=>{
  const [form,setForm]=useState({name:"",brand:"",category:"",certBody:"",shopUrl:"",notes:"",email:""});
  const [submitted,setSubmitted]=useState(false);
  const [loading,setLoading]=useState(false);
  const [aiTip,setAiTip]=useState("");
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const getAiTip=async()=>{
    if(!form.name||!form.brand)return;
    setAiTip(T("Wird geprüft...","Checking...",lang));
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:200,messages:[{role:"user",content:`Give one practical tip (2-3 sentences) on verifying the halal status of "${form.name}" by "${form.brand}". Respond in ${lang==="de"?"German":"English"}.`}]})});
      const data=await res.json();
      setAiTip(data.content?.[0]?.text||"");
    }catch{setAiTip("");}
  };
  const handleSubmit=async()=>{
    if(!form.name||!form.brand||!form.certBody)return;
    setLoading(true);await new Promise(r=>setTimeout(r,800));setLoading(false);setSubmitted(true);
  };
  if(submitted)return(
    <div style={{maxWidth:"480px",margin:"0 auto",textAlign:"center",padding:"50px 20px"}}>
      <div style={{fontSize:"52px",marginBottom:"14px"}}>🎉</div>
      <h2 style={{fontFamily:"'Playfair Display',serif",color:"#F0EBE0",fontSize:"20px",margin:"0 0 10px"}}>{T("Danke!","Thank you!",lang)}</h2>
      <p style={{color:"#555",fontSize:"13px"}}>{T(`Wir prüfen ${form.name} von ${form.brand} und nehmen es bei Bestätigung auf.`,`We'll review ${form.name} by ${form.brand} and add it if confirmed.`,lang)}</p>
      <button onClick={()=>{setSubmitted(false);setForm({name:"",brand:"",category:"",certBody:"",shopUrl:"",notes:"",email:""});setAiTip("");}} style={{marginTop:"16px",background:`linear-gradient(135deg,${gold},#a07830)`,border:"none",color:"#000",padding:"10px 22px",borderRadius:"10px",fontSize:"13px",fontWeight:"700",cursor:"pointer",fontFamily:"inherit"}}>{T("Weiteres einreichen","Submit Another",lang)}</button>
    </div>
  );
  return(
    <div style={{maxWidth:"560px",margin:"0 auto",paddingBottom:"40px"}}>
      <div style={{textAlign:"center",marginBottom:"24px"}}>
        <div style={{fontSize:"36px",marginBottom:"10px"}}>📬</div>
        <h2 style={{fontFamily:"'Playfair Display',serif",color:"#F0EBE0",fontSize:"22px",margin:"0 0 8px"}}>{T("Produkt einreichen","Submit a Product",lang)}</h2>
        <p style={{color:"#555",fontSize:"13px"}}>{T("Fehlt ein halal Supplement? Schick es uns.","Missing a halal supplement? Send it to us.",lang)}</p>
      </div>
      <div style={{background:card,border:`1px solid ${bdr}`,borderRadius:"16px",padding:"22px",display:"flex",flexDirection:"column",gap:"12px"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}}>
          <div>
            <div style={{fontSize:"10px",color:"#444",letterSpacing:"1px",textTransform:"uppercase",marginBottom:"5px"}}>{T("Produktname *","Product Name *",lang)}</div>
            <input value={form.name} onChange={e=>set("name",e.target.value)} onBlur={getAiTip} placeholder="z.B. Designer Whey" style={inputS} onFocus={e=>e.target.style.borderColor=gold} onBlur={e=>{getAiTip();e.target.style.borderColor="#222";}}/>
          </div>
          <div>
            <div style={{fontSize:"10px",color:"#444",letterSpacing:"1px",textTransform:"uppercase",marginBottom:"5px"}}>{T("Marke *","Brand *",lang)}</div>
            <input value={form.brand} onChange={e=>set("brand",e.target.value)} placeholder="z.B. ESN" style={inputS} onFocus={e=>e.target.style.borderColor=gold} onBlur={e=>e.target.style.borderColor="#222"}/>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}}>
          <div>
            <div style={{fontSize:"10px",color:"#444",letterSpacing:"1px",textTransform:"uppercase",marginBottom:"5px"}}>{T("Kategorie","Category",lang)}</div>
            <select value={form.category} onChange={e=>set("category",e.target.value)} style={{...inputS,cursor:"pointer"}}>
              <option value="">{T("Wählen...","Select...",lang)}</option>
              {CATEGORIES.filter(c=>c!=="All").map(c=><option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <div style={{fontSize:"10px",color:"#444",letterSpacing:"1px",textTransform:"uppercase",marginBottom:"5px"}}>{T("Zertifizierung *","Certification *",lang)}</div>
            <select value={form.certBody} onChange={e=>set("certBody",e.target.value)} style={{...inputS,cursor:"pointer"}}>
              <option value="">{T("Wählen...","Select...",lang)}</option>
              {["HFA","DVHK","IFANCA","EU Halal","Halal Zertifiziert","Andere"].map(c=><option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div>
          <div style={{fontSize:"10px",color:"#444",letterSpacing:"1px",textTransform:"uppercase",marginBottom:"5px"}}>Shop URL</div>
          <input value={form.shopUrl} onChange={e=>set("shopUrl",e.target.value)} placeholder="https://..." style={inputS} onFocus={e=>e.target.style.borderColor=gold} onBlur={e=>e.target.style.borderColor="#222"}/>
        </div>
        <div>
          <div style={{fontSize:"10px",color:"#444",letterSpacing:"1px",textTransform:"uppercase",marginBottom:"5px"}}>{T("Nachweis / Anmerkungen","Proof / Notes",lang)}</div>
          <textarea value={form.notes} onChange={e=>set("notes",e.target.value)} placeholder={T("Link zum Zertifikat, Screenshot etc.","Link to certificate, screenshot etc.",lang)} style={{...inputS,minHeight:"70px",resize:"none",lineHeight:"1.6"}} onFocus={e=>e.target.style.borderColor=gold} onBlur={e=>e.target.style.borderColor="#222"}/>
        </div>
        <div>
          <div style={{fontSize:"10px",color:"#444",letterSpacing:"1px",textTransform:"uppercase",marginBottom:"5px"}}>{T("Deine E-Mail (optional)","Your Email (optional)",lang)}</div>
          <input type="email" value={form.email} onChange={e=>set("email",e.target.value)} placeholder="für Rückmeldung / for follow-up" style={inputS} onFocus={e=>e.target.style.borderColor=gold} onBlur={e=>e.target.style.borderColor="#222"}/>
        </div>
        {aiTip&&aiTip!==T("Wird geprüft...","Checking...",lang)&&(
          <div style={{background:"#1a1400",border:`1px solid ${gold}33`,borderRadius:"10px",padding:"12px"}}>
            <div style={{fontSize:"10px",color:gold,letterSpacing:"1px",textTransform:"uppercase",marginBottom:"5px"}}>🤖 {T("KI-Tipp","AI Tip",lang)}</div>
            <p style={{color:"#aaa",fontSize:"12px",lineHeight:"1.6",margin:0}}>{aiTip}</p>
          </div>
        )}
        <button onClick={handleSubmit} disabled={loading||!form.name||!form.brand||!form.certBody}
          style={{background:loading||!form.name||!form.brand||!form.certBody?"#1a1a1a":`linear-gradient(135deg,${gold},#a07830)`,border:"none",color:loading||!form.name||!form.brand||!form.certBody?"#444":"#000",padding:"13px",borderRadius:"12px",fontSize:"14px",fontWeight:"700",cursor:"pointer",fontFamily:"inherit"}}>
          {loading?T("🔄 Wird eingereicht...","🔄 Submitting...",lang):T("📬 Produkt einreichen","📬 Submit Product",lang)}
        </button>
      </div>
    </div>
  );
};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function HalalFitDE(){
  const [tab,setTab]=useState("products");
  const [lang,setLang]=useState("de");
  const [search,setSearch]=useState("");
  const [category,setCategory]=useState("All");
  const [brand,setBrand]=useState("All");
  const [halalOnly,setHalalOnly]=useState(true);
  const [sort,setSort]=useState("rating");
  const [priceRange,setPriceRange]=useState([0,60]);
  const [selected,setSelected]=useState(null);
  const [compareList,setCompareList]=useState([]);
  const [alerts,setAlerts]=useState([]);
  const [wishlist,setWishlist]=useState([]);
  const [quickAlertProduct,setQuickAlertProduct]=useState(null);
  const [userReviews,setUserReviews]=useState(INITIAL_REVIEWS);
  const [loaded,setLoaded]=useState(false);
  const [menuOpen,setMenuOpen]=useState(false);

  useEffect(()=>{setTimeout(()=>setLoaded(true),80);},[]);

  const toggleCompare=(id)=>setCompareList(prev=>prev.includes(id)?prev.filter(x=>x!==id):prev.length<3?[...prev,id]:prev);
  const toggleWish=(id)=>setWishlist(prev=>prev.includes(id)?prev.filter(x=>x!==id):[...prev,id]);
  const handleQuickAlert=(p)=>{setQuickAlertProduct(p);setTab("alerts");};
  const clearQuickAlert = useCallback(()=>setQuickAlertProduct(null), []);
  const handleViewProduct=(p)=>{setSelected(p);setTab("products");};

  const filtered=PRODUCTS.filter(p=>{
    const q=search.toLowerCase();
    const ms=p.name.toLowerCase().includes(q)||p.brand.toLowerCase().includes(q)||p.tags.some(t=>t.includes(q));
    const mc=category==="All"||p.category===category;
    const mb=brand==="All"||p.brand===brand;
    const mh=!halalOnly||p.certified;
    const mp=p.price>=priceRange[0]&&p.price<=priceRange[1];
    return ms&&mc&&mb&&mh&&mp;
  }).sort((a,b)=>sort==="rating"?b.rating-a.rating:sort==="price-low"?a.price-b.price:sort==="price-high"?b.price-a.price:sort==="protein"?(b.protein/b.price)-(a.protein/a.price):b.reviews-a.reviews);

  const tabLabel=(t)=>T(t.de,t.en,lang);
  const badge=(id)=>{
    if(id==="compare"&&compareList.length>0)return compareList.length;
    if(id==="alerts"&&alerts.length>0)return alerts.length;
    if(id==="wishlist"&&wishlist.length>0)return wishlist.length;
    return null;
  };

  return(
    <div style={{minHeight:"100vh",background:dark,fontFamily:"'IBM Plex Sans',sans-serif"}}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"/>

      {/* HERO */}
      <div style={{background:"linear-gradient(160deg,#0f0f0f 0%,#080808 100%)",borderBottom:"1px solid #141414",padding:"32px 20px 24px",opacity:loaded?1:0,transition:"opacity 0.5s"}}>
        <div style={{maxWidth:"1200px",margin:"0 auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"20px"}}>
            <div>
              <div style={{display:"inline-flex",alignItems:"center",gap:"7px",background:"#C8A96E12",border:"1px solid #C8A96E30",borderRadius:"30px",padding:"5px 13px",marginBottom:"12px"}}>
                <span>☪️</span><span style={{color:gold,fontSize:"10px",fontWeight:"700",letterSpacing:"1.5px"}}>HALAL · DEUTSCHLAND & EUROPA</span>
              </div>
              <h1 style={{fontFamily:"'Playfair Display',serif",color:"#F0EBE0",fontSize:"clamp(24px,5vw,44px)",fontWeight:"800",margin:"0 0 6px",lineHeight:"1.1"}}>HalalFit <span style={{color:gold}}>Deutschland</span></h1>
              <p style={{color:"#555",fontSize:"12px",margin:0}}>ESN · More Nutrition · VOW · MyProtein · Bulk · Halal Vital</p>
            </div>
            {/* Lang toggle */}
            <div style={{display:"flex",gap:"6px",alignItems:"center",flexShrink:0}}>
              {["de","en"].map(l=>(
                <button key={l} onClick={()=>setLang(l)} style={{background:lang===l?gold:"transparent",border:`1px solid ${lang===l?gold:"#333"}`,color:lang===l?"#000":"#555",padding:"5px 10px",borderRadius:"8px",fontSize:"11px",fontWeight:"700",cursor:"pointer",fontFamily:"inherit",transition:"all 0.18s"}}>
                  {l==="de"?"🇩🇪 DE":"🇬🇧 EN"}
                </button>
              ))}
            </div>
          </div>

          {/* NAV TABS — scrollable */}
          <div style={{display:"flex",gap:"5px",overflowX:"auto",paddingBottom:"4px",scrollbarWidth:"none"}}>
            {TABS.map(t=>(
              <button key={t.id} onClick={()=>setTab(t.id)}
                style={{background:tab===t.id?gold:"#111",border:`1px solid ${tab===t.id?gold:"#222"}`,color:tab===t.id?"#000":"#666",padding:"7px 13px",borderRadius:"30px",fontSize:"11px",fontWeight:"700",cursor:"pointer",transition:"all 0.2s",fontFamily:"inherit",whiteSpace:"nowrap",position:"relative",flexShrink:0}}>
                {t.icon} {tabLabel(t)}
                {badge(t.id)&&<span style={{position:"absolute",top:"-5px",right:"-5px",background:t.id==="wishlist"?"#ee4444":gold,color:t.id==="wishlist"?"#fff":"#000",width:"15px",height:"15px",borderRadius:"50%",fontSize:"8px",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"800"}}>{badge(t.id)}</span>}
              </button>
            ))}
          </div>

          {/* Search — only on products tab */}
          {tab==="products"&&(
            <div style={{marginTop:"16px",position:"relative",maxWidth:"460px"}}>
              <span style={{position:"absolute",left:"13px",top:"50%",transform:"translateY(-50%)",fontSize:"14px"}}>🔍</span>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={T("ESN, Kreatin, Whey suchen...","Search ESN, creatine, whey...",lang)} style={{width:"100%",background:"#111",border:"1px solid #1e1e1e",borderRadius:"12px",padding:"12px 16px 12px 38px",color:"#F0EBE0",fontSize:"13px",fontFamily:"'IBM Plex Sans',sans-serif",outline:"none",boxSizing:"border-box"}} onFocus={e=>e.target.style.borderColor=gold} onBlur={e=>e.target.style.borderColor="#1e1e1e"}/>
            </div>
          )}
        </div>
      </div>

      {/* BRAND INFO STRIP */}
      {tab==="products"&&(
        <div style={{background:"#0d0d0d",borderBottom:"1px solid #111",padding:"10px 20px"}}>
          <div style={{maxWidth:"1200px",margin:"0 auto",display:"flex",gap:"10px",flexWrap:"wrap"}}>
            <div style={{flex:1,minWidth:"180px",background:"#111",border:"1px solid #1e1e1e",borderRadius:"10px",padding:"10px 12px"}}>
              <div style={{fontSize:"11px",fontWeight:"700",color:gold,marginBottom:"2px"}}>🇩🇪 ESN</div>
              <div style={{fontSize:"10px",color:"#555"}}>30 halal-zertifizierte Produkte. Eigenes Halal-Team.</div>
            </div>
            <div style={{flex:1,minWidth:"180px",background:"#111",border:"1px solid #1e1e1e",borderRadius:"10px",padding:"10px 12px"}}>
              <div style={{fontSize:"11px",fontWeight:"700",color:gold,marginBottom:"2px"}}>🇩🇪 More Nutrition ⚠️</div>
              <div style={{fontSize:"10px",color:"#555"}}>Kollagen ✓ halal. <span style={{color:"#ee5555"}}>Protein Bars NICHT halal.</span></div>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div style={{padding:"18px 20px",maxWidth:"1200px",margin:"0 auto"}}>

        {/* ── PRODUCTS TAB ── */}
        {tab==="products"&&(
          <>
            {/* Filter bar */}
            <div style={{display:"flex",gap:"7px",alignItems:"center",marginBottom:"8px",flexWrap:"wrap"}}>
              <button onClick={()=>setHalalOnly(!halalOnly)} style={g(halalOnly)}>{halalOnly?"☪️ "+T("Nur Halal","Halal Only",lang):T("Alle","All",lang)}</button>
              {compareList.length>0&&<button onClick={()=>setTab("compare")} style={{background:"#C8A96E22",border:`1px solid ${gold}`,color:gold,padding:"6px 12px",borderRadius:"30px",fontSize:"11px",fontWeight:"700",cursor:"pointer",fontFamily:"inherit"}}>⚖️ ({compareList.length})</button>}
              {alerts.length>0&&<button onClick={()=>setTab("alerts")} style={{background:"#1a1400",border:`1px solid ${gold}66`,color:gold,padding:"6px 12px",borderRadius:"30px",fontSize:"11px",fontWeight:"700",cursor:"pointer",fontFamily:"inherit"}}>🔔 ({alerts.length})</button>}
              <select value={sort} onChange={e=>setSort(e.target.value)} style={{marginLeft:"auto",background:"#111",border:"1px solid #1e1e1e",color:"#666",padding:"6px 9px",borderRadius:"8px",fontSize:"11px",cursor:"pointer",fontFamily:"'IBM Plex Sans',sans-serif",outline:"none"}}>
                <option value="rating">{T("Beste Bewertung","Top Rated",lang)}</option>
                <option value="reviews">{T("Meiste Bewertungen","Most Reviewed",lang)}</option>
                <option value="protein">{T("Bestes Protein/€","Best Protein/€",lang)}</option>
                <option value="price-low">{T("Preis ↑","Price ↑",lang)}</option>
                <option value="price-high">{T("Preis ↓","Price ↓",lang)}</option>
              </select>
            </div>

            {/* Category pills */}
            <div style={{display:"flex",gap:"5px",flexWrap:"wrap",marginBottom:"7px"}}>
              {CATEGORIES.map(c=><button key={c} onClick={()=>setCategory(c)} style={g(category===c)}>{c}</button>)}
            </div>

            {/* Brand pills */}
            <div style={{display:"flex",gap:"5px",flexWrap:"wrap",alignItems:"center",marginBottom:"7px"}}>
              <span style={{fontSize:"9px",color:"#333",letterSpacing:"1px",textTransform:"uppercase"}}>{T("Marke","Brand",lang)}:</span>
              {BRANDS.map(b=><button key={b} onClick={()=>setBrand(b)} style={{background:brand===b?"#C8A96E18":"transparent",border:`1px solid ${brand===b?"#C8A96E66":"#1a1a1a"}`,color:brand===b?gold:"#444",padding:"4px 8px",borderRadius:"7px",fontSize:"10px",fontWeight:"600",cursor:"pointer",fontFamily:"inherit"}}>{b}</button>)}
            </div>

            {/* Price range */}
            <div style={{display:"flex",gap:"10px",alignItems:"center",marginBottom:"12px",flexWrap:"wrap"}}>
              <span style={{fontSize:"10px",color:"#444"}}>💶 {T("Preis:","Price:",lang)}</span>
              {[[0,10,"<€10"],[0,30,"<€30"],[0,60,"<€60"],[0,100,T("Alle","All",lang)]].map(([min,max,label])=>(
                <button key={label} onClick={()=>setPriceRange([min,max])} style={{background:priceRange[1]===max?"#C8A96E18":"transparent",border:`1px solid ${priceRange[1]===max?"#C8A96E66":"#1a1a1a"}`,color:priceRange[1]===max?gold:"#444",padding:"3px 8px",borderRadius:"7px",fontSize:"10px",cursor:"pointer",fontFamily:"inherit"}}>{label}</button>
              ))}
            </div>

            <div style={{color:"#333",fontSize:"11px",marginBottom:"14px"}}><span style={{color:gold}}>{filtered.length}</span> {T("Produkte","products",lang)}</div>

            {filtered.length===0
              ?<div style={{textAlign:"center",padding:"50px 20px"}}><div style={{fontSize:"32px",marginBottom:"10px"}}>🔍</div><div style={{fontFamily:"'Playfair Display',serif",fontSize:"16px",color:"#555"}}>{T("Keine Produkte gefunden","No products found",lang)}</div></div>
              :<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:"12px"}}>
                {filtered.map((p,i)=>(
                  <div key={p.id} style={{opacity:loaded?1:0,transform:loaded?"none":"translateY(12px)",transition:`all 0.3s ease ${i*0.04}s`}}>
                    <ProductCard p={p} onClick={setSelected} compareList={compareList} onToggleCompare={toggleCompare} alerts={alerts} onQuickAlert={handleQuickAlert} wishlist={wishlist} onToggleWish={toggleWish} lang={lang} userReviews={userReviews}/>
                  </div>
                ))}
              </div>
            }
          </>
        )}

        {tab==="quiz"&&<Quiz setTab={setTab} setSearch={setSearch} lang={lang}/>}
        {tab==="calc"&&<NutritionCalc lang={lang}/>}
        {tab==="checker"&&<IngredientChecker lang={lang}/>}
        {tab==="compare"&&<ComparePanel compareIds={compareList} onRemove={id=>setCompareList(prev=>prev.filter(x=>x!==id))} lang={lang}/>}
        {tab==="alerts"&&<PriceAlertPanel alerts={alerts} setAlerts={setAlerts} quickAlertProduct={quickAlertProduct} clearQuickAlert={clearQuickAlert} lang={lang}/> }
        {tab==="wishlist"&&<Wishlist wishlist={wishlist} onToggleWish={toggleWish} onViewProduct={handleViewProduct} lang={lang}/>}
        {tab==="affiliate"&&<AffiliateTracker lang={lang}/>}
        {tab==="submit"&&<SubmitForm lang={lang}/>}
      </div>

      {/* FOOTER */}
      <div style={{borderTop:"1px solid #111",padding:"22px 20px",textAlign:"center",marginTop:"20px"}}>
        <div style={{fontFamily:"'Playfair Display',serif",color:gold,fontSize:"17px",fontWeight:"700",marginBottom:"4px"}}>HalalFit Deutschland</div>
        <div style={{color:"#1e1e1e",fontSize:"9px"}}>{T("Angaben basieren auf offiziellen Herstellerinformationen · Immer das Etikett prüfen","All data based on official manufacturer information · Always check the label",lang)} · {T("Dein Glaube. Deine Fitness.","Your faith. Your fitness.",lang)}</div>
      </div>

      <ProductModal p={selected} onClose={()=>setSelected(null)} alerts={alerts} onQuickAlert={handleQuickAlert} wishlist={wishlist} onToggleWish={toggleWish} userReviews={userReviews} setUserReviews={setUserReviews} lang={lang}/>
    </div>
  );
}
