import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Users, 
  Brain, 
  Sparkles,
  ArrowRight,
  Heart,
  Star,
  MessageCircle,
  Shield,
  BarChart,
  CheckCircle2,
  TrendingUp,
  Smile,
  PenTool,
  Award,
  LineChart
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Top Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-2xl font-bold text-purple-600">
              Kokoro Quest
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/science" className="text-gray-600 hover:text-purple-600 transition-colors">
                Our Science
              </Link>
              <Link to="/use-cases" className="text-gray-600 hover:text-purple-600 transition-colors">
                Success Stories
              </Link>
              <Link to="/pricing" className="text-gray-600 hover:text-purple-600 transition-colors">
                Pricing
              </Link>
              <Link to="/contact" className="text-gray-600 hover:text-purple-600 transition-colors">
                Contact
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
            {/* Mobile menu button */}
            <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile menu panel */}
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/science"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Our Science
            </Link>
            <Link
              to="/use-cases"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Success Stories
            </Link>
            <Link
              to="/pricing"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Pricing
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Contact
            </Link>
            <Link
              to="/register"
              className="block px-3 py-2 rounded-md text-base font-medium bg-purple-600 text-white hover:bg-purple-700"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6"
            >
              Welcome to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                Kokoro Quest
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 mb-8"
            >
              A fun and engaging way for kids to express emotions and learn through manga!
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-6 py-3 
                  border border-transparent text-base font-medium rounded-md 
                  text-white bg-purple-600 hover:bg-purple-700 transition-colors"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/demo"
                className="inline-flex items-center justify-center px-6 py-3 
                  border border-purple-200 text-base font-medium rounded-md 
                  text-purple-600 bg-white hover:bg-purple-50 transition-colors"
              >
                See a Demo
                <Sparkles className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Rest of the content remains exactly the same */}
      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: BookOpen,
              title: 'Interactive Learning',
              description: 'Learn through engaging manga stories and activities'
            },
            {
              icon: Brain,
              title: 'Emotional Intelligence',
              description: 'Develop understanding of emotions and empathy'
            },
            {
              icon: Sparkles,
              title: 'AR Experience',
              description: 'Bring emotions to life with augmented reality'
            },
            {
              icon: Users,
              title: 'Parent & Teacher Tools',
              description: 'Track progress and support emotional growth'
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md 
                transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center 
                justify-center mb-4">
                <feature.icon className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Transformation Section */}
      <div className="bg-gradient-to-b from-white to-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-gray-900 mb-4"
            >
              Transforming Education with Kokoro Quest
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600"
            >
              See How Kokoro Quest Empowers Students and Enhances Learning Outcomes
            </motion.p>
          </div>

          {/* User Flow */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Smile,
                title: 'Student Engagement',
                steps: [
                  'Daily mood check-in with AI companion',
                  'Personalized SEL activities',
                  'Interactive journaling and manga creation'
                ]
              },
              {
                icon: BookOpen,
                title: 'Teacher Involvement',
                steps: [
                  'Real-time analytics dashboard',
                  'Progress monitoring tools',
                  'Customizable content alignment'
                ]
              },
              {
                icon: Heart,
                title: 'Parent Participation',
                steps: [
                  'Regular progress updates',
                  'Access to child\'s manga stories',
                  'Collaborative home activities'
                ]
              }
            ].map((flow, index) => (
              <motion.div
                key={flow.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center 
                  justify-center mb-4">
                  <flow.icon className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {flow.title}
                </h3>
                <ul className="space-y-3">
                  {flow.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{step}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Research Insights */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Research-Backed Results
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: TrendingUp,
                  stat: '11%',
                  title: 'Academic Achievement',
                  description: 'Gain in academic performance through SEL integration'
                },
                {
                  icon: Brain,
                  stat: '45%',
                  title: 'Emotional Regulation',
                  description: 'Reduction in anxiety symptoms with CBT techniques'
                },
                {
                  icon: Star,
                  stat: '87%',
                  title: 'Student Engagement',
                  description: 'Increase in classroom participation and motivation'
                }
              ].map((insight, index) => (
                <motion.div
                  key={insight.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center 
                    justify-center mx-auto mb-4">
                    <insight.icon className="w-8 h-8 text-purple-600" />
                  </div>
                  <div className="text-4xl font-bold text-purple-600 mb-2">
                    {insight.stat}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {insight.title}
                  </h4>
                  <p className="text-gray-600">
                    {insight.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Research Citations */}
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-8">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                Backed by Academic Research
              </h3>
              <div className="space-y-6">
                {[
                  {
                    citation: 'Durlak et al. (2011)',
                    finding: 'Students in SEL programs showed significant improvements in academic achievement and emotional intelligence.'
                  },
                  {
                    citation: 'Weisz et al. (2006)',
                    finding: 'CBT interventions effectively reduce anxiety and depression symptoms in children and adolescents.'
                  },
                  {
                    citation: 'Henderson & Mapp (2002)',
                    finding: 'Strong parent involvement significantly increases student success and overall development.'
                  }
                ].map((research, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-4 bg-white/50 rounded-lg p-4"
                  >
                    <Award className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">{research.citation}</p>
                      <p className="text-gray-600">{research.finding}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Educational Environment?
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/demo"
                className="inline-flex items-center justify-center px-6 py-3 
                  text-base font-medium rounded-md text-white bg-purple-600 
                  hover:bg-purple-700 transition-colors"
              >
                See a Demo
                <MessageCircle className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-6 py-3 
                  text-base font-medium rounded-md text-purple-600 bg-white 
                  hover:bg-purple-50 transition-colors"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/features" className="text-gray-600 hover:text-purple-600">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="text-gray-600 hover:text-purple-600">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-gray-600 hover:text-purple-600">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-600 hover:text-purple-600">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/privacy" className="text-gray-600 hover:text-purple-600">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-gray-600 hover:text-purple-600">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a
                  href="https://line.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-600"
                >
                  <span className="sr-only">Line</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"></path>
                  </svg>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-600"
                >
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 Kokoro Quest. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}