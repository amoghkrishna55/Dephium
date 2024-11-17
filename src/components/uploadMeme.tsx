import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Spongebob from "@/assets/spongebob.png";
import Patrick from "@/assets/patrick.png";
import { getMemeReview } from "@/llm/rating";
import { motion, AnimatePresence } from "framer-motion";
import spongebobOK from "@/assets/characters/spongebob_ok.png";
import spongebobThinking from "@/assets/characters/spongebob_thinking.png";
import crabOk from "@/assets/characters/crab_ok.png";
import crabThinking from "@/assets/characters/crab_thinking.png";
import patrickOk from "@/assets/characters/patrick_ok.png";
import patrickThinking from "@/assets/characters/patrick_thinking.png";
import sandyOk from "@/assets/characters/sandy_ok.png";
import sandyThinking from "@/assets/characters/sandy_thinking.png";
import squidwardOk from "@/assets/characters/squidward_ok.png";
import squidwardThinking from "@/assets/characters/squidward_thinking.png";

interface Character {
  name: string;
  thinkingImg: string;
  okImg: string;
  rating?: number;
  review?: string;
}

const UploadMeme = () => {
  const [score, setScore] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [showUnderwater, setShowUnderwater] = useState(false);
  const [allReview, setAllReview] = useState(false);
  const [characters, setCharacters] = useState<Character[]>([
    {
      name: "SpongeBob",
      thinkingImg: spongebobThinking,
      okImg: spongebobOK,
    },
    {
      name: "Patrick",
      thinkingImg: patrickThinking,
      okImg: patrickOk,
    },
    {
      name: "Squidward",
      thinkingImg: squidwardThinking,
      okImg: squidwardOk,
    },
    {
      name: "Mr. Krabs",
      thinkingImg: crabThinking,
      okImg: crabOk,
    },
    {
      name: "Sandy",
      thinkingImg: sandyThinking,
      okImg: sandyOk,
    },
  ]);

  const fetchReview = async (character: Character) => {
    try {
      const response = await getMemeReview(previewUrl, character.name as any);
      setCharacters((prev) =>
        prev.map((char) =>
          char.name === character.name
            ? { ...char, rating: response.rating, review: response.review }
            : char
        )
      );
      return response;
    } catch (error) {
      console.error(`Error getting ${character.name}'s review:`, error);
      return null;
    }
  };

  const averageRating = characters.reduce(
    (acc, char) => acc + (char.rating || 0),
    0
  );

  const getReviews = async () => {
    setIsLoading(true);
    setShowUnderwater(true);
    try {
      const reviewPromises = characters.map((character) =>
        fetchReview(character)
      );
      await Promise.all(reviewPromises).then(() => setAllReview(true));
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const navigate = useNavigate();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [".jpeg", ".png", ".jpg"] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setPreviewUrl(URL.createObjectURL(acceptedFiles[0]));
    },
  });

  const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || (parseInt(value) >= 1 && parseInt(value) <= 10)) {
      setScore(value.replace(/\D/g, ""));
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <AnimatePresence>
        {!showUnderwater && (
          <motion.div
            initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-10"
          >
            <header className="border-b border-border">
              <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate(-1)}
                    className="hover:bg-primary/10"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <h1 className="text-2xl font-bold text-primary">Dephium</h1>
                </div>
                <Button className="bg-primary text-primary-foreground hover:opacity-90">
                  Connect Wallet
                </Button>
              </nav>
            </header>

            <main className="container mx-auto px-4 py-12">
              <Card className="max-w-2xl mx-auto bg-card p-8 rounded-lg border border-border">
                <h1 className="text-4xl font-bold text-center mb-8">
                  SpongeBob's Cat Meme Review
                </h1>
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                    ${
                      isDragActive
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary"
                    }`}
                >
                  <input {...getInputProps()} />
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="max-h-64 mx-auto rounded-lg"
                    />
                  ) : (
                    <div className="space-y-4">
                      <p className="text-xl font-medium">
                        Drop your cat meme here, or click to select
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Supports: JPG, PNG
                      </p>
                    </div>
                  )}
                </div>
                <div className="mt-8 space-y-4">
                  <label className="block text-lg font-medium">
                    Rate your meme (1-10):
                  </label>
                  <Input
                    type="number"
                    min="1"
                    max="10"
                    value={score}
                    onChange={handleScoreChange}
                    className="text-2xl text-center font-bold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="Rate Your Cat Meme"
                  />
                </div>
                <Button
                  disabled={!previewUrl || !score || isLoading}
                  className="w-full mt-8 bg-primary text-primary-foreground hover:opacity-90"
                  onClick={getReviews}
                >
                  {isLoading
                    ? "Getting Your Meme Reviewed..."
                    : "Submit for Review!"}
                </Button>

                <p className="mt-4 text-center text-sm text-muted-foreground italic">
                  "I'm ready, I'm ready!" - SpongeBob
                </p>
              </Card>
            </main>

            <div className="fixed bottom-0 left-0 w-32 h-32 animate-bounce">
              <img
                src={Spongebob}
                alt="SpongeBob"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="fixed bottom-0 right-0 w-32 h-32 animate-bounce delay-100">
              <img
                src={Patrick}
                alt="Patrick"
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-sky-400 to-blue-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: showUnderwater ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute bottom-0 w-8 bg-green-600 rounded-t-full origin-bottom"
              style={{
                height: Math.random() * 100 + 100,
                left: `${i * 25}%`,
              }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{
                delay: 0.5 + i * 0.2,
                duration: 1,
                ease: "easeOut",
              }}
            />
          ))}

          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white opacity-70"
              style={{
                width: Math.random() * 20 + 10,
                height: Math.random() * 20 + 10,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: -100, opacity: [0, 0.7, 0] }}
              transition={{
                delay: 1 + Math.random() * 2,
                duration: 5,
                repeat: Infinity,
                repeatDelay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        <div className="min-h-screen bg-gradient-to-b from-sky-400 to-blue-600 p-8">
          <div className="flex gap-8 max-w-7xl mx-auto">
            <div className="w-2/3 space-y-6 max-h-[90vh] overflow-y-auto pr-4">
              {characters.map((char, index) => (
                <motion.div
                  key={char.name}
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-lg p-4"
                >
                  <div className="w-24 h-24 relative">
                    <motion.img
                      src={char.thinkingImg}
                      alt={char.name}
                      className="w-full h-full object-contain"
                      animate={{
                        y: [0, -5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {char.name}
                    </h3>
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      transition={{ delay: index * 0.3 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-white/80">Rating:</span>
                        <div className="flex gap-1">
                          {[...Array(10)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-6 rounded-full ${
                                i < (char.rating || 0)
                                  ? "bg-yellow-400"
                                  : "bg-white/20"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-white/100 text-2xl">
                          {char.rating}
                        </span>
                      </div>
                      <p className="text-white/80 italic">
                        {char.review || "Thinking..."}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="w-2/3 sticky top-8"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <img
                  src={previewUrl}
                  alt="Meme Preview"
                  className="w-full rounded-lg"
                />
                <div className="mt-4 text-center">
                  <p className="text-white/80">Your Rating: {score}/10</p>
                </div>
              </div>
              {allReview && (
                <>
                  <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <h2 className="text-xl font-bold text-white mb-4">
                      Average Rating:{" "}
                      {Math.round(averageRating / characters.length)}
                    </h2>
                    <motion.div
                      className="mt-8 text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.p
                        className="text-4xl font-bold text-black/80"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                      >
                        {Math.round(averageRating / characters.length) ===
                        parseInt(score)
                          ? "You Win!"
                          : "You Lost!"}
                      </motion.p>
                    </motion.div>
                  </div>
                  <Button
                    onClick={() => navigate("/select")}
                    className="w-full mt-8 bg-primary text-primary-foreground hover:opacity-90"
                  >
                    Continue
                  </Button>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UploadMeme;
