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

export type POStatus = 'DRAFT' | 'SUBMITTED' | 'RECEIVED';

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
  unitPrice: number;
}

export type SOStatus = 'DRAFT' | 'CONFIRMED' | 'PROCESSING' | 'COMPLETED';

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
  unitPrice: number;
}

export interface Warehouse {
  id: string;
  name: string;
  location: string;
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
