from  PIL import Image as Img
import os

root = 'E:\\code\\01doc\\map-web\\3D-Buildings\\3DModel'
outDir = 'E:\\code\\01doc\\map-web\\3D-Buildings\\min-img-20'

def compress(file, inDir, outDir, quality):
    # 打开图片
    image = Img.open(inDir + '\\' + file)
    # 图片另存到output文件夹中，图片质量压缩
    image.save(outDir + '\\' + file, quality=quality)

def listFiles(dir, format='.jpg'):
    fileList = []
    for file in os.listdir(dir):
      if file.find(format) != -1:
        fileList.append(file)
        compress(file, root, outDir, 20)
        print(file)
    return fileList

if __name__ == '__main__':
    listFiles(root)