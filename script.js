// === CASO I — MILANO / Archivio Finale ===
// NOTE: sito statico per GitHub Pages (niente backend).
// Login iniziale: utente=CASO I  password=MILANO  (case-insensitive)

const STOPWORDS = new Set([
  "di","del","dello","della","dei","degli","delle",
  "al","allo","alla","ai","agli","alle","a","da","in","su","per","con",
  "nel","nello","nella","nei","nelle",
  "il","lo","la","i","gli","le","un","uno","una","e"
]);

function normRaw(s){
  return (s||"")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g,"")
    .replace(/[^a-z0-9\s]/g," ")
    .replace(/\s+/g," ")
    .trim();
}

// Normalizza tenendo solo token utili (ignora articoli/preposizioni)
function normKey(s){
  const raw = normRaw(s);
  if(!raw) return "";
  const toks = raw.split(" ").filter(t => t && !STOPWORDS.has(t));
  return toks.join("");
}

// Normalizza per password: più permissiva, non rimuove "stopwords" (non servono)
function normPass(s){
  return (s||"")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g,"")
    .replace(/[^a-z0-9]/g,"");
}

function setErr(msg){
  const el = document.getElementById("err2") || document.getElementById("err");
  if(el) el.textContent = msg || "";
}

function login(){
  const u = normKey(document.getElementById("u").value);
  const p = normPass(document.getElementById("p").value);
  if(u === normKey("CASO I") && p === normPass("MILANO")){
    // Salva sessione (evita loop)
    sessionStorage.setItem("caso1_auth","1");
    location.href = "portal.html";
  }else{
    setErr("Credenziali errate");
  }
}

function requireAuth(){
  // Se sei su portal.html e non sei autenticato, torna al login
  const onPortal = !!document.getElementById("places");
  if(onPortal && sessionStorage.getItem("caso1_auth") !== "1"){
    location.href = "index.html";
    return false;
  }
  return true;
}

// --- Stato sbloccati ---
let unlocked = [];
function loadState(){
  try{
    unlocked = JSON.parse(localStorage.getItem("caso1_unlocked")||"[]");
    if(!Array.isArray(unlocked)) unlocked=[];
  }catch(e){ unlocked=[]; }
}
function saveState(){
  localStorage.setItem("caso1_unlocked", JSON.stringify(unlocked));
}

// --- UI ---
function render(){
  const list = document.getElementById("places");
  if(!list) return;

  list.innerHTML = "";
  PLACES.forEach(pl=>{
    const d = document.createElement("div");
    const isOpen = unlocked.includes(pl.id);
    d.className = "place" + (isOpen ? "" : " locked");
    d.textContent = isOpen ? pl.title : ("Luogo " + pl.id);
    d.onclick = () => { if(isOpen) loadPlace(pl); };
    list.appendChild(d);
  });

  const prog = document.getElementById("prog");
  if(prog) prog.textContent = unlocked.length + "/8 sbloccati";
}

function escapeHtml(s){
  return (s||"").replace(/[&<>"']/g, ch => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  }[ch]));
}

function sectionAccordion(title, html, open=false){
  return `
    <div class="acc ${open ? "open" : ""}">
      <div class="acc-head" onclick="this.parentNode.classList.toggle('open')">${escapeHtml(title)}</div>
      <div class="acc-body">${html || "<p class='small'>Contenuto non disponibile.</p>"}</div>
    </div>
  `;
}

function loadPlace(pl){
  const c = document.getElementById("content");
  if(!c) return;

  const keys = Object.keys(pl.sections || {});
  const blocks = keys.map((k, idx) => sectionAccordion(k, pl.sections[k], idx===0)).join("\n");

  c.innerHTML = `
    <h1>${escapeHtml(pl.title)}</h1>
    <p class="small">Dossier consultabile. (Scopo ludico)</p>
    ${blocks}
  `;

  if(unlocked.length >= 8){
    c.innerHTML += `
      <div class="final">
        <h2>Ora la mappa è completa.</h2>
        <p>Se stai leggendo queste righe significa che hai seguito tutte le tracce. 
        Non erano monumenti. 
        Non erano semplici curiosità storiche. 
        Erano punti di un sistema.</p>
        <p>Ogni luogo segnava il centro di un’epoca diversa.
        Il foro romano.
        La reliquia cristiana.
        L’autorità della Chiesa.
        Il sapere che diventa pubblico.
        Le istituzioni che organizzano la città.
        La memoria che decide cosa deve restare.</p>
        <p>Milano non ha mai distrutto i propri centri.
        Li ha sovrascritti.
        Uno sopra l’altro.
        Epoca dopo epoca.</p>
        <p>Per questo la città sembra cambiare continuamente.
        Ma se si osserva con attenzione, si scopre che il potere non scompare mai.
        Cambia indirizzo.</p>
        <p>E ogni volta lascia un segno.</p>
        <p>Quello che hai visto qui non è un caso isolato.
        Milano è solo uno dei nodi.</p>
        <p>Lo stesso schema compare altrove.
        Altre città.
        Altri centri.
        Altre sovrascritture.</p>
        <p>Ho iniziato a seguirne le tracce.</p>
        <p style="margin-top:28px; opacity:0.75;">
        Se qualcuno troverà questo archivio dopo di me,
        saprà dove ricominciare.</p>
        <p style="margin-top:24px; opacity:0.75;">
        — M.R.</p>  
      </div>
    `;
  }
}

function matchPlaceByName(inputKey, pl){
  // Consenti: "luogo 7", "luogo7"
  if(inputKey === normKey("luogo " + pl.id) || inputKey === normKey("luogo" + pl.id)) return true;

  // Match sul titolo
  if(inputKey === normKey(pl.title)) return true;

  // Match permissivo: se l'input è contenuto nel titolo o viceversa (per evitare "Basilica Sant'Ambrogio" senza "di")
  const a = inputKey;
  const b = normKey(pl.title);
  if(a && b && (b.includes(a) || a.includes(b))) return true;

  return false;
}

function unlock(){
  setErr("");
  const nameEl = document.getElementById("name");
  const pwEl   = document.getElementById("pw");
  if(!nameEl || !pwEl) return;

  const nameKey = normKey(nameEl.value);
  const passKey = normPass(pwEl.value);

  if(!nameKey || !passKey){
    setErr("Inserisci luogo e password");
    return;
  }

  let did = false;

  PLACES.forEach(pl=>{
    if(matchPlaceByName(nameKey, pl)){
      if(normPass(pl.pass) === passKey){
        if(!unlocked.includes(pl.id)){
          unlocked.push(pl.id);
          saveState();
        }
        render();
        loadPlace(pl);
        did = true;
      }
    }
  });

  if(!did){
    setErr("Nessuno sblocco: controlla luogo/password");
  }
}

// Init
window.addEventListener("load", ()=>{
  // Se siamo nella pagina portal, verifica auth
  requireAuth();

  // Carica stato sblocchi
  loadState();

  // Render se presente sidebar
  if(document.getElementById("places")){
    render();
  }
});
