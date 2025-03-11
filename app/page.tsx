import Feature from "@/components/FeatureCards";
import ImageCarousel from "@/components/Carousel";

export default function Home() {
  return (
    <div>
      <main className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold mb-6">Credit Card Fraud Detection</h1>
        <ImageCarousel />
        <Feature/>
      </main>
    </div>
  );
}
