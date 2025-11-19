import { useState } from 'react';
import { HelpCircle, Search, ChevronDown, ChevronUp, Mail, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'renter' | 'owner' | 'general';
}

const faqs: FAQ[] = [
  {
    id: '1',
    question: 'How do I book a space?',
    answer: 'Search for available spaces using the search bar, select your date and time, choose between individual or group booking, and complete the payment. You\'ll receive a confirmation email with all details.',
    category: 'renter',
  },
  {
    id: '2',
    question: 'What is the cancellation policy?',
    answer: 'Cancellation policies vary by studio. Flexible: Cancel up to 24 hours before for full refund. Standard: Cancel up to 48 hours for full refund, 48-12 hours for 50% refund. Strict: Cancel up to 7 days for 50% refund.',
    category: 'renter',
  },
  {
    id: '3',
    question: 'How do I list my studio?',
    answer: 'Sign up as an owner, complete your profile, connect your Stripe account for payouts, and add your studio with photos, pricing, and availability. Once approved, your studio will be live on the platform.',
    category: 'owner',
  },
  {
    id: '4',
    question: 'When do I receive payouts?',
    answer: 'Payouts are processed weekly. You\'ll receive 90% of the booking amount (10% platform commission). Payments are transferred to your connected Stripe account every Monday.',
    category: 'owner',
  },
  {
    id: '5',
    question: 'What payment methods are accepted?',
    answer: 'We accept all major credit cards, debit cards, and digital wallets through Stripe. All payments are secure and encrypted.',
    category: 'general',
  },
  {
    id: '6',
    question: 'How do I contact support?',
    answer: 'You can reach our support team through the contact page, email us directly, or use the chat feature on the website. We typically respond within 24 hours.',
    category: 'general',
  },
];

export function Help() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'renter' | 'owner' | 'general'>('all');
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white py-6">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#FF385C] rounded-full mb-6">
            <HelpCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions or contact our support team
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for help..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:border-transparent text-lg"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center gap-3 mb-6 flex-wrap">
          {(['all', 'renter', 'owner', 'general'] as const).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-[#FF385C] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* FAQs */}
        <div className="max-w-4xl mx-auto space-y-3 mb-8">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No results found</p>
            </div>
          ) : (
            filteredFAQs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900 text-left pr-4">{faq.question}</h3>
                  {openFAQ === faq.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openFAQ === faq.id && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Contact Support */}
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#FF385C] to-[#E61E4D] rounded-2xl p-8 text-white">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Still need help?</h2>
            <p className="text-white/90">Our support team is here to assist you</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#FF385C] rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>Contact Us</span>
            </Link>
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors border border-white/20">
              <MessageCircle className="w-5 h-5" />
              <span>Live Chat</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

