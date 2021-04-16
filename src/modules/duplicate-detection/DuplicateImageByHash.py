from PIL import Image
import imagehash

import os
import numpy as np

HASH_SIZE = 8

hashTable = []

def findDuplicateImages(imagePathsList):

    duplicateImageList = []
    for imagePath in imagePathsList:

        img = Image.open(imagePath)
        avgHash = imagehash.average_hash(img, HASH_SIZE)
        # duplicate condition
        if avgHash in hashTable:
            duplicateImageList.append(imagePath)
        else :
            hashTable.append(avgHash)

    if len(duplicateImageList) != 0:

        return duplicateImageList
    else :
        return []






