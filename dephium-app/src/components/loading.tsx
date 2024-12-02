import LoadingMp4 from "@/assets/loading_white.mp4";
import { useState } from "react";

interface LoadingProps {
  onVideoLoad: () => void;
}

const Loading = ({ onVideoLoad }: LoadingProps) => {
  const [localLoaded, setLocalLoaded] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen">
      {!localLoaded && <div />}
      <video
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={() => {
          setLocalLoaded(true);
          onVideoLoad();
        }}
        className={`w-48 h-48 md:w-48 md:h-48 lg:w-72 lg:h-72 transition-opacity duration-300 
            ${localLoaded ? "opacity-100" : "opacity-0"}`}
      >
        <source src={LoadingMp4} type="video/mp4" />
      </video>
    </div>
  );
};

export default Loading;
