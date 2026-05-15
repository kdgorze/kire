document.getElementById('hbg').addEventListener('click',()=>document.getElementById('mobMenu').classList.add('open'));
document.getElementById('mobClose').addEventListener('click',()=>document.getElementById('mobMenu').classList.remove('open'));
function closeMob(){ document.getElementById('mobMenu').classList.remove('open'); }

document.querySelectorAll('.f-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.f-btn').forEach(b=>b.classList.remove('on'));
    btn.classList.add('on');
    const f=btn.dataset.f;
    document.querySelectorAll('.p-item').forEach(item=>{
      const c=item.dataset.c||'';
      item.style.display=(f==='all'||c.includes(f))?'block':'none';
    });
  });
});

function openLB(src,cap){
  document.getElementById('lbImg').src=src;
  document.getElementById('lbCap').textContent=cap;
  document.getElementById('lbox').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeLB(e){
  if(!e||e.target===document.getElementById('lbox')||e.target.classList.contains('lbox-close')){
    document.getElementById('lbox').classList.remove('open');
    document.body.style.overflow='';
  }
}
document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeLB({target:document.getElementById('lbox')}); });

const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('vis'); obs.unobserve(e.target); } });
},{threshold:0.1});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

// CONTACT FORM ----------------------------------------------------------------------------------------------------------------

async function sendMsg(){

  const n = document.getElementById("nm").value.trim();
  const e = document.getElementById("em").value.trim();
  const m = document.getElementById("ms").value.trim();

  if(!n || !e || !m){
    alert("Please fill out all fields.");
    return;
  }

  try {

    const response = await fetch(
      "https://formspree.io/f/mgodgkjw",
      {
        method: "POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          name: n,
          email: e,
          message: m
        })
      }
    );

    if(response.ok){

      document.getElementById("formMsg").style.display = "block";

      document.getElementById("nm").value = "";
      document.getElementById("em").value = "";
      document.getElementById("ms").value = "";

    } else {
      alert("Something went wrong.");
    }

  } catch(error){
    alert("Connection error.");
  }
}