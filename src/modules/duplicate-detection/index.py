#from DuplicateRemoverWithMetaData import find_duplicate
from DuplicateImageByHash import findDuplicateImages

import os
import json

import getopt
import sys

imageCachePath = "../../../app-cache/image-list.json"

argv = sys.argv[1:]
try:
    args = getopt.getopt(argv, 'hm:d', ['help', 'my_file='])
    if args[1] != '':
        imageCachePath = args[1][0]
except getopt.GetoptError:
    # Print a message or do something useful
    print('Something went wrong!')
    sys.exit(2)

with open(imageCachePath) as f:
  data = json.load(f)


# find duplicates based on origin date and exif offset of two images
# duplicate_img = find_duplicate(image_files,dirname)

#find duplicate based on file name
#duplicates = filesize_check(image_files,dirname)

def getFilePaths(fileInfo):
    return fileInfo["path"]

fileList = map(getFilePaths, data)

print(findDuplicateImages(fileList))