'use client';

import Link from 'next/link';
import Image from 'next/image';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  image?: string;
  video?: string;
}

export function HeroSection({
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
  image,
  video,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-bg" />

      {/* Background Image/Video */}
      {video ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        >
          <source src={video} type="video/mp4" />
        </video>
      ) : image ? (
        <Image
          src={image}
          alt=""
          fill
          className="object-cover opacity-20"
          priority
        />
      ) : null}

      {/* Content */}
      <div className="container relative z-10 text-center py-20">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          {title}
        </h1>

        <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-3xl mx-auto animate-fade-in animation-delay-200">
          {subtitle}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animation-delay-400">
          {primaryCTA && (
            <Link
              href={primaryCTA.href}
              className="btn-primary inline-block"
            >
              {primaryCTA.text}
            </Link>
          )}

          {secondaryCTA && (
            <Link
              href={secondaryCTA.href}
              className="btn-secondary inline-block"
            >
              {secondaryCTA.text}
            </Link>
          )}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 animate-fade-in animation-delay-400">
          <p className="text-sm text-gray-600 mb-4">Trusted by leading companies</p>
          <div className="flex justify-center items-center gap-8 opacity-60">
            {/* Placeholder for logos */}
            <div className="w-24 h-8 bg-gray-300 rounded" />
            <div className="w-24 h-8 bg-gray-300 rounded" />
            <div className="w-24 h-8 bg-gray-300 rounded" />
            <div className="w-24 h-8 bg-gray-300 rounded" />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}