---
name: database-skill
description: Design and implement database schemas, create tables, manage migrations, and optimize data models. Use for building robust data persistence layers.
---

# Database Schema Design & Migrations

## Instructions

1. **Schema Design Principles**
   - Identify entities and relationships (1:1, 1:N, N:N)
   - Normalize data (3rd Normal Form)
   - Define primary keys and foreign keys
   - Plan indexes for frequent queries

2. **Migration Strategy**
   - Version-controlled migration files
   - Rollback capabilities
   - Environment-specific configurations
   - Seed data management

3. **Table Creation Guidelines**
   - Use appropriate data types
   - Set constraints (NOT NULL, UNIQUE, CHECK)
   - Define default values
   - Add comments/documentation

## Best Practices

- Use snake_case for table and column names
- Always add `created_at` and `updated_at` timestamps
- Use UUIDs for public-facing IDs instead of auto-increment integers
- Add indexes for foreign keys and frequently queried columns
- Document relationships and business logic in comments
- Plan for future growth and scalability
- Implement soft deletes instead of hard deletes

## Example Structures

### Basic User Schema (SQL)

```sql
-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    full_name VARCHAR(100),
    
    -- Authentication
    password_hash VARCHAR(255) NOT NULL,
    email_verified BOOLEAN DEFAULT FALSE,
    verification_token VARCHAR(64),
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE,
    
    -- Constraints
    CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT username_length CHECK (LENGTH(username) BETWEEN 3 AND 50)
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_created_at ON users(created_at);
```

### Posts with Categories (Relationship Example)

```sql
-- Categories table
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) UNIQUE NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Posts table with foreign key
CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt VARCHAR(500),
    
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    featured_image_url VARCHAR(500),
    
    -- Statistics
    view_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    published_at TIMESTAMP WITH TIME ZONE,
    
    -- Full-text search
    tsvector_column TSVECTOR GENERATED ALWAYS AS (
        setweight(to_tsvector('english', COALESCE(title, '')), 'A') ||
        setweight(to_tsvector('english', COALESCE(content, '')), 'B') ||
        setweight(to_tsvector('english', COALESCE(excerpt, '')), 'C')
    ) STORED
);

-- Many-to-many relationship for tags
CREATE TABLE post_tags (
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (post_id, tag_id)
);

-- Create indexes for performance
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_category_id ON posts(category_id);
CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_posts_tsvector ON posts USING GIN(tsvector_column);
```

### Migration File Examples

**Up Migration (users table)**

```sql
-- migrations/001_create_users_table.up.sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

**Down Migration (rollback)**

```sql
-- migrations/001_create_users_table.down.sql
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
DROP TABLE IF EXISTS users;
DROP FUNCTION IF EXISTS update_updated_at_column();
```

### ORM Schema Definition (Prisma)

```prisma
// schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id             String    @id @default(cuid())
  email          String    @unique
  username       String    @unique
  passwordHash   String
  emailVerified  Boolean   @default(false)
  
  // Relations
  posts          Post[]
  comments       Comment[]
  profile        Profile?
  
  // Timestamps
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt
  deletedAt      DateTime?
  
  @@map("users")
}

model Post {
  id           String     @id @default(cuid())
  title        String
  content      String
  slug         String     @unique
  status       String     @default("draft")
  
  // Relations
  author       User       @relation(fields: [authorId], references: [id])
  authorId     String
  category     Category?  @relation(fields: [categoryId], references: [id])
  categoryId   String?
  tags         Tag[]
  comments     Comment[]
  
  // Timestamps
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt
  publishedAt  DateTime?
  
  @@map("posts")
  @@index([authorId])
  @@index([categoryId])
  @@index([slug])
  @@index([createdAt])
}
```

### Database Configuration & Connection

```javascript
// database.js
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

// Connection pool configuration
const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Drizzle ORM instance
export const db = drizzle(pool, { schema });

// Migration utility
export async function runMigrations() {
  const migrationClient = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  
  try {
    await migrationClient.connect();
    
    // Read migration files
    const migrationFiles = await readdir('./migrations');
    
    for (const file of migrationFiles.sort()) {
      if (file.endsWith('.up.sql')) {
        const sql = readFileSync(`./migrations/${file}`, 'utf8');
        await migrationClient.query(sql);
        console.log(`✅ Applied migration: ${file}`);
      }
    }
  } finally {
    await migrationClient.end();
  }
}
```

## Schema Design Checklist

- [ ] All tables have primary keys
- [ ] Foreign keys properly defined with referential actions
- [ ] Appropriate indexes for query patterns
- [ ] Data types optimized for storage and performance
- [ ] Constraints to maintain data integrity
- [ ] Audit columns (created_at, updated_at, deleted_at)
- [ ] Documentation for complex relationships
- [ ] Migration rollback scripts tested
- [ ] Environment-specific configurations
- [ ] Backup and recovery strategy defined

## Common Patterns

- **Soft Deletes**: Use `deleted_at` instead of hard deletes
- **Audit Logging**: Separate table for tracking changes
- **Polymorphic Relations**: For flexible relationships
- **Materialized Views**: For complex aggregations
- **Partitioning**: For large tables by date ranges
