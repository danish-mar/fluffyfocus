import os
import sys

def rename_files():
    # Get the list of files in the current directory
    files = os.listdir()

    # Get the name of the script file
    script_name = os.path.basename(sys.argv[0])

    # Iterate through the files and rename them
    for i, file_name in enumerate(files):
        # Check if the file is the script itself or a directory
        if file_name == script_name or os.path.isdir(file_name):
            continue

        # Split the file name and extension
        name, ext = os.path.splitext(file_name)
        
        # Construct the new file name
        new_name = str(i + 1) + ext

        # Check if the new file name already exists
        if os.path.exists(new_name):
            print(f"Error: File with name '{new_name}' already exists. Skipping rename for '{file_name}'")
            continue
        
        # Rename the file
        try:
            os.rename(file_name, new_name)
            print(f"Renamed '{file_name}' to '{new_name}'")
        except OSError as e:
            print(f"Error renaming '{file_name}': {e}")

# Call the function to rename files
rename_files()
