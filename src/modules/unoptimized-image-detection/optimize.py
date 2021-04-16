from PIL import Image
import getopt
import sys

def optimizeImage(imagePath):
    image = Image.open(imagePath)
    # 82% quality is more or less optimizes the images to desired quality
    # how ever this figure has to be driven by content in the image, this quality param
    # is to be determined by AI later
    image.save(imagePath, quality=82)
    return "success"

# for future use
def optimizeImages(imgArr):
    for img in imgArr:
        optimizeImage(img)
    return "success"


argv = sys.argv[1:]
try:
    args = getopt.getopt(argv, 'hm:d', ['help', 'my_file='])
    if args[1] != '':
        pathOfImageToOptimize =  args[1][0]
except getopt.GetoptError:
    # Print a message or do something useful
    print('Something went wrong!')
    sys.exit(2)


optimizeImage(pathOfImageToOptimize)