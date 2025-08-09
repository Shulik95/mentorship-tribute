# Admin Guide: Managing Your Testimonial Website

**A step-by-step guide for non-technical users to update and manage the mentorship testimonials website.**

## 📋 Table of Contents

1. [Getting Started](#getting-started)
2. [Adding New Testimonials](#adding-new-testimonials)
3. [Editing Existing Testimonials](#editing-existing-testimonials)
4. [Updating Website Text](#updating-website-text)
5. [Changing Colors and Branding](#changing-colors-and-branding)
6. [Publishing Changes](#publishing-changes)
7. [Troubleshooting](#troubleshooting)

---

## 🚀 Getting Started

### What You'll Need

- A computer with internet access
- A GitHub account (free at [github.com](https://github.com))
- Basic text editing skills

### Important Files to Know

- **`hebrew-system.js`** - Contains Hebrew testimonials
- **`script.js`** - Contains English testimonials
- **`index.html`** - Main website structure
- **`styles.css`** - Website colors and appearance

---

## ➕ Adding New Testimonials

### Step 1: Access the Files

1. Go to your website's GitHub repository
2. Click on the file you want to edit:
   - For **Hebrew testimonials**: Click `hebrew-system.js`
   - For **English testimonials**: Click `script.js`

### Step 2: Edit the File

1. Click the **pencil icon** (✏️) to edit
2. Find the testimonials section

### Step 3: Add Hebrew Testimonial

In `hebrew-system.js`, find `hebrewTestimonialsData = [` and add a new entry:

```javascript
{
    id: 9, // ⚠️ IMPORTANT: Use next available number
    name: 'שם המשתתף החדש',
    role: 'תפקיד המשתתף',
    generalTestimonial: 'כאן תכתבו את ההמלצה הכללית של המשתתף בעברית...',
    guideText: 'כאן תכתבו את הטקסט הספציפי עבור המדריך צביקה...',
    managerText: 'כאן תכתבו את הטקסט הספציפי עבור המנהל רון...',
    programDuration: '6 חודשים',
    mentorSessions: '20 מפגשים',
    careerImpact: 'תיאור ההשפעה על הקריירה',
    completionDate: '2024'
},
```

### Step 4: Add English Testimonial

In `script.js`, find `participantsData = [` and add a new entry:

```javascript
{
    id: 9, // ⚠️ IMPORTANT: Use same number as Hebrew version
    name: "Participant Name",
    role: "Job Title",
    initials: "PN", // First letters of name
    preview: "Short preview text for the card...",
    fullTestimonial: "Full testimonial text that appears in the popup...",
    completionDate: "2024",
    programDuration: "6 months",
    mentorSessions: "20 sessions",
    careerImpact: "Career Impact Description"
},
```

### Step 5: Save Your Changes

1. Scroll to bottom of the page
2. In "Commit changes" section:
   - **Title**: "Add new testimonial - [Participant Name]"
   - **Description**: Brief description of what you added
3. Click **"Commit changes"**

---

## ✏️ Editing Existing Testimonials

### Step 1: Find the Testimonial

1. Open the appropriate file (`hebrew-system.js` or `script.js`)
2. Use **Ctrl+F** (Windows) or **Cmd+F** (Mac) to search for the participant's name

### Step 2: Make Changes

- **Name**: Change the text after `name:`
- **Role**: Change the text after `role:`
- **Testimonial**: Change the text after `generalTestimonial:` or `fullTestimonial:`

### Step 3: Save Changes

Follow the same commit process as adding new testimonials.

---

## 🎨 Updating Website Text

### Changing Hebrew Interface Text

1. Open `hebrew-system.js`
2. Find the `hebrewTexts = {` section
3. Update any text you want to change:

```javascript
const hebrewTexts = {
    title: 'כותרת האתר שלכם',
    subtitle: 'תת-כותרת האתר',
    introTitle: 'כותרת הפתיחה',
    // ... more text options
};
```

### Changing English Text

1. Open `index.html`
2. Find the text you want to change
3. Edit it directly in the HTML

**Example locations:**
- Main title: Look for `<h1 class="header__title">`
- Subtitle: Look for `<p class="header__subtitle">`
- Button text: Look for `<button class="cta__button">`

---

## 🎨 Changing Colors and Branding

### Step 1: Open Styles File

1. Go to your repository
2. Click on `styles.css`
3. Click the pencil icon to edit

### Step 2: Find Color Variables

Look for the `:root {` section near the top:

```css
:root {
    --primary-color: #667eea;      /* Main blue color */
    --secondary-color: #764ba2;    /* Purple accent */
    --text-primary: #333333;       /* Main text color */
    --bg-primary: #ffffff;         /* Background color */
    /* ... more colors */
}
```

### Step 3: Change Colors

Replace the color codes with your preferred colors:

- **Color picker tool**: Use [Google Color Picker](https://g.co/kgs/7Xw8yZ) to find color codes
- **Format**: Use hex codes like `#667eea` or color names like `blue`

**Common color examples:**
- Red: `#ff4444`
- Green: `#44ff44`
- Blue: `#4444ff`
- Purple: `#8844ff`
- Orange: `#ff8844`

### Step 4: Save Changes

Commit your changes with a descriptive message like "Update website colors".

---

## 🚀 Publishing Changes

### Automatic Publishing

Your website updates automatically when you save changes to GitHub! Here's how it works:

1. **Save changes** → **Wait 2-5 minutes** → **Changes appear on website**

### Check Your Website

1. Go to your website URL
2. **Hard refresh** the page:
   - **Windows**: Ctrl + F5
   - **Mac**: Cmd + Shift + R
3. Changes should appear

### If Changes Don't Appear

1. Wait 10 minutes and try again
2. Check the "Actions" tab in your GitHub repository
3. Look for any error messages

---

## 🔧 Troubleshooting

### Common Issues

#### ❌ "My changes broke the website"

**Solution:**
1. Go to your GitHub repository
2. Click on "Commits" 
3. Find your last working commit
4. Click "Revert" to undo problematic changes

#### ❌ "I can't find where to edit something"

**Common locations:**
- **Main page text**: `index.html`
- **Hebrew testimonials**: `hebrew-system.js`
- **English testimonials**: `script.js`
- **Colors**: `styles.css`

#### ❌ "I made a syntax error"

**Signs of syntax errors:**
- Missing comma after a testimonial entry
- Missing quotes around text
- Unmatched brackets `{` or `}`

**How to fix:**
1. Look for the error message in GitHub
2. Check that every `{` has a matching `}`
3. Check that every line ends with a comma (except the last one)
4. Make sure all text is in quotes: `"text"`

#### ❌ "Hebrew text looks wrong"

**Common fixes:**
1. Make sure text is right-to-left
2. Use Hebrew quotes: `"טקסט עברי"` not `'טקסט עברי'`
3. Check that Hebrew fonts are loading

---

## 📝 Content Guidelines

### Writing Good Testimonials

#### Hebrew Testimonials
- **Length**: 100-300 words for general, 50-100 for specific
- **Tone**: Professional but personal
- **Include**: Specific achievements and growth

#### English Testimonials
- **Preview**: 1-2 sentences (shows on card)
- **Full**: 2-3 paragraphs (shows in popup)
- **Focus**: Concrete results and transformation

### Text Formatting Rules

#### Required Format for All Text
```javascript
"Your text goes here in quotes"
```

#### For Multi-line Text
```javascript
"First paragraph of text. " +
"Second paragraph continues here. " +
"Third paragraph if needed."
```

#### Special Characters
- **Hebrew**: Type directly in Hebrew
- **English**: Use standard punctuation
- **Quotes in text**: Use `\"` for quotes inside text

---

## 📊 Best Practices

### Before Making Changes

1. **Backup**: GitHub automatically saves previous versions
2. **Test small changes first**: Start with minor text edits
3. **Use descriptive commit messages**: "Add Sarah's testimonial" not "update"

### Regular Maintenance

#### Monthly Tasks
- [ ] Review all testimonials for accuracy
- [ ] Check website loads properly
- [ ] Test both Hebrew and English views

#### Quarterly Tasks  
- [ ] Update completion dates
- [ ] Review and refresh older testimonials
- [ ] Check for broken links or errors

### Getting Help

#### Before Asking for Help
1. Check this guide first
2. Try the troubleshooting section
3. Look at existing testimonials as examples

#### When You Need Help
**Include this information:**
- What you were trying to do
- What happened instead
- Screenshots of any error messages
- Link to your repository

---

## 🎯 Quick Reference

### File Cheat Sheet

| Task | File | Section |
|------|------|---------|
| Add Hebrew testimonial | `hebrew-system.js` | `hebrewTestimonialsData = [` |
| Add English testimonial | `script.js` | `participantsData = [` |
| Change Hebrew UI text | `hebrew-system.js` | `hebrewTexts = {` |
| Change English UI text | `index.html` | Find specific text |
| Change colors | `styles.css` | `:root {` section |

### Essential Steps for Any Edit

1. **Open file** in GitHub
2. **Click pencil** to edit
3. **Make changes** carefully
4. **Add commit message** describing changes
5. **Click "Commit changes"**
6. **Wait 5 minutes** for website to update

### Emergency Contacts

- **Technical Issues**: Create issue on GitHub
- **Content Questions**: Contact program coordinators
- **Design Changes**: Consult with marketing team

---

**Remember: Every change is automatically saved and versioned. You can always undo changes if needed!**

*Last updated: [Current Date]*