export type UserRole = 'TENANT_ADMIN' | 'MANAGER' | 'WORKER' | 'FINANCE';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

export type CostingMethod = 'FIFO' | 'AVERAGE' | 'LAST_PRICE';

export interface TenantSettings {
  costingMethod: CostingMethod;
  isCostingLocked: boolean; // Locked after first transaction
  enableQC: boolean;
  enablePutAway: boolean;
  enablePacking: boolean;
  enableShipping: boolean;
}

export interface Product {
  id: string;
  code: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  unit: string;
  thumbnailUrl?: string;
}

export interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  address: string;
}

export type POStatus = 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'PARTIALLY_RECEIVED' | 'RECEIVED' | 'CLOSED' | 'CANCELLED';

export interface PurchaseOrder {
  id: string;
  supplierId: string;
  supplierName: string;
  date: string;
  status: POStatus;
  total: number;
  items: POItem[];
}

export interface POItem {
  productId: string;
  productName: string;
  quantity: number;
  quantityReceived: number;
  unitPrice: number;
}

export type GRStatus = 'DRAFT' | 'CONFIRMED' | 'QC_PENDING' | 'PUTAWAY_PENDING' | 'COMPLETED';

export interface GoodsReceipt {
  id: string;
  poId: string;
  date: string;
  status: GRStatus;
  items: GRItem[];
}

export interface GRItem {
  productId: string;
  quantity: number;
  locationId?: string; // Temporary receiving location
  qcStatus?: 'PENDING' | 'PASS' | 'FAIL';
}

export interface QCRecord {
  id: string;
  grId: string;
  itemId: string;
  quantityPassed: number;
  quantityFailed: number;
  reason?: string;
  inspectorId: string;
  timestamp: string;
}

export type SOStatus = 'DRAFT' | 'CONFIRMED' | 'PROCESSING' | 'PICKED' | 'PACKED' | 'SHIPPED' | 'COMPLETED' | 'CANCELLED';

export interface SalesOrder {
  id: string;
  customerId: string;
  customerName: string;
  date: string;
  status: SOStatus;
  total: number;
  items: SOItem[];
}

export interface SOItem {
  productId: string;
  productName: string;
  quantity: number;
  quantityPicked: number;
  unitPrice: number;
  location?: string;
}

export interface Package {
  id: string;
  soId: string;
  trackingNumber: string;
  weight: number;
  dimensions: string;
  items: { productId: string; quantity: number }[];
  status: 'PACKED' | 'SHIPPED';
}

export interface Shipment {
  id: string;
  soId: string;
  carrier: string;
  trackingNumber: string;
  shipDate: string;
  packages: Package[];
}

export type ReturnType = 'PURCHASE_RETURN' | 'SALES_RETURN';
export type ReturnStatus = 'DRAFT' | 'APPROVED' | 'RECEIVED' | 'COMPLETED' | 'REJECTED';

export interface ReturnOrder {
  id: string;
  type: ReturnType;
  referenceId: string; // PO ID or SO ID
  partnerName: string; // Supplier or Customer
  date: string;
  status: ReturnStatus;
  items: ReturnItem[];
  reason: string;
}

export interface ReturnItem {
  productId: string;
  productName: string;
  quantity: number;
  condition: 'GOOD' | 'DAMAGED' | 'EXPIRED';
  disposition?: 'RESTOCK' | 'SCRAP' | 'REPAIR' | 'RETURN_TO_VENDOR';
}

export interface Warehouse {
  id: string;
  name: string;
  location: string;
  zones: Zone[];
}

export interface Zone {
  id: string;
  name: string;
  locations: string[]; 
}

export interface InventoryRecord {
  id: string;
  productId: string;
  productName: string;
  warehouseId: string;
  warehouseName: string;
  location: string;
  quantity: number;
  value: number; // Based on Costing Method
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  entity: string;
  details: string;
}
