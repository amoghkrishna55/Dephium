import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Spongebob from "@/assets/spongebob.png";
import Patrick from "@/assets/patrick.png";

const UploadMeme = () => {
  const [score, setScore] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
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
    <div className="min-h-screen bg-background">
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
            onClick={() => setIsLoading(true)}
          >
            {isLoading
              ? "Getting SpongeBob's Opinion..."
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
      <div className="fixed bottom-0 right-0 w-32 h-32 animate-bounce delay-100 ">
        <img
          src={Patrick}
          alt="Patrick"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default UploadMeme;
