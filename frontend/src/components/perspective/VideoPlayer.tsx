import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface VideoPlayerProps {
  title?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
}

const VideoPlayer = ({
  title = "Perspective Video",
  videoUrl = "https://www.w3schools.com/html/mov_bbb.mp4",
  thumbnailUrl = "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
}: VideoPlayerProps) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoEnd = () => {
    if (videoRef.current) {
      videoRef.current.play(); // Restart the video
      setIsPlaying(true); // Ensure the play state is updated
    }
  };

  return (
    <Card className="w-full max-w-[50rem] h-[19rem] bg-background overflow-hidden">
      <div className="relative w-full h-full">
        <video
          ref={videoRef}
          src={videoUrl}
          poster={thumbnailUrl}
          className="w-full h-full object-cover"
          onClick={togglePlay}
          onEnded={handleVideoEnd} // Add this event handler
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-200">
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                  onClick={togglePlay}
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <Play className="h-6 w-6" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                  onClick={toggleMute}
                >
                  {isMuted ? (
                    <VolumeX className="h-6 w-6" />
                  ) : (
                    <Volume2 className="h-6 w-6" />
                  )}
                </Button>
              </div>
              <div className="text-white text-sm font-medium">{title}</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default VideoPlayer;