import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator

# ======================
# CONFIG
# ======================
IMG_SIZE = 128
BATCH = 8

# ======================
# DATA GENERATOR
# ======================
datagen = ImageDataGenerator(
    rescale=1.0 / 255,
    validation_split=0.2
)

train = datagen.flow_from_directory(
    "dataset",
    target_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH,
    class_mode="categorical",
    subset="training"
)

val = datagen.flow_from_directory(
    "dataset",
    target_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH,
    class_mode="categorical",
    subset="validation"
)

# ======================
# MODEL
# ======================
model = tf.keras.Sequential([
    tf.keras.layers.Conv2D(
        32, (3, 3),
        activation="relu",
        input_shape=(IMG_SIZE, IMG_SIZE, 3)
    ),
    tf.keras.layers.MaxPooling2D(),

    tf.keras.layers.Conv2D(64, (3, 3), activation="relu"),
    tf.keras.layers.MaxPooling2D(),

    tf.keras.layers.Flatten(),

    tf.keras.layers.Dense(64, activation="relu"),
    tf.keras.layers.Dense(train.num_classes, activation="softmax")
])

# ======================
# COMPILE
# ======================
model.compile(
    optimizer="adam",
    loss="categorical_crossentropy",
    metrics=["accuracy"]
)

# ======================
# TRAIN
# ======================
model.fit(
    train,
    validation_data=val,
    epochs=5
)

# ======================
# SAVE MODEL
# ======================
model.save("model/simple_damage_model.h5")

print("✅ Model training completed and saved!")