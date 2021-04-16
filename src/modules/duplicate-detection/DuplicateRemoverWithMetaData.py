import os
from PIL import Image
from PIL.ExifTags import TAGS

duplicate_img= []


# We are checking following meta data : DateTime and ExifOffset
def check_metadata(exifdata,exifdata1,image,other_img,duplicate_img):
    image_origin = ''
    image_origin1 = ''
    exifoffset = ''
    exifoffset1 = ''
    # image DateTime is capable to identify the duplicate rotated imagess
    for tagid in exifdata:
        tagname = TAGS.get(tagid, tagid)
        value = exifdata.get(tagid)
        if (tagname == "DateTime"):
            image_origin = value
            if (tagname == "ExifOffset"):
                exifoffset = value
    for tagid1 in exifdata1:
        tagname1 = TAGS.get(tagid1, tagid1)
        value1 = exifdata.get(tagid1)
        if (tagname1 == "DateTime"):
            image_origin1 = value1
        if (tagname1 == "ExifOffset"):
            exifoffset1 = value

    # Compare date of origin of two images
    if(image_origin and image_origin1):
        if(image_origin == image_origin1):
            if not other_img in duplicate_img:
                duplicate_img.append(other_img)

    #compare exifoffset of two images
    if(exifoffset and exifoffset1):
        if(exifoffset == exifoffset1):
            if not other_img in duplicate_img:
                duplicate_img.append(other_img)

    return duplicate_img

def find_duplicate(image_files):
    print(image_files)

    for image in image_files:
        if not image in duplicate_img:
            img = Image.open(image)
            exifdata = img._getexif()
            if(exifdata):
                for other_img in image_files:
                    if(image != other_img):
                        image_check = Image.open(other_img))
                        exifdata1 = image_check._getexif()

                        # checks if metadata is exactly equal for two image files
                        if(exifdata == exifdata1):
                            duplicate_img.append(other_img)
                        else:
                            list_of_duplicate_images = check_metadata(exifdata,exifdata1,image,other_img,duplicate_img)
    return list_of_duplicate_images
