import { User, Product, Supplier, Customer, PurchaseOrder, SalesOrder, Warehouse, InventoryRecord, TenantSettings, AuditLog, ReturnOrder } from '../types';

export const mockSettings: TenantSettings = {
  costingMethod: 'LAST_PRICE',
  isCostingLocked: true,
  enableQC: true,
  enablePutAway: true,
  enablePacking: true,
  enableShipping: true
};

export const mockUser: User = {
  id: 'u1',
  name: 'Demo Admin',
  email: 'admin@nimbus.com',
  role: 'TENANT_ADMIN',
  avatarUrl: 'https://ui-avatars.com/api/?name=Demo+Admin&background=0ea5e9&color=fff'
};

export const mockProducts: Product[] = [
  { 
    id: 'p1', code: 'LAP-001', name: 'Asus Vivobook Pro', category: 'Electronics', price: 12000000, stock: 50, unit: 'Unit',
    thumbnailUrl: 'https://placehold.co/100x100?text=Laptop'
  },
  { 
    id: 'p2', code: 'MON-002', name: 'Samsung Monitor 24"', category: 'Electronics', price: 2500000, stock: 120, unit: 'Unit',
    thumbnailUrl: 'https://placehold.co/100x100?text=Monitor'
  },
  { 
    id: 'p3', code: 'KEY-003', name: 'Logitech Mechanical Keyboard', category: 'Accessories', price: 1500000, stock: 200, unit: 'Unit',
    thumbnailUrl: 'https://placehold.co/100x100?text=Keyboard'
  },
  { 
    id: 'p4', code: 'MOU-004', name: 'Razer Deathadder', category: 'Accessories', price: 800000, stock: 150, unit: 'Unit',
    thumbnailUrl: 'https://placehold.co/100x100?text=Mouse'
  },
  { 
    id: 'p5', code: 'CHAIR-005', name: 'ErgoChair Pro', category: 'Furniture', price: 4500000, stock: 20, unit: 'Unit',
    thumbnailUrl: 'https://placehold.co/100x100?text=Chair'
  },
];

export const mockSuppliers: Supplier[] = [
  { id: 's1', name: 'PT Tech Indo', email: 'sales@techindo.com', phone: '021-555-0101' },
  { id: 's2', name: 'CV Furniture Jaya', email: 'contact@furnijaya.com', phone: '022-555-0202' },
];

export const mockCustomers: Customer[] = [
  { id: 'c1', name: 'Toko Maju Mundur', email: 'owner@majumundur.com', address: 'Jl. Sudirman No. 1' },
  { id: 'c2', name: 'Cyber Cafe 2077', email: 'admin@cyber2077.com', address: 'Jl. Thamrin No. 99' },
];

export const mockWarehouses: Warehouse[] = [
  { 
    id: 'w1', name: 'Jakarta Central', location: 'Jakarta',
    zones: [
      { id: 'z1', name: 'Zone A (Electronics)', locations: ['A-01-01', 'A-01-02', 'A-02-01'] },
      { id: 'z2', name: 'Zone B (Bulk)', locations: ['B-01-01'] }
    ]
  },
  { 
    id: 'w2', name: 'Bandung Hub', location: 'Bandung',
    zones: [
      { id: 'z3', name: 'Zone A', locations: ['A-01-01'] }
    ]
  },
];

export const mockInventory: InventoryRecord[] = [
  { id: 'inv1', productId: 'p1', productName: 'Asus Vivobook Pro', warehouseId: 'w1', warehouseName: 'Jakarta Central', location: 'A-01-01', quantity: 30, value: 360000000 },
  { id: 'inv2', productId: 'p1', productName: 'Asus Vivobook Pro', warehouseId: 'w2', warehouseName: 'Bandung Hub', location: 'B-02-01', quantity: 20, value: 240000000 },
  { id: 'inv3', productId: 'p2', productName: 'Samsung Monitor 24"', warehouseId: 'w1', warehouseName: 'Jakarta Central', location: 'A-01-02', quantity: 120, value: 300000000 },
  { id: 'inv4', productId: 'p3', productName: 'Logitech Mechanical Keyboard', warehouseId: 'w1', warehouseName: 'Jakarta Central', location: 'A-02-01', quantity: 200, value: 300000000 },
];

export const mockPOs: PurchaseOrder[] = [
  {
    id: 'PO-202512-0001',
    supplierId: 's1',
    supplierName: 'PT Tech Indo',
    date: '2025-12-01',
    status: 'RECEIVED',
    total: 600000000,
    items: [
      { productId: 'p1', productName: 'Asus Vivobook Pro', quantity: 50, quantityReceived: 50, unitPrice: 12000000 }
    ]
  },
  {
    id: 'PO-202512-0002',
    supplierId: 's2',
    supplierName: 'CV Furniture Jaya',
    date: '2025-12-15',
    status: 'APPROVED',
    total: 90000000,
    items: [
      { productId: 'p5', productName: 'ErgoChair Pro', quantity: 20, quantityReceived: 0, unitPrice: 4500000 }
    ]
  },
];

export const mockSOs: SalesOrder[] = [
  {
    id: 'SO-202512-0001',
    customerId: 'c1',
    customerName: 'Toko Maju Mundur',
    date: '2025-12-10',
    status: 'COMPLETED',
    total: 24000000,
    items: [
      { productId: 'p1', productName: 'Asus Vivobook Pro', quantity: 2, quantityPicked: 2, unitPrice: 12000000, location: 'A-01-01' }
    ]
  },
  {
    id: 'SO-202512-0002',
    customerId: 'c2',
    customerName: 'Cyber Cafe 2077',
    date: '2025-12-18',
    status: 'PROCESSING',
    total: 25000000,
    items: [
      { productId: 'p2', productName: 'Samsung Monitor 24"', quantity: 10, quantityPicked: 0, unitPrice: 2500000, location: 'A-01-02' }
    ]
  },
];

export const mockAuditLogs: AuditLog[] = [
  { id: '1', timestamp: '2025-12-19 10:00:00', user: 'Admin', action: 'CREATE', entity: 'Purchase Order', details: 'Created PO-202512-0002' },
  { id: '2', timestamp: '2025-12-19 10:05:00', user: 'Manager', action: 'APPROVE', entity: 'Purchase Order', details: 'Approved PO-202512-0002' },
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
  {
    id: 'RMA-202501-0001',
    type: 'SALES_RETURN',
    referenceId: 'SO-202512-0001',
    partnerName: 'Toko Maju Mundur',
    date: '2025-01-10',
    status: 'RECEIVED',
    reason: 'Customer Changed Mind',
    items: [
      { productId: 'p1', productName: 'Asus Vivobook Pro', quantity: 1, condition: 'GOOD', disposition: 'RESTOCK' }
    ]
  }
];
