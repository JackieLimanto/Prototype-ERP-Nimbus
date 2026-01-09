// WMS Data Dictionary v1.1 Implementation

export type UserRole = 'tenant_admin' | 'manager' | 'worker' | 'finance';

export interface User {
  id: string; // UUID
  email: string;
  full_name: string;
  role_id: string; // UUID (Role) or use UserRole for simpler MVP
  role: UserRole; // Kept for UI convenience
  avatarUrl?: string;
  assigned_wh_ids: string[]; // UUID[]
  status: 'active' | 'inactive';
}

export type CostingMethod = 'fifo' | 'average' | 'last_price';

export interface DocumentNumbering {
  doc_type: 'PO' | 'SO' | 'GRN' | 'DO' | 'ADJ';
  prefix: string;
  next_number: number;
  padding: number; // default 6
  separator?: string;
}

export interface WorkflowSetting {
  module: 'PO' | 'SO' | 'ADJ';
  is_enabled: boolean;
  min_amount?: number;
  role_id: string;
}

export interface TenantSettings {
  tenant_name: string;
  subdomain: string;
  logo_url?: string;
  currency_code: string;
  timezone: string;
  date_format: string;
  
  // Document Numbering & Workflows
  numbering: DocumentNumbering[];
  workflows: WorkflowSetting[];
}

export type WarehouseType = 'main' | 'transit' | 'virtual';

export interface Warehouse {
  id: string; // UUID
  wh_code: string;
  wh_name: string;
  address: string;
  wh_type: WarehouseType;
  
  // Settings per Warehouse
  costing_method: CostingMethod;
  enable_qc: boolean;
  enable_put_away: boolean;

  zones: Zone[];
}

export type ZoneType = 'receiving' | 'storage' | 'shipping' | 'qc';

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
  status: 'active' | 'inactive';
}

export interface Customer {
  id: string; // UUID
  customer_code: string;
  name: string;
  email?: string;
  phone?: string;
  ship_address: string;
  status: 'active' | 'inactive';
}

export interface Transporter {
  id: string; // UUID
  name: string;
  services?: string[]; // JSON/Array
  track_url_tpl?: string;
}

export type POStatus = 'draft' | 'submitted' | 'approved' | 'rejected' | 'receiving' | 'closed';

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
  line_status: 'open' | 'partial' | 'closed';
}

export type GRStatus = 'draft' | 'confirmed' | 'qc_pending' | 'putaway_pending' | 'completed';

export interface GoodsReceipt {
  id: string; // UUID
  grn_number: string;
  po_id: string;
  received_date: string;
  received_by: string; // User ID
  vendor_do?: string;
  status: GRStatus; // Mapped from logic or explicit
  items: GRItem[];
}

export interface GRItem {
  product_id: string;
  qty_received: number;
  batch_no?: string;
  expiry_date?: string;
  qc_status: 'pending' | 'passed' | 'failed';
  location_id?: string; // Target location
}

export type SOStatus = 'draft' | 'confirmed' | 'allocated' | 'picking' | 'packed' | 'shipped' | 'delivered';

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

export interface PickingTask {
  pick_id: string; // UUID
  so_line_id: string;
  location_id: string;
  qty_to_pick: number;
  qty_picked: number;
  short_pick_reason?: 'not_found' | 'damaged';
}

export interface DeliveryOrder {
  id: string; // UUID
  do_number: string;
  so_id: string;
  transporter_id: string;
  tracking_no?: string;
  ship_date: string;
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

export interface StockAdjustment {
  adj_number: string;
  product_id: string;
  location_id: string;
  current_qty: number;
  new_qty: number;
  delta: number;
  reason_code: 'damaged' | 'lost' | 'found' | 'expired';
}

export interface StockRelocation {
  rlc_number: string;
  product_id: string;
  from_loc_id: string;
  to_loc_id: string;
  qty: number;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user_id: string;
  user_name: string; // Helper
  action: string;
  resource: string;
  details: string;
  old_val?: any;
  new_val?: any;
}

export interface ApiCredentials {
  key_name: string;
  api_key: string;
  scopes: any; // JSON
  expires_at?: string;
}

export interface Webhook {
  event_type: 'po.received' | 'so.shipped' | 'stock.low';
  target_url: string;
  signing_secret: string;
  is_active: boolean;
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