import React from 'react';
import Footer from '@/components/Footer';
import Head from 'next/head';

export default function SecurityPage() {
  return (
    <div className="flex flex-col min-h-screen items-stretch font-sans bg-gray-50 dark:bg-black">
      <Head>
        <title>Security Policy - AGENTS.md</title>
      </Head>
      <main className="flex-grow container mx-auto px-6 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Security Policy</h1>
        
        <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Supported Versions</h2>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
                Use this section to tell people about which versions of your project are
                currently being supported with security updates.
            </p>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-gray-700">
                            <th className="py-2 px-4 border-b text-left text-gray-700 dark:text-gray-200">Version</th>
                            <th className="py-2 px-4 border-b text-left text-gray-700 dark:text-gray-200">Supported</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b dark:border-gray-700">
                            <td className="py-2 px-4 text-gray-700 dark:text-gray-300">1.0.x</td>
                            <td className="py-2 px-4 text-green-600 font-bold">✓</td>
                        </tr>
                        <tr>
                            <td className="py-2 px-4 text-gray-700 dark:text-gray-300">&lt; 1.0</td>
                            <td className="py-2 px-4 text-red-600 font-bold">✗</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Reporting a Vulnerability</h2>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
                We take the security of our software seriously. If you believe you have found a security vulnerability in this project, please report it to us as described below.
            </p>
            
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Disclosure Policy</h3>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
                Please do not report security vulnerabilities through public GitHub issues.
            </p>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
                Instead, please send an email to <a href="mailto:security@your-domain.com" className="text-blue-600 dark:text-blue-400 hover:underline">security@your-domain.com</a>.
            </p>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
                You should expect to receive a response within 24 hours. If for some reason you do not, please follow up with us to ensure we received your original message.
            </p>
        </section>

        <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Enterprise Security Features</h2>
            <p className="mb-4 text-gray-600 dark:text-gray-300">This project adheres to the following enterprise security standards:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                <li><strong>Data Encryption</strong>: All sensitive data is encrypted at rest and in transit using industry-standard protocols (TLS 1.2+).</li>
                <li><strong>Access Control</strong>: strict Role-Based Access Control (RBAC) is enforced.</li>
                <li><strong>Audit Logging</strong>: All critical actions are logged for audit purposes.</li>
                <li><strong>Regular Audits</strong>: We conduct regular security audits and penetration testing.</li>
                <li><strong>Compliance</strong>: We strive to comply with SOC 2 Type II and GDPR requirements.</li>
            </ul>
        </section>
        
        <section className="mb-12">
             <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Best Practices for Users</h2>
             <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                <li>Keep your dependencies up to date.</li>
                <li>Use strong, unique passwords and enable 2FA where available.</li>
                <li>Review access logs regularly.</li>
             </ul>
        </section>

      </main>
      <Footer />
    </div>
  );
}
