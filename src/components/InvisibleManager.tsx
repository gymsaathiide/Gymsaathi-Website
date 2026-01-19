import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PhoneMissed, FileWarning, Users, UtensilsCrossed, CalendarX, CheckCircle, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const InvisibleManager = () => {
    const containerRef = useRef<HTMLElement>(null);
    const coreRef = useRef<HTMLDivElement>(null);
    const threadsRef = useRef<SVGSVGElement>(null);

    // Problem Nodes Data
    const nodes = [
        { id: 'leads', icon: PhoneMissed, label: 'Missed Leads', x: '20%', y: '20%', delay: 0 },
        { id: 'payments', icon: FileWarning, label: ' overdue Payments', x: '80%', y: '20%', delay: 0.2 },
        { id: 'staff', icon: Users, label: 'Staff Absent', x: '20%', y: '80%', delay: 0.4 },
        { id: 'diet', icon: UtensilsCrossed, label: 'Generic Diets', x: '80%', y: '80%', delay: 0.6 },
        { id: 'schedule', icon: CalendarX, label: 'Clashing Slots', x: '50%', y: '15%', delay: 0.8 },
    ];

    useEffect(() => {
        if (!containerRef.current || !coreRef.current || !threadsRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=400%", // Long scroll for storytelling
                    pin: true,
                    scrub: 1,
                }
            });

            // SCENE 1: CHAOS (0-20%)
            // Shake animations handled by CSS, here we just ensure they are visible and red
            tl.set(".node-icon", { color: "#ef4444" }); // Red
            tl.set(".node-label", { opacity: 1, color: "#ef4444" });

            // SCENE 2: ACTIVATION (20-40%)
            // Core appears
            tl.fromTo(coreRef.current,
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.7)" }
            );
            tl.to(".node-group", { filter: "grayscale(1) blur(2px)", duration: 0.5 }, "<"); // Nodes dim briefly

            // SCENE 3: INVISIBLE THREADS (40-70%)
            // Draw lines from center to nodes
            tl.to(".thread-line", {
                strokeDashoffset: 0,
                duration: 2,
                stagger: 0.1,
                ease: "power2.inOut"
            });

            // Nodes react to connection
            tl.to(".node-group", { filter: "grayscale(0) blur(0px)", scale: 1.1, duration: 0.5 }, "-=1");

            // SCENE 4: CALM & RESOLUTION (70-90%)
            // Icons change to Green Checks, Labels update
            tl.to(".node-icon", {
                color: "#22c55e", // Green
                rotation: 360,
                duration: 0.5
            });

            // Optional: Swap icons (complex in React/GSAP without state, so we'll transform color/icon wrapper)
            // Ideally we'd swap the icon component, but strictly visual:
            tl.to(".node-bg", { borderColor: "#22c55e", boxShadow: "0 0 20px rgba(34, 197, 94, 0.4)" }, "<");

            // SCENE 5: GROWTH (90-100%)
            // Everything floats up together
            tl.to(".network-container", { y: -50, duration: 1 });
            tl.fromTo(".outcome-text", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, "<");

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative h-screen bg-[#050505] overflow-hidden flex flex-col items-center justify-center font-sans">

            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,100,255,0.05)_0%,transparent_70%)]" />

            {/* Main Stage */}
            <div className="network-container relative w-full max-w-5xl aspect-square md:aspect-video flex items-center justify-center">

                {/* SVG Overlay for Threads */}
                <svg ref={threadsRef} className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
                    {nodes.map((node, i) => (
                        <line
                            key={i}
                            x1="50%" y1="50%"
                            x2={node.x} y2={node.y}
                            className="thread-line"
                            stroke="url(#gradient-thread)"
                            strokeWidth="2"
                            strokeDasharray="1000"
                            strokeDashoffset="1000"
                            strokeLinecap="round"
                        />
                    ))}
                    <defs>
                        <linearGradient id="gradient-thread" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#22c55e" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* The AI Core */}
                <div ref={coreRef} className="absolute z-20 w-32 h-32 flex items-center justify-center opacity-0">
                    <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping" />
                    <div className="absolute inset-2 bg-black border border-blue-500 rounded-full shadow-[0_0_50px_rgba(59,130,246,0.5)] flex items-center justify-center backdrop-blur-xl">
                        <Zap size={40} className="text-blue-400 fill-blue-400" />
                    </div>
                    <div className="absolute -bottom-10 text-blue-400 text-xs tracking-[0.2em] font-bold uppercase whitespace-nowrap">
                        GymSaathi AI
                    </div>
                </div>

                {/* Problem Nodes */}
                {nodes.map((node, i) => (
                    <div
                        key={i}
                        className="node-group absolute flex flex-col items-center justify-center w-24 h-24 transform -translate-x-1/2 -translate-y-1/2"
                        style={{ left: node.x, top: node.y }}
                    >
                        <div className="node-bg w-16 h-16 rounded-2xl bg-white/5 border border-red-500/30 flex items-center justify-center mb-2 transition-all duration-300 backdrop-blur-sm relative z-20">
                            {/* Floating shake animation applied via CSS in global or just rely on GSAP timeline for visual chaos if needed, simple pulse here */}
                            <node.icon className="node-icon text-red-500 animate-[shake_0.5s_ease-in-out_infinite]" size={24} />

                            {/* Success overlay icon (hidden initially, reveals in Scene 4) */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 icon-success-overlay">
                                <CheckCircle className="text-green-500" size={24} />
                            </div>
                        </div>
                        <div className="node-label text-xs text-red-500/80 font-mono uppercase tracking-wider text-center bg-black/50 px-2 py-1 rounded">
                            {node.label}
                        </div>
                    </div>
                ))}

            </div>

            {/* Final Outcome Text */}
            <div className="outcome-text absolute bottom-20 text-center opacity-0 z-30">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-2">Your Invisible Manager</h2>
                <p className="text-gray-400 text-xl">Your gym is running. Even when you’re not.</p>
            </div>

            <style>{`
                @keyframes shake {
                    0%, 100% { transform: rotate(0deg); }
                    25% { transform: rotate(-5deg); }
                    75% { transform: rotate(5deg); }
                }
            `}</style>
        </section>
    );
};

export default InvisibleManager;
