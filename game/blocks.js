/*************************************************
 * VanBerto's e a Missão Internet Segura 🛡️  ·  game/blocks.js
 *
 * Blocos "?" e tijolos para dar CABEÇADAS (tipo Super Mário) e plataformas
 * extra. São gerados no fim do loadLevel() a partir dos dados do nível:
 * só se colocam em sítios livres (sem tocar em plataformas, canos,
 * trampolins, itens, spawn, porta ou letreiro) e a posição é sempre a mesma
 * para o mesmo nível (gerador pseudo-aleatório com semente).
 *
 * Os blocos vivem no grupo "platforms": por isso colidem com o jogador e
 * com os vilões, são limpos quando o nível/arena é reconstruído e ficam
 * escondidos nas salas secretas, sem mexer nesses sistemas.
 *************************************************/

import { platforms, itemsGroup, powered, starPower, lives, getMaxLives, score, set_score, scoreText, set__hudDirty, difficulty } from "./state.js?v=20261108is4";
import { showFloat } from "./feedback.js?v=20261108is4";
import { makePlatformTextureThemed } from "../textures.js?v=20261108is4";
import { ensureAudio, SFX, beep } from "../audio.js?v=20261108is4";
import { THEMES } from "../data-levels.js?v=20261108is4";

const BLOCK = 40;
let brickHintShown = false;

function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ===== Texturas (desenhadas em canvas, 40×40) =====
function makeBlockTextures(scene) {
  if (scene.textures.exists("blk_q")) return;
  const mk = (key, draw) => {
    const t = scene.textures.createCanvas(key, BLOCK, BLOCK);
    draw(t.getContext());
    t.refresh();
  };
  const rivets = (c, col) => {
    c.fillStyle = col;
    [[6, 6], [34, 6], [6, 34], [34, 34]].forEach(([x, y]) => { c.beginPath(); c.arc(x, y, 2.2, 0, 7); c.fill(); });
  };
  mk("blk_q", c => {
    c.fillStyle = "#7a4a00"; c.fillRect(0, 0, 40, 40);
    c.fillStyle = "#f5b400"; c.fillRect(2, 2, 36, 36);
    c.fillStyle = "#ffe066"; c.fillRect(3, 3, 34, 5);
    rivets(c, "#7a4a00");
    c.fillStyle = "#7a4a00"; c.font = "900 26px Arial, sans-serif";
    c.textAlign = "center"; c.textBaseline = "middle";
    c.fillText("?", 20, 22);
    c.fillStyle = "#fff6c0"; c.fillText("?", 19, 20.5);
  });
  mk("blk_brick", c => {
    c.fillStyle = "#5a2208"; c.fillRect(0, 0, 40, 40);
    c.fillStyle = "#c2571a";
    [[1, 1, 18, 8], [21, 1, 18, 8], [1, 11, 8, 8], [11, 11, 18, 8], [31, 11, 8, 8],
     [1, 21, 18, 8], [21, 21, 18, 8], [1, 31, 8, 8], [11, 31, 18, 8], [31, 31, 8, 8]]
      .forEach(([x, y, w, h]) => c.fillRect(x, y, w, h));
    c.fillStyle = "rgba(255,200,140,0.35)";
    [[1, 1, 18, 2], [21, 1, 18, 2], [11, 11, 18, 2], [1, 21, 18, 2], [21, 21, 18, 2], [11, 31, 18, 2]]
      .forEach(([x, y, w, h]) => c.fillRect(x, y, w, h));
  });
  mk("blk_used", c => {
    c.fillStyle = "#3d352b"; c.fillRect(0, 0, 40, 40);
    c.fillStyle = "#8a7a64"; c.fillRect(2, 2, 36, 36);
    rivets(c, "#3d352b");
  });
}

// ===== Cabeçada =====
export function onPlatformCollide(playerObj, pl) {
  if (!pl || !pl.getData || !pl.getData("isBlock")) return;
  const pb = playerObj.body;
  if (!pb || !pb.touching.up || pb.touching.down) return;
  // Vários blocos podem estar encostados à cabeça: bate no que fica mais centrado
  let best = pl, bestD = Infinity;
  platforms.getChildren().forEach(o => {
    if (!o.active || !o.body || !o.getData || !o.getData("isBlock")) return;
    if (Math.abs(o.body.bottom - pl.body.bottom) > 2) return;
    if (o.body.right <= pb.left || o.body.left >= pb.right) return;
    const d = Math.abs(o.x - playerObj.x);
    if (d < bestD) { bestD = d; best = o; }
  });
  hitBlock(playerObj.scene, best);
}

function hitBlock(scene, b) {
  if (b.getData("busy")) return;
  b.setData("busy", true);
  scene.time.delayedCall(180, () => { if (b.active) b.setData("busy", false); });
  const baseY = b.y;
  scene.tweens.add({ targets: b, y: baseY - 9, duration: 70, yoyo: true, ease: "Quad.easeOut",
    onComplete: () => { if (b.active) b.y = baseY; } });
  ensureAudio();
  beep({ freq: 210, dur: 0.07, type: "square", vol: 0.06, slideTo: 150 });

  const type = b.getData("type");
  if (type === "q") {
    if (b.getData("used")) return;
    b.setData("used", true);
    b.setTexture("blk_used");
    releaseContent(scene, b);
  } else if (type === "brick") {
    if (powered || starPower) {
      breakBrick(scene, b);
    } else if (!brickHintShown) {
      brickHintShown = true;
      showFloat(scene, b.x, b.y - 34, "🛡️ Com o escudo partes o tijolo!", "#ffd700");
    }
  }
}

function addPoints(n) {
  set_score(score + n);
  if (scoreText) scoreText.setText(`🌟 Pontos: ${score}`);
  set__hudDirty(true);
}

function releaseContent(scene, b) {
  let kind = b.getData("content") || "moeda";
  if (kind === "heart" && lives >= getMaxLives()) kind = "moeda";
  if (kind === "moeda") {
    addPoints(10);
    ensureAudio(); SFX.coin();
    const coin = scene.add.text(b.x, b.y - 26, "🪙", { fontSize: "26px" }).setOrigin(0.5).setDepth(6);
    scene.tweens.add({ targets: coin, y: coin.y - 52, alpha: 0, duration: 520, ease: "Quad.easeOut", onComplete: () => coin.destroy() });
    showFloat(scene, b.x, b.y - 60, "+10 🪙", "#ffd700");
    return;
  }
  const keyMap = { medalha: "item_medalha", duplosalto: "item_duplosalto", heart: "item_heart", estrela: "item_estrela" };
  const it = itemsGroup.create(b.x, b.y - 46, keyMap[kind] || "item_medalha");
  it.setDepth(5);
  it.setData("kind", kind);
  it.setData("bonus", true); // não conta para as estrelas do nível (ver items.js)
  it.setAlpha(0).setScale(0.4);
  scene.tweens.add({ targets: it, alpha: 1, scale: 1, y: b.y - 40, duration: 260, ease: "Back.easeOut",
    onComplete: () => {
      if (!it.active) return;
      scene.tweens.add({ targets: it, y: it.y - 6, duration: 900, yoyo: true, repeat: -1, ease: "Sine.easeInOut" });
    } });
  ensureAudio(); SFX.coin();
}

function breakBrick(scene, b) {
  const x = b.x, y = b.y;
  b.destroy();
  addPoints(5);
  showFloat(scene, x, y - 30, "+5", "#ffb070");
  ensureAudio(); beep({ freq: 150, dur: 0.12, type: "sawtooth", vol: 0.06, slideTo: 80 });
  const p = scene.add.particles(0, 0, "spark_item", {
    x, y, speed: { min: 80, max: 220 }, angle: { min: 200, max: 340 }, lifespan: 600,
    quantity: 14, scale: { start: 1.1, end: 0 }, gravityY: 700, tint: [0xc2571a, 0x8a3a10, 0xe08a4a]
  });
  scene.time.delayedCall(450, () => p.destroy());
}

// ===== Geração =====
export function addBlocksAndPlatforms(scene, L, idx) {
  makeBlockTextures(scene);
  brickHintShown = false;
  const rnd = mulberry32(idx * 9973 + 17);

  const rect = (cx, cy, w, h) => ({ l: cx - w / 2, r: cx + w / 2, t: cy - h / 2, b: cy + h / 2 });
  const obst = [];
  const anchors = [];
  L.platforms.forEach(p => {
    const o = rect(p.x, p.y, p.w, p.h); obst.push(o); anchors.push(o);
  });
  (L.movingPlatforms || []).forEach(m =>
    obst.push(rect(m.x, m.y, m.w + 2 * (m.rangeX || 0) + 30, m.h + 2 * (m.rangeY || 0) + 30)));
  (L.pipes || []).forEach(p => {
    obst.push(rect(p.x, p.y, 110, 190));
    if (p.toX != null) obst.push(rect(p.toX, p.toY, 110, 190));
    if (p.returnX != null) obst.push(rect(p.returnX, p.returnY ?? p.y, 110, 190));
  });
  (L.trampolines || []).forEach(t => obst.push({ l: t.x - 90, r: t.x + 90, t: 100, b: 560 }));
  (L.items || []).forEach(i => obst.push({ ...rect(i.x, i.y, 80, 80), soft: true }));
  (L.secrets || []).forEach(s => obst.push({ ...rect(s.x, s.y, 80, 80), soft: true }));
  obst.push(rect(L.spawn.x, 400, 380, 600));
  obst.push(rect(L.doorX, 300, 460, 700));
  obst.push(rect(L.signX || (L.spawn.x + 240), 450, 220, 260));

  // Obstáculos "duros" (plataformas, canos, trampolins, porta…) contam em toda a zona;
  // os "moles" (itens, segredos) só na faixa onde ficam os blocos (softB).
  const hits = (zl, zr, zt, zb, skip, softB) =>
    obst.some(o => o !== skip && !(o.r <= zl || o.l >= zr || o.b <= zt || o.t >= (o.soft ? softB : zb)));

  const centers = [];
  const farFromOthers = cx => centers.every(c => Math.abs(c - cx) >= 300);

  // Candidatos de x, embaralhados com a semente
  const cands = [];
  for (let x = 100; x <= L.doorX - 260; x += 20) cands.push(x);
  for (let i = cands.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1)); [cands[i], cands[j]] = [cands[j], cands[i]];
  }

  // Conteúdo dos blocos "?" — depende da dificuldade
  const pickContent = () => {
    const r = rnd();
    if (difficulty === "extremo") return "moeda";
    if (difficulty === "dificil") return r < 0.7 ? "moeda" : (r < 0.85 ? "duplosalto" : "medalha");
    return r < 0.55 ? "moeda" : (r < 0.72 ? "medalha" : (r < 0.88 ? "duplosalto" : "heart"));
  };

  const addBlock = (x, y, type) => {
    const s = platforms.create(x, y, type === "q" ? "blk_q" : "blk_brick");
    s.setDepth(3);
    s.setData("isBlock", true);
    s.setData("type", type);
    if (type === "q") s.setData("content", pickContent());
    if (s.body) { s.body.checkCollision.left = false; s.body.checkCollision.right = false; }
    return s;
  };

  const layRow = (cx, cy, pattern) => {
    const w = pattern.length * BLOCK;
    pattern.forEach((t, i) => addBlock(cx - w / 2 + BLOCK / 2 + i * BLOCK, cy, t));
  };

  // 1) Fileiras de blocos por cima do chão/plataformas (cabeçada a partir de baixo)
  const nRows = 2 + (idx >= 6 ? 1 : 0) + (idx >= 13 ? 1 : 0);
  const rowPatterns = [["brick", "q", "brick"], ["q", "brick", "q"], ["brick", "q", "brick", "q", "brick"], ["q"]];
  let rows = 0;
  for (const cx of cands) {
    if (rows >= nRows) break;
    if (!farFromOthers(cx)) continue;
    const order = [0, 1, 2, 3].sort(() => rnd() - 0.5);
    let pat = null, a = null;
    for (const k of order) {
      const pt = rowPatterns[k], w = pt.length * BLOCK;
      const found = anchors.find(an => {
        const top = an.t;
        if (top < 300 || top > 530) return false;
        const ground = top >= 480;
        // Em plataformas altas deixa-se folga para saltar dos lados (não cortar saltos)
        if (an.r - an.l < w + (ground ? 40 : 110)) return false;
        if (cx - w / 2 - 20 < an.l || cx + w / 2 + 20 > an.r) return false;
        const cy = top - 154;
        if (cy < 90) return false;
        return !hits(cx - w / 2 - 45, cx + w / 2 + 45, cy - 50, top - 2, an, cy + 50);
      });
      if (found) { pat = pt; a = found; break; }
    }
    if (!a) continue;
    const w = pat.length * BLOCK;
    const cy = a.t - 154;
    layRow(cx, cy, pat);
    obst.push(rect(cx, cy, w + 20, 60));
    centers.push(cx); rows++;
  }

  // 2) Plataformas extra flutuantes, com 1–2 blocos por cima
  const nExtra = 2 + (idx >= 7 ? 1 : 0) + (idx >= 14 ? 1 : 0);
  const themeIdx = L.theme % THEMES.length;
  const platKey = "platform_t" + themeIdx;
  if (!scene.textures.exists(platKey)) makePlatformTextureThemed(scene, platKey, themeIdx);
  const PW = 150, TOP = 385, PY = TOP + 11;
  let extras = 0;
  for (const cx of cands) {
    if (extras >= nExtra) break;
    if (!farFromOthers(cx)) continue;
    const ground = anchors.find(a => a.t >= 480 && cx - PW / 2 - 20 >= a.l && cx + PW / 2 + 20 <= a.r);
    if (!ground) continue;
    if (hits(cx - PW / 2 - 45, cx + PW / 2 + 45, 190, ground.t - 2, ground, 430)) continue;
    const plat = platforms.create(cx, PY, platKey);
    plat.displayWidth = PW; plat.displayHeight = 22; plat.refreshBody();
    if (plat.body) { plat.body.checkCollision.left = false; plat.body.checkCollision.right = false; }
    layRow(cx, TOP - 154, rnd() < 0.5 ? ["q"] : ["brick", "q"]);
    obst.push(rect(cx, 290, PW + 30, 220));
    centers.push(cx); extras++;
  }
}
