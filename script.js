function norm(s){
  s = (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // accenti

  // rimuove articoli/preposizioni comuni (italiano)
  s = s.replace(/\b(di|del|dello|della|dei|degli|delle|da|dal|dallo|dalla|dai|dagli|dalle|a|ad|al|allo|alla|ai|agli|alle|in|nel|nello|nella|nei|negli|nelle|su|sul|sullo|sulla|sui|sugli|sulle)\b/g, " ");

  // lascia lettere/numeri/spazi, compatta e poi elimina spazi
  s = s.replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
  return s.replace(/\s/g, "");
}

function login(){
  const u = norm(document.getElementById("u").value);
  const p = norm(document.getElementById("p").value);
  if(u==="casoi" && p==="milano"){
    location.href="portal.html";
  }else{
    document.getElementById("err").textContent="Credenziali errate";
  }
}

let unlocked = [];

function render(){
  const list = document.getElementById("places");
  if(!list) return;

  // In caso di ordine di caricamento diverso (script prima di data.js),
  // aspetta che PLACES sia disponibile senza andare in errore.
  if(typeof PLACES === "undefined" || !Array.isArray(PLACES)){
    setTimeout(render, 80);
    return;
  }

  list.innerHTML = "";
  PLACES.forEach(pl=>{
    const d = document.createElement("div");
    d.className = "place" + (unlocked.includes(pl.id) ? "" : " locked");
    d.textContent = unlocked.includes(pl.id) ? pl.title : ("Luogo " + pl.id);
    d.onclick = ()=>{ if(unlocked.includes(pl.id)) load(pl); };
    list.appendChild(d);
  });

  const prog = document.getElementById("prog");
  if(prog) prog.textContent = unlocked.length + "/8 sbloccati";
}

function unlock(){
  const name = norm(document.getElementById("name").value);
  const pass = norm(document.getElementById("pw").value);

  const aliases = {
    1:["sepolcro","sansepolcro","sansepolcrocripta","cripta","criptasansepolcro"],
    2:["ambrosiana","bibliotecaambrosiana"],
    3:["ambrogio","santambrogio","basilicaambrogio"],
    4:["duomo","santatecla","sotterraneiduomo"],
    5:["granda","cagranda","ospedalemaggiore"],
    6:["eustorgio","santeustorgio","necropolieustorgio"],
    7:["bernardino","sanbernardino","ossario"],
    8:["monumentale","cimiteromonumentale","famedio"]
  };

  PLACES.forEach(pl=>{
    const title = norm(pl.title);
    const idname = norm("luogo"+pl.id);
    const matchAlias = aliases[pl.id] && aliases[pl.id].includes(name);

    if(title===name || idname===name || matchAlias){
      if(norm(pl.pass)===pass){
        if(!unlocked.includes(pl.id)) unlocked.push(pl.id);
        render();
        load(pl);
      }
    }
  });
}

function section(title, html){
  if(!html) return "";
  return `
    <div class="section">
      <div class="section-title">${title}</div>
      <div class="section-body">${html}</div>
    </div>
  `;
}

function load(pl){
  const c = document.getElementById("content");
  c.innerHTML = `
    <div class="acc open">
      <div class="acc-head" onclick="this.parentNode.classList.toggle('open')">${pl.title}</div>
      <div class="acc-body">
        ${section("Il luogo", pl.luogo)}
        ${section("Curiosità", pl.curiosita)}
        ${section("Misteri", pl.misteri)}
        ${section("Leggende", pl.leggende)}
        ${section("Templari · Massoneria · Esoterismo", pl.templari)}
        ${section("Paranormale / Horror", pl.paranormale)}
        ${section("Tesi del ricercatore", pl.tesi)}
      </div>
    </div>
  `;

  if(unlocked.length===8){
    c.innerHTML += `
      <div class="final">
        <h2>Hai ricostruito il sistema simbolico.</h2>
        <p>Milano non ha un centro. Ogni epoca ne produce uno. Il potere non scompare: cambia indirizzo.</p>
      </div>
    `;
  }
}

window.addEventListener("DOMContentLoaded", ()=>{ if(document.getElementById("places")) render(); });
