drop table if exists "profiles";

create table "profiles" (
  "id" integer primary key autoincrement,
  "name" text not null,
  "user_id" text not null,
  "birth_date" date,
  "created_at" datetime default current_timestamp,
  "updated_at" datetime default current_timestamp
);

insert into "profiles" ("name", "user_id") values ('Super Pro', 'demo');