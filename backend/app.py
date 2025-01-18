from flask import Flask, request, jsonify
from video_creator import generate_video
from google.cloud import storage

# Initialize Flask app
app = Flask(__name__)

# Set Google Cloud bucket name
bucket_name = "uofthacks12-lifeasnotme"

# Initialize Google Cloud Storage client
key_path = "D:\\Projects\\Hackathons\\UofTHacks12\\LifeAsNotMe\\backend\\hackathons-31265-afd5eed65e6f.json"
storage_client = storage.Client.from_service_account_json(key_path)

@app.route("/", methods=["GET"])
def root():
    return jsonify({"message": "Welcome to the LifeAsNotMe Video Generation API!"})

@app.route("/generate", methods=["POST"])
def generate():
    try:
        # Get data from request
        data = request.json
        prompt = data.get("prompt", "")
        num_frames = data.get("num_frames", 12)

        # Delegate video generation to the separate module
        result = generate_video(prompt, num_frames)
        return jsonify(result)
    except RuntimeError as e:
        return jsonify({"error": str(e)}), 500

@app.route("/retrieve/video/<filename>", methods=["GET"])
def get_video(filename):
    try:
        # Check if the file exists in GCP bucket
        bucket = storage_client.bucket(bucket_name)
        blob = bucket.blob(f"generated_videos/{filename}")
        
        if not blob.exists():
            return jsonify({"error": "Video not found"}), 404

        # Return the video file URL as a response
        return jsonify({
            "message": "Video found",
            "file_url": blob.public_url
        })
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
