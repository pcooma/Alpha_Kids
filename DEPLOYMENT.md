# 🚀 Alpha Kids Math Explorer - Deployment Guide

This guide provides comprehensive instructions for deploying Alpha Kids Math Explorer to production.

---

## 📋 Pre-Deployment Checklist

### 1. Image Optimization ⚡
**CRITICAL:** The current images are too large for optimal web performance.

Current sizes:
- `logo.png`: 5.9MB ❌ (should be < 200KB)
- `splash.png`: 6.6MB ❌ (should be < 300KB)

**Action Required:**
```bash
# Run the optimization script
./optimize-images.sh

# OR manually optimize using ImageMagick
convert assets/logo.png -resize 512x512 -quality 85 -strip assets/logo-optimized.png
convert assets/splash.png -resize 512x512 -quality 85 -strip assets/splash-optimized.png

# Replace original files
mv assets/logo-optimized.png assets/logo.png
mv assets/splash-optimized.png assets/splash.png
```

### 2. SSL Certificate 🔒
Enable HTTPS for your domain:
- Purchase SSL certificate from your hosting provider
- OR use free certificate from [Let's Encrypt](https://letsencrypt.org/)
- Update `.htaccess` to force HTTPS (uncomment the HTTPS redirect lines)

### 3. Domain Configuration 🌐
Configure DNS records for `alphakids.lk`:
```
Type    Name    Value           TTL
A       @       YOUR_SERVER_IP  3600
A       www     YOUR_SERVER_IP  3600
```

### 4. Update Configuration Files 📝

**manifest.json:**
- Verify `start_url` points to correct domain
- Confirm icon paths are correct

**sitemap.xml:**
- Update `lastmod` dates
- Verify all URLs are accessible

**robots.txt:**
- Confirm sitemap URL is correct
- Test with [Google Robots Testing Tool](https://www.google.com/webmasters/tools/robots-testing-tool)

---

## 🖥️ Server Requirements

### Minimum Requirements
- **Web Server:** Apache 2.4+ or Nginx 1.18+
- **PHP:** 7.4+ (optional, for server-side features)
- **SSL Certificate:** Required for PWA features
- **Storage:** 50MB minimum
- **Bandwidth:** 1GB/month for small traffic

### Recommended Modules (Apache)
- `mod_rewrite` - URL rewriting
- `mod_headers` - Security headers
- `mod_deflate` - Compression
- `mod_expires` - Browser caching
- `mod_mime` - MIME types

### Recommended Modules (Nginx)
- `ngx_http_gzip_module` - Compression
- `ngx_http_headers_module` - Headers
- `ngx_http_ssl_module` - HTTPS

---

## 📦 Deployment Methods

### Method 1: FTP/SFTP Upload

1. **Connect to your server:**
   ```bash
   sftp user@alphakids.lk
   ```

2. **Upload files:**
   ```bash
   put -r /path/to/Alpha_Kids_5_Year/* /var/www/html/
   ```

3. **Set permissions:**
   ```bash
   chmod 755 /var/www/html/
   chmod 644 /var/www/html/*.html
   chmod 644 /var/www/html/*.js
   ```

### Method 2: Git Deployment

1. **Initialize Git repository:**
   ```bash
   cd /path/to/Alpha_Kids_5_Year
   git init
   git add .
   git commit -m "Initial commit - v2026.1.2"
   ```

2. **Push to remote:**
   ```bash
   git remote add origin git@github.com:yourorg/alpha-kids.git
   git push -u origin main
   ```

3. **Deploy on server:**
   ```bash
   ssh user@alphakids.lk
   cd /var/www/html
   git clone git@github.com:yourorg/alpha-kids.git .
   ```

### Method 3: cPanel File Manager

1. Login to cPanel
2. Navigate to File Manager
3. Upload ZIP file of project
4. Extract in `public_html` directory
5. Set proper permissions

---

## 🔧 Server Configuration

### Apache (.htaccess)
The included `.htaccess` file provides:
- ✅ Security headers (CSP, HSTS, X-Frame-Options)
- ✅ GZIP compression
- ✅ Browser caching
- ✅ URL rewriting
- ✅ HTTPS redirect (uncomment when ready)

**Enable .htaccess:**
```apache
# In your Apache config or VirtualHost
<Directory /var/www/html>
    AllowOverride All
</Directory>
```

### Nginx Configuration
Create `/etc/nginx/sites-available/alphakids.lk`:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name alphakids.lk www.alphakids.lk;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name alphakids.lk www.alphakids.lk;

    root /var/www/html;
    index index.html launch.html;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/alphakids.lk/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/alphakids.lk/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self';" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;

    # GZIP Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;

    # Browser Caching
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location ~* \.(html|htm)$ {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    # Service Worker
    location = /sw.js {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Service-Worker-Allowed "/";
    }

    # Clean URLs
    location / {
        try_files $uri $uri.html $uri/ =404;
    }

    # Error Pages
    error_page 404 /launch.html;
    error_page 500 502 503 504 /launch.html;
}
```

**Enable site:**
```bash
sudo ln -s /etc/nginx/sites-available/alphakids.lk /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 🔒 SSL/HTTPS Setup

### Using Let's Encrypt (Free)

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-apache  # Apache
# OR
sudo apt-get install certbot python3-certbot-nginx   # Nginx

# Obtain certificate
sudo certbot --apache -d alphakids.lk -d www.alphakids.lk
# OR
sudo certbot --nginx -d alphakids.lk -d www.alphakids.lk

# Auto-renewal (runs twice daily)
sudo certbot renew --dry-run
```

---

## 📊 Post-Deployment Testing

### 1. Functionality Tests ✅
- [ ] Visit https://alphakids.lk
- [ ] Test language selection (English/Sinhala)
- [ ] Launch each language version
- [ ] Test all navigation links
- [ ] Verify images load correctly
- [ ] Test on mobile devices

### 2. SEO Tests 🔍
- [ ] Google Search Console verification
- [ ] Submit sitemap: https://alphakids.lk/sitemap.xml
- [ ] Test meta tags with [OpenGraph Debugger](https://www.opengraph.xyz/)
- [ ] Test Twitter Cards with [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [ ] Verify structured data with [Google Rich Results Test](https://search.google.com/test/rich-results)

### 3. Performance Tests ⚡
- [ ] [Google PageSpeed Insights](https://pagespeed.web.dev/)
  - Target: 90+ score for Performance, Accessibility, Best Practices, SEO
- [ ] [GTmetrix](https://gtmetrix.com/)
  - Target: Grade A, < 3s load time
- [ ] [WebPageTest](https://www.webpagetest.org/)
  - Test from multiple locations

### 4. Security Tests 🔒
- [ ] [Mozilla Observatory](https://observatory.mozilla.org/)
  - Target: A+ grade
- [ ] [SSL Labs](https://www.ssllabs.com/ssltest/)
  - Target: A+ rating
- [ ] Test CSP with browser DevTools Console

### 5. PWA Tests 📱
- [ ] Lighthouse PWA audit
- [ ] Test "Add to Home Screen" on iOS/Android
- [ ] Test offline functionality
- [ ] Verify service worker installation

### 6. Compatibility Tests 🌐
- [ ] Chrome (desktop & mobile)
- [ ] Safari (desktop & mobile)
- [ ] Firefox
- [ ] Edge
- [ ] Test on different screen sizes

---

## 🎯 Google Search Console Setup

1. **Verify ownership:**
   - Add HTML meta tag to `index.html`, OR
   - Upload verification file, OR
   - Use DNS verification

2. **Submit sitemap:**
   ```
   https://alphakids.lk/sitemap.xml
   ```

3. **Request indexing:**
   - Submit main pages for immediate indexing
   - Monitor "Coverage" report for issues

4. **Set up alerts:**
   - Enable email notifications for critical issues

---

## 📈 Analytics Setup (Optional)

### Google Analytics 4

Add to all HTML files before `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX', {
    'anonymize_ip': true,
    'cookie_flags': 'SameSite=None;Secure'
  });
</script>
```

**Update CSP header to allow Google Analytics:**
```
script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com;
connect-src 'self' https://www.google-analytics.com;
```

---

## 🔄 Continuous Deployment

### Option 1: GitHub Actions

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Deploy via FTP
        uses: SamKirkland/FTP-Deploy-Action@4.3.0
        with:
          server: ftp.alphakids.lk
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          local-dir: ./
          server-dir: /public_html/
```

### Option 2: Git Hooks

Create `.git/hooks/post-receive` on server:
```bash
#!/bin/bash
GIT_DIR=/var/repo/alpha-kids.git
WORK_TREE=/var/www/html

git --work-tree=$WORK_TREE --git-dir=$GIT_DIR checkout -f
cd $WORK_TREE
# Run any build commands here
echo "Deployed to production at $(date)"
```

---

## 🐛 Troubleshooting

### Issue: Images not loading
**Solution:**
- Check file permissions (644 for files, 755 for directories)
- Verify image paths in HTML
- Check browser console for 404 errors

### Issue: .htaccess not working
**Solution:**
- Verify `mod_rewrite` is enabled: `sudo a2enmod rewrite`
- Check `AllowOverride All` in Apache config
- Restart Apache: `sudo systemctl restart apache2`

### Issue: PWA not installing
**Solution:**
- Ensure HTTPS is enabled
- Verify `manifest.json` is accessible
- Check service worker registration in DevTools
- Validate manifest with [Web App Manifest Validator](https://manifest-validator.appspot.com/)

### Issue: Slow loading
**Solution:**
- Optimize images (run `optimize-images.sh`)
- Enable GZIP compression
- Check browser caching headers
- Use CDN for static assets

---

## 📞 Support

For deployment issues or questions:
- **Email:** support@alphakids.lk
- **Documentation:** [README.md](README.md)
- **Issues:** Report bugs and feature requests

---

## ✅ Final Checklist

Before going live:
- [ ] Images optimized (< 500KB total)
- [ ] HTTPS enabled and working
- [ ] All links tested
- [ ] Meta tags verified
- [ ] Sitemap submitted to Google
- [ ] robots.txt accessible
- [ ] PWA installable
- [ ] Mobile responsive
- [ ] Performance score 90+
- [ ] Security headers active
- [ ] Error pages working
- [ ] Analytics tracking (if used)
- [ ] Backup created

---

**🎉 Congratulations! Your Alpha Kids Math Explorer is ready to help Sri Lankan children learn!**

Made with ❤️ in Sri Lanka 🇱🇰
