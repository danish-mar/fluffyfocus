import json

# Open the file and load the content into data
with open('images/filelist.json', 'r') as jsfile:
    data = json.load(jsfile)

# Sort the data in ascending order
data.sort(key=lambda x: int(x.split('.')[0]))

# Save the sorted data back to the file
with open('images/filelist.json', 'w') as jsfile:
    json.dump(data, jsfile)
