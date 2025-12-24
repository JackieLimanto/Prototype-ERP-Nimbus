import Dexie, { Table } from 'dexie';

export interface LocalProduct {
  id: string;
  sku: string;
  name: string;
  price: number;
  category: string;
  thumbnailUrl?: string;
  taxRate: number;
}

export interface LocalOrder {
  id?: number; // Auto-increment for local ID
  localId: string; // UUID for sync
  items: LocalOrderItem[];
  total: number;
  paymentMethod: 'CASH' | 'CARD' | 'QRIS';
  amountPaid: number;
  change: number;
  timestamp: string;
  syncStatus: 0 | 1; // 0 = Pending, 1 = Synced
}

export interface LocalOrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  discount: number;
}

export interface ShiftSession {
  id?: number;
  startTime: string;
  endTime?: string;
  openingCash: number;
  expectedCash?: number;
  actualCash?: number;
  status: 'OPEN' | 'CLOSED';
}

class NimbusPOSDatabase extends Dexie {
  products!: Table<LocalProduct>;
  orders!: Table<LocalOrder>;
  shifts!: Table<ShiftSession>;

  constructor() {
    super('NimbusPOSDB');
    this.version(1).stores({
      products: 'id, sku, name, category', // Primary key and indexes
      orders: '++id, localId, timestamp, syncStatus',
      shifts: '++id, status'
    });
  }
}

export const db = new NimbusPOSDatabase();

// Seed initial data if empty
db.on('populate', () => {
  db.products.bulkAdd([
    { id: 'p1', sku: 'LAP-001', name: 'Asus Vivobook Pro', price: 12000000, category: 'Electronics', taxRate: 0.11 },
    { id: 'p2', sku: 'MON-002', name: 'Samsung Monitor 24"', price: 2500000, category: 'Electronics', taxRate: 0.11 },
    { id: 'p3', sku: 'KEY-003', name: 'Logitech Mechanical Keyboard', price: 1500000, category: 'Accessories', taxRate: 0.11 },
    { id: 'p4', sku: 'COF-001', name: 'Cappuccino', price: 35000, category: 'Beverage', taxRate: 0.1 },
    { id: 'p5', sku: 'COF-002', name: 'Americano', price: 25000, category: 'Beverage', taxRate: 0.1 },
  ]);
});
