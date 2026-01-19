import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const OwnerCalmState = () => {
    const containerRef = useRef<HTMLElement>(null);
    const systemRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const system = systemRef.current;
        if (!container || !system) return;

        const ctx = gsap.context(() => {

            // Continuous Orbit Animations
            // 1. Members (Outer Ring) - Fluid Particles
            gsap.to(".orbit-1", { rotation: 360, duration: 60, repeat: -1, ease: "none" });

            // 2. Payments (Mid Ring) - Solid Blocks
            gsap.to(".orbit-2", { rotation: -360, duration: 45, repeat: -1, ease: "none" });

            // 3. Leads (Inner Ring) - Light Streams
            gsap.to(".orbit-3", { rotation: 360, duration: 30, repeat: -1, ease: "none" });

            // 4. Trainers (Cross Axis) - Structured
            gsap.to(".orbit-4", { rotation: 360, duration: 50, repeat: -1, ease: "none" });

            // Breathing Motion for Central Figure
            gsap.to(".owner-figure", {
                scale: 1.05,
                opacity: 1,
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

            // Entrance Animation
            gsap.from(system.children, {
                scale: 0,
                opacity: 0,
                duration: 2,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: container,
                    start: "top 60%",
                    end: "bottom 80%",
                    toggleActions: "play none none reverse"
                }
            });

        }, container);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative h-screen bg-[#080808] overflow-hidden flex flex-col items-center justify-center font-sans perspective-[1500px]">

            {/* Soft Volumetric Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-[#111] to-[#080808]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_60%)]" />

            {/* Title */}
            <div className="absolute top-20 text-center z-20">
                <h2 className="text-3xl md:text-5xl font-light text-white/80 tracking-widest mb-4">Built for Gym Owners</h2>
                <p className="text-white/40 font-light text-lg">Everything runs. You stay focused.</p>
            </div>

            {/* Main 3D System */}
            <div ref={systemRef} className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] transform-style-3d rotate-x-[10deg]">

                {/* 0. Central Anchor (The Owner) */}
                <div className="owner-figure absolute top-1/2 left-1/2 w-48 h-96 -translate-x-1/2 -translate-y-[60%] z-50 flex flex-col items-center justify-end">
                    {/* Stylized Silhouette */}
                    <div className="w-24 h-24 bg-gradient-to-b from-white/20 to-transparent rounded-full blur-md mb-2" /> {/* Head glow */}
                    <div className="w-40 h-64 bg-gradient-to-t from-blue-900/40 to-white/5 rounded-t-[4rem] backdrop-blur-sm border-t border-white/10" /> {/* Body */}
                    <div className="absolute bottom-0 w-full h-10 bg-black/50 blur-xl" /> {/* Shadow */}
                </div>

                {/* 1. Members Orbit (Fluid) */}
                <div className="orbit-1 absolute inset-[-20%] border border-white/5 rounded-full rotate-x-[70deg] transform-style-3d">
                    {[0, 90, 180, 270].map((deg, i) => (
                        <div key={i} className="absolute top-0 left-1/2 w-4 h-4 bg-blue-500/50 rounded-full blur-[2px] shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                            style={{ transform: `rotate(${deg}deg) translateX(250px) rotate(-${deg}deg)` }} />
                    ))}
                </div>

                {/* 2. Payments Orbit (Blocks) */}
                <div className="orbit-2 absolute inset-[-10%] border border-white/5 rounded-full rotate-x-[70deg] transform-style-3d">
                    {[45, 135, 225, 315].map((deg, i) => (
                        <div key={i} className="absolute top-0 left-1/2 w-8 h-6 bg-green-500/20 border border-green-500/50 rounded-sm backdrop-blur-md"
                            style={{ transform: `rotate(${deg}deg) translateX(200px) rotate(-${deg}deg) rotateX(-90deg)` }} />
                    ))}
                </div>

                {/* 3. Leads Orbit (Light) */}
                <div className="orbit-3 absolute inset-[0%] border border-white/5 rounded-full rotate-x-[70deg] transform-style-3d">
                    <div className="absolute top-0 left-1/2 w-32 h-32 bg-gradient-to-r from-transparent via-pink-500/20 to-transparent rounded-full blur-xl"
                        style={{ transform: `translateX(150px)` }} />
                </div>

                {/* 4. Trainers (Vertical Ring) */}
                <div className="orbit-4 absolute inset-[-15%] border border-white/5 rounded-full rotate-y-[70deg] transform-style-3d">
                    <div className="absolute top-0 left-1/2 w-2 h-20 bg-purple-500/40 rounded-full blur-[1px]"
                        style={{ transform: `translateX(220px)` }} />
                </div>

                {/* 5. Nutrition (Floating Elements) */}
                <div className="absolute top-0 left-0 animate-[float_10s_infinite_ease-in-out]">
                    <div className="w-12 h-12 border border-yellow-500/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                    </div>
                </div>

            </div>

            <style>{`
                .transform-style-3d { transform-style: preserve-3d; }
                .rotate-x-\\[70deg\\] { transform: rotateX(70deg); }
                .rotate-x-\\[10deg\\] { transform: rotateX(10deg); }
                .rotate-y-\\[70deg\\] { transform: rotateY(70deg); }
            `}</style>

        </section>
    );
};

export default OwnerCalmState;
