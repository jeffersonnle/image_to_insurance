from dotenv import load_dotenv
import openai
import os

# Load environment variables from the .env file
load_dotenv()

# Get the API key from the environment
API_KEY = os.getenv('OPENAI_API_KEY')
print(API_KEY)

# URL of the image (you need to host the image somewhere, e.g., an S3 bucket, Imgur, or a local server)
image_url = "https://static.asianpaints.com/content/dam/asianpaintsbeautifulhomes/home-decor-advice/guides-and-how-tos/choosing-living-room-furniture/Title-living-room-interior-design.jpg"  # Replace with the actual image URL

# Call GPT-4o with image
client = openai.OpenAI(api_key=API_KEY)
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": "You are an expert in insurance claims and valuation. Analyze the provided image and list all identifiable furniture items along with their estimated valuation in USD. Output only a JSON object with the following format:\n\n{\n  \"items\": {\n    \"Sofa\": 1200,\n    \"Dining Table\": 800,\n    \"Bookshelf\": 300\n  }\n}\n\nEnsure the JSON is correctly formatted and contains no additional text or explanations."},
        {"role": "user", "content": [{"type": "image_url", "image_url": {"url": image_url}}]}
    ]
)



# Print response
print(response.choices[0].message.content)

