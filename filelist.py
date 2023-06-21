import os
import json

image_path = "images/"  # Replace with the actual path to your image directory

jpeg_files = [f for f in os.listdir(image_path) if f.endswith(".jpg") or f.endswith(".jpeg")]
sorted_files = sorted(jpeg_files)

with open(f"{image_path}/filelist.json", "w") as file:
    json.dump(sorted_files, file)
