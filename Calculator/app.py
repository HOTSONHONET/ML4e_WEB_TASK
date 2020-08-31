from flask import Flask, render_template, redirect, session
from flask import request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import json
from sqlalchemy import exc

with open("config.json", 'r') as file:
    params = json.load(file)['params']

local_server = params['local_server']
app = Flask(__name__)
app.secret_key = '1'

if local_server:
    app.config["SQLALCHEMY_DATABASE_URI"] = params['local_uri']
else:
    app.config["SQLALCHEMY_DATABASE_URI"] = params['prod_uri']   

db = SQLAlchemy(app)
class users(db.Model):
    sno = db.Column(db.INTEGER, primary_key = True)
    name = db.Column(db.String(50), nullable = False)
    rollnumber = db.Column(db.String(120), nullable = False)
    date = db.Column(db.String(50))

    def __init__(self, name, rollnumber, date):
        self.name = name
        self.rollnumber = rollnumber
        self.date = date

    def __repr__(self):
        return '<Users %r>' % self.name    


@app.route('/', methods = ["GET", "POST"])
def home():
    if ('name' in session) and (session['name'] == params['admin_name']):
        users_ = users.query.all()
        return render_template("navbar.html", users_ = users_)
    if request.method == "POST":
        name = request.form.get('name')
        rollnumber = request.form.get('rollnumber')
        date = datetime.now()
        try:
            if (name == params['admin_name']) and (rollnumber == params['admin_rollnumber']):            
                entry = users(name = "Admin", rollnumber = "Admin_rollnumber", date = date) 
                users_ = users.query.all()
                return render_template("navbar.html", users_ = users_)
            
            else:
                entry = users(name = name, rollnumber = rollnumber, date = date) 
                db.session.add(entry)
                db.session.commit() 
                return render_template("calculator.html")

        except exc.IntegrityError:    
            return render_template("calculator.html")    
            
    return render_template("login.html", params = params)

@app.route("/login")
def login():
    return render_template("login.html", params = params)

@app.route("/calculator")
def calculator():
    return render_template("calculator.html", params = params)

@app.route("/rollout")
def logout():
    return redirect('/login')




if __name__ == "__main__":
    db.create_all()
    app.run(debug = True)    