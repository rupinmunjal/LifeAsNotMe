import React from "react";
import VideoPlayer from "./VideoPlayer";

interface VideoResultsProps {
  videos?: Array<{
    title: string;
    videoUrl: string;
    thumbnailUrl: string;
  }>;
}

const VideoResults = ({
  videos = [
    {
      title: "Through a Cat's Eyes",
      videoUrl: "../public/assets/videos/cat.mp4",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    },
    {
      title: "Life as a Tree",
      videoUrl: "../public/assets/videos/tree.mp4",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    },
    {
      title: "Ocean Waves View",
      videoUrl: "../public/assets/videos/ocean.mp4",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    },
    {
      title: "Floating Like a Cloud",
      videoUrl: "https://sample-videos.com/video123/mp4/480/asdasdas.mp4",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1567571393163-183726343960?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    },
  ],
}: VideoResultsProps) => {
  return (
    <div className="h-screen w-full overflow-hidden bg-background">
      <div className="h-full w-full p-6 md:p-8 lg:p-12">
        <div className="h-full max-w-[1400px] mx-auto">
          <div className="h-full grid grid-cols-4 md:grid-cols-2 gap-6 lg:gap-8">
            {videos.map((video, index) => (
              <div key={index} className="flex justify-center items-center">
                <VideoPlayer
                  title={video.title}
                  videoUrl={video.videoUrl}
                  thumbnailUrl={video.thumbnailUrl}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoResults;