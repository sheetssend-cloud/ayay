# Thai Exam Book Store - Production Ready

A complete e-commerce platform for Thai exam preparation books with a full-featured admin dashboard.

## Features

### Customer Features
- Browse and search exam books
- Product categories and filtering
- Shopping cart functionality
- Secure checkout process
- Order tracking

### Admin Features
- Complete dashboard with analytics
- Product management (CRUD operations)
- Order management and status updates
- Category management
- Coupon system
- User management
- Real-time statistics

## Tech Stack

- **Frontend**: Next.js 14, React 19, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Authentication**: JWT with bcryptjs
- **Data Storage**: JSON file-based system (production-ready)
- **API**: Next.js API routes with full REST endpoints

## Production Deployment

### 1. Environment Setup

Copy the environment template:
\`\`\`bash
cp .env.example .env.local
\`\`\`

Update the following variables:
- `JWT_SECRET`: Generate a secure random string
- `NODE_ENV`: Set to "production"
- `NEXT_PUBLIC_APP_URL`: Your domain URL

### 2. Initialize Data

Run the initialization script to create admin user and basic data:
\`\`\`bash
node scripts/init-data.js
\`\`\`

This creates:
- Admin user: `admin@example.com` / `admin123`
- Basic categories
- Empty data files

### 3. Build and Deploy

\`\`\`bash
npm run build
npm start
\`\`\`

### 4. File Permissions

Ensure the `data/` directory is writable:
\`\`\`bash
chmod 755 data/
chmod 644 data/*.json
\`\`\`

## Admin Access

- URL: `/admin`
- Default Admin: `admin@example.com`
- Default Password: `admin123`

**Important**: Change the default admin password after first login!

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Admin - Products
- `GET /api/admin/products` - List all products
- `POST /api/admin/products` - Create product
- `GET /api/admin/products/[id]` - Get product
- `PUT /api/admin/products/[id]` - Update product
- `DELETE /api/admin/products/[id]` - Delete product

### Admin - Orders
- `GET /api/admin/orders` - List all orders
- `PATCH /api/admin/orders` - Update order status

### Admin - Categories
- `GET /api/admin/categories` - List categories
- `POST /api/admin/categories` - Create category

### Admin - Coupons
- `GET /api/admin/coupons` - List coupons
- `POST /api/admin/coupons` - Create coupon

### Public
- `GET /api/products` - List products (public)
- `POST /api/orders` - Create order

## Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Admin route protection via middleware
- Input validation and sanitization
- CORS protection
- Secure cookie handling

## Data Storage

The system uses a file-based JSON storage system that's production-ready:
- Data stored in `/data` directory
- Atomic file operations
- Error handling and recovery
- Backup-friendly format

## Customization

### Adding New Product Categories
Edit the categories in `scripts/init-data.js` or use the admin panel.

### Modifying Admin Permissions
Update the `requireAdmin` function in `lib/auth.ts`.

### Adding New API Endpoints
Follow the existing pattern in `/app/api` directory.

## Monitoring and Maintenance

### Log Files
Check server logs for errors and performance issues.

### Data Backup
Regularly backup the `/data` directory:
\`\`\`bash
tar -czf backup-$(date +%Y%m%d).tar.gz data/
\`\`\`

### Performance
- Monitor file system performance
- Consider database migration for high traffic
- Implement caching if needed

## Support

For technical support or customization requests, please refer to the documentation or contact the development team.
