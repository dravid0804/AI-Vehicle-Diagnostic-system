import numpy as np
import tensorflow as tf
from tensorflow import keras

# Input: [km, brand_id]
X = []
y = []

for brand in range(4):  # 4 brands
    for km in range(0, 100000, 5000):

        X.append([km, brand])

        # Multi-output (7 components)
        y.append([
            1 if km < 5000 else 0,       # engine oil ok
            1 if km < 15000 else 0,      # brakes ok
            1 if km < 30000 else 0,      # suspension ok
            1 if km < 25000 else 0,      # coolant ok
            1 if km < 40000 else 0,      # transmission ok
            1 if km < 20000 else 0,      # battery ok
            1 if km < 10000 else 0       # tire ok
        ])

X = np.array(X)
y = np.array(y)

model = keras.Sequential([
    keras.layers.Dense(32, activation="relu", input_shape=(2,)),
    keras.layers.Dense(32, activation="relu"),
    keras.layers.Dense(7, activation="sigmoid")  # multi-output
])

model.compile(
    optimizer="adam",
    loss="binary_crossentropy",
    metrics=["accuracy"]
)

model.fit(X, y, epochs=150)

model.save("advanced_odometer_model.h5")

print("Advanced model trained")