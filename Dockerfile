# 1. Use Python 3.10 Slim (More stable for TensorFlow than 3.11/3.13)
FROM python:3.10-slim

# 2. Set the working directory
WORKDIR /app

# 3. CRITICAL: Install system dependencies for OpenCV/TensorFlow
# UPDATED: Replaced 'libgl1-mesa-glx' with 'libgl1' and 'libglib2.0-0'
RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# 4. Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copy the rest of the code
COPY . .

# 6. Expose the port
EXPOSE 10000

# 7. Start the server
CMD ["uvicorn", "backend:app", "--host", "0.0.0.0", "--port", "10000"]