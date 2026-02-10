# 1. Use Python 3.11 (Stable for AI/ML)
FROM python:3.11-slim

# 2. Set the folder inside the container
WORKDIR /app

# 3. CRITICAL: Install system dependencies for Image Processing & AI
# Without this, TensorFlow/CV will crash with "ImportError: libGL.so.1..."
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \ 
    && rm -rf /var/lib/apt/lists/*

# 4. Copy requirements and install Python libraries
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copy your entire project code
COPY . .

# 6. Expose the port (Render uses 10000)
EXPOSE 10000

# 7. Start the server
# We bind to port 10000 to match Render's default
CMD ["uvicorn", "backend:app", "--host", "0.0.0.0", "--port", "10000"]