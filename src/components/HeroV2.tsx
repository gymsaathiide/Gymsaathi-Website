import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Scan, Sparkles } from 'lucide-react';
import normalGym from '../assets/v2/normal-gym.png';
import smartGym from '../assets/v2/smart-gym.png';

const HeroV2 = () => {
    const containerRef = useRef<HTMLElement>(null);
    const scannerRef = useRef<HTMLDivElement>(null);
    const smartLayerRef = useRef<HTMLDivElement>(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        const container = containerRef.current;
        const scanner = scannerRef.current;
        const smartLayer = smartLayerRef.current;

        if (!container || !scanner || !smartLayer) return;

        // Initial State: 10% scanned
        gsap.set(smartLayer, { clipPath: 'polygon(0 0, 10% 0, 10% 100%, 0 100%)' });
        gsap.set(scanner, { left: '10%' });

        const onMouseMove = (e: MouseEvent) => {
            if (scanned) return;

            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));

            gsap.to(smartLayer, {
                clipPath: `polygon(0 0, ${percent}% 0, ${percent}% 100%, 0 100%)`,
                duration: 0.1,
                ease: 'none'
            });

            gsap.to(scanner, {
                left: `${percent}%`,
                duration: 0.1,
                ease: 'none'
            });

            if (percent > 90 && !scanned) {
                setScanned(true);
                completeScan();
            }
        };

        const completeScan = () => {
            // Auto finish the scan
            const tl = gsap.timeline();

            tl.to([smartLayer, scanner], {
                duration: 0.8,
                ease: "power2.inOut",
                onUpdate: function () {
                    // Animation update logic if needed
                }
            });

            // Simpler: Just animate to 100%
            gsap.to(smartLayer, {
                clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%)`,
                duration: 1,
                ease: "power3.out"
            });

            gsap.to(scanner, {
                left: '100%',
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });
        };

        container.addEventListener('mousemove', onMouseMove);
        return () => container.removeEventListener('mousemove', onMouseMove);
    }, [scanned]);

    return (
        <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black cursor-crosshair">
            {/* Layer 1: Normal Gym (Chaos) */}
            <div className="absolute inset-0 z-0">
                <img src={normalGym} alt="Normal Gym" className="w-full h-full object-cover opacity-60 grayscale filter contrast-125" />
                <div className="absolute inset-0 bg-black/40" />

                <div className="absolute top-1/2 left-10 md:left-20 transform -translate-y-1/2 text-white/50 pointer-events-none">
                    <h2 className="text-6xl md:text-9xl font-bold tracking-tighter opacity-50 blur-sm">CHAOS</h2>
                    <p className="text-2xl mt-4 font-mono">Manual Records. Lost Data.</p>
                </div>
            </div>

            {/* Layer 2: Smart Gym (Order) - Masked */}
            <div ref={smartLayerRef} className="absolute inset-0 z-10 w-full h-full overflow-hidden bg-dark">
                <div className="absolute inset-0 bg-gradient-to-r from-dark to-slate-900" />

                {/* Dashboard Image */}
                <div className="absolute inset-0 flex items-center justify-center p-10 md:p-20">
                    <img src={smartGym} alt="Smart Dashboard" className="w-full h-full object-contain drop-shadow-[0_0_50px_rgba(254,121,0,0.3)]" />
                </div>

                <div className="absolute top-1/2 right-10 md:right-20 transform -translate-y-1/2 text-right pointer-events-none mix-blend-plus-lighter">
                    <h2 className="text-6xl md:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">CONTROL</h2>
                    <p className="text-2xl mt-4 text-primary font-mono flex items-center justify-end gap-2">
                        <Sparkles size={20} /> AI-Powered Growth
                    </p>
                </div>
            </div>

            {/* Scanner Bar */}
            <div ref={scannerRef} className="absolute top-0 bottom-0 w-1 bg-primary z-20 shadow-[0_0_20px_4px_rgba(254,121,0,0.8)] pointer-events-none">
                <div className="absolute top-1/2 -left-6 bg-primary text-black font-bold text-xs px-2 py-1 rounded uppercase tracking-widest transform -rotate-90 origin-center flex items-center gap-2">
                    <Scan size={12} /> Scanning
                </div>
            </div>

            {/* Instruction Hint */}
            <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-30 transition-opacity duration-500 ${scanned ? 'opacity-0' : 'opacity-100'}`}>
                <p className="text-white/50 text-sm uppercase tracking-[0.2em] animate-pulse">
                    Scan to Digitize
                </p>
            </div>
        </section>
    );
};

export default HeroV2;
