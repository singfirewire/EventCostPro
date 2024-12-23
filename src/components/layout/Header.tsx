// src/components/layout/Header.tsx
import React from 'react';
import { Calculator } from 'lucide-react';

export const Header: React.FC = () => (
  <header className="bg-white shadow">
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Calculator className="h-8 w-8 text-blue-600" />
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">EventCostPro</h1>
          <p className="text-sm text-gray-500">Version 1.0.0</p>
        </div>
      </div>
    </div>
  </header>
);

// src/components/layout/Footer.tsx
export const Footer: React.FC = () => (
  <footer className="bg-white border-t mt-auto">
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
      <p className="text-center text-sm text-gray-500">
        © {new Date().getFullYear()} EventCostPro. All rights reserved.
      </p>
    </div>
  </footer>
);

// src/components/layout/Layout.tsx
interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-gray-50">
    <Header />
    <main className="flex-1 py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </main>
    <Footer />
  </div>
);
