import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Send, CheckCircle2 } from 'lucide-react';

const Contact = () => {
    const containerRef = useRef<HTMLElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (!containerRef.current || !formRef.current) return;

        const ctx = gsap.context(() => {
            gsap.from(containerRef.current!.children, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out"
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        // Simulate submission
        setTimeout(() => {
            setSubmitted(false);
            if (formRef.current) formRef.current.reset();
        }, 3000);
    };

    return (
        <section id="contact" ref={containerRef} className="py-24 px-6 relative overflow-hidden flex flex-col items-center text-center">
            {/* Background Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

            <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Ready to <span className="text-primary">Transform</span> Your Gym?
            </h2>

            <p className="text-xl text-gray-400 max-w-2xl mb-12">
                Join hundreds of gym owners who are scaling their business with GymSaathi.
                Get a free demo and see the difference.
            </p>

            <form ref={formRef} onSubmit={handleSubmit} className="w-full max-w-md relative z-10">
                <div className="relative group">
                    <input
                        type="email"
                        placeholder="Enter your email address"
                        required
                        className="w-full px-6 py-4 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all pr-32"
                    />
                    <button
                        type="submit"
                        disabled={submitted}
                        className="absolute right-2 top-2 bottom-2 bg-primary hover:bg-orange-600 text-white px-6 rounded-full font-bold transition-all hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px]"
                    >
                        {submitted ? <CheckCircle2 size={20} /> : <div className="flex gap-2 items-center">Book <Send size={16} /></div>}
                    </button>
                </div>
                <p className="mt-4 text-sm text-gray-500">
                    No credit card required. Free 14-day trial.
                </p>
            </form>
        </section>
    );
};

export default Contact;
