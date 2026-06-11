import { Generated } from "kysely";

export interface UsersTable {
  id: Generated<string>;
  email: string;
  role: string;
  website_limit: number;
}

export interface WebsitesTable {
  id: Generated<string>;
  user_id: string;
  url?: string;
  domain?: string;
  type?: string;
  is_single_owner?: boolean;
  verification_status?: string;
  verification_method?: string;
  verified?: boolean;
  verified_at?: string | null;
  verification_token?: string | null;
  primary_owner_id?: string | null;
  secondary_owner_id?: string | null;
  last_scanned_at?: string | null;
  last_scan_id?: string | null;
  created_at?: string;
  updated_at?: string;
  label: string | null;
}

export interface ScansTable {
  id: Generated<string>; // ✅ tells Kysely it's auto‑generated
  user_id: string;
  website_id: string;
  domain: string;
  status: string;
  created_at?: string;
}

interface ScanStartPayload {
  user_id: string;
  website_id: string;
  domain: string;
}
export interface DB {
  users: UsersTable;
  websites: WebsitesTable;
  scans: ScansTable;
}

