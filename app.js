// Dr. Aum Store - Interactive E-Commerce & Full-Width Bio Capsule Video Canvas
document.addEventListener('DOMContentLoaded', () => {
  const cartState = [];

  // 1. Quantity Stepper on Product Cards (- / +)
  document.addEventListener('click', (e) => {
    const minusBtn = e.target.closest('.qty-minus');
    const plusBtn = e.target.closest('.qty-plus');

    if (minusBtn) {
      const wrap = minusBtn.closest('.qty-stepper');
      const input = wrap ? wrap.querySelector('.qty-input') : null;
      if (input) {
        let val = parseInt(input.value, 10) || 1;
        if (val > 1) input.value = val - 1;
      }
    }

    if (plusBtn) {
      const wrap = plusBtn.closest('.qty-stepper');
      const input = wrap ? wrap.querySelector('.qty-input') : null;
      if (input) {
        let val = parseInt(input.value, 10) || 1;
        if (val < 99) input.value = val + 1;
      }
    }
  });

  // 2. Add to Cart from Product Cards
  document.addEventListener('click', (e) => {
    const addBtn = e.target.closest('.js-add-cart');
    if (!addBtn) return;

    const card = addBtn.closest('.prod-card');
    const id = addBtn.dataset.id || (card ? card.dataset.id : 'prod-' + Date.now());
    const name = addBtn.dataset.name || (card ? card.querySelector('.prod-title')?.textContent.trim() : 'สินค้า Dr. Aum');
    const price = parseFloat(addBtn.dataset.price || '250');
    const img = addBtn.dataset.img || (card ? card.querySelector('.prod-thumb-wrap img')?.getAttribute('src') : 'images/prod-tomato.png');

    let qty = 1;
    if (card) {
      const qtyInput = card.querySelector('.qty-input');
      if (qtyInput) qty = Math.max(1, parseInt(qtyInput.value, 10) || 1);
    }

    addToCart({ id, name, price, img, qty });

    const origHTML = addBtn.innerHTML;
    addBtn.classList.add('added');
    addBtn.innerHTML = '✓ เพิ่มแล้ว (' + qty + ')';
    setTimeout(() => {
      addBtn.classList.remove('added');
      addBtn.innerHTML = origHTML;
    }, 1100);
  });

  function addToCart(item) {
    const existing = cartState.find((x) => x.id === item.id);
    if (existing) {
      existing.qty += item.qty;
    } else {
      cartState.push({ ...item });
    }
    renderCart();
    showToast(`เพิ่ม "${item.name}" จำนวน ${item.qty} ชิ้น ลงตะกร้าแล้ว`);
  }

  window.updateCartItemQty = function (id, delta) {
    const idx = cartState.findIndex((x) => x.id === id);
    if (idx === -1) return;
    cartState[idx].qty += delta;
    if (cartState[idx].qty <= 0) {
      cartState.splice(idx, 1);
    }
    renderCart();
  };

  function renderCart() {
    const totalCount = cartState.reduce((sum, x) => sum + x.qty, 0);
    const totalPrice = cartState.reduce((sum, x) => sum + x.price * x.qty, 0);

    document.querySelectorAll('.js-cart-count').forEach((el) => {
      el.textContent = totalCount;
    });

    const listEl = document.getElementById('cartDrawerList');
    const totalEl = document.getElementById('cartDrawerTotal');
    if (!listEl || !totalEl) return;

    totalEl.textContent = '฿' + totalPrice.toLocaleString('th-TH', { minimumFractionDigits: 2 });

    if (cartState.length === 0) {
      listEl.innerHTML = `
        <div style="text-align:center;padding:48px 16px;color:#5A738E;display:flex;flex-direction:column;align-items:center;gap:12px">
          <div style="width:64px;height:64px;border-radius:50%;background:#EEF5FC;display:flex;align-items:center;justify-content:center;color:#0066FF;font-size:24px;font-weight:700">🛒</div>
          <p style="font-size:16px;font-weight:600;color:#0B2E4C">ยังไม่มีสินค้าในตะกร้า</p>
          <p style="font-size:14px">เลือกกด + / - และปุ่ม "ใส่ตะกร้า" จากการ์ดสินค้าได้เลยครับ</p>
        </div>
      `;
      return;
    }

    listEl.innerHTML = cartState
      .map(
        (item) => `
      <div class="cart-item">
        <img src="${item.img}" alt="${item.name}">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <div class="price">฿${(item.price * item.qty).toLocaleString('th-TH', { minimumFractionDigits: 2 })}</div>
        </div>
        <div class="qty-stepper" style="height:36px">
          <button type="button" class="qty-btn" onclick="updateCartItemQty('${item.id}', -1)" aria-label="ลดจำนวน">−</button>
          <input type="number" class="qty-input" value="${item.qty}" readonly aria-label="จำนวน">
          <button type="button" class="qty-btn" onclick="updateCartItemQty('${item.id}', 1)" aria-label="เพิ่มจำนวน">+</button>
        </div>
      </div>
    `
      )
      .join('');
  }

  const drawer = document.getElementById('cartDrawer');
  const backdrop = document.getElementById('cartBackdrop');
  document.querySelectorAll('.js-toggle-cart').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (!drawer || !backdrop) return;
      drawer.classList.toggle('open');
      backdrop.classList.toggle('open');
    });
  });

  function showToast(msg) {
    const toast = document.getElementById('cartToast');
    const toastText = document.getElementById('cartToastText');
    if (!toast || !toastText) return;
    toastText.textContent = msg;
    toast.classList.add('show');
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2600);
  }

  // 3. Seed DS-01® Style Interactive Why Dr.Aum Section
  const pillarCards = document.querySelectorAll('.why-pillar-card');
  const whySlider = document.getElementById('whyPillarsSlider');
  const whyDots = document.querySelectorAll('.why-slider-dot');
  const whyPrev = document.getElementById('whySlidePrev');
  const whyNext = document.getElementById('whySlideNext');
  const statLabel = document.getElementById('seedStatLabel');
  const statValue = document.getElementById('seedStatValue');
  const leftCalloutTitle = document.getElementById('capsuleLeftTitle');
  const leftCalloutBody = document.getElementById('capsuleLeftBody');
  const rightCalloutTitle = document.getElementById('capsuleRightTitle');
  const rightCalloutBody = document.getElementById('capsuleRightBody');
  let currentPillarIdx = 0;

  const pillarData = [
    {
      label: 'คัดสรรสารสกัดที่มีงานวิจัยตีพิมพ์รองรับ',
      val: '100%',
      lTitle: 'คุณภาพตรวจสอบได้',
      lBody: 'ผลิตในโรงงานของเราเอง ผ่าน อย. GMP GHPs HACCP ควบคุมทุกขั้นตอน',
      rTitle: 'งานวิจัยรองรับ',
      rBody: 'ทุกวัตถุดิบคัดจากงานวิจัยที่ตีพิมพ์จริง ไม่ใช้สารที่ไม่มีหลักฐาน เริ่มต้นเพียง ฿129'
    },
    {
      label: 'มาตรฐานโรงงานผลิตของเราเองครบวงจร',
      val: '4 มาตรฐาน',
      lTitle: 'GMP · GHPs · HACCP · อย.',
      lBody: 'โรงงานผลิตอาหารเสริมแพรกษา สมุทรปราการ ควบคุมความสะอาดทุกขั้นตอน',
      rTitle: 'ตรวจสอบทุกล็อตการผลิต',
      rBody: 'ผ่านการตรวจวิเคราะห์คุณภาพและความปลอดภัยจากห้องแล็บก่อนส่งถึงมือผู้บริโภค'
    },
    {
      label: 'คุ้มค่า ไม่มีค่าการตลาดเกินจริง เริ่มต้นเพียง',
      val: '฿129',
      lTitle: 'ผลิตเองครบวงจร 98%',
      lBody: 'ควบคุมต้นทุนตั้งแต่คัดวัตถุดิบ ผลิต ไปจนถึง SGE Print สื่อสิ่งพิมพ์ในเครือ',
      rTitle: 'เข้าถึงได้จริง',
      rBody: 'ได้สารสกัดเกรดพรีเมียมระดับสากล ในราคาที่คนไทยทานต่อเนื่องได้ทุกวัน'
    },
    {
      label: 'ผู้ติดตามความรู้สุขภาพกับ ดร.อั้ม กว่า',
      val: '1M+ วิว',
      lTitle: 'โปร่งใส ตรวจสอบได้',
      lBody: 'ระบุปริมาณสารสำคัญและเลข อย. ชัดเจนบนฉลากทุกชิ้น',
      rTitle: 'ดร.อั้ม อธิบายเอง',
      rBody: 'ย่อยงานวิจัยเคมีและโภชนาการให้เข้าใจง่าย เลือกทานได้ตรงจุด'
    }
  ];

  function activatePillar(idx, scrollSlider = false) {
    const count = pillarCards.length;
    if (!count) return;
    currentPillarIdx = ((idx % count) + count) % count;

    pillarCards.forEach((c, i) => c.classList.toggle('active', i === currentPillarIdx));
    whyDots.forEach((d, i) => d.classList.toggle('active', i === currentPillarIdx));

    const d = pillarData[currentPillarIdx] || pillarData[0];
    if (statLabel) statLabel.textContent = d.label;
    if (statValue) statValue.textContent = d.val;
    if (leftCalloutTitle) leftCalloutTitle.textContent = d.lTitle;
    if (leftCalloutBody) leftCalloutBody.textContent = d.lBody;
    if (rightCalloutTitle) rightCalloutTitle.textContent = d.rTitle;
    if (rightCalloutBody) rightCalloutBody.textContent = d.rBody;

    if (scrollSlider && whySlider && pillarCards[currentPillarIdx]) {
      whySlider.scrollTo({
        left: pillarCards[currentPillarIdx].offsetLeft - whySlider.offsetLeft,
        behavior: 'smooth'
      });
    }
  }

  pillarCards.forEach((card, idx) => {
    card.addEventListener('click', () => activatePillar(idx, false));
  });

  whyDots.forEach((dot, idx) => {
    dot.addEventListener('click', () => activatePillar(idx, true));
  });

  if (whyPrev) {
    whyPrev.addEventListener('click', () => activatePillar(currentPillarIdx - 1, true));
  }

  if (whyNext) {
    whyNext.addEventListener('click', () => activatePillar(currentPillarIdx + 1, true));
  }

  if (whySlider) {
    whySlider.addEventListener('scroll', () => {
      if (window.innerWidth > 768) return;
      const w = whySlider.clientWidth || 1;
      const idx = Math.round(whySlider.scrollLeft / w);
      if (idx !== currentPillarIdx && idx >= 0 && idx < pillarCards.length) {
        activatePillar(idx, false);
      }
    }, { passive: true });
  }

  // 4. Full-Width 3D Bio-Capsule Video-like Canvas Background
  const canvas = document.getElementById('bioCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.parentElement.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight || 720);

    window.addEventListener('resize', () => {
      width = canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement.offsetHeight || 720;
    });

    const items = Array.from({ length: 48 }, (_, i) => {
      const depth = 0.4 + Math.random() * 0.9;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        r: (18 + Math.random() * 26) * depth,
        len: (46 + Math.random() * 68) * depth,
        angle: Math.random() * Math.PI * 2,
        vAngle: (Math.random() - 0.5) * 0.007,
        vx: (Math.random() - 0.5) * 0.55 * depth,
        vy: (Math.random() - 0.5) * 0.55 * depth,
        depth,
        isLight: i % 3 === 0
      };
    });

    function drawBio() {
      ctx.clearRect(0, 0, width, height);
      items.forEach((c) => {
        c.x += c.vx;
        c.y += c.vy;
        c.angle += c.vAngle;
        if (c.x < -120) c.x = width + 120;
        if (c.x > width + 120) c.x = -120;
        if (c.y < -120) c.y = height + 120;
        if (c.y > height + 120) c.y = -120;

        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate(c.angle);

        // 3D Pill / Bio-Capsule Body
        ctx.beginPath();
        ctx.roundRect(-c.len / 2, -c.r / 2, c.len, c.r, c.r / 2);
        const grad = ctx.createLinearGradient(-c.len / 2, -c.r / 2, c.len / 2, c.r / 2);
        if (c.isLight) {
          grad.addColorStop(0, 'rgba(210, 236, 255, 0.72)');
          grad.addColorStop(0.5, 'rgba(110, 185, 255, 0.52)');
          grad.addColorStop(1, 'rgba(24, 98, 185, 0.58)');
        } else {
          grad.addColorStop(0, 'rgba(130, 196, 255, 0.48)');
          grad.addColorStop(0.5, 'rgba(31, 122, 224, 0.45)');
          grad.addColorStop(1, 'rgba(9, 38, 72, 0.65)');
        }
        ctx.fillStyle = grad;
        ctx.fill();

        // Specular highlight along top edge of capsule
        ctx.beginPath();
        ctx.roundRect(-c.len * 0.34, -c.r * 0.32, c.len * 0.68, c.r * 0.22, c.r * 0.11);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.24)';
        ctx.fill();

        ctx.restore();
      });
      requestAnimationFrame(drawBio);
    }
    drawBio();
  }

  // Seed.com Style Photorealistic Macro Bokeh Canvas & Pause Button (HOME-2.html)
  const seedCanvas = document.getElementById('seedBokehCanvas');
  const seedSection = document.querySelector('.why-seed-v2');
  const seedPauseBtn = document.getElementById('seedV2PauseBtn');
  let seedPaused = false;

  if (seedPauseBtn && seedSection) {
    seedPauseBtn.addEventListener('click', () => {
      seedPaused = !seedPaused;
      seedSection.classList.toggle('is-paused', seedPaused);
      seedPauseBtn.innerHTML = seedPaused
        ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20 6 4"></polygon></svg>'
        : '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"></rect><rect x="14" y="5" width="4" height="14" rx="1"></rect></svg>';
    });
  }

  if (seedCanvas) {
    const sCtx = seedCanvas.getContext('2d');
    let sW = (seedCanvas.width = seedCanvas.parentElement.offsetWidth || window.innerWidth);
    let sH = (seedCanvas.height = seedCanvas.parentElement.offsetHeight || 740);

    window.addEventListener('resize', () => {
      sW = seedCanvas.width = seedCanvas.parentElement.offsetWidth || window.innerWidth;
      sH = seedCanvas.height = seedCanvas.parentElement.offsetHeight || 740;
    });

    const spores = Array.from({ length: 34 }, (_, i) => {
      const depth = 0.3 + Math.random() * 0.85;
      return {
        x: Math.random() * sW,
        y: Math.random() * sH,
        r: (4 + Math.random() * 24) * depth,
        vx: (Math.random() - 0.5) * 0.28 * depth,
        vy: (-0.12 - Math.random() * 0.25) * depth,
        alpha: (0.12 + Math.random() * 0.28) * depth,
        hue: i % 2 === 0 ? '215, 242, 255' : '135, 206, 255'
      };
    });

    function drawSeedBokeh() {
      if (!seedPaused) {
        sCtx.clearRect(0, 0, sW, sH);
        spores.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < -60) p.x = sW + 60;
          if (p.x > sW + 60) p.x = -60;
          if (p.y < -60) p.y = sH + 60;
          if (p.y > sH + 60) p.y = -60;

          const g = sCtx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
          g.addColorStop(0, `rgba(255, 255, 255, ${p.alpha * 1.3})`);
          g.addColorStop(0.45, `rgba(${p.hue}, ${p.alpha})`);
          g.addColorStop(1, `rgba(${p.hue}, 0)`);

          sCtx.beginPath();
          sCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          sCtx.fillStyle = g;
          sCtx.fill();
        });
      }
      requestAnimationFrame(drawSeedBokeh);
    }
    drawSeedBokeh();
  }

  renderCart();
});
