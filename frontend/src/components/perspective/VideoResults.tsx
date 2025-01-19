import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";
import { ChevronLeft } from "lucide-react";

interface VideoResultsProps {
  videos?: Array<{
    title: string;
    videoUrl: string;
  }>;
}

const VideoResults = ({ videos = [] }: VideoResultsProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { perspective } = location.state || { perspective: "a unique perspective" };
  const [isGenerating, setIsGenerating] = useState(true);
  const [updatedVideoUrl, setUpdatedVideoUrl] = useState("");

  const videoOptions = {
    "a curious cat": [
      {
        title: "Curious Cat Video 1",
        videoUrl: "../public/assets/videos/cat1.mp4",
      },
      {
        title: "Curious Cat Video 2",
        videoUrl: "../public/assets/videos/cat2.mp4",
      },
      {
        title: "Curious Cat Video 3",
        videoUrl: "../public/assets/videos/cat3.mp4",
      },
    ],
    "a floating cloud": [
      {
        title: "Floating Cloud Video 1",
        videoUrl: "../public/assets/videos/cloud1.mp4",
      },
      {
        title: "Floating Cloud Video 2",
        videoUrl: "../public/assets/videos/cloud2.mp4",
      },
      {
        title: "Floating Cloud Video 3",
        videoUrl: "../public/assets/videos/cloud3.mp4",
      },
    ],
  };

  const placeholderVideo = {
    title: "Generating Your Perspective Video...",
    videoUrl: "",
  };

  const [displayedVideos, setDisplayedVideos] = useState<Array<any>>([]);

  useEffect(() => {
    // Add preloaded videos based on perspective
    const newVideos = videoOptions[perspective.toLowerCase()]
      ? [...videoOptions[perspective.toLowerCase()], placeholderVideo]
      : [placeholderVideo];
    setDisplayedVideos(newVideos);

    // Simulate API call for the last video (10-minute delay)
    const timer = setTimeout(() => {
      const generatedVideoUrl = "https://sample-videos.com/video123/mp4/480/asdasdas.mp4"; // Example URL
      setUpdatedVideoUrl(generatedVideoUrl);
      setIsGenerating(false);

      // Update the last video with the generated one
      setDisplayedVideos((prev) =>
        prev.map((video, index) =>
          index === prev.length - 1
            ? {
                ...video,
                title: `Through ${perspective}'s Eyes`,
                videoUrl: generatedVideoUrl,
              }
            : video
        )
      );
    }, 10 * 60 * 1000); // 10 minutes

    return () => clearTimeout(timer);
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
