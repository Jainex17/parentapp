#cd s:\programming\projects\parentapp-backend;Set-ExecutionPolicy Unrestricted -Scope Process;.\venv\Scripts\Activate.ps1
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
import time
import threading
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

@app.route('/api/getusr',methods=['GET'])          #name = username & client
def api_getusr():
    uname = request.args.get('username')
    client = request.args.get('client')
    jres = cs.getuser(uname)
    if jres:
        lwll()
        lwa(f"GETUSR::{uname}",client)
        lwll()
        return jsonify(jres)
    else:
        lwll()
        lwa(f"ERROR:User not found > GETUSR::{uname}",client)
        lwll()
        return make_response(jsonify("User not found"),400)

@app.route('/api/verifyusr',methods=['GET'])          #username = username & client , password=usrpasswd
def matchpass():
    uname = request.args.get('username')
    passwd = request.args.get('password')
    client = request.args.get('client')
    jres = cs.getuser(uname)
    if jres:
        hashuid = jres['hash']
        newhash=hashlib.md5(passwd.encode()).hexdigest()
        if hashuid == newhash:
            lwll()
            lwa(f"VERIFYPASS::{uname} :: SUCCESS",client)
            lwll()
            return make_response(jsonify("User password matched"),200)
        else:
            lwll()
            lwa(f"VERIFYPASS::{uname} :: FAIL",client)
            lwll()
            return make_response(jsonify("User password not matched"),400)
    else:
        lwll()
        lwa(f"ERROR:User not found > VERIFYUSR::{uname}",client)
        lwll()
        return make_response(jsonify("User not found"),400)
        

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

@app.route('/api/setusr',methods=['GET','POST'])           #JSON : username,password,client,email,age,gender,tags,bio,profession,pimg
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

@app.route('/api/createpost',methods=['GET','POST'])            #JSON : username,client,tags,desc,title,photo,ptype
def api_createpost():
    if request.method ==  'POST':
        username = request.json['username']
        #print(uname)
        title = request.json['title']
        disc = request.json['disc']
        #post = request.json['post']
        client = request.json['client']
        tags = request.json['tags']
        photo = request.json['photo']
        ptype = request.json['ptype']
        jres = cs.create_post(username,photo,title,disc,ptype,tags)
        if jres:
            lwll()
            lwa(f"CREATEPOST::{username}",client)
            lwll()
            return make_response(jsonify("New post created successfully"),200)
        else:
            lwll()
            lwa(f"ERROR:Cloud error > CREATEPOST::{username}",client)
            lwll()
            return make_response(jsonify("ERROR : New post not created"),400)
    else:
        client = request.args.get('client')
        uname = request.args.get('user')
        lwll()
        lwa(f"ERROR:GET req > CREATEPOST::{uname}",client)
        lwll()
        respo = make_response(jsonify("ERROR : contact the correct endpoint or method - post for the API"),400)
        return respo

@app.route('/api/getpost',methods=['GET'])        # username = username & client , pid
def api_getpost():
    username = request.args.get('username')
    client = request.args.get('client')
    pid = request.args.get('pid')
    if (pid and username):
        jres = cs.get_post(username,pid)
        if jres:
            lwll()
            lwa(f"GETPOST::{username}::{pid}",client)
            lwll()
            return jsonify(jres)
        else:
            lwll()
            lwa(f"ERROR:User not found > GETPOST::{username}::{pid}",client)
            lwll()
            return make_response(jsonify("User not found"),400)
    else:
        lwll()
        lwa(f"ERROR:No pid or username > GETPOST",client)
        lwll()
        return make_response(jsonify("ERROR : No pid or username given"),400)

@app.route('/api/getallposts',methods=['GET'])        # username = username & client
def api_getallposts():
    username = request.args.get('username')
    client = request.args.get('client')
    
    if (username):
        jres = cs.get_all_posts(username)
        if jres:
            lwll()
            lwa(f"GETALLPOSTS::{username}",client)
            lwll()
            return jsonify(jres)
        else:
            lwll()
            lwa(f"ERROR:User not found > GETALLPOSTS::{username}",client)
            lwll()
            return make_response(jsonify("User not found"),400)
    else:
        lwll()
        lwa(f"ERROR:No username > GETALLPOSTS",client)
        lwll()
        return make_response(jsonify("ERROR : No username given"),400)

@app.route('/api/getallusers',methods=['GET'])        # client
def api_getallusers():
    #username = request.args.get('username')
    client = request.args.get('client')
    
    if (True):
        jres = cs.get_all_users()
        if jres:
            lwll()
            lwa(f"GETALLUSERS::",client)
            lwll()
            return jsonify(jres)
        else:
            lwll()
            lwa(f"ERROR:Users not found > GETALLUSERS::",client)
            lwll()
            return make_response(jsonify("Users not found"),400)
    else:
        lwll()
        lwa(f"ERROR:No username > GETALLPOSTS",client)
        lwll()
        return make_response(jsonify("ERROR : No username given"),400)


@app.route('/api/getallpostsbytag',methods=['GET'])        # tag = single tag & client
def api_getallpostsbytag():
    tag = request.args.get('tag')
    client = request.args.get('client')
    
    if (tag):
        jres = cs.get_all_posts_by_tag(tag)
        if jres:
            lwll()
            lwa(f"GETALLPOSTSBYTAG::{tag}",client)
            lwll()
            return jsonify(jres)
        else:
            lwll()
            lwa(f"ERROR:Posts not found > GETALLPOSTSBYTAG::{tag}",client)
            lwll()
            return make_response(jsonify("Posts not found"),400)
    else:
        lwll()
        lwa(f"ERROR:No tag > GETALLPOSTSBYTAG",client)
        lwll()
        return make_response(jsonify("ERROR : No tag given"),400)


@app.route('/api/getallpostsbytags',methods=['GET'])        # tags = multiple tag & client
def api_getallpostsbytags():
    tags = request.args.get('tags')
    client = request.args.get('client')
    
    if (tags):
        jres = cs.get_all_posts_by_tags(tags)
        if jres:
            lwll()
            lwa(f"GETALLPOSTSBYTAGS::{tags}",client)
            lwll()
            return jsonify(jres)
        else:
            lwll()
            lwa(f"ERROR:Posts not found > GETALLPOSTSBYTAGS::{tags}",client)
            lwll()
            return make_response(jsonify("Posts not found"),400)
    else:
        lwll()
        lwa(f"ERROR:No tag > GETALLPOSTSBYTAGS",client)
        lwll()
        return make_response(jsonify("ERROR : No tag given"),400)

@app.route('/api/getallpostsbyuser',methods=['GET'])        # username = username & client
def api_getallpostsbyuser():
    username = request.args.get('username')
    client = request.args.get('client')
    
    if (username):
        jres = cs.get_all_posts_by_user(username)
        if jres:
            lwll()
            lwa(f"GETALLPOSTSBYUSER::{username}",client)
            lwll()
            return jsonify(jres)
        else:
            lwll()
            lwa(f"ERROR:Posts not found > GETALLPOSTSBYUSER::{username}",client)
            lwll()
            return make_response(jsonify("Posts not found"),400)
    else:
        lwll()
        lwa(f"ERROR:No username > GETALLPOSTSBYUSER",client)
        lwll()
        return make_response(jsonify("ERROR : No username given"),400)

@app.route('/api/likepost',methods=['GET'])        # username = post_username & client , pid uu = liking_username
def api_likepost():
    username = request.args.get('username')
    client = request.args.get('client')
    pid = request.args.get('pid')
    uu  = request.args.get('uu')   # user who is doing the action
    if (pid and username):
        jres = cs.like_post(username,pid,uu)
        if jres:
            lwll()
            lwa(f"LIKEPOST::{username}::{pid}",client)
            lwll()
            return make_response(jsonify(jres),200)
        else:
            lwll()
            lwa(f"ERROR:User not found or post liked by user> LIKEPOST::{username}::{pid}",client)
            lwll()
            return make_response(jsonify("User not found or post liked by user"),400)
    else:
        lwll()
        lwa(f"ERROR:No pid or username > LIKEPOST",client)
        lwll()
        return make_response(jsonify("ERROR : No pid or username given"),400)

@app.route('/api/unlikepost',methods=['GET'])        # username = post_username & client , pid uu = liking_username
def api_unlikepost():
    username = request.args.get('username')
    client = request.args.get('client')
    pid = request.args.get('pid')
    uu  = request.args.get('uu')   # user who is doing the action
    if (pid and username):
        jres = cs.unlike_post(username,pid,uu)
        if jres:
            lwll()
            lwa(f"UNLIKEPOST::{username}::{pid}",client)
            lwll()
            return make_response(jsonify(jres),200)
        else:
            lwll()
            lwa(f"ERROR:User not found or post not liked by user> UNLIKEPOST::{username}::{pid}",client)
            lwll()
            return make_response(jsonify("User not found or post not liked by user"),400)
    else:
        lwll()
        lwa(f"ERROR:No pid or username > UNLIKEPOST")
        lwll()
        return make_response(jsonify("ERROR : No pid or username given"),400)

@app.route('/api/alldb', methods=["GET"])
def alldb():
    jres = cs.get_all()
    return jsonify(jres)



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


# def clear_temp():
#     time = datetime.datetime.now()
#     for file in os.listdir(app.config['TEMP_FOLDER']):
#         if os.path.isfile(os.path.join(app.config['TEMP_FOLDER'], file)):
#             creation_time = os.path.getctime(os.path.join(app.config['TEMP_FOLDER'], file))
#             if (time - creation_time) // (24 * 3600) > 1:
#                 os.remove(os.path.join(app.config['TEMP_FOLDER'], file))
#                 print(f"deleted {file}")
    
# def clear_temp_daily():
#     clear_temp()  # Call the clear_temp function
#     threading.Timer(86400, clear_temp_daily).start()  # Schedule the next execution after 24 hours
# Start the daily clearing of temp files
    
# clear_temp_daily()


#main runtime
if __name__ == '__main__':
    app.run(debug=True)
