import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import normalGym from '../assets/v2/normal-gym.png';
import smartGym from '../assets/v2/smart-gym.png';

gsap.registerPlugin(ScrollTrigger);

const Transformation = () => {
    const containerRef = useRef<HTMLElement>(null);
    const oldLayerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !oldLayerRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=200%", // Scroll distance
                    pin: true,
                    scrub: 1,
                }
            });

            // Wipe effect: Clip path from full to nothing (top to bottom or circle)
            // Let's do a circle expand from center
            tl.to(oldLayerRef.current, {
                clipPath: "circle(0% at 50% 50%)",
                ease: "none"
            });

            // Text transition logic if needed

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-dark">
            {/* Bottom Layer (Target/Future) */}
            <div className="absolute inset-0 z-0 flex items-center justify-center">
                <img src={smartGym} alt="Smart Gym" className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-black/60" />
                <h2 className="absolute text-5xl md:text-9xl font-bold text-white tracking-tighter mix-blend-overlay">
                    FUTURE READY
                </h2>
            </div>

            {/* Top Layer (Old/Past) - Will be scrubbed away */}
            <div ref={oldLayerRef} className="absolute inset-0 z-10 bg-gray-900" style={{ clipPath: "circle(100% at 50% 50%)" }}>
                <img src={normalGym} alt="Old Gym" className="w-full h-full object-cover grayscale opacity-50" />
                <div className="absolute inset-0 bg-black/50" />
                <div ref={textRef} className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                    <h2 className="text-4xl md:text-8xl font-bold text-white/50 mb-4 line-through decoration-primary decoration-4">
                        PAPER RECORDS
                    </h2>
                    <p className="text-xl text-white/50 uppercase tracking-widest">
                        Scroll to Digitize
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Transformation;
