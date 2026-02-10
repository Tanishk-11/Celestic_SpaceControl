import os
import tensorflow as tf
import numpy as np

# --- CRITICAL FIX: Explicit Import ---
from tensorflow.keras.preprocessing import image
from langchain.tools import tool

# --- SETUP ---
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "celestic_v2_model.keras")

# Load model (Global)
try:
    print(f"Loading model from: {MODEL_PATH}")
    model = tf.keras.models.load_model(MODEL_PATH)
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

# STRICT ORDER (Must match your training folders 0-7)
CLASS_NAMES = [
    "CanisMajor",
    "Cassiopeia",
    "Crux",
    "Leo",
    "Orion",
    "Scorpius",
    "UrsaMajor",
    "UrsaMinor",
]


@tool
def predict_constellation(image_path: str):
    """
    Analyzes an image and returns confidence scores for ALL constellations.
    """
    if model is None:
        return "Error: Vision Model not loaded."

    try:
        # Check if file exists to avoid confusing errors
        if not os.path.exists(image_path):
            return f"Error: File not found at {image_path}"

        # --- PREPROCESSING ---
        # The error was happening here because 'image' wasn't imported!
        img = image.load_img(image_path, target_size=(256, 256))
        img_array = image.img_to_array(img)
        img_batch = np.expand_dims(img_array, axis=0)

        # Predict
        predictions = model.predict(img_batch)
        scores = predictions[0]

        # Return Dictionary
        results = {}
        for i, name in enumerate(CLASS_NAMES):
            results[name] = float(scores[i] * 100)

        return results

    except Exception as e:
        # This catches the specific error you saw
        return f"Error processing image: {e}"
