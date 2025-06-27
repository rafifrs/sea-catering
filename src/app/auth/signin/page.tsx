import SignInCard from "./components/signincard";

export default function Page() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Main content */}
      <div className="z-10 w-full max-w-md px-4">
        {/* Logo/Brand section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-400 rounded-full mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">SEA Catering</h1>
          <p className="text-gray-600">Start your healthy living journey</p>
        </div>
        
        <SignInCard />
        
        {/* Additional links */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Doesn't have an account?{' '}
            <a href="/auth/register" className="font-medium text-orange-400 hover:text-orange-500 transition-colors">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}