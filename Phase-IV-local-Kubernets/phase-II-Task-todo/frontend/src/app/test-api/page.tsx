'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ApiTestPage() {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testAPI = async () => {
    setLoading(true);
    try {
      // Test registration
      const response = await fetch('http://localhost:8000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'password123'
        }),
      });
      
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">API Test Page</h1>
        
        <button
          onClick={testAPI}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg mb-8"
        >
          {loading ? 'Testing...' : 'Test API'}
        </button>
        
        {result && (
          <div className="bg-slate-900 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">API Response:</h3>
            <pre className="text-green-400 whitespace-pre-wrap">{result}</pre>
          </div>
        )}
        
        <div className="mt-8">
          <Link href="/auth/register" className="text-blue-400 hover:text-blue-300">
            ← Back to Registration
          </Link>
        </div>
      </div>
    </div>
  );
}