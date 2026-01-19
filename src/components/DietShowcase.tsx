import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import holoBody from '../assets/v2/holo-body.png';
import mealBowl from '../assets/v2/meal-bowl.png';
import { Check, TrendingUp, Activity } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const DietShowcase = () => {
    const containerRef = useRef<HTMLElement>(null);
    const bodyRef = useRef<HTMLImageElement>(null);
    const mealRef = useRef<HTMLImageElement>(null);
    const macroRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !bodyRef.current || !mealRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=300%",
                    pin: true,
                    scrub: 1,
                }
            });

            // Step 1: Meal Assembly (Fade in & Float up)
            tl.fromTo(mealRef.current,
                { y: 200, opacity: 0, scale: 0.8 },
                { y: 0, opacity: 1, scale: 1, duration: 1 }
            );

            // Step 2: Macros fill up
            tl.to(".macro-bar-fill", {
                width: (i) => ["40%", "35%", "25%"][i], // Protein, Carbs, Fats
                duration: 1,
                stagger: 0.2
            }, ">-0.5");

            // Step 3: Energy transfer to Body (Meal fades out, Body glows)
            tl.to(mealRef.current, { x: -200, opacity: 0, scale: 0.5, duration: 1 }, "+=0.5");
            tl.to(bodyRef.current, {
                filter: "drop-shadow(0 0 30px rgba(0, 150, 255, 0.8)) brightness(1.5)",
                scale: 1.1,
                duration: 1
            }, "<");

            // Step 4: Text Narrative Change
            tl.to(textRef.current, { y: -50, opacity: 0, duration: 0.5 }, "<");
            // Could swap text content here with state or multiple elements, simpler to just fade out initial

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative h-screen overflow-hidden bg-black flex items-center justify-center">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

            <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row items-center justify-between px-10 relative z-10 h-full">

                {/* Left: 3D Body Hologram */}
                <div className="w-full md:w-1/2 flex items-center justify-center relative h-full">
                    <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full" />
                    <img
                        ref={bodyRef}
                        src={holoBody}
                        alt="3D Body Analysis"
                        className="h-[65vh] object-contain drop-shadow-[0_0_10px_rgba(0,100,255,0.5)] transition-all duration-500"
                    />

                    {/* Floating Stats */}
                    <div className="absolute top-20 left-10 p-4 bg-black/80 border border-blue-500/30 rounded-xl backdrop-blur-md">
                        <div className="flex items-center gap-2 text-blue-400 mb-1">
                            <Activity size={16} /> <span className="text-xs uppercase tracking-widest">Metabolic Rate</span>
                        </div>
                        <div className="text-2xl font-bold text-white">2,450 <span className="text-sm text-gray-400">kcal</span></div>
                    </div>

                    <div className="absolute bottom-20 right-10 p-4 bg-black/80 border border-green-500/30 rounded-xl backdrop-blur-md">
                        <div className="flex items-center gap-2 text-green-400 mb-1">
                            <TrendingUp size={16} /> <span className="text-xs uppercase tracking-widest">Recovery</span>
                        </div>
                        <div className="text-2xl font-bold text-white">98% <span className="text-sm text-gray-400">Optimal</span></div>
                    </div>
                </div>

                {/* Right: Meal & Macros */}
                <div className="w-full md:w-1/2 flex flex-col justify-center h-full relative">

                    {/* Text Content */}
                    <div ref={textRef} className="mb-10 text-center md:text-left">
                        <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
                            Fuel Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500"> Ambition</span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-lg">
                            AI-crafted meals precisely balanced for your biology.
                            Eat to perform, recover, and grow.
                        </p>
                    </div>

                    {/* Animated Meal Bowl */}
                    <div className="relative flex justify-center h-[300px] md:h-[400px]">
                        <img
                            ref={mealRef}
                            src={mealBowl}
                            alt="Healthy Meal"
                            className="w-full max-w-md object-contain drop-shadow-2xl"
                        />
                    </div>

                    {/* Macro Engine Bars */}
                    <div ref={macroRef} className="space-y-6 bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-xl mt-[-50px] relative z-20 mx-auto w-full max-w-md">
                        <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-4 flex justify-between">
                            <span>Macro Composition</span>
                            <span className="text-green-400 flex items-center gap-1"><Check size={14} /> Perfect Match</span>
                        </h3>

                        {[
                            { label: 'Protein', color: 'bg-blue-500', target: '40g' },
                            { label: 'Carbs', color: 'bg-orange-500', target: '35g' },
                            { label: 'Healthy Fats', color: 'bg-purple-500', target: '25g' }
                        ].map((macro, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between text-xs font-bold text-white">
                                    <span>{macro.label}</span>
                                    <span>{macro.target}</span>
                                </div>
                                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                    <div className={`h-full ${macro.color} w-0 macro-bar-fill shadow-[0_0_10px_currentColor]`} />
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default DietShowcase;
