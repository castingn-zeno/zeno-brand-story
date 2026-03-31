/* ===== VIDEO HERO v2 SCRIPTS (4-phase timeline) ===== */
const vhC=document.getElementById('vhCanvas'),vhCtx=vhC.getContext('2d');
let vhW,vhH,vhT=0,vhIntensity=0;
function vhResize(){vhW=vhC.width=window.innerWidth;vhH=vhC.height=window.innerHeight}
vhResize();window.addEventListener('resize',vhResize);

/* Particles */
const vhParticles=[];for(let i=0;i<150;i++)vhParticles.push({x:Math.random()*2000,y:Math.random()*1200,vx:1+Math.random()*4,vy:(Math.random()-.5)*.5,size:Math.random()*2,alpha:Math.random()*.5+.1});
/* Data streams */
const vhStreams=[];for(let i=0;i<40;i++)vhStreams.push({x:Math.random()*2000,y:Math.random()*-1000,speed:2+Math.random()*5,chars:Array.from({length:8},()=>Math.floor(Math.random()*10)),alpha:Math.random()*.3+.05});

function vhDraw(){
  vhCtx.fillStyle='rgba(6,13,31,0.15)';vhCtx.fillRect(0,0,vhW,vhH);vhT++;
  /* Rushing particles */
  vhParticles.forEach(p=>{p.x+=p.vx*(1+vhIntensity*3);p.y+=p.vy;if(p.x>vhW+10){p.x=-10;p.y=Math.random()*vhH}
    vhCtx.beginPath();if(vhIntensity>.5){vhCtx.moveTo(p.x,p.y);vhCtx.lineTo(p.x-p.vx*8,p.y);vhCtx.strokeStyle=`rgba(74,144,217,${p.alpha*vhIntensity})`;vhCtx.lineWidth=p.size;vhCtx.stroke()}else{vhCtx.arc(p.x,p.y,p.size,0,Math.PI*2);vhCtx.fillStyle=`rgba(74,144,217,${p.alpha})`;vhCtx.fill()}});
  /* Matrix streams */
  vhCtx.font='12px Sora,Inter,sans-serif';
  vhStreams.forEach(s=>{s.y+=s.speed*(1+vhIntensity);if(s.y>vhH+200){s.y=-200;s.x=Math.random()*vhW}
    s.chars.forEach((ch,i)=>{const y=s.y+i*18;if(y>0&&y<vhH){const fade=i===0?s.alpha*2:s.alpha*(1-i*.1);vhCtx.fillStyle=i===0?`rgba(232,185,49,${fade})`:`rgba(47,109,196,${Math.max(0,fade)})`;vhCtx.fillText(ch,s.x,y)}});
    if(Math.random()<.1)s.chars[Math.floor(Math.random()*s.chars.length)]=Math.floor(Math.random()*10)});
  /* Wave lines */
  for(let l=0;l<3;l++){vhCtx.beginPath();vhCtx.strokeStyle=`rgba(47,109,196,${.15+l*.05})`;vhCtx.lineWidth=1.5;const yBase=vhH*(.3+l*.15),amp=40+l*20+vhIntensity*60,speed=.02+l*.005;for(let x=0;x<vhW;x+=4){const y=yBase+Math.sin(x*speed+vhT*.04)*amp+Math.sin(x*speed*2.3+vhT*.06)*(amp*.3)+Math.cos(x*speed*.7+vhT*.02)*(amp*.5);x===0?vhCtx.moveTo(x,y):vhCtx.lineTo(x,y)}vhCtx.stroke()}
  /* Bottom bars */
  const bW=4,bG=3,nB=Math.floor(vhW/(bW+bG));for(let i=0;i<nB;i++){const x=i*(bW+bG),h=Math.abs(Math.sin(vhT*.03+i*.2))*vhH*.15+Math.abs(Math.cos(vhT*.02+i*.3))*vhH*.08+vhIntensity*vhH*.05;vhCtx.fillStyle=`rgba(47,109,196,${.15+Math.sin(vhT*.05+i*.1)*.1})`;vhCtx.fillRect(x,vhH-h,bW,h)}
  requestAnimationFrame(vhDraw);
}
vhDraw();

/* Phase helpers */
function vhFlash(dur){const el=document.getElementById('vhFlash');el.style.transition='none';el.style.opacity='.7';setTimeout(()=>{el.style.transition=`opacity ${dur}ms ease-out`;el.style.opacity='0'},30)}
function vhGlitchBurst(dur){const el=document.getElementById('vhGlitch');el.style.background='linear-gradient(90deg,transparent 30%,rgba(74,144,217,.05) 30.5%,transparent 31%),linear-gradient(90deg,transparent 60%,rgba(232,185,49,.03) 60.5%,transparent 61%)';setTimeout(()=>{el.style.background='transparent'},dur)}
function vhShow(id,style){const el=document.getElementById(id);if(style==='slam'){el.style.transition='none';el.style.opacity='0';el.style.transform='scale(1.3)';el.offsetHeight;el.style.transition='all .35s cubic-bezier(.16,1,.3,1)';el.style.opacity='1';el.style.transform='scale(1)'}else if(style==='rise'){el.style.transition='none';el.style.opacity='0';el.style.transform='translateY(40px) scale(.95)';el.offsetHeight;el.style.transition='all .5s cubic-bezier(.16,1,.3,1)';el.style.opacity='1';el.style.transform='translateY(0) scale(1)'}else if(style==='zoom'){el.style.transition='none';el.style.opacity='0';el.style.transform='scale(.3)';el.offsetHeight;el.style.transition='all .4s cubic-bezier(.34,1.56,.64,1)';el.style.opacity='1';el.style.transform='scale(1)'}}
function vhHide(id){const el=document.getElementById(id);el.style.transition='all .25s ease-in';el.style.opacity='0';el.style.transform='scale(1.1)'}
function vhCountUp(id,tgt,dur){const el=document.getElementById(id),s=performance.now();(function t(n){const p=Math.min((n-s)/dur,1);el.textContent=Math.round(tgt*(1-Math.pow(1-p,4)));p<1&&requestAnimationFrame(t)})(s)}
function vhScramble(dur){const el=document.getElementById('vhChaosNum'),s=Date.now(),iv=setInterval(()=>{if(Date.now()-s>dur){clearInterval(iv);return}el.textContent='₩'+(Math.floor(Math.random()*9e9+1e8)).toLocaleString()},50)}
function vhSpeedLines(){const hero=document.getElementById('videoHero');for(let i=0;i<8;i++){const ln=document.createElement('div');ln.className='vh-speed-line';ln.style.cssText=`top:${15+Math.random()*70}%;left:0;width:${30+Math.random()*50}%;height:${1+Math.random()}px`;hero.appendChild(ln);setTimeout(()=>{ln.style.transition='transform .3s ease-out';ln.style.transform='scaleX(1)'},i*30);setTimeout(()=>{ln.style.transition='opacity .2s';ln.style.opacity='0';setTimeout(()=>ln.remove(),200)},300+i*30)}}

/* 20s TIMELINE */
function vhTimeline(){
  ['vhP1','vhP2','vhP3','vhP4'].forEach(id=>{const el=document.getElementById(id);el.style.opacity='0';el.style.transform='scale(.8)'});
  document.querySelectorAll('.vh-stat-card').forEach(c=>c.classList.remove('visible'));
  document.getElementById('vhLogoLine').classList.remove('expand');
  /* t=0: Phase 1 — Problem */
  vhIntensity=.3;
  setTimeout(()=>{vhShow('vhP1','slam');vhScramble(3500);vhGlitchBurst(150)},200);
  /* t=4s: Phase 2 — Pain */
  setTimeout(()=>{vhIntensity=.6;vhHide('vhP1');vhFlash(150);vhSpeedLines()},4000);
  setTimeout(()=>{vhShow('vhP2','rise');vhGlitchBurst(100)},4400);
  /* t=8.5s: Phase 3 — Data */
  setTimeout(()=>{vhIntensity=.8;vhHide('vhP2');vhFlash(120);vhSpeedLines()},8500);
  setTimeout(()=>{const p3=document.getElementById('vhP3');p3.style.opacity='1';p3.style.transform='scale(1)';
    [{id:'vhSC1',d:0},{id:'vhSC2',d:150},{id:'vhSC3',d:300}].forEach(c=>setTimeout(()=>{document.getElementById(c.id).classList.add('visible');vhGlitchBurst(50)},c.d));
    setTimeout(()=>{vhCountUp('vhV1',10,800);vhCountUp('vhV2',80,800);vhCountUp('vhV3',15,800)},400)},8900);
  /* t=13.5s: Phase 4 — Logo */
  setTimeout(()=>{vhIntensity=1;vhHide('vhP3');vhFlash(200);vhSpeedLines();vhSpeedLines()},13500);
  setTimeout(()=>{vhShow('vhP4','zoom');setTimeout(()=>document.getElementById('vhLogoLine').classList.add('expand'),300)},14000);
  /* t=18.5s: Fade out */
  setTimeout(()=>{vhIntensity=.2;vhHide('vhP4')},18500);
  /* t=20s: Loop */
  setTimeout(vhTimeline,20000);
}
vhTimeline();

/* ===== BRAND STORY SCRIPTS ===== */
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>60));

/* Hero */
window.addEventListener('load',()=>{
  ['hl1','hl2','hl3'].forEach((id,i)=>setTimeout(()=>document.getElementById(id).classList.add('show'),500+i*800));
  setTimeout(()=>{document.getElementById('sa').classList.add('show');const hs=document.getElementById('hero-sub2');if(hs){hs.style.opacity='1';hs.style.transform='translateY(0)'}},500+3*800+600);
});

/* Scroll reveals */
const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('v')})},{threshold:.15});
document.querySelectorAll('.reveal,.reveal-mask,.reveal-blur,.reveal-l,.reveal-r').forEach(el=>io.observe(el));

/* Terminal */
const tl=['> 구매요청 접수 → AI 시장 단가 비교 중...','> 과거 거래 데이터 분석 중...','> 최적 공급사 3곳 추천 완료 ✓'];
let td=false;
function ty(el,txt,cb){let i=0;el.innerHTML='<span class="cur"></span>';const iv=setInterval(()=>{if(i<txt.length){el.innerHTML=txt.slice(0,++i)+'<span class="cur"></span>'}else{el.innerHTML=txt;clearInterval(iv);cb&&cb()}},38)}
new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting&&!td){td=true;setTimeout(()=>ty(document.getElementById('t1'),tl[0],()=>setTimeout(()=>ty(document.getElementById('t2'),tl[1],()=>setTimeout(()=>ty(document.getElementById('t3'),tl[2]),200)),200)),200)}})},{threshold:.4}).observe(document.getElementById('term'));

/* Dashboard counters */
function cnt(el,end,sfx,dur){const s=performance.now();(function t(n){const p=Math.min((n-s)/dur,1);const v=1-Math.pow(1-p,3);el.textContent=Math.round(v*end).toLocaleString()+sfx;p<1&&requestAnimationFrame(t)})(s)}
let dd=false;
const dashEl=document.getElementById('dash-mock');
if(dashEl){new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting&&!dd){dd=true;cnt(document.getElementById('c1'),247,'건',1800);cnt(document.getElementById('c2'),3842,'',1800);cnt(document.getElementById('c3'),82,'%',1800);setTimeout(()=>document.querySelectorAll('.dash-bar-fill').forEach(b=>b.classList.add('v')),400)}})},{threshold:.15}).observe(dashEl)}

/* Stat counter — threshold lowered to .15 */
let sd=false;
const statEl=document.getElementById('stat-n');
if(statEl){new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting&&!sd){sd=true;cnt(statEl,10,'%',2200)}})},{threshold:.15}).observe(statEl)}

/* #2 — Feature entrance dramatic color transition */
let fe=false;
new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting&&!fe){fe=true;e.target.classList.add('activated')}})},{threshold:.35}).observe(document.getElementById('feat-entrance'));

/* Architecture — live system animation */
let archDone=false;
const archEl=document.getElementById('arch-section');
if(archEl){
  /* Background particle canvas */
  const ac=document.getElementById('archCanvas');
  if(ac){const actx=ac.getContext('2d');let aT=0;
    function archResize(){ac.width=ac.parentElement.offsetWidth;ac.height=ac.parentElement.offsetHeight}
    archResize();window.addEventListener('resize',archResize);
    const aParticles=[];for(let i=0;i<60;i++)aParticles.push({x:Math.random()*1400,y:Math.random()*900,vy:-.3-Math.random()*.8,alpha:Math.random()*.15+.03,size:1+Math.random()*1.5});
    function archDraw(){actx.clearRect(0,0,ac.width,ac.height);aT++;
      aParticles.forEach(p=>{p.y+=p.vy;p.x+=Math.sin(aT*.01+p.y*.01)*.3;if(p.y<-10){p.y=ac.height+10;p.x=Math.random()*ac.width}
        actx.beginPath();actx.arc(p.x,p.y,p.size,0,Math.PI*2);actx.fillStyle=`rgba(47,109,196,${p.alpha})`;actx.fill()});
      requestAnimationFrame(archDraw)}
    archDraw()}
  /* Ring reveal: inside-out (OS first → Governance → AI → Activities) */
  new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting&&!archDone){archDone=true;
    /* BSM OS core first, then governance wraps it, then AI wraps all */
    setTimeout(()=>{const r1=document.getElementById('archR1');if(r1)r1.classList.add('show')},300);
    setTimeout(()=>{const r2=document.getElementById('archR2');if(r2)r2.classList.add('show')},700);
    setTimeout(()=>{const r3=document.getElementById('archR3');if(r3)r3.classList.add('show')},1100);
    /* R4 removed — pills now inside BSM OS */
    /* OS live counters */
    const txEl=document.getElementById('archOsTx');
    const govEl=document.getElementById('archOsGov');
    const aiEl=document.getElementById('archOsAi');
    if(txEl){let v=47;txEl.textContent=v;setInterval(()=>{v+=Math.floor(Math.random()*3)+1;txEl.textContent=v},2000)}
    if(govEl){let v=12;govEl.textContent=v;setInterval(()=>{v+=Math.floor(Math.random()*2);govEl.textContent=v},3000)}
    if(aiEl){let v=3;aiEl.textContent=v;setInterval(()=>{v+=Math.random()>.6?1:0;aiEl.textContent=v},4000)}
    /* Pill cycling — active(처리중) + done(완료) 동시 표시 */
    const pills=document.querySelectorAll('.arch-pill');let pi=0;
    setInterval(()=>{
      pills.forEach(p=>{p.classList.remove('active');p.classList.remove('done')});
      if(pills[pi])pills[pi].classList.add('active');
      /* 이전 2개는 '완료' 상태 */
      const p1=(pi-1+pills.length)%pills.length;
      const p2=(pi-2+pills.length)%pills.length;
      if(pills[p1])pills[p1].classList.add('done');
      if(pills[p2])pills[p2].classList.add('done');
      pi=(pi+1)%pills.length;
    },800);
  }})},{threshold:.1}).observe(archEl)
}

/* Marketplace cursor auto-purchase scenario */
let mktDone=false;
const mktEl=document.getElementById('mktGrid');
if(mktEl){new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting&&!mktDone){mktDone=true;
  const cursor=document.getElementById('mktCursor');
  const cards=['mktC1','mktC2','mktC3'];
  const badges=['mktA1','mktA2','mktA3'];
  const toast=document.getElementById('mktToast');
  let step=0;
  function runMktLoop(){
    step=0;
    /* Reset */
    cards.forEach(id=>{const c=document.getElementById(id);if(c)c.classList.remove('mkt-card-hover','mkt-clicking')});
    badges.forEach(id=>{const b=document.getElementById(id);if(b)b.classList.remove('show')});
    if(toast)toast.classList.remove('show');
    if(cursor)cursor.classList.add('show');
    /* Step 1: Move to card 1, hover */
    setTimeout(()=>{
      const c1=document.getElementById('mktC1');
      if(cursor&&c1){cursor.style.left='18%';cursor.style.top='60%'}
      if(c1)c1.classList.add('mkt-card-hover');
    },300);
    /* Step 2: Click card 1 */
    setTimeout(()=>{
      const c1=document.getElementById('mktC1');
      if(cursor)cursor.classList.add('mkt-clicking');
      setTimeout(()=>{if(cursor)cursor.classList.remove('mkt-clicking')},100);
      if(c1)c1.classList.add('mkt-clicking');
      setTimeout(()=>{
        const b1=document.getElementById('mktA1');if(b1)b1.classList.add('show');
      },150);
    },1200);
    /* Step 3: Move to card 2, hover */
    setTimeout(()=>{
      const c1=document.getElementById('mktC1');if(c1)c1.classList.remove('mkt-card-hover');
      const c2=document.getElementById('mktC2');
      if(cursor){cursor.style.left='50%';cursor.style.top='55%'}
      if(c2)c2.classList.add('mkt-card-hover');
    },2100);
    /* Step 4: Click card 2 */
    setTimeout(()=>{
      if(cursor)cursor.classList.add('mkt-clicking');
      setTimeout(()=>{if(cursor)cursor.classList.remove('mkt-clicking')},100);
      const b2=document.getElementById('mktA2');if(b2)b2.classList.add('show');
    },2800);
    /* Step 5: Move to card 3, hover */
    setTimeout(()=>{
      const c2=document.getElementById('mktC2');if(c2)c2.classList.remove('mkt-card-hover');
      const c3=document.getElementById('mktC3');
      if(cursor){cursor.style.left='82%';cursor.style.top='65%'}
      if(c3)c3.classList.add('mkt-card-hover');
    },3700);
    /* Step 6: Click card 3 */
    setTimeout(()=>{
      if(cursor)cursor.classList.add('mkt-clicking');
      setTimeout(()=>{if(cursor)cursor.classList.remove('mkt-clicking')},100);
      const b3=document.getElementById('mktA3');if(b3)b3.classList.add('show');
    },4400);
    /* Step 7: Toast */
    setTimeout(()=>{
      const c3=document.getElementById('mktC3');if(c3)c3.classList.remove('mkt-card-hover');
      if(toast)toast.classList.add('show');
      if(cursor)cursor.classList.remove('show');
    },5200);
    /* Step 8: Reset & loop */
    setTimeout(()=>{if(toast)toast.classList.remove('show')},6500);
    setTimeout(runMktLoop,7500);
  }
  runMktLoop();
}})},{threshold:.15}).observe(mktEl)}

/* #3 — App frame scan line trigger */
document.querySelectorAll('.app-frame, .chat-frame').forEach(frame=>{
  new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('scanning')})},{threshold:.1}).observe(frame);
});

/* #4 — AI Agent chat animation */
let chatDone=false;
const agentEl=document.getElementById('agent-mock');
if(agentEl){new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting&&!chatDone){chatDone=true;
  ['cm1','cm2','cm3'].forEach((id,i)=>setTimeout(()=>{const el=document.getElementById(id);if(el)el.classList.add('v')},300+i*700));
}})},{threshold:.1}).observe(agentEl)}
