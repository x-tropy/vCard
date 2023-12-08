drop table if exists "profiles";
drop table if exists "nfts";
drop table if exists "countries";
drop table if exists "avatars";

create table "profiles" (
  "id" integer primary key autoincrement,
  "name" text not null,
  "user_id" text not null,
  "bio"  text default '',
  "birth_date"  date default '',
  "location_country"  text default '',
  "working_status"  text default '',
  "phone"  text default '',
  "country_calling_code"  text default '',
  "phone_is_public" integer default 0 ,
  "email"  text default '',
  "email_is_public" integer default 0 ,
  "linkedin_user_id"  text default '',
  "github_user_id"  text default '',
  "twitter_user_id"  text default '',
  "instagram_user_id"  text default '',
  "created_at" datetime default current_timestamp,
  "updated_at" datetime default current_timestamp
);
-- Example data
insert into "profiles" ("name", "user_id", "bio", "birth_date") values ('🔥Buwei廖', 'demoid', "I'm a full-stack developer, blockchain enthusiast, and a lifelong learner. Also, I'm hamburger master, able to make delicious 🍔🍔🍔!", "1992-10-01");
insert into "profiles" ("name", "user_id", "bio", "birth_date") values ('🔥Buwei廖', 'demoid2', "I'm a full-stack developer, blockchain enthusiast, and a lifelong learner. Also, I'm hamburger master, able to make delicious 🍔🍔🍔!", "1992-10-01");

create table "nfts" (
  "id" integer primary key autoincrement,
  "profile_id" integer not null,
  "hash" text not null,
  “transaction_id” text not null,
  "log" json not null,
  "created_at" datetime default current_timestamp
);

create table "avatars" (
  "id" integer primary key autoincrement,
  "profile_id" integer not null,
  "avatar" blob not null
);

create table "countries" (
  "id" integer primary key autoincrement,
  "name" text not null,
  "country_calling_code" text not null
);
-- Example data of major countries
insert into "countries" ("name", "country_calling_code") values ('United States', '+1');
insert into "countries" ("name", "country_calling_code") values ('China', '+86');
insert into "countries" ("name", "country_calling_code") values ('Japan', '+81');
insert into "countries" ("name", "country_calling_code") values ('Germany', '+49');
insert into "countries" ("name", "country_calling_code") values ('United Kingdom', '+44');
insert into "countries" ("name", "country_calling_code") values ('France', '+33');
insert into "countries" ("name", "country_calling_code") values ('Italy', '+39');
insert into "countries" ("name", "country_calling_code") values ('Brazil', '+55');
insert into "countries" ("name", "country_calling_code") values ('Canada', '+1');
insert into "countries" ("name", "country_calling_code") values ('South Korea', '+82');
insert into "countries" ("name", "country_calling_code") values ('Russia', '+7');
insert into "countries" ("name", "country_calling_code") values ('Spain', '+34');
insert into "countries" ("name", "country_calling_code") values ('Australia', '+61');
insert into "countries" ("name", "country_calling_code") values ('Mexico', '+52');
insert into "countries" ("name", "country_calling_code") values ('Indonesia', '+62');
insert into "countries" ("name", "country_calling_code") values ('Netherlands', '+31');
insert into "countries" ("name", "country_calling_code") values ('Saudi Arabia', '+966');
insert into "countries" ("name", "country_calling_code") values ('Turkey', '+90');
insert into "countries" ("name", "country_calling_code") values ('Switzerland', '+41');
insert into "countries" ("name", "country_calling_code") values ('Taiwan', '+886');
insert into "countries" ("name", "country_calling_code") values ('Poland', '+48');
insert into "countries" ("name", "country_calling_code") values ('Thailand', '+66');
insert into "countries" ("name", "country_calling_code") values ('Sweden', '+46');
insert into "countries" ("name", "country_calling_code") values ('Iran', '+98');
insert into "countries" ("name", "country_calling_code") values ('Nigeria', '+234');
insert into "countries" ("name", "country_calling_code") values ('Argentina', '+54');
insert into "countries" ("name", "country_calling_code") values ('Belgium', '+32');
insert into "countries" ("name", "country_calling_code") values ('Austria', '+43');
insert into "countries" ("name", "country_calling_code") values ('Norway', '+47');
insert into "countries" ("name", "country_calling_code") values ('United Arab Emirates', '+971');