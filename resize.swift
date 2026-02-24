import AppKit
import Foundation

func resize(path: String, outPath: String, maxDim: CGFloat) {
    let url = URL(fileURLWithPath: path)
    guard let img = NSImage(contentsOf: url) else { 
        print("Err read \(path)"); return 
    }
    let origSize = img.size
    var newW = origSize.width
    var newH = origSize.height
    if newW > maxDim || newH > maxDim {
        if newW > newH {
            newH = maxDim * (newH / newW)
            newW = maxDim
        } else {
            newW = maxDim * (newW / newH)
            newH = maxDim
        }
    }
    let newSize = NSSize(width: newW, height: newH)
    let finalImg = NSImage(size: newSize)
    finalImg.lockFocus()
    img.draw(in: NSRect(origin: .zero, size: newSize), from: .zero, operation: .copy, fraction: 1.0)
    finalImg.unlockFocus()
    
    guard let tiff = finalImg.tiffRepresentation, let tiffData = NSBitmapImageRep(data: tiff) else { 
        print("Err tiff"); return 
    }
    
    let pngData = tiffData.representation(using: .png, properties: [:])
    do {
        try pngData?.write(to: URL(fileURLWithPath: outPath))
        print("Resized \(path) to \(outPath) successfully.")
    } catch {
        print("Error writing \(outPath): \(error)")
    }
}

let fm = FileManager.default
let currentPath = fm.currentDirectoryPath

resize(path: currentPath + "/assets/splash.png", outPath: currentPath + "/assets/splash.png", maxDim: 800)
resize(path: currentPath + "/assets/logo.png", outPath: currentPath + "/assets/logo.png", maxDim: 512)
