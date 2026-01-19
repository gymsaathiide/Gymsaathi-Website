import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, Activity, LineChart, Video, Smartphone, ScanFace, Megaphone, CreditCard } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const slides = [
    {
        title: "Gym ERP",
        subtitle: "Complete Operations Control",
        description: "Manage members, automated billing, and staff attendance from a single dashboard.",
        color: "bg-blue-500",
        icon: LineChart
    },
    {
        title: "AI Diet Planner",
        subtitle: "Personalized Nutrition",
        description: "Generative AI creates custom diet plans based on member goals and BMI instantly.",
        color: "bg-green-500",
        icon: Brain
    },
    {
        title: "BCA Integration",
        subtitle: "Body Composition Analysis",
        description: "Sync with BCA machines to track muscle mass, fat percentage, and progress over time.",
        color: "bg-purple-500",
        icon: Activity
    },
    {
        title: "Marketing Wing",
        subtitle: "Automated Campaigns",
        description: "Blast WhatsApp & SMS campaigns to leads. Track conversions and ROI in real-time.",
        color: "bg-yellow-500",
        icon: Megaphone
    },
    {
        title: "POS & Billing",
        subtitle: "Smart Payments",
        description: "Integrated Point of Sale for pro-shop, juice bar, and membership renewals.",
        color: "bg-red-500",
        icon: CreditCard
    },
    {
        title: "Biometric Access",
        subtitle: "Face ID Entry",
        description: "Touchless entry for members. AI-powered face recognition for secure and fast check-ins.",
        color: "bg-cyan-500",
        icon: ScanFace
    },
    {
        title: "Virtual Dietitian",
        subtitle: "Expert Consultations",
        description: "In-app video calls with certified nutritionists for premium member guidance.",
        color: "bg-pink-500",
        icon: Video
    },
    {
        title: "Member App",
        subtitle: "White-Label Experience",
        description: "Your own branded app for members to book classes, track workouts, and renew plans.",
        color: "bg-orange-500",
        icon: Smartphone
    }
];

const SmartFeatures = () => {
    const containerRef = useRef<HTMLElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !sliderRef.current) return;

        const ctx = gsap.context(() => {
            const totalSlides = slides.length;

            gsap.to(sliderRef.current, {
                xPercent: -100 * (totalSlides - 1) / totalSlides,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    pin: true,
                    scrub: 1,
                    snap: 1 / (totalSlides - 1),
                    end: () => `+=${containerRef.current!.offsetWidth * totalSlides}`
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative h-screen overflow-hidden bg-dark">
            <div className="absolute top-10 left-10 z-10 pointer-events-none">
                <h2 className="text-4xl font-bold text-white mb-2">Smart Features</h2>
                <div className="h-1 w-20 bg-primary rounded-full" />
            </div>

            {/* Massive animated background element */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 z-0">
                <div className="absolute top-0 left-0 h-full w-20 bg-primary blur-[40px] animate-pulse" />
            </div>

            <div ref={sliderRef} className="flex h-full w-[800vw]">
                {slides.map((slide, index) => (
                    <div key={index} className="w-screen h-full flex items-center justify-center p-10 md:p-20 border-r border-white/5 relative">

                        {/* Background glow */}
                        <div className={`absolute inset-0 opacity-10 ${slide.color} blur-[150px] transition-opacity duration-500 hover:opacity-20`} />

                        <div className="flex flex-col md:flex-row items-center gap-12 max-w-7xl mx-auto z-10 w-full">

                            {/* Visual Side (Left) */}
                            <div className="w-full md:w-1/2 flex justify-center perspective-[1000px]">
                                <div className="w-[300px] h-[400px] md:w-[500px] md:h-[600px] bg-white/5 rounded-3xl border border-white/10 backdrop-blur-xl relative overflow-hidden group transform transition-transform duration-500 hover:rotate-y-12 hover:rotate-x-6 shadow-2xl shadow-black/50">
                                    <div className={`absolute inset-0 opacity-20 ${slide.color} bg-gradient-to-br from-white/10 to-transparent`} />

                                    {/* Mock UI Elements */}
                                    <div className="p-8 h-full flex flex-col relative">
                                        {/* Floating Icon */}
                                        <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center mb-8 backdrop-blur-md shadow-lg border border-white/20 z-20 group-hover:scale-110 transition-transform duration-500">
                                            <slide.icon size={40} className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                                        </div>

                                        {/* Abstract UI Lines */}
                                        <div className="space-y-6 flex-1">
                                            <div className="h-4 w-3/4 bg-white/10 rounded animate-pulse" />
                                            <div className="h-4 w-1/2 bg-white/10 rounded animate-pulse delay-75" />
                                            <div className="h-32 w-full bg-white/5 rounded-xl mt-8 border border-white/5 relative overflow-hidden">
                                                {/* Scanning bar effect inside the card */}
                                                {index === 5 && (
                                                    <div className="absolute top-0 left-0 w-full h-1 bg-primary shadow-[0_0_20px_rgba(254,121,0,1)] animate-[scan_2s_ease-in-out_infinite]" />
                                                )}
                                                {/* Data bars for others */}
                                                {(index !== 5) && (
                                                    <div className="absolute bottom-0 left-0 right-0 flex items-end justify-around h-full p-4 gap-2">
                                                        {[40, 70, 30, 85, 50].map((h, i) => (
                                                            <div key={i} className={`w-full bg-white/10 rounded-t-sm transition-all duration-1000 group-hover:bg-${slide.color.replace('bg-', '')}/50`} style={{ height: `${h}%` }} />
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Bottom Decor */}
                                        <div className="mt-auto pt-8 border-t border-white/5 flex justify-between items-center text-xs text-white/30 uppercase tracking-widest font-mono">
                                            <span>Sys.Ver 2.4</span>
                                            <span>{slide.title}</span>
                                        </div>
                                    </div>

                                    {/* Floating Tag */}
                                    <div className="absolute bottom-8 right-8 px-4 py-2 bg-white text-black font-bold rounded-full text-sm z-30 shadow-lg shadow-white/10">
                                        {slide.title}
                                    </div>
                                </div>
                            </div>

                            {/* Text Side (Right) */}
                            <div className="w-full md:w-1/2 space-y-8">
                                <h3 className={`text-xl font-bold ${slide.color.replace('bg-', 'text-')} uppercase tracking-widest flex items-center gap-4`}>
                                    <span className="w-12 h-[1px] bg-current opacity-50" />
                                    0{index + 1}
                                </h3>
                                <h2 className="text-5xl md:text-8xl font-bold text-white leading-tight">
                                    {slide.subtitle.split(' ').map((word, i) => (
                                        <span key={i} className="block">{word}</span>
                                    ))}
                                </h2>
                                <p className="text-xl text-gray-400 max-w-lg leading-relaxed border-l-2 border-white/10 pl-6">
                                    {slide.description}
                                </p>
                                <button className="group px-8 py-4 border border-white/20 rounded-full text-white hover:bg-white hover:text-black transition-all duration-300 font-bold mt-8 flex items-center gap-4 overflow-hidden relative">
                                    <span className="relative z-10">Explore {slide.title}</span>
                                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SmartFeatures;
