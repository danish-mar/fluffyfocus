from PIL import Image, ImageDraw, ImageFont
import os
from datetime import datetime


def add_creation_date_to_images(directory):
    # Specify the directory path where the images are located
    image_dir = directory.rstrip('/')
    image_files = [f for f in os.listdir(image_dir) if f.endswith(('.jpg', '.jpeg', '.png', '.gif'))]

    for image_file in image_files:
        # Open the image file
        image_path = os.path.join(image_dir, image_file)
        image = Image.open(image_path)

        # Get the creation date of the image
        creation_date = os.path.getctime(image_path)
        creation_date = datetime.fromtimestamp(creation_date).strftime('%Y-%m-%d')

        # Add the creation date as a text overlay
        draw = ImageDraw.Draw(image)
        font = ImageFont.truetype("arial.ttf", 12)  # Replace with your desired font and size
        text = f"Created on: {creation_date}"
        text_width, text_height = draw.textsize(text, font=font)
        x = image.width - text_width - 10
        y = image.height - text_height - 10
        draw.text((x, y), text, fill=(255, 255, 255), font=font)  # Adjust fill and font color as needed

        # Save the modified image with the creation date
        image.save(image_path)

    print("Creation dates added to images.")


# Usage example:
directory = "images"  # Replace with the actual directory path where the images are located
add_creation_date_to_images(directory)
