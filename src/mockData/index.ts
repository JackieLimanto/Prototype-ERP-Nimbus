import { User, Product, Supplier, Customer, PurchaseOrder, SalesOrder, Warehouse, InventoryRecord, TenantSettings, AuditLog, ReturnOrder } from '../types';

export const mockSettings: TenantSettings = {
  tenant_name: 'Nimbus Demo Corp',
  subdomain: 'demo',
  currency_code: 'IDR',
  timezone: 'Asia/Jakarta',
  date_format: 'DD/MM/YYYY',
  numbering: [
    { doc_type: 'PO', prefix: 'PO-', next_number: 2025120003, padding: 6 },
    { doc_type: 'SO', prefix: 'SO-', next_number: 2025120003, padding: 6 },
    { doc_type: 'GRN', prefix: 'GRN-', next_number: 1001, padding: 6 },
    { doc_type: 'DO', prefix: 'DO-', next_number: 1001, padding: 6 },
    { doc_type: 'ADJ', prefix: 'ADJ-', next_number: 1001, padding: 6 }
  ],
  workflows: [
    { module: 'PO', is_enabled: true, role_id: 'manager_role' },
    { module: 'SO', is_enabled: true, min_amount: 10000000, role_id: 'manager_role' }
  ]
};

export const mockUser: User = {
  id: 'u1',
  full_name: 'Demo Admin',
  email: 'admin@nimbus.com',
  role: 'tenant_admin',
  role_id: 'r1',
  avatarUrl: 'https://ui-avatars.com/api/?name=Demo+Admin&background=0ea5e9&color=fff',
  assigned_wh_ids: ['w1', 'w2'],
  status: 'active'
};

export const mockProducts: Product[] = [
  { 
    id: 'p1', sku: 'LAP-001', name: 'Asus Vivobook Pro', category_id: 'cat1', 
    base_uom: 'UNIT', is_batch: true, is_expiry: false, min_stock: 10,
    price: 12000000, stock: 50, thumbnailUrl: 'https://placehold.co/100x100?text=Laptop'
  },
  { 
    id: 'p2', sku: 'MON-002', name: 'Samsung Monitor 24"', category_id: 'cat1',
    base_uom: 'UNIT', is_batch: false, is_expiry: false, min_stock: 20,
    price: 2500000, stock: 120, thumbnailUrl: 'https://placehold.co/100x100?text=Monitor'
  },
  { 
    id: 'p3', sku: 'KEY-003', name: 'Logitech Mechanical Keyboard', category_id: 'cat2',
    base_uom: 'UNIT', is_batch: false, is_expiry: false, min_stock: 50,
    price: 1500000, stock: 200, thumbnailUrl: 'https://placehold.co/100x100?text=Keyboard'
  },
  { 
    id: 'p4', sku: 'MOU-004', name: 'Razer Deathadder', category_id: 'cat2',
    base_uom: 'UNIT', is_batch: false, is_expiry: false, min_stock: 50,
    price: 800000, stock: 150, thumbnailUrl: 'https://placehold.co/100x100?text=Mouse'
  },
  { 
    id: 'p5', sku: 'CHAIR-005', name: 'ErgoChair Pro', category_id: 'cat3',
    base_uom: 'UNIT', is_batch: false, is_expiry: false, min_stock: 5,
    price: 4500000, stock: 20, thumbnailUrl: 'https://placehold.co/100x100?text=Chair'
  },
];

export const mockSuppliers: Supplier[] = [
  { id: 's1', supplier_code: 'SUP-001', name: 'PT Tech Indo', email: 'sales@techindo.com', phone: '021-555-0101', address: 'Jakarta', status: 'active' },
  { id: 's2', supplier_code: 'SUP-002', name: 'CV Furniture Jaya', email: 'contact@furnijaya.com', phone: '022-555-0202', address: 'Bandung', status: 'active' },
];

export const mockCustomers: Customer[] = [
  { id: 'c1', customer_code: 'CUST-001', name: 'Toko Maju Mundur', email: 'owner@majumundur.com', ship_address: 'Jl. Sudirman No. 1', status: 'active' },
  { id: 'c2', customer_code: 'CUST-002', name: 'Cyber Cafe 2077', email: 'admin@cyber2077.com', ship_address: 'Jl. Thamrin No. 99', status: 'active' },
];

export const mockWarehouses: Warehouse[] = [
  { 
    id: 'w1', wh_code: 'WH-JKT', wh_name: 'Jakarta Central', address: 'Jakarta', wh_type: 'main',
    costing_method: 'last_price', enable_qc: true, enable_put_away: true,
    zones: [
      { 
        id: 'z1', name: 'Zone A (Electronics)', type: 'storage',
        locations: [
          { id: 'l1', loc_code: 'A-01-01', zone_id: 'z1', aisle: 'A', rack: '01', bin: '01', is_pickable: true },
          { id: 'l2', loc_code: 'A-01-02', zone_id: 'z1', aisle: 'A', rack: '01', bin: '02', is_pickable: true }
        ]
      },
      { 
        id: 'z2', name: 'Zone B (Bulk)', type: 'storage',
        locations: [
            { id: 'l3', loc_code: 'B-01-01', zone_id: 'z2', aisle: 'B', rack: '01', bin: '01', is_pickable: true }
        ] 
      }
    ]
  },
  { 
    id: 'w2', wh_code: 'WH-BDG', wh_name: 'Bandung Hub', address: 'Bandung', wh_type: 'main',
    costing_method: 'average', enable_qc: false, enable_put_away: false,
    zones: [
      { 
        id: 'z3', name: 'Zone A', type: 'storage',
        locations: [
            { id: 'l4', loc_code: 'A-01-01', zone_id: 'z3', aisle: 'A', rack: '01', bin: '01', is_pickable: true }
        ] 
      }
    ]
  },
];

export const mockInventory: InventoryRecord[] = [
  { 
    id: 'inv1', trx_date: '2025-01-01', product_id: 'p1', product_name: 'Asus Vivobook Pro', 
    wh_id: 'w1', wh_name: 'Jakarta Central', location_id: 'l1', location_code: 'A-01-01', 
    qty_change: 30, ref_type: 'GRN', ref_no: 'GRN-001', unit_cost: 12000000, current_qty: 30, total_value: 360000000 
  },
  { 
    id: 'inv2', trx_date: '2025-01-01', product_id: 'p1', product_name: 'Asus Vivobook Pro', 
    wh_id: 'w2', wh_name: 'Bandung Hub', location_id: 'l4', location_code: 'B-02-01', 
    qty_change: 20, ref_type: 'GRN', ref_no: 'GRN-002', unit_cost: 12000000, current_qty: 20, total_value: 240000000 
  },
  { 
    id: 'inv3', trx_date: '2025-01-02', product_id: 'p2', product_name: 'Samsung Monitor 24"', 
    wh_id: 'w1', wh_name: 'Jakarta Central', location_id: 'l2', location_code: 'A-01-02', 
    qty_change: 120, ref_type: 'GRN', ref_no: 'GRN-001', unit_cost: 2500000, current_qty: 120, total_value: 300000000 
  },
];

export const mockPOs: PurchaseOrder[] = [
  {
    id: 'po1',
    po_number: 'PO-202512-0001',
    supplier_id: 's1',
    supplier_name: 'PT Tech Indo',
    order_date: '2025-12-01',
    status: 'closed',
    total_amount: 600000000,
    items: [
      { product_id: 'p1', product_name: 'Asus Vivobook Pro', qty_ordered: 50, qty_received: 50, unit_price: 12000000, line_status: 'closed' }
    ]
  },
  {
    id: 'po2',
    po_number: 'PO-202512-0002',
    supplier_id: 's2',
    supplier_name: 'CV Furniture Jaya',
    order_date: '2025-12-15',
    status: 'approved',
    total_amount: 90000000,
    items: [
      { product_id: 'p5', product_name: 'ErgoChair Pro', qty_ordered: 20, qty_received: 0, unit_price: 4500000, line_status: 'open' }
    ]
  },
];

export const mockSOs: SalesOrder[] = [
  {
    id: 'so1',
    so_number: 'SO-202512-0001',
    customer_id: 'c1',
    customer_name: 'Toko Maju Mundur',
    order_date: '2025-12-10',
    status: 'delivered',
    total_amount: 24000000,
    items: [
      { product_id: 'p1', product_name: 'Asus Vivobook Pro', qty_ordered: 2, qty_allocated: 2, qty_picked: 2, unit_price: 12000000 }
    ]
  },
  {
    id: 'so2',
    so_number: 'SO-202512-0002',
    customer_id: 'c2',
    customer_name: 'Cyber Cafe 2077',
    order_date: '2025-12-18',
    status: 'confirmed',
    total_amount: 25000000,
    items: [
      { product_id: 'p2', product_name: 'Samsung Monitor 24"', qty_ordered: 10, qty_allocated: 0, qty_picked: 0, unit_price: 2500000 }
    ]
  },
];

export const mockAuditLogs: AuditLog[] = [
  { id: '1', timestamp: '2025-12-19 10:00:00', user_id: 'u1', user_name: 'Admin', action: 'CREATE', resource: 'Purchase Order', details: 'Created PO-202512-0002' },
  { id: '2', timestamp: '2025-12-19 10:05:00', user_id: 'u1', user_name: 'Manager', action: 'APPROVE', resource: 'Purchase Order', details: 'Approved PO-202512-0002' },
];

export const mockReturns: ReturnOrder[] = [
  {
    id: 'RTN-PUR-202501-0001',
    type: 'PURCHASE_RETURN',
    referenceId: 'PO-202512-0001',
    partnerName: 'PT Tech Indo',
    date: '2025-01-05',
    status: 'APPROVED',
    reason: 'Defective Goods',
    items: [
      { productId: 'p1', productName: 'Asus Vivobook Pro', quantity: 2, condition: 'DAMAGED', disposition: 'RETURN_TO_VENDOR' }
    ]
  },
];