from flask import *
from flask import request, jsonify
from werkzeug.utils import secure_filename
import datetime
import os
import hashlib
import cloudscript as cs
import pytz
from time import ctime
import datetime
#logging
IST = pytz.timezone('Asia/Kolkata')
ii = datetime.datetime.now(IST)
tii = ii.strftime('%Y/%m/%d  %H:%M:%S')
daylist = ctime().split()
day = daylist[0]
month = daylist[1]
#ti = f'{day} {month} {tii}'
#ti = ctime()
servertime = ctime()

global log

#log = open('App Logs.txt','+a')
#log.seek(0,2)

def lw(statement):
    #global log
    IST = pytz.timezone('Asia/Kolkata')
    ii = datetime.datetime.now(IST)
    tii = ii.strftime('%d/%m/%Y  %H:%M:%S')
    daylist = ctime().split()
    day = daylist[0]
    month = daylist[1]
    ti = f'{day} {month} {tii}'

    log = open('App Logs.txt','+a')
    log.seek(0,2)
    state = str(statement)
    log.write(f'[{ti}]  >  {state} \n')
    log.close()

def lwa(statement,client):
    #global log
    IST = pytz.timezone('Asia/Kolkata')
    ii = datetime.datetime.now(IST)
    tii = ii.strftime('%d/%m/%Y  %H:%M:%S')
    daylist = ctime().split()
    day = daylist[0]
    month = daylist[1]
    ti = f'{day} {month} {tii}'

    log = open('API Logs.txt','+a')
    log.seek(0,2)
    state = str(statement)
    log.write(f'[{ti}]  >  API : {client}  >  {state} \n')
    log.close()


def lwl():
    #global log
    log = open('App Logs.txt','+a')
    log.seek(0,2)
    log.write('\n')
    log.close()

def lwll():
    log = open('API Logs.txt','+a')
    log.seek(0,2)
    #log.write('\n')
    log.write("====================================================================")
    log.write('\n')
    log.close()



app = Flask(__name__)
app.secret_key =  "PRARENT_792739"
#app.config['PERMANENT_SESSION_LIFETIME'] = datetime.timedelta(days=360000)
#app.config['SESSION_PERMANENT']=True
APP_ROOT = os.path.dirname(os.path.abspath(__file__))
UPLOAD_FOLDER = os.path.join(APP_ROOT, 'down_files')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
TEMP_FOLDER = os.path.join(APP_ROOT, 'temp_files')
app.config['TEMP_FOLDER'] = TEMP_FOLDER

@app.route('/')
def home():
    #return redirect(url_for('intro'))
    return jsonify("ERROR : contact the correct endpoint for the API")

@app.route('/api/testfile')
def sendtest():
    return send_file("ServiceKey_GoogleCloud.json",as_attachment=True)

@app.route('/api/recievefile',methods=['POST', 'GET'])
def recievetest():
    if request.method == 'POST':
        #raw = request.get_data()
        # with open("rawdata1.txt", "wb") as f:
        #     f.write(raw)
        # f.close()
        # send the file name in args :: ?name=<photoname>
        #r = requests.post('http://127.0.0.1:5000/api/recievefile?name=test.jpg',files={'image' : a})
        #j = request.json
        #print(request.files)
        if request.files:
            f = request.files['image']
            fname = request.args.get('name')
            print(fname)
            f.save(os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(fname)))
        #fname = j['name']
        #jdata = request.get_json()
        fn = request.json['name']
        print("jdata = ",fn)


        # fname = fn
        # f.save(secure_filename(fname))

        return jsonify("File recieved successfully")
    else:
        return jsonify("ERROR : contact the correct endpoint or method - post for the API")

@app.route('/api/getusr',methods=['GET'])
def api_getusr():
    uname = request.args.get('username')
    client = request.args.get('client')
    jres = cs.getuser(uname)
    lwll()
    lwa(f"GETUSR::{uname}",client)
    lwll()
    return jsonify(jres)

@app.route('/api/loadblob',methods=['GET','POST'])        #name = userid & client
def load_blob():
    if request.method == 'POST':
        blobname = request.args.get('name')
        client = request.args.get('client')

        if blobname:
            if request.files:
                f = request.files['image']
                #g = request.form.get('name')
                #print("form in data : " , g)
                fname = blobname
                print(fname)
                f.save(os.path.join(app.config['TEMP_FOLDER'], secure_filename(fname)))
                #jres = cs.load_blob(blobname,os.path.join(app.config['TEMP_FOLDER'], secure_filename(fname)),)
                lwll()
                lwa(f'Load Blob::{fname}',client)
                lwll()
                return make_response(jsonify(secure_filename(fname)),201)
            else:
                lwll()
                lwa(f'ERROR:No file upload > Load Blob::{fname}',client)
                lwll()
                respo = make_response(jsonify("no file uploaded"),400)
                return respo
        else:
            lwll()
            lwa(f'ERROR:No filename args > Load Blob::{fname}',client)
            lwll()
            respo = make_response(jsonify("no filename args"),400)
            return respo
    else:
        lwll()
        lwa(f'ERROR:GET req > Load Blob::{fname}',client)
        lwll()
        respo = make_response(jsonify("ERROR : contact the correct endpoint or method - post for the API"),400)
        return respo

@app.route('/api/setusr',methods=['GET','POST'])
def api_setusr():
    if request.method ==  'POST':
        uname = request.json['username']
        #print(uname)
        passwd = request.json['password']
        client = request.json['client']
        email = request.json['email']
        age = request.json['age']
        gender =  request.json['gender']
        tags = request.json['tags']
        bio = request.json['bio']
        profession = request.json['profession']
        pimg = request.json['pimg']

        jres = cs.setuser(uname,passwd,email,age,gender,tags,bio,profession,pimg)
        if jres == True:
            lwll()
            lwa(f"SETUSR::{uname}",client)
            lwll()
            return make_response(jsonify("New user created successfully"),200)
        else:
            lwll()
            lwa(f"ERROR:Cloud error > SETUSR::{uname}",client)
            lwll()
            return make_response(jsonify("ERROR : New user not created"),400)
    else:
        lwll()
        lwa(f"ERROR:GET req > SETUSR::{uname}",client)
        lwll()
        respo = make_response(jsonify("ERROR : contact the correct endpoint or method - post for the API"),400)
        return respo






def matchpass(uid , passwd):
    #get hash from sql to uid -> hashuid
    hashuid = ""
    newhash=hashlib.md5(passwd.encode()).hexdigest()
    if hashuid == newhash:
        return True
    else:
        return False
def savepass(usrname,passwd):
    #save passwd hash into sql
    hashid = hashlib.md5(passwd.encode()).hexdigest()
    #save the hashid in sql with corresponding uid
    res = cs.setuser(usrname,passwd)
    if res:
        respo = make_response("sucess",201)
        return respo
    else:
        respo = make_response("username already taken",400)
        return respo




#main runtime
if __name__ == '__main__':
    app.run(debug=True)