// MyOS Breathing
const root = document.getElementById('BreathingApp');
if (root) {
  const $=id=>document.getElementById(id), circle=$('br-circle'), phaseEl=$('br-phase');
  const PATTERNS={box:[['Breathe in',4,1.35],['Hold',4,1.35],['Breathe out',4,1],['Hold',4,1]],
                  '478':[['Breathe in',4,1.35],['Hold',7,1.35],['Breathe out',8,1]]};
  let mode='box', running=false, pi=0, remain=0, timer=null, cycles=0;
  function setMode(m){ mode=m; $('br-box').classList.toggle('on',m==='box'); $('br-478').classList.toggle('on',m==='478'); }
  $('br-box').onclick=()=>{ if(!running) setMode('box'); };
  $('br-478').onclick=()=>{ if(!running) setMode('478'); };
  function enter(i){ const [label,secs,scale]=PATTERNS[mode][i]; remain=secs;
    circle.style.transition='transform '+secs+'s ease-in-out'; circle.style.transform='scale('+scale+')';
    phaseEl.textContent=label; }
  function tick(){ remain--; if(remain<=0){ pi++; if(pi>=PATTERNS[mode].length){ pi=0; cycles++; $('br-cyc').textContent=cycles; } enter(pi); }
    else phaseEl.textContent=PATTERNS[mode][pi][0]+' '+remain; }
  function start(){ running=true; pi=0; cycles=0; $('br-cyc').textContent=0; $('br-toggle').textContent='Stop'; enter(0); timer=setInterval(tick,1000); }
  function stop(){ running=false; clearInterval(timer); $('br-toggle').textContent='Start'; circle.style.transition='transform .4s'; circle.style.transform='scale(1)'; phaseEl.textContent='Ready'; }
  $('br-toggle').onclick=()=>{ running?stop():start(); };
}
