# 📡 Setting Up Your Agora Account for Video Chat Integration

To use Agora's Real-Time Communication services (video, voice, etc.), you'll need to create an account, set up a project, and retrieve your credentials. Follow the steps below:

---

## Step 1: Create an Agora Account

1. Visit [Agora Console](https://console.agora.io/).
2. Sign up with your email or GitHub account.
3. Verify your email address if prompted.

---

## Step 2: Create a New Project

1. Once logged in, go to the **Projects** tab.
2. Click on **"Create"** to add a new project.
3. Give your project a **name** (e.g., `VideoChatApp`).
4. Select **"Testing Mode"** or **"Production Mode"** depending on your use case.
5. Enable the **App Certificate** (if needed for production-grade token authentication).
6. Click **Submit**.

---

## Step 3: Get Your Agora App ID

1. After creating the project, go to your project's dashboard.
2. Copy the **App ID** – this will be used in your Django project to initialize the Agora SDK.

---

## (Optional) Step 4: Enable and Copy App Certificate

> Only needed if you're implementing **token-based authentication**.

1. Inside your project settings, find **App Certificate**.
2. Click **Enable App Certificate**.
3. Copy and securely store the **Primary Certificate**.

---

## Step 5: Use Free 10,000 Minutes

Agora gives you **10,000 free minutes each month** for development:
- These are available automatically after account creation.
- You can view usage in the **Billing** section of the Agora Console.

---

## Final Step: Add Credentials to Your Django App

In your Django project:

```python
AGORA_APP_ID = "your-app-id"
AGORA_APP_CERTIFICATE = "your-app-certificate"  # Only if using tokens
```
## Git Clone Command

Clone this repository to your local machine:

```bash
git clone https://github.com/your-username/django-agora-videochat.git
cd django-agora-videochat
```

---

## Setup Instructions

### Step 1: Create Virtual Environment

Create and activate the virtual environment:

```bash
python -m venv venv
source venv/bin/activate     # For Windows: venv\Scripts\activate
```

### Step 2: Install Dependencies

Install the required Python dependencies:

```bash
pip install -r requirements.txt
```

### Step 3: Run Migrations

Run database migrations:

```bash
python manage.py makemigrations
python manage.py migrate
```

---

## Admin Panel Access

To access the Django Admin panel, use the following credentials:

**Admin Username**: admin  
**Admin Email**: admin@example.com  
**Admin Password**: admin

You can log in to the admin panel at:  
[http://127.0.0.1:8000/admin](http://127.0.0.1:8000/admin)

---

## Start the Development Server

Start the development server:

```bash
python manage.py runserver
```

Visit the application at:  
[http://127.0.0.1:8000/](http://127.0.0.1:8000/)

---
## Done!

You are now ready to use Agora's video chat integration with Django. 🎉

---

👨‍💻 Made with Django, Agora SDK, and ❤️