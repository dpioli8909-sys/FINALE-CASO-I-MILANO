(function () {
  "use strict";

  const STOPWORDS = new Set([
    "di","del","dello","della","dei","degli","delle",
    "da","dal","dallo","dalla","dai","dagli","dalle",
    "a","ad","al","allo","alla","ai","agli","alle",
    "in","nel","nello","nella","nei","negli","nelle",
    "su","sul","sullo","sulla","sui","sugli","sulle",
    "il","lo","la","i","gli","le","un","uno","una"
  ]);

  function norm(raw) {
    let s = (raw || "").toString().toLowerCase();
    s = s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    s = s.replace(/[^a-z0-9]+/g, " ").trim();
    if (!s) return "";
    const tokens = s.split(/\s+/).filter(t => t && !STOPWORDS.has(t));
    return tokens.join("");
  }

  const ALIASES = {
    1: ["sepolcro","sansepolcro"],
    2: ["ambrosiana","bibliotecaambrosiana"],
    3: ["ambrogio","santambrogio"],
    4: ["duomo","santatecla","santateclaarea","sotterraneiduomo"],
    5: ["cagranda","granda","ospedalemaggiore"],
    6: ["eustorgio","santeustorgio","necropolieustorgio"],
    7: ["bernardino","ossa","alleossa","sanbernardinoalleossa","ossario"],
    8: ["monumentale","cimiteromonumentale","famedio"]
  };

  function getUnlocked() {
    try {
      const raw = sessionStorage.getItem("unlocked_places");
      const arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch (_) {
      return [];
    }
  }
  function setUnlocked(arr) {
    try { sessionStorage.setItem("unlocked_places", JSON.stringify(arr)); } catch (_) {}
  }

  let unlocked = getUnlocked();

  function $(id) { return document.getElementById(id); }

  function safePlaces() {
    return (window.PLACES && Array.isArray(window.PLACES)) ? window.PLACES : null;
  }

  function render() {
    const list = $("places");
    const prog = $("prog");
    const places = safePlaces();
    if (!list) return;

    if (!places) {
      list.innerHTML = '<div style="opacity:.8;font-size:13px">Errore: data.js non caricato (PLACES mancante).</div>';
      if (prog) prog.textContent = "";
      return;
    }

    list.innerHTML = "";
    places.forEach(pl => {
      const ok = unlocked.includes(pl.id);
      const d = document.createElement("div");
      d.className = "place" + (ok ? "" : " locked");
      d.textContent = ok ? pl.title : ("Luogo " + pl.id);
      d.onclick = () => { if (ok) load(pl); };
      list.appendChild(d);
    });

    if (prog) prog.textContent = unlocked.length + "/" + places.length + " sbloccati";
    setUnlocked(unlocked);
  }

  function section(title, html) {
    if (!html || !html.trim()) return "";
    return (
      '<div class="section">' +
        '<div class="section-title">' + title + '</div>' +
        '<div class="section-body">' + html + '</div>' +
      '</div>'
    );
  }

  function load(pl) {
    const c = $("content");
    if (!c) return;

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

    const places = safePlaces();
    if (places && unlocked.length === places.length) {
      c.innerHTML +=
        '<div class="final">' +
          '<h2>Hai ricostruito il sistema simbolico.</h2>' +
          '<p>Milano non ha un centro. Ogni epoca ne produce uno. Il potere non scompare: cambia indirizzo.</p>' +
        '</div>';
    }
  }

  window.unlock = function unlock() {
    const places = safePlaces();
    if (!places) { render(); return; }

    const name = norm($("name") ? $("name").value : "");
    const pass = norm($("pw") ? $("pw").value : "");
    if (!name || !pass) return;

    for (let i = 0; i < places.length; i++) {
      const pl = places[i];
      const titleKey = norm(pl.title);
      const luogoKey = norm("luogo" + pl.id);
      const aliasHit = (ALIASES[pl.id] || []).some(a => norm(a) === name);

      if (name === titleKey || name === luogoKey || aliasHit) {
        if (pass === norm(pl.pass)) {
          if (unlocked.indexOf(pl.id) === -1) unlocked.push(pl.id);
          render();
          load(pl);
          return;
        }
      }
    }
  };

  window.login = function login() {
    const u = norm($("u") ? $("u").value : "");
    const p = norm($("p") ? $("p").value : "");
    if (u === "casoi" && p === "milano") {
      location.href = "portal.html";
    } else {
      const err = $("err");
      if (err) err.textContent = "Credenziali errate";
    }
  };

  function boot() {
    if ($("places")) {
      const start = Date.now();
      (function waitPlaces() {
        if (safePlaces()) { render(); return; }
        if (Date.now() - start > 2000) { render(); return; }
        setTimeout(waitPlaces, 50);
      })();
    }
  }

  document.addEventListener("DOMContentLoaded", boot);
})();
