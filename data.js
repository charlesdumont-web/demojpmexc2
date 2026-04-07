// ============================================================
// JPM Ops — Mock Data
// Realistic Quebec construction / excavation data
// ============================================================

const SUPPLIERS = [
  { id: 'SUP-001', name: 'Pierre Excavation Inc.', contact: 'Marc-André Picard', phone: '450-555-0112', email: 'facturation@pierreexc.ca', city: 'Saint-Hyacinthe' },
  { id: 'SUP-002', name: 'Carrière Laval Ltée', contact: 'Josée Tremblay', phone: '450-555-0234', email: 'comptes@carrierelaval.ca', city: 'Laval' },
  { id: 'SUP-003', name: 'Transport Beaulieu & Fils', contact: 'Luc Beaulieu', phone: '450-555-0356', email: 'admin@transportbeaulieu.ca', city: 'Longueuil' },
  { id: 'SUP-004', name: 'Asphalte Rive-Sud Inc.', contact: 'Nathalie Gagnon', phone: '450-555-0478', email: 'factures@asphalters.ca', city: 'Brossard' },
  { id: 'SUP-005', name: 'Location Gravel Plus', contact: 'Denis Gravel', phone: '514-555-0590', email: 'location@gravelplus.ca', city: 'Montréal' },
  { id: 'SUP-006', name: 'Béton Préfab Montérégie', contact: 'Sylvie Fortier', phone: '450-555-0612', email: 'ventes@betonprefab.ca', city: 'Saint-Jean-sur-Richelieu' },
  { id: 'SUP-007', name: 'Agrégats St-Hyacinthe', contact: 'Pierre-Luc Demers', phone: '450-555-0734', email: 'info@agregatssth.ca', city: 'Saint-Hyacinthe' },
  { id: 'SUP-008', name: 'Excavation Dupont & Associés', contact: 'François Dupont', phone: '450-555-0856', email: 'admin@excdupont.ca', city: 'Granby' },
];

const PROJECTS = [
  {
    id: 'PRJ-001',
    name: 'Projet Montoni Phase 3',
    type: 'Commercial',
    client: 'Groupe Montoni',
    location: 'Laval, QC',
    budget: 2850000,
    spent: 2422500,
    startDate: '2025-09-15',
    endDate: '2026-06-30',
    status: 'En cours',
    manager: 'Alexandre Trottier',
    invoiceCount: 23,
    anomalyCount: 3,
  },
  {
    id: 'PRJ-002',
    name: 'Résidence Brossard Secteur D',
    type: 'Résidentiel',
    client: 'Développement Devimco',
    location: 'Brossard, QC',
    budget: 1200000,
    spent: 684000,
    startDate: '2026-01-10',
    endDate: '2026-11-30',
    status: 'En cours',
    manager: 'Marie-Ève Lapointe',
    invoiceCount: 11,
    anomalyCount: 1,
  },
  {
    id: 'PRJ-003',
    name: 'Parc Industriel Longueuil',
    type: 'Industriel',
    client: 'Ville de Longueuil',
    location: 'Longueuil, QC',
    budget: 4100000,
    spent: 3198000,
    startDate: '2025-06-01',
    endDate: '2026-04-15',
    status: 'En cours',
    manager: 'Alexandre Trottier',
    invoiceCount: 34,
    anomalyCount: 5,
  },
  {
    id: 'PRJ-004',
    name: 'Élargissement Boul. Taschereau',
    type: 'Municipal',
    client: 'MTQ — Ministère des Transports',
    location: 'Brossard, QC',
    budget: 6500000,
    spent: 1950000,
    startDate: '2026-03-01',
    endDate: '2027-02-28',
    status: 'En cours',
    manager: 'Stéphane Roy',
    invoiceCount: 8,
    anomalyCount: 0,
  },
  {
    id: 'PRJ-005',
    name: 'Centre Distribution Amazon YUL3',
    type: 'Commercial',
    client: 'Amazon Canada',
    location: 'Coteau-du-Lac, QC',
    budget: 8200000,
    spent: 7134000,
    startDate: '2025-03-15',
    endDate: '2026-05-31',
    status: 'En cours',
    manager: 'Marie-Ève Lapointe',
    invoiceCount: 52,
    anomalyCount: 4,
  },
];

const PURCHASE_ORDERS = [
  { id: 'PO-2024-0301', projectId: 'PRJ-001', supplierId: 'SUP-001', description: 'Pierre concassée et excavation — Phase 3', amountAuthorized: 125000, amountUsed: 98742, date: '2025-10-01', status: 'Actif' },
  { id: 'PO-2024-0302', projectId: 'PRJ-001', supplierId: 'SUP-002', description: 'Fourniture MG-20 et 0-3/4', amountAuthorized: 85000, amountUsed: 72150, date: '2025-10-05', status: 'Actif' },
  { id: 'PO-2024-0303', projectId: 'PRJ-001', supplierId: 'SUP-003', description: 'Transport matériaux — Montoni', amountAuthorized: 45000, amountUsed: 38200, date: '2025-10-01', status: 'Actif' },
  { id: 'PO-2024-0310', projectId: 'PRJ-002', supplierId: 'SUP-004', description: 'Asphalte — entrée secteur D', amountAuthorized: 210000, amountUsed: 142800, date: '2026-01-15', status: 'Actif' },
  { id: 'PO-2024-0311', projectId: 'PRJ-002', supplierId: 'SUP-007', description: 'Agrégats divers — Brossard', amountAuthorized: 95000, amountUsed: 61750, date: '2026-01-20', status: 'Actif' },
  { id: 'PO-2024-0320', projectId: 'PRJ-003', supplierId: 'SUP-001', description: 'Excavation terrain — Longueuil', amountAuthorized: 320000, amountUsed: 288000, date: '2025-06-15', status: 'Actif' },
  { id: 'PO-2024-0321', projectId: 'PRJ-003', supplierId: 'SUP-006', description: 'Béton préfabriqué — murs', amountAuthorized: 450000, amountUsed: 427500, date: '2025-07-01', status: 'Actif' },
  { id: 'PO-2024-0330', projectId: 'PRJ-004', supplierId: 'SUP-003', description: 'Transport — Taschereau', amountAuthorized: 180000, amountUsed: 54000, date: '2026-03-05', status: 'Actif' },
  { id: 'PO-2024-0331', projectId: 'PRJ-004', supplierId: 'SUP-004', description: 'Asphalte — élargissement', amountAuthorized: 520000, amountUsed: 0, date: '2026-03-10', status: 'En attente' },
  { id: 'PO-2024-0340', projectId: 'PRJ-005', supplierId: 'SUP-001', description: 'Excavation masse — Amazon', amountAuthorized: 890000, amountUsed: 845500, date: '2025-04-01', status: 'Actif' },
  { id: 'PO-2024-0341', projectId: 'PRJ-005', supplierId: 'SUP-002', description: 'Pierre concassée — Amazon', amountAuthorized: 420000, amountUsed: 399000, date: '2025-04-01', status: 'Actif' },
  { id: 'PO-2024-0342', projectId: 'PRJ-005', supplierId: 'SUP-008', description: 'Excavation complémentaire — YUL3', amountAuthorized: 275000, amountUsed: 247500, date: '2025-05-15', status: 'Actif' },
];

const PRICE_LISTS = [
  // Project Montoni Phase 3
  { id: 'PL-001', projectId: 'PRJ-001', supplierId: 'SUP-001', material: 'Pierre concassée 0-3/4', unit: 'tonne', unitPrice: 42.50, effectiveDate: '2025-10-01' },
  { id: 'PL-002', projectId: 'PRJ-001', supplierId: 'SUP-001', material: 'MG-20', unit: 'tonne', unitPrice: 38.75, effectiveDate: '2025-10-01' },
  { id: 'PL-003', projectId: 'PRJ-001', supplierId: 'SUP-001', material: 'Excavation', unit: 'm³', unitPrice: 28.50, effectiveDate: '2025-10-01' },
  { id: 'PL-004', projectId: 'PRJ-001', supplierId: 'SUP-002', material: 'Pierre concassée 0-3/4', unit: 'tonne', unitPrice: 44.00, effectiveDate: '2025-10-05' },
  { id: 'PL-005', projectId: 'PRJ-001', supplierId: 'SUP-002', material: 'MG-20', unit: 'tonne', unitPrice: 39.50, effectiveDate: '2025-10-05' },
  // Résidence Brossard
  { id: 'PL-010', projectId: 'PRJ-002', supplierId: 'SUP-004', material: 'Asphalte chaud', unit: 'tonne', unitPrice: 125.00, effectiveDate: '2026-01-15' },
  { id: 'PL-011', projectId: 'PRJ-002', supplierId: 'SUP-004', material: 'Asphalte froid', unit: 'tonne', unitPrice: 98.50, effectiveDate: '2026-01-15' },
  { id: 'PL-012', projectId: 'PRJ-002', supplierId: 'SUP-007', material: 'Sable', unit: 'tonne', unitPrice: 22.00, effectiveDate: '2026-01-20' },
  { id: 'PL-013', projectId: 'PRJ-002', supplierId: 'SUP-007', material: 'Pierre concassée 0-3/4', unit: 'tonne', unitPrice: 41.75, effectiveDate: '2026-01-20' },
  // Parc Industriel Longueuil
  { id: 'PL-020', projectId: 'PRJ-003', supplierId: 'SUP-001', material: 'Excavation', unit: 'm³', unitPrice: 26.00, effectiveDate: '2025-06-15' },
  { id: 'PL-021', projectId: 'PRJ-003', supplierId: 'SUP-001', material: 'Remblai', unit: 'm³', unitPrice: 18.50, effectiveDate: '2025-06-15' },
  { id: 'PL-022', projectId: 'PRJ-003', supplierId: 'SUP-006', material: 'Béton préfabriqué — mur', unit: 'unité', unitPrice: 2850.00, effectiveDate: '2025-07-01' },
  { id: 'PL-023', projectId: 'PRJ-003', supplierId: 'SUP-006', material: 'Béton préfabriqué — dalle', unit: 'unité', unitPrice: 1950.00, effectiveDate: '2025-07-01' },
  // Taschereau
  { id: 'PL-030', projectId: 'PRJ-004', supplierId: 'SUP-003', material: 'Transport 10 roues', unit: 'heure', unitPrice: 125.00, effectiveDate: '2026-03-05' },
  { id: 'PL-031', projectId: 'PRJ-004', supplierId: 'SUP-004', material: 'Asphalte chaud', unit: 'tonne', unitPrice: 128.00, effectiveDate: '2026-03-10' },
  // Amazon YUL3
  { id: 'PL-040', projectId: 'PRJ-005', supplierId: 'SUP-001', material: 'Excavation', unit: 'm³', unitPrice: 24.50, effectiveDate: '2025-04-01' },
  { id: 'PL-041', projectId: 'PRJ-005', supplierId: 'SUP-002', material: 'Pierre concassée 0-3/4', unit: 'tonne', unitPrice: 40.00, effectiveDate: '2025-04-01' },
  { id: 'PL-042', projectId: 'PRJ-005', supplierId: 'SUP-002', material: 'MG-20', unit: 'tonne', unitPrice: 37.25, effectiveDate: '2025-04-01' },
  { id: 'PL-043', projectId: 'PRJ-005', supplierId: 'SUP-008', material: 'Excavation roc', unit: 'm³', unitPrice: 45.00, effectiveDate: '2025-05-15' },
];

const INVOICES = [
  // ★ STAR INVOICE — Pierre Excavation, Montoni Phase 3
  {
    id: 'INV-2024-0147',
    supplierId: 'SUP-001',
    projectId: 'PRJ-001',
    poId: 'PO-2024-0301',
    invoiceNumber: 'PE-2024-0892',
    date: '2026-03-28',
    dueDate: '2026-04-28',
    totalAmount: 18742.55,
    status: 'En attente',
    statusDetail: 'Écart mineur détecté',
    receivedDate: '2026-03-29',
    lines: [
      { material: 'Pierre concassée 0-3/4', quantity: 19.719, unit: 'tonne', unitPrice: 42.50, total: 838.06 },
      { material: 'MG-20', quantity: 185.400, unit: 'tonne', unitPrice: 38.75, total: 7184.25 },
      { material: 'Excavation', quantity: 245.000, unit: 'm³', unitPrice: 28.50, total: 6982.50 },
      { material: 'Transport', quantity: 1, unit: 'forfait', unitPrice: 3737.74, total: 3737.74 },
    ],
    validation: {
      priceList: { status: 'valid', details: 'Tous les prix correspondent à la liste de prix du projet.' },
      deliveryTickets: { status: 'warning', details: 'Pierre 0-3/4 : facture 19.719t vs ticket 19.700t — écart de 0.019t (0.1%)' },
      purchaseOrder: { status: 'valid', details: 'Montant dans les limites du bon de commande PO-2024-0301.' },
    },
    aiConfidence: 94,
    flaggedIssues: [
      { type: 'quantity', severity: 'low', message: 'Écart de 0.019 tonne sur pierre concassée 0-3/4 (0.1%). Possiblement dû à l\'arrondi du pesage.', confidence: 88 },
    ],
  },
  // Auto-approved invoices
  {
    id: 'INV-2024-0148',
    supplierId: 'SUP-002',
    projectId: 'PRJ-001',
    poId: 'PO-2024-0302',
    invoiceNumber: 'CL-2024-1205',
    date: '2026-03-25',
    dueDate: '2026-04-25',
    totalAmount: 12450.00,
    status: 'Validée',
    statusDetail: 'Auto-approuvée',
    receivedDate: '2026-03-26',
    lines: [
      { material: 'Pierre concassée 0-3/4', quantity: 120.000, unit: 'tonne', unitPrice: 44.00, total: 5280.00 },
      { material: 'MG-20', quantity: 185.000, unit: 'tonne', unitPrice: 39.50, total: 7170.00 },
    ],
    validation: {
      priceList: { status: 'valid', details: 'Prix conformes.' },
      deliveryTickets: { status: 'valid', details: 'Quantités correspondent aux tickets de livraison.' },
      purchaseOrder: { status: 'valid', details: 'Dans les limites du PO.' },
    },
    aiConfidence: 99,
    flaggedIssues: [],
  },
  {
    id: 'INV-2024-0149',
    supplierId: 'SUP-003',
    projectId: 'PRJ-001',
    poId: 'PO-2024-0303',
    invoiceNumber: 'TB-2024-0567',
    date: '2026-03-27',
    dueDate: '2026-04-27',
    totalAmount: 8925.00,
    status: 'Validée',
    statusDetail: 'Auto-approuvée',
    receivedDate: '2026-03-28',
    lines: [
      { material: 'Transport 10 roues', quantity: 45, unit: 'heure', unitPrice: 135.00, total: 6075.00 },
      { material: 'Transport semi-remorque', quantity: 15, unit: 'heure', unitPrice: 190.00, total: 2850.00 },
    ],
    validation: {
      priceList: { status: 'valid', details: 'Prix conformes au contrat de transport.' },
      deliveryTickets: { status: 'valid', details: 'Heures confirmées par les rapports journaliers.' },
      purchaseOrder: { status: 'valid', details: 'Dans les limites du PO.' },
    },
    aiConfidence: 98,
    flaggedIssues: [],
  },
  {
    id: 'INV-2024-0150',
    supplierId: 'SUP-004',
    projectId: 'PRJ-002',
    poId: 'PO-2024-0310',
    invoiceNumber: 'ARS-2024-0334',
    date: '2026-03-20',
    dueDate: '2026-04-20',
    totalAmount: 34125.00,
    status: 'Validée',
    statusDetail: 'Auto-approuvée',
    receivedDate: '2026-03-21',
    lines: [
      { material: 'Asphalte chaud', quantity: 245.000, unit: 'tonne', unitPrice: 125.00, total: 30625.00 },
      { material: 'Asphalte froid', quantity: 35.533, unit: 'tonne', unitPrice: 98.50, total: 3500.00 },
    ],
    validation: {
      priceList: { status: 'valid', details: 'Prix conformes.' },
      deliveryTickets: { status: 'valid', details: 'Quantités validées.' },
      purchaseOrder: { status: 'valid', details: 'Dans les limites du PO.' },
    },
    aiConfidence: 99,
    flaggedIssues: [],
  },
  // Anomaly invoices
  {
    id: 'INV-2024-0151',
    supplierId: 'SUP-001',
    projectId: 'PRJ-003',
    poId: 'PO-2024-0320',
    invoiceNumber: 'PE-2024-0893',
    date: '2026-03-30',
    dueDate: '2026-04-30',
    totalAmount: 45500.00,
    status: 'Anomalie',
    statusDetail: 'Écart de prix détecté',
    receivedDate: '2026-03-31',
    lines: [
      { material: 'Excavation', quantity: 1500.000, unit: 'm³', unitPrice: 28.50, total: 42750.00 },
      { material: 'Remblai', quantity: 150.000, unit: 'm³', unitPrice: 18.33, total: 2750.00 },
    ],
    validation: {
      priceList: { status: 'error', details: 'Excavation : prix facturé 28.50$/m³ vs liste de prix 26.00$/m³ (+9.6%). Remblai : 18.33$/m³ vs 18.50$/m³ (-0.9%).' },
      deliveryTickets: { status: 'valid', details: 'Quantités correspondent.' },
      purchaseOrder: { status: 'warning', details: 'Utilisation à 90% du PO. Reste 32,000$ sur 320,000$ autorisés.' },
    },
    aiConfidence: 72,
    flaggedIssues: [
      { type: 'price', severity: 'high', message: 'Prix d\'excavation supérieur de 9.6% à la liste de prix du projet (28.50$ vs 26.00$/m³). Surcoût de 3,750$ sur cette facture.', confidence: 97 },
      { type: 'budget', severity: 'medium', message: 'Le bon de commande PO-2024-0320 est utilisé à 90%. Attention au dépassement.', confidence: 95 },
    ],
  },
  {
    id: 'INV-2024-0152',
    supplierId: 'SUP-006',
    projectId: 'PRJ-003',
    poId: 'PO-2024-0321',
    invoiceNumber: 'BPM-2024-0089',
    date: '2026-03-29',
    dueDate: '2026-04-29',
    totalAmount: 62700.00,
    status: 'Anomalie',
    statusDetail: 'Écart de quantité',
    receivedDate: '2026-03-30',
    lines: [
      { material: 'Béton préfabriqué — mur', quantity: 18, unit: 'unité', unitPrice: 2850.00, total: 51300.00 },
      { material: 'Béton préfabriqué — dalle', quantity: 6, unit: 'unité', unitPrice: 1900.00, total: 11400.00 },
    ],
    validation: {
      priceList: { status: 'warning', details: 'Dalle : prix facturé 1,900$ vs liste 1,950$ (-2.6%). En faveur du client.' },
      deliveryTickets: { status: 'error', details: 'Murs : facture 18 unités vs tickets 16 unités livrées. Écart de 2 unités.' },
      purchaseOrder: { status: 'warning', details: 'Montant dépasse 95% du PO autorisé (427,500$/450,000$).' },
    },
    aiConfidence: 58,
    flaggedIssues: [
      { type: 'quantity', severity: 'high', message: '2 unités de mur préfabriqué facturées mais non confirmées par les tickets de livraison (18 facturées vs 16 livrées). Écart de 5,700$.', confidence: 96 },
      { type: 'price', severity: 'low', message: 'Prix des dalles inférieur de 2.6% à la liste. Favorable au client mais à vérifier.', confidence: 82 },
    ],
  },
  {
    id: 'INV-2024-0153',
    supplierId: 'SUP-008',
    projectId: 'PRJ-005',
    poId: null,
    invoiceNumber: 'EDA-2024-0412',
    date: '2026-03-31',
    dueDate: '2026-04-30',
    totalAmount: 27000.00,
    status: 'Anomalie',
    statusDetail: 'Bon de commande manquant',
    receivedDate: '2026-04-01',
    lines: [
      { material: 'Excavation roc', quantity: 600.000, unit: 'm³', unitPrice: 45.00, total: 27000.00 },
    ],
    validation: {
      priceList: { status: 'valid', details: 'Prix conforme à la liste.' },
      deliveryTickets: { status: 'valid', details: 'Quantités validées par les tickets.' },
      purchaseOrder: { status: 'error', details: 'Aucun bon de commande associé à cette facture.' },
    },
    aiConfidence: 45,
    flaggedIssues: [
      { type: 'missing_po', severity: 'high', message: 'Aucun bon de commande trouvé pour cette facture. Impossible de valider l\'autorisation de la dépense.', confidence: 99 },
    ],
  },
  // Pending approval
  {
    id: 'INV-2024-0154',
    supplierId: 'SUP-007',
    projectId: 'PRJ-002',
    poId: 'PO-2024-0311',
    invoiceNumber: 'ASH-2024-0178',
    date: '2026-04-01',
    dueDate: '2026-05-01',
    totalAmount: 9625.00,
    status: 'En attente',
    statusDetail: 'Approbation requise',
    receivedDate: '2026-04-02',
    lines: [
      { material: 'Sable', quantity: 200.000, unit: 'tonne', unitPrice: 22.00, total: 4400.00 },
      { material: 'Pierre concassée 0-3/4', quantity: 125.000, unit: 'tonne', unitPrice: 41.80, total: 5225.00 },
    ],
    validation: {
      priceList: { status: 'warning', details: 'Pierre 0-3/4 : prix facturé 41.80$ vs liste 41.75$ (+0.12%). Écart mineur.' },
      deliveryTickets: { status: 'valid', details: 'Quantités correspondent.' },
      purchaseOrder: { status: 'valid', details: 'Dans les limites du PO.' },
    },
    aiConfidence: 91,
    flaggedIssues: [
      { type: 'price', severity: 'low', message: 'Écart de prix mineur sur pierre 0-3/4 : 0.05$/tonne (0.12%). Possiblement un arrondi.', confidence: 75 },
    ],
  },
  {
    id: 'INV-2024-0155',
    supplierId: 'SUP-003',
    projectId: 'PRJ-004',
    poId: 'PO-2024-0330',
    invoiceNumber: 'TB-2024-0568',
    date: '2026-04-02',
    dueDate: '2026-05-02',
    totalAmount: 15000.00,
    status: 'En attente',
    statusDetail: 'Approbation requise',
    receivedDate: '2026-04-03',
    lines: [
      { material: 'Transport 10 roues', quantity: 120, unit: 'heure', unitPrice: 125.00, total: 15000.00 },
    ],
    validation: {
      priceList: { status: 'valid', details: 'Prix conforme.' },
      deliveryTickets: { status: 'valid', details: 'Heures confirmées.' },
      purchaseOrder: { status: 'valid', details: 'Dans les limites du PO (54,000$/180,000$).' },
    },
    aiConfidence: 97,
    flaggedIssues: [],
  },
  // Rejected
  {
    id: 'INV-2024-0140',
    supplierId: 'SUP-001',
    projectId: 'PRJ-005',
    poId: 'PO-2024-0340',
    invoiceNumber: 'PE-2024-0885',
    date: '2026-03-15',
    dueDate: '2026-04-15',
    totalAmount: 52000.00,
    status: 'Rejetée',
    statusDetail: 'Facture en double détectée',
    receivedDate: '2026-03-16',
    lines: [
      { material: 'Excavation', quantity: 2000.000, unit: 'm³', unitPrice: 24.50, total: 49000.00 },
      { material: 'Transport', quantity: 1, unit: 'forfait', unitPrice: 3000.00, total: 3000.00 },
    ],
    validation: {
      priceList: { status: 'valid', details: 'Prix conformes.' },
      deliveryTickets: { status: 'error', details: 'Tickets de livraison déjà associés à la facture PE-2024-0870.' },
      purchaseOrder: { status: 'valid', details: 'Dans les limites du PO.' },
    },
    aiConfidence: 15,
    flaggedIssues: [
      { type: 'duplicate', severity: 'critical', message: 'Facture en double probable. Les tickets de livraison référencés sont déjà associés à la facture PE-2024-0870 du 2 mars 2026.', confidence: 98 },
    ],
  },
  {
    id: 'INV-2024-0141',
    supplierId: 'SUP-004',
    projectId: 'PRJ-002',
    poId: 'PO-2024-0310',
    invoiceNumber: 'ARS-2024-0330',
    date: '2026-03-12',
    dueDate: '2026-04-12',
    totalAmount: 28750.00,
    status: 'Retournée',
    statusDetail: 'Information manquante',
    receivedDate: '2026-03-13',
    lines: [
      { material: 'Asphalte chaud', quantity: 230.000, unit: 'tonne', unitPrice: 125.00, total: 28750.00 },
    ],
    validation: {
      priceList: { status: 'valid', details: 'Prix conforme.' },
      deliveryTickets: { status: 'warning', details: 'Tickets partiellement illisibles. Validation manuelle requise.' },
      purchaseOrder: { status: 'valid', details: 'Dans les limites.' },
    },
    aiConfidence: 65,
    flaggedIssues: [
      { type: 'missing_info', severity: 'medium', message: 'Tickets de livraison #TL-4521 et #TL-4522 partiellement illisibles. Quantité totale non confirmable.', confidence: 85 },
    ],
  },
  // More validated ones for volume
  {
    id: 'INV-2024-0142',
    supplierId: 'SUP-002',
    projectId: 'PRJ-005',
    poId: 'PO-2024-0341',
    invoiceNumber: 'CL-2024-1198',
    date: '2026-03-18',
    dueDate: '2026-04-18',
    totalAmount: 22400.00,
    status: 'Validée',
    statusDetail: 'Auto-approuvée',
    receivedDate: '2026-03-19',
    lines: [
      { material: 'Pierre concassée 0-3/4', quantity: 280.000, unit: 'tonne', unitPrice: 40.00, total: 11200.00 },
      { material: 'MG-20', quantity: 300.000, unit: 'tonne', unitPrice: 37.25, total: 11175.00 },
    ],
    validation: {
      priceList: { status: 'valid', details: 'Prix conformes.' },
      deliveryTickets: { status: 'valid', details: 'Quantités validées.' },
      purchaseOrder: { status: 'valid', details: 'Dans les limites.' },
    },
    aiConfidence: 99,
    flaggedIssues: [],
  },
  {
    id: 'INV-2024-0143',
    supplierId: 'SUP-001',
    projectId: 'PRJ-005',
    poId: 'PO-2024-0340',
    invoiceNumber: 'PE-2024-0888',
    date: '2026-03-22',
    dueDate: '2026-04-22',
    totalAmount: 36750.00,
    status: 'Validée',
    statusDetail: 'Auto-approuvée',
    receivedDate: '2026-03-23',
    lines: [
      { material: 'Excavation', quantity: 1500.000, unit: 'm³', unitPrice: 24.50, total: 36750.00 },
    ],
    validation: {
      priceList: { status: 'valid', details: 'Prix conforme.' },
      deliveryTickets: { status: 'valid', details: 'Quantité validée.' },
      purchaseOrder: { status: 'valid', details: 'Dans les limites.' },
    },
    aiConfidence: 99,
    flaggedIssues: [],
  },
  {
    id: 'INV-2024-0156',
    supplierId: 'SUP-005',
    projectId: 'PRJ-003',
    poId: null,
    invoiceNumber: 'LGP-2024-0234',
    date: '2026-04-03',
    dueDate: '2026-05-03',
    totalAmount: 14400.00,
    status: 'Anomalie',
    statusDetail: 'Bon de commande manquant',
    receivedDate: '2026-04-04',
    lines: [
      { material: 'Location pelle mécanique 330', quantity: 5, unit: 'jour', unitPrice: 1800.00, total: 9000.00 },
      { material: 'Location compacteur', quantity: 3, unit: 'jour', unitPrice: 1800.00, total: 5400.00 },
    ],
    validation: {
      priceList: { status: 'warning', details: 'Aucune liste de prix trouvée pour ce fournisseur sur ce projet.' },
      deliveryTickets: { status: 'valid', details: 'Rapports journaliers confirment l\'utilisation.' },
      purchaseOrder: { status: 'error', details: 'Aucun bon de commande associé.' },
    },
    aiConfidence: 40,
    flaggedIssues: [
      { type: 'missing_po', severity: 'high', message: 'Aucun bon de commande pour Location Gravel Plus sur le projet Parc Industriel Longueuil.', confidence: 99 },
      { type: 'missing_price_list', severity: 'medium', message: 'Pas de liste de prix négociée avec ce fournisseur pour ce projet. Impossible de valider les tarifs.', confidence: 95 },
    ],
  },
];

const DELIVERY_TICKETS = [
  // Linked to INV-2024-0147 (star invoice)
  { id: 'TL-5001', date: '2026-03-26', supplierId: 'SUP-001', projectId: 'PRJ-001', material: 'Pierre concassée 0-3/4', quantity: 19.700, unit: 'tonne', invoiceId: 'INV-2024-0147', truckId: 'CAM-12' },
  { id: 'TL-5002', date: '2026-03-26', supplierId: 'SUP-001', projectId: 'PRJ-001', material: 'MG-20', quantity: 92.200, unit: 'tonne', invoiceId: 'INV-2024-0147', truckId: 'CAM-12' },
  { id: 'TL-5003', date: '2026-03-27', supplierId: 'SUP-001', projectId: 'PRJ-001', material: 'MG-20', quantity: 93.200, unit: 'tonne', invoiceId: 'INV-2024-0147', truckId: 'CAM-08' },
  { id: 'TL-5004', date: '2026-03-25', supplierId: 'SUP-001', projectId: 'PRJ-001', material: 'Excavation', quantity: 245.000, unit: 'm³', invoiceId: 'INV-2024-0147', truckId: 'N/A' },
  // Linked to INV-2024-0148
  { id: 'TL-5010', date: '2026-03-24', supplierId: 'SUP-002', projectId: 'PRJ-001', material: 'Pierre concassée 0-3/4', quantity: 120.000, unit: 'tonne', invoiceId: 'INV-2024-0148', truckId: 'CAM-22' },
  { id: 'TL-5011', date: '2026-03-24', supplierId: 'SUP-002', projectId: 'PRJ-001', material: 'MG-20', quantity: 185.000, unit: 'tonne', invoiceId: 'INV-2024-0148', truckId: 'CAM-22' },
  // Linked to INV-2024-0150
  { id: 'TL-5020', date: '2026-03-19', supplierId: 'SUP-004', projectId: 'PRJ-002', material: 'Asphalte chaud', quantity: 245.000, unit: 'tonne', invoiceId: 'INV-2024-0150', truckId: 'CAM-35' },
  { id: 'TL-5021', date: '2026-03-19', supplierId: 'SUP-004', projectId: 'PRJ-002', material: 'Asphalte froid', quantity: 35.533, unit: 'tonne', invoiceId: 'INV-2024-0150', truckId: 'CAM-35' },
  // Linked to INV-2024-0151
  { id: 'TL-5030', date: '2026-03-28', supplierId: 'SUP-001', projectId: 'PRJ-003', material: 'Excavation', quantity: 1500.000, unit: 'm³', invoiceId: 'INV-2024-0151', truckId: 'N/A' },
  { id: 'TL-5031', date: '2026-03-28', supplierId: 'SUP-001', projectId: 'PRJ-003', material: 'Remblai', quantity: 150.000, unit: 'm³', invoiceId: 'INV-2024-0151', truckId: 'N/A' },
  // Linked to INV-2024-0152 (quantity mismatch)
  { id: 'TL-5040', date: '2026-03-27', supplierId: 'SUP-006', projectId: 'PRJ-003', material: 'Béton préfabriqué — mur', quantity: 16, unit: 'unité', invoiceId: 'INV-2024-0152', truckId: 'FLAT-03' },
  { id: 'TL-5041', date: '2026-03-28', supplierId: 'SUP-006', projectId: 'PRJ-003', material: 'Béton préfabriqué — dalle', quantity: 6, unit: 'unité', invoiceId: 'INV-2024-0152', truckId: 'FLAT-03' },
  // More tickets
  { id: 'TL-5050', date: '2026-03-30', supplierId: 'SUP-008', projectId: 'PRJ-005', material: 'Excavation roc', quantity: 600.000, unit: 'm³', invoiceId: 'INV-2024-0153', truckId: 'N/A' },
  { id: 'TL-5060', date: '2026-04-01', supplierId: 'SUP-007', projectId: 'PRJ-002', material: 'Sable', quantity: 200.000, unit: 'tonne', invoiceId: 'INV-2024-0154', truckId: 'CAM-18' },
  { id: 'TL-5061', date: '2026-04-01', supplierId: 'SUP-007', projectId: 'PRJ-002', material: 'Pierre concassée 0-3/4', quantity: 125.000, unit: 'tonne', invoiceId: 'INV-2024-0154', truckId: 'CAM-18' },
  { id: 'TL-5070', date: '2026-03-17', supplierId: 'SUP-002', projectId: 'PRJ-005', material: 'Pierre concassée 0-3/4', quantity: 280.000, unit: 'tonne', invoiceId: 'INV-2024-0142', truckId: 'CAM-22' },
  { id: 'TL-5071', date: '2026-03-17', supplierId: 'SUP-002', projectId: 'PRJ-005', material: 'MG-20', quantity: 300.000, unit: 'tonne', invoiceId: 'INV-2024-0142', truckId: 'CAM-22' },
  { id: 'TL-5080', date: '2026-03-21', supplierId: 'SUP-001', projectId: 'PRJ-005', material: 'Excavation', quantity: 1500.000, unit: 'm³', invoiceId: 'INV-2024-0143', truckId: 'N/A' },
];

const AI_INSIGHTS = [
  { id: 'AI-001', type: 'price_variance', icon: '📊', message: 'Pierre Excavation Inc. a une variance de prix de 12% sur l\'excavation ce mois-ci comparé au contrat initial.', severity: 'warning', date: '2026-04-05' },
  { id: 'AI-002', type: 'pattern', icon: '🔍', message: 'Fréquentes divergences de quantité sur les livraisons de pierre concassée (3 cas en 30 jours).', severity: 'info', date: '2026-04-04' },
  { id: 'AI-003', type: 'budget', icon: '💰', message: 'Le projet Montoni Phase 3 a atteint 85% du budget autorisé. Prévision de dépassement dans 3 semaines.', severity: 'warning', date: '2026-04-04' },
  { id: 'AI-004', type: 'delay', icon: '⏰', message: '3 factures en attente d\'approbation depuis plus de 48 heures.', severity: 'urgent', date: '2026-04-05' },
  { id: 'AI-005', type: 'duplicate', icon: '⚠️', message: 'Facture PE-2024-0885 identifiée comme doublon potentiel. Économie de 52,000$ évitée.', severity: 'success', date: '2026-03-16' },
  { id: 'AI-006', type: 'optimization', icon: '💡', message: 'Carrière Laval offre des prix 3.5% inférieurs à Pierre Excavation pour le MG-20 sur le même projet.', severity: 'info', date: '2026-04-03' },
];

// Helper functions
function getSupplier(id) { return SUPPLIERS.find(s => s.id === id); }
function getProject(id) { return PROJECTS.find(p => p.id === id); }
function getPO(id) { return PURCHASE_ORDERS.find(po => po.id === id); }
function getInvoice(id) { return INVOICES.find(inv => inv.id === id); }
function getInvoicesByProject(projectId) { return INVOICES.filter(inv => inv.projectId === projectId); }
function getInvoicesBySupplier(supplierId) { return INVOICES.filter(inv => inv.supplierId === supplierId); }
function getTicketsByInvoice(invoiceId) { return DELIVERY_TICKETS.filter(t => t.invoiceId === invoiceId); }
function getPOsByProject(projectId) { return PURCHASE_ORDERS.filter(po => po.projectId === projectId); }
function getPriceListByProject(projectId) { return PRICE_LISTS.filter(pl => pl.projectId === projectId); }
function getTicketsByProject(projectId) { return DELIVERY_TICKETS.filter(t => t.projectId === projectId); }

// KPI Calculations
function getKPIs() {
  const total = INVOICES.length;
  const validated = INVOICES.filter(i => i.status === 'Validée').length;
  const anomalies = INVOICES.filter(i => i.status === 'Anomalie').length;
  const pending = INVOICES.filter(i => i.status === 'En attente').length;
  const autoApprovedPct = Math.round((validated / total) * 100);
  const totalAmount = INVOICES.reduce((sum, i) => sum + i.totalAmount, 0);
  return { total, validated, anomalies, pending, autoApprovedPct, totalAmount };
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD' }).format(amount);
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('fr-CA', { year: 'numeric', month: 'short', day: 'numeric' });
}

function formatNumber(num) {
  return new Intl.NumberFormat('fr-CA', { minimumFractionDigits: 0, maximumFractionDigits: 3 }).format(num);
}
