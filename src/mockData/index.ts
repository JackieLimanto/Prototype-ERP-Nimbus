import { User, Product, Supplier, Customer, PurchaseOrder, SalesOrder, Warehouse, InventoryRecord } from '../types';

export const mockUser: User = {
  id: 'u1',
  name: 'Demo Admin',
  email: 'admin@nimbus.com',
  role: 'TENANT_ADMIN',
  avatarUrl: 'https://ui-avatars.com/api/?name=Demo+Admin&background=0ea5e9&color=fff'
};

export const mockProducts: Product[] = [
  { id: 'p1', code: 'LAP-001', name: 'Asus Vivobook Pro', category: 'Electronics', price: 12000000, stock: 50, unit: 'Unit' },
  { id: 'p2', code: 'MON-002', name: 'Samsung Monitor 24"', category: 'Electronics', price: 2500000, stock: 120, unit: 'Unit' },
  { id: 'p3', code: 'KEY-003', name: 'Logitech Mechanical Keyboard', category: 'Accessories', price: 1500000, stock: 200, unit: 'Unit' },
  { id: 'p4', code: 'MOU-004', name: 'Razer Deathadder', category: 'Accessories', price: 800000, stock: 150, unit: 'Unit' },
  { id: 'p5', code: 'CHAIR-005', name: 'ErgoChair Pro', category: 'Furniture', price: 4500000, stock: 20, unit: 'Unit' },
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
  { id: 'w1', name: 'Jakarta Central', location: 'Jakarta' },
  { id: 'w2', name: 'Bandung Hub', location: 'Bandung' },
];

export const mockInventory: InventoryRecord[] = [
  { id: 'inv1', productId: 'p1', productName: 'Asus Vivobook Pro', warehouseId: 'w1', warehouseName: 'Jakarta Central', location: 'A-01-01', quantity: 30 },
  { id: 'inv2', productId: 'p1', productName: 'Asus Vivobook Pro', warehouseId: 'w2', warehouseName: 'Bandung Hub', location: 'B-02-01', quantity: 20 },
  { id: 'inv3', productId: 'p2', productName: 'Samsung Monitor 24"', warehouseId: 'w1', warehouseName: 'Jakarta Central', location: 'A-01-02', quantity: 120 },
  { id: 'inv4', productId: 'p3', productName: 'Logitech Mechanical Keyboard', warehouseId: 'w1', warehouseName: 'Jakarta Central', location: 'A-02-01', quantity: 200 },
];

export const mockPOs: PurchaseOrder[] = [
  {
    id: 'PO-2025-001',
    supplierId: 's1',
    supplierName: 'PT Tech Indo',
    date: '2025-12-01',
    status: 'RECEIVED',
    total: 600000000,
    items: [
      { productId: 'p1', productName: 'Asus Vivobook Pro', quantity: 50, unitPrice: 12000000 }
    ]
  },
  {
    id: 'PO-2025-002',
    supplierId: 's2',
    supplierName: 'CV Furniture Jaya',
    date: '2025-12-15',
    status: 'SUBMITTED',
    total: 90000000,
    items: [
      { productId: 'p5', productName: 'ErgoChair Pro', quantity: 20, unitPrice: 4500000 }
    ]
  },
];

export const mockSOs: SalesOrder[] = [
  {
    id: 'SO-2025-001',
    customerId: 'c1',
    customerName: 'Toko Maju Mundur',
    date: '2025-12-10',
    status: 'COMPLETED',
    total: 24000000,
    items: [
      { productId: 'p1', productName: 'Asus Vivobook Pro', quantity: 2, unitPrice: 12000000 }
    ]
  },
  {
    id: 'SO-2025-002',
    customerId: 'c2',
    customerName: 'Cyber Cafe 2077',
    date: '2025-12-18',
    status: 'PROCESSING',
    total: 25000000,
    items: [
      { productId: 'p2', productName: 'Samsung Monitor 24"', quantity: 10, unitPrice: 2500000 }
    ]
  }
];
