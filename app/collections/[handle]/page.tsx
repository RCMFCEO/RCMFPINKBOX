import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Gift, ArrowLeft, ShoppingBag } from "lucide-react";
import { getCollectionProducts } from "@/lib/shopify";

// Force dynamic rendering - fetch from Shopify at request time, not build time
export const dynamic = "force-dynamic";

interface CollectionPageProps {
  params: Promise<{ handle: string }>;
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { handle } = await params;

  // Fetch products from Shopify collection with error handling
  let products: Product[] = [];
  let fetchError = false;

  try {
    const fetchedProducts = await getCollectionProducts({ collection: handle });
    products = fetchedProducts as Product[];
  } catch (error) {
    console.error("[v0] Error fetching collection products:", error);
    fetchError = true;
  }

  // Derive collection title from handle
  const collectionTitle = handle
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="min-h-screen flex flex-col bg-background">
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
              href="/collections/style-boxes"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              Shop
            </Link>
            <Link
              href="/#about"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              About
            </Link>
            <Link
              href="/#themes"
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
            <Link href="/collections/style-boxes">Shop Now</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Back Link */}
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        {/* Collection Header */}
        <section className="max-w-6xl mx-auto px-4 pb-12">
          <div className="text-center">
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
              Collection
            </p>
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4 text-balance">
              {collectionTitle}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              Curated collections of beautifully styled boxes.
            </p>
          </div>
        </section>

        {/* Products Grid */}
        <section className="max-w-6xl mx-auto px-4 pb-20">
          {fetchError ? (
            <div className="text-center py-16">
              <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="font-serif text-2xl text-foreground mb-2">
                Unable to Load Products
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-8">
                We&apos;re having trouble loading the products right now. Please
                try again in a moment.
              </p>
              <Button asChild variant="outline">
                <Link href="/">Return Home</Link>
              </Button>
            </div>
          ) : products.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  priority={index < 3}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="font-serif text-2xl text-foreground mb-2">
                Coming Soon
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-8">
                New Pink Box drops are being curated. Check back soon for
                beautifully styled collections.
              </p>
              <Button asChild variant="outline">
                <Link href="/">Return Home</Link>
              </Button>
            </div>
          )}
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
                href="/collections/style-boxes"
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                Shop
              </Link>
              <Link
                href="/#about"
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                About
              </Link>
              <Link
                href="/#themes"
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

interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string | null;
      };
    }>;
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  availableForSale?: boolean;
}

function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: product.priceRange.minVariantPrice.currencyCode,
  }).format(price);

  // Get first image from the images array
  const firstImage = product.images?.edges?.[0]?.node;

  // Link to Shopify product page for checkout
  const shopifyProductUrl = `https://vintage-fashion-lot.myshopify.com/products/${product.handle}`;

  const isAvailable = product.availableForSale !== false;

  return (
    <Card className="border-border bg-card overflow-hidden group">
      <div className="aspect-square relative bg-accent/20">
        {firstImage ? (
          <Image
            src={firstImage.url}
            alt={firstImage.altText || product.title}
            fill
            priority={priority}
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Gift className="h-12 w-12 text-muted-foreground/50" />
          </div>
        )}
        {!isAvailable && (
          <div className="absolute top-3 right-3 bg-muted text-muted-foreground text-xs px-2 py-1 rounded">
            Sold Out
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-serif text-lg text-foreground mb-1 line-clamp-1">
          {product.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-foreground font-medium">{formattedPrice}</span>
          <Button
            asChild
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={!isAvailable}
          >
            <a
              href={shopifyProductUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {isAvailable ? "View Product" : "Sold Out"}
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
