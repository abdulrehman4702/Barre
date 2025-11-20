import { FileText } from 'lucide-react';

export function Terms() {
  return (
    <div className="min-h-screen bg-white py-6">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-blue rounded-full mb-6">
              <FileText className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-gray-600">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none space-y-4">
            <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using BarreBooking, you accept and agree to be bound by the terms and provision of this agreement.
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Use License</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Permission is granted to temporarily use BarreBooking for personal, non-commercial transitory viewing only.
                This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on BarreBooking</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Booking Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                When booking a space through BarreBooking:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>You agree to pay the total amount displayed at checkout</li>
                <li>Cancellation policies are set by individual studio owners</li>
                <li>Refunds are processed according to the studio's cancellation policy</li>
                <li>Service fees (2.9% + €0.30) are non-refundable for customer cancellations</li>
                <li>You must arrive on time and respect the studio's rules</li>
              </ul>
            </section>

            <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Studio Owner Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                As a studio owner on BarreBooking:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>You must provide accurate information about your studio and rooms</li>
                <li>You agree to receive 90% of booking amounts (10% platform commission)</li>
                <li>You must maintain availability calendars accurately</li>
                <li>You are responsible for honoring confirmed bookings</li>
                <li>Payouts are processed weekly to your connected Stripe account</li>
              </ul>
            </section>

            <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Payment Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                All payments are processed securely through Stripe. BarreBooking charges a 10% commission on bookings
                and a service fee of 2.9% + €0.30 paid by the renter. All prices are displayed in EUR and include VAT
                where applicable.
              </p>
            </section>

            <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                In no event shall BarreBooking or its suppliers be liable for any damages (including, without limitation,
                damages for loss of data or profit, or due to business interruption) arising out of the use or inability
                to use the materials on BarreBooking, even if BarreBooking or a BarreBooking authorized representative
                has been notified orally or in writing of the possibility of such damage.
              </p>
            </section>

            <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at{' '}
                <a href="mailto:legal@barrebooking.com" className="text-brand-blue hover:text-brand-blue-dark">
                  legal@barrebooking.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

