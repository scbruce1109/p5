import os
from p5site.models import Sketch




def sketch_to_model():
    directory = os.fsencode('C:\\Users\\bruce\\OneDrive\\Documents\\Art\\Processing\\p5\\static_p5\\js\\sketches')

    for file in os.listdir(directory):
        filename = os.fsdecode(file)
        try:
            if filename.split('.')[1] == 'js':

                sketch_obj, created = Sketch.objects.new_or_get(filename.split('.')[0])
                print(filename.split('.')[0] + " created " + str(created))

        except:
            print('attempt failed for '+filename)
