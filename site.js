// ===== CHỈNH Ở ĐÂY: thông tin cá nhân hiện trên mọi trang =====
const SITE = { name: "Đoàn Thanh Thảo", major: "Sư phạm Âm nhạc", year: "1", updated: "07/11/2026" };
const NAV = [
  { href: "index.html", label: "Giới thiệu", icon: "♡" },
  { href: "du-an.html", label: "Dự án", icon: "✿", also: ["bai-1.html", "bai-2.html", "bai-3.html", "bai-4.html", "bai-5.html", "bai-6.html"] },
  { href: "tong-ket.html", label: "Tổng kết", icon: "★" }
];
// Thứ tự nút Quay lại / Tiếp theo. Thêm bài mới: thêm 1 dòng, ví dụ { href: "bai-4.html", label: "Bài 4" }
const FLOW = [
  { href: "du-an.html", label: "Tất cả dự án" },
  { href: "bai-1.html", label: "Bài 1" }, { href: "bai-2.html", label: "Bài 2" }, { href: "bai-3.html", label: "Bài 3" },
  { href: "bai-4.html", label: "Bài 4" }, { href: "bai-5.html", label: "Bài 5" }, { href: "bai-6.html", label: "Bài 6" },
  { href: "tong-ket.html", label: "Tổng kết" }
];
// Chiếc nơ tự vẽ (SVG). Muốn dùng hình riêng: thay bằng thẻ <img src="no.png">
const BOW = '<svg viewBox="0 0 120 80" aria-hidden="true"><g stroke="#8c1730" stroke-width="4" stroke-linejoin="round"><path d="M60 40C40 8 8 6 6 30c-2 26 30 36 54 10z" fill="#e63950"/><path d="M60 40C80 8 112 6 114 30c2 26-30 36-54 10z" fill="#e63950"/><circle cx="60" cy="40" r="12" fill="#ff5a70"/></g><path d="M22 26c8-6 16-4 22 2" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".7"/></svg>';

(function () {
  document.documentElement.classList.add("js");
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const here = location.pathname.split("/").pop() || "index.html";

  const h = document.getElementById("site-header");
  if (h) {
    h.className = "top";
    h.innerHTML = '<div class="in"><a class="brand" href="index.html"><span class="bow"></span>portfolio</a></div><nav class="dock" aria-label="Các trang"><ul></ul></nav>';
    const ul = h.querySelector("ul");
    NAV.forEach(p => {
      const li = document.createElement("li"), a = document.createElement("a"), s = document.createElement("span");
      s.textContent = p.icon; a.append(s, document.createTextNode(p.label)); a.href = p.href;
      if (p.href === here || (p.also || []).includes(here)) a.setAttribute("aria-current", "page");
      li.appendChild(a); ul.appendChild(li);
    });
  }
  document.querySelectorAll(".bow").forEach(e => { e.innerHTML = BOW; });
  const f = document.getElementById("site-footer");
  if (f) f.textContent = "E-Portfolio của " + SITE.name + " · Cập nhật " + SITE.updated;
  document.querySelectorAll("[data-name]").forEach(e => e.textContent = SITE.name);
  document.querySelectorAll("[data-major]").forEach(e => e.textContent = SITE.major);
  document.querySelectorAll("[data-year]").forEach(e => e.textContent = SITE.year);

  const pager = document.getElementById("pager");
  if (pager) {
    const i = FLOW.findIndex(p => p.href === here), prev = FLOW[i - 1], next = FLOW[i + 1];
    const mk = (p, t) => { const a = document.createElement("a"); a.href = p.href; a.textContent = t; return a; };
    pager.append(prev ? mk(prev, "← " + prev.label) : document.createElement("span"), next ? mk(next, next.label + " →") : document.createElement("span"));
  }

  document.querySelectorAll(".marquee .track").forEach(t => { t.innerHTML += t.innerHTML; });

  document.querySelectorAll("img.slot").forEach(img => {
    const swap = () => { const d = document.createElement("div"); d.className = "ph"; d.textContent = img.dataset.hint || ("Thêm ảnh: " + img.getAttribute("src")); img.replaceWith(d); };
    if (img.complete && img.naturalWidth === 0) swap(); else img.addEventListener("error", swap);
  });

  if (!calm) {
    // Trái tim và bông hoa bay lên ở nền
    const layer = document.createElement("div"); layer.className = "bg-float"; layer.setAttribute("aria-hidden", "true");
    const glyphs = ["♡", "✿", "✦", "♡"];
    for (let i = 0; i < 14; i++) {
      const s = document.createElement("span");
      s.textContent = glyphs[i % glyphs.length];
      s.style.left = Math.random() * 100 + "%"; s.style.fontSize = (14 + Math.random() * 22) + "px";
      s.style.animationDuration = (16 + Math.random() * 14) + "s"; s.style.animationDelay = (-Math.random() * 30) + "s";
      s.style.setProperty("--sx", (Math.random() * 80 - 40) + "px"); s.style.setProperty("--r", (Math.random() * 60 - 30) + "deg");
      layer.appendChild(s);
    }
    document.body.prepend(layer);

    // Lấp lánh theo con trỏ chuột (chỉ máy có chuột)
    if (matchMedia("(pointer: fine)").matches) {
      let last = 0;
      addEventListener("pointermove", e => {
        const now = performance.now(); if (now - last < 70) return; last = now;
        const s = document.createElement("span"); s.className = "spark"; s.textContent = "✦";
        s.style.left = e.clientX + "px"; s.style.top = e.clientY + "px";
        document.body.appendChild(s); setTimeout(() => s.remove(), 800);
      });
    }
  }

  // Bấm huy hiệu: ký tự trên huy hiệu bay tung ra
  document.querySelectorAll(".badge").forEach(b => b.addEventListener("click", () => {
    if (calm) return;
    const r = b.getBoundingClientRect();
    for (let i = 0; i < 8; i++) {
      const s = document.createElement("span");
      s.className = "burst"; s.textContent = b.textContent.trim();
      s.style.left = (r.left + r.width / 2) + "px"; s.style.top = (r.top + r.height / 2) + "px";
      s.style.setProperty("--dx", (Math.random() * 180 - 90) + "px");
      s.style.setProperty("--dy", (-80 - Math.random() * 130) + "px");
      s.style.setProperty("--rot", (Math.random() * 60 - 30) + "deg");
      s.style.color = i % 2 ? "var(--red)" : "var(--pink)";
      document.body.appendChild(s); setTimeout(() => s.remove(), 1200);
    }
  }));

  // Ảnh polaroid nghiêng nhẹ theo con trỏ
  const ph = document.querySelector(".photo");
  if (ph && !calm) {
    const a = ph.querySelector(".polaroid");
    ph.addEventListener("pointermove", e => {
      const r = ph.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      a.style.transform = "rotateY(" + (x * 12) + "deg) rotateX(" + (-y * 9) + "deg)";
    });
    ph.addEventListener("pointerleave", () => { a.style.transform = ""; });
  }

  // Hiện dần khi cuộn tới
  const els = document.querySelectorAll(".cards li,.about,.proj,.skill,.box,.steps li");
  els.forEach(e => e.classList.add("reveal"));
  if ("IntersectionObserver" in window && !calm) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .15 });
    els.forEach(e => io.observe(e));
  } else els.forEach(e => e.classList.add("in"));
})();