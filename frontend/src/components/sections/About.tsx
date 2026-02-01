import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {Target, Zap } from "lucide-react"
import { DataSphereBooks3D } from "../ui/DataSphereBooks3D"

gsap.registerPlugin(ScrollTrigger)

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center+=100",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About the{" "}
            <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              System
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A comprehensive early warning system designed to identify at-risk
            students before it's too late
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Left - Text Content */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
              Transforming Student Success Through Data
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Educational institutions often identify struggling students only
              after final examination results are published. By then, meaningful
              intervention becomes difficult. Our Early Warning System changes
              that.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              By consolidating attendance records, assessment scores, and
              subject attempt history into a single platform, we provide
              educators with a holistic view of student performance, enabling
              timely and effective interventions.
            </p>

            <div className="flex items-start space-x-4 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border-l-4 border-orange-500">
              <Target className="w-6 h-6 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Our Mission
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  To reduce student dropout rates through early identification,
                  transparent analytics, and actionable insights.
                </p>
              </div>
            </div>
          </div>

          {/* Right - 3D Visualization with Enhanced Background */}
          <div className="relative">
            {/* Main card with gradient background and glow */}
            <div className="relative aspect-square rounded-3xl shadow-2xl overflow-hidden">
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 via-orange-500/30 to-orange-600/20 dark:from-orange-500/10 dark:via-orange-600/20 dark:to-orange-700/10"></div>
              
              {/* Radial gradient overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,107,53,0.1)_100%)]"></div>
              
              {/* Animated circles background */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-orange-400/10 dark:bg-orange-500/5 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-orange-500/10 dark:bg-orange-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-orange-300/10 dark:bg-orange-400/5 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
              </div>

              {/* Grid pattern overlay */}
              <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(255,107,53,0.5) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,107,53,0.5) 1px, transparent 1px)
                  `,
                  backgroundSize: '50px 50px'
                }}
              ></div>

              {/* 3D Content */}
              <div className="relative z-10 w-full h-full">
                <DataSphereBooks3D />
              </div>

              {/* Subtle border glow */}
              <div className="absolute inset-0 rounded-3xl border border-orange-500/20 dark:border-orange-600/30"></div>
            </div>

            {/* Floating decorative elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-orange-400/20 dark:bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-orange-500/20 dark:bg-orange-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
            
            {/* Corner accents */}
            <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-orange-500/30 dark:border-orange-600/20 rounded-tr-2xl"></div>
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-orange-500/30 dark:border-orange-600/20 rounded-bl-2xl"></div>
          </div>
        </div>

        {/* Key Highlights */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="about-card p-6 bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-gray-800/50 rounded-2xl shadow-lg border border-orange-200 dark:border-orange-900/30">
            <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-7 h-7 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Real-Time Monitoring
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Continuous tracking of student performance indicators with instant
              alerts for mentors and counselors.
            </p>
          </div>

          <div className="about-card p-6 bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-gray-800/50 rounded-2xl shadow-lg border border-orange-200 dark:border-orange-900/30">
            <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center mb-4">
              <svg
                className="w-7 h-7 text-orange-600 dark:text-orange-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Transparent & Explainable
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Rule-based machine learning with clear explanations for every risk
              assessment decision.
            </p>
          </div>

          <div className="about-card p-6 bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-gray-800/50 rounded-2xl shadow-lg border border-orange-200 dark:border-orange-900/30">
            <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center mb-4">
              <svg
                className="w-7 h-7 text-orange-600 dark:text-orange-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Easy Configuration
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Low-cost solution that integrates seamlessly with existing
              institutional data sources.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}