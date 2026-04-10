import tensorflow as tf
import numpy as np

model = tf.keras.models.load_model("advanced_odometer_model.h5")

components = [
    "Engine Oil",
    "Brake System",
    "Suspension",
    "Coolant",
    "Transmission",
    "Battery",
    "Tires"
]

def predict_odometer(km, brand):

    brand_map = {
        "toyota":0,
        "hyundai":1,
        "honda":2,
        "tata":3
    }

    brand_id = brand_map.get(brand.lower(), 0)

    data = np.array([[km, brand_id]])

    pred = model.predict(data, verbose=0)[0]

    report = []

    for i, value in enumerate(pred):

        status = "Good" if value > 0.5 else "Needs Attention"

        recommendation = {
            "Engine Oil":"Change engine oil if degraded",
            "Brake System":"Inspect brake pads and discs",
            "Suspension":"Check shock absorbers",
            "Coolant":"Flush and replace coolant",
            "Transmission":"Replace transmission fluid",
            "Battery":"Check battery health",
            "Tires":"Inspect tire wear and pressure"
        }

        report.append({
            "component": components[i],
            "status": status,
            "confidence": float(value),
            "action": recommendation[components[i]]
        })

    return {
        "brand": brand,
        "km": km,
        "report": report
    }