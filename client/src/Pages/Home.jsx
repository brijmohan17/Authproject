import React from 'react';
import { Shield, Lock, Users, Zap, CheckCircle, ArrowRight } from 'lucide-react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
// Mock Navbar component for demo


export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <Navbar />

      {/* Hero Section */}
      <div className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur-lg opacity-30 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-full">
                  <Shield className="h-12 w-12 text-white" />
                </div>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6 leading-tight">
              Next-Gen
              <br />
              Authentication
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Secure, seamless, and lightning-fast authentication that scales with your business. 
              Built for the modern web.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button
                className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
                onClick={() => navigate('/register')}
              >
                <span>Start Free Trial</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full font-semibold text-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
                onClick={() => navigate('/username')}
              >
                View Demo
              </button>
            </div>

            {/* Quote Section */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 rounded-2xl blur-xl"></div>
              <div className="relative bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 max-w-2xl mx-auto shadow-xl">
                <div className="text-3xl text-blue-600 mb-4">"</div>
                <blockquote className="text-lg md:text-xl text-gray-700 italic leading-relaxed">
                  Security is not a product, but a process. It's about creating systems that adapt, 
                  evolve, and protect what matters most.
                </blockquote>
                <div className="mt-6 flex items-center justify-center">
                  <div className="text-sm text-gray-500">
                    <strong>Bruce Schneier</strong> - Cryptographer & Security Technologist
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built with enterprise-grade security and developer-friendly APIs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Lock className="h-8 w-8" />,
                title: "Bank-Grade Security",
                description: "Multi-factor authentication, end-to-end encryption, and compliance with SOC 2 Type II standards."
              },
              {
                icon: <Zap className="h-8 w-8" />,
                title: "Lightning Fast",
                description: "Sub-100ms response times globally with our distributed infrastructure and smart caching."
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Scale Effortlessly",
                description: "From startup to enterprise, handle millions of users without breaking a sweat."
              }
            ].map((feature, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 hover:border-blue-300 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  <div className="text-blue-600 mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-center leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "99.9%", label: "Uptime" },
              { number: "10M+", label: "Users Protected" },
              { number: "50ms", label: "Avg Response Time" },
              { number: "24/7", label: "Support" }
            ].map((stat, index) => (
              <div key={index} className="text-white">
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-3xl"></div>
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Secure Your Application?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of developers who trust our platform to protect their users.
              </p>
              <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Get Started Today
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}