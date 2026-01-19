import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;

        if (!cursor || !follower) return;

        const onMouseMove = (e: MouseEvent) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: "power2.out"
            });
            gsap.to(follower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.5,
                ease: "power2.out"
            });
        };

        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouch) {
            // Hide on mobile
            cursor.style.display = 'none';
            follower.style.display = 'none';
            return;
        }

        document.addEventListener('mousemove', onMouseMove);

        // Add hover effects for interactive elements
        const links = document.querySelectorAll('a, button, input, .interactive');
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                gsap.to(cursor, { scale: 0, duration: 0.2 });
                gsap.to(follower, {
                    scale: 3,
                    backgroundColor: 'rgba(254, 121, 0, 0.2)',
                    borderColor: 'transparent',
                    duration: 0.3
                });
            });
            link.addEventListener('mouseleave', () => {
                gsap.to(cursor, { scale: 1, duration: 0.2 });
                gsap.to(follower, {
                    scale: 1,
                    backgroundColor: 'transparent',
                    borderColor: '#FE7900',
                    duration: 0.3
                });
            });
        });

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
        };
    }, []);

    return (
        <>
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-3 h-3 bg-primary rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
            />
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-10 h-10 border border-primary rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-transform duration-200"
            />
        </>
    );
};

export default CustomCursor;
