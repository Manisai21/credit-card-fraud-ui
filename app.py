from flask import Flask, render_template, request, redirect, url_for, flash
import requests

app = Flask(__name__)
app.secret_key = "secret"

FASTAPI_URL = "http://127.0.0.1:8000"  # FastAPI server URL

# Route: Home Page
@app.route("/")
def home():
    return render_template("index.html")

# Route: Login (Flask calls FastAPI)
@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form["email"]
        password = request.form["password"]

        response = requests.post(f"{FASTAPI_URL}/login", json={"email": email, "password": password})
        data = response.json()

        if response.status_code == 200:
            flash("Login Successful!", "success")
            return redirect(url_for("dashboard"))
        else:
            flash(data.get("detail", "Invalid credentials"), "danger")

    return render_template("login.html")

# Route: Upload Dataset (Flask calls FastAPI)
@app.route("/upload", methods=["POST"])
def upload_dataset():
    if "file" not in request.files:
        flash("No file part", "danger")
        return redirect(request.url)

    file = request.files["file"]
    if file.filename == "":
        flash("No selected file", "danger")
        return redirect(request.url)

    files = {"file": (file.filename, file.stream, file.content_type)}
    response = requests.post(f"{FASTAPI_URL}/predict/", files=files)
    
    if response.status_code == 200:
        predictions = response.json()
        return render_template("result.html", predictions=predictions)
    else:
        flash("Error in prediction", "danger")
        return redirect(url_for("dashboard"))

# Route: Dashboard
@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")

if __name__ == "__main__":
    app.run(debug=True)
