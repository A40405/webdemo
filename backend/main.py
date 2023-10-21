from fastapi import FastAPI, HTTPException, Depends, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from sqlalchemy import create_engine, Column, Integer, String, Text, Float, DateTime, ForeignKey
from sqlalchemy.orm import Session, declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
from typing import Optional
import aspose.words as aw
import pandas as pd
import os

app = FastAPI()

app.mount("/img_food", StaticFiles(directory="img_food"), name="img_food")
app.mount("/img_cooking", StaticFiles(directory="img_cooking"), name="img_cooking")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Kết nối cơ sở dữ liệu
DATABASE_URL = "sqlite:///./database.db"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

doc = aw.Document()
builder = aw.DocumentBuilder(doc)

class Food(Base):
    __tablename__ = "foods"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, unique=True)  
    image_url = Column(String)
    steps = Column(Text)
    rating = Column(Float)
    def to_dataframe(self):
        return pd.DataFrame({
            "id": [self.id],
            "name": [self.name],
            "image_url": [self.image_url],
            "steps": [self.steps],
            "rating": [self.rating]})
class CookingRecord(Base):
    __tablename__ = "cooking_records"
    id = Column(Integer, primary_key=True, index=True)
    food_id = Column(Integer, ForeignKey('foods.id'))  
    image_url = Column(String)  
    comment = Column(Text)  # Comment lần nấu
    tips = Column(Text)  # Bí quyết nấu
    created_at = Column(DateTime, default=datetime.now)
    def to_dataframe(self):
        return pd.DataFrame({
            "id": [self.id],
            "id_food": [self.food_id],
            "image_url": [self.image_url],
            "comment": [self.comment],
            "tips": [self.tips],
            "date": [self.created_at]})
Base.metadata.create_all(bind=engine)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally: 
        db.close()

def get_next_image_id1(db: Session):
    return len(db.query(Food).all()) + 1
def get_next_image_id2(db: Session):
    return len(db.query(CookingRecord).all()) + 1

# API endpoints
@app.post("/post_foods_create")
def create_food(name: str = Form(...), 
                image_data: UploadFile =File(..., description=".jpg, .jpeg, .png"),
                steps: str = Form(...), rating: float = Form(...), 
                db: Session = Depends(get_db)):
    
    if not name or not image_data:
        raise HTTPException(status_code=400, detail="Name and Image Data are required")

    existing_food = db.query(Food).filter(Food.name == name).first()
    if existing_food:
        raise HTTPException(status_code=400, detail="Food with the same name already exists")
    
    image_id = get_next_image_id1(db)

    image_extension = os.path.splitext(image_data.filename)[1]
    image_filename = f"image{image_id}{image_extension}"
    image_folder = "img_food"
    if not os.path.exists(image_folder):
        os.makedirs(image_folder)
    image_path = f"{image_folder}/{image_filename}"
    with open(image_path, "wb") as f:
        f.write(image_data.file.read())
    svg_path = os.path.splitext(image_path)[0] + ".svg"
    shape = builder.insert_image(image_path)
    saveOptions = aw.saving.ImageSaveOptions(aw.SaveFormat.SVG)
    shape.get_shape_renderer().save(svg_path, saveOptions)
    if os.path.exists(image_path):
        os.remove(image_path)
        
    image_url = os.path.join('http://localhost:8000/', svg_path)
    new_food = Food(
        name=name,
        image_url=image_url,
        steps = steps,
        rating=rating
    )
    db.add(new_food)
    db.commit()
    db.refresh(new_food)
    return new_food.to_dataframe().iloc[0].to_dict()

@app.post("/post_cooking_records")
def create_cooking_record(food_id: int = Form(...), 
                          image_data: UploadFile = File(..., description=".jpg, .jpeg, .png"),
                          comment: str = Form(""), tips: str = Form(""), db: Session = Depends(get_db)):
    
    if not food_id or not image_data:
        raise HTTPException(status_code=400, detail="Food Name and Image Data are required")

    existing_food = db.query(Food).filter(Food.id == food_id).first()
    if not existing_food:
        raise HTTPException(status_code=404, detail="Food not found")

    image_id = get_next_image_id2(db)
    image_extension = os.path.splitext(image_data.filename)[1]
    image_filename = f"image{image_id}{image_extension}"
    image_folder = "img_cooking"
    if not os.path.exists(image_folder):
        os.makedirs(image_folder)
    image_path = f"{image_folder}/{image_filename}"
    with open(image_path, "wb") as f:
        f.write(image_data.file.read())
    svg_path = os.path.splitext(image_path)[0] + ".svg"
    shape = builder.insert_image(image_path)
    saveOptions = aw.saving.ImageSaveOptions(aw.SaveFormat.SVG)
    shape.get_shape_renderer().save(svg_path, saveOptions)    
    if os.path.exists(image_path):
        os.remove(image_path)
    image_url = os.path.join('http://localhost:8000/', svg_path)
    new_cooking_record = CookingRecord(
        food_id=food_id,  
        image_url=image_url,
        comment=comment,
        tips=tips)
    db.add(new_cooking_record)
    db.commit()
    db.refresh(new_cooking_record)
    
    existing_cooking_record = db.query(CookingRecord).filter(CookingRecord.food_id == food_id).all()
    if not existing_cooking_record:
        return new_cooking_record.to_dataframe().to_dict()
    all_food = [f.to_dataframe() for f in existing_cooking_record] + [new_cooking_record.to_dataframe()]
    result_df = pd.concat(all_food)
    result_dicts = result_df.to_dict(orient='records')
    return result_dicts

# Hiển thị tất cả food
@app.get("/get_all_foods", response_model=list[dict])
def get_all_foods(db: Session = Depends(get_db)):
    foods = db.query(Food).all()
    if not foods:
        raise HTTPException(status_code=404, detail="No foods found")
    df_foods = [food.to_dataframe() for food in foods]
    result_df = pd.concat(df_foods)
    result_dicts = result_df.to_dict(orient='records')
    return result_dicts
# Lấy một món ăn theo ID
@app.get("/get_foods/{food_id}")
def read_food(food_id: int, db: Session = Depends(get_db)):
    food = db.query(Food).filter(Food.id == food_id).first()
    if food is None:
        raise HTTPException(status_code=404, detail="Food not found")
    return food.to_dataframe().iloc[0].to_dict()
# Lấy danh sách các lần nấu của một món ăn theo food_id
# def get_food_name(food_id: int, db: Session):
#     food = db.query(Food).filter(Food.id == food_id).first()
#     if food is None:
#         raise HTTPException(status_code=404, detail="Food not found")
#     return food.name
@app.get("/get_cooking_records/{food_id}", response_model=list[dict])
def get_cooking_records(food_id: int, db: Session = Depends(get_db)):
    records = db.query(CookingRecord).filter(CookingRecord.food_id == food_id).all()
    # food_name = get_food_name(food_id,db)
    # print(food_name)
    if not records:
        raise HTTPException(status_code=404, detail="No cooking records found for this food_id")
    df_records = [record.to_dataframe() for record in records]
    result_df = pd.concat(df_records)
    result_dicts = result_df.to_dict(orient='records')
    return result_dicts

# Cập nhật thông tin món ăn theo ID
@app.put("/put_foods/{food_id}")
def update_food(
    food_id: int,
    name: str = Form(None),
    image_data: UploadFile = File(None, description=".jpg, .jpeg, .png"),
    steps: str = Form(None),
    rating: float = Form(None),
    db: Session = Depends(get_db)):
    food = db.query(Food).filter(Food.id == food_id).first()
    if food is None:
        raise HTTPException(status_code=404, detail="Food not found")
    if name is not None:
        food.name = name
    if image_data:
        image_id = food.id
        image_extension = os.path.splitext(image_data.filename)[1]
        image_filename = f"image{image_id}{image_extension}"
        image_folder = "img_food"
        
        if not os.path.exists(image_folder):
            os.makedirs(image_folder)
        image_path = f"{image_folder}/{image_filename}"
        print(image_path)
        with open(image_path, "wb") as f:
            f.write(image_data.file.read())
        svg_path = os.path.splitext(image_path)[0] + ".svg"
        shape = builder.insert_image(image_path)
        saveOptions = aw.saving.ImageSaveOptions(aw.SaveFormat.SVG)
        shape.get_shape_renderer().save(svg_path, saveOptions)
        if os.path.exists(image_path):
            os.remove(image_path)
        image_url = os.path.join('http://localhost:8000/', svg_path)
        food.image_url = image_url
    if steps is not None:
        food.steps = steps
    if rating is not None:
        food.rating = rating
    db.commit()
    db.refresh(food)
    return food.to_dataframe().iloc[0].to_dict()
# Cập nhật thông tin một lần nấu theo ID
@app.put("/put_cooking_records/{record_id}")
def update_cooking_record(
    record_id: int,
    image_data: Optional[UploadFile] = File(None, description=".jpg, .jpeg, .png"),
    comment: Optional[str] = Form(None),
    tips: Optional[str] = Form(None),
    db: Session = Depends(get_db)):
    record = db.query(CookingRecord).filter(CookingRecord.id == record_id).first()
    if record is None:
        raise HTTPException(status_code=404, detail="Cooking record not found")
    if image_data:
        image_id = record.id
        image_extension = os.path.splitext(image_data.filename)[1]
        image_filename = f"image{image_id}{image_extension}"
        image_folder = "img_cooking"
        if not os.path.exists(image_folder):
            os.makedirs(image_folder)
        image_path = f"{image_folder}/{image_filename}"
        with open(image_path, "wb") as f:
            f.write(image_data.file.read())
        svg_path = os.path.splitext(image_path)[0] + ".svg"
        shape = builder.insert_image(image_path)
        saveOptions = aw.saving.ImageSaveOptions(aw.SaveFormat.SVG)
        shape.get_shape_renderer().save(svg_path, saveOptions)
        if os.path.exists(image_path):
            os.remove(image_path)
        image_url = os.path.join('http://localhost:8000/', svg_path)
        record.image_url = image_url
    if comment:
        record.comment = comment
    if tips:
        record.tips = tips
    
    db.commit()
    db.refresh(record)
    return record.to_dataframe().iloc[0].to_dict()


# Xóa một món ăn theo ID
@app.delete("/delete_foods/{food_id}")
def delete_food(food_id: int, db: Session = Depends(get_db)):
    food = db.query(Food).filter(Food.id == food_id).first()
    if food is None:
        raise HTTPException(status_code=404, detail="Food not found")
    db.delete(food)
    db.commit()
    return {"message": "Food deleted successfully"}
# Xóa phần tử cuối cùng trong danh sách 'foods'
@app.delete("/delete_last_foods")
def delete_last_food(db: Session = Depends(get_db)):
    food = db.query(Food).order_by(Food.id.desc()).first()  
    if food is None:
        raise HTTPException(status_code=404, detail="No food to delete")
    db.delete(food)
    db.commit()
    return {"message": "Last food deleted successfully"}
# Xóa một lần nấu theo ID
@app.delete("/delete_cooking_records/{record_id}")
def delete_cooking_record(record_id: int, db: Session = Depends(get_db)):
    record = db.query(CookingRecord).filter(CookingRecord.id == record_id).first()
    if record is None:
        raise HTTPException(status_code=404, detail="Cooking record not found")
    db.delete(record)
    db.commit()
    return {"message": "Cooking record deleted successfully"}
# Xóa phần tử cuối cùng trong danh sách 'CookingRecord'
@app.delete("/delete_last_cooking_records")
def delete_last_cooking_record(db: Session = Depends(get_db)):
    record = db.query(CookingRecord).order_by(CookingRecord.id.desc()).first()  # Lấy phần tử cuối cùng
    if record is None:
        raise HTTPException(status_code=404, detail="No cooking records to delete")
    db.delete(record)
    db.commit()
    return {"message": "Last cooking record deleted successfully"}




@app.get("/")
async def hello():
    html_content = """
        <!DOCTYPE html>
        <html>
        <head>
            <title>FOOD-DIARY-APP</title>
            <style>
                h1 {
                    font-size: 36px;
                }
                h2 {
                    
                }
                a {
                    font-size: 25px
                }
                .box {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 10px;
                    margin-bottom:20px;
                    height: 80px;
                    text-align: center;
                }
                .box:hover {
                    background-color: #7FFF00 !important;
                }
            </style>
        </head>
        <body>
            <center>
            <h1>Bài cuối kì</h1>
            <h1>Môn: Công nghệ web</h1>
            <h2 style = "font-size:14px; margin-bottom:20px; margin-top:200px; text-align: right;">API written by:</h2>
            <h2 style = "font-size:14px; text-align: right;">A40405 Bùi Hữu Huấn</h2>
            <div  style=" display: inline-block; padding: 10px;">
                    <div class="box" style="background-color: #f4a70e; text-align: center; display: flex; justify-content: center;min-width: 120px;">
                        <a href="/docs" target="_blank" style="font-weight: bold; color: #ffffff;">API</a>
                    </div>
            </div>
            </center>
        </body>
        </html>
    """
    return HTMLResponse(content=html_content, status_code=200)