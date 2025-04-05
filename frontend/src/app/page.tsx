"use client";
import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  const [form, setForm] = useState({
    name: '',
    intro: '',
    skills: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('http://127.0.0.1:8000/generate-pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'portfolio.pdf';
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Head>
        <title>AI Portfolio Generator</title>
      </Head>
      <main className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">AI Portfolio Generator</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" onChange={handleChange} value={form.name} className="w-full border p-2 rounded" placeholder="Name" />
          <textarea name="intro" onChange={handleChange} value={form.intro} className="w-full border p-2 rounded" placeholder="Introduction" rows={3} />
          <input name="skills" onChange={handleChange} value={form.skills} className="w-full border p-2 rounded" placeholder="Skills (e.g., Python, React)" />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Generate PDF</button>
        </form>
      </main>
    </div>
  );
}
