from openai import OpenAI
import os
import requests
from PIL import Image
from io import BytesIO

OPENAI_API_KEY='OPENAI_API_KEY'

client = OpenAI(api_key=OPENAI_API_KEY)

### Image generation example 

# response = client.images.generate(
#   model="dall-e-2",
#   prompt="Place the rolled-out dough on a pizza peel or parchment paper if you're using a pizza stone, or directly on a lightly greased baking sheet.",
#   size="1024x1024",
#   quality="standard",
#   n=1,
# )

# image_url = response.data[0].url # note: urls expire after one hour
# print(image_url)

# # Download the image
# image_data = requests.get(image_url).content

# # Open the image using PIL (Python Imaging Library)
# image = Image.open(BytesIO(image_data))

# # Display the image
# image.show()

### Text generation example

completion = client.chat.completions.create(
  model="gpt-3.5-turbo",
  messages=[
    {"role": "system", "content": "You should provide various recipes given the specified ingredients."},
    {"role": "user", "content": "Given the following ingredients provide a list of recipes. "
     "Each recipe must be a separate JSON object " 
     "For each recipe give detailed step by step instructions. "
     "Ingredients are: milk, butter, cheese, fish, tomatoes"}
  ]
)

print(completion.choices[0].message)