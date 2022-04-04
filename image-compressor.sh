#!/bin/bash
# ./src/imagesからjpeg jpg pngを取得
images=`find ./src/images -type f -name '*.jpg' -or -name '*.jpeg' -or -name '*.png'`

# ループ
for image in $images;
do
  # ディレクトリ名を取得
  dir_name=`dirname $image`

  extension=${image##*.}

  case $extension in
    "png" ) squoosh-cli --oxipng '{quality:70}' -d $dir_name $image | squoosh-cli --webp '{quality:70}' -d $dir_name $image;;
    "jpg" | "jpeg" ) squoosh-cli --mozjpeg '{quality:70}' -d $dir_name $image | squoosh-cli --webp '{quality:70}' -d $dir_name $image;;
  esac
done