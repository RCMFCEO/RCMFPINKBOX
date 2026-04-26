import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Gift, Sparkles, Heart, Package } from "lucide-react";

const PINK_BOX_COLLECTION = "/collections/style-boxes";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Gift className="h-6 w-6 text-primary" />
            <span className="font-serif text-xl tracking-wide text-foreground">
              Recycle Me Fancy
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href={PINK_BOX_COLLECTION}
              className="text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              Shop
            </Link>
            <Link
              href="#about"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              About
            </Link>
            <Link
              href="#themes"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              Themes
            </Link>
          </nav>
          <Button
            asChild
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Link href={PINK_BOX_COLLECTION}>Shop Now</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/30 to-background" />
          <div className="relative max-w-6xl mx-auto px-4 py-24 md:py-32 text-center">
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
              Curated Fashion Experience
            </p>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-foreground mb-6 text-balance leading-tight">
              The Pink Box
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-pretty leading-relaxed">
              Curated fashion. Styled with intention. Packaged with love. Each
              box is thoughtfully selected to help you feel polished, powerful,
              and beautifully presented.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg"
              >
                <Link href={PINK_BOX_COLLECTION}>Shop The Pink Box</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary/10 px-8 py-6 text-lg"
              >
                <Link href="#themes">Explore Themes</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="about" className="py-20 bg-card">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                What&apos;s Inside
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Each Style Box is hand-curated with pieces designed to help
                create one complete styled look.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Package className="h-8 w-8" />}
                title="5-7 Curated Pieces"
                description="A mix of apparel, handbags, jewelry, scarves, belts, and statement accessories."
              />
              <FeatureCard
                icon={<Sparkles className="h-8 w-8" />}
                title="Styled Around a Theme"
                description="Each box follows a color story, mood, or occasion for a cohesive look."
              />
              <FeatureCard
                icon={<Heart className="h-8 w-8" />}
                title="Sustainable Fashion"
                description="Vintage, pre-loved, boutique-sourced, or resale fashion inventory."
              />
            </div>
          </div>
        </section>

        {/* Themes Section */}
        <section id="themes" className="py-20 bg-background">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                Style Box Themes
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                From boardroom power to weekend elegance, find your perfect
                curated experience.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {themes.map((theme) => (
                <ThemeCard key={theme} name={theme} />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Box */}
        <section className="py-20 bg-accent/30">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
              Featured
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
              The Boardroom Pink Edit
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-pretty leading-relaxed">
              A limited styling concept created for women who lead, build, and
              show up with presence. Think pink blazers, structured accessories,
              statement brooches, and beautiful details that make a woman feel
              ready for the room.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
            >
              <Link href={PINK_BOX_COLLECTION}>Shop The Pink Box</Link>
            </Button>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-card">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
              Ready to Be Styled?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Curated to be worn, styled, loved, and remembered.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-6 text-lg"
            >
              <Link href={PINK_BOX_COLLECTION}>Shop The Pink Box</Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Link href="/" className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-primary" />
              <span className="font-serif text-lg text-foreground">
                Recycle Me Fancy
              </span>
            </Link>
            <nav className="flex items-center gap-6">
              <Link
                href={PINK_BOX_COLLECTION}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                Shop
              </Link>
              <Link
                href="#about"
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                About
              </Link>
              <Link
                href="#themes"
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                Themes
              </Link>
            </nav>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Recycle Me Fancy. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="border-border bg-background">
      <CardContent className="pt-8 pb-6 px-6 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent text-primary mb-4">
          {icon}
        </div>
        <h3 className="font-serif text-xl text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

function ThemeCard({ name }: { name: string }) {
  return (
    <Card className="border-border bg-card hover:bg-accent/50 transition-colors cursor-default">
      <CardContent className="py-4 px-6 text-center">
        <p className="text-foreground font-medium">{name}</p>
      </CardContent>
    </Card>
  );
}

const themes = [
  "The Boardroom Pink Edit",
  "The Soft Power Style Box",
  "The Executive Casual Edit",
  "The Brunch Style Box",
  "The Weekend Style Box",
  "The Date Night Style Box",
  "The Travel Style Box",
  "The Seasonal Color Story Box",
  "The Statement Accessory Edit",
  "The Founder's Style Box",
  "The Confidence Edit",
  "The Classic Feminine Edit",
];
