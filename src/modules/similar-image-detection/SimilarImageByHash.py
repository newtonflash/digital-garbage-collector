from PIL import Image
import imagehash

import os
import numpy as np

HASH_SIZE = 8
MIN_SIMILARITY=80
# this dictionary creates source image and all other images in as key value pair
similarImagesCollections = []

# this list helps tracking all items that are similar
globalSimilarImagesList = []

def populateHashTable ( imagePathsList):
    hashTable = {}
    for imagePath in imagePathsList:

        with Image.open(imagePath) as img:
            hash = imagehash.average_hash(img, HASH_SIZE).hash
            hashTable.__setitem__(imagePath,hash)

    return hashTable

def findSimilarImagesForAnImage(sourceImagePath, imagePathsList, hashTable):
    threshold = 1 - MIN_SIMILARITY / 100
    diffLimit = int(threshold*(HASH_SIZE ** 2))

    sourceHash = hashTable[sourceImagePath]

    similarImages = []
    for imagePath in imagePathsList:
        targetHash = hashTable[imagePath]
        diff = np.count_nonzero(sourceHash != targetHash)
        if diff != 0 and diff <= diffLimit:
            similarImages.append(imagePath)
            globalSimilarImagesList.append(imagePath)

    if len(similarImages) > 0 :
        similarImages.insert(1, sourceImagePath)

        similarImagesCollections.append(similarImages)
        globalSimilarImagesList.append(sourceImagePath)



def searchSimilarImages (imagePathsList):
    imagePathsList = list(imagePathsList)


    # cache the hashes in one go.
    hashTable = populateHashTable(imagePathsList)

    for imagePath in imagePathsList:
        if imagePath not in globalSimilarImagesList:
            findSimilarImagesForAnImage(imagePath, imagePathsList, hashTable)


    return similarImagesCollections




