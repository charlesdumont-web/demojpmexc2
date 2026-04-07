// ============================================================
// JPM Ops — Application Core
// Router, state management, page rendering
// ============================================================

// ---- SVG Icon helpers ----
const ICONS = {
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  arrowLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
  upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
};

// ---- State ----
let currentPage = 'dashboard';
let ingestionStep = 0;

// ---- Router ----
function navigate(page) {
  currentPage = page;
  document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
  const base = page.split('/')[0];
  const navEl = document.querySelector(`[data-page="${base}"]`);
  if (navEl) navEl.classList.add('active');
  renderPage();
}

function renderPage() {
  const main = document.getElementById('main-content');
  const parts = currentPage.split('/');
  const page = parts[0];
  const id = parts[1] || null;

  const renderers = {
    'dashboard': renderDashboard,
    'invoices': renderInvoices,
    'invoice': () => renderInvoiceDetail(id),
    'ingestion': renderIngestion,
    'purchase-orders': renderPurchaseOrders,
    'po': () => renderPODetail(id),
    'price-lists': renderPriceLists,
    'delivery-tickets': renderDeliveryTickets,
    'projects': renderProjects,
    'project': () => renderProjectDetail(id),
  };

  const renderer = renderers[page];
  if (renderer) {
    main.innerHTML = '';
    renderer();
    main.querySelector('.page-enter')?.scrollIntoView({ behavior: 'instant', block: 'start' });
  }
}

// ---- Toast ----
function showToast(message, type = 'info') {
  const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span class="toast-icon">${icons[type]}</span><span class="toast-message">${message}</span><button class="toast-close" onclick="this.parentElement.remove()">×</button>`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.animation = 'slideOutRight 0.3s ease forwards'; setTimeout(() => toast.remove(), 300); }, 4000);
}

// ---- Status Badge Helper ----
function statusBadge(status) {
  const map = {
    'Validée': 'status-validated', 'Anomalie': 'status-anomaly',
    'En attente': 'status-pending', 'Rejetée': 'status-rejected', 'Retournée': 'status-returned',
  };
  return `<span class="status-badge ${map[status] || 'status-pending'}">${status}</span>`;
}

function validationIcon(status) {
  if (status === 'valid') return `<div class="validation-icon valid">✓</div>`;
  if (status === 'warning') return `<div class="validation-icon warning">!</div>`;
  return `<div class="validation-icon error">✕</div>`;
}

// ---- Confidence Ring ----
function confidenceRing(value) {
  const r = 22, c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  const color = value >= 80 ? 'var(--color-success)' : value >= 50 ? 'var(--color-warning)' : 'var(--color-error)';
  return `<div class="confidence-ring"><svg viewBox="0 0 56 56"><circle class="track" cx="28" cy="28" r="${r}"/><circle class="fill" cx="28" cy="28" r="${r}" stroke="${color}" stroke-dasharray="${c}" stroke-dashoffset="${offset}"/></svg><div class="confidence-ring-value">${value}%</div></div>`;
}

// ============================================================
// PAGE: Dashboard
// ============================================================
function renderDashboard() {
  const kpis = getKPIs();
  const main = document.getElementById('main-content');
  main.innerHTML = `
    <div class="page-header">
      <div class="page-header-top">
        <div><h1 class="page-title">Tableau de bord</h1><p class="page-subtitle">Vue d'ensemble des opérations — Avril 2026</p></div>
        <div class="page-actions">
          <button class="btn btn-primary" onclick="navigate('ingestion')">
            ${ICONS.upload} Nouvelle facture
          </button>
        </div>
      </div>
    </div>
    <div class="page-body page-enter">
      <div class="kpi-grid">
        <div class="kpi-card kpi-blue">
          <div class="kpi-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div>
          <div class="kpi-value">${kpis.total}</div>
          <div class="kpi-label">Factures ce mois</div>
          <div class="kpi-change positive">↑ 12% vs mois dernier</div>
        </div>
        <div class="kpi-card kpi-green">
          <div class="kpi-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg></div>
          <div class="kpi-value">${kpis.autoApprovedPct}%</div>
          <div class="kpi-label">Auto-approuvées</div>
          <div class="kpi-change positive">↑ 8% vs mois dernier</div>
        </div>
        <div class="kpi-card kpi-red">
          <div class="kpi-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div>
          <div class="kpi-value">${kpis.anomalies}</div>
          <div class="kpi-label">Anomalies détectées</div>
          <div class="kpi-change negative">↑ 2 cette semaine</div>
        </div>
        <div class="kpi-card kpi-amber">
          <div class="kpi-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
          <div class="kpi-value">34h</div>
          <div class="kpi-label">Temps économisé</div>
          <div class="kpi-change positive">≈ 4 250$ d'économies</div>
        </div>
      </div>

      <div class="grid-2-1">
        <div class="card">
          <div class="card-header"><span class="card-title">Dernières factures</span><button class="btn btn-ghost btn-sm" onclick="navigate('invoices')">Voir tout →</button></div>
          <div class="card-body" style="padding:0">
            <table class="data-table">
              <thead><tr><th>N° Facture</th><th>Fournisseur</th><th>Projet</th><th>Montant</th><th>Statut</th></tr></thead>
              <tbody>
                ${INVOICES.slice(0, 7).map(inv => `
                  <tr onclick="navigate('invoice/${inv.id}')">
                    <td class="col-id">${inv.invoiceNumber}</td>
                    <td class="supplier-name">${getSupplier(inv.supplierId).name}</td>
                    <td>${getProject(inv.projectId).name}</td>
                    <td class="col-amount">${formatCurrency(inv.totalAmount)}</td>
                    <td>${statusBadge(inv.status)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:20px">
          <div class="card">
            <div class="card-header"><span class="card-title">Anomalies actives</span></div>
            <div class="card-body">
              ${INVOICES.filter(i => i.status === 'Anomalie').map(inv => `
                <div class="flagged-issue severity-high" style="cursor:pointer" onclick="navigate('invoice/${inv.id}')">
                  <div class="flagged-issue-icon">⚠️</div>
                  <div class="flagged-issue-content">
                    <div class="flagged-issue-message">${inv.statusDetail} — ${getSupplier(inv.supplierId).name}</div>
                    <div class="flagged-issue-meta">
                      <span class="severity-tag high">${inv.flaggedIssues[0]?.type || 'anomalie'}</span>
                      <span style="font-size:11px;color:var(--color-text-tertiary)">${formatCurrency(inv.totalAmount)}</span>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="card">
            <div class="card-header"><span class="card-title">Volume mensuel</span></div>
            <div class="card-body">
              <div class="bar-chart">
                ${['Oct','Nov','Déc','Jan','Fév','Mar'].map((m, i) => {
                  const vals = [28,35,31,42,38,47];
                  const h = (vals[i] / 50) * 100;
                  return `<div class="bar-chart-item"><div class="bar-chart-value">${vals[i]}</div><div class="bar-chart-bar" style="height:${h}%"></div><div class="bar-chart-label">${m}</div></div>`;
                }).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
}

// ============================================================
// PAGE: Invoices List
// ============================================================
function renderInvoices() {
  const main = document.getElementById('main-content');
  main.innerHTML = `
    <div class="page-header">
      <div class="page-header-top">
        <div><h1 class="page-title">Factures</h1><p class="page-subtitle">${INVOICES.length} factures au total</p></div>
        <div class="page-actions">
          <button class="btn btn-primary" onclick="navigate('ingestion')">${ICONS.upload} Nouvelle facture</button>
        </div>
      </div>
    </div>
    <div class="page-body page-enter">
      <div class="filter-bar">
        <input type="text" placeholder="Rechercher par fournisseur, numéro..." id="invoice-search" oninput="filterInvoices()">
        <select id="invoice-status-filter" onchange="filterInvoices()">
          <option value="">Tous les statuts</option>
          <option value="Validée">Validée</option>
          <option value="En attente">En attente</option>
          <option value="Anomalie">Anomalie</option>
          <option value="Rejetée">Rejetée</option>
          <option value="Retournée">Retournée</option>
        </select>
      </div>
      <div class="card">
        <div class="card-body" style="padding:0">
          <table class="data-table" id="invoices-table">
            <thead><tr><th>N° Facture</th><th>Date</th><th>Fournisseur</th><th>Projet</th><th>Montant</th><th>Confiance IA</th><th>Statut</th></tr></thead>
            <tbody id="invoices-tbody">
              ${renderInvoiceRows(INVOICES)}
            </tbody>
          </table>
        </div>
      </div>
    </div>`;
}

function renderInvoiceRows(invoices) {
  return invoices.map(inv => `
    <tr onclick="navigate('invoice/${inv.id}')">
      <td class="col-id">${inv.invoiceNumber}</td>
      <td>${formatDate(inv.date)}</td>
      <td class="supplier-name">${getSupplier(inv.supplierId).name}</td>
      <td>${getProject(inv.projectId).name}</td>
      <td class="col-amount">${formatCurrency(inv.totalAmount)}</td>
      <td><div class="confidence-bar"><div class="confidence-bar-track"><div class="confidence-bar-fill ${inv.aiConfidence >= 80 ? 'high' : inv.aiConfidence >= 50 ? 'medium' : 'low'}" style="width:${inv.aiConfidence}%"></div></div>${inv.aiConfidence}%</div></td>
      <td>${statusBadge(inv.status)}</td>
    </tr>
  `).join('');
}

function filterInvoices() {
  const search = document.getElementById('invoice-search').value.toLowerCase();
  const status = document.getElementById('invoice-status-filter').value;
  const filtered = INVOICES.filter(inv => {
    const s = getSupplier(inv.supplierId);
    const matchSearch = !search || s.name.toLowerCase().includes(search) || inv.invoiceNumber.toLowerCase().includes(search);
    const matchStatus = !status || inv.status === status;
    return matchSearch && matchStatus;
  });
  document.getElementById('invoices-tbody').innerHTML = renderInvoiceRows(filtered);
}

// ============================================================
// PAGE: Invoice Detail
// ============================================================
function renderInvoiceDetail(id) {
  const inv = getInvoice(id);
  if (!inv) return;
  const supplier = getSupplier(inv.supplierId);
  const project = getProject(inv.projectId);
  const po = inv.poId ? getPO(inv.poId) : null;
  const tickets = getTicketsByInvoice(inv.id);
  const main = document.getElementById('main-content');

  const validationLabels = {
    priceList: 'Liste de prix',
    deliveryTickets: 'Tickets de livraison',
    purchaseOrder: 'Bon de commande',
  };

  const canApprove = inv.status === 'En attente' || inv.status === 'Anomalie';

  main.innerHTML = `
    <div class="page-header">
      <div class="page-header-top">
        <div>
          <div class="back-link" onclick="navigate('invoices')">${ICONS.arrowLeft} Retour aux factures</div>
          <h1 class="page-title">Facture ${inv.invoiceNumber}</h1>
          <p class="page-subtitle">${supplier.name} — ${project.name}</p>
        </div>
        <div class="page-actions">${statusBadge(inv.status)}</div>
      </div>
    </div>
    <div class="page-body page-enter">
      <div class="invoice-header-info">
        <div class="info-block"><div class="info-block-label">Fournisseur</div><div class="info-block-value">${supplier.name}</div></div>
        <div class="info-block"><div class="info-block-label">Date de facture</div><div class="info-block-value">${formatDate(inv.date)}</div></div>
        <div class="info-block"><div class="info-block-label">Échéance</div><div class="info-block-value">${formatDate(inv.dueDate)}</div></div>
        <div class="info-block"><div class="info-block-label">Montant total</div><div class="info-block-value large">${formatCurrency(inv.totalAmount)}</div></div>
      </div>

      <div class="invoice-detail-layout">
        <div>
          <div class="card mb-6">
            <div class="card-header"><span class="card-title">Lignes de facture extraites par IA</span><span style="font-size:11px;color:var(--color-text-tertiary)">Extraction automatique</span></div>
            <div class="card-body" style="padding:0">
              <table class="data-table">
                <thead><tr><th>Matériau</th><th>Quantité</th><th>Unité</th><th>Prix unitaire</th><th style="text-align:right">Total</th></tr></thead>
                <tbody>
                  ${inv.lines.map(l => `<tr style="cursor:default"><td class="supplier-name">${l.material}</td><td>${formatNumber(l.quantity)}</td><td>${l.unit}</td><td>${formatCurrency(l.unitPrice)}</td><td class="col-amount">${formatCurrency(l.total)}</td></tr>`).join('')}
                </tbody>
                <tfoot><tr style="cursor:default"><td colspan="4" style="text-align:right;font-weight:700;padding:14px 16px;border-top:2px solid var(--color-border)">Total facture</td><td class="col-amount" style="font-weight:800;font-size:15px;border-top:2px solid var(--color-border)">${formatCurrency(inv.totalAmount)}</td></tr></tfoot>
              </table>
            </div>
          </div>

          ${tickets.length > 0 ? `
          <div class="card mb-6">
            <div class="card-header"><span class="card-title">Tickets de livraison associés</span><span style="font-size:11px;color:var(--color-text-tertiary)">${tickets.length} ticket(s)</span></div>
            <div class="card-body" style="padding:0">
              <table class="data-table">
                <thead><tr><th>N° Ticket</th><th>Date</th><th>Matériau</th><th>Quantité</th><th>Camion</th></tr></thead>
                <tbody>${tickets.map(t => `<tr style="cursor:default"><td class="col-id">${t.id}</td><td>${formatDate(t.date)}</td><td>${t.material}</td><td>${formatNumber(t.quantity)} ${t.unit}</td><td>${t.truckId}</td></tr>`).join('')}</tbody>
              </table>
            </div>
          </div>` : ''}

          ${po ? `
          <div class="card mb-6">
            <div class="card-header"><span class="card-title">Bon de commande ${po.id}</span></div>
            <div class="card-body">
              <p style="font-size:13px;color:var(--color-text-secondary);margin-bottom:12px">${po.description}</p>
              <div class="progress-info"><span>Utilisé: ${formatCurrency(po.amountUsed)}</span><span>Autorisé: ${formatCurrency(po.amountAuthorized)}</span></div>
              <div class="progress-bar"><div class="progress-bar-fill ${(po.amountUsed / po.amountAuthorized) > 0.9 ? 'red' : (po.amountUsed / po.amountAuthorized) > 0.7 ? 'amber' : 'blue'}" style="width:${Math.min(100, (po.amountUsed / po.amountAuthorized) * 100)}%"></div></div>
              <div class="progress-info"><span>${Math.round((po.amountUsed / po.amountAuthorized) * 100)}% utilisé</span><span>Reste: ${formatCurrency(po.amountAuthorized - po.amountUsed)}</span></div>
            </div>
          </div>` : ''}

          ${canApprove ? `
          <div class="approval-actions">
            <span class="label">Actions d'approbation :</span>
            <button class="btn btn-success" onclick="handleApproval('${inv.id}', 'approve')">✓ Approuver</button>
            <button class="btn btn-danger" onclick="handleApproval('${inv.id}', 'reject')">✕ Rejeter</button>
            <button class="btn btn-warning" onclick="handleApproval('${inv.id}', 'return')">↩ Retourner</button>
          </div>` : ''}
        </div>

        <div>
          <div class="card mb-6">
            <div class="card-header">
              <span class="card-title">Validation IA</span>
              ${confidenceRing(inv.aiConfidence)}
            </div>
            <div class="card-body">
              <div class="validation-panel">
                ${Object.entries(inv.validation).map(([key, v]) => `
                  <div class="validation-check">
                    ${validationIcon(v.status)}
                    <div class="validation-content">
                      <div class="validation-title">${validationLabels[key]}</div>
                      <div class="validation-detail">${v.details}</div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          ${inv.flaggedIssues.length > 0 ? `
          <div class="card">
            <div class="card-header"><span class="card-title">Problèmes signalés</span><span class="sidebar-badge">${inv.flaggedIssues.length}</span></div>
            <div class="card-body">
              ${inv.flaggedIssues.map(issue => `
                <div class="flagged-issue severity-${issue.severity}">
                  <div class="flagged-issue-icon">${issue.severity === 'critical' ? '🚨' : issue.severity === 'high' ? '⚠️' : issue.severity === 'medium' ? '⚡' : 'ℹ️'}</div>
                  <div class="flagged-issue-content">
                    <div class="flagged-issue-message">${issue.message}</div>
                    <div class="flagged-issue-meta">
                      <span class="severity-tag ${issue.severity}">${issue.type}</span>
                      <div class="confidence-bar"><span>Confiance</span><div class="confidence-bar-track"><div class="confidence-bar-fill ${issue.confidence >= 80 ? 'high' : issue.confidence >= 50 ? 'medium' : 'low'}" style="width:${issue.confidence}%"></div></div>${issue.confidence}%</div>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>` : ''}
        </div>
      </div>
    </div>`;
}

function handleApproval(invoiceId, action) {
  const inv = getInvoice(invoiceId);
  if (!inv) return;
  const msgs = { approve: ['Facture approuvée avec succès', 'success'], reject: ['Facture rejetée', 'error'], return: ['Facture retournée au fournisseur', 'warning'] };
  const statuses = { approve: 'Validée', reject: 'Rejetée', return: 'Retournée' };
  inv.status = statuses[action];
  inv.statusDetail = action === 'approve' ? 'Approuvée manuellement' : action === 'reject' ? 'Rejetée' : 'Retournée au fournisseur';
  showToast(msgs[action][0], msgs[action][1]);
  renderInvoiceDetail(invoiceId);
}

// ============================================================
// PAGE: Ingestion Flow
// ============================================================
function renderIngestion() {
  ingestionStep = 0;
  const main = document.getElementById('main-content');
  main.innerHTML = `
    <div class="page-header">
      <div class="page-header-top">
        <div>
          <div class="back-link" onclick="navigate('invoices')">${ICONS.arrowLeft} Retour</div>
          <h1 class="page-title">Nouvelle facture — Ingestion IA</h1>
          <p class="page-subtitle">Téléversez une facture pour extraction et validation automatique</p>
        </div>
      </div>
    </div>
    <div class="page-body page-enter">
      <div class="ingestion-steps">
        <div class="ingestion-step active" id="ing-step-1"><div class="step-circle">1</div><div class="step-label">Téléversement</div></div>
        <div class="ingestion-step" id="ing-step-2"><div class="step-circle">2</div><div class="step-label">Extraction IA</div></div>
        <div class="ingestion-step" id="ing-step-3"><div class="step-circle">3</div><div class="step-label">Validation</div></div>
        <div class="ingestion-step" id="ing-step-4"><div class="step-circle">4</div><div class="step-label">Résultat</div></div>
      </div>
      <div id="ingestion-content">
        <div class="card"><div class="card-body" style="padding:32px">
          <div class="upload-zone" id="upload-zone" onclick="startIngestion()">
            <div class="upload-zone-icon">📄</div>
            <div class="upload-zone-text">Cliquez pour téléverser une facture</div>
            <div class="upload-zone-hint">PDF, JPG ou email — Glissez-déposez ou cliquez</div>
          </div>
        </div></div>
      </div>
    </div>`;
}

function startIngestion() {
  // Step 1: Upload animation
  const zone = document.getElementById('upload-zone');
  zone.innerHTML = '<div class="upload-zone-icon animate-pulse">⏳</div><div class="upload-zone-text">Téléversement en cours...</div><div class="progress-bar mt-4"><div class="progress-bar-fill blue" id="upload-progress" style="width:0%;transition:width 1.5s ease"></div></div>';
  setTimeout(() => document.getElementById('upload-progress').style.width = '100%', 100);

  setTimeout(() => {
    setStep(1, 'completed'); setStep(2, 'active');
    showExtractionStep();
  }, 2000);
}

function setStep(num, state) {
  const el = document.getElementById(`ing-step-${num}`);
  el.className = `ingestion-step ${state}`;
  if (state === 'completed') el.querySelector('.step-circle').textContent = '✓';
}

function showExtractionStep() {
  const content = document.getElementById('ingestion-content');
  const fields = [
    ['Fournisseur', 'Pierre Excavation Inc.'],
    ['N° Facture', 'PE-2024-0892'],
    ['Date', '28 mars 2026'],
    ['Projet', 'Projet Montoni Phase 3'],
    ['Pierre concassée 0-3/4', '19.719 tonnes × 42,50$ = 838,06$'],
    ['MG-20', '185.400 tonnes × 38,75$ = 7 184,25$'],
    ['Excavation', '245.000 m³ × 28,50$ = 6 982,50$'],
    ['Transport', '1 forfait × 3 737,74$ = 3 737,74$'],
    ['Total', '18 742,55$'],
  ];
  content.innerHTML = `<div class="card"><div class="card-header"><span class="card-title">Extraction IA en cours...</span><span class="animate-pulse" style="color:var(--color-accent)">Analyse du document</span></div><div class="card-body">${fields.map((f, i) => `<div class="extraction-field" id="ext-field-${i}"><div class="extraction-field-label">${f[0]}</div><div class="extraction-field-value">${f[1]}</div><div class="extraction-field-check">✓</div></div>`).join('')}</div></div>`;

  fields.forEach((_, i) => {
    setTimeout(() => {
      document.getElementById(`ext-field-${i}`)?.classList.add('visible');
    }, 400 + i * 350);
  });

  setTimeout(() => {
    setStep(2, 'completed'); setStep(3, 'active');
    showValidationStep();
  }, 400 + fields.length * 350 + 800);
}

function showValidationStep() {
  const content = document.getElementById('ingestion-content');
  content.innerHTML = `<div class="card"><div class="card-header"><span class="card-title">Validation automatique</span></div><div class="card-body"><div class="validation-panel">
    <div class="validation-check" style="opacity:0" id="val-1">${validationIcon('valid')}<div class="validation-content"><div class="validation-title">Liste de prix</div><div class="validation-detail">Tous les prix correspondent à la liste du projet Montoni Phase 3.</div></div></div>
    <div class="validation-check" style="opacity:0" id="val-2">${validationIcon('warning')}<div class="validation-content"><div class="validation-title">Tickets de livraison</div><div class="validation-detail">Pierre 0-3/4 : facture 19.719t vs ticket 19.700t — écart de 0.019t (0.1%)</div></div></div>
    <div class="validation-check" style="opacity:0" id="val-3">${validationIcon('valid')}<div class="validation-content"><div class="validation-title">Bon de commande</div><div class="validation-detail">Montant dans les limites du PO-2024-0301.</div></div></div>
  </div></div></div>`;

  [1,2,3].forEach((n, i) => setTimeout(() => { const el = document.getElementById(`val-${n}`); if(el) el.style.opacity = '1'; el.style.transition = 'opacity 0.4s ease'; }, 600 + i * 700));

  setTimeout(() => { setStep(3, 'completed'); setStep(4, 'active'); showResultStep(); }, 3600);
}

function showResultStep() {
  const content = document.getElementById('ingestion-content');
  content.innerHTML = `<div class="card"><div class="card-header"><span class="card-title">Résultat de l'analyse</span>${statusBadge('En attente')}</div><div class="card-body">
    <div style="text-align:center;padding:20px 0">
      ${confidenceRing(94)}
      <p style="font-size:14px;font-weight:600;margin-top:12px">Confiance IA : 94%</p>
      <p style="font-size:12px;color:var(--color-text-secondary);margin-top:4px">Écart mineur détecté — Approbation manuelle recommandée</p>
    </div>
    <div class="flagged-issue severity-low" style="margin-top:16px">
      <div class="flagged-issue-icon">ℹ️</div>
      <div class="flagged-issue-content">
        <div class="flagged-issue-message">Écart de 0.019 tonne sur pierre concassée 0-3/4 (0.1%). Possiblement dû à l'arrondi du pesage.</div>
        <div class="flagged-issue-meta"><span class="severity-tag low">quantité</span><div class="confidence-bar"><span>Confiance</span><div class="confidence-bar-track"><div class="confidence-bar-fill high" style="width:88%"></div></div>88%</div></div>
      </div>
    </div>
    <div class="approval-actions" style="margin-top:24px">
      <span class="label">Décision :</span>
      <button class="btn btn-success" onclick="showToast('Facture PE-2024-0892 approuvée','success');navigate('invoice/INV-2024-0147')">✓ Approuver</button>
      <button class="btn btn-secondary" onclick="navigate('invoice/INV-2024-0147')">Voir le détail</button>
    </div>
  </div></div>`;
  showToast('Facture PE-2024-0892 analysée — Confiance IA 94%', 'info');
}

// ============================================================
// PAGE: Purchase Orders
// ============================================================
function renderPurchaseOrders() {
  const main = document.getElementById('main-content');
  main.innerHTML = `
    <div class="page-header"><div class="page-header-top"><div><h1 class="page-title">Bons de commande</h1><p class="page-subtitle">${PURCHASE_ORDERS.length} bons de commande actifs</p></div></div></div>
    <div class="page-body page-enter">
      <div class="card"><div class="card-body" style="padding:0">
        <table class="data-table">
          <thead><tr><th>N° PO</th><th>Projet</th><th>Fournisseur</th><th>Description</th><th style="text-align:right">Autorisé</th><th style="text-align:right">Utilisé</th><th>Utilisation</th><th>Statut</th></tr></thead>
          <tbody>
            ${PURCHASE_ORDERS.map(po => {
              const pct = Math.round((po.amountUsed / po.amountAuthorized) * 100);
              const color = pct > 90 ? 'red' : pct > 70 ? 'amber' : 'blue';
              return `<tr onclick="navigate('po/${po.id}')"><td class="col-id">${po.id}</td><td>${getProject(po.projectId).name}</td><td class="supplier-name">${getSupplier(po.supplierId).name}</td><td style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${po.description}</td><td class="col-amount">${formatCurrency(po.amountAuthorized)}</td><td class="col-amount">${formatCurrency(po.amountUsed)}</td><td><div style="display:flex;align-items:center;gap:8px"><div class="progress-bar" style="width:80px"><div class="progress-bar-fill ${color}" style="width:${pct}%"></div></div><span style="font-size:11px;font-weight:600">${pct}%</span></div></td><td>${statusBadge(po.status === 'Actif' ? 'Validée' : 'En attente')}</td></tr>`;
            }).join('')}
          </tbody>
        </table>
      </div></div>
    </div>`;
}

// ============================================================
// PAGE: Price Lists
// ============================================================
function renderPriceLists() {
  const main = document.getElementById('main-content');
  const byProject = {};
  PRICE_LISTS.forEach(pl => {
    const p = getProject(pl.projectId);
    if (!byProject[pl.projectId]) byProject[pl.projectId] = { project: p, items: [] };
    byProject[pl.projectId].items.push(pl);
  });

  main.innerHTML = `
    <div class="page-header"><div class="page-header-top"><div><h1 class="page-title">Listes de prix</h1><p class="page-subtitle">Prix négociés par projet et fournisseur</p></div></div></div>
    <div class="page-body page-enter">
      ${Object.values(byProject).map(group => `
        <div class="card mb-6">
          <div class="card-header"><span class="card-title">${group.project.name}</span><span style="font-size:11px;color:var(--color-text-tertiary)">${group.project.type}</span></div>
          <div class="card-body" style="padding:0">
            <table class="data-table">
              <thead><tr><th>Matériau</th><th>Unité</th><th style="text-align:right">Prix unitaire</th><th>Fournisseur</th><th>Date effective</th></tr></thead>
              <tbody>${group.items.map(pl => `<tr style="cursor:default"><td class="supplier-name">${pl.material}</td><td>${pl.unit}</td><td class="col-amount">${formatCurrency(pl.unitPrice)}</td><td>${getSupplier(pl.supplierId).name}</td><td>${formatDate(pl.effectiveDate)}</td></tr>`).join('')}</tbody>
            </table>
          </div>
        </div>
      `).join('')}
    </div>`;
}

// ============================================================
// PAGE: Delivery Tickets
// ============================================================
function renderDeliveryTickets() {
  const main = document.getElementById('main-content');
  main.innerHTML = `
    <div class="page-header"><div class="page-header-top"><div><h1 class="page-title">Tickets de livraison</h1><p class="page-subtitle">${DELIVERY_TICKETS.length} tickets enregistrés</p></div></div></div>
    <div class="page-body page-enter">
      <div class="card"><div class="card-body" style="padding:0">
        <table class="data-table">
          <thead><tr><th>N° Ticket</th><th>Date</th><th>Fournisseur</th><th>Matériau</th><th>Quantité</th><th>Projet</th><th>Facture liée</th><th>Camion</th></tr></thead>
          <tbody>
            ${DELIVERY_TICKETS.map(t => `
              <tr onclick="${t.invoiceId ? `navigate('invoice/${t.invoiceId}')` : ''}" style="cursor:${t.invoiceId ? 'pointer' : 'default'}">
                <td class="col-id">${t.id}</td><td>${formatDate(t.date)}</td><td class="supplier-name">${getSupplier(t.supplierId).name}</td><td>${t.material}</td><td>${formatNumber(t.quantity)} ${t.unit}</td><td>${getProject(t.projectId).name}</td><td class="col-id">${t.invoiceId || '—'}</td><td>${t.truckId}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div></div>
    </div>`;
}

// ============================================================
// PAGE: Projects
// ============================================================
function renderProjects() {
  const main = document.getElementById('main-content');
  main.innerHTML = `
    <div class="page-header"><div class="page-header-top"><div><h1 class="page-title">Projets</h1><p class="page-subtitle">${PROJECTS.length} projets en cours</p></div></div></div>
    <div class="page-body page-enter">
      <div class="project-grid">
        ${PROJECTS.map(p => {
          const pct = Math.round((p.spent / p.budget) * 100);
          const color = pct > 90 ? 'red' : pct > 75 ? 'amber' : 'green';
          return `
          <div class="project-card" onclick="navigate('project/${p.id}')">
            <div class="project-card-type">${p.type}</div>
            <div class="project-card-name">${p.name}</div>
            <div class="project-card-client">${p.client} — ${p.location}</div>
            <div class="progress-info"><span>${formatCurrency(p.spent)}</span><span>${formatCurrency(p.budget)}</span></div>
            <div class="progress-bar"><div class="progress-bar-fill ${color}" style="width:${pct}%"></div></div>
            <div class="progress-info"><span>${pct}% du budget</span><span>Reste: ${formatCurrency(p.budget - p.spent)}</span></div>
            <div class="project-card-stats">
              <div class="project-card-stat"><div class="project-card-stat-value">${p.invoiceCount}</div><div class="project-card-stat-label">Factures</div></div>
              <div class="project-card-stat"><div class="project-card-stat-value" style="color:${p.anomalyCount > 0 ? 'var(--color-error)' : 'var(--color-success)'}">${p.anomalyCount}</div><div class="project-card-stat-label">Anomalies</div></div>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>`;
}

// ============================================================
// PAGE: Project Detail
// ============================================================
function renderProjectDetail(id) {
  const p = PROJECTS.find(pr => pr.id === id);
  if (!p) return;
  const invoices = getInvoicesByProject(id);
  const pos = getPOsByProject(id);
  const pct = Math.round((p.spent / p.budget) * 100);
  const color = pct > 90 ? 'red' : pct > 75 ? 'amber' : 'green';

  // Top suppliers
  const supplierSpend = {};
  invoices.forEach(inv => {
    const s = getSupplier(inv.supplierId);
    supplierSpend[s.name] = (supplierSpend[s.name] || 0) + inv.totalAmount;
  });
  const topSuppliers = Object.entries(supplierSpend).sort((a, b) => b[1] - a[1]);

  const main = document.getElementById('main-content');
  main.innerHTML = `
    <div class="page-header">
      <div class="page-header-top">
        <div>
          <div class="back-link" onclick="navigate('projects')">${ICONS.arrowLeft} Retour aux projets</div>
          <h1 class="page-title">${p.name}</h1>
          <p class="page-subtitle">${p.client} — ${p.type} — ${p.location}</p>
        </div>
        <div class="page-actions">${statusBadge(p.status === 'En cours' ? 'Validée' : 'En attente')}</div>
      </div>
    </div>
    <div class="page-body page-enter">
      <div class="kpi-grid">
        <div class="kpi-card kpi-blue"><div class="kpi-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg></div><div class="kpi-value">${formatCurrency(p.spent)}</div><div class="kpi-label">Dépensé</div></div>
        <div class="kpi-card kpi-green"><div class="kpi-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></svg></div><div class="kpi-value">${formatCurrency(p.budget)}</div><div class="kpi-label">Budget total</div></div>
        <div class="kpi-card kpi-amber"><div class="kpi-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div><div class="kpi-value">${p.invoiceCount}</div><div class="kpi-label">Factures traitées</div></div>
        <div class="kpi-card kpi-red"><div class="kpi-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg></div><div class="kpi-value">${p.anomalyCount}</div><div class="kpi-label">Anomalies</div></div>
      </div>

      <div class="card mb-6">
        <div class="card-header"><span class="card-title">Budget vs Dépenses</span><span style="font-size:12px;font-weight:600;color:${pct > 85 ? 'var(--color-error)' : 'var(--color-text-secondary)'}">${pct}% utilisé</span></div>
        <div class="card-body">
          <div class="progress-bar" style="height:12px"><div class="progress-bar-fill ${color}" style="width:${pct}%"></div></div>
          <div class="progress-info mt-4"><span>Dépensé: ${formatCurrency(p.spent)}</span><span>Reste: ${formatCurrency(p.budget - p.spent)}</span></div>
        </div>
      </div>

      <div class="grid-2-1">
        <div class="card">
          <div class="card-header"><span class="card-title">Factures du projet</span></div>
          <div class="card-body" style="padding:0">
            <table class="data-table">
              <thead><tr><th>N° Facture</th><th>Fournisseur</th><th>Montant</th><th>Statut</th></tr></thead>
              <tbody>
                ${invoices.map(inv => `<tr onclick="navigate('invoice/${inv.id}')"><td class="col-id">${inv.invoiceNumber}</td><td class="supplier-name">${getSupplier(inv.supplierId).name}</td><td class="col-amount">${formatCurrency(inv.totalAmount)}</td><td>${statusBadge(inv.status)}</td></tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <div class="card mb-6">
            <div class="card-header"><span class="card-title">Top fournisseurs</span></div>
            <div class="card-body">
              ${topSuppliers.map(([name, amount], i) => `
                <div class="supplier-rank">
                  <div class="supplier-rank-position">${i + 1}</div>
                  <div class="supplier-rank-name">${name}</div>
                  <div class="supplier-rank-amount">${formatCurrency(amount)}</div>
                </div>
              `).join('')}
              ${topSuppliers.length === 0 ? '<div class="empty-state"><div class="empty-state-text">Aucun fournisseur</div></div>' : ''}
            </div>
          </div>
          <div class="card">
            <div class="card-header"><span class="card-title">Bons de commande</span></div>
            <div class="card-body">
              ${pos.map(po => {
                const poPct = Math.round((po.amountUsed / po.amountAuthorized) * 100);
                return `<div style="margin-bottom:14px"><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px"><span class="supplier-name">${getSupplier(po.supplierId).name}</span><span>${poPct}%</span></div><div class="progress-bar"><div class="progress-bar-fill ${poPct > 90 ? 'red' : poPct > 70 ? 'amber' : 'blue'}" style="width:${poPct}%"></div></div><div style="display:flex;justify-content:space-between;font-size:10px;color:var(--color-text-tertiary);margin-top:3px"><span>${formatCurrency(po.amountUsed)}</span><span>${formatCurrency(po.amountAuthorized)}</span></div></div>`;
              }).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>`;
}

// ============================================================
// PAGE: PO Detail
// ============================================================
function renderPODetail(id) {
  const po = getPO(id);
  if (!po) return;
  const supplier = getSupplier(po.supplierId);
  const project = getProject(po.projectId);
  const linkedInvoices = INVOICES.filter(inv => inv.poId === id);
  const linkedTickets = DELIVERY_TICKETS.filter(t => linkedInvoices.some(inv => inv.id === t.invoiceId));
  const pct = Math.round((po.amountUsed / po.amountAuthorized) * 100);
  const color = pct > 90 ? 'red' : pct > 70 ? 'amber' : 'blue';
  const totalInvoiced = linkedInvoices.reduce((s, i) => s + i.totalAmount, 0);
  const main = document.getElementById('main-content');

  main.innerHTML = `
    <div class="page-header">
      <div class="page-header-top">
        <div>
          <div class="back-link" onclick="navigate('purchase-orders')">${ICONS.arrowLeft} Retour aux bons de commande</div>
          <h1 class="page-title">Bon de commande ${po.id}</h1>
          <p class="page-subtitle">${supplier.name} — ${project.name}</p>
        </div>
        <div class="page-actions">${statusBadge(po.status === 'Actif' ? 'Validée' : 'En attente')}</div>
      </div>
    </div>
    <div class="page-body page-enter">
      <div class="invoice-header-info">
        <div class="info-block"><div class="info-block-label">Fournisseur</div><div class="info-block-value">${supplier.name}</div></div>
        <div class="info-block"><div class="info-block-label">Projet</div><div class="info-block-value">${project.name}</div></div>
        <div class="info-block"><div class="info-block-label">Date d'émission</div><div class="info-block-value">${formatDate(po.date)}</div></div>
        <div class="info-block"><div class="info-block-label">Montant autorisé</div><div class="info-block-value large">${formatCurrency(po.amountAuthorized)}</div></div>
      </div>

      <div class="grid-2-1">
        <div>
          <div class="card mb-6">
            <div class="card-header"><span class="card-title">Description</span></div>
            <div class="card-body"><p style="font-size:14px;color:var(--color-text-secondary)">${po.description}</p></div>
          </div>

          <div class="card mb-6">
            <div class="card-header"><span class="card-title">Utilisation du budget</span><span style="font-size:12px;font-weight:600;color:${pct > 85 ? 'var(--color-error)' : 'var(--color-text-secondary)'}">${pct}% utilisé</span></div>
            <div class="card-body">
              <div class="progress-bar" style="height:14px"><div class="progress-bar-fill ${color}" style="width:${pct}%"></div></div>
              <div class="progress-info mt-4">
                <span>Utilisé : ${formatCurrency(po.amountUsed)}</span>
                <span>Reste : ${formatCurrency(po.amountAuthorized - po.amountUsed)}</span>
              </div>
              <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-top:20px">
                <div class="info-block"><div class="info-block-label">Autorisé</div><div class="info-block-value">${formatCurrency(po.amountAuthorized)}</div></div>
                <div class="info-block"><div class="info-block-label">Total facturé</div><div class="info-block-value">${formatCurrency(totalInvoiced)}</div></div>
                <div class="info-block"><div class="info-block-label">Factures liées</div><div class="info-block-value">${linkedInvoices.length}</div></div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header"><span class="card-title">Factures liées</span><span style="font-size:11px;color:var(--color-text-tertiary)">${linkedInvoices.length} facture(s)</span></div>
            <div class="card-body" style="padding:0">
              ${linkedInvoices.length > 0 ? `
              <table class="data-table">
                <thead><tr><th>N° Facture</th><th>Date</th><th>Montant</th><th>Statut</th></tr></thead>
                <tbody>${linkedInvoices.map(inv => `<tr onclick="navigate('invoice/${inv.id}')"><td class="col-id">${inv.invoiceNumber}</td><td>${formatDate(inv.date)}</td><td class="col-amount">${formatCurrency(inv.totalAmount)}</td><td>${statusBadge(inv.status)}</td></tr>`).join('')}</tbody>
              </table>` : '<div class="empty-state"><div class="empty-state-icon">📋</div><div class="empty-state-title">Aucune facture liée</div></div>'}
            </div>
          </div>
        </div>

        <div>
          <div class="card mb-6">
            <div class="card-header"><span class="card-title">Informations fournisseur</span></div>
            <div class="card-body">
              <div style="margin-bottom:12px"><div class="info-block-label">Contact</div><div style="font-size:13px;font-weight:600">${supplier.contact}</div></div>
              <div style="margin-bottom:12px"><div class="info-block-label">Téléphone</div><div style="font-size:13px">${supplier.phone}</div></div>
              <div style="margin-bottom:12px"><div class="info-block-label">Courriel</div><div style="font-size:13px"><a href="mailto:${supplier.email}">${supplier.email}</a></div></div>
              <div><div class="info-block-label">Ville</div><div style="font-size:13px">${supplier.city}</div></div>
            </div>
          </div>

          ${linkedTickets.length > 0 ? `
          <div class="card">
            <div class="card-header"><span class="card-title">Tickets de livraison</span></div>
            <div class="card-body" style="padding:0">
              <table class="data-table">
                <thead><tr><th>Ticket</th><th>Matériau</th><th>Qté</th></tr></thead>
                <tbody>${linkedTickets.slice(0, 8).map(t => `<tr style="cursor:default"><td class="col-id">${t.id}</td><td>${t.material}</td><td>${formatNumber(t.quantity)} ${t.unit}</td></tr>`).join('')}</tbody>
              </table>
            </div>
          </div>` : ''}
        </div>
      </div>
    </div>`;
}

// ============================================================
// AI Chat System — OpenAI GPT Integration
// ============================================================
// OPENAI_API_KEY is loaded from config.js
let chatOpen = false;
let chatMessages = [];
let conversationHistory = [];

function markdownToHtml(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/^### (.+)$/gm, '<strong style="font-size:14px">$1</strong>')
    .replace(/^## (.+)$/gm, '<strong style="font-size:15px">$1</strong>')
    .replace(/^# (.+)$/gm, '<strong style="font-size:16px">$1</strong>')
    .replace(/^[\-•] (.+)$/gm, '• $1')
    .replace(/\n/g, '<br>');
}

function buildSystemPrompt() {
  const kpis = getKPIs();
  const supplierSpend = {};
  INVOICES.forEach(inv => {
    const s = getSupplier(inv.supplierId);
    supplierSpend[s.name] = (supplierSpend[s.name] || 0) + inv.totalAmount;
  });
  const topSuppliers = Object.entries(supplierSpend).sort((a,b) => b[1]-a[1]);

  return `Tu es l'assistant IA de JPM Ops, la plateforme intelligente de gestion des comptes fournisseurs pour JPM Excavation, une entreprise d'excavation et construction au Québec (~100 employés, 400-500 projets/an).

Tu parles TOUJOURS en français québécois professionnel. Tu es concis, précis et orienté données. Tu utilises des émojis avec parcimonie pour les alertes importantes. Formate tes réponses en HTML léger (utilise <strong>, <br>, <code>, •).

DONNÉES EN TEMPS RÉEL DE LA PLATEFORME :

=== KPIs ===
- Factures ce mois : ${kpis.total}
- Auto-approuvées : ${kpis.autoApprovedPct}%
- Anomalies actives : ${kpis.anomalies}
- En attente d'approbation : ${kpis.pending}
- Temps économisé estimé : 34h (~4 250$)

=== FOURNISSEURS ===
${SUPPLIERS.map(s => `- ${s.name} (${s.id}) : ${s.contact}, ${s.city}, ${s.phone}, ${s.email}`).join('\n')}

=== PROJETS ===
${PROJECTS.map(p => {
  const pct = Math.round((p.spent / p.budget) * 100);
  return `- ${p.name} (${p.id}) : ${p.type}, ${p.client}, ${p.location}, Budget: ${p.budget}$, Dépensé: ${p.spent}$ (${pct}%), ${p.invoiceCount} factures, ${p.anomalyCount} anomalies, Statut: ${p.status}`;
}).join('\n')}

=== FACTURES ===
${INVOICES.map(inv => `- ${inv.invoiceNumber} (${inv.id}) : ${getSupplier(inv.supplierId).name}, Projet: ${getProject(inv.projectId).name}, Montant: ${inv.totalAmount}$, Date: ${inv.date}, Statut: ${inv.status}, Confiance IA: ${inv.confidence}%, PO: ${inv.poId || 'N/A'}, Détail: ${inv.statusDetail}`).join('\n')}

=== BONS DE COMMANDE ===
${PURCHASE_ORDERS.map(po => `- ${po.id} : ${getSupplier(po.supplierId).name}, Projet: ${getProject(po.projectId).name}, Autorisé: ${po.amountAuthorized}$, Utilisé: ${po.amountUsed}$ (${Math.round(po.amountUsed/po.amountAuthorized*100)}%), ${po.description}`).join('\n')}

=== LISTES DE PRIX ===
${PRICE_LISTS.map(pl => `- ${pl.material}: ${pl.unitPrice}$/${pl.unit}, Fournisseur: ${getSupplier(pl.supplierId).name}, Projet: ${getProject(pl.projectId).name}`).join('\n')}

=== TOP FOURNISSEURS PAR VOLUME ===
${topSuppliers.map(([name, amount], i) => `${i+1}. ${name} : ${amount}$`).join('\n')}

=== TICKETS DE LIVRAISON ===
${DELIVERY_TICKETS.map(t => `- ${t.id}: ${t.material}, ${t.quantity} ${t.unit}, ${getSupplier(t.supplierId).name}, Projet: ${getProject(t.projectId).name}, Date: ${t.date}, Camion: ${t.truckId}`).join('\n')}

=== ALERTES IA ACTIVES ===
${AI_INSIGHTS.map(a => `- [${a.severity}] ${a.message} (${a.date})`).join('\n')}

INSTRUCTIONS CRITIQUES DE FORMATAGE :
- Tu DOIS répondre en texte BRUT avec du markdown simple.
- Utilise **gras** pour les éléments importants.
- Utilise des retours à la ligne pour séparer les sections.
- Utilise • pour les listes à puces.
- Utilise \`code\` pour les numéros de facture et PO.
- NE PAS utiliser de balises HTML.
- Sois concis : maximum 150 mots par réponse.
- Sois proactif : signale les risques, recommande des actions concrètes.
- Réponds TOUJOURS avec les données réelles ci-dessus, jamais d'inventions.
- Si on te demande quelque chose hors contexte, ramène poliment la conversation aux opérations.`;
}

function toggleChat() {
  chatOpen = !chatOpen;
  document.getElementById('chat-panel').classList.toggle('open', chatOpen);
  document.getElementById('chat-fab').classList.toggle('hidden', chatOpen);
  if (chatOpen && chatMessages.length === 0) initChat();
}

function initChat() {
  conversationHistory = [{ role: 'system', content: buildSystemPrompt() }];
  addBotMessage(`Bonjour Alexandre! 👋 Je suis l'assistant IA de <strong>JPM Ops</strong>, propulsé par intelligence artificielle. Posez-moi n'importe quelle question sur vos opérations.<div class="chat-suggestions"><button class="chat-suggestion-btn" onclick="askChat('Quelles sont les anomalies en cours?')">Anomalies en cours</button><button class="chat-suggestion-btn" onclick="askChat('État du budget Montoni Phase 3')">Budget Montoni</button><button class="chat-suggestion-btn" onclick="askChat('Quels sont mes top fournisseurs?')">Top fournisseurs</button><button class="chat-suggestion-btn" onclick="askChat('Résumé des opérations du mois')">Résumé mensuel</button></div>`, false);
}

function addBotMessage(html, addToHistory = true) {
  chatMessages.push({ role: 'bot', html });
  if (addToHistory) conversationHistory.push({ role: 'assistant', content: html });
  renderChatMessages();
}

function addUserMessage(text) {
  chatMessages.push({ role: 'user', html: text });
  conversationHistory.push({ role: 'user', content: text });
  renderChatMessages();
}

function renderChatMessages() {
  const container = document.getElementById('chat-messages');
  container.innerHTML = chatMessages.map(m => `
    <div class="chat-msg ${m.role}">
      <div class="chat-msg-avatar">${m.role === 'bot' ? '✦' : 'AT'}</div>
      <div class="chat-msg-bubble">${m.html}</div>
    </div>
  `).join('');
  container.scrollTop = container.scrollHeight;
}

function showTyping() {
  const container = document.getElementById('chat-messages');
  container.innerHTML += '<div class="chat-typing" id="chat-typing"><div class="chat-typing-dot"></div><div class="chat-typing-dot"></div><div class="chat-typing-dot"></div></div>';
  container.scrollTop = container.scrollHeight;
}

function hideTyping() {
  document.getElementById('chat-typing')?.remove();
}

function sendChatMessage() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  addUserMessage(text);
  callOpenAI();
}

function askChat(text) {
  addUserMessage(text);
  callOpenAI();
}

async function callOpenAI() {
  showTyping();
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: conversationHistory,
        max_tokens: 500,
        temperature: 0.7
      })
    });

    hideTyping();

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error?.message || `API error ${response.status}`);
    }

    const data = await response.json();
    const reply = markdownToHtml(data.choices[0].message.content);
    addBotMessage(reply);
  } catch (error) {
    hideTyping();
    addBotMessage(`⚠️ Erreur de connexion IA : <code>${error.message}</code><br><br>Vérifiez votre connexion internet et réessayez.`, false);
  }
}

// ============================================================
// Initialization
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  // Sidebar navigation
  document.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', () => {
      const page = link.dataset.page;
      if (page) navigate(page);
    });
  });

  // Initial page
  renderDashboard();
});
