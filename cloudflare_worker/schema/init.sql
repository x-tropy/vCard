-- Note:
-- 1. Every SQL statement must end with a semicolon (;)
-- 2. No (,) at the end of the last statement

drop table if exists "profiles";

create table "profiles" (
  "id" integer primary key autoincrement,
  "name" text not null,
  "user_id" text not null,
  "birth_date" date,
  "created_at" datetime default current_timestamp,
  "updated_at" datetime default current_timestamp
);

create table "nfts" (
  "id" integer primary key autoincrement,
  "profile_id" integer not null,
  "hash" text not null,
  “transaction_id” text not null,
  "log" json not null,
  "created_at" datetime default current_timestamp
);

insert into "profiles" ("name", "user_id") values ('Super Pro', 'demo');