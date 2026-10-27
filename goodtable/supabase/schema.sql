create extension if not exists pgcrypto;

create table if not exists restaurants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  status text not null default 'active' check (status in ('active','paused','suspended')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists locations (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references restaurants(id) on delete cascade,
  name text not null,
  address text,
  phone text,
  timezone text not null default 'America/Los_Angeles',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists restaurant_members (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references restaurants(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('owner','manager','cashier','kitchen')),
  created_at timestamptz not null default now(),
  unique(restaurant_id,user_id)
);

create table if not exists menu_categories (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references restaurants(id) on delete cascade,
  name text not null,
  sort_order integer not null default 0,
  available boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists menu_items (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references restaurants(id) on delete cascade,
  category_id uuid references menu_categories(id) on delete set null,
  name text not null,
  description text,
  price_cents integer not null check (price_cents >= 0),
  image_url text,
  available boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references restaurants(id) on delete cascade,
  name text,
  phone text,
  email text,
  email_consent boolean not null default false,
  sms_consent boolean not null default false,
  consent_source text,
  consent_at timestamptz,
  order_count integer not null default 0,
  lifetime_spend_cents integer not null default 0,
  first_order_at timestamptz,
  last_order_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(restaurant_id,email),
  unique(restaurant_id,phone)
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references restaurants(id) on delete restrict,
  location_id uuid references locations(id) on delete restrict,
  customer_id uuid references customers(id) on delete set null,
  order_number text not null,
  channel text not null check (channel in ('WEB','KIOSK','QR','POS','ADMIN')),
  fulfillment text not null default 'PICKUP' check (fulfillment in ('PICKUP','DELIVERY')),
  status text not null default 'NEW' check (status in ('NEW','ACCEPTED','PREPARING','READY','COMPLETED','CANCELLED')),
  payment_method text not null check (payment_method in ('CASH','STRIPE','CLOVER')),
  payment_status text not null default 'UNPAID' check (payment_status in ('UNPAID','PENDING','PAID','REFUNDED','FAILED')),
  subtotal_cents integer not null check (subtotal_cents >= 0),
  tax_cents integer not null check (tax_cents >= 0),
  fee_cents integer not null default 0 check (fee_cents >= 0),
  total_cents integer not null check (total_cents >= 0),
  external_payment_id text,
  notes text,
  created_at timestamptz not null default now(),
  accepted_at timestamptz,
  completed_at timestamptz,
  cancelled_at timestamptz,
  updated_at timestamptz not null default now(),
  unique(restaurant_id,order_number)
);

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references restaurants(id) on delete restrict,
  order_id uuid not null references orders(id) on delete cascade,
  menu_item_id uuid references menu_items(id) on delete set null,
  name text not null,
  quantity integer not null check (quantity > 0),
  unit_price_cents integer not null check (unit_price_cents >= 0),
  options jsonb not null default '[]'::jsonb,
  line_total_cents integer not null check (line_total_cents >= 0),
  created_at timestamptz not null default now()
);

create table if not exists payment_connections (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references restaurants(id) on delete cascade,
  provider text not null check (provider in ('STRIPE','CLOVER')),
  connected_account_id text,
  merchant_id text,
  location_id text,
  status text not null default 'pending' check (status in ('pending','connected','disabled','error')),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(restaurant_id,provider)
);

create table if not exists printers (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references restaurants(id) on delete cascade,
  location_id uuid references locations(id) on delete cascade,
  name text not null,
  printer_type text not null default 'ESC_POS_TCP',
  host text,
  port integer default 9100,
  role text not null default 'KITCHEN' check (role in ('KITCHEN','FRONT_COUNTER','BAR','EXPO','RECEIPT')),
  enabled boolean not null default true,
  paired boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists printer_jobs (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references restaurants(id) on delete cascade,
  printer_id uuid not null references printers(id) on delete cascade,
  order_id uuid references orders(id) on delete set null,
  job_type text not null check (job_type in ('KITCHEN_ORDER','CUSTOMER_RECEIPT')),
  status text not null default 'QUEUED' check (status in ('QUEUED','CLAIMED','PRINTED','FAILED')),
  attempts integer not null default 0,
  last_error text,
  idempotency_key text not null unique,
  created_at timestamptz not null default now(),
  printed_at timestamptz
);

create table if not exists kiosks (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references restaurants(id) on delete cascade,
  location_id uuid references locations(id) on delete cascade,
  name text not null,
  status text not null default 'active' check (status in ('active','paused','disabled')),
  device_token_hash text,
  last_seen_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references restaurants(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  action text not null,
  entity_type text,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists orders_restaurant_created_idx on orders(restaurant_id,created_at desc);
create index if not exists orders_restaurant_status_idx on orders(restaurant_id,status);
create index if not exists customers_restaurant_last_order_idx on customers(restaurant_id,last_order_at desc);
create index if not exists printer_jobs_status_idx on printer_jobs(restaurant_id,status,created_at);

-- RLS helper
create or replace function public.is_restaurant_member(target_restaurant uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from restaurant_members
    where restaurant_id = target_restaurant and user_id = auth.uid()
  );
$$;

alter table restaurants enable row level security;
alter table locations enable row level security;
alter table restaurant_members enable row level security;
alter table menu_categories enable row level security;
alter table menu_items enable row level security;
alter table customers enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table payment_connections enable row level security;
alter table printers enable row level security;
alter table printer_jobs enable row level security;
alter table kiosks enable row level security;
alter table audit_logs enable row level security;

create policy restaurant_member_read on restaurants for select using (public.is_restaurant_member(id));
create policy restaurant_member_locations on locations for all using (public.is_restaurant_member(restaurant_id)) with check (public.is_restaurant_member(restaurant_id));
create policy restaurant_member_members on restaurant_members for select using (public.is_restaurant_member(restaurant_id));
create policy restaurant_member_menu_categories on menu_categories for all using (public.is_restaurant_member(restaurant_id)) with check (public.is_restaurant_member(restaurant_id));
create policy restaurant_member_menu_items on menu_items for all using (public.is_restaurant_member(restaurant_id)) with check (public.is_restaurant_member(restaurant_id));
create policy restaurant_member_customers on customers for all using (public.is_restaurant_member(restaurant_id)) with check (public.is_restaurant_member(restaurant_id));
create policy restaurant_member_orders on orders for all using (public.is_restaurant_member(restaurant_id)) with check (public.is_restaurant_member(restaurant_id));
create policy restaurant_member_order_items on order_items for all using (public.is_restaurant_member(restaurant_id)) with check (public.is_restaurant_member(restaurant_id));
create policy restaurant_member_payments on payment_connections for all using (public.is_restaurant_member(restaurant_id)) with check (public.is_restaurant_member(restaurant_id));
create policy restaurant_member_printers on printers for all using (public.is_restaurant_member(restaurant_id)) with check (public.is_restaurant_member(restaurant_id));
create policy restaurant_member_printer_jobs on printer_jobs for all using (public.is_restaurant_member(restaurant_id)) with check (public.is_restaurant_member(restaurant_id));
create policy restaurant_member_kiosks on kiosks for all using (public.is_restaurant_member(restaurant_id)) with check (public.is_restaurant_member(restaurant_id));
create policy restaurant_member_audit on audit_logs for select using (public.is_restaurant_member(restaurant_id));
