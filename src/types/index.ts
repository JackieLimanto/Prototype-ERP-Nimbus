// WMS Data Dictionary v1.1 Implementation

export type UserRole = 'TENANT_ADMIN' | 'MANAGER' | 'WORKER' | 'FINANCE';

export interface User {
  id: string; // UUID
  email: string;
  full_name: string;
  role: UserRole;
  avatarUrl?: string;
  assigned_wh_ids: string[]; // UUID[]
  status: 'ACTIVE' | 'INACTIVE';
}

export type CostingMethod = 'FIFO' | 'AVERAGE' | 'LAST_PRICE';

export interface TenantSettings {
  tenant_name: string;
  subdomain: string;
  logo_url?: string;
  currency_code: string;
  timezone: string;
  date_format: string;
  
  // Warehouse Defaults
  costingMethod: CostingMethod;
  isCostingLocked: boolean;
  enableQC: boolean;
  enablePutAway: boolean;
  enablePacking: boolean;
  enableShipping: boolean;
}

export type WarehouseType = 'MAIN' | 'TRANSIT' | 'VIRTUAL';

export interface Warehouse {
  id: string; // UUID
  wh_code: string;
  wh_name: string;
  address: string;
  wh_type: WarehouseType;
  zones: Zone[];
}

export type ZoneType = 'RECEIVING' | 'STORAGE' | 'SHIPPING' | 'QC';

export interface Zone {
  id: string; // UUID
  name: string;
  type: ZoneType;
  locations: Location[];
}

export interface Location {
  id: string; // UUID
  loc_code: string; // {Aisle}-{Rack}-{Bin}
  zone_id: string;
  aisle: string;
  rack: string;
  bin: string;
  is_pickable: boolean;
  max_weight?: number;
}

export interface Product {
  id: string; // UUID
  sku: string;
  name: string;
  barcode?: string;
  category_id: string;
  base_uom: string;
  
  // Tracking
  is_batch: boolean;
  is_expiry: boolean;
  
  // Stock Levels
  min_stock?: number;
  
  // Helper for UI (computed)
  stock: number; 
  price: number; // For reference/mock
  thumbnailUrl?: string;
}

export interface Supplier {
  id: string; // UUID
  supplier_code: string;
  name: string;
  email?: string;
  phone?: string;
  address: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface Customer {
  id: string; // UUID
  customer_code: string;
  name: string;
  email?: string;
  phone?: string;
  ship_address: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export type POStatus = 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'REJECTED' | 'RECEIVING' | 'CLOSED';

export interface PurchaseOrder {
  id: string; // UUID
  po_number: string;
  supplier_id: string;
  supplier_name: string; // Helper
  order_date: string; // Date string
  expected_date?: string;
  status: POStatus;
  notes?: string;
  items: POItem[];
  
  // Computed
  total_amount: number;
}

export interface POItem {
  product_id: string;
  product_name: string; // Helper
  qty_ordered: number;
  unit_price: number;
  qty_received: number; // Computed from GRs
  line_status: 'OPEN' | 'PARTIAL' | 'CLOSED';
}

export type GRStatus = 'DRAFT' | 'CONFIRMED' | 'QC_PENDING' | 'PUTAWAY_PENDING' | 'COMPLETED';

export interface GoodsReceipt {
  id: string; // UUID
  grn_number: string;
  po_id: string;
  received_date: string;
  received_by: string; // User ID
  vendor_do?: string;
  status: GRStatus;
  items: GRItem[];
}

export interface GRItem {
  product_id: string;
  qty_received: number;
  batch_no?: string;
  expiry_date?: string;
  qc_status: 'PENDING' | 'PASSED' | 'FAILED';
  location_id?: string; // Target location
}

export type SOStatus = 'DRAFT' | 'CONFIRMED' | 'ALLOCATED' | 'PICKING' | 'PACKED' | 'SHIPPED' | 'DELIVERED';

export interface SalesOrder {
  id: string; // UUID
  so_number: string;
  customer_id: string;
  customer_name: string; // Helper
  order_date: string;
  required_date?: string;
  status: SOStatus;
  items: SOItem[];
  
  // Computed
  total_amount: number;
}

export interface SOItem {
  product_id: string;
  product_name: string; // Helper
  qty_ordered: number;
  qty_allocated: number;
  qty_picked: number;
  unit_price: number;
}

export interface InventoryRecord {
  id: string; // Ledger ID
  trx_date: string;
  product_id: string;
  product_name: string; // Helper
  wh_id: string;
  wh_name: string; // Helper
  location_id: string;
  location_code: string; // Helper
  batch_id?: string;
  qty_change: number;
  ref_type: 'GRN' | 'DO' | 'ADJ' | 'TRF';
  ref_no: string;
  unit_cost: number;
  
  // Aggregate helper
  current_qty: number;
  total_value: number;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user_id: string;
  user_name: string; // Helper
  action: string;
  resource: string;
  details: string;
}

export interface ReturnOrder {
  id: string;
  type: 'PURCHASE_RETURN' | 'SALES_RETURN';
  referenceId: string;
  partnerName: string;
  date: string;
  status: 'DRAFT' | 'APPROVED' | 'RECEIVED' | 'COMPLETED' | 'REJECTED';
  items: any[];
  reason: string;
}