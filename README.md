# 📅 Year Canvas Calendar

A modern, visual calendar application that works like a design canvas - not your typical calendar.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/react-18.2.0-blue.svg)
![TypeScript](https://img.shields.io/badge/typescript-5.2.2-blue.svg)

## ✨ Features

### Current (v1.0)
- ✅ Full year view (12 months)
- ✅ Navigate between years
- ✅ Two view modes: "Remaining Days" vs "Full Year"
- ✅ Zoom (50%-200%)
- ✅ Bilingual support (Hebrew/English)
- ✅ Day cells: 72×72px (120×120px in remaining mode)
- ✅ Visual indicator for current day
- ✅ Color picker with 24 predefined colors
- ✅ Click on any day to change its background color
- ✅ Sidebar with tools
- ✅ localStorage persistence
- ✅ Smooth animations (Apple-style design)

### Coming Soon
- ⏳ Add PNG/JPG images to days
- ⏳ Add text to days
- ⏳ Drag & drop objects within days
- ⏳ Daily micro-view with checklist
- ⏳ Export to PDF
- ⏳ Google Calendar sync

## 🎨 Design Philosophy

This calendar is designed to be:
- **Visual-first**: Like a design canvas, not a traditional planner
- **Minimalist**: Apple-inspired, clean interface
- **Smooth**: All interactions with fluid animations
- **Flexible**: Horizontal layout, one month per row

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/year-canvas-calendar.git
cd year-canvas-calendar

# Install dependencies
npm install

# Run development server
npm run dev

# Open browser at http://localhost:5173
```

### Build for Production

```bash
npm run build
npm run preview
```

## 🏗️ Project Structure

```
src/
├── App.tsx                          # Main app component
├── main.tsx                         # Entry point
├── index.css                        # Global styles + Tailwind
├── types/
│   └── calendar.ts                  # TypeScript types
├── store/
│   └── useCalendarStore.ts          # Zustand state management
├── utils/
│   ├── dateUtils.ts                 # Date helpers (date-fns)
│   ├── dataInit.ts                  # Data initialization
│   └── localStorage.ts              # Persistence
└── components/
    ├── layout/
    │   ├── TopBar.tsx               # Navigation, view modes, zoom
    │   └── Sidebar.tsx              # Tools: colors, images, text
    └── calendar/
        ├── YearView.tsx             # Container for entire year
        ├── MonthRow.tsx             # Horizontal month row
        └── DayCell.tsx              # Individual day cell
```

## 🎯 Usage

### Navigation
- Use arrow buttons or year selector to change years
- Toggle between "Remaining Days" and "Full Year" modes

### Coloring Days
1. Click on a color in the Sidebar (or use custom color picker)
2. Click on any day in the calendar
3. Color is applied and saved automatically ✅

### View Modes
- **Full Year**: See all 365 days
- **Remaining Days**: See only future days (larger cells, auto-layout)

### Zoom
- Use +/- buttons in TopBar
- Range: 50% to 200%

### Language
- Switch between English and Hebrew (RTL support)

## 🛠️ Tech Stack

- **React 18** + **TypeScript**
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **Zustand** - Lightweight state management
- **date-fns** - Modern date utilities
- **localStorage** - Data persistence

## 📊 Data Model

### YearData
```typescript
{
  year: 2025,
  months: [
    {
      monthIndex: 0,  // January
      year: 2025,
      days: [
        {
          date: "2025-01-01",
          backgroundColor: "#ffffff",
          objects: [],  // PNG/Text objects (coming soon)
          hasDayDetail: false
        }
      ]
    }
  ]
}
```

## 🔄 Roadmap

### Phase 1 (Current) ✅
- [x] Basic year view
- [x] Color picker
- [x] View modes
- [x] Persistence

### Phase 2 (In Progress)
- [ ] Add images to days
- [ ] Add text to days
- [ ] Drag & drop within cells

### Phase 3 (Planned)
- [ ] Daily checklist view
- [ ] Export to PDF
- [ ] Multi-select days
- [ ] Templates

### Phase 4 (Future)
- [ ] Google Calendar sync
- [ ] Collaboration
- [ ] Mobile app

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- Inspired by minimalist calendar designs
- Apple Design System for UI/UX inspiration
- Built with love for productivity enthusiasts

---

**Made with ❤️ by Elad**
