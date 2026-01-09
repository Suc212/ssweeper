-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  num_units INTEGER NOT NULL DEFAULT 1,
  total_price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert
CREATE POLICY "Allow anyone to submit orders" ON orders
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow read access to all orders (for admin)
CREATE POLICY "Allow read access to all orders" ON orders
  FOR SELECT
  USING (true);

CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_orders_email ON orders(customer_email);
