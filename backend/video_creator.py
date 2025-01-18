import numpy as np
import torch
from diffusers import DiffusionPipeline
import imageio
from google.cloud import storage
import os

# Initialize paths and credentials
key_path = "D:\\Projects\\Hackathons\\UofTHacks12\\LifeAsNotMe\\backend\\hackathons-31265-afd5eed65e6f.json"
bucket_name = "uofthacks12-lifeasnotme"
storage_client = storage.Client.from_service_account_json(key_path)

# Initialize Diffusion Pipeline
pipe = DiffusionPipeline.from_pretrained("cerspense/zeroscope_v2_576w", torch_dtype=torch.float16)
pipe.enable_model_cpu_offload()

# Memory optimizations
pipe.unet.enable_forward_chunking(chunk_size=1, dim=1)
pipe.enable_vae_slicing()

# Create output directory if it doesn't exist
os.makedirs("./output", exist_ok=True)

def generate_video(prompt: str, num_frames: int = 30) -> dict:
    """
    Generate a video based on a given prompt and upload it to GCP.

    Args:
        prompt (str): The text prompt for video generation.
        num_frames (int): Number of frames in the video.

    Returns:
        dict: Information about the uploaded video, including public URL.
    """
    try:
        # Generate video frames
        video_frames = pipe(prompt, num_frames=num_frames).frames

        # Debugging the structure of video_frames
        print(f"Generated video frames:")
        print(f"Type: {type(video_frames)}, Shape: {video_frames.shape}")

        # Check if video_frames is in batch format
        if isinstance(video_frames, np.ndarray) and len(video_frames.shape) == 5:
            # Extract the actual frames from the batch dimension
            video_frames = video_frames[0]
        elif isinstance(video_frames, np.ndarray) and len(video_frames.shape) == 4:
            # Already in correct format
            pass
        else:
            raise ValueError("Unexpected video_frames format.")

        # Normalize and convert frames to uint8
        processed_frames = []
        for i, frame in enumerate(video_frames):
            frame = (frame - frame.min()) / (frame.max() - frame.min()) * 255  # Normalize to [0, 255]
            frame = frame.astype(np.uint8)  # Convert to uint8
            processed_frames.append(frame)

        # Save frames as a video file
        local_file = f"D:\\Projects\\Hackathons\\UofTHacks12\\LifeAsNotMe\\backend\\output\\{prompt.replace(' ', '_')}.mp4"
        imageio.mimsave(local_file, processed_frames, fps=24)

        # Upload video to GCP bucket
        bucket = storage_client.bucket(bucket_name)
        blob = bucket.blob(f"generated_videos/{os.path.basename(local_file)}")
        blob.upload_from_filename(local_file)

        return {
            "message": "Video generated successfully",
            "file_url": blob.public_url,
        }
    except Exception as e:
        raise RuntimeError(f"Error during video generation: {str(e)}")
