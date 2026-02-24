# Alpha Kids Math Explorer - Commercial Deployment Guide
**Version:** 2026.1.3
**Target:** Global Production Deployment
**Audience:** DevOps, System Administrators, Developers

---

## Table of Contents
1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Server Requirements](#server-requirements)
3. [Deployment Steps](#deployment-steps)
4. [Performance Optimization](#performance-optimization)
5. [Security Configuration](#security-configuration)
6. [CDN Setup](#cdn-setup)
7. [Monitoring & Analytics](#monitoring--analytics)
8. [Post-Deployment Testing](#post-deployment-testing)
9. [Maintenance & Updates](#maintenance--updates)
10. [Troubleshooting](#troubleshooting)

---

## Pre-Deployment Checklist

### ✅ Critical Items (Must Complete)
- [ ] **Images optimized** (logo.png: 372KB, splash.png: 163KB) ✅ DONE
- [ ] **CSS minified** (use `cssnano` or online tool)
- [ ] **JavaScript minified** (use `terser` or `uglify-js`)
- [ ] **SSL certificate** obtained (Let's Encrypt recommended)
- [ ] **Domain configured** (alphakids.lk + DNS records)
- [ ] **Legal pages** added (privacy.html, terms.html) ✅ DONE
- [ ] **robots.txt** verified ✅ DONE
- [ ] **sitemap.xml** updated with all pages
- [ ] **Service Worker** tested for offline functionality

### 🟡 High Priority
- [ ] **Gzip/Brotli compression** enabled
- [ ] **Cache headers** configured (.htaccess)
- [ ] **CDN setup** (Cloudflare recommended - free tier available)
- [ ] **Analytics** implemented (Google Analytics 4 or Plausible)
- [ ] **Error tracking** (Sentry free tier)
- [ ] **Backup strategy** configured (daily automated)
- [ ] **Uptime monitoring** (UptimeRobot free tier)

### 🟢 Recommended
- [ ] **WebP images** with PNG fallback
- [ ] **HTTP/2** enabled on server
- [ ] **Content Security Policy** headers
- [ ] **Social media OG images** tested
- [ ] **PWA install** tested on iOS and Android
- [ ] **Cross-browser testing** completed

---

## Server Requirements

### Minimum Specifications
- **Server Type:** Apache 2.4+ or Nginx 1.18+
- **PHP:** Not required (static site)
- **Storage:** 50MB (100MB recommended with backups)
- **Bandwidth:** 10GB/month minimum (scales with traffic)
- **SSL:** Required (Let's Encrypt free certificate)

### Recommended Hosting Providers

#### Budget Options (< $10/month)
1. **Hostinger** - $2.99/month
   - 100 websites
   - 100GB storage
   - Free SSL
   - 🌟 Best for: Small budget, global reach

2. **Namecheap Stellar** - $2.88/month
   - Unmetered bandwidth
   - Free domain (first year)
   - Free SSL
   - 🌟 Best for: Easy setup

3. **SiteGround StartUp** - $3.99/month
   - 10GB storage
   - Free CDN
   - Daily backups
   - 🌟 Best for: Performance

#### Premium Options ($10-50/month)
4. **Cloudflare Pages** - $0-20/month
   - Unlimited bandwidth
   - Automatic SSL
   - Global CDN included
   - 🌟 Best for: Maximum performance

5. **Vercel** - Free for hobby, $20/month Pro
   - Automatic deployments
   - Global edge network
   - Excellent analytics
   - 🌟 Best for: Developers

6. **Netlify** - Free for hobby, $19/month Pro
   - Continuous deployment
   - Form handling
   - Function support
   - 🌟 Best for: Jamstack

---

## Deployment Steps

### Method 1: Traditional Hosting (cPanel/FTP)

#### Step 1: Prepare Files
```bash
# Navigate to project directory
cd "/Users/pc/Downloads/Coding-python/5 NEW/Alpha_Kids_5_Year"

# Create deployment package
zip -r alpha-kids-deploy.zip . -x "*.DS_Store" -x "*.git*" -x "node_modules/*" -x "*.md" -x "optimize-images.sh" -x "resize.swift" -x "COMMERCIAL_DEPLOYMENT_GUIDE.md" -x "IMPROVEMENTS_*.md"

# Or copy to a clean directory
mkdir ../alpha-kids-deploy
cp -r *.html assets manifest.json sw.js robots.txt sitemap.xml .htaccess ../alpha-kids-deploy/
```

#### Step 2: Upload via FTP
```
Host: ftp.alphakids.lk (or provided by host)
Username: your-username
Password: your-password
Port: 21 (or 22 for SFTP)
```

**Upload these files to public_html or www directory:**
```
/
├── index.html
├── launch.html
├── english.html
├── sinhala.html
├── contact.html
├── privacy.html          ← NEW
├── terms.html            ← NEW
├── analytics-setup.html
├── manifest.json
├── sw.js
├── robots.txt
├── sitemap.xml
├── .htaccess
└── assets/
    ├── css/
    │   └── style.css     (minify recommended)
    ├── js/
    │   ├── game.js       (minify recommended)
    │   └── game.bundle.js
    ├── logo.png          (optimized ✅)
    ├── splash.png        (optimized ✅)
    └── wallpaper_space.png
```

#### Step 3: Configure Domain
1. Point domain to server IP:
   ```
   A Record: @ → Your_Server_IP
   A Record: www → Your_Server_IP
   ```

2. Wait for DNS propagation (up to 48 hours, usually < 1 hour)

#### Step 4: Enable SSL
Using cPanel:
1. Go to **SSL/TLS Status**
2. Click **Run AutoSSL** (if using Let's Encrypt)
3. Or install certificate manually

Using Certbot (command line):
```bash
sudo certbot --apache -d alphakids.lk -d www.alphakids.lk
```

---

### Method 2: Cloudflare Pages (Recommended for Maximum Performance)

#### Step 1: Push to Git Repository
```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial deployment"

# Create repository on GitHub/GitLab
git remote add origin https://github.com/yourusername/alpha-kids.git
git push -u origin main
```

#### Step 2: Deploy to Cloudflare Pages
1. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
2. Click **Create a project**
3. Connect your Git repository
4. Configure build settings:
   - **Build command:** (leave empty - static site)
   - **Build output directory:** `/`
   - **Root directory:** `/`

5. Click **Save and Deploy**

#### Step 3: Configure Custom Domain
1. Add domain: `alphakids.lk`
2. Update DNS records (Cloudflare will provide instructions)
3. Enable **Always Use HTTPS**

---

### Method 3: Vercel Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod

# Follow prompts to link domain
```

---

## Performance Optimization

### 1. Minify CSS and JavaScript

#### Using Online Tools:
- CSS: https://cssnano.github.io/cssnano/
- JS: https://skalman.github.io/UglifyJS-online/

#### Using Command Line:
```bash
# Install tools
npm install -g cssnano-cli terser

# Minify CSS
cssnano assets/css/style.css assets/css/style.min.css

# Minify JavaScript
terser assets/js/game.js -o assets/js/game.min.js -c -m

# Update HTML references
# Change: <link href="assets/css/style.css">
# To: <link href="assets/css/style.min.css">
```

### 2. Enable Gzip/Brotli Compression

#### Apache (.htaccess)
```apache
# Already in .htaccess file - verify these lines:
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>
```

#### Nginx (nginx.conf)
```nginx
gzip on;
gzip_vary on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
```

### 3. Configure Caching Headers

#### Apache (.htaccess)
```apache
# Images (1 year)
<FilesMatch "\.(jpg|jpeg|png|gif|webp|svg)$">
    Header set Cache-Control "max-age=31536000, public"
</FilesMatch>

# CSS & JS (1 week - update when changed)
<FilesMatch "\.(css|js)$">
    Header set Cache-Control "max-age=604800, public"
</FilesMatch>

# HTML (1 hour)
<FilesMatch "\.(html|htm)$">
    Header set Cache-Control "max-age=3600, public, must-revalidate"
</FilesMatch>
```

### 4. WebP Image Conversion (Optional but Recommended)

```bash
# Install cwebp (Google's WebP encoder)
brew install webp  # macOS
# or
sudo apt-get install webp  # Linux

# Convert images
cwebp -q 85 assets/logo.png -o assets/logo.webp
cwebp -q 85 assets/splash.png -o assets/splash.webp
cwebp -q 85 assets/wallpaper_space.png -o assets/wallpaper_space.webp

# Update HTML with fallback:
<picture>
  <source srcset="assets/logo.webp" type="image/webp">
  <img src="assets/logo.png" alt="Alpha Kids Logo" loading="lazy">
</picture>
```

---

## Security Configuration

### 1. HTTP Security Headers (.htaccess)

```apache
# Content Security Policy
Header set Content-Security-Policy "default-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data:; font-src 'self' https://fonts.gstatic.com data:;"

# X-Frame-Options (already in HTML, reinforced here)
Header always set X-Frame-Options "SAMEORIGIN"

# X-Content-Type-Options (already in HTML)
Header set X-Content-Type-Options "nosniff"

# Referrer Policy
Header set Referrer-Policy "strict-origin-when-cross-origin"

# Permissions Policy (already in HTML)
Header set Permissions-Policy "geolocation=(), microphone=(), camera=()"

# HTTPS Strict Transport Security (HSTS)
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
```

### 2. Disable Directory Listing

```apache
# .htaccess (should already be there)
Options -Indexes
```

### 3. Protect Sensitive Files

```apache
# Block access to .git, .htaccess, etc.
<FilesMatch "^\.">
    Order allow,deny
    Deny from all
</FilesMatch>
```

---

## CDN Setup

### Cloudflare (Recommended - Free)

#### Step 1: Add Site to Cloudflare
1. Sign up at [cloudflare.com](https://cloudflare.com)
2. Click **Add Site**
3. Enter domain: `alphakids.lk`
4. Choose **Free Plan**

#### Step 2: Update Nameservers
Cloudflare will provide nameservers like:
```
ns1.cloudflare.com
ns2.cloudflare.com
```

Update these at your domain registrar (Namecheap, GoDaddy, etc.)

#### Step 3: Cloudflare Optimization Settings
- **SSL/TLS:** Full (strict)
- **Always Use HTTPS:** On
- **Automatic HTTPS Rewrites:** On
- **Minimum TLS Version:** 1.2
- **Brotli:** On
- **Auto Minify:** Enable HTML, CSS, JS
- **Rocket Loader:** Off (can cause issues with games)
- **Browser Cache TTL:** 4 hours (or longer)

#### Step 4: Page Rules (Free plan: 3 rules)
1. **Cache Everything:**
   ```
   URL: alphakids.lk/*
   Setting: Cache Level = Cache Everything
   Edge Cache TTL: 1 month
   ```

2. **Force HTTPS:**
   ```
   URL: http://*alphakids.lk/*
   Setting: Always Use HTTPS
   ```

---

## Monitoring & Analytics

### 1. Google Analytics 4 Setup

#### Create Property
1. Go to [analytics.google.com](https://analytics.google.com)
2. Create **GA4 Property**
3. Get **Measurement ID** (G-XXXXXXXXXX)

#### Add to HTML (Before `</head>`)
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX', {
    'anonymize_ip': true,  // COPPA compliance
    'allow_google_signals': false  // No personalized ads
  });
</script>
```

**⚠️ Important:** Configure for COPPA compliance:
- Enable **IP Anonymization**
- Disable **Google Signals** (remarketing)
- Disable **Personalized Ads**

### 2. Plausible Analytics (Privacy-Friendly Alternative)

```html
<script defer data-domain="alphakids.lk" src="https://plausible.io/js/script.js"></script>
```

Benefits:
- ✅ GDPR/COPPA compliant by default
- ✅ No cookies
- ✅ Lightweight (< 1KB)
- ⚠️ Paid ($9/month for 10K pageviews)

### 3. Error Tracking (Sentry)

#### Setup
1. Sign up at [sentry.io](https://sentry.io) (free tier: 5K errors/month)
2. Create project → Select **JavaScript**
3. Add to HTML:

```html
<script
  src="https://js.sentry-cdn.com/YOUR_DSN_HERE.min.js"
  crossorigin="anonymous"
></script>
<script>
  Sentry.init({
    dsn: 'https://YOUR_DSN_HERE@sentry.io/PROJECT_ID',
    environment: 'production',
    tracesSampleRate: 0.1,  // 10% performance monitoring
  });
</script>
```

### 4. Uptime Monitoring (UptimeRobot)

1. Sign up at [uptimerobot.com](https://uptimerobot.com) (free: 50 monitors)
2. Add monitor:
   - **Type:** HTTPS
   - **URL:** https://alphakids.lk
   - **Interval:** 5 minutes
   - **Alert Contacts:** Your email

---

## Post-Deployment Testing

### Automated Testing Tools

#### 1. Google PageSpeed Insights
```
https://pagespeed.web.dev/
Enter: https://alphakids.lk
```
**Target Scores:**
- Mobile: 90+ (Performance)
- Desktop: 95+ (Performance)

#### 2. GTmetrix
```
https://gtmetrix.com/
Enter: https://alphakids.lk
```
**Target:**
- Grade A
- Fully Loaded Time: < 2s

#### 3. WebPageTest
```
https://www.webpagetest.org/
Enter: https://alphakids.lk
Location: Multiple (Virginia, London, Mumbai, Sydney)
```

#### 4. SSL Test
```
https://www.ssllabs.com/ssltest/
Enter: alphakids.lk
```
**Target:** A+ rating

### Manual Testing Checklist

#### Cross-Browser Testing
- [ ] Chrome (Windows, Mac, Android)
- [ ] Safari (Mac, iPhone, iPad)
- [ ] Firefox (Windows, Mac)
- [ ] Edge (Windows)
- [ ] Samsung Internet (Android)

#### Device Testing
- [ ] iPhone 12/13/14 (Safari)
- [ ] Android phone (Chrome)
- [ ] iPad (Safari)
- [ ] Android tablet (Chrome)
- [ ] Desktop 1920x1080
- [ ] Laptop 1366x768

#### Functionality Testing
- [ ] All 15 games work correctly
- [ ] Sound effects play (with permission)
- [ ] Parent gate (3-second hold) functions
- [ ] Sticker book opens and displays earned stickers
- [ ] Language switching (English ↔ Sinhala)
- [ ] PWA installation on mobile
- [ ] Offline mode works after first visit
- [ ] Reset progress button works
- [ ] Contact form submits successfully

#### SEO Testing
- [ ] sitemap.xml accessible: https://alphakids.lk/sitemap.xml
- [ ] robots.txt accessible: https://alphakids.lk/robots.txt
- [ ] All pages indexed (Google Search Console)
- [ ] Social sharing (Facebook, Twitter) shows correct image
- [ ] Schema.org structured data valid (Google Rich Results Test)

---

## Maintenance & Updates

### Weekly Tasks
- [ ] Check error logs (Sentry dashboard)
- [ ] Review analytics (user behavior, popular games)
- [ ] Monitor uptime (UptimeRobot alerts)

### Monthly Tasks
- [ ] Update sitemap.xml with new pages
- [ ] Review and respond to user feedback
- [ ] Check for browser compatibility issues
- [ ] Update SSL certificate (automatic with Let's Encrypt)

### Quarterly Tasks
- [ ] Conduct security audit
- [ ] Review and update content (new games, features)
- [ ] Analyze competitors
- [ ] Update Privacy Policy / Terms if needed

### Annual Tasks
- [ ] Renew domain registration
- [ ] Review hosting plan (upgrade if needed)
- [ ] Conduct comprehensive user testing with children
- [ ] Update copyright year

---

## Troubleshooting

### Issue: Site Not Loading After Deployment

**Solution:**
1. Check DNS propagation: https://dnschecker.org/
2. Clear browser cache (Ctrl+Shift+Del)
3. Verify .htaccess syntax (no typos)
4. Check server error logs

### Issue: PWA Not Installing on Mobile

**Solution:**
1. Verify HTTPS is enabled (required for PWA)
2. Check manifest.json is accessible
3. Verify Service Worker registration:
   ```javascript
   navigator.serviceWorker.getRegistrations().then(regs => console.log(regs));
   ```
4. Clear site data and retry

### Issue: Images Not Loading

**Solution:**
1. Check file paths (case-sensitive on Linux servers)
2. Verify .htaccess allows image access
3. Check MIME types are configured
4. Inspect browser console for 404 errors

### Issue: Games Not Working

**Solution:**
1. Check JavaScript console for errors
2. Verify game.js loaded correctly
3. Test localStorage availability:
   ```javascript
   console.log(typeof(Storage));  // Should output "object"
   ```
4. Clear cache and reload

### Issue: Slow Loading Times

**Solution:**
1. Enable Gzip compression
2. Minify CSS/JS
3. Enable CDN (Cloudflare)
4. Optimize images further
5. Use browser caching headers

### Issue: SSL Certificate Errors

**Solution:**
1. Verify certificate is valid (not expired)
2. Check intermediate certificates installed
3. Force HTTPS in .htaccess
4. Clear browser SSL cache

---

## Contact & Support

**Deployment Issues:**
- Email: devops@alphakids.lk
- GitHub Issues: (if open-sourced)

**Content Updates:**
- Email: support@alphakids.lk

---

## Appendix: Quick Reference Commands

### Check File Sizes
```bash
du -sh assets/
ls -lh assets/*.png
```

### Minify CSS
```bash
cssnano assets/css/style.css assets/css/style.min.css
```

### Minify JavaScript
```bash
terser assets/js/game.js -o assets/js/game.min.js -c -m
```

### Test SSL
```bash
curl -I https://alphakids.lk
```

### Check Headers
```bash
curl -I https://alphakids.lk | grep -i cache
```

### Validate HTML
```bash
curl https://alphakids.lk | tidy -e
```

---

**Last Updated:** February 23, 2026
**Version:** 2026.1.3
**Prepared By:** Claude Code for Alpha Kids Sri Lanka

**🚀 You're ready to deploy! Good luck with the launch!**
