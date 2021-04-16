from PIL import Image

def calculateOptimizedFileSize(image):
    # this file size is in kbs
    expectedImageSize = 0

    pixels = image.width * image.height


    if pixels > 4096:
        expectedImageSize = pixels / 4.0
    else:
        expectedImageSize = pixels / 0.4

    return expectedImageSize



def isImageOptimized(image, fileSize, imagePath):
    expectedMaxImageSize = calculateOptimizedFileSize(image)

    if fileSize > expectedMaxImageSize:
        return imagePath
    else:
        return "optimized"

def resizeImage (image, imagePath, qualityFactor):
    return "ok"