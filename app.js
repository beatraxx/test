/**
 * EstateOS — Core Interactive Engine
 * Controls animations, scroll observers, dynamic mockups, authority matrix,
 * mobile app previews, AI concierge simulator, pricing calculator, and modals.
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initCursorGlow();
  initHeaderScroll();
  initIntersectionObserver();
  initCardTilt();
  initHeroRolePills();
  initMockupInteractivity();
  initWorkflowSimulator();
  initAuthorityMatrix();
  initMobileAppShowcase();
  initAiAssistant();
  initPricingToggle();
  initModalsAndToasts();
});

/* ================= 1. SCROLL PROGRESS INDICATOR ================= */
function initScrollProgress() {
  const progressBar = document.getElementById('scrollProgressBar');
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    if (progressBar) {
      progressBar.style.width = `${scrollPercent}%`;
    }

    if (backToTopBtn) {
      if (scrollTop > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ================= 2. AMBIENT CURSOR GLOW ================= */
function initCursorGlow() {
  const glow = document.getElementById('cursorGlow');
  if (!glow) return;

  let mouseX = 0, mouseY = 0;
  let currentX = 0, currentY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  function animateGlow() {
    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;
    glow.style.left = `${currentX}px`;
    glow.style.top = `${currentY}px`;
    requestAnimationFrame(animateGlow);
  }
  requestAnimationFrame(animateGlow);
}

/* ================= 3. HEADER SCROLL & MOBILE MENU ================= */
function initHeaderScroll() {
  const header = document.getElementById('mainHeader');
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('navMenu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
    });

    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-open');
      });
    });
  }
}

/* ================= 4. INTERSECTION OBSERVER FOR SCROLL ANIMATIONS ================= */
function initIntersectionObserver() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-delay') || 0;
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, delay);
        obs.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.12
  });

  elements.forEach(el => observer.observe(el));
}

/* ================= 5. CARD 3D TILT EFFECT ================= */
function initCardTilt() {
  // Only apply on non-touch desktop devices
  if (window.matchMedia('(hover: hover)').matches) {
    const tiltCards = document.querySelectorAll('.card-tilt');
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      });
    });
  }
}

/* ================= 6. HERO ROLE PILLS & AUDIENCE FILTER ================= */
function initHeroRolePills() {
  const pills = document.querySelectorAll('#heroRolePills .role-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const role = pill.getAttribute('data-role');
      updateHeroMockupRole(role);
      showToast(`Switched perspective to: ${pill.textContent.trim()}`);
    });
  });
}

/* ================= 7. HERO WORKSPACE MOCKUP INTERACTIVITY ================= */
const mockupRoleData = {
  developer: {
    title: 'Developer Workspace',
    userRole: 'Developer Admin',
    kpis: [
      { label: 'Active Units Under Construction', value: '184', badge: '+12 on track', class: 'positive' },
      { label: 'Verified Lead Pipeline', value: '1,420', badge: '34 Site Visits', class: 'positive' },
      { label: 'Pending Authority Approvals', value: '3', badge: 'Action Required', class: 'warning' }
    ],
    propertyTitle: 'Featured Property • Unit 402',
    propertySubtitle: 'Luxury Courtyard Villa — Bengaluru North',
    timeline: [
      { actor: 'Site Supervisor (Rajiv M.)', time: '4m ago', desc: 'Uploaded cured concrete lab report for Block B Foundation. 100% compliant.', dot: 'success' },
      { actor: 'Apex Realty (Broker Partner)', time: '18m ago', desc: 'Booked VIP Site Visit for Saturday 3:30 PM with Buyer #B-883. Contact shielded.', dot: 'bronze' },
      { actor: 'Procurement Dept', time: '42m ago', desc: 'Material PO #892 (TMT 550D Steel) awaiting Developer Admin digital signature.', dot: 'alert' }
    ],
    nextBtnText: 'Switch to Broker View →',
    nextRole: 'broker'
  },
  broker: {
    title: 'Brokerage Operations Center',
    userRole: 'Principal Broker (Apex)',
    kpis: [
      { label: 'Authorized Builder Units', value: '88', badge: '100% RERA verified', class: 'positive' },
      { label: 'Assigned Leads In Play', value: '312', badge: '14 Follow-ups today', class: 'positive' },
      { label: 'Earned Commission Pipeline', value: '₹48.5L', badge: 'Q4 Forecast', class: 'positive' }
    ],
    propertyTitle: 'Authorized Inventory • The Courtyard Villa',
    propertySubtitle: 'Developer Released Unit 402 — 3.5% Broker Commission Tier',
    timeline: [
      { actor: 'EstateOS Relay', time: '2m ago', desc: 'New high-intent lead matched for Courtyard Villa. Buyer budget: ₹3 Cr.', dot: 'success' },
      { actor: 'Developer Desk', time: '25m ago', desc: 'Approved festive price waiver (-₹5L) for next 3 verified bookings.', dot: 'bronze' },
      { actor: 'Buyer #B-914', time: '1h ago', desc: 'Completed 3D virtual walkthrough and requested in-person weekend visit.', dot: 'success' }
    ],
    nextBtnText: 'Switch to Buyer View →',
    nextRole: 'buyer'
  },
  buyer: {
    title: 'Home Buyer Portal (Shielded)',
    userRole: 'Verified Buyer (#B-883)',
    kpis: [
      { label: 'Saved Shortlisted Residences', value: '4', badge: 'All Title Clear', class: 'positive' },
      { label: 'Upcoming Scheduled Visits', value: '1', badge: 'This Saturday 4 PM', class: 'positive' },
      { label: 'Spam Calls Blocked', value: '100%', badge: 'Zero Data Leaks', class: 'positive' }
    ],
    propertyTitle: 'Tour Scheduled • The Courtyard Villa',
    propertySubtitle: 'Whitefield East, Bengaluru — Verified Architect Plans',
    timeline: [
      { actor: 'EstateOS Shield', time: 'Just now', desc: 'Your private phone number is completely masked. Only authorized broker can chat.', dot: 'success' },
      { actor: 'Site Concierge', time: '20m ago', desc: 'Digital gate pass generated for your Saturday 4:00 PM private tour.', dot: 'bronze' },
      { actor: 'AI Concierge', time: '2h ago', desc: 'Shared complete soil test and RERA sanction documents to your vault.', dot: 'success' }
    ],
    nextBtnText: 'Switch to Developer View →',
    nextRole: 'developer'
  }
};

let currentMockupRole = 'developer';

function updateHeroMockupRole(role) {
  const data = mockupRoleData[role];
  if (!data) return;
  currentMockupRole = role;

  const titleEl = document.getElementById('mockupActiveViewTitle');
  const userRoleEl = document.getElementById('mockupUserRole');
  const switchBtn = document.getElementById('mockupSwitchViewBtn');

  if (titleEl) titleEl.textContent = data.title;
  if (userRoleEl) userRoleEl.textContent = data.userRole;
  if (switchBtn) {
    switchBtn.textContent = data.nextBtnText;
    switchBtn.setAttribute('data-target-role', data.nextRole);
  }

  // Update KPIs
  const kpiCards = document.querySelectorAll('.mockup-kpi-grid .kpi-card');
  data.kpis.forEach((kpi, idx) => {
    if (kpiCards[idx]) {
      kpiCards[idx].querySelector('.kpi-label').textContent = kpi.label;
      const valEl = kpiCards[idx].querySelector('.kpi-value');
      valEl.textContent = kpi.value;
      const badgeEl = kpiCards[idx].querySelector('.kpi-badge');
      badgeEl.textContent = kpi.badge;
      badgeEl.className = `kpi-badge ${kpi.class}`;
    }
  });

  // Update Timeline Feed
  const timelineItems = document.querySelectorAll('.mockup-timeline .timeline-item');
  data.timeline.forEach((item, idx) => {
    if (timelineItems[idx]) {
      timelineItems[idx].querySelector('.timeline-actor').textContent = item.actor;
      timelineItems[idx].querySelector('.timeline-time').textContent = item.time;
      timelineItems[idx].querySelector('.timeline-desc').textContent = item.desc;
      const dotEl = timelineItems[idx].querySelector('.timeline-dot');
      dotEl.className = `timeline-dot ${item.dot}`;
    }
  });

  // Update Hero Pills Active State
  const pills = document.querySelectorAll('#heroRolePills .role-pill');
  pills.forEach(pill => {
    if (pill.getAttribute('data-role') === role) {
      pill.classList.add('active');
    } else {
      pill.classList.remove('active');
    }
  });
}

function initMockupInteractivity() {
  const switchBtn = document.getElementById('mockupSwitchViewBtn');
  if (switchBtn) {
    switchBtn.addEventListener('click', () => {
      const targetRole = switchBtn.getAttribute('data-target-role') || 'broker';
      updateHeroMockupRole(targetRole);
      showToast(`Updated Command Center to ${targetRole.toUpperCase()} mode`);
    });
  }

  // Sidebar mock navigation clicks
  const sidebarNavBtns = document.querySelectorAll('.mockup-sidebar .mockup-nav-btn');
  sidebarNavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sidebarNavBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.getAttribute('data-mockup-tab');
      showToast(`Opened workspace section: ${btn.textContent.trim()}`);
    });
  });
}

/* ================= 8. WORKFLOW PIPELINE SIMULATOR ================= */
const simStepsData = {
  1: {
    badge: 'LIVE EVENT DISPATCH',
    title: 'Omnichannel Enquiry Ingestion',
    desc: 'Buyer arrives via portal campaign. EstateOS generates a shielded alias `#BUYER-9821`, deduplicates against existing broker records, and assigns to verified agent Amit K. without revealing personal mobile phone.',
    m1Label: 'Time to First Response',
    m1Val: '42 seconds',
    m2Label: 'Privacy Compliance',
    m2Val: '100% Shielded'
  },
  2: {
    badge: 'AI INVENTORY MATCH',
    title: 'Algorithmic Property Matching',
    desc: 'EstateOS scans approved developer units and instantly pairs the buyer preference vectors (4 BHK, East-facing, private garden, under ₹3 Cr) with released Unit 402 in The Courtyard Villa.',
    m1Label: 'Inventory Compatibility',
    m1Val: '98.4% Match',
    m2Label: 'Pricing Band Approved',
    m2Val: 'Locked within Range'
  },
  3: {
    badge: 'DIGITAL TWIN & CALENDAR',
    title: 'Immersive Experience & Verified Visit',
    desc: 'Buyer conducts a high-fidelity 3D virtual tour on their mobile app, explores 4K drone cinematography, and books an on-site inspection. Dynamic gate pass and route guidance sent to buyer app.',
    m1Label: 'Virtual Tour Retention',
    m1Val: '8.4 minutes avg',
    m2Label: 'Site Visit Confirmation',
    m2Val: 'Instant QR Pass'
  },
  4: {
    badge: 'TAMPER-PROOF AUDIT',
    title: 'Reservation, KYC & Digital Booking',
    desc: 'Digital unit lock prevents double-booking across brokers. E-sign agreement generated with developer milestone payment schedule. Commission automatically queued for disbursal upon milestone approval.',
    m1Label: 'Booking Lock Speed',
    m1Val: 'Instant (< 1 sec)',
    m2Label: 'Audit Compliance',
    m2Val: 'Blockchain-Grade Trail'
  }
};

window.activateSimStep = function(stepNum) {
  const nodes = document.querySelectorAll('.simulator-timeline-track .sim-node');
  nodes.forEach((node, idx) => {
    if (idx + 1 === stepNum) {
      node.classList.add('active');
    } else {
      node.classList.remove('active');
    }
  });

  const stepCards = document.querySelectorAll('.workflow-steps-grid .step-card');
  stepCards.forEach(card => {
    if (parseInt(card.getAttribute('data-step')) === stepNum) {
      card.style.borderColor = 'var(--brand-primary)';
      card.style.boxShadow = '0 12px 30px rgba(150, 106, 56, 0.3)';
    } else {
      card.style.borderColor = 'var(--border-dark)';
      card.style.boxShadow = 'none';
    }
  });

  const stateText = document.getElementById('simStateText');
  const detailTitle = document.getElementById('simDetailTitle');
  const detailDesc = document.getElementById('simDetailDesc');
  const previewBox = document.getElementById('simPreviewBox');
  const badgeEl = previewBox.querySelector('.sim-detail-badge');
  const metrics = previewBox.querySelectorAll('.sim-metric-pill');

  const step = simStepsData[stepNum];
  if (stateText) stateText.textContent = `Step ${stepNum}: ${nodes[stepNum - 1].textContent.replace(/^\d+\.\s*/, '')}`;
  if (badgeEl) badgeEl.textContent = step.badge;
  if (detailTitle) detailTitle.textContent = step.title;
  if (detailDesc) detailDesc.textContent = step.desc;

  if (metrics[0]) {
    metrics[0].querySelector('.label').textContent = step.m1Label;
    metrics[0].querySelector('.val').textContent = step.m1Val;
  }
  if (metrics[1]) {
    metrics[1].querySelector('.label').textContent = step.m2Label;
    metrics[1].querySelector('.val').textContent = step.m2Val;
  }
};

function initWorkflowSimulator() {
  // Simulator initialized with step 1
  activateSimStep(1);
}

/* ================= 9. INTERACTIVE AUTHORITY MATRIX SIMULATOR ================= */
const authorityMatrixData = {
  developer: [
    { op: 'Release Inventory for Public Booking', level: 'Full Master Approval', badge: 'granted', log: 'Immutable Audit Trail', rule: 'Only Developer Admin or C-Suite can unlock new units' },
    { op: 'Approve Material POs & Contractor Invoices', level: 'Authorized', badge: 'granted', log: 'Real-time Budget Sync', rule: 'Requires digital signature above ₹5 Lakh threshold' },
    { op: 'Alter Property Base Pricing / Discounts', level: 'Full Master Control', badge: 'granted', log: 'Policy Versioning', rule: 'Applies company-wide pricing rules' },
    { op: 'View Full Buyer Unmasked Contact Data', level: 'Restricted (Encrypted)', badge: 'conditional', log: 'Audit Log on Access', rule: 'Decryption requires multi-factor authentication' },
    { op: 'Submit Daily Site Progress Logs', level: 'Review & Sign-off', badge: 'granted', log: 'Milestone Timeline', rule: 'Approves submissions made by Site Engineers' },
    { op: 'Direct Commission Disbursal Approval', level: 'Master Sign-off', badge: 'granted', log: 'Accounting Integration', rule: 'Triggers escrow payout to registered brokerage' }
  ],
  engineer: [
    { op: 'Submit Daily Site Progress Logs', level: 'Granted (Primary Action)', badge: 'granted', log: 'GPS & Time Tagged', rule: 'Requires lab test photo & structural certificate' },
    { op: 'Log Material Consumption & Requisitions', level: 'Authorized to Request', badge: 'granted', log: 'Inventory Ledger', rule: 'Auto-checks remaining batch quantity on site' },
    { op: 'Alter Property Base Pricing / Discounts', level: 'Strictly Denied', badge: 'denied', log: 'Security Alert on Attempt', rule: 'Engineering staff cannot access sales pricing tools' },
    { op: 'Release Inventory for Public Booking', level: 'Strictly Denied', badge: 'denied', log: 'Role Guard Enforced', rule: 'Cannot release units or accept client reservations' },
    { op: 'View Full Buyer Contact Data', level: 'Strictly Denied', badge: 'denied', log: 'Role Guard Enforced', rule: 'Zero access to commercial customer CRM records' },
    { op: 'Upload As-Built CAD & Structural Blueprints', level: 'Authorized with Versioning', badge: 'granted', log: 'Blueprint Versioning', rule: 'Architect sign-off required prior to public 3D publish' }
  ],
  broker: [
    { op: 'View Authorized Builder Inventory', level: 'Full Access (Approved Units)', badge: 'granted', log: 'View Logged', rule: 'Can only view units officially authorized by builder' },
    { op: 'Distribute & Manage Assigned Client Leads', level: 'Authorized (Attributed Only)', badge: 'granted', log: 'Lead Allocation Lock', rule: 'Cannot access leads assigned to competing brokerages' },
    { op: 'Communicate with Buyer via Platform Relay', level: 'Authorized (Masked Channel)', badge: 'granted', log: 'Interaction Timestamp', rule: 'Customer phone number remains shielded from export' },
    { op: 'Alter Base Price / Override Payment Schedule', level: 'Denied (Preset Discount Only)', badge: 'conditional', log: 'Discount Approval Queue', rule: 'Discounts exceeding 1.5% require Developer Admin OTP' },
    { op: 'Approve Construction Material Requisitions', level: 'Strictly Denied', badge: 'denied', log: 'Role Guard Enforced', rule: 'Brokers have zero access to engineering or procurement' },
    { op: 'Schedule Verified Site Inspections', level: 'Authorized', badge: 'granted', log: 'Site Gate Pass Queue', rule: 'Syncs with developer site supervisor calendar' }
  ],
  buyer: [
    { op: 'Explore 3D Virtual Walkthroughs & Media', level: 'Unlimited Public Access', badge: 'granted', log: 'Session Analytics', rule: 'Instant access to RERA-verified project collateral' },
    { op: 'Chat with Verified Authorized Broker', level: 'Shielded Direct Connection', badge: 'granted', log: 'Encrypted Message Log', rule: 'Your personal phone number is never shared or sold' },
    { op: 'Lock Unit Reservation & Submit Token', level: 'Digital Reservation Lock', badge: 'granted', log: 'Transaction Receipt', rule: 'Cryptographic lock holds unit for 48 hours for KYC' },
    { op: 'View Construction Progress Velocity Logs', level: 'Transparent Milestone Feed', badge: 'granted', log: 'Buyer Portal Sync', rule: 'View verified photos & structural certificates' },
    { op: 'View Other Buyers’ Financial or Contact Data', level: 'Strictly Denied', badge: 'denied', log: 'Role Guard Enforced', rule: 'Complete isolation between client profiles' },
    { op: 'Modify Construction Specs or Floorplans', level: 'Requires Custom Change Order', badge: 'conditional', log: 'Architect Review Ticket', rule: 'Subject to developer structural feasibility approval' }
  ]
};

function renderAuthorityMatrix(role) {
  const tableBody = document.querySelector('#matrixPermissionTable tbody');
  if (!tableBody) return;

  const rows = authorityMatrixData[role] || authorityMatrixData.developer;
  tableBody.innerHTML = rows.map(r => `
    <tr>
      <td><b>${r.op}</b></td>
      <td><span class="permission-badge ${r.badge}">
        ${r.badge === 'granted' ? '✓' : r.badge === 'denied' ? '✕' : '⚠'} ${r.level}
      </span></td>
      <td>${r.log}</td>
      <td><small>${r.rule}</small></td>
    </tr>
  `).join('');
}

function initAuthorityMatrix() {
  const buttons = document.querySelectorAll('#matrixRoleButtons .matrix-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const role = btn.getAttribute('data-matrix-role');
      renderAuthorityMatrix(role);
      showToast(`Displaying permissions for: ${btn.textContent}`);
    });
  });

  renderAuthorityMatrix('developer');
}

/* ================= 10. MOBILE APP SHOWCASE INTERACTIVITY ================= */
window.switchMobileScreen = function(screenId) {
  const views = document.querySelectorAll('.phone-screen .phone-view');
  views.forEach(v => v.classList.remove('active'));

  const targetView = document.getElementById(`view-${screenId}`);
  if (targetView) targetView.classList.add('active');

  const tabs = document.querySelectorAll('#mobileScreenTabs .mob-tab-btn');
  tabs.forEach(tab => {
    if (tab.getAttribute('data-screen') === screenId) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  // Also update phone bottom nav
  const bottomNavItems = document.querySelectorAll('.phone-bottom-nav .bottom-nav-item');
  const screenNavMap = { discovery: 0, details: 1, shield: 2, role: 3 };
  const activeIdx = screenNavMap[screenId] || 0;
  bottomNavItems.forEach((item, idx) => {
    if (idx === activeIdx) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
};

function initMobileAppShowcase() {
  const tabs = document.querySelectorAll('#mobileScreenTabs .mob-tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const screen = tab.getAttribute('data-screen');
      switchMobileScreen(screen);
    });
  });

  // Role option cards inside phone onboarding screen
  const roleCards = document.querySelectorAll('.role-selection-options .role-opt-card');
  roleCards.forEach(card => {
    card.addEventListener('click', () => {
      roleCards.forEach(c => {
        c.classList.remove('active');
        const radio = c.querySelector('.role-opt-radio');
        if (radio) {
          radio.classList.remove('selected');
          radio.textContent = '';
        }
      });
      card.classList.add('active');
      const radio = card.querySelector('.role-opt-radio');
      if (radio) {
        radio.classList.add('selected');
        radio.textContent = '✓';
      }
      showToast(`Selected in-app profile: ${card.querySelector('h4').textContent}`);
    });
  });
}

/* ================= 11. AI PROPERTY CONCIERGE SIMULATOR ================= */
const aiPresetAnswers = {
  villas: {
    text: "Here is the top verified listing matching your criteria:",
    card: `
      <div style="background:#FFF;border:1px solid #E2D9CC;border-radius:10px;padding:10px;margin-top:8px;">
        <b style="color:#966A38;">The Courtyard Villa</b> • Whitefield, Bengaluru<br>
        <span style="font-size:0.8rem;color:#6B645B;">₹2.85 Crore • 4 BHK • 4,200 sq.ft • Private Pool & Solar Microgrid</span><br>
        <small style="color:#1E6B47;font-weight:700;">✓ RERA Approved • Developer Released for Booking</small>
      </div>
    `
  },
  construction: {
    text: "Current status for Block B (Superstructure Phase):",
    card: `
      <div style="background:#FFF;border:1px solid #E2D9CC;border-radius:10px;padding:10px;margin-top:8px;">
        <b style="color:#1C1917;">Block B Milestone Report</b><br>
        <div style="font-size:0.8rem;color:#6B645B;margin:4px 0;">• 5th Floor Slab Pouring: 100% Complete (Tested M35 Grade Concrete)<br>• Electrical & Plumbing Rough-ins: 74% Complete<br>• Estimated Handover: November 2026 (On Schedule)</div>
        <small style="color:#966A38;font-weight:700;">Verified by Chief Structural Engineer</small>
      </div>
    `
  },
  shielding: {
    text: "EstateOS Contact Shielding Protocol:",
    card: `
      <div style="background:#FFF;border:1px solid #E2D9CC;border-radius:10px;padding:10px;margin-top:8px;">
        <b style="color:#1E6B47;">🛡️ Zero-Spam Guarantee</b><br>
        <p style="font-size:0.8rem;color:#6B645B;margin:4px 0;">When you request info, you communicate via an encrypted platform relay. Brokers see only your anonymous alias (#BUYER-XXXX). Your true mobile phone is never exposed or distributed to third parties.</p>
      </div>
    `
  }
};

window.simulateAiQuery = function(queryText) {
  const input = document.getElementById('aiInputPrompt');
  if (input) input.value = queryText;
  sendAiMessage();
};

window.sendAiMessage = function() {
  const input = document.getElementById('aiInputPrompt');
  const chatBox = document.getElementById('aiChatBox');
  if (!input || !chatBox) return;

  const text = input.value.trim();
  if (!text) return;

  // Add User Message
  const userMsg = document.createElement('div');
  userMsg.className = 'ai-msg user';
  userMsg.innerHTML = `
    <div class="user-badge">YOU</div>
    <div class="msg-content"><p>${escapeHtml(text)}</p></div>
  `;
  chatBox.appendChild(userMsg);
  input.value = '';
  chatBox.scrollTop = chatBox.scrollHeight;

  // Simulate Bot Response with Typing indicator
  const botMsg = document.createElement('div');
  botMsg.className = 'ai-msg bot';
  botMsg.innerHTML = `
    <div class="bot-badge">AI</div>
    <div class="msg-content"><p>Thinking...</p></div>
  `;
  chatBox.appendChild(botMsg);
  chatBox.scrollTop = chatBox.scrollHeight;

  setTimeout(() => {
    let answerHtml = '';
    const lower = text.toLowerCase();
    if (lower.includes('villa') || lower.includes('pool') || lower.includes('3 cr')) {
      answerHtml = `<p>${aiPresetAnswers.villas.text}</p>${aiPresetAnswers.villas.card}`;
    } else if (lower.includes('construction') || lower.includes('block b') || lower.includes('progress')) {
      answerHtml = `<p>${aiPresetAnswers.construction.text}</p>${aiPresetAnswers.construction.card}`;
    } else if (lower.includes('shield') || lower.includes('mobile') || lower.includes('spam') || lower.includes('contact')) {
      answerHtml = `<p>${aiPresetAnswers.shielding.text}</p>${aiPresetAnswers.shielding.card}`;
    } else {
      answerHtml = `
        <p>I have queried the EstateOS repository for: "<b>${escapeHtml(text)}</b>".</p>
        <p style="font-size:0.82rem;color:#6B645B;margin-top:6px;">Your query has been indexed against active builder inventory, engineering milestones, and brokerage availability. Would you like to schedule a direct walkthrough with an authorized consultant?</p>
      `;
    }
    botMsg.querySelector('.msg-content').innerHTML = answerHtml;
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 750);
};

function initAiAssistant() {
  // Ready
}

function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  }[tag] || tag));
}

/* ================= 12. PRICING CALCULATOR & TOGGLE ================= */
let isAnnualBilling = false;

function initPricingToggle() {
  const toggleBtn = document.getElementById('billingToggle');
  const starterPrice = document.getElementById('priceStarter');
  const businessPrice = document.getElementById('priceBusiness');
  const lblMonthly = document.getElementById('lblMonthly');
  const lblAnnual = document.getElementById('lblAnnual');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      isAnnualBilling = !isAnnualBilling;
      toggleBtn.classList.toggle('active', isAnnualBilling);

      if (starterPrice) {
        starterPrice.textContent = isAnnualBilling ? '80' : '100';
      }
      if (businessPrice) {
        businessPrice.textContent = isAnnualBilling ? '400' : '500';
      }

      if (isAnnualBilling) {
        lblAnnual.style.fontWeight = '700';
        lblMonthly.style.fontWeight = '500';
        showToast('Applied Annual Discount: 20% off all plans!');
      } else {
        lblMonthly.style.fontWeight = '700';
        lblAnnual.style.fontWeight = '500';
        showToast('Switched to standard Monthly billing.');
      }
    });
  }
}

window.selectPricingPlan = function(planName) {
  openDemoModal();
  showToast(`Selected ${planName} Plan. Complete the form to schedule setup.`);
};

/* ================= 13. MODALS, ROLE DETAILS & TOASTS ================= */
const roleModalDetails = {
  developer: {
    pill: 'DEVELOPER COMMAND CENTER',
    title: 'Centralized Command Center for Builders',
    subtitle: 'From land acquisition and architectural drafts to contractor material releases and sales handovers.',
    body: `
      <div style="display:flex;flex-direction:column;gap:14px;color:#6B645B;font-size:0.92rem;line-height:1.6;">
        <p><b>Core Capability:</b> Complete operational visibility across projects, employees, engineers, designers, contractors, materials, property listings, sales, marketing, and broker relationships.</p>
        <div style="background:#FAF7F2;padding:16px;border-radius:12px;border:1px solid #E2D9CC;">
          <h4 style="color:#1C1917;margin-bottom:8px;">Key Capabilities:</h4>
          <ul style="padding-left:18px;display:flex;flex-direction:column;gap:6px;">
            <li><b>Real-time Site Velocity:</b> Site supervisors log material consumption, slump tests, and foundation pours with GPS validation.</li>
            <li><b>Role-based Authority Matrix:</b> Decide exactly who can view, edit, approve, or manage inventory units and discounts.</li>
            <li><b>Centralized Inventory Release:</b> Eliminate duplicate unit bookings across multiple external brokerage firms.</li>
            <li><b>Auditing & BI:</b> Bird's-eye metrics on cost per square foot, contractor delay risks, and sales run rates.</li>
          </ul>
        </div>
      </div>
    `
  },
  broker: {
    pill: 'BROKERAGE ECOSYSTEM',
    title: 'Brokerage Operations in One Integrated Environment',
    subtitle: 'Manage agent teams, distribute leads without conflict, and access verified builder inventory.',
    body: `
      <div style="display:flex;flex-direction:column;gap:14px;color:#6B645B;font-size:0.92rem;line-height:1.6;">
        <p><b>Core Capability:</b> Integrated lead and property management environment enabling agency owners to oversee performance while agents showcase rich 3D models and verified floor plans.</p>
        <div style="background:#FAF7F2;padding:16px;border-radius:12px;border:1px solid #E2D9CC;">
          <h4 style="color:#1C1917;margin-bottom:8px;">Key Capabilities:</h4>
          <ul style="padding-left:18px;display:flex;flex-direction:column;gap:6px;">
            <li><b>Lead Routing Engine:</b> Distribute inbound buyer leads based on geography, price segment, and agent conversion score.</li>
            <li><b>Builder-Authorized Assets:</b> Direct access to 4K photography, legal approvals, RERA numbers, and 3D walkthroughs.</li>
            <li><b>Automated Tour Coordination:</b> Synchronize buyer calendars with developer site supervisors for guided walkthroughs.</li>
            <li><b>Commission Tracking:</b> Real-time visibility into transaction milestone achievements and payout schedules.</li>
          </ul>
        </div>
      </div>
    `
  },
  buyer: {
    pill: 'SHIELDED BUYER EXPERIENCE',
    title: 'Customer Experience with Reduced Contact Exposure',
    subtitle: 'Protecting homebuyers from indiscriminate spam calls, fragmented information, and untrusted listings.',
    body: `
      <div style="display:flex;flex-direction:column;gap:14px;color:#6B645B;font-size:0.92rem;line-height:1.6;">
        <p><b>Core Capability:</b> A privacy-first property discovery and transaction hub. Customers interact directly with authorized brokers without their private phone numbers being broadcasted across external networks.</p>
        <div style="background:#FAF7F2;padding:16px;border-radius:12px;border:1px solid #E2D9CC;">
          <h4 style="color:#1C1917;margin-bottom:8px;">Key Capabilities:</h4>
          <ul style="padding-left:18px;display:flex;flex-direction:column;gap:6px;">
            <li><b>Platform Relay Communication:</b> Built-in encrypted chat and voice calling prevent personal contact leakage.</li>
            <li><b>AI Property Concierge:</b> Instant 24/7 answers to floorplans, structural specifications, and milestone progress.</li>
            <li><b>Verified RERA Listings:</b> Only builder-authorized properties with verified titles and genuine price points.</li>
            <li><b>Digital Unit Reservation:</b> Seamless KYC validation, agreement generation, and milestone tracking.</li>
          </ul>
        </div>
      </div>
    `
  }
};

window.openRoleModal = function(role) {
  const modal = document.getElementById('roleModal');
  const details = roleModalDetails[role];
  if (!modal || !details) return;

  document.getElementById('roleModalPill').textContent = details.pill;
  document.getElementById('roleModalTitle').textContent = details.title;
  document.getElementById('roleModalSubtitle').textContent = details.subtitle;
  document.getElementById('roleModalBody').innerHTML = details.body;

  modal.classList.add('active');
};

window.openDemoModal = function() {
  const modal = document.getElementById('demoModal');
  if (modal) modal.classList.add('active');
};

window.openWhitepaperModal = function() {
  const modal = document.getElementById('whitepaperModal');
  if (modal) modal.classList.add('active');
};

window.downloadWhitepaperDoc = function() {
  showToast('Generating official EstateOS Whitepaper v1.1 PDF...');
  setTimeout(() => {
    openWhitepaperModal();
  }, 600);
};

window.handleDemoSubmit = function(e) {
  e.preventDefault();
  const modal = document.getElementById('demoModal');
  if (modal) modal.classList.remove('active');
  showToast('🎉 Demo request confirmed! An EstateOS specialist will connect with you within 2 business hours.');
};

function initModalsAndToasts() {
  const demoModal = document.getElementById('demoModal');
  const roleModal = document.getElementById('roleModal');
  const whitepaperModal = document.getElementById('whitepaperModal');

  // Open demo buttons
  const openDemoBtn = document.getElementById('openDemoBtn');
  const heroBookDemoBtn = document.getElementById('heroBookDemoBtn');
  const bottomCtaBtn = document.getElementById('bottomCtaBtn');
  const openPortalBtn = document.getElementById('openPortalBtn');

  if (openDemoBtn) openDemoBtn.addEventListener('click', openDemoModal);
  if (heroBookDemoBtn) heroBookDemoBtn.addEventListener('click', openDemoModal);
  if (bottomCtaBtn) bottomCtaBtn.addEventListener('click', openDemoModal);

  if (openPortalBtn) {
    openPortalBtn.addEventListener('click', () => {
      openRoleModal('developer');
      showToast('Welcome to EstateOS Client Portal Demo');
    });
  }

  // Close modals
  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('active'));
    });
  });

  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  });
}

function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span style="color:#966A38;font-size:1.1rem;">⚡</span>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-20px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3400);
}
