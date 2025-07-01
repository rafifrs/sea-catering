'use client';

export function CTAButtons() {
  const handleGetStartedButton = () => {
    window.location.href = '/auth/signin';
  };

  const handleViewMenuButton = () => {
    window.location.href = '/meal-plans';
  };

  return (
    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
      <button 
        onClick={handleGetStartedButton}
        className="bg-orange-400 hover:bg-orange-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
        Get Started Today
      </button>
      <button 
        onClick={handleViewMenuButton}
        className="border-2 border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white font-semibold py-3 px-8 rounded-full transition-all duration-300">
        View Menu
      </button>
    </div>
  );
}
