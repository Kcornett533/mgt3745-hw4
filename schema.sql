-- schema.sql
-- Provenance manifest database schema
CREATE TABLE IF NOT EXISTS entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  manifest_id TEXT NOT NULL,
  pipeline_name TEXT NOT NULL,
  execution_params TEXT NOT NULL,
  file_signature TEXT NOT NULL,
  notes TEXT DEFAULT 'N/A',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
