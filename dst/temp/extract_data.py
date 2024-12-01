# extract "data" content from the json file
import json
import os
import sys

def extract_data(file_path):
    with open(file_path, 'r') as f:
        data = json.load(f)
    return data["data"]["introduces"]

if __name__ == '__main__':
    file_path = sys.argv[1]
    file_name = os.path.basename(file_path)
    dir_path = os.path.dirname(file_path)
    data = extract_data(file_path)
    # export data to a new txt file
    # print(data)
    # print(file_path, file_name, dir_path)
    with open(os.path.join(dir_path, file_name.replace('.json', '.md')), 'w') as f:
        f.write(data)
    
    