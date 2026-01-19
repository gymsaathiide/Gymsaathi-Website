import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe, Users, Building2, Trophy } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const GlobalImpact = () => {
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Animate stats on scroll
        gsap.from(".stat-card", {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
            }
        });

    }, []);

    return (
        <section ref={containerRef} className="relative min-h-screen bg-black flex flex-col items-center justify-center py-20 overflow-hidden">

            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

            {/* Content */}
            <div className="relative z-10 text-center max-w-4xl mx-auto px-6 mb-20">
                <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
                    Trusted by <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">The Fitness World</span>
                </h2>
                <p className="text-xl text-gray-400">
                    GymSaathi powers the most elite fitness centers across India and beyond.
                </p>
            </div>

            {/* Animated Globe Representation (CSS/SVG) */}
            <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] mb-20 perspective-[1000px]">
                <div className="absolute inset-0 rounded-full border border-blue-500/20 animate-[spin_20s_linear_infinite]" />
                <div className="absolute inset-4 rounded-full border border-purple-500/20 animate-[spin_15s_linear_infinite_reverse]" />
                <div className="absolute inset-10 rounded-full border border-cyan-500/20 animate-[spin_10s_linear_infinite]" />

                {/* Glowing Core */}
                <div className="absolute inset-0 bg-blue-500/10 blur-[50px] rounded-full pulse-slow" />

                {/* Holographic Continents (Abstract) */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <Globe size={200} className="text-white/5 animate-pulse" strokeWidth={0.5} />
                </div>

                {/* Orbiting Elements */}
                <div className="absolute top-1/2 left-1/2 w-[120%] h-[120%] border border-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 rotate-45 animate-spin-slow">
                    <div className="absolute top-0 left-1/2 w-4 h-4 bg-blue-500 rounded-full blur-[2px] shadow-[0_0_20px_blue]" />
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl px-6">
                {[
                    { icon: Building2, count: "500+", label: "Active Gyms", color: "text-blue-400" },
                    { icon: Users, count: "1 Million+", label: "Daily Workouts", color: "text-purple-400" },
                    { icon: Trophy, count: "98%", label: "Renewal Rate", color: "text-green-400" }
                ].map((stat, i) => (
                    <div key={i} className="stat-card p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors text-center group">
                        <stat.icon size={40} className={`mx-auto mb-4 ${stat.color} group-hover:scale-110 transition-transform`} />
                        <div className="text-4xl font-bold text-white mb-2">{stat.count}</div>
                        <div className="text-gray-400 uppercase tracking-widest text-sm">{stat.label}</div>
                    </div>
                ))}
            </div>

        </section>
    );
};

export default GlobalImpact;
