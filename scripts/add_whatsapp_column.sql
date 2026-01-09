-- Add WhatsApp number column to orders table if it doesn't exist
ALTER TABLE orders
ADD COLUMN IF NOT EXISTS customer_whatsapp VARCHAR(20);
