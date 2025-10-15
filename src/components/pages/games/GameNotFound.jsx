import { Search, Home, Users, ArrowLeft, RefreshCw } from 'lucide-react';

const GameNotFound = () => {
  const handleGoBack = () => window.history.back();
  const handleGoHome = () => window.location.href = '/dashboard';
  const handleRefresh = () => window.location.reload();

  return (
    <div className=" flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-lg border border-gray-200 p-8 md:p-12">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
          </div>

          {/* Main Message */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Game Not Found
            </h1>
            <p className="text-gray-600">
              We couldn't locate the game you're looking for. The game may have been removed, or the ID might be incorrect.
            </p>
          </div>

          {/* Suggestions */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-sm font-medium text-gray-900 mb-3">
              Suggestions:
            </h2>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="text-gray-400 mr-2">•</span>
                <span>Double-check the game ID or search parameters</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-2">•</span>
                <span>Verify that the game hasn't been deactivated or removed</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-2">•</span>
                <span>Try searching from the game directory. Click <span onClick={() => window.location.href = '/games'} className='font-bold cursor-pointer'>here</span> to view all games</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={handleGoBack}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Go Back</span>
            </button>
            
            <button
              onClick={handleGoHome}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span className="text-sm font-medium">Home</span>
            </button>
            
            <button
              onClick={handleRefresh}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="text-sm font-medium">Retry</span>
            </button>
          </div>

          {/* Additional Help */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              Need help?{' '}
              <a href="/support" className="text-gray-900 font-medium hover:underline">
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameNotFound;