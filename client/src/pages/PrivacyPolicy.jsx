import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-gray-600 mb-8">We value your privacy. Learn how Cravings collects, uses, and protects your personal information.</p>
      <p className="text-sm text-gray-500 mb-8">Last updated: April 9, 2026</p>
      
      <p className="mb-8">This Privacy Policy describes how Cravings ("we", "us", or "our") collects, uses, and shares information about you when you use our website, mobile application, and related services. By using Cravings, you agree to the practices described in this policy.</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Account information:</strong> name, email address, phone number, and password when you register.</li>
          <li><strong>Profile data:</strong> delivery addresses, profile photos, and payment preferences.</li>
          <li><strong>Order history:</strong> restaurants visited, items ordered, and transaction records.</li>
          <li><strong>Device & usage data:</strong> IP address, browser type, pages visited, and timestamps.</li>
          <li><strong>Location data:</strong> GPS coordinates when you place an order or browse nearby restaurants.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>To process and fulfill your food orders and coordinate delivery.</li>
          <li>To personalise your experience and recommend relevant restaurants.</li>
          <li>To communicate order updates, promotions, and service announcements.</li>
          <li>To improve our platform through analytics and performance monitoring.</li>
          <li>To comply with legal obligations and resolve disputes.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Sharing Your Information</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>With partner restaurants to fulfill your orders.</li>
          <li>With delivery riders to complete your delivery.</li>
          <li>With payment processors to handle transactions securely.</li>
          <li>With analytics providers (anonymized or aggregated data only).</li>
          <li>With law enforcement when required by applicable law.</li>
          <li>We never sell your personal data to third parties for marketing purposes.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Cookies & Tracking</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>We use essential cookies to keep you logged in and maintain session state.</li>
          <li>Analytics cookies help us understand how users navigate the platform.</li>
          <li>You can disable non-essential cookies in your browser settings at any time.</li>
          <li>We use third-party services (e.g. Google Analytics) that may set their own cookies.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Data Retention</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>We retain your account data for as long as your account is active.</li>
          <li>Order history is retained for up to 5 years for legal and financial compliance.</li>
          <li>You may request deletion of your account and associated data at any time.</li>
          <li>Some data may be retained in anonymized form for analytics even after deletion.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Access:</strong> request a copy of the personal data we hold about you.</li>
          <li><strong>Correction:</strong> update or correct inaccurate information via your settings.</li>
          <li><strong>Deletion:</strong> request erasure of your personal data (subject to legal retention requirements).</li>
          <li><strong>Portability:</strong> receive your data in a structured, machine-readable format.</li>
          <li><strong>Objection:</strong> opt out of marketing communications at any time.</li>
        </ul>
      </section>

      <section className="mt-12 p-6 bg-gray-50 rounded-lg text-gray-800">
        <h3 className="text-xl font-semibold mb-2">Questions about your privacy?</h3>
        <p>Reach out to our Data Protection team and we'll respond within 2 business days.</p>
        <p className="mt-2"><strong>Email:</strong> contact@cravings.com</p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
