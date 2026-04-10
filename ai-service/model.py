import tensorflow as tf
import numpy as np
from PIL import Image

# Load model once (good)
model = tf.keras.models.load_model("model/simple_damage_model.h5")

classes = ["broken_light","dent","normal","scratch"]

def predict_image(image):

    try:
        # ✅ Convert properly (important for speed + stability)
        img = image.convert("RGB").resize((128,128))

        img = np.array(img, dtype=np.float32) / 255.0
        img = np.expand_dims(img, axis=0)

        # ✅ Faster prediction (no verbose)
        prediction = model.predict(img, verbose=0)

        index = np.argmax(prediction)
        issue = classes[index]

        # Existing mappings
        severity = {
            "scratch":"Low",
            "dent":"Medium",
            "broken_light":"High",
            "normal":"None"
        }

        description = {
            "scratch":"Paint scratch detected",
            "dent":"Body dent detected",
            "broken_light":"Headlight damage detected",
            "normal":"No visible damage"
        }

        # ✅ NEW: Recommendation
        recommendation = {
            "scratch":"Polish or repaint the affected area",
            "dent":"Visit service center for dent removal",
            "broken_light":"Replace the damaged headlight immediately",
            "normal":"No repair needed"
        }

        # ✅ NEW: Estimated Cost
        estimated_cost = {
            "scratch":"₹500 - ₹2000",
            "dent":"₹2000 - ₹8000",
            "broken_light":"₹1500 - ₹6000",
            "normal":"₹0"
        }

        return {
            "issue": issue,
            "severity": severity[issue],
            "description": description[issue],
            "recommendation": recommendation[issue],   # ✅ FIXED
            "estimated_cost": estimated_cost[issue],   # ✅ ADDED
            "confidence": float(np.max(prediction))
        }

    except Exception as e:
        # ✅ Safety fallback (prevents "Prediction Failed")
        return {
            "issue": "error",
            "severity": "Unknown",
            "description": "Failed to process image",
            "recommendation": "Try uploading a clearer image",
            "estimated_cost": "N/A",
            "confidence": 0.0
        }