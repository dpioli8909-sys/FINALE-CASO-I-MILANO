function norm(s){
  s = (s || "").toLowerCase();
  // rimuove accenti
  s = s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  // rimuove preposizioni/articoli
  s = s.replace(/\b(di|del|dello|della|dei|degli|delle|da|dal|dallo|dalla|dai|dagli|dalle|a|ad|al|allo|alla|ai|agli|alle|in|nel|nello|nella|nei|negli|nelle|su|sul|sullo|sulla|sui|sugli|sulle)\b/g, " ");
  // pulizia
  s = s.replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
  return s.replace(/\s/g, "");
}

var unlocked = [];

function login(){
  var u = norm(document.getElementById("u").value);
  var p = norm(document.getElementById("p").value);
  if(u === "casoi" && p === "milano"){
    location.href = "portal.html";
  }else{
    var err = document.getElementById("err");
    if(err) err.textContent = "Credenziali errate";
  }
}

function safePlaces(){
  return window.PLACES || (typeof PLACES !== "undefined" ? PLACES : null);
}

function render(){
  var places = safePlaces();
  var list = document.getElementById("places");
  if(!list) return;

  if(!places){
    list.innerHTML = '<div style="color:#ffb3b3;font-size:13px">ERRORE: PLACES non caricato (controlla data.js)</div>';
    return;
  }

  list.innerHTML = "";
  for(var i=0;i<places.length;i++){
    (function(pl){
      var d = document.createElement("div");
      var ok = unlocked.indexOf(pl.id) !== -1;
      d.className = "place" + (ok ? "" : " locked");
      d.textContent = ok ? pl.title : ("Luogo " + pl.id);
      d.onclick = function(){ if(ok) load(pl); };
      list.appendChild(d);
    })(places[i]);
  }

  var prog = document.getElementById("prog");
  if(prog) prog.textContent = unlocked.length + "/" + places.length + " sbloccati";
}

function section(title, html){
  if(!html) return "";
  return (
    '<div class="section">' +
      '<div class="section-title">' + title + '</div>' +
      '<div class="section-body">' + html + '</div>' +
    '</div>'
  );
}

function load(pl){
  var c = document.getElementById("content");
  if(!c) return;

  c.innerHTML =
    '<div class="acc open">' +
      '<div class="acc-head" onclick="this.parentNode.classList.toggle(\\'open\\')">' + pl.title + '</div>' +
      '<div class="acc-body">' +
        section("Il luogo", pl.luogo) +
        section("Curiosità", pl.curiosita) +
        section("Misteri", pl.misteri) +
        section("Leggende", pl.leggende) +
        section("Templari · Massoneria · Esoterismo", pl.templari) +
        section("Paranormale / Horror", pl.paranormale) +
        section("Tesi del ricercatore", pl.tesi) +
      '</div>' +
    '</div>';
}

function unlock(){
  var places = safePlaces();
  if(!places) { render(); return; }

  var name = norm(document.getElementById("name").value);
  var pass = norm(document.getElementById("pw").value);

  for(var i=0;i<places.length;i++){
    var pl = places[i];

    var aliases = {
      1:["sepolcro","sansepolcro"],
      2:["ambrosiana"],
      3:["ambrogio"],
      4:["duomo"],
      5:["granda","cagranda"],
      6:["eustorgio"],
      7:["bernardino"],
      8:["monumentale"]
    };

    var matchAlias = aliases[pl.id] && aliases[pl.id].indexOf(name) !== -1;

    if(norm(pl.title) === name || norm("luogo"+pl.id) === name || matchAlias){
      if(norm(pl.pass) === pass){
        if(unlocked.indexOf(pl.id) === -1) unlocked.push(pl.id);
        render();
        load(pl);
        return;
      }
    }
  }
}

function boot(){
  // aspetta DOM
  if(document.getElementById("places")){
    render();
  }
}

document.addEventListener("DOMContentLoaded", boot);
