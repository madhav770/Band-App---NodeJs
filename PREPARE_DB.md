Nagarro Assignment
Music Band App

#Preparing the database

Do the following as root

```sql

create database banddb;
create user myuser identified by '1234'
use banddb;
grant all privileges on banddb to myuser;
grant all privileges on banddb.* to myuser;

```
