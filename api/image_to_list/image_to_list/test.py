from dotenv import load_dotenv
import openai
import os

# Load environment variables from the .env file
load_dotenv()

# Get the API key from the environment
API_KEY = os.getenv('OPENAI_API_KEY')

# Initialize OpenAI client
client = openai.OpenAI(api_key=API_KEY)

def analyze_image(image_url: str):
    """
    Analyzes an image using OpenAI GPT-4o and returns a JSON object
    with identified furniture items and estimated valuations.

    Args:
        image_url (str): The URL of the image to analyze.

    Returns:
        dict: A JSON object containing identified items and their estimated values.
    """
    try:
        # Call GPT-4o with image
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {
                    "role": "system",
                    "content": "You are an expert in insurance claims and valuation. Analyze the provided image and list all identifiable furniture items along with their estimated valuation in USD. However, remember that you can be more specific than my example, you can add brands, etc. Output only a JSON object with the following format:\n\n"
                               "{\n  \"items\": {\n    \"Sofa\": 1200,\n    \"Dining Table\": 800,\n    \"Bookshelf\": 300\n  }\n}\n\n"
                               "Ensure the JSON is correctly formatted and contains no additional text or explanations."
                },
                {
                    "role": "user",
                    "content": [{"type": "image_url", "image_url": {"url": image_url}}]
                }
            ]
        )

        # Extract JSON response
        return response.choices[0].message.content

    except Exception as e:
        return {"error": str(e)}

# Example Usage
if __name__ == "__main__":
    test_url = "https://static.asianpaints.com/content/dam/asianpaintsbeautifulhomes/home-decor-advice/guides-and-how-tos/choosing-living-room-furniture/Title-living-room-interior-design.jpg"
    result = analyze_image(test_url)
    print(result)
