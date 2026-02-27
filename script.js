
function norm(s){
  return (s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]/g,'');
}

function login(){
  const u=norm(document.getElementById("u").value);
  const p=norm(document.getElementById("p").value);
  if(u==="casoi" && p==="milano"){
    location.href="portal.html";
  }else{
    document.getElementById("err").textContent="Credenziali errate";
  }
}

let unlocked=[];

function render(){
  const list=document.getElementById("places");
  list.innerHTML="";
  PLACES.forEach(pl=>{
    const d=document.createElement("div");
    d.className="place"+(unlocked.includes(pl.id)?"":" locked");
    d.textContent=unlocked.includes(pl.id)?pl.title:"Luogo "+pl.id;
    d.onclick=()=>{if(unlocked.includes(pl.id))load(pl)};
    list.appendChild(d);
  });
  document.getElementById("prog").textContent=unlocked.length+"/8 sbloccati";
}

function unlock(){
  const name=norm(document.getElementById("name").value);
  const pass=norm(document.getElementById("pw").value);
  PLACES.forEach(pl=>{
    if(norm(pl.title)===name || norm("luogo"+pl.id)===name){
      if(norm(pl.pass)===pass){
        if(!unlocked.includes(pl.id)) unlocked.push(pl.id);
        render();
        load(pl);
      }
    }
  });
}

function load(pl){
  const c=document.getElementById("content");
  c.innerHTML=`
    <div class="acc open">
      <div class="acc-head" onclick="this.parentNode.classList.toggle('open')">${pl.title}</div>
      <div class="acc-body">
        <p>${pl.desc}</p>

        <div class="section-title">Curiosità</div>
        <ul>${pl.curiosita.map(x=>"<li>"+x+"</li>").join("")}</ul>

        <div class="section-title">Leggende</div>
        ${pl.leggende.map(l=>"<p><strong>"+l.titolo+"</strong><br>"+l.testo+"</p>").join("")}

        <div class="section-title">Misteri</div>
        ${pl.misteri.map(m=>"<p><strong>"+m.titolo+"</strong><br>"+m.testo+"</p>").join("")}

      </div>
    </div>
  `;

  if(unlocked.length===8){
    c.innerHTML += `<div class="final"><h2>Hai ricostruito il sistema simbolico.</h2>
    <p>Centro, sapere, culto, cura, morte, memoria: Milano non è casuale. È struttura.</p></div>`;
  }
}

window.onload=function(){
  if(document.getElementById("places")) render();
};
