import getopt
import sys
import json
import cv2

import numpy as np
from Utils import *


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

#print(json.dumps(data))

def checkBlurriness(filename):
    BLUR_THRESHOLD_VALUE = 100

    image = cv2.imread(filename)
    ratio = image.shape[0] / 500.0
    orig = image.copy()
    image = Utils.resize(image, height = 500)

    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    fm = cv2.Laplacian(gray, cv2.CV_64F).var()

    if fm < 150:
        return filename
    else :
        return "sharp"


def getFilePaths(fileInfo):
    return fileInfo["path"]

fileList = map(getFilePaths, data)

blurredFileList = []

for file in fileList:

    isBlurred = checkBlurriness(file)

    if isBlurred != "sharp" :
        blurredFileList.append(file)

print(blurredFileList)

