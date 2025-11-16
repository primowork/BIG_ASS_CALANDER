# 🚀 How to Upload to GitHub

Follow these steps to upload this project to GitHub:

## Option 1: Using GitHub Desktop (Easiest)

### Step 1: Install GitHub Desktop
- Download from: https://desktop.github.com
- Install and sign in with your GitHub account

### Step 2: Create New Repository
1. Open GitHub Desktop
2. Click "File" → "Add Local Repository"
3. Click "Choose..." and select this `year-canvas-calendar` folder
4. Click "Create Repository" (it will detect it's not a git repo yet)
5. Name: `year-canvas-calendar`
6. Description: "Modern visual calendar application - Apple-style design"
7. Click "Create Repository"

### Step 3: Publish to GitHub
1. Click "Publish repository" button (top right)
2. Uncheck "Keep this code private" if you want it public
3. Click "Publish repository"

Done! ✅ Your code is now on GitHub!

---

## Option 2: Using Terminal (For Advanced Users)

### Step 1: Initialize Git
```bash
cd year-canvas-calendar
git init
git add .
git commit -m "Initial commit - Year Canvas Calendar v1.0"
```

### Step 2: Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `year-canvas-calendar`
3. Description: "Modern visual calendar application"
4. Public or Private (your choice)
5. Don't initialize with README (we already have one)
6. Click "Create repository"

### Step 3: Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/year-canvas-calendar.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

---

## Option 3: Upload Files Directly on GitHub.com

### Step 1: Create Repository
1. Go to https://github.com/new
2. Name: `year-canvas-calendar`
3. Click "Create repository"

### Step 2: Upload Files
1. Click "uploading an existing file"
2. Drag and drop ALL files from the `year-canvas-calendar` folder
3. Commit message: "Initial commit"
4. Click "Commit changes"

⚠️ **Note**: This method doesn't support folders well. Better to use GitHub Desktop or Terminal.

---

## After Upload - Enable GitHub Pages (Optional)

To host your calendar online for free:

1. Go to your repository on GitHub
2. Click "Settings"
3. Click "Pages" (in the left sidebar)
4. Source: Select "GitHub Actions"
5. Create new file: `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18
          
      - name: Install dependencies
        run: npm install
        
      - name: Build
        run: npm run build
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: ./dist
          
      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v2
```

Your app will be live at: `https://YOUR_USERNAME.github.io/year-canvas-calendar/`

---

## Need Help?

- GitHub Desktop: https://docs.github.com/en/desktop
- Git Basics: https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control
- GitHub Pages: https://pages.github.com/

---

**Happy Coding! 🎉**
