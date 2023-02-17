import io
import os
from flask import Flask,request
from flask_cors import CORS
import base64
import numpy as np
import cv2
from main import handle


app= Flask(__name__)
CORS(app)



def readb64(code):
   nparr = np.frombuffer(base64.b64decode(code), np.uint8)
   img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
   return img

@app.route('/')
def hello():
    return 'Hello'
@app.route('/upload', methods=['POST'])
def upload():
    data=request.form.to_dict()

    face1=data['face1']
    face2=data['face2']
    imgdata1 = readb64(face1)
    imgdata2 = readb64(face2)
    rs=handle(imgdata1,imgdata2)
    im_arr = cv2.imencode('.jpg', rs)[1]
    print(im_arr)# im_arr: image in Numpy one-dim array format.
    im_bytes = im_arr.tobytes()
    im_b64 = base64.b64encode(im_bytes)
    return "data:image/png;base64,{}".format(im_b64.decode('utf-8'))
if __name__ == '__main__':
    app.run(host='0.0.0.0')