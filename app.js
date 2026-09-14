/**
 * A B Vigneshvaran - Executive Portfolio Interaction Script
 * Features: Dark/Light Mode, Number Counters, Dynamic Case Modals with Banners,
 * Recruiter Snapshot Drawer, Toast Notifications, and Recruiter Mailer.
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMetricCounters();
  initMobileMenu();
  initModals();
  initScrollNav();
});

/* ==========================================================================
   THEME TOGGLE
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const currentTheme = localStorage.getItem('abv_theme') || 'dark';

  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme, themeIcon);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('abv_theme', newTheme);
      updateThemeIcon(newTheme, themeIcon);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark Executive' : 'Crisp Light'} mode`);
    });
  }
}

function updateThemeIcon(theme, iconEl) {
  if (!iconEl) return;
  if (theme === 'light') {
    iconEl.className = 'fa-solid fa-sun';
  } else {
    iconEl.className = 'fa-solid fa-moon';
  }
}

/* ==========================================================================
   METRIC COUNTER ANIMATION
   ========================================================================== */
function initMetricCounters() {
  const counters = document.querySelectorAll('.metric-counter');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const duration = 1600; // ms
          const stepTime = 20;
          const totalSteps = duration / stepTime;
          const stepValue = target / totalSteps;
          let current = 0;

          const timer = setInterval(() => {
            current += stepValue;
            if (current >= target) {
              counter.innerText = target;
              clearInterval(timer);
            } else {
              counter.innerText = Math.floor(current);
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const metricsSection = document.getElementById('impact');
  if (metricsSection) {
    observer.observe(metricsSection);
  }
}

/* ==========================================================================
   MOBILE MENU
   ========================================================================== */
function initMobileMenu() {
  const toggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const links = document.querySelectorAll('.nav-link');

  if (toggle && navMenu) {
    toggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    links.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }
}

/* ==========================================================================
   MODAL CONTROLLER (Recruiter 60s View & Dynamic Case Studies)
   ========================================================================== */
const caseStudiesData = {
  financeanalytics: {
    tag: 'Finance & Business Analytics',
    tagClass: 'tag-teal',
    banner: 'assets/finance_analytics_project.jpg',
    title: 'Financial Valuation & Predictive Business Analytics',
    context: 'Great Lakes PGPM Specialization | DCF Modeling & Machine Learning',
    overview: 'Integrated corporate finance valuation with advanced unsupervised & supervised business analytics to assess enterprise value, customer segmentation, and financial risk.',
    sections: [
      {
        heading: 'Discounted Cash Flow (DCF) & Valuation Modeling',
        icon: 'fa-solid fa-calculator',
        content: 'Constructed multi-stage DCF models estimating Weighted Average Cost of Capital (WACC), terminal value growth parameters, and free cash flows to firm (FCFF). Conducted sensitivity analysis across cost of equity and revenue variance.'
      },
      {
        heading: 'Cluster Analysis (K-Means & Hierarchical Dendrograms)',
        icon: 'fa-solid fa-diagram-project',
        content: 'Engineered customer and product cluster segmentation models in Python/Excel. Utilized elbow curves and silhouette coefficient optimization to isolate high-margin buyer personas and optimize working capital allocation.'
      },
      {
        heading: 'Predictive Regression & Financial Ratio Diagnostics',
        icon: 'fa-solid fa-chart-line',
        content: 'Formulated econometric multivariate regression models predicting revenue sensitivity and operational risk metrics (ROIC, EBITDA margins, Debt-to-Equity thresholds).'
      }
    ],
    pills: ['DCF Valuation', 'WACC Estimation', 'Cluster Analysis (Dendrograms)', 'Multivariate Regression', 'Sensitivity Modeling']
  },
  sweden: {
    tag: 'Macroeconomic Strategy & Geopolitics',
    tagClass: 'tag-blue',
    banner: 'assets/sweden_project.jpg',
    title: 'Macro-Economic Strategy Analysis &bull; Sweden',
    context: 'Academic & Strategy Research | CFER Macro-Performance Evaluation',
    overview: 'An in-depth structural evaluation of Sweden’s macroeconomic vulnerabilities amidst shifting European monetary dynamics, supply chain dislocations, and geopolitical energy vectors.',
    sections: [
      {
        heading: 'Strategic Diagnosis & Vulnerability Vectors',
        icon: 'fa-solid fa-triangle-exclamation',
        content: 'Evaluated the sensitivity of Sweden’s export-reliant economy to global interest rate volatility, cross-border energy fluctuations, and domestic housing debt exposure. Decomposed inflation vectors across imported goods and structural energy bottlenecks.'
      },
      {
        heading: 'Econometric Modeling & Scenario Analysis',
        icon: 'fa-solid fa-chart-line',
        content: 'Benchmarked Swedish Riksbank policy interventions against ECB rates. Formulated dynamic scenario models to test GDP resiliency across differing inflation trajectories and trade volatility parameters.'
      },
      {
        heading: 'Policy & Infrastructure-Led Growth Roadmap',
        icon: 'fa-solid fa-road',
        content: 'Proposed targeted capital allocation frameworks prioritizing green infrastructure stimulus and digital energy grid stabilization to buffer domestic manufacturing against supply shocks and anchor long-term price stability.'
      }
    ],
    pills: ['Macroeconomic Modeling', 'Inflation Diagnostics', 'Infrastructure Stimulus', 'Geopolitical Risk Strategy']
  },
  nutribite: {
    tag: 'Market Entry & GTM Strategy',
    tagClass: 'tag-indigo',
    banner: 'assets/nutribite_project.jpg',
    title: 'Premium Market Entry Strategy &bull; NutriBite 2.0',
    context: 'Market Segmentation, Consumer Behavior & Business Model Strategy',
    overview: 'Formulated a comprehensive Go-To-Market (GTM) entry blueprint for a premium functional health snack brand, targeting Tier-1 urban Indian consumers seeking clean nutrition without compromising taste.',
    sections: [
      {
        heading: 'Market Gap & Consumer Behavior Analysis',
        icon: 'fa-solid fa-magnifying-glass',
        content: 'Identified an underserved "Taste-First" health gap where existing clean-label snacks suffered from low repeat purchase rates due to compromised palatability. Validated consumer willing-to-pay premiums across urban demographic clusters.'
      },
      {
        heading: 'Competitor Benchmarking & Pricing Strategy',
        icon: 'fa-solid fa-scale-balanced',
        content: 'Benchmarked incumbent healthy snacking players and artisanal D2C brands. Structured value-based unit economics with high gross margin buffers to support multi-channel retail margins.'
      },
      {
        heading: 'Asset-Light Production & Omnichannel GTM',
        icon: 'fa-solid fa-truck-ramp-box',
        content: 'Engineered a scalable supply chain by leveraging contract manufacturing partners with existing quality certifications, paired with an omnichannel rollout (Quick-Commerce, Modern Trade, and Brand D2C).'
      }
    ],
    pills: ['GTM Strategy', 'Consumer Insights', 'Competitive Benchmarking', 'Unit Economics', 'Channel Strategy']
  },
  ideathon: {
    tag: 'Ideathon 1st Place Winner',
    tagClass: 'tag-gold',
    banner: 'assets/ideathon_1.jpg',
    title: 'Ideathon Case Competition Winner &bull; GLIM Chennai',
    context: 'Great Lakes Institute of Management | 1st Place Flagship Case Challenge (2026)',
    overview: 'Secured 1st Place in the prestigious campus-wide Ideathon by formulating an actionable, commercially viable business model tackling modern enterprise friction.',
    sections: [
      {
        heading: 'The Problem Statement & Business Opportunity',
        icon: 'fa-solid fa-lightbulb',
        content: 'Addressed complex commercial and operational bottlenecks in an emerging market domain, synthesizing market friction into an actionable value-creation model.'
      },
      {
        heading: 'Strategic Synthesis & Operational Feasibility',
        icon: 'fa-solid fa-cubes-stacked',
        content: 'Built a multi-stage execution framework integrating tech-enabled workflow orchestration, risk mitigation safeguards, and realistic resource allocation models.'
      },
      {
        heading: 'Executive Pitch & Winning Defense',
        icon: 'fa-solid fa-award',
        content: 'Presented a high-impact boardroom pitch to senior faculty and corporate jury members, successfully defending unit economics, market adoption kinetics, and scalability.'
      }
    ],
    pills: ['1st Place Winner', 'Strategic Pitching', 'Business Model Design', 'Financial Feasibility', 'Executive Defense']
  }
};

function initModals() {
  const recruiterModal = document.getElementById('recruiterModal');
  const openRecruiterSnapBtn = document.getElementById('openRecruiterSnapBtn');
  const heroRecruiterBtn = document.getElementById('heroRecruiterBtn');
  const closeRecruiterModalBtn = document.getElementById('closeRecruiterModalBtn');

  const caseModal = document.getElementById('caseStudyModal');
  const closeCaseModalBtn = document.getElementById('closeCaseModalBtn');

  // Open Recruiter Snapshot
  if (openRecruiterSnapBtn) {
    openRecruiterSnapBtn.addEventListener('click', () => openModal(recruiterModal));
  }
  if (heroRecruiterBtn) {
    heroRecruiterBtn.addEventListener('click', () => openModal(recruiterModal));
  }
  if (closeRecruiterModalBtn) {
    closeRecruiterModalBtn.addEventListener('click', () => closeModal(recruiterModal));
  }

  // Close Case Study Modal
  if (closeCaseModalBtn) {
    closeCaseModalBtn.addEventListener('click', () => closeModal(caseModal));
  }

  // Close on outside overlay click
  window.addEventListener('click', (e) => {
    if (e.target === recruiterModal) closeModal(recruiterModal);
    if (e.target === caseModal) closeModal(caseModal);
  });

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (recruiterModal.classList.contains('active')) closeModal(recruiterModal);
      if (caseModal.classList.contains('active')) closeModal(caseModal);
    }
  });
}

function openModal(modalEl) {
  if (!modalEl) return;
  modalEl.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(modalEl) {
  if (!modalEl) return;
  modalEl.classList.remove('active');
  document.body.style.overflow = '';
}

// Global case study opener called from HTML
window.openCaseModal = function(caseKey) {
  const caseData = caseStudiesData[caseKey];
  if (!caseData) return;

  const contentContainer = document.getElementById('caseStudyModalContent');
  if (!contentContainer) return;

  let sectionsHtml = '';
  caseData.sections.forEach(sec => {
    sectionsHtml += `
      <div class="case-section-box">
        <h4><i class="${sec.icon}"></i> ${sec.heading}</h4>
        <p>${sec.content}</p>
      </div>
    `;
  });

  let pillsHtml = '';
  caseData.pills.forEach(pill => {
    pillsHtml += `<span class="case-metric-pill">${pill}</span>`;
  });

  contentContainer.innerHTML = `
    <img src="${caseData.banner}" alt="${caseData.title}" class="modal-banner-img">
    <div class="modal-inner-scroll">
      <div class="case-modal-header">
        <span class="tag ${caseData.tagClass}">${caseData.tag}</span>
        <h2 id="caseModalTitle" class="modal-title mt-2">${caseData.title}</h2>
        <p class="modal-subtitle">${caseData.context}</p>
      </div>

      <div class="modal-body-content">
        <div class="pitch-summary-card">
          <h4><i class="fa-solid fa-circle-info"></i> Executive Overview</h4>
          <p>${caseData.overview}</p>
        </div>

        <div class="case-detail-grid">
          ${sectionsHtml}
        </div>

        <div class="case-metrics-highlight">
          ${pillsHtml}
        </div>

        <div class="recruiter-contact-strip">
          <div class="recruiter-contact-actions">
            <a href="mailto:vigneshvaran.ft271027@greatlakes.edu.in?subject=Discussion%20re:%20${encodeURIComponent(caseData.title)}" class="btn btn-primary">
              <i class="fa-solid fa-envelope"></i> Discuss this Case
            </a>
            <button class="btn btn-ghost" onclick="closeModal(document.getElementById('caseStudyModal'))">
              Close Case View
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  openModal(document.getElementById('caseStudyModal'));
};

/* ==========================================================================
   SCROLL ACTIVE NAVIGATION HIGHLIGHTER
   ========================================================================== */
function initScrollNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.pageYOffset + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   COPY CONTACT INFO HELPER
   ========================================================================== */
window.copyContactInfo = function(textToCopy, successMessage) {
  navigator.clipboard.writeText(textToCopy).then(() => {
    showToast(successMessage || 'Copied to clipboard!');
  }).catch(() => {
    const tempInput = document.createElement('input');
    tempInput.value = textToCopy;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast(successMessage || 'Copied to clipboard!');
  });
};

/* ==========================================================================
   TOAST NOTIFICATION
   ========================================================================== */
let toastTimeout;
window.showToast = function(message) {
  const toast = document.getElementById('toastNotice');
  const toastMsg = document.getElementById('toastMsg');
  if (!toast || !toastMsg) return;

  toastMsg.innerText = message;
  toast.classList.add('active');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('active');
  }, 3200);
};

/* ==========================================================================
   RECRUITER CONTACT FORM HANDLER
   ========================================================================== */
window.handleRecruiterFormSubmit = function(e) {
  e.preventDefault();
  
  const name = document.getElementById('recruiterName').value.trim();
  const email = document.getElementById('recruiterEmail').value.trim();
  const roleType = document.getElementById('roleType').value;
  const message = document.getElementById('messageText').value.trim();

  const recipient = 'vigneshvaran.ft271027@greatlakes.edu.in';
  const subject = encodeURIComponent(`[Portfolio Inquiry] ${roleType} - ${name}`);
  const body = encodeURIComponent(
    `Hello A B Vigneshvaran,\n\n` +
    `My name is ${name} (${email}).\n` +
    `I am reaching out regarding: ${roleType}\n\n` +
    `Message:\n${message}\n\n` +
    `Best regards,\n${name}`
  );

  showToast('Opening default email client...');
  
  setTimeout(() => {
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  }, 600);
};
