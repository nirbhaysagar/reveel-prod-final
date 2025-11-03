// ============================================
// USER REGISTRATION API ROUTE
// ============================================
// Purpose: Handle user registration requests
// Why: Create new user accounts with hashed passwords
// Framework: Next.js API Route

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { validateEmail, validatePassword, sanitizeString } from '@/lib/validation'

export async function POST(request: NextRequest) {
  try {
    // ============================================
    // EXTRACT REQUEST DATA
    // ============================================
    const { name, email, password } = await request.json()

    // ============================================
    // VALIDATION
    // ============================================
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Validate email format
    const emailValidation = validateEmail(email)
    if (!emailValidation.valid) {
      return NextResponse.json(
        { error: emailValidation.error },
        { status: 400 }
      )
    }
    
    // Validate password strength
    const passwordValidation = validatePassword(password)
    if (!passwordValidation.valid) {
      return NextResponse.json(
        { error: passwordValidation.error },
        { status: 400 }
      )
    }
    
    // Validate name length
    if (name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      )
    }
    
    if (name.length > 100) {
      return NextResponse.json(
        { error: 'Name too long (max 100 characters)' },
        { status: 400 }
      )
    }

    // ============================================
    // CHECK IF USER EXISTS
    // ============================================
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      )
    }

    // ============================================
    // HASH PASSWORD
    // ============================================
    const hashedPassword = await bcrypt.hash(password, 10)

    // ============================================
    // SANITIZE INPUTS
    // ============================================
    const sanitizedName = sanitizeString(name, 100)
    const sanitizedEmail = email.trim().toLowerCase()

    // ============================================
    // CREATE USER
    // ============================================
    const user = await prisma.user.create({
      data: {
        name: sanitizedName,
        email: sanitizedEmail,
        password: hashedPassword
      }
    })

    // ============================================
    // SUCCESS RESPONSE
    // ============================================
    return NextResponse.json(
      { success: true, user: { id: user.id, name: user.name, email: user.email } },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
