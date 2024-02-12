#cd s:\programming\projects\parentapp-backend;Set-ExecutionPolicy Unrestricted -Scope Process;.\venv\Scripts\Activate.ps1
# from google.cloud import storage
# os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = r'ServiceKey_GoogleCloud.json'
# sc = storage.Client()
# bucket_name = "parent-app"
import os
import firebase_admin
from firebase_admin import credentials
import pyrebase
import hashlib
import json
import pytz , datetime
# cred = credentials.Certificate("creds.json")
# firebase_admin.initialize_app(cred, {'storageBucket': 'parentapp-df60c.appspot.com'} , {'databaseURL':'https://parentapp-df60c-default-rtdb.asia-southeast1.firebasedatabase.app/'})

APP_ROOT = os.path.dirname(os.path.abspath(__file__))
UPLOAD_FOLDER = os.path.join(APP_ROOT, 'down_files')
TEMP_FOLDER = os.path.join(APP_ROOT, 'temp_files')

config = {
  "apiKey": "AIzaSyDa5R_ayaijAtGa5ADZ8f8IzShkH37ABb4",
  "authDomain": "parentapp-df60c.firebaseapp.com",
  "databaseURL": "https://parentapp-df60c-default-rtdb.asia-southeast1.firebasedatabase.app",
  "projectId": "parentapp-df60c",
  "storageBucket": "parentapp-df60c.appspot.com",
  "messagingSenderId": "327020414484",
  "appId": "1:327020414484:web:3be14f20affb92760d8901",
  "measurementId": "G-FERY2B8V79",
  "serviceAccount": "creds.json",
  "databaseURL": "https://parentapp-df60c-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

firebase = pyrebase.initialize_app(config)
storage = firebase.storage()
db = firebase.database()

# storage.child('post_images/test1.jpg').put(os.path.join(UPLOAD_FOLDER,'test.jpg'))   upload img
# storage.child("post_images/").download("test1.jpg","testimg.jpg")                    dowmload img

#load media

def load_blob(blob_path,blob_name,server_path,easypath=True):  #temp-name , id-name , folder-name
    if easypath:
        spath = f"{server_path}/{blob_name}"
        ppath = os.path.join(TEMP_FOLDER,blob_path)
        try:
            storage.child(spath).put(ppath)
            url = storage.child(spath).get_url(None)
        except:
            return False
        return url
    else:
        spath = f"{server_path}/{blob_name}"
        ppath = blob_path
        try:
            storage.child(spath).put(ppath)
            url = storage.child(spath).get_url(None)
        except:
            return False

###userset
def setuser(username,passwd,email,age,gender,tags,bio,profession,pimg):
    c = db.child("test1").child("users").child("GLOBALCOUNTER").get()
    all = db.child("test1").child("users").get()
    allusr = all.val().get(username)
    
    if allusr==None:
        f = False
        for usr in all.each():
            e = usr.val().get("email")
            if e == email:
                print("same email error")
                return False
            else:
                f = True
        if f:
            count = c.val().get('counter')
            count = int(count) +1
            ident = f'N_usr_{count}'
            hashid = str(hashlib.md5(passwd.encode()).hexdigest())
            email = str(email) #string
            age = int(age)     #integer
            gender = str(gender) #string 
            tags = str(tags).split(sep=',')   #list of tags
            bio = str(bio)  #string
            # pimg = f"{ident}_pimg"
            profession = str(profession) #string
            posts = [""]
            url = load_blob(pimg,ident,"profile_images")
            if url == False:
                print("photo url error")
                return False
            else:
                jdata = {"usrname": username, 
                        "passwd": passwd, 
                        "id": ident, 
                        "hash": hashid,
                        "email": email,
                        "age": age,
                        "gender": gender,
                        "tags": tags,
                        "bio": bio,
                        "profession": profession,
                        "posts": posts,
                        "pimg":url}
                # db.child("test1").child("users").child(f'N_usr_{count}').set({"usrname": username, "passwd": passwd})
                db.child("test1").child("users").child(username).set(jdata)
                db.child("test1").child("users").child("GLOBALCOUNTER").update({"counter": count})
                return True
        else:
            print('same email error?')
            return False
    else:
        print('same username error')
        return False

def getuser(username):                                   #min : 230 bytes
    info = db.child("test1").child("users").child(username).get()
    if info.val()==None:
        return False
    else:
        passwd = info.val().get("passwd")
        usrname = info.val().get("usrname")
        ident = info.val().get("id")
        hashid = info.val().get("hash")
        email = info.val().get("email")
        age = info.val().get("age")
        gender = info.val().get("gender")
        tags = info.val().get("tags")   #list
        bio = info.val().get("bio")
        profession = info.val().get("profession")
        posts = info.val().get("posts") #list
        url = info.val().get("pimg")
        # m = ""
        # for i in a:
        #     m+=i+' '

        userinfo = {"usrname": usrname, 
                    "passwd": passwd, 
                    "id": ident, 
                    "hash": hashid,
                    "email": email,
                    "age": age,
                    "gender": gender,
                    "tags": tags,
                    "bio": bio,
                    "profession": profession,
                    "posts": posts,
                    "pimg": url}
        userinfo = json.loads(str(userinfo).replace("'",'"'))   #fixed error
        #userinfo = str(userinfo).replace("'",'"')
        return userinfo  #json
    # print(f"usrname : {usrname} and passwd : {passwd} and id : {ident}")



def create_post(username,photo,title,disc,ptype,tags):
    usr = getuser(username)
    if usr == False:
        print("username error")
        return False
    else:
        usrid = usr['id']
        past_plist = usr['posts']
        p = db.child("test1").child("users").child("GLOBALPOST").get()
        pno = p.val().get('counter')
        pno = int(pno) + 1
        postid = f'U_post_{pno}'
        title = str(title)
        disc = str(disc)
        IST = pytz.timezone('Asia/Kolkata')
        ii = datetime.datetime.now(IST)
        timestamp = ii.strftime('%d/%m/%Y_%H:%M:%S')
        ptype = str(ptype)
        if ptype == "post" or ptype == "question":
            tags = str(tags).split(sep=',')   #list of tags
            likes = {"total": 0}
            comments = {"total": 0, 
                        "usrnames": [""],
                        "comments": [""]}
            
            url = load_blob(photo,postid,"post_images")
            if url == False:
                print("photo url error")
                return False
            else:
                jdata = {"title": title,  
                        "disc": disc, 
                        "usrname": username,
                        "usrid": usrid,
                        "postid": postid,
                        "ptype": ptype,
                        "tags": tags,
                        "like": likes,
                        "comment": comments,
                        "timestamp": timestamp,
                        "url" : url}               #11 elements
                
                db.child("test1").child("posts").child(username).child(postid).set(jdata)
                db.child("test1").child("users").child("GLOBALPOST").update({"counter": pno})
                past_plist.append(postid)
                # db.child("test1").child("users").child(username).child('posts').update(past_plist)
                usr['posts'] = past_plist
                db.child("test1").child("users").child(username).set(usr)
                return f"{username}**!**{postid}"      #return pid
        else:
            print("ptype error")
            return False
        # storage.child(f"post_images/{postid}.jpg").put(photopath)
        # url = storage.child(f"post_images/{postid}.jpg").get_url(None)
        # d={"title":title,"disc":disc,"photo":url}
        # db.child("test1").child("users").child("GLOBALPOST").update({"counter": pno+1})
        # db.child("test1").child("users").child(f"usr_{usrid}").child("posts").update({postid:d})

def get_post(username,pid):
    # username = pid.split(sep='**!**')[0]
    # postid = pid.split(sep="**!**")[1]
    postid = pid
    try:
        post = db.child("test1").child("posts").child(username).child(postid).get()

        title = post.val().get("title")
        disc = post.val().get("disc")
        usrname = post.val().get("usrname")
        usrid = post.val().get("usrid")
        ptype = post.val().get("ptype")
        tags = post.val().get("tags")
        likes = post.val().get("like")
        comments = post.val().get("comment")
        timestamp = post.val().get("timestamp")
        url = post.val().get("url")
        postinfo = {"title": title, 
                    "disc": disc, 
                    "usrname": usrname,
                    "usrid": usrid,
                    "postid": postid,
                    "ptype": ptype,
                    "tags": tags,
                    "like": likes,
                    "comment": comments,
                    "timestamp": timestamp,
                    "url" : url}
        postinfo = json.loads(str(postinfo).replace("'",'"'))   #fixed error
        return postinfo
    except Exception as e:
        print(e)
        return False
    
def get_all_posts(username):
    allposts = db.child("test1").child("posts").child(username).get()
    if allposts.val() == None:
        return False
    else:
        posts = []
        for post in allposts.each():
            title = post.val().get("title")
            disc = post.val().get("disc")
            usrname = post.val().get("usrname")
            usrid = post.val().get("usrid")
            ptype = post.val().get("ptype")
            tags = post.val().get("tags")
            likes = post.val().get("like")
            comments = post.val().get("comment")
            timestamp = post.val().get("timestamp")
            url = post.val().get("url")
            # postid = post.key()
            postid = post.val().get("postid")
            postinfo = {"title": title, 
                        "disc": disc, 
                        "usrname": usrname,
                        "usrid": usrid,
                        "postid": postid,
                        "ptype": ptype,
                        "tags": tags,
                        "like": likes,
                        "comment": comments,
                        "timestamp": timestamp,
                        "url" : url}
            postinfo = json.loads(str(postinfo).replace("'",'"'))   #fixed error
            posts.append(postinfo)
        return posts[::-1]       #reverse list to make it descending order by default

def get_all_users():
    allusers = db.child("test1").child("users").get()
    if allusers.val() == None:
        return False
    else:
        users = []
        for user in allusers.each():
            usrname = user.val().get("usrname")
            passwd = user.val().get("passwd")
            ident = user.val().get("id")
            hashid = user.val().get("hash")
            email = user.val().get("email")
            age = user.val().get("age")
            gender = user.val().get("gender")
            profilepic=user.val().get('pimg')
            tags = user.val().get("tags")
            bio = user.val().get("bio")
            profession = user.val().get("profession")
            posts = user.val().get("posts")

            userinfo = {"usrname": usrname, 
                        "passwd": passwd, 
                        "id": ident, 
                        "hash": hashid,
                        "email": email,
                        "age": age,
                        'profilepic':profilepic,
                        "gender": gender,
                        "tags": tags,
                        "bio": bio,
                        "profession": profession,
                        "posts": posts}
            
            users.append(userinfo)
        return users

def get_all_posts_by_tag(tag):                   #single tag
    allposts = db.child("test1").child("posts").get()
    if allposts.val() == None:
        return False
    else:
        posts = []
        for user in allposts.each():
            for post in user.val().values():
                if tag in post['tags']:
                    title = post.get("title")
                    disc = post.get("disc")
                    usrname = post.get("usrname")
                    usrid = post.get("usrid")
                    ptype = post.get("ptype")
                    tags = post.get("tags")
                    likes = post.get("like")
                    comments = post.get("comment")
                    timestamp = post.get("timestamp")
                    url = post.get("url")
                    postid = post.get("postid")
                    postinfo = {"title": title, 
                                "disc": disc, 
                                "usrname": usrname,
                                "usrid": usrid,
                                "postid": postid,
                                "ptype": ptype,
                                "tags": tags,
                                "like": likes,
                                "comment": comments,
                                "timestamp": timestamp,
                                "url" : url}
                    postinfo = json.loads(str(postinfo).replace("'",'"'))   #fixed error
                    posts.append(postinfo)
        return posts[::-1]       #reverse list to make it descending order by default
    return False

def get_all_posts_by_tags(tags):                   #multiple tags
    taglist = tags.split(sep=',')
    allposts = db.child("test1").child("posts").get()
    if allposts.val() == None:
        return False
    else:
        posts = []
        for user in allposts.each():
            for post in user.val().values():
                for tag in taglist:
                    if tag in post['tags']:
                        title = post.get("title")
                        disc = post.get("disc")
                        usrname = post.get("usrname")
                        usrid = post.get("usrid")
                        ptype = post.get("ptype")
                        tags = post.get("tags")
                        likes = post.get("like")
                        comments = post.get("comment")
                        timestamp = post.get("timestamp")
                        url = post.get("url")
                        postid = post.get("postid")
                        postinfo = {"title": title, 
                                    "disc": disc, 
                                    "usrname": usrname,
                                    "usrid": usrid,
                                    "postid": postid,
                                    "ptype": ptype,
                                    "tags": tags,
                                    "like": likes,
                                    "comment": comments,
                                    "timestamp": timestamp,
                                    "url" : url}
                        postinfo = json.loads(str(postinfo).replace("'",'"'))   #fixed error
                        posts.append(postinfo)
        return posts[::-1]       #reverse list to make it descending order by default
    return False


def like_post(username,postid):
    post = get_post(username,postid)
    if post == False:
        print("post error")
        return False
    else:
        likes = post['like']
        total = likes['total']
        total = int(total) + 1
        jdata = {"total": total}
        db.child("test1").child("posts").child(username).child(postid).child("like").update(jdata)
        return True
    
def unlike_post(username,postid):
    post = get_post(username,postid)
    if post == False:
        print("post error")
        return False
    else:
        likes = post['like']
        total = likes['total']
        total = int(total) - 1
        # likes['total'] = total
        jdata = {"total": total}
        db.child("test1").child("posts").child(username).child(postid).child("like").update(jdata)
        return True

def comment_post(username,postid,comment,comment_user):
    post = get_post(username,postid)
    if post == False:
        print("post error")
        return False
    else:
        comments = post['comment']
        total = comments['total']
        total = int(total) + 1
        usrnames = comments['usrnames']
        usrnames.append(comment_user)
        comments2 = comments['comments']
        comments2.append(comment)
        jdata = {"total": total,
                "usrnames": usrnames,
                "comments": comments2}
        db.child("test1").child("posts").child(username).child(postid).child("comment").update(jdata)
        return True

def delete_post(username, postid):
    post = get_post(username, postid)
    if post == False:
        print("post error")
        return False
    else:
        db.child("test1").child("posts").child(username).child(postid).remove()
        return True
def search_posts_by_keyword(keyword):
    allposts = db.child("test1").child("posts").get()
    if allposts.val() == None:
        return False
    else:
        posts = []
        for user in allposts.each():
            for post in user.val().values():
                if keyword.lower() in post['title'].lower() or keyword.lower() in post['disc'].lower():
                    posts.append(post)
        return posts[::-1]  # reverse list to make it descending order by default

def delete_comment(username, postid, commentdata):
    post = get_post(username, postid)
    if post == False:
        print("post error")
        return False
    else:
        comments = post['comment']
        comments2 = comments['comments']
        usrnames = comments['usrnames']
        if commentdata in comments2:
            index = comments2.index(commentdata)
            comments2.pop(index)
            usrnames.pop(index)
            total = int(comments['total']) - 1
            jdata = {"total": total,
                    "usrnames": usrnames,
                    "comments": comments2}
            db.child("test1").child("posts").child(username).child(postid).child("comment").update(jdata)
            return True
        else:
            print("comment not found")
            return False


def update_user(username,passwd,email,age,gender,tags,bio,profession,pimg):
    pass