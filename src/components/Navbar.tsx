import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Menu, X, ArrowRight } from 'lucide-react';
import clsx from 'clsx';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [show, setShow] = useState(true);
    const lastScrollY = useRef(0);
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > 100) {
                if (currentScrollY > lastScrollY.current) {
                    setShow(false);
                } else {
                    setShow(true);
                }
            } else {
                setShow(true);
            }
            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (navRef.current) {
            gsap.to(navRef.current, {
                y: show ? 0 : 150,
                opacity: show ? 1 : 0,
                duration: 0.4,
                ease: "power3.out"
            });
        }
    }, [show]);

    return (
        <div className="fixed bottom-8 left-0 w-full z-50 flex justify-center px-4 pointer-events-none">
            <nav
                ref={navRef}
                className={clsx(
                    "pointer-events-auto bg-dark/80 backdrop-blur-2xl border border-white/10 rounded-full px-2 p-2 shadow-2xl shadow-black/50 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden",
                    isOpen ? "w-[90vw] md:w-[600px] h-auto rounded-[32px]" : "w-[300px] h-[60px]"
                )}
            >
                <div className="flex items-center justify-between h-full px-4 w-full">
                    {/* Logo area */}
                    <a href="#" className="flex items-center gap-2 group interactive">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-black font-bold group-hover:scale-110 transition-transform">
                            G
                        </div>
                        <span className={clsx("font-bold text-white transition-opacity duration-300", isOpen ? "opacity-100" : "opacity-0 md:opacity-100")}>
                            GymSaathi
                        </span>
                    </a>

                    {/* Compact Actions (When closed) */}
                    <div className={clsx("flex items-center gap-2 absolute right-4 transition-all duration-300", isOpen ? "opacity-0 pointer-events-none translate-x-10" : "opacity-100 translate-x-0")}>
                        <button className="bg-white/10 hover:bg-white/20 text-white text-xs font-medium px-4 py-2 rounded-full transition-colors interactive">
                            Login
                        </button>
                        <button
                            onClick={() => setIsOpen(true)}
                            className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-black interactive hover:rotate-90 transition-transform"
                        >
                            <Menu size={18} />
                        </button>
                    </div>

                    {/* Expanded Content (When open) */}
                    <div className={clsx("flex flex-col w-full pt-20 pb-6 px-4 absolute top-0 left-0 transition-opacity duration-500 delay-100", isOpen ? "opacity-100" : "opacity-0 pointer-events-none")}>
                        {/* Close Button */}
                        <button
                            onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                            className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white interactive hover:bg-white/20 transition-colors"
                        >
                            <X size={18} />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h3 className="text-gray-500 text-xs uppercase tracking-widest">Navigation</h3>
                                <ul className="space-y-2">
                                    {['Features', 'Apps', 'Testimonials', 'Contact'].map((item) => (
                                        <li key={item}>
                                            <a href={`#${item.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-2xl font-bold text-white hover:text-primary transition-colors flex items-center gap-2 group interactive">
                                                <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                                {item}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-gray-500 text-xs uppercase tracking-widest">Get Started</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    Ready to transform your gym into a smart ecosystem?
                                </p>
                                <button className="w-full py-4 bg-primary text-black font-bold rounded-xl interactive hover:bg-orange-400 transition-colors">
                                    Book Free Demo
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
