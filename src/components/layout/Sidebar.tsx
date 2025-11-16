import React, { useState } from 'react';
import { useCalendarStore } from '../../store/useCalendarStore';

export const Sidebar: React.FC = () => {
  const { language, activeTool, setActiveTool } = useCalendarStore();
  const [selectedColor, setSelectedColor] = useState('#ffffff');

  const labels = {
    en: {
      tools: 'Tools',
      select: 'Select',
      addImage: 'Add Image',
      addText: 'Add Text',
      backgroundColor: 'Background Color',
      exportPDF: 'Export PDF',
      clickToApply: 'Click on a day to apply',
      imageUploaded: 'Image uploaded! Click on a day to place it',
      clickToAddText: 'Click on a day to add text',
    },
    he: {
      tools: 'כלים',
      select: 'בחירה',
      addImage: 'הוסף תמונה',
      addText: 'הוסף טקסט',
      backgroundColor: 'צבע רקע',
      exportPDF: 'ייצא PDF',
      clickToApply: 'לחץ על יום להחלה',
      imageUploaded: 'תמונה הועלתה! לחץ על יום למיקום',
      clickToAddText: 'לחץ על יום להוספת טקסט',
    },
  };

  const t = labels[language];

  const predefinedColors = [
    '#ffffff', // White
    '#f3f4f6', // Gray
    '#dbeafe', // Blue
    '#bfdbfe',
    '#93c5fd',
    '#60a5fa',
    '#3b82f6',
    '#ddd6fe', // Purple
    '#c4b5fd',
    '#a78bfa',
    '#fce7f3', // Pink
    '#fbcfe8',
    '#f9a8d4',
    '#fef3c7', // Yellow
    '#fde68a',
    '#fcd34d',
    '#d1fae5', // Green
    '#a7f3d0',
    '#6ee7b7',
    '#fed7aa', // Orange
    '#fdba74',
    '#fb923c',
    '#fecaca', // Red
    '#fca5a5',
    '#f87171',
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match(/^image\/(png|jpeg|jpg)$/)) {
      alert('Please upload PNG or JPG images only');
      return;
    }

    // Convert to base64
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setActiveTool({
        type: 'image',
        data: { imageData: base64 }
      });
    };
    reader.readAsDataURL(file);
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setActiveTool({
      type: 'color',
      data: { color }
    });
  };

  const handleExportPDF = async () => {
    // TODO: Implement PDF export using html2canvas + jspdf
    alert('PDF export will be implemented in the next step');
  };

  return (
    <div className="w-80 bg-white/80 backdrop-blur-xl border-l border-gray-200/50 p-6 overflow-y-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {t.tools}
        </h2>
      </div>

      {/* Tools */}
      <div className="space-y-6">
        {/* Select Tool */}
        <button
          onClick={() => setActiveTool({ type: 'select' })}
          className={`
            w-full p-4 rounded-xl text-left transition-all duration-200
            ${activeTool.type === 'select' 
              ? 'bg-blue-500 text-white shadow-lg scale-105' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }
          `}
        >
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
            <span className="font-semibold">{t.select}</span>
          </div>
        </button>

        {/* Add Image */}
        <div>
          <label
            className={`
              w-full p-4 rounded-xl text-left transition-all duration-200 cursor-pointer block
              ${activeTool.type === 'image' 
                ? 'bg-blue-500 text-white shadow-lg scale-105' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }
            `}
          >
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="font-semibold">{t.addImage}</span>
            </div>
            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
          <p className="text-xs text-gray-500 mt-2 px-4">PNG, JPG supported</p>
        </div>

        {/* Add Text */}
        <button
          onClick={() => setActiveTool({ type: 'text' })}
          className={`
            w-full p-4 rounded-xl text-left transition-all duration-200
            ${activeTool.type === 'text' 
              ? 'bg-blue-500 text-white shadow-lg scale-105' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }
          `}
        >
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
            <span className="font-semibold">{t.addText}</span>
          </div>
        </button>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">{t.backgroundColor}</h3>
          
          {/* Color Grid */}
          <div className="grid grid-cols-5 gap-2">
            {predefinedColors.map((color) => (
              <button
                key={color}
                onClick={() => handleColorSelect(color)}
                className={`
                  w-12 h-12 rounded-lg transition-all duration-200
                  hover:scale-110 hover:shadow-lg
                  ${selectedColor === color && activeTool.type === 'color' ? 'ring-2 ring-blue-500 scale-110' : 'ring-1 ring-gray-200'}
                `}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>

          {/* Custom Color Picker */}
          <div className="mt-4">
            <label className="block text-xs font-medium text-gray-600 mb-2">Custom Color</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={selectedColor}
                onChange={(e) => handleColorSelect(e.target.value)}
                className="w-12 h-12 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={selectedColor}
                onChange={(e) => handleColorSelect(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono"
                placeholder="#ffffff"
              />
            </div>
          </div>
        </div>

        {/* Export PDF */}
        <div className="border-t border-gray-200 pt-6">
          <button
            onClick={handleExportPDF}
            className="w-full p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <div className="flex items-center justify-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>{t.exportPDF}</span>
            </div>
          </button>
        </div>
      </div>

      {/* Active Tool Indicator */}
      {activeTool.type !== 'select' && (
        <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <p className="text-sm text-blue-800">
            {activeTool.type === 'color' && `${t.clickToApply} ${activeTool.data?.color}`}
            {activeTool.type === 'image' && t.imageUploaded}
            {activeTool.type === 'text' && t.clickToAddText}
          </p>
        </div>
      )}
    </div>
  );
};
  const [selectedColor, setSelectedColor] = useState('#ffffff');
  const { language } = useCalendarStore();

  const labels = {
    en: {
      tools: 'Tools',
      select: 'Select',
      addImage: 'Add Image',
      addText: 'Add Text',
      backgroundColor: 'Background Color',
      exportPDF: 'Export PDF',
    },
    he: {
      tools: 'כלים',
      select: 'בחירה',
      addImage: 'הוסף תמונה',
      addText: 'הוסף טקסט',
      backgroundColor: 'צבע רקע',
      exportPDF: 'ייצא PDF',
    },
  };

  const t = labels[language];

  const predefinedColors = [
    '#ffffff', // White
    '#f3f4f6', // Gray
    '#dbeafe', // Blue
    '#bfdbfe',
    '#93c5fd',
    '#60a5fa',
    '#3b82f6',
    '#ddd6fe', // Purple
    '#c4b5fd',
    '#a78bfa',
    '#fce7f3', // Pink
    '#fbcfe8',
    '#f9a8d4',
    '#fef3c7', // Yellow
    '#fde68a',
    '#fcd34d',
    '#d1fae5', // Green
    '#a7f3d0',
    '#6ee7b7',
    '#fed7aa', // Orange
    '#fdba74',
    '#fb923c',
    '#fecaca', // Red
    '#fca5a5',
    '#f87171',
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match(/^image\/(png|jpeg|jpg)$/)) {
      alert('Please upload PNG or JPG images only');
      return;
    }

    // Convert to base64
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      // TODO: Store this and allow user to place it on a day
      console.log('Image uploaded:', base64.substring(0, 50) + '...');
      // For now, we'll implement the placement logic in the next step
    };
    reader.readAsDataURL(file);
  };

  const handleExportPDF = async () => {
    // TODO: Implement PDF export using html2canvas + jspdf
    alert('PDF export will be implemented in the next step');
  };

  return (
    <div className="w-80 bg-white/80 backdrop-blur-xl border-l border-gray-200/50 p-6 overflow-y-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {t.tools}
        </h2>
      </div>

      {/* Tools */}
      <div className="space-y-6">
        {/* Select Tool */}
        <button
          onClick={() => setActiveTool('select')}
          className={`
            w-full p-4 rounded-xl text-left transition-all duration-200
            ${activeTool === 'select' 
              ? 'bg-blue-500 text-white shadow-lg scale-105' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }
          `}
        >
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
            <span className="font-semibold">{t.select}</span>
          </div>
        </button>

        {/* Add Image */}
        <div>
          <label
            className={`
              w-full p-4 rounded-xl text-left transition-all duration-200 cursor-pointer block
              ${activeTool === 'image' 
                ? 'bg-blue-500 text-white shadow-lg scale-105' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }
            `}
          >
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="font-semibold">{t.addImage}</span>
            </div>
            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              onChange={handleImageUpload}
              className="hidden"
              onClick={() => setActiveTool('image')}
            />
          </label>
          <p className="text-xs text-gray-500 mt-2 px-4">PNG, JPG supported</p>
        </div>

        {/* Add Text */}
        <button
          onClick={() => setActiveTool('text')}
          className={`
            w-full p-4 rounded-xl text-left transition-all duration-200
            ${activeTool === 'text' 
              ? 'bg-blue-500 text-white shadow-lg scale-105' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }
          `}
        >
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
            <span className="font-semibold">{t.addText}</span>
          </div>
        </button>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">{t.backgroundColor}</h3>
          
          {/* Color Grid */}
          <div className="grid grid-cols-5 gap-2">
            {predefinedColors.map((color) => (
              <button
                key={color}
                onClick={() => {
                  setSelectedColor(color);
                  setActiveTool('color');
                }}
                className={`
                  w-12 h-12 rounded-lg transition-all duration-200
                  hover:scale-110 hover:shadow-lg
                  ${selectedColor === color ? 'ring-2 ring-blue-500 scale-110' : 'ring-1 ring-gray-200'}
                `}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>

          {/* Custom Color Picker */}
          <div className="mt-4">
            <label className="block text-xs font-medium text-gray-600 mb-2">Custom Color</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={selectedColor}
                onChange={(e) => {
                  setSelectedColor(e.target.value);
                  setActiveTool('color');
                }}
                className="w-12 h-12 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono"
                placeholder="#ffffff"
              />
            </div>
          </div>
        </div>

        {/* Export PDF */}
        <div className="border-t border-gray-200 pt-6">
          <button
            onClick={handleExportPDF}
            className="w-full p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <div className="flex items-center justify-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>{t.exportPDF}</span>
            </div>
          </button>
        </div>
      </div>

      {/* Active Tool Indicator */}
      {activeTool !== 'select' && (
        <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <p className="text-sm text-blue-800">
            {activeTool === 'color' && `Click on a day to apply ${selectedColor}`}
            {activeTool === 'image' && 'Image uploaded! Click on a day to place it'}
            {activeTool === 'text' && 'Click on a day to add text'}
          </p>
        </div>
      )}
    </div>
  );
};
