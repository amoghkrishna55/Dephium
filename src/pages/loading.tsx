import LoadingMp4 from "@/assets/loading_white.mp4";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-32 h-32 md:w-48 md:h-48 lg:w-72 lg:h-72"
      >
        <source src={LoadingMp4} type="video/mp4" />
      </video>
    </div>
  );
};

export default Loading;
