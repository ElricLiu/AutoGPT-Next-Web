
#!/bin/sh

# change schema.prisma
sed -ie 's/mysql/sqlite/g' prisma/schema.prisma
sed -ie 's/@db.Text//' prisma/schema.prisma

# Add Prisma and generate Prisma client
npx prisma generate

# Generate db when not exists
db_file="/app/prisma/${DATABASE_URL:5}"
if [ ! -f "$db_file" ]; then
  npx prisma migrate dev --name init
  npx prisma db push
fi

# run cmd
exec "$@"
