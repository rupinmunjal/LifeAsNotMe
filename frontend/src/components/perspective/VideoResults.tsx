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
      videoUrl: "https://example.com/cat-perspective.mp4",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    },
    {
      title: "Life as a Tree",
      videoUrl: "https://example.com/tree-perspective.mp4",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    },
    {
      title: "Floating Like a Cloud",
      videoUrl: "https://example.com/cloud-perspective.mp4",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1567571393163-183726343960?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    },
    {
      title: "Ocean Waves View",
      videoUrl: "https://example.com/ocean-perspective.mp4",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    },
  ],
}: VideoResultsProps) => {
  return (
    <div className="w-full min-h-screen bg-background p-6 md:p-8 lg:p-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
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
  );
};

export default VideoResults;
