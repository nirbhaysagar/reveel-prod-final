'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
// Removed unused Card components
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            })

            if (result?.error) {
                setError('Invalid email or password')
            } else {
                router.push('/dashboard')
            }
        } catch (err) {
            setError('Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        // 1. This is now the main grid container, taking full height
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">

            {/* 2. Left Side - Branding (This is the first column) */}
            <div className="hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 p-12 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10">
                    <div className="text-center space-y-8">
                        <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm mx-auto">
                            <span className="text-3xl">🚀</span>
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                Welcome Back
                            </h1>
                            <p className="text-lg text-white/90 max-w-md mx-auto">
                                Continue your competitive intelligence journey with Reveel
                            </p>
                        </div>
                        <div className="space-y-4 text-left max-w-sm mx-auto">
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                <span>Track unlimited competitors</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                <span>Get AI-powered insights</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                <span>Real-time change detection</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Right Side - Login Form (This is the second column) */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6 md:p-8 lg:p-12 overflow-y-auto">
                <div className="w-full max-w-md mx-auto">
                    {/* This is the white card containing the form */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 lg:p-10">
                        {/* Header */}
                        <div className="text-center space-y-2 mb-8">
                            <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-6">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Home
                            </Link>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                Sign In
                            </h2>
                            <p className="text-base md:text-lg text-gray-600">
                                Welcome back! Please sign in to your account
                            </p>
                        </div>

                        {/* Login Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email Field */}
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-base font-semibold text-gray-700">
                                    Email Address
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="pl-10 h-14 md:h-12 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-base font-semibold text-gray-700">
                                    Password
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        disabled={loading}
                                        className="pl-10 pr-10 h-14 md:h-12 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                    <span className="text-sm text-gray-600">Remember me</span>
                                </label>
                                <Link href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                                    Forgot password?
                                </Link>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                    <p className="text-sm text-red-600">{error}</p>
                                </div>
                            )}

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
                                disabled={loading}
                            >
                                {loading ? (
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Signing in...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-2">
                                        <span>Sign In</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                )}
                            </Button>
                        </form>


                        {/* Footer */}
                        <div className="text-center mt-8">
                            <p className="text-gray-600">
                                Don't have an account?{' '}
                                <Link href="/register" className="text-blue-600 hover:text-blue-700 font-semibold">
                                    Sign up for free
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}