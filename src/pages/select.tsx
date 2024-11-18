import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import catImage from "@/assets/cat.jpg";
import survivlImage from "@/assets/survival.jpg";
import { AlephiumConnectButton } from "@alephium/web3-react";

const Select = () => {
  const navigate = useNavigate();

  const games = [
    {
      id: "meme-review",
      title: "SpongeBob's Cat Meme Review",
      description:
        "Post your favorite cat meme, rate it yourself, and let the SpongeBob crew decide if you're right!",
      image: catImage,
    },
    {
      id: "survival",
      title: "Survival Situations",
      description:
        "Face challenging scenarios and explain your survival strategy. Will you make it out alive?",
      image: survivlImage,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Dephium</h1>
          <AlephiumConnectButton />
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Choose Your Game</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Select a game to start your betting journey on the Alephium
            blockchain
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-6 mb-16 max-w-4xl mx-auto">
          {games.map((game) => (
            <Card
              key={game.id}
              className="p-6 rounded-lg bg-card border-border hover:border-primary/50 transition-colors"
            >
              <h3 className="text-xl font-semibold mb-2">{game.title}</h3>
              <p className="text-muted-foreground mb-4">{game.description}</p>
              <div className="w-full h-64 mb-4 overflow-hidden rounded-lg bg-card/50">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <Button
                onClick={() => navigate(`/game/${game.id}`)}
                className="w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90"
              >
                Play Now
              </Button>
            </Card>
          ))}
        </section>
      </main>

      <footer className="border-t border-border mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
          © 2024 Dephium. Built on Alephium Blockchain.
        </div>
      </footer>
    </div>
  );
};

export default Select;
