import LoadingMp4 from "@/assets/loading_white.mp4";
import { useState } from "react";

interface LoadingProps {
  onVideoLoad: () => void;
}

const Loading = ({ onVideoLoad }: LoadingProps) => {
  const [localLoaded, setLocalLoaded] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen">
      {!localLoaded && (
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary" />
      )}
      <video
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={() => {
          setLocalLoaded(true);
          onVideoLoad();
        }}
        className={`w-32 h-32 md:w-48 md:h-48 lg:w-72 lg:h-72 transition-opacity duration-300 
            ${localLoaded ? "opacity-100" : "opacity-0"}`}
      >
        <source src={LoadingMp4} type="video/mp4" />
      </video>
    </div>
  );
};

export default Loading;
