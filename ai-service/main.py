from fastapi import FastAPI, UploadFile, File
from model import predict_image
from PIL import Image
import io
from pydantic import BaseModel
from odometer_model import predict_odometer



app = FastAPI()

@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    contents = await file.read()

    image = Image.open(io.BytesIO(contents)).convert("RGB")

    result = predict_image(image)

    return result

class OdoInput(BaseModel):
    km: int
    brand: str

@app.post("/odometer")
def odometer(data: OdoInput):
    return predict_odometer(data.km, data.brand)