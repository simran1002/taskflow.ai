import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Sparkles, Shield, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              TaskFlow AI
            </h1>
            <div className="flex gap-4">
              <Button variant="outline">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button>
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Intelligent Task Management
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Powered by AI
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Organize your work, boost productivity, and let AI help you prioritize tasks
            intelligently.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg">
              <Link href="/register">Start Free</Link>
            </Button>
            <Button size="lg" variant="outline">
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card>
            <CardHeader>
              <Sparkles className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle>AI-Powered</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Get intelligent task suggestions and automatic priority prediction using advanced AI.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="h-8 w-8 text-yellow-600 mb-2" />
              <CardTitle>Lightning Fast</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Built with Next.js 16 for optimal performance and seamless user experience.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-8 w-8 text-green-600 mb-2" />
              <CardTitle>Secure & Private</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Your data is protected with industry-standard security and authentication.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CheckCircle2 className="h-8 w-8 text-purple-600 mb-2" />
              <CardTitle>Full Control</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Complete CRUD operations with filtering, sorting, and status management.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
          <CardHeader>
            <CardTitle className="text-3xl text-white">Ready to boost your productivity?</CardTitle>
            <CardDescription className="text-blue-100">
              Join thousands of users managing their tasks efficiently with TaskFlow AI.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="lg" variant="secondary">
              <Link href="/register">Get Started Now</Link>
            </Button>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600">
              <p className="font-semibold text-gray-900">TaskFlow AI</p>
              <p>Built with Next.js 16, TypeScript, MongoDB, and AI</p>
            </div>
            <div className="text-sm text-gray-600 text-center md:text-right">
              <p className="font-semibold text-gray-900">Developer Information</p>
              <p>
                <span className="font-medium">Name:</span> [Your Name]
              </p>
              <p>
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  GitHub Profile
                </a>
                {' | '}
                <a
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  LinkedIn Profile
                </a>
              </p>
              <p className="mt-1">Full-Stack Developer Assignment - House of Edtech</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
