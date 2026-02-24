#!/bin/bash

# Alpha Kids Math Explorer - Image Optimization Script
# Version 2026.1.2
# This script optimizes images for web performance

echo "🎓 Alpha Kids - Image Optimization Script"
echo "=========================================="
echo ""

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ Error: ImageMagick is not installed."
    echo "Please install it first:"
    echo "  macOS: brew install imagemagick"
    echo "  Ubuntu: sudo apt-get install imagemagick"
    echo "  Windows: Download from https://imagemagick.org/script/download.php"
    exit 1
fi

# Create backup directory
BACKUP_DIR="assets/backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"
echo "📁 Created backup directory: $BACKUP_DIR"

# Backup original images
echo "💾 Backing up original images..."
cp assets/logo.png "$BACKUP_DIR/" 2>/dev/null && echo "  ✓ logo.png backed up"
cp assets/splash.png "$BACKUP_DIR/" 2>/dev/null && echo "  ✓ splash.png backed up"
cp assets/wallpaper_space.png "$BACKUP_DIR/" 2>/dev/null && echo "  ✓ wallpaper_space.png backed up"

echo ""
echo "🔧 Optimizing images..."
echo ""

# Optimize logo.png (target: 192x192)
if [ -f "assets/logo.png" ]; then
    ORIGINAL_SIZE=$(du -h assets/logo.png | cut -f1)
    echo "📷 Optimizing logo.png (Original: $ORIGINAL_SIZE)"

    convert assets/logo.png \
        -resize 512x512 \
        -quality 85 \
        -strip \
        -interlace Plane \
        assets/logo-optimized.png

    OPTIMIZED_SIZE=$(du -h assets/logo-optimized.png | cut -f1)
    echo "  ✓ Created: logo-optimized.png ($OPTIMIZED_SIZE)"

    # Create smaller version for favicon
    convert assets/logo.png \
        -resize 192x192 \
        -quality 85 \
        -strip \
        assets/logo-192.png
    echo "  ✓ Created: logo-192.png (for PWA)"

    # Create Apple Touch Icon
    convert assets/logo.png \
        -resize 180x180 \
        -quality 85 \
        -strip \
        assets/apple-touch-icon.png
    echo "  ✓ Created: apple-touch-icon.png (180x180)"
    echo ""
fi

# Optimize splash.png (target: 512x512)
if [ -f "assets/splash.png" ]; then
    ORIGINAL_SIZE=$(du -h assets/splash.png | cut -f1)
    echo "📷 Optimizing splash.png (Original: $ORIGINAL_SIZE)"

    convert assets/splash.png \
        -resize 512x512 \
        -quality 85 \
        -strip \
        -interlace Plane \
        assets/splash-optimized.png

    OPTIMIZED_SIZE=$(du -h assets/splash-optimized.png | cut -f1)
    echo "  ✓ Created: splash-optimized.png ($OPTIMIZED_SIZE)"
    echo ""
fi

# Optimize wallpaper_space.png
if [ -f "assets/wallpaper_space.png" ]; then
    ORIGINAL_SIZE=$(du -h assets/wallpaper_space.png | cut -f1)
    echo "📷 Optimizing wallpaper_space.png (Original: $ORIGINAL_SIZE)"

    convert assets/wallpaper_space.png \
        -resize 1920x1080\> \
        -quality 80 \
        -strip \
        -interlace Plane \
        assets/wallpaper_space-optimized.png

    OPTIMIZED_SIZE=$(du -h assets/wallpaper_space-optimized.png | cut -f1)
    echo "  ✓ Created: wallpaper_space-optimized.png ($OPTIMIZED_SIZE)"
    echo ""
fi

# Create WebP versions for modern browsers
echo "🌐 Creating WebP versions..."
echo ""

if command -v cwebp &> /dev/null; then
    if [ -f "assets/logo-optimized.png" ]; then
        cwebp -q 85 assets/logo-optimized.png -o assets/logo.webp
        echo "  ✓ Created: logo.webp"
    fi

    if [ -f "assets/splash-optimized.png" ]; then
        cwebp -q 85 assets/splash-optimized.png -o assets/splash.webp
        echo "  ✓ Created: splash.webp"
    fi

    if [ -f "assets/wallpaper_space-optimized.png" ]; then
        cwebp -q 80 assets/wallpaper_space-optimized.png -o assets/wallpaper_space.webp
        echo "  ✓ Created: wallpaper_space.webp"
    fi
else
    echo "  ⚠️  WebP tools not found. Skipping WebP conversion."
    echo "     Install with: brew install webp (macOS) or apt-get install webp (Ubuntu)"
fi

echo ""
echo "📊 Optimization Summary:"
echo "========================"
echo ""

# Show file sizes
ls -lh assets/*.png assets/*.webp 2>/dev/null | awk '{print $5 "\t" $9}'

echo ""
echo "✅ Optimization complete!"
echo ""
echo "📝 Next Steps:"
echo "1. Review the optimized images in the 'assets' folder"
echo "2. Replace original files if satisfied:"
echo "   mv assets/logo-optimized.png assets/logo.png"
echo "   mv assets/splash-optimized.png assets/splash.png"
echo "   mv assets/wallpaper_space-optimized.png assets/wallpaper_space.png"
echo "3. Update HTML to use WebP with PNG fallback (picture element)"
echo "4. Original files are backed up in: $BACKUP_DIR"
echo ""
echo "💡 Tip: Use WebP images for better performance!"
echo "   Modern browsers support WebP with 25-35% smaller file sizes."
echo ""
