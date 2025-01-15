from flask import Flask, request, jsonify, session, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_session import Session

# Initialize Flask app
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SESSION_TYPE'] = 'filesystem'  # Store sessions in the filesystem
app.secret_key = 'supersecretkey'  # Replace with a secure secret key
app.config['SESSION_TYPE'] = 'filesystem' 
app.config['SESSION_USE_SIGNER'] = True
app.config['SESSION_PERMANENT'] = False

Session(app)

# Initialize extensions
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
Session(app)

# User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

# Create the database
with app.app_context():
    db.create_all()

# Signup route
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({"success": False, "message": "All fields are required!"}), 400

    # Check if username or email already exists
    existing_user = User.query.filter((User.username == username) | (User.email == email)).first()
    if existing_user:
        return jsonify({"success": False, "message": "Username or email already exists!"}), 400

    # Hash the password
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    # Add the new user to the database
    try:
        new_user = User(username=username, email=email, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"success": True, "message": "Signup successful!"}), 201
    except Exception as e:
        return jsonify({"success": False, "message": f"An error occurred: {str(e)}"}), 500

# Login route
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"success": False, "message": "Both fields are required!"}), 400

    # Check if user exists
    user = User.query.filter_by(username=username).first()
    if not user or not bcrypt.check_password_hash(user.password, password):
        return jsonify({"success": False, "message": "Invalid username or password!"}), 401

    # Create a session for the user
    session['user_id'] = user.id
    session['username'] = user.username

    return jsonify({"success": True, "message": f"Welcome back, {user.username}!"}), 200

# Logout route
@app.route('/logout', methods=['POST'])
def logout():
    session.clear()  # Clear the session
    return jsonify({"success": True, "message": "Logged out successfully!"}), 200

# Decorator to protect routes
def login_required(f):
    from functools import wraps
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return jsonify({"success": False, "message": "Unauthorized"}), 401
        return f(*args, **kwargs)
    return decorated_function

@app.route('/home', methods=['GET'])
@login_required
def home():
    # Serve the home page only if user is logged in
    return app.send_static_file('home.html')

@app.route('/session', methods=['GET'])
def session_status():
    if 'user_id' in session:
        return jsonify({"loggedIn": True, "username": session['username']})
    return jsonify({"loggedIn": False})

if __name__ == '__main__':
    app.run(debug=True)
