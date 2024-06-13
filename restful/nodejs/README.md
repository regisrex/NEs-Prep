## bonbon-api
BE for bonbon house clients management system.

[![ci](https://github.com/regisrex/bonbon/actions/workflows/ci.yml/badge.svg)](https://github.com/regisrex/bonbon/actions/workflows/ci.yml)
#### Tools
- ts
- prisma
- pg

### setup 
- install packages
```bash
$ yarn 
```
- add env variables
```env
PORT=
DATABASE_URL="postgresql://<username>:<password>@<host>:<port>/bonbon?schema=public"
JWT_SECRET=""


SMTP_SERVER = gmail
SMTP_HOST = smtp.gmail.com
SMTP_USERNAME = "<email@gmail.com>"
SMTP_PASSWORD="<add your pass word>"

```

- run
```bash
$ yarn dev 
```
And checkout more scripts for building, testing,etc in `package.json`


### modules
- clients
- invoices
- ~~rooms~~

___

Nov 2023   - *Author*: [@regisrex](https://regisndizihiwe.me) 



