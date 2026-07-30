'use client';
import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { m } from 'motion/react';
import { Mail, Github, Linkedin, Phone } from 'lucide-react';

import { DURATION, EASE, revealTransition } from '@/lib/motion';
import { useMotionPrefs } from '@/lib/use-motion';

interface FooterLink {
	title: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
	label: string;
	links: FooterLink[];
}

const footerLinks: FooterSection[] = [
	{
		label: 'Navigation',
		links: [
			{ title: 'Home', href: '#home' },
			{ title: 'About', href: '#about' },
			{ title: 'Skills', href: '#skills' },
			{ title: 'Services', href: '#services' },
		],
	},
	{
		label: 'Work',
		links: [
			{ title: 'Experience', href: '#experience' },
			{ title: 'Projects', href: '#projects' },
			{ title: 'Publications', href: '#publications' },
			{ title: 'Contact', href: '#contact' },
		],
	},
	{
		label: 'Resources',
		links: [
			{ title: 'GitHub', href: 'https://github.com/Yeiad-Explore' },
			{ title: 'LinkedIn', href: 'https://www.linkedin.com/in/kabid-yeiad-496035262' },
			{ title: 'Resume', href: '#resume' },
		],
	},
	{
		label: 'Connect',
		links: [
			{ title: 'Email', href: 'mailto:kabidyeiad101@gmail.com', icon: Mail },
			{ title: 'GitHub', href: 'https://github.com/Yeiad-Explore', icon: Github },
			{ title: 'LinkedIn', href: 'https://www.linkedin.com/in/kabid-yeiad-496035262', icon: Linkedin },
			{ title: 'Phone', href: 'tel:01880864937', icon: Phone },
		],
	},
];

export function Footer() {
	return (
		<footer className="md:rounded-t-6xl relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center rounded-t-4xl border-t bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)] px-6 py-12 lg:py-16">
			<div className="bg-foreground/20 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" />

			<div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
				<AnimatedContainer className="space-y-4">
					<div className="flex items-center gap-2">
						<div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
							<span className="text-2xl font-bold text-primary">KY</span>
						</div>
						<span className="text-xl font-semibold">Kabid Yeiad</span>
					</div>
					<p className="text-muted-foreground text-sm">
						AI Engineer & Consultant specializing in intelligent automation solutions and AI-powered systems.
					</p>
					<p className="text-muted-foreground mt-8 text-sm md:mt-4">
						© {new Date().getFullYear()} Kabid Yeiad. All rights reserved.
					</p>
				</AnimatedContainer>

				<div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
					{footerLinks.map((section, index) => (
						<AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
							<div className="mb-10 md:mb-0">
								<h3 className="text-xs font-semibold">{section.label}</h3>
								<ul className="text-muted-foreground mt-4 space-y-2 text-sm">
									{section.links.map((link) => (
										<li key={link.title}>
											<a
												href={link.href}
												className="hover:text-foreground inline-flex items-center transition-all duration-300"
												target={link.href.startsWith('http') ? '_blank' : undefined}
												rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
											>
												{link.icon && <link.icon className="me-1 size-4" />}
												{link.title}
											</a>
										</li>
									))}
								</ul>
							</div>
						</AnimatedContainer>
					))}
				</div>
			</div>
		</footer>
	);
};

type ViewAnimationProps = {
	delay?: number;
	className?: ComponentProps<typeof m.div>['className'];
	children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
	// Reads the site-wide preference through the shared hook rather than calling
	// useReducedMotion() again here, and takes its timing from lib/motion.ts
	// rather than hardcoding it (§4, §7, G5).
	const { reduced, viewport } = useMotionPrefs();

	// The wrapper is rendered unconditionally. Returning bare `children` under
	// reduced motion (as this did originally) removes an element from the tree,
	// and because the preference only resolves on the client that is a hydration
	// mismatch. Reduced motion is expressed in the transition instead: blur and
	// translate settle instantly while opacity still fades (G5).
	return (
		// `m.div`, not `motion.div`: inside LazyMotion, `motion.*` bundles the full
		// feature set itself and defeats the code-splitting §4 asks for.
		<m.div
			initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={viewport}
			transition={revealTransition(
				reduced,
				{ duration: DURATION.revealSlow, ease: EASE.out },
				delay,
				['filter', 'translateY'],
			)}
			className={className}
		>
			{children}
		</m.div>
	);
};
