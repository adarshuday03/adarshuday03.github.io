# Quick Start Guide - Personal Portfolio Website

## ✅ What's Been Created

Your complete portfolio website is ready with 5 pages:

1. **index.html** - Home page with about section and updates
2. **resume.html** - Education, skills, and achievements  
3. **courses.html** - Academic coursework organized by semester
4. **experience.html** - Work experience, research, and projects
5. **contact.html** - Contact information and form

Plus all necessary assets (icons, CSS, etc.)

## 🚀 Next Steps (In Order)

### Step 1: Personalize Basic Information (5 minutes)

Open each HTML file and replace these placeholders:

- [ ] `Your Name` → Your actual name
- [ ] `your.email@example.com` → Your email address
- [ ] `Your University` → Your university name
- [ ] `Your Major` → Your degree/major
- [ ] Update phone number in contact.html
- [ ] Update location in contact.html

**Quick find & replace tip:** Use VS Code's "Find and Replace" (Ctrl+H) across all files!

### Step 2: Update Social Media Links (3 minutes)

Update these URLs in all pages (especially index.html and contact.html):

- [ ] LinkedIn: `https://linkedin.com/in/yourprofile`
- [ ] GitHub: `https://github.com/yourusername`
- [ ] Twitter: `https://twitter.com/yourusername`

### Step 3: Add Your Photo (2 minutes)

- [ ] Replace `images/profile-placeholder.svg` with your actual photo
  - Recommended size: 400x400 pixels
  - Format: JPG or PNG
  - Keep the same filename or update the src in index.html

### Step 4: Customize Content (20-30 minutes)

**index.html:**
- [ ] Write your "About Me" paragraphs
- [ ] Update the "Updates" section with your latest news
- [ ] Add your interests and research areas

**resume.html:**
- [ ] Add your actual education details
- [ ] List your programming languages and frameworks
- [ ] Add your achievements and awards
- [ ] Upload your CV PDF to the `files` folder

**courses.html:**
- [ ] Replace placeholder courses with your actual coursework
- [ ] Organize by your actual semesters
- [ ] Update course codes and descriptions

**experience.html:**
- [ ] Add your work experience and internships
- [ ] Include your projects with descriptions
- [ ] Add research experience if applicable

**contact.html:**
- [ ] Update contact information
- [ ] Configure the contact form (see README.md)

### Step 5: Upload and Publish (5 minutes)

```bash
# Add all files to git
git add .

# Commit your changes
git commit -m "Initial portfolio setup with personal information"

# Push to GitHub
git push origin main
```

Your site will be live at: **https://adarshuday03.github.io**

(It may take 2-3 minutes for GitHub Pages to build and deploy)

## 🎨 Customization Tips

### Change Colors

The site uses an **indigo** color scheme. To change:

1. Search for `indigo-500` in all HTML files
2. Replace with another Tailwind color like:
   - `blue-500` for blue
   - `purple-500` for purple
   - `green-500` for green
   - `rose-500` for rose/pink

### Add More Sections

You can add new sections by copying existing card structures. Each section follows this pattern:

```html
<div class="relative flex flex-col p-6 bg-gradient-to-tl from-slate-200 to-slate-50 text-black rounded-3xl shadow-md shadow-slate-400 border-[1px] border-slate-200">
  <h2 class="text-xl font-serif font-bold mb-4 border-b-2 border-indigo-400 pb-2">Section Title</h2>
  <!-- Your content here -->
</div>
```

### Update Footer

The footer appears on every page. Update it once, then copy to all pages:

```html
&copy; Your Name | Last updated November 2025
```

## 📱 Testing Your Site

1. **Local Preview:** Open any HTML file in your browser
2. **Test Navigation:** Click through all menu items
3. **Mobile View:** Use browser DevTools (F12) to test responsive design
4. **Links:** Verify all links work (social media, email, etc.)

## ⚠️ Common Issues & Solutions

**Issue:** Links not working after publishing
- **Solution:** Make sure all links use relative paths (no leading `/`)
- Change `/images/...` to `images/...`
- Change `/contact.html` to `contact.html`

**Issue:** Images not showing
- **Solution:** Check file paths and ensure images are in the `images` folder

**Issue:** Contact form not working
- **Solution:** The form is static by default. Use Formspree or Netlify Forms (see README.md)

## 🎯 Priority Checklist

If you only have 15 minutes, do these first:

1. ✅ Update name and email everywhere
2. ✅ Add your photo
3. ✅ Write a brief About Me (index.html)
4. ✅ Update social media links
5. ✅ Push to GitHub and go live!

You can always come back and add more details later.

## 📚 Resources

- [Tailwind CSS Docs](https://tailwindcss.com/docs) - For styling reference
- [GitHub Pages Docs](https://pages.github.com/) - For hosting help
- [Formspree](https://formspree.io) - For contact form functionality

## 🎉 You're All Set!

Your portfolio website is ready to customize and publish. Take it step by step, and don't hesitate to experiment with the design. The placeholder content gives you a great starting point!

**Questions?** Check the README.md file for more detailed information.

Good luck! 🚀
