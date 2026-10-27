-- Run after schema.sql. Replace OWNER_USER_UUID with the UUID of the owner's Supabase Auth user.
insert into restaurants (id,name,slug) values
  ('00000000-0000-4000-8000-000000000001','Flamebachi','flamebachi')
on conflict (id) do update set name=excluded.name, slug=excluded.slug;

insert into locations (id,restaurant_id,name,address,phone) values
  ('00000000-0000-4000-8000-000000000011','00000000-0000-4000-8000-000000000001','Downtown LA','225 W 7th St, Los Angeles, CA 90014','(213) 677-6942')
on conflict (id) do update set address=excluded.address, phone=excluded.phone;

-- IMPORTANT: replace this placeholder with the real Supabase auth.users id.
-- insert into restaurant_members (restaurant_id,user_id,role)
-- values ('00000000-0000-4000-8000-000000000001','OWNER_USER_UUID','owner')
-- on conflict (restaurant_id,user_id) do update set role='owner';
