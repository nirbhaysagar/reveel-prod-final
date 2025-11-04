# 🚀 Reveel - Competitive Intelligence Platform

A comprehensive B2B SaaS platform for tracking competitors, detecting changes, and generating AI-powered insights.

## ✨ Features

- **🔐 Authentication**: Secure user registration and login
- **👥 Competitor Management**: Add, edit, and monitor competitors
- **🔍 Change Detection**: Automated scraping and change detection
- **🤖 AI Integration**: OpenAI-powered insights and recommendations
- **⏰ Background Jobs**: Scheduled scraping and processing
- **📧 Notifications**: Email and in-app notifications
- **🛡️ Security**: Comprehensive security measures and validation

## 🏗️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: TailwindCSS, Shadcn UI
- **Database**: PostgreSQL (Supabase)
- **Authentication**: NextAuth.js
- **AI**: OpenAI API
- **Background Jobs**: BullMQ + Redis
- **Email**: Resend
- **Deployment**: Vercel

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL database
- Redis instance
- OpenAI API key
- Resend API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd reveel
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

4. **Set up the database**
   ```bash
   npm run db:generate
   npm run db:push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
reveel/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication pages
│   │   ├── (dashboard)/       # Dashboard pages
│   │   ├── api/               # API routes
│   │   └── globals.css        # Global styles
│   ├── components/            # Reusable components
│   │   └── ui/               # UI components
│   ├── lib/                   # Utilities and configurations
│   └── services/              # Business logic services
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Database migrations
├── public/                    # Static assets
└── docs/                      # Documentation
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run type-check` - Run TypeScript type checking
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run database migrations
- `npm run db:deploy` - Deploy migrations to production
- `npm run worker` - Start background job worker

## 🌐 Environment Variables

```bash
# Database
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# OpenAI
OPENAI_API_KEY="your-openai-key"

# Redis
REDIS_URL="your-redis-url"

# Email
RESEND_API_KEY="your-resend-key"

# Environment
NODE_ENV="development"
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Production ready"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository
   - Configure environment variables
   - Deploy automatically

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm run start
   ```

## 📊 Monitoring

- **Vercel Analytics**: Built-in performance monitoring
- **Supabase Dashboard**: Database monitoring
- **Error Tracking**: Built-in error handling
- **Uptime Monitoring**: External service recommended

## 🔒 Security

- **SSRF Protection**: URL validation prevents internal access
- **XSS Prevention**: Input sanitization and validation
- **Rate Limiting**: Prevents DoS attacks
- **SQL Injection**: Protected by Prisma ORM
- **Authentication**: Secure session management
- **Input Validation**: Comprehensive validation layer

## 📈 Performance

- **Next.js 15**: Latest performance optimizations
- **Turbopack**: Fast development builds
- **Image Optimization**: Automatic image optimization
- **Caching**: Strategic caching implementation
- **CDN**: Global content delivery

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the `/docs` folder
- **Issues**: Create a GitHub issue
- **Discussions**: Use GitHub Discussions

## 🎯 Roadmap

- [ ] Advanced AI insights
- [ ] Multi-tenant support
- [ ] API rate limiting
- [ ] Advanced analytics
- [ ] Mobile app
- [ ] Webhook integrations

---

**Built with ❤️ using Next.js, Supabase, and OpenAI**