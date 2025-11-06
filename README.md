# Personal Portfolio Website

A clean, modern personal portfolio website built with HTML and Tailwind CSS. Deployed on GitHub Pages.

## 🌐 Live Website

Your website is live at: `https://adarshuday03.github.io`

## 📁 Structure

```
adarshuday03.github.io/
├── index.html          # Home page with about section and updates
├── resume.html         # Education, skills, and achievements
├── courses.html        # Academic coursework
├── experience.html     # Work experience, research, and projects
├── contact.html        # Contact information and form
├── css/
│   └── style.css      # Tailwind CSS styles
└── images/            # Icons and images
    ├── icon-profile.svg
    ├── icon-email.svg
    ├── icon-linkedin.svg
    ├── icon-github.svg
    ├── icon-twitter.svg
    ├── icon-cv.svg
    └── profile-placeholder.svg
```

## 🎨 Customization Guide

### 1. Update Personal Information

**On every page**, replace the following placeholders:

- `Your Name` → Your actual name
- `your.email@example.com` → Your email
- `Your University` → Your university name
- `Your Major` → Your field of study

### 2. Replace Profile Photo

Replace `images/profile-placeholder.svg` with your own photo:
- Recommended: Square image (e.g., 400x400px)
- Format: JPG, PNG, or SVG
- Update the `<img src="images/profile-placeholder.svg">` line in `index.html`

### 3. Update Social Media Links

In all pages, update these links:
- LinkedIn: `https://linkedin.com/in/yourprofile`
- GitHub: `https://github.com/yourusername`
- Twitter: `https://twitter.com/yourusername`
- Email: `mailto:your.email@example.com`

### 4. Customize Content

#### index.html (Home Page)
- Update the "About Me" section with your bio
- Modify the "Updates" section with your latest news
- Change interests and research areas

#### resume.html
- Add your actual education details
- List your programming languages and skills
- Update achievements and awards
- Create a PDF resume and link it

#### courses.html
- Replace placeholder courses with your actual coursework
- Update course codes, names, and descriptions
- Add grades if you wish
- Organize by semester

#### experience.html
- Add your work experience, internships
- Include research projects
- Showcase your best projects with descriptions
- Update technologies used

#### contact.html
- Update contact information (email, phone, location)
- Replace social media links
- Configure the contact form (see below)

### 5. Making the Contact Form Functional

The contact form is currently static. To make it work, you have two options:

**Option A: Use Formspree (Recommended)**
1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form and get your endpoint
3. In `contact.html`, update the form tag:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

**Option B: Use Netlify Forms**
1. Deploy to Netlify (instead of GitHub Pages)
2. Add `netlify` attribute to the form tag:
   ```html
   <form name="contact" method="POST" data-netlify="true">
   ```

### 6. Upload Your CV/Resume PDF

1. Create a `files` folder in your repository
2. Upload your CV as `your-cv.pdf`
3. The download link on the resume page will work automatically

## 🚀 Publishing to GitHub Pages

Your website is already configured for GitHub Pages! Just:

1. Commit all your changes:
   ```bash
   git add .
   git commit -m "Update personal information"
   git push
   ```

2. Go to your repository settings on GitHub
3. Navigate to Pages section
4. Ensure "Source" is set to "main" branch
5. Your site will be live at `https://adarshuday03.github.io`

## 🎨 Color Scheme

The website uses an indigo color scheme. To change colors:
- Primary color: `indigo-500` (buttons, links)
- Background: `slate-100`
- Cards: `slate-200` to `slate-50` gradient

Search and replace these color classes in HTML files to customize.

## 📱 Responsive Design

The website is fully responsive and works on:
- Desktop (1440px+)
- Laptop (976px - 1439px)
- Tablet (768px - 975px)
- Mobile (< 768px)

## 🛠️ Technologies Used

- HTML5
- Tailwind CSS v3.0.24
- Google Fonts (Josefin Sans, Inter, Fira Code)
- GitHub Pages for hosting

## 📝 To-Do List

- [ ] Replace all "Your Name" placeholders
- [ ] Update email addresses
- [ ] Upload profile photo
- [ ] Update social media links
- [ ] Customize About Me section
- [ ] Add actual courses
- [ ] Add work experience
- [ ] Add projects
- [ ] Upload CV PDF
- [ ] Configure contact form
- [ ] Test on mobile devices
- [ ] Update footer copyright year

## 🤝 Need Help?

If you need help customizing your website:
1. Check the HTML comments in each file
2. Refer to [Tailwind CSS documentation](https://tailwindcss.com/docs)
3. Test changes locally before pushing to GitHub

## 📄 License

Feel free to use this template for your personal portfolio!

---

**Good luck with your portfolio! 🎉**
