'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, LogOut, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#review', label: 'Review' },
  { href: '#contact', label: 'Contact' },
  { href: '#subscription', label: 'Subscription' },
  { href: '/menu', label: 'Menu' },
];

export function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('');

  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash || pathname);
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [pathname]);

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="flex w-full max-w-6xl items-center justify-between rounded-full bg-white/95 backdrop-blur-md border border-orange-200/50 px-6 py-4 shadow-xl shadow-orange-500/10">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-[#fb9333] to-orange-600 p-2 rounded-lg">
              <span className="text-white font-bold text-lg">SEA</span>
            </div>
            <h1 className="font-bold text-xl text-gray-900 hidden sm:block">
              Catering
            </h1>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-base font-semibold transition-all duration-300 hover:text-[#fb9333] group ${
                  isActive ? 'text-[#fb9333]' : 'text-gray-700'
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#fb9333] to-orange-600 transition-all duration-300 group-hover:w-full ${
                  isActive ? 'w-full' : ''
                }`}></span>
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-gray-700" />
          ) : (
            <Menu className="h-6 w-6 text-gray-700" />
          )}
        </button>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {status === 'loading' && (
            <div className="h-10 w-24 animate-pulse rounded-lg bg-gray-200"></div>
          )}
          
          {status === 'unauthenticated' && (
            <Link href="/auth/signin">
              <Button className="rounded-lg bg-gradient-to-r from-[#fb9333] to-orange-600 hover:from-orange-600 hover:to-[#fb9333] text-white font-semibold px-6 py-2 shadow-lg shadow-orange-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/30 hover:scale-105">
                Sign In
              </Button>
            </Link>
          )}
          
          {status === 'authenticated' && (
            <div className="flex items-center gap-2">
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg text-gray-700 hover:bg-orange-50 hover:text-[#fb9333] transition-all duration-300"
                >
                  <LayoutDashboard className="h-5 w-5" />
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-300"
                onClick={() => {
                  if (confirm('Are you sure you want to log out?')) {
                    signOut();
                  }
                }}
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-20 left-4 right-4 md:hidden">
          <div className="bg-white/95 backdrop-blur-md border border-orange-200/50 rounded-2xl shadow-xl shadow-orange-500/10 p-6">
            {/* Mobile Navigation Links */}
            <div className="flex flex-col gap-4 mb-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-base font-semibold py-2 px-3 rounded-lg transition-all duration-300 ${
                      isActive 
                        ? 'text-[#fb9333] bg-orange-50' 
                        : 'text-gray-700 hover:text-[#fb9333] hover:bg-orange-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Auth Buttons */}
            <div className="border-t border-gray-200 pt-4">
              {status === 'loading' && (
                <div className="h-10 w-full animate-pulse rounded-lg bg-gray-200"></div>
              )}
              
              {status === 'unauthenticated' && (
                <Link href="/auth/signin" className="block">
                  <Button className="w-full rounded-lg bg-gradient-to-r from-[#fb9333] to-orange-600 hover:from-orange-600 hover:to-[#fb9333] text-white font-semibold py-3 shadow-lg shadow-orange-500/25">
                    Sign In
                  </Button>
                </Link>
              )}
              
              {status === 'authenticated' && (
                <div className="flex gap-3">
                  <Link href="/dashboard" className="flex-1">
                    <Button
                      variant="outline"
                      className="w-full rounded-lg border-orange-200 text-[#fb9333] hover:bg-orange-50"
                    >
                      <LayoutDashboard className="h-4 w-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="rounded-lg border-red-200 text-red-600 hover:bg-red-50"
                    onClick={() => signOut()}
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}