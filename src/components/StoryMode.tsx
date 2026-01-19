import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ownerWorried from '../assets/v2/owner-worried.png';
import { MessageCircle, XCircle, CheckCircle, Coins, FileWarning } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const episodes = [
    {
        id: 1,
        title: "EPISODE 1 — LEADS NOT CONVERTING",
        problem: {
            dialogue: "Leads come in… but they don’t join.",
            visuals: "Leads dropping",
            icon: XCircle
        },
        solution: {
            dialogue: "Smart follow-ups convert them automatically.",
            visuals: "Auto-messages sent",
            outcome: "More Joins"
        }
    },
    {
        id: 2,
        title: "EPISODE 2 — PAYMENTS CHAOS",
        problem: {
            dialogue: "Payments and renewals are a headache.",
            visuals: "Unpaid invoices",
            icon: Coins
        },
        solution: {
            dialogue: "Auto reminders. Auto tracking. No stress.",
            visuals: "Green ticks",
            outcome: "Stress-Free Payments"
        }
    },
    {
        id: 3,
        title: "EPISODE 3 — GENERIC DIET PLANS",
        problem: {
            dialogue: "Members need real diet help, not PDFs.",
            visuals: "Crumbling papers",
            icon: FileWarning
        },
        solution: {
            dialogue: "Expert diet plans. Perfect macros. Real results.",
            visuals: "Holographic meals",
            outcome: "Dream Fitness"
        }
    }
];

const StoryMode = () => {
    const containerRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const ownerRef = useRef<HTMLImageElement>(null);
    const guideRef = useRef<HTMLDivElement>(null);
    const bubbleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

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

            episodes.forEach((ep, i) => {
                // Scene 1: Problem (Owner Worried)
                tl.call(() => {
                    if (textRef.current) textRef.current.innerText = ep.title;
                    if (bubbleRef.current) bubbleRef.current.innerText = `"${ep.problem.dialogue}"`;
                    gsap.to(ownerRef.current, { opacity: 1, filter: "grayscale(0.5) contrast(1.2)" });
                    gsap.to(guideRef.current, { opacity: 0 });
                });

                // Visual Chaos (Simulated)
                tl.fromTo(`.chaos-${i}`, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 0.5 });
                tl.to({}, { duration: 1 }); // Hold

                // Scene 2: Solution (Guide/Tech enters)
                tl.call(() => {
                    if (bubbleRef.current) bubbleRef.current.innerText = `"${ep.solution.dialogue}"`;
                    gsap.to(ownerRef.current, { opacity: 0.5, filter: "blur(5px)" }); // Owner fades back
                    gsap.to(guideRef.current, { opacity: 1 });
                });

                // Solution Visuals takes over
                tl.to(`.chaos-${i}`, { opacity: 0, scale: 0, duration: 0.5 });
                tl.fromTo(`.solution-${i}`, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.5 });

                tl.to({}, { duration: 1 }); // Hold for reading

                // Cleanup for next episode (except last)
                if (i < episodes.length - 1) {
                    tl.to(`.solution-${i}`, { opacity: 0, duration: 0.5 });
                }
            });

            // Final Outro
            tl.to([ownerRef.current, guideRef.current], { opacity: 1, filter: "none" });
            tl.call(() => {
                if (bubbleRef.current) bubbleRef.current.innerText = "Run your gym. We handle the rest.";
                if (textRef.current) textRef.current.innerText = "ANTIGRAVITY x GYMSAATHI";
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative h-screen overflow-hidden bg-[#050505] text-white flex flex-col items-center justify-center font-sans perspective-[1000px]">
            {/* Cinematic Stage Lights */}
            <div className="absolute top-0 left-1/4 w-px h-full bg-blue-500/20 blur-[50px]" />
            <div className="absolute top-0 right-1/4 w-px h-full bg-orange-500/20 blur-[50px]" />

            {/* Titles */}
            <div ref={textRef} className="absolute top-10 text-xl md:text-2xl font-bold tracking-[0.3em] text-white/50 uppercase z-20 transition-all duration-500">
                EPISODE 1 — LEADS NOT CONVERTING
            </div>

            {/* Dynamic Speech Bubble */}
            <div ref={bubbleRef} className="absolute top-32 z-30 max-w-lg text-center p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-2xl md:text-3xl font-light italic text-white shadow-2xl transition-all duration-300 transform hover:scale-105">
                "Leads come in… but they don’t join."
            </div>

            {/* Main Stage */}
            <div className="relative w-full max-w-6xl h-[60vh] flex items-end justify-center px-10">

                {/* Character: Gym Owner (Worried) */}
                <img
                    ref={ownerRef}
                    src={ownerWorried}
                    className="h-[50vh] md:h-[70vh] object-contain drop-shadow-[0_0_50px_rgba(0,0,0,1)] transition-all duration-1000 origin-bottom"
                    alt="Gym Owner"
                />

                {/* Character: GymSaathi Guide (Holographic Representation due to asset limit) */}
                <div ref={guideRef} className="absolute right-10 md:right-32 bottom-0 opacity-0 transition-all duration-1000 flex flex-col items-center">
                    <div className="w-[300px] h-[500px] bg-gradient-to-t from-blue-600/20 to-cyan-400/5 rounded-full blur-xl animate-pulse absolute inset-0" />
                    <div className="relative z-10 p-8 border border-cyan-500/50 bg-black/80 rounded-3xl backdrop-blur-md shadow-[0_0_30px_rgba(0,255,255,0.3)]">
                        <div className="text-cyan-400 font-bold tracking-widest mb-4">GYMSAATHI AI</div>
                        <div className="space-y-4">
                            <div className="h-2 w-full bg-cyan-900/50 rounded-full overflow-hidden"><div className="h-full w-full bg-cyan-400 animate-[loading_1s_infinite]" /></div>
                            <div className="h-2 w-3/4 bg-cyan-900/50 rounded-full" />
                            <div className="flex gap-2 mt-4">
                                <MessageCircle size={24} className="text-green-400" />
                                <CheckCircle size={24} className="text-blue-400" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Visual VFX Overlay Layer */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    {episodes.map((ep, i) => (
                        <div key={i} className="absolute inset-0 flex items-center justify-center">
                            {/* Chaos Elements */}
                            <div className={`chaos-${i} opacity-0 absolute top-10 left-10 text-red-500/50`}>
                                <ep.problem.icon size={120} />
                            </div>
                            <div className={`chaos-${i} opacity-0 absolute bottom-20 right-20 text-red-500/30 rotate-12`}>
                                <div className="bg-red-900/20 p-4 rounded-xl border border-red-500/50">MISSED REVENUE</div>
                            </div>

                            {/* Solution Elements */}
                            <div className={`solution-${i} opacity-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-green-400 scale-150 font-bold text-6xl shadow-black drop-shadow-lg`}>
                                {ep.solution.outcome}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default StoryMode;
