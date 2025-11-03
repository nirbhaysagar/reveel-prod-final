// ============================================
// NEXT AUTH CONFIGURATION
// ============================================
// Purpose: Configure NextAuth.js for authentication
// Why: Handles login, sessions, and user management
// Framework: NextAuth.js

import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from './db'
import bcrypt from 'bcryptjs'

// ============================================
// AUTH OPTIONS
// ============================================
// What: Configuration object for NextAuth
// Why: Defines how authentication works
export const authOptions: NextAuthOptions = {
  // ============================================
  // PRISMA ADAPTER
  // ============================================
  // What: Connects NextAuth to Prisma
  // Why: Stores sessions and users in database
  adapter: PrismaAdapter(prisma),

  // ============================================
  // AUTHENTICATION PROVIDERS
  // ============================================
  // What: Defines login methods
  // Why: Users can login with email/password
  providers: [
    CredentialsProvider({
      name: 'credentials',
      
      // ============================================
      // CREDENTIALS DEFINITION
      // ============================================
      // What: Defines what fields the login form needs
      credentials: {
        email: { 
          label: 'Email', 
          type: 'email' 
        },
        password: { 
          label: 'Password', 
          type: 'password' 
        }
      },

      // ============================================
      // AUTHORIZE FUNCTION
      // ============================================
      // What: Validates user credentials
      // Why: Checks if email/password match database
      async authorize(credentials) {
        // Check if credentials were provided
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials')
        }

        // ============================================
        // FIND USER IN DATABASE
        // ============================================
        // What: Query database for user with this email
        // Why: Need to get user to verify password
        const user = await prisma.user.findUnique({
          where: { 
            email: credentials.email 
          }
        })

        // Check if user exists
        if (!user || !user.password) {
          throw new Error('Invalid credentials')
        }

        // ============================================
        // VERIFY PASSWORD
        // ============================================
        // What: Compare entered password with stored hash
        // Why: Passwords are hashed in database
        // How: bcrypt.compare() securely compares passwords
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        )

        // Check if password is correct
        if (!isCorrectPassword) {
          throw new Error('Invalid credentials')
        }

        // ============================================
        // RETURN USER OBJECT
        // ============================================
        // What: Return user data to NextAuth
        // Why: NextAuth creates session with this data
        return {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      }
    })
  ],

  // ============================================
  // SESSION CONFIGURATION
  // ============================================
  // What: How sessions are stored
  // Why: JWT is simpler than database sessions
  session: {
    strategy: 'jwt',
  },

  // ============================================
  // CUSTOM PAGES
  // ============================================
  // What: Custom login/register pages
  // Why: Use our own UI instead of default
  pages: {
    signIn: '/login',
  },

  // ============================================
  // SECRET KEY
  // ============================================
  // What: Secret for signing JWT tokens
  // Why: Security - tokens are cryptographically signed
  secret: process.env.NEXTAUTH_SECRET,
}