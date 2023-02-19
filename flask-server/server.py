import io
import os
from flask import Flask,request,render_template
from flask_cors import CORS
import base64
import numpy as np
import cv2
import json
from main import handle
from flask_swagger_ui import get_swaggerui_blueprint

app= Flask(__name__)
CORS(app)

SWAGGER_URL = '/docs'  # URL for exposing Swagger UI (without trailing '/')
API_URL = '/static/swagger.json'  # Our API url (can of course be a local resource)

swaggerui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,  # Swagger UI static files will be mapped to '{SWAGGER_URL}/dist/'
    API_URL,
    config={  # Swagger UI config overrides
        'app_name': "Test app Dev Senior"
    },
)

app.register_blueprint(swaggerui_blueprint)
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
    # print(im_arr)# im_arr: image in Numpy one-dim array format.
    im_bytes = im_arr.tobytes()
    im_b64 = base64.b64encode(im_bytes)
    rs= json.dumps({"link":"data:image/png;base64,{}".format(im_b64.decode('utf-8'))})

    return rs
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)