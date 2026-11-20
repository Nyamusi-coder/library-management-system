# Library Management System

## Schema Decisions

### Why Book references Genre rather than embedding it
In this relational database design, the `Book` model references the `Genre` model using a foreign key (`genreId`) and a `@relation`, rather than embedding the genre name directly inside the Book record. 

There are two main reasons for this:
1. **Data Integrity & Normalization:** If we embedded the genre name (e.g., "Science Fiction") directly into every book, and we later decided to rename it to "Sci-Fi", we would have to update every single book record individually. By using a relation, we only have to update the Genre name in one place, and all books automatically reflect the change.
2. **Query Efficiency:** Relational databases like PostgreSQL are highly optimized for joining tables. Referencing the `Genre` by its ID allows us to easily query, filter, and group books by genre without duplicating text data across the database.

### Stretch Note: Prisma vs. Document Database
Modeling in Prisma (which uses a relational SQL database like PostgreSQL) feels very different from modeling in a document database like MongoDB. In a document database, you would likely **embed** the Genre directly inside the Book document to avoid "joins", because document databases are optimized for reading nested data quickly. However, in Prisma/PostgreSQL, we use **foreign keys and relations** to prevent data duplication and enforce strict data integrity, relying on the database engine to handle the "joins" efficiently behind the scenes.

## Project layout

- `api/prisma/schema.prisma` defines the `Role` enum and the `User`, `Genre`, `Book`, and `Review` models. `Book.genreId` is a foreign key with a `@relation` to `Genre`.
- `api/prisma/seed.ts` creates four genres and sixteen books, then one patron and one review. Running it again updates those rows instead of inserting duplicates.
- `api/src/prisma/prisma.service.ts` extends `PrismaClient`, connects in `onModuleInit`, and disconnects in `onModuleDestroy`. `PrismaModule` provides that service.
- `api/.env.example` is the committed placeholder. Copy it to `api/.env` and put the real database URL only in that local file.

## Setup

```bash
copy api\.env.example api\.env
npm install
npm run db:migrate
npm run db:seed
```

`DATABASE_URL` must be a PostgreSQL URL you control, in the form `postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public`. Do not commit `api/.env`.