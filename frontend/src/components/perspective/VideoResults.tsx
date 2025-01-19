import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";
import { ChevronLeft } from "lucide-react";

interface VideoResultsProps {
  videos?: Array<{
    title: string;
    videoUrl: string;
  }>[];
}

const VideoResults = ({ videos = [] }: VideoResultsProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { perspective } = location.state || { perspective: "a unique perspective" };
  const [isGenerating, setIsGenerating] = useState(true);
  const [updatedVideoUrl, setUpdatedVideoUrl] = useState("");
  const [displayedVideos, setDisplayedVideos] = useState<Array<any>>([]);

  const getVideoOptions = (perspective: string) => {
    const baseUrl = "https://storage.googleapis.com/uofthacks12-lifeasnotme/generated_videos/";
    if (perspective.toLowerCase() === "a curious cat") {
      return [
        { title: "Curious Cat Video 1", videoUrl: `${baseUrl}cat1.mp4` },
        { title: "Curious Cat Video 2", videoUrl: `${baseUrl}cat2.mp4` },
        { title: "Curious Cat Video 3", videoUrl: `${baseUrl}cat3.mp4` },
      ];
    } else if (perspective.toLowerCase() === "a floating cloud") {
      return [
        { title: "Floating Cloud Video 1", videoUrl: `${baseUrl}cloud1.mp4` },
        { title: "Floating Cloud Video 2", videoUrl: `${baseUrl}cloud2.mp4` },
        { title: "Floating Cloud Video 3", videoUrl: `${baseUrl}cloud3.mp4` },
      ];
    } else {
      return [];
    }
  };

  const placeholderVideo = {
    title: "Generating Your Perspective Video...",
    videoUrl: "",
  };

  // Function to check if the video exists in cloud storage
  const checkIfVideoExists = async (videoUrl: string) => {
    try {
      const response = await fetch(videoUrl);
      return response.ok;
    } catch (error) {
      console.error("Error checking video existence:", error);
      return false;
    }
  };

  useEffect(() => {
    const newVideos = getVideoOptions(perspective)
      ? [...getVideoOptions(perspective), placeholderVideo]
      : [placeholderVideo];
    setDisplayedVideos(newVideos);

    const fetchGeneratedVideo = async () => {
      // Replace spaces with underscores in the perspective name to match the backend file naming convention
      const formattedPerspective = perspective.replace(/\s+/g, "_");
      const videoUrl = `https://storage.googleapis.com/uofthacks12-lifeasnotme/generated_videos/${formattedPerspective}.mp4`; // Form the URL based on perspective
      const videoExists = await checkIfVideoExists(videoUrl);

      if (videoExists) {
        // If the video exists, update the displayed video with the URL
        setDisplayedVideos((prev) =>
          prev.map((video, index) =>
            index === prev.length - 1
              ? {
                  ...video,
                  title: `Through ${perspective}'s Eyes`,
                  videoUrl, // Use the existing video URL
                }
              : video
          )
        );
        setUpdatedVideoUrl(videoUrl);
        setIsGenerating(false);
      } else {
        // If the video does not exist, make the API call to generate it
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 180000); // Set timeout to 3 minutes

        try {
          // Immediately make the API call to generate the video
          const response = await fetch("http://localhost:5000/generate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // "Access-Control-Allow-Origin": "*",
              // "cache-control": "no-cache",
            },
            body: JSON.stringify({
              prompt: perspective, // Sending the perspective as the prompt
              num_frames: 12, // Specify any additional parameters as needed
            }),
            signal: controller.signal, // Pass the AbortController signal
          });

          if (!response.ok) {
            throw new Error("Failed to generate video");
          }

          const data = await response.json();

          setDisplayedVideos((prev) =>
            prev.map((video, index) =>
              index === prev.length - 1
                ? {
                    ...video,
                    title: `Through ${perspective}'s Eyes`,
                    videoUrl: data.file_url, // Assuming the API returns the URL as `file_url`
                  }
                : video
            )
          );
          setUpdatedVideoUrl(data.file_url);
          setIsGenerating(false);

          // Now, check every 5 minutes if the video is available
          const checkInterval = setInterval(async () => {
            const exists = await checkIfVideoExists(data.file_url);
            if (exists) {
              // Once the video exists, stop checking and update the displayed videos
              setDisplayedVideos((prev) =>
                prev.map((video, index) =>
                  index === prev.length - 1
                    ? {
                        ...video,
                        title: `Through ${perspective}'s Eyes`,
                        videoUrl: data.file_url,
                      }
                    : video
                )
              );
              clearInterval(checkInterval); // Stop checking
            }
          }, 300000); // Check every 5 minutes

        } catch (error) {
          console.error("Error generating video:", error);
          setDisplayedVideos((prev) =>
            prev.map((video, index) =>
              index === prev.length - 1
                ? {
                    ...video,
                    title: "Error Generating Video",
                    videoUrl: "",
                  }
                : video
            )
          );
          setIsGenerating(false);
        } finally {
          clearTimeout(timeout); // Clear the timeout to avoid memory leaks
        }
      }
    };

    fetchGeneratedVideo();

    return () => setIsGenerating(false);
  }, [perspective]);

  return (
    <div className="h-screen w-full overflow-hidden bg-background">
      <div className="h-full w-full p-6 md:p-8 lg:p-12">
        <div className="h-full max-w-[1400px] mx-auto">
          <div className="flex justify-between items-center mb-6">
            <button
              className="text-primary border border-primary px-1 py-1 rounded-full hover:bg-primary hover:text-white transition absolute top-4 left-6"
              onClick={() => navigate("/")}
            >
              <div className="flex">
                <ChevronLeft />
              </div>
            </button>
          </div>

          <div className="h-full grid grid-cols-4 md:grid-cols-2 gap-6 lg:gap-8">
            {displayedVideos.map((video, index) => (
              <div
                key={index}
                className="flex justify-center items-center border border-gray-300 rounded-lg shadow-md"
              >
                {index === displayedVideos.length - 1 && isGenerating ? (
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full"></div>
                    <p className="text-primary font-semibold">
                      Generating your perspective video...
                    </p>
                    <p className="text-slate-500 text-sm">
                      This process may take up to 10 minutes. Please wait.
                    </p>
                  </div>
                ) : (
                  <VideoPlayer title={video.title} videoUrl={video.videoUrl} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoResults;
