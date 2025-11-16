import React from 'react';
import { useCalendarStore } from '../../store/useCalendarStore';

export const TopBar: React.FC = () => {
  const { 
    currentYear, 
    viewMode, 
    zoom,
    language,
    setYear, 
    setViewMode,
    setZoom,
    setLanguage 
  } = useCalendarStore();

  const handlePrevYear = () => setYear(currentYear - 1);
  const handleNextYear = () => setYear(currentYear + 1);
  const handleZoomIn = () => setZoom(zoom + 0.1);
  const handleZoomOut = () => setZoom(zoom - 0.1);
  const toggleLanguage = () => setLanguage(language === 'en' ? 'he' : 'en');

  const labels = {
    en: {
      remaining: 'Remaining',
      fullYear: 'Full Year',
      zoomIn: 'Zoom In',
      zoomOut: 'Zoom Out',
      language: 'עב',
    },
    he: {
      remaining: 'נותרו',
      fullYear: 'שנה מלאה',
      zoomIn: 'התקרב',
      zoomOut: 'התרחק',
      language: 'EN',
    },
  };

  const t = labels[language];

  return (
    <div className="backdrop-blur-xl bg-white/80 border-b border-gray-200/50 px-8 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-[2000px] mx-auto">
        {/* Year Navigation */}
        <div className="flex items-center gap-6">
          <button
            onClick={handlePrevYear}
            className="p-2.5 hover:bg-gray-100/80 rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
            aria-label="Previous year"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {currentYear}
          </div>
          
          <button
            onClick={handleNextYear}
            className="p-2.5 hover:bg-gray-100/80 rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
            aria-label="Next year"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* View Mode Toggle - Apple Style Segmented Control */}
        <div className="flex items-center gap-1 bg-gray-100/80 rounded-full p-1 backdrop-blur-sm">
          <button
            onClick={() => setViewMode('remaining')}
            className={`
              px-6 py-2 rounded-full font-medium text-sm
              transition-all duration-300 ease-out
              ${viewMode === 'remaining'
                ? 'bg-white text-gray-900 shadow-lg scale-105'
                : 'text-gray-600 hover:text-gray-900'
              }
            `}
          >
            {t.remaining}
          </button>
          <button
            onClick={() => setViewMode('fullYear')}
            className={`
              px-6 py-2 rounded-full font-medium text-sm
              transition-all duration-300 ease-out
              ${viewMode === 'fullYear'
                ? 'bg-white text-gray-900 shadow-lg scale-105'
                : 'text-gray-600 hover:text-gray-900'
              }
            `}
          >
            {t.fullYear}
          </button>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          {/* Zoom */}
          <div className="flex items-center gap-2 bg-gray-100/80 rounded-full px-3 py-1.5 backdrop-blur-sm">
            <button
              onClick={handleZoomOut}
              disabled={zoom <= 0.5}
              className="p-1.5 hover:bg-white/80 rounded-full transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110 active:scale-95"
              aria-label={t.zoomOut}
            >
              <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
              </svg>
            </button>
            
            <span className="text-sm text-gray-700 font-semibold min-w-[3rem] text-center tabular-nums">
              {Math.round(zoom * 100)}%
            </span>
            
            <button
              onClick={handleZoomIn}
              disabled={zoom >= 2.0}
              className="p-1.5 hover:bg-white/80 rounded-full transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110 active:scale-95"
              aria-label={t.zoomIn}
            >
              <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100/80 hover:bg-white/80 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 backdrop-blur-sm"
          >
            {t.language}
          </button>
        </div>
      </div>
    </div>
  );
};
