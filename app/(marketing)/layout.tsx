import { Header } from '@/components/website-examples/Header/Header';
import { Footer } from '@/components/website-examples/Footer/Footer';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}