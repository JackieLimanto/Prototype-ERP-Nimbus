export type UserRole = 'TENANT_ADMIN' | 'MANAGER' | 'WORKER' | 'FINANCE';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface Product {
  id: string;
  code: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  unit: string;
  thumbnailUrl?: string; // Added for SCR-030
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

export type POStatus = 'DRAFT' | 'SUBMITTED' | 'PARTIALLY_RECEIVED' | 'RECEIVED' | 'CLOSED';

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
  quantityReceived: number; // Added for tracking receipt
  unitPrice: number;
}

export type SOStatus = 'DRAFT' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'COMPLETED';

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
  quantityPicked: number; // Added for tracking picking
  unitPrice: number;
  location?: string; // Added for picking guidance
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
  locations: string[]; // e.g. A-01-01
}

export interface InventoryRecord {
  id: string;
  productId: string;
  productName: string;
  warehouseId: string;
  warehouseName: string;
  location: string; // "A-01-01"
  quantity: number;
}
