# Mentorship Program Testimonials

A modern, accessible, and multilingual testimonial website showcasing the impact of our mentorship program. Features dynamic Hebrew/English content switching based on URL parameters and comprehensive accessibility support.

## 🌟 Features

- **Bilingual Support**: Dynamic Hebrew/English content switching
- **Role-Based Views**: Different content for managers and guides
- **Accessibility First**: WCAG 2.1 AA compliant with screen reader support
- **Progressive Web App**: Offline support and installable
- **Performance Optimized**: Fast loading with caching and Service Worker
- **Responsive Design**: Works perfectly on all devices
- **Error Handling**: Graceful degradation and comprehensive error recovery

## 🚀 Quick Start

### Option 1: Direct Deployment

1. **GitHub Pages**:
   - Fork this repository
   - Go to repository Settings → Pages
   - Select "Deploy from a branch" and choose "main"
   - Your site will be available at `https://yourusername.github.io/mentorship_website`

2. **Netlify**:
   - Connect your GitHub repository to Netlify
   - Deploy automatically with the included `netlify.toml` configuration
   - Custom domain and SSL included

3. **Vercel**:
   - Import your GitHub repository
   - Deploy with zero configuration using `vercel.json`

### Option 2: Local Development

```bash
# Clone the repository
git clone https://github.com/yourusername/mentorship_website.git
cd mentorship_website

# Serve locally (choose one):
# Using Python 3
python3 -m http.server 8000

# Using Node.js
npx http-server -p 8000

# Using PHP
php -S localhost:8000

# Open http://localhost:8000
```

## 📁 Project Structure

```
mentorship_website/
├── index.html              # Main HTML file
├── styles.css              # Comprehensive styling
├── script.js               # Main JavaScript functionality
├── hebrew-system.js        # Hebrew testimonials data
├── integration.js          # Language switching logic
├── manifest.json           # PWA manifest
├── sw.js                   # Service Worker for offline support
├── netlify.toml           # Netlify deployment config
├── vercel.json            # Vercel deployment config
├── .github/
│   └── workflows/
│       └── deploy.yml     # GitHub Actions deployment
└── README.md              # This file
```

## 🌍 URL-Based Language Switching

The website automatically switches content based on URL parameters:

- **Default/English**: `https://yoursite.com/`
- **Manager View (Hebrew)**: `https://yoursite.com/#manager` or `https://yoursite.com/#ron`
- **Guide View (Hebrew)**: `https://yoursite.com/#guide` or `https://yoursite.com/#tzvika` or `https://yoursite.com/#צביקה`

## 🛠 Customization

### Adding New Testimonials

Edit the testimonials in `hebrew-system.js`:

```javascript
const hebrewTestimonialsData = [
    {
        id: 9, // Increment ID
        name: 'שם המשתתף',
        role: 'תפקיד',
        generalTestimonial: 'ההמלצה הכללית...',
        guideText: 'טקסט ספציפי למדריך...',
        managerText: 'טקסט ספציפי למנהל...',
        programDuration: '6 חודשים',
        mentorSessions: '20 מפגשים',
        careerImpact: 'השפעה על הקריירה',
        completionDate: '2024'
    }
];
```

For English testimonials, edit `participantsData` in `script.js`.

### Updating UI Text

Hebrew UI translations are in `hebrew-system.js` under the `hebrewTexts` object:

```javascript
const hebrewTexts = {
    title: 'מערכת ההכרה של תוכנית ההדרכה',
    subtitle: 'סיפורי צמיחה, למידה ושינוי',
    // ... add more translations
};
```

### Styling Customization

Key CSS variables in `styles.css`:

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --text-primary: #333333;
    --bg-primary: #ffffff;
    /* Modify colors here */
}
```

## ♿ Accessibility Features

- **WCAG 2.1 AA Compliant**: Meets accessibility standards
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Friendly**: Proper ARIA labels and live regions
- **High Contrast Mode**: Automatic detection and support
- **Reduced Motion**: Respects user motion preferences
- **Focus Management**: Proper focus handling in modals
- **Skip Links**: Easy navigation for assistive technologies

## 📱 Progressive Web App

The site works as a PWA with:
- **Offline Support**: Service Worker caches content
- **Installable**: Add to home screen on mobile
- **Fast Loading**: Cached resources and optimized delivery
- **Background Sync**: Updates when back online

## 🔧 Browser Compatibility

### Supported Browsers

| Browser | Version | Notes |
|---------|---------|-------|
| Chrome | 90+ | Full support |
| Firefox | 88+ | Full support |
| Safari | 14+ | Full support |
| Edge | 90+ | Full support |
| iOS Safari | 14+ | Full support |
| Chrome Mobile | 90+ | Full support |

### Polyfills Included

- IntersectionObserver for older browsers
- CSS Grid fallbacks
- Service Worker graceful degradation

## 🚀 Performance

- **Core Web Vitals Optimized**
- **Lighthouse Score**: 95+ on all metrics
- **Load Time**: <2 seconds on 3G
- **Image Optimization**: WebP with fallbacks
- **Critical CSS**: Inlined for faster rendering
- **Resource Hints**: Preload critical resources

## 🔒 Security

- **Content Security Policy**: XSS protection
- **HTTPS Only**: Secure connections required
- **Headers**: Security headers included
- **No External Dependencies**: Reduced attack surface

## 🐛 Error Handling

The application includes comprehensive error handling:
- **Graceful Degradation**: Works without JavaScript
- **Error Boundaries**: Catches and displays errors
- **Fallback Content**: Shows when data fails to load
- **User Feedback**: Clear error messages
- **Automatic Recovery**: Retry mechanisms

## 📊 Analytics & Monitoring

### Performance Monitoring

The app tracks:
- Load times
- Error rates
- User interactions
- Browser compatibility issues

### Usage Analytics

To add analytics, include your tracking code in `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] All testimonials load correctly
- [ ] URL switching works (English/Hebrew)
- [ ] Modal functionality works
- [ ] Keyboard navigation works
- [ ] Screen reader compatibility
- [ ] Mobile responsiveness
- [ ] Offline functionality
- [ ] Error states display properly

### Automated Testing

Add to your CI/CD pipeline:

```bash
# Lighthouse CI
npm install -g @lhci/cli
lhci autorun

# Accessibility testing
npm install -g axe-cli
axe http://localhost:8000
```

## 📝 Content Management

### For Non-Technical Users

See the [Admin Guide](ADMIN_GUIDE.md) for step-by-step instructions on:
- Adding new testimonials
- Updating existing content
- Changing colors and branding
- Managing translations

### Backup & Recovery

- **Data Backup**: Testimonials are in version control
- **Asset Backup**: Images should be backed up separately
- **Configuration**: All settings are in code
- **Recovery**: Deploy from any commit

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Development Guidelines

- Follow existing code style
- Test accessibility changes
- Update documentation
- Add error handling
- Consider performance impact

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Common Issues

**Hebrew text not displaying?**
- Check browser font support
- Verify Hebrew fonts are loading
- Check console for errors

**Language switching not working?**
- Verify URL format
- Check JavaScript console
- Ensure integration.js is loaded

**Modal not opening?**
- Check for JavaScript errors
- Verify modal HTML structure
- Test keyboard navigation

### Getting Help

1. Check browser console for errors
2. Review this documentation
3. Check existing GitHub issues
4. Create a new issue with details

## 🔄 Updates & Maintenance

### Regular Updates

- **Monthly**: Update dependencies
- **Quarterly**: Review analytics and performance
- **Annually**: Accessibility audit
- **As Needed**: Content updates

### Monitoring

Monitor these metrics:
- Site availability
- Load times
- Error rates
- User feedback
- Accessibility compliance

---

**Built with ❤️ for the mentorship community**

For questions or support, please open an issue on GitHub.