import { Facebook, Instagram, Linkedin, Twitter, ArrowUpRight } from 'lucide-react';

const FooterV2 = () => {
    return (
        <div
            className="relative h-[80vh] w-full"
            style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
        >
            <div className="fixed bottom-0 h-[80vh] w-full bg-primary flex flex-col justify-between p-10 md:p-20">
                {/* Massive Typography */}
                <div className="flex-1 flex items-center justify-center">
                    <h1 className="text-[12vw] md:text-[15vw] font-bold text-black border-b-2 border-black/10 leading-none tracking-tighter hover:tracking-normal transition-all duration-700 cursor-default">
                        GymSaathi
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-black">
                    <div className="space-y-4">
                        <h3 className="font-bold uppercase tracking-widest text-sm opacity-50">Socials</h3>
                        <div className="flex gap-4">
                            {[Instagram, Twitter, Linkedin, Facebook].map((Icon, i) => (
                                <a key={i} href="#" className="w-12 h-12 border border-black/20 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-bold uppercase tracking-widest text-sm opacity-50">Links</h3>
                        <ul className="space-y-2 text-lg font-medium">
                            {['Features', 'Pricing', 'Login', 'Book Demo'].map((link) => (
                                <li key={link}>
                                    <a href="#" className="flex items-center gap-2 hover:translate-x-2 transition-transform">
                                        {link} <ArrowUpRight size={14} />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-4 flex flex-col justify-end items-end text-right">
                        <p className="text-xl font-bold">© 2026 GymSaathi Inc.</p>
                        <p className="opacity-60 max-w-xs">
                            Made with kinetic energy in India.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FooterV2;
