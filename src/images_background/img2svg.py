import aspose.words as aw
import os

doc = aw.Document()
builder = aw.DocumentBuilder(doc)

# image_path = "./background_addDishes1.jpg"
# image_path = "./background_addDishes2.jpg"
image_path = "./background_addCook2.jpg"

svg_path = os.path.splitext(image_path)[0] + ".svg"
shape = builder.insert_image(image_path)
saveOptions = aw.saving.ImageSaveOptions(aw.SaveFormat.SVG)
shape.get_shape_renderer().save(svg_path, saveOptions)