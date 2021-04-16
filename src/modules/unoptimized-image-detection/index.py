from PIL import Image
import getopt
import sys
import json

from imageUtils import *

imageCachePath = "../../../app-cache/image-list.json"

argv = sys.argv[1:]
try:
    args = getopt.getopt(argv, 'hm:d', ['help', 'my_file='])
    if args[1] != '':
        imageCachePath =  args[1][0]
except getopt.GetoptError:
    # Print a message or do something useful
    print('Something went wrong!')
    sys.exit(2)

with open(imageCachePath) as f:
  data = json.load(f)

unoptimizedFileList =[]

for file in data:
    img = Image.open(file["path"])

    isOptimized = isImageOptimized(img, file["size"] ,file["path"])

    if isOptimized != "optimized" :
        unoptimizedFileList.append(file["path"])


print(unoptimizedFileList)


