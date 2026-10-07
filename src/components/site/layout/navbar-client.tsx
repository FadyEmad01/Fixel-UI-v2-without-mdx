// // // "use client";

// // // import Image from "next/image";
// // // import Link from "next/link";
// // // import { usePathname } from "next/navigation";
// // // import { useEffect, useRef, useState, type ReactNode } from "react";
// // // import { AnimatePresence, motion } from "motion/react";
// // // // import { useLenis } from "lenis/react";
// // // import { MenuIconSmall } from "@/components/icons/menuSmall";
// // // import { MenuIconHandle } from "@/components/icons/menu";
// // // import { Search, SearchX, X } from "lucide-react";

// // // const ease = [0.76, 0, 0.24, 1] as const;

// // // const navbarVariants = {
// // //   closed: {
// // //     width: "var(--navbar-closed-width)",
// // //     transition: { duration: 0.7, delay: 0.65, ease },
// // //   },
// // //   open: {
// // //     width: "min(980px, calc(100vw - 40px))",
// // //     transition: { duration: 0.7, ease },
// // //   },
// // // };
// // // const panelVariants = {
// // //   closed: {
// // //     clipPath: "inset(0 0 100% 0)",
// // //     transition: { duration: 0.55, ease },
// // //   },
// // //   open: {
// // //     clipPath: "inset(0 0 0% 0)",
// // //     transition: { duration: 0.65, delay: 0.7, ease },
// // //   },
// // // };
// // // const linksContainerVariants = {
// // //   closed: { opacity: 0 },
// // //   open: {
// // //     opacity: 1,
// // //     transition: { delayChildren: 0.95, staggerChildren: 0.06 },
// // //   },
// // // };
// // // const linkVariants = {
// // //   closed: { opacity: 0, y: 20, transition: { duration: 0.2, ease } },
// // //   open: {
// // //     opacity: 1,
// // //     y: 0,
// // //     transition: { duration: 0.45, ease: [0.25, 0.4, 0.1, 1] as const },
// // //   },
// // // };
// // // const logoAnimation = {
// // //   initial: { opacity: 0, y: 4, scale: 0.96, filter: "blur(4px)" },
// // //   animate: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
// // //   exit: { opacity: 0, y: -4, scale: 0.96, filter: "blur(4px)" },
// // //   transition: { duration: 0.3, ease: [0.25, 0.4, 0.1, 1] as const },
// // // };

// // // const navLinks = [
// // //   { title: "Home", href: "/" },
// // //   { title: "Projects", href: "/#project" },
// // //   { title: "Showcase", href: "/showcase" },
// // //   { title: "About", href: "/about" },
// // //   { title: "Contact", href: "/contact" },
// // // ];

// // // // Mock Search Data
// // // const mockSearchData = [
// // //   { id: 1, title: "Button Component", category: "Components", href: "/docs/button" },
// // //   { id: 2, title: "Navbar Component", category: "Components", href: "/docs/navbar" },
// // //   { id: 3, title: "Getting Started", category: "Guide", href: "/docs/getting-started" },
// // //   { id: 4, title: "Framer Motion Basics", category: "Tutorials", href: "/tutorials/motion" },
// // //   { id: 5, title: "Dark Mode Setup", category: "Guide", href: "/docs/dark-mode" },
// // //   { id: 6, title: "Showcase Gallery", category: "Pages", href: "/showcase" },
// // // ];

// // // type NavbarClientProps = { githubStars: ReactNode };

// // // export default function NavbarClient({ githubStars }: NavbarClientProps) {
// // //   // Changed state to handle multiple panels
// // //   const [activePanel, setActivePanel] = useState<"menu" | "search" | null>(null);
// // //   const [searchQuery, setSearchQuery] = useState("");
// // //   const [isScrolled, setIsScrolled] = useState(false);
// // //   const [hasMounted, setHasMounted] = useState(false);

// // //   const menuRef = useRef<MenuIconHandle>(null);
// // //   const pathname = usePathname();
// // //   // const lenis = useLenis();

// // //   // Filter Search Results
// // //   const filteredResults = mockSearchData.filter(
// // //     (item) =>
// // //       item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
// // //       item.category.toLowerCase().includes(searchQuery.toLowerCase())
// // //   );

// // //   const handleHashClick = (
// // //     e: React.MouseEvent<HTMLAnchorElement>,
// // //     href: string,
// // //   ) => {
// // //     const hashIndex = href.indexOf("#");
// // //     if (hashIndex === -1) {
// // //       setActivePanel(null);
// // //       return;
// // //     }
// // //     const hash = href.substring(hashIndex);
// // //     if (pathname === "/") {
// // //       e.preventDefault();
// // //       const element = document.querySelector(hash) as HTMLElement | null;
// // //       if (element) {
// // //         setActivePanel(null);
// // //         requestAnimationFrame(() => {
// // //           history.replaceState(null, "", hash);
// // //         });
// // //       }
// // //     } else {
// // //       setActivePanel(null);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     const scrolled = window.scrollY > 120;
// // //     setIsScrolled(scrolled);
// // //     setHasMounted(true);
// // //   }, []);

// // //   useEffect(() => {
// // //     const handleScroll = () => {
// // //       const scrolled = window.scrollY > 120;
// // //       setIsScrolled((current) => (current === scrolled ? current : scrolled));
// // //     };
// // //     window.addEventListener("scroll", handleScroll, { passive: true });
// // //     return () => {
// // //       window.removeEventListener("scroll", handleScroll);
// // //     };
// // //   }, []);

// // //   useEffect(() => {
// // //     if (activePanel !== null) {
// // //       menuRef.current?.startAnimation();
// // //       document.body.style.overflow = "hidden";
// // //     } else {
// // //       menuRef.current?.stopAnimation();
// // //       document.body.style.overflow = "";
// // //       // Optional: Clear search on close
// // //       setTimeout(() => setSearchQuery(""), 500);
// // //     }
// // //     return () => {
// // //       document.body.style.overflow = "";
// // //     };
// // //   }, [activePanel]);

// // //   const isAnyPanelOpen = activePanel !== null;

// // //   return (
// // //     <div className="fixed top-6 left-1/2 z-50 w-auto -translate-x-1/2 flex flex-row items-center gap-2">
// // //       {/* NAVBAR */}
// // //       <motion.div
// // //         variants={navbarVariants}
// // //         animate={isAnyPanelOpen ? "open" : "closed"}
// // //         initial="closed"
// // //         className="relative z-20 flex h-[40px] max-w-[calc(100vw-40px)] items-center rounded-lg bg-neutral-200/70 py-1.5 pl-3 pr-3 text-sm font-medium text-black backdrop-blur-[20px] will-change-[width] dark:bg-white/15 dark:text-white [--navbar-closed-width:300px] sm:[--navbar-closed-width:360px]"
// // //       >
// // //         {/* LEFT — MENU */}
// // //         <button
// // //           type="button"
// // //           onClick={() => {
// // //             setActivePanel((prev) => (prev !== null ? null : "menu"));
// // //           }}
// // //           className="flex w-auto items-center justify-start gap-x-1 pr-1.5 outline-none transition-opacity hover:opacity-70"
// // //           aria-label={isAnyPanelOpen ? "Close panel" : "Open menu"}
// // //           aria-expanded={isAnyPanelOpen}
// // //         >
// // //           <MenuIconSmall ref={menuRef} />
// // //           <span className="whitespace-nowrap font-archivo text-lg">
// // //             {isAnyPanelOpen ? "Close" : "Menu"}
// // //           </span>
// // //         </button>

// // //         {/* CENTER — LOGO */}
// // //         <div className="pointer-events-none absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
// // //           <AnimatePresence mode="wait" initial={false}>
// // //             {!isScrolled ? (
// // //               <motion.span
// // //                 key="text-logo"
// // //                 initial={hasMounted ? logoAnimation.initial : false}
// // //                 animate={logoAnimation.animate}
// // //                 exit={logoAnimation.exit}
// // //                 transition={logoAnimation.transition}
// // //                 className="block whitespace-nowrap font-archivo text-[18px] font-medium tracking-[-0.03em]"
// // //               >
// // //                 Fixel UI
// // //               </motion.span>
// // //             ) : (
// // //               <motion.div
// // //                 key="image-logo"
// // //                 initial={hasMounted ? logoAnimation.initial : false}
// // //                 animate={logoAnimation.animate}
// // //                 exit={logoAnimation.exit}
// // //                 transition={logoAnimation.transition}
// // //                 className="relative size-6"
// // //               >
// // //                 <Image
// // //                   src="/logo.svg"
// // //                   alt="Fixel UI"
// // //                   fill
// // //                   priority
// // //                   sizes="24px"
// // //                   className="object-contain invert dark:invert-0"
// // //                 />
// // //               </motion.div>
// // //             )}
// // //           </AnimatePresence>
// // //         </div>

// // //         {/* RIGHT — GITHUB */}
// // //         <div className="ml-auto flex items-center">{githubStars}</div>
// // //       </motion.div>

// // //       {/* SEARCH TOGGLE BUTTON */}
// // //       <button
// // //         onClick={() => setActivePanel((prev) => (prev === "search" ? null : "search"))}
// // //         className="hidden lg:flex h-[40px] w-[40px] items-center justify-center rounded-lg bg-neutral-200/70 text-black backdrop-blur-[20px] transition-opacity hover:opacity-70 dark:bg-white/15 dark:text-white"
// // //         aria-label="Toggle Search"
// // //       >
// // //         {activePanel === "search" ? (
// // //           <SearchX className="size-4 text-black dark:text-white" />
// // //         ) : (
// // //           <Search className="size-4 text-black dark:text-white" />
// // //         )}
// // //       </button>

// // //       {/* ======================= */}
// // //       {/* MENU PANEL              */}
// // //       {/* ======================= */}
// // //       <motion.div
// // //         variants={panelVariants}
// // //         animate={activePanel === "menu" ? "open" : "closed"}
// // //         initial="closed"
// // //         className="absolute top-[48px] left-0 z-10 h-[calc(100svh-168px)] w-full overflow-hidden rounded-lg bg-neutral-200/70 text-black backdrop-blur-[20px] dark:bg-white/15 dark:text-white"
// // //         style={{ willChange: "clip-path", contain: "paint" }}
// // //       >
// // //         <div className="flex h-full min-h-0 flex-col overflow-y-auto px-4 pt-10 pb-4 sm:px-6 sm:pt-14 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
// // //           <motion.nav
// // //             variants={linksContainerVariants}
// // //             animate={activePanel === "menu" ? "open" : "closed"}
// // //             initial="closed"
// // //             className="flex flex-col gap-3 sm:gap-4"
// // //           >
// // //             {navLinks.map((link) => (
// // //               <motion.div key={link.title} variants={linkVariants}>
// // //                 <Link
// // //                   href={link.href}
// // //                   onClick={(e) => handleHashClick(e, link.href)}
// // //                   className="block font-archivo text-[clamp(2.5rem,8vh,5.5rem)] font-normal leading-[0.9] tracking-tighter text-black transition-colors duration-300 hover:text-black/50 dark:text-white dark:hover:text-white/15"
// // //                 >
// // //                   {link.title}
// // //                 </Link>
// // //               </motion.div>
// // //             ))}
// // //           </motion.nav>

// // //           {/* FOOTER */}
// // //           <motion.div
// // //             variants={linkVariants}
// // //             animate={activePanel === "menu" ? "open" : "closed"}
// // //             initial="closed"
// // //             className="mt-auto flex shrink-0 flex-wrap items-end justify-between gap-4 border-t border-black/10 pt-4 dark:border-white/15"
// // //           >
// // //             <div className="flex flex-col gap-1">
// // //               <span className="text-xs uppercase tracking-widest text-black/50 dark:text-white/50">
// // //                 Get in touch
// // //               </span>
// // //               <a
// // //                 href="mailto:fadyemad933@gmail.com"
// // //                 className="text-[13px] transition-colors hover:text-black/50 dark:hover:text-white/50 sm:text-sm"
// // //               >
// // //                 fadyemad933@gmail.com
// // //               </a>
// // //             </div>
// // //             <div className="flex gap-4 text-[13px] sm:text-sm">
// // //               <a
// // //                 href="https://www.linkedin.com/in/fady-emad-sabry"
// // //                 target="_blank"
// // //                 rel="noreferrer"
// // //                 className="transition-colors hover:text-black/50 dark:hover:text-white/50"
// // //               >
// // //                 LinkedIn
// // //               </a>
// // //               <a
// // //                 href="https://github.com/FadyEmad01"
// // //                 target="_blank"
// // //                 rel="noreferrer"
// // //                 className="transition-colors hover:text-black/50 dark:hover:text-white/50"
// // //               >
// // //                 GitHub
// // //               </a>
// // //             </div>
// // //           </motion.div>
// // //         </div>
// // //       </motion.div>

// // //       {/* ======================= */}
// // //       {/* SEARCH PANEL            */}
// // //       {/* ======================= */}
// // //       <motion.div
// // //         variants={panelVariants}
// // //         animate={activePanel === "search" ? "open" : "closed"}
// // //         initial="closed"
// // //         className="absolute top-[48px] left-0 z-10 h-[calc(100svh-168px)] w-full overflow-hidden rounded-lg bg-neutral-200/70 text-black backdrop-blur-[20px] dark:bg-white/15 dark:text-white"
// // //         style={{ willChange: "clip-path", contain: "paint" }}
// // //       >
// // //         <div className="flex h-full min-h-0 flex-col px-4 pt-10 pb-4 sm:px-6 sm:pt-14">
// // //           <div className="w-full h-full flex items-center justify-center">
// // //             <span className="text-black dark:text-white text-6xl font-archivo">coming soon</span>
// // //           </div>
// // //         </div>
// // //       </motion.div>
// // //     </div>
// // //   );
// // // }

// // // // "use client";

// // // // import Image from "next/image";
// // // // import Link from "next/link";
// // // // import { usePathname } from "next/navigation";
// // // // import { useEffect, useRef, useState, type ReactNode } from "react";
// // // // import { AnimatePresence, motion } from "motion/react";
// // // // // import { useLenis } from "lenis/react";
// // // // import { MenuIconSmall } from "@/components/icons/menuSmall";
// // // // import { MenuIconHandle } from "@/components/icons/menu";
// // // // import { Search, SearchX, X } from "lucide-react";

// // // // const ease = [0.76, 0, 0.24, 1] as const;

// // // // const navbarVariants = {
// // // //   closed: {
// // // //     width: "var(--navbar-closed-width)",
// // // //     transition: { duration: 0.7, delay: 0.65, ease },
// // // //   },
// // // //   open: {
// // // //     width: "min(980px, calc(100vw - 40px))",
// // // //     transition: { duration: 0.7, ease },
// // // //   },
// // // // };

// // // // const panelVariants = {
// // // //   closed: {
// // // //     clipPath: "inset(0 0 100% 0)",
// // // //     transition: { duration: 0.55, ease },
// // // //   },
// // // //   open: {
// // // //     clipPath: "inset(0 0 0% 0)",
// // // //     transition: { duration: 0.65, delay: 0.7, ease },
// // // //   },
// // // // };

// // // // const linksContainerVariants = {
// // // //   closed: { opacity: 0 },
// // // //   open: {
// // // //     opacity: 1,
// // // //     transition: { delayChildren: 0.95, staggerChildren: 0.06 },
// // // //   },
// // // // };

// // // // const linkVariants = {
// // // //   closed: {
// // // //     opacity: 0,
// // // //     y: 20,
// // // //     transition: { duration: 0.2, ease },
// // // //   },
// // // //   open: {
// // // //     opacity: 1,
// // // //     y: 0,
// // // //     transition: { duration: 0.45, ease: [0.25, 0.4, 0.1, 1] as const },
// // // //   },
// // // // };

// // // // const logoAnimation = {
// // // //   initial: {
// // // //     opacity: 0,
// // // //     y: 4,
// // // //     scale: 0.96,
// // // //     filter: "blur(4px)",
// // // //   },
// // // //   animate: {
// // // //     opacity: 1,
// // // //     y: 0,
// // // //     scale: 1,
// // // //     filter: "blur(0px)",
// // // //   },
// // // //   exit: {
// // // //     opacity: 0,
// // // //     y: -4,
// // // //     scale: 0.96,
// // // //     filter: "blur(4px)",
// // // //   },
// // // //   transition: {
// // // //     duration: 0.3,
// // // //     ease: [0.25, 0.4, 0.1, 1] as const,
// // // //   },
// // // // };

// // // // const navLinks = [
// // // //   { title: "Home", href: "/" },
// // // //   { title: "Projects", href: "/#project" },
// // // //   { title: "Showcase", href: "/showcase" },
// // // //   { title: "About", href: "/about" },
// // // //   { title: "Contact", href: "/contact" },
// // // // ];

// // // // // Mock Search Data
// // // // const mockSearchData = [
// // // //   {
// // // //     id: 1,
// // // //     title: "Button Component",
// // // //     category: "Components",
// // // //     href: "/docs/button",
// // // //   },
// // // //   {
// // // //     id: 2,
// // // //     title: "Navbar Component",
// // // //     category: "Components",
// // // //     href: "/docs/navbar",
// // // //   },
// // // //   {
// // // //     id: 3,
// // // //     title: "Getting Started",
// // // //     category: "Guide",
// // // //     href: "/docs/getting-started",
// // // //   },
// // // //   {
// // // //     id: 4,
// // // //     title: "Framer Motion Basics",
// // // //     category: "Tutorials",
// // // //     href: "/tutorials/motion",
// // // //   },
// // // //   {
// // // //     id: 5,
// // // //     title: "Dark Mode Setup",
// // // //     category: "Guide",
// // // //     href: "/docs/dark-mode",
// // // //   },
// // // //   {
// // // //     id: 6,
// // // //     title: "Showcase Gallery",
// // // //     category: "Pages",
// // // //     href: "/showcase",
// // // //   },
// // // // ];

// // // // type NavbarClientProps = {
// // // //   githubStars: ReactNode;
// // // // };

// // // // type NavbarLogoProps = {
// // // //   isScrolled: boolean;
// // // //   hasMounted: boolean;
// // // // };

// // // // type MenuButtonProps = {
// // // //   isAnyPanelOpen: boolean;
// // // //   menuRef: React.RefObject<MenuIconHandle | null>;
// // // //   onClick: () => void;
// // // // };

// // // // type SearchButtonProps = {
// // // //   activePanel: "menu" | "search" | null;
// // // //   onClick: () => void;
// // // // };

// // // // type PanelShellProps = {
// // // //   isOpen: boolean;
// // // //   children: ReactNode;
// // // // };

// // // // type MenuNavItemProps = {
// // // //   title: string;
// // // //   href: string;
// // // //   onClick: (
// // // //     e: React.MouseEvent<HTMLAnchorElement>,
// // // //     href: string,
// // // //   ) => void;
// // // // };

// // // // type MenuFooterProps = {
// // // //   variants: typeof linkVariants;
// // // //   activePanel: "menu" | "search" | null;
// // // // };

// // // // type MenuPanelProps = {
// // // //   activePanel: "menu" | "search" | null;
// // // //   onHashClick: (
// // // //     e: React.MouseEvent<HTMLAnchorElement>,
// // // //     href: string,
// // // //   ) => void;
// // // // };

// // // // type SearchPanelProps = {
// // // //   activePanel: "menu" | "search" | null;
// // // // };

// // // // function NavbarLogo({
// // // //   isScrolled,
// // // //   hasMounted,
// // // // }: NavbarLogoProps) {
// // // //   return (
// // // //     <div className="pointer-events-none absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
// // // //       <AnimatePresence mode="wait" initial={false}>
// // // //         {!isScrolled ? (
// // // //           <motion.span
// // // //             key="text-logo"
// // // //             initial={hasMounted ? logoAnimation.initial : false}
// // // //             animate={logoAnimation.animate}
// // // //             exit={logoAnimation.exit}
// // // //             transition={logoAnimation.transition}
// // // //             className="block whitespace-nowrap font-archivo text-[18px] font-medium tracking-[-0.03em]"
// // // //           >
// // // //             Fixel UI
// // // //           </motion.span>
// // // //         ) : (
// // // //           <motion.div
// // // //             key="image-logo"
// // // //             initial={hasMounted ? logoAnimation.initial : false}
// // // //             animate={logoAnimation.animate}
// // // //             exit={logoAnimation.exit}
// // // //             transition={logoAnimation.transition}
// // // //             className="relative size-6"
// // // //           >
// // // //             <Image
// // // //               src="/logo.svg"
// // // //               alt="Fixel UI"
// // // //               fill
// // // //               priority
// // // //               sizes="24px"
// // // //               className="object-contain invert dark:invert-0"
// // // //             />
// // // //           </motion.div>
// // // //         )}
// // // //       </AnimatePresence>
// // // //     </div>
// // // //   );
// // // // }

// // // // function MenuButton({
// // // //   isAnyPanelOpen,
// // // //   menuRef,
// // // //   onClick,
// // // // }: MenuButtonProps) {
// // // //   return (
// // // //     <button
// // // //       type="button"
// // // //       onClick={onClick}
// // // //       className="flex w-auto items-center justify-start gap-x-1 pr-1.5 outline-none transition-opacity hover:opacity-70"
// // // //       aria-label={isAnyPanelOpen ? "Close panel" : "Open menu"}
// // // //       aria-expanded={isAnyPanelOpen}
// // // //     >
// // // //       <MenuIconSmall ref={menuRef} />

// // // //       <span className="whitespace-nowrap font-archivo text-lg">
// // // //         {isAnyPanelOpen ? "Close" : "Menu"}
// // // //       </span>
// // // //     </button>
// // // //   );
// // // // }

// // // // function SearchButton({
// // // //   activePanel,
// // // //   onClick,
// // // // }: SearchButtonProps) {
// // // //   return (
// // // //     <button
// // // //       onClick={onClick}
// // // //       className="hidden lg:flex h-[40px] w-[40px] items-center justify-center rounded-lg bg-neutral-200/70 text-black backdrop-blur-[20px] transition-opacity hover:opacity-70 dark:bg-white/15 dark:text-white"
// // // //       aria-label="Toggle Search"
// // // //     >
// // // //       {activePanel === "search" ? (
// // // //         <SearchX className="size-4 text-black dark:text-white" />
// // // //       ) : (
// // // //         <Search className="size-4 text-black dark:text-white" />
// // // //       )}
// // // //     </button>
// // // //   );
// // // // }

// // // // function NavbarBar({
// // // //   githubStars,
// // // //   isAnyPanelOpen,
// // // //   isScrolled,
// // // //   hasMounted,
// // // //   menuRef,
// // // //   onMenuClick,
// // // // }: {
// // // //   githubStars: ReactNode;
// // // //   isAnyPanelOpen: boolean;
// // // //   isScrolled: boolean;
// // // //   hasMounted: boolean;
// // // //   menuRef: React.RefObject<MenuIconHandle | null>;
// // // //   onMenuClick: () => void;
// // // // }) {
// // // //   return (
// // // //     <motion.div
// // // //       variants={navbarVariants}
// // // //       animate={isAnyPanelOpen ? "open" : "closed"}
// // // //       initial="closed"
// // // //       className="relative z-20 flex h-[40px] max-w-[calc(100vw-40px)] items-center rounded-lg bg-neutral-200/70 py-1.5 pl-3 pr-3 text-sm font-medium text-black backdrop-blur-[20px] will-change-[width] dark:bg-white/15 dark:text-white [--navbar-closed-width:300px] sm:[--navbar-closed-width:360px]"
// // // //     >
// // // //       {/* LEFT — MENU */}
// // // //       <MenuButton
// // // //         isAnyPanelOpen={isAnyPanelOpen}
// // // //         menuRef={menuRef}
// // // //         onClick={onMenuClick}
// // // //       />

// // // //       {/* CENTER — LOGO */}
// // // //       <NavbarLogo
// // // //         isScrolled={isScrolled}
// // // //         hasMounted={hasMounted}
// // // //       />

// // // //       {/* RIGHT — GITHUB */}
// // // //       <div className="ml-auto flex items-center">
// // // //         {githubStars}
// // // //       </div>
// // // //     </motion.div>
// // // //   );
// // // // }

// // // // function PanelShell({
// // // //   isOpen,
// // // //   children,
// // // // }: PanelShellProps) {
// // // //   return (
// // // //     <motion.div
// // // //       variants={panelVariants}
// // // //       animate={isOpen ? "open" : "closed"}
// // // //       initial="closed"
// // // //       className="absolute top-[48px] left-0 z-10 h-[calc(100svh-168px)] w-full overflow-hidden rounded-lg bg-neutral-200/70 text-black backdrop-blur-[20px] dark:bg-white/15 dark:text-white"
// // // //       style={{ willChange: "clip-path", contain: "paint" }}
// // // //     >
// // // //       {children}
// // // //     </motion.div>
// // // //   );
// // // // }

// // // // function MenuNavItem({
// // // //   title,
// // // //   href,
// // // //   onClick,
// // // // }: MenuNavItemProps) {
// // // //   return (
// // // //     <motion.div
// // // //       key={title}
// // // //       variants={linkVariants}
// // // //     >
// // // //       <Link
// // // //         href={href}
// // // //         onClick={(e) => onClick(e, href)}
// // // //         className="block font-archivo text-[clamp(2.5rem,8vh,5.5rem)] font-normal leading-[0.9] tracking-tighter text-black transition-colors duration-300 hover:text-black/50 dark:text-white dark:hover:text-white/15"
// // // //       >
// // // //         {title}
// // // //       </Link>
// // // //     </motion.div>
// // // //   );
// // // // }

// // // // function MenuFooter({
// // // //   variants,
// // // //   activePanel,
// // // // }: MenuFooterProps) {
// // // //   return (
// // // //     <motion.div
// // // //       variants={variants}
// // // //       animate={activePanel === "menu" ? "open" : "closed"}
// // // //       initial="closed"
// // // //       className="mt-auto flex shrink-0 flex-wrap items-end justify-between gap-4 border-t border-black/10 pt-4 dark:border-white/15"
// // // //     >
// // // //       <div className="flex flex-col gap-1">
// // // //         <span className="text-xs uppercase tracking-widest text-black/50 dark:text-white/50">
// // // //           Get in touch
// // // //         </span>

// // // //         <a
// // // //           href="mailto:fadyemad933@gmail.com"
// // // //           className="text-[13px] transition-colors hover:text-black/50 dark:hover:text-white/50 sm:text-sm"
// // // //         >
// // // //           fadyemad933@gmail.com
// // // //         </a>
// // // //       </div>

// // // //       <div className="flex gap-4 text-[13px] sm:text-sm">
// // // //         <a
// // // //           href="https://www.linkedin.com/in/fady-emad-sabry"
// // // //           target="_blank"
// // // //           rel="noreferrer"
// // // //           className="transition-colors hover:text-black/50 dark:hover:text-white/50"
// // // //         >
// // // //           LinkedIn
// // // //         </a>

// // // //         <a
// // // //           href="https://github.com/FadyEmad01"
// // // //           target="_blank"
// // // //           rel="noreferrer"
// // // //           className="transition-colors hover:text-black/50 dark:hover:text-white/50"
// // // //         >
// // // //           GitHub
// // // //         </a>
// // // //       </div>
// // // //     </motion.div>
// // // //   );
// // // // }

// // // // function MenuPanel({
// // // //   activePanel,
// // // //   onHashClick,
// // // // }: MenuPanelProps) {
// // // //   return (
// // // //     <PanelShell isOpen={activePanel === "menu"}>
// // // //       <div className="flex h-full min-h-0 flex-col overflow-y-auto px-4 pt-10 pb-4 sm:px-6 sm:pt-14 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
// // // //         <motion.nav
// // // //           variants={linksContainerVariants}
// // // //           animate={activePanel === "menu" ? "open" : "closed"}
// // // //           initial="closed"
// // // //           className="flex flex-col gap-3 sm:gap-4"
// // // //         >
// // // //           {navLinks.map((link) => (
// // // //             <MenuNavItem
// // // //               key={link.title}
// // // //               title={link.title}
// // // //               href={link.href}
// // // //               onClick={onHashClick}
// // // //             />
// // // //           ))}
// // // //         </motion.nav>

// // // //         {/* FOOTER */}
// // // //         <MenuFooter
// // // //           variants={linkVariants}
// // // //           activePanel={activePanel}
// // // //         />
// // // //       </div>
// // // //     </PanelShell>
// // // //   );
// // // // }

// // // // function SearchPanel({
// // // //   activePanel,
// // // // }: SearchPanelProps) {
// // // //   return (
// // // //     <PanelShell isOpen={activePanel === "search"}>
// // // //       <div className="flex h-full min-h-0 flex-col px-4 pt-10 pb-4 sm:px-6 sm:pt-14">
// // // //         <div className="w-full h-full flex items-center justify-center">
// // // //           <span className="text-black dark:text-white text-6xl font-archivo">
// // // //             coming soon
// // // //           </span>
// // // //         </div>
// // // //       </div>
// // // //     </PanelShell>
// // // //   );
// // // // }

// // // // export default function NavbarClient({
// // // //   githubStars,
// // // // }: NavbarClientProps) {
// // // //   // Changed state to handle multiple panels
// // // //   const [activePanel, setActivePanel] = useState<
// // // //     "menu" | "search" | null
// // // //   >(null);

// // // //   const [searchQuery, setSearchQuery] = useState("");
// // // //   const [isScrolled, setIsScrolled] = useState(false);
// // // //   const [hasMounted, setHasMounted] = useState(false);

// // // //   const menuRef = useRef<MenuIconHandle>(null);
// // // //   const pathname = usePathname();
// // // //   // const lenis = useLenis();

// // // //   // Filter Search Results
// // // //   const filteredResults = mockSearchData.filter(
// // // //     (item) =>
// // // //       item.title
// // // //         .toLowerCase()
// // // //         .includes(searchQuery.toLowerCase()) ||
// // // //       item.category
// // // //         .toLowerCase()
// // // //         .includes(searchQuery.toLowerCase()),
// // // //   );

// // // //   const handleHashClick = (
// // // //     e: React.MouseEvent<HTMLAnchorElement>,
// // // //     href: string,
// // // //   ) => {
// // // //     const hashIndex = href.indexOf("#");

// // // //     if (hashIndex === -1) {
// // // //       setActivePanel(null);
// // // //       return;
// // // //     }

// // // //     const hash = href.substring(hashIndex);

// // // //     if (pathname === "/") {
// // // //       e.preventDefault();

// // // //       const element = document.querySelector(hash) as HTMLElement | null;

// // // //       if (element) {
// // // //         setActivePanel(null);

// // // //         requestAnimationFrame(() => {
// // // //           history.replaceState(null, "", hash);
// // // //         });
// // // //       }
// // // //     } else {
// // // //       setActivePanel(null);
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     const scrolled = window.scrollY > 120;

// // // //     setIsScrolled(scrolled);
// // // //     setHasMounted(true);
// // // //   }, []);

// // // //   useEffect(() => {
// // // //     const handleScroll = () => {
// // // //       const scrolled = window.scrollY > 120;

// // // //       setIsScrolled((current) =>
// // // //         current === scrolled ? current : scrolled,
// // // //       );
// // // //     };

// // // //     window.addEventListener("scroll", handleScroll, {
// // // //       passive: true,
// // // //     });

// // // //     return () => {
// // // //       window.removeEventListener("scroll", handleScroll);
// // // //     };
// // // //   }, []);

// // // //   useEffect(() => {
// // // //     if (activePanel !== null) {
// // // //       menuRef.current?.startAnimation();
// // // //       document.body.style.overflow = "hidden";
// // // //     } else {
// // // //       menuRef.current?.stopAnimation();
// // // //       document.body.style.overflow = "";

// // // //       // Optional: Clear search on close
// // // //       setTimeout(() => setSearchQuery(""), 500);
// // // //     }

// // // //     return () => {
// // // //       document.body.style.overflow = "";
// // // //     };
// // // //   }, [activePanel]);

// // // //   const isAnyPanelOpen = activePanel !== null;

// // // //   return (
// // // //     <div className="fixed top-6 left-1/2 z-50 w-auto -translate-x-1/2 flex flex-row items-center gap-2">
// // // //       <NavbarBar
// // // //         githubStars={githubStars}
// // // //         isAnyPanelOpen={isAnyPanelOpen}
// // // //         isScrolled={isScrolled}
// // // //         hasMounted={hasMounted}
// // // //         menuRef={menuRef}
// // // //         onMenuClick={() => {
// // // //           setActivePanel((prev) =>
// // // //             prev !== null ? null : "menu",
// // // //           );
// // // //         }}
// // // //       />

// // // //       {/* SEARCH TOGGLE BUTTON */}
// // // //       <SearchButton
// // // //         activePanel={activePanel}
// // // //         onClick={() => {
// // // //           setActivePanel((prev) =>
// // // //             prev === "search" ? null : "search",
// // // //           );
// // // //         }}
// // // //       />

// // // //       {/* ======================= */}
// // // //       {/* MENU PANEL              */}
// // // //       {/* ======================= */}
// // // //       <MenuPanel
// // // //         activePanel={activePanel}
// // // //         onHashClick={handleHashClick}
// // // //       />

// // // //       {/* ======================= */}
// // // //       {/* SEARCH PANEL            */}
// // // //       {/* ======================= */}
// // // //       <SearchPanel activePanel={activePanel} />
// // // //     </div>
// // // //   );
// // // // }

// // "use client";

// // import Image from "next/image";
// // import Link from "next/link";
// // import { usePathname } from "next/navigation";
// // import { useEffect, useRef, useState, type ReactNode } from "react";
// // import { AnimatePresence, motion } from "motion/react";
// // // import { useLenis } from "lenis/react";
// // import { MenuIconSmall } from "@/components/icons/menuSmall";
// // import { MenuIconHandle } from "@/components/icons/menu";
// // import { Search, SearchX } from "lucide-react";

// // const ease = [0.76, 0, 0.24, 1] as const;

// // const navbarVariants = {
// //   closed: {
// //     width: "var(--navbar-closed-width)",
// //     transition: { duration: 0.7, delay: 0.65, ease },
// //   },
// //   open: {
// //     width: "min(980px, calc(100vw - 40px))",
// //     transition: { duration: 0.7, ease },
// //   },
// // };
// // const panelVariants = {
// //   closed: {
// //     clipPath: "inset(0 0 100% 0)",
// //     transition: { duration: 0.55, ease },
// //   },
// //   open: {
// //     clipPath: "inset(0 0 0% 0)",
// //     transition: { duration: 0.65, delay: 0.7, ease },
// //   },
// // };
// // const linksContainerVariants = {
// //   closed: { opacity: 0 },
// //   open: {
// //     opacity: 1,
// //     transition: { delayChildren: 0.95, staggerChildren: 0.06 },
// //   },
// // };
// // const linkVariants = {
// //   closed: { opacity: 0, y: 20, transition: { duration: 0.2, ease } },
// //   open: {
// //     opacity: 1,
// //     y: 0,
// //     transition: { duration: 0.45, ease: [0.25, 0.4, 0.1, 1] as const },
// //   },
// // };
// // const logoAnimation = {
// //   initial: { opacity: 0, y: 4, scale: 0.96, filter: "blur(4px)" },
// //   animate: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
// //   exit: { opacity: 0, y: -4, scale: 0.96, filter: "blur(4px)" },
// //   transition: { duration: 0.3, ease: [0.25, 0.4, 0.1, 1] as const },
// // };

// // const navLinks = [
// //   { title: "Home", href: "/" },
// //   { title: "Projects", href: "/#project" },
// //   { title: "Showcase", href: "/showcase" },
// //   { title: "About", href: "/about" },
// //   { title: "Contact", href: "/contact" },
// // ];

// // // Mock Search Data
// // const mockSearchData = [
// //   { id: 1, title: "Button Component", category: "Components", href: "/docs/button" },
// //   { id: 2, title: "Navbar Component", category: "Components", href: "/docs/navbar" },
// //   { id: 3, title: "Getting Started", category: "Guide", href: "/docs/getting-started" },
// //   { id: 4, title: "Framer Motion Basics", category: "Tutorials", href: "/tutorials/motion" },
// //   { id: 5, title: "Dark Mode Setup", category: "Guide", href: "/docs/dark-mode" },
// //   { id: 6, title: "Showcase Gallery", category: "Pages", href: "/showcase" },
// // ];

// // type NavbarClientProps = { githubStars: ReactNode };

// // export default function NavbarClient({ githubStars }: NavbarClientProps) {
// //   const [activePanel, setActivePanel] = useState<"menu" | "search" | null>(null);
// //   const [renderedPanel, setRenderedPanel] = useState<"menu" | "search" | null>(null);
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [isScrolled, setIsScrolled] = useState(false);
// //   const [hasMounted, setHasMounted] = useState(false);

// //   const menuRef = useRef<MenuIconHandle>(null);
// //   const pathname = usePathname();
// //   // const lenis = useLenis();

// //   // Filter Search Results
// //   const filteredResults = mockSearchData.filter(
// //     (item) =>
// //       item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //       item.category.toLowerCase().includes(searchQuery.toLowerCase())
// //   );

// //   // Keep last content mounted during close so content + footer wipe away together
// //   useEffect(() => {
// //     if (activePanel !== null) {
// //       setRenderedPanel(activePanel);
// //     } else {
// //       const t = setTimeout(() => setRenderedPanel(null), 600);
// //       return () => clearTimeout(t);
// //     }
// //   }, [activePanel]);

// //   const visiblePanel = activePanel ?? renderedPanel;

// //   const handleHashClick = (
// //     e: React.MouseEvent<HTMLAnchorElement>,
// //     href: string,
// //   ) => {
// //     const hashIndex = href.indexOf("#");
// //     if (hashIndex === -1) {
// //       setActivePanel(null);
// //       return;
// //     }
// //     const hash = href.substring(hashIndex);
// //     if (pathname === "/") {
// //       e.preventDefault();
// //       const element = document.querySelector(hash) as HTMLElement | null;
// //       if (element) {
// //         setActivePanel(null);
// //         requestAnimationFrame(() => {
// //           history.replaceState(null, "", hash);
// //         });
// //       }
// //     } else {
// //       setActivePanel(null);
// //     }
// //   };

// //   useEffect(() => {
// //     const scrolled = window.scrollY > 120;
// //     setIsScrolled(scrolled);
// //     setHasMounted(true);
// //   }, []);

// //   useEffect(() => {
// //     const handleScroll = () => {
// //       const scrolled = window.scrollY > 120;
// //       setIsScrolled((current) => (current === scrolled ? current : scrolled));
// //     };
// //     window.addEventListener("scroll", handleScroll, { passive: true });
// //     return () => {
// //       window.removeEventListener("scroll", handleScroll);
// //     };
// //   }, []);

// //   useEffect(() => {
// //     if (activePanel !== null) {
// //       menuRef.current?.startAnimation();
// //       document.body.style.overflow = "hidden";
// //     } else {
// //       menuRef.current?.stopAnimation();
// //       document.body.style.overflow = "";
// //       // Optional: Clear search on close
// //       setTimeout(() => setSearchQuery(""), 500);
// //     }
// //     return () => {
// //       document.body.style.overflow = "";
// //     };
// //   }, [activePanel]);

// //   const isAnyPanelOpen = activePanel !== null;

// //   return (
// //     <div className="fixed top-6 left-1/2 z-50 w-auto -translate-x-1/2 flex flex-row items-center gap-2">
// //       {/* NAVBAR */}
// //       <motion.div
// //         variants={navbarVariants}
// //         animate={isAnyPanelOpen ? "open" : "closed"}
// //         initial="closed"
// //         className="relative z-20 flex h-[40px] max-w-[calc(100vw-40px)] items-center rounded-lg bg-neutral-200/70 py-1.5 pl-3 pr-3 text-sm font-medium text-black backdrop-blur-[20px] will-change-[width] dark:bg-white/15 dark:text-white [--navbar-closed-width:300px] sm:[--navbar-closed-width:360px]"
// //       >
// //         {/* LEFT — MENU */}
// //         <button
// //           type="button"
// //           onClick={() => {
// //             setActivePanel((prev) => (prev !== null ? null : "menu"));
// //           }}
// //           className="flex w-auto items-center justify-start gap-x-1 pr-1.5 outline-none transition-opacity hover:opacity-70"
// //           aria-label={isAnyPanelOpen ? "Close panel" : "Open menu"}
// //           aria-expanded={isAnyPanelOpen}
// //         >
// //           <MenuIconSmall ref={menuRef} />
// //           <span className="whitespace-nowrap font-archivo text-lg">
// //             {isAnyPanelOpen ? "Close" : "Menu"}
// //           </span>
// //         </button>

// //         {/* CENTER — LOGO */}
// //         <div className="pointer-events-none absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
// //           <AnimatePresence mode="wait">
// //             {!isScrolled ? (
// //               <motion.span
// //                 key="text-logo"
// //                 initial={hasMounted ? logoAnimation.initial : false}
// //                 animate={logoAnimation.animate}
// //                 exit={logoAnimation.exit}
// //                 transition={logoAnimation.transition}
// //                 className="block whitespace-nowrap font-archivo text-[18px] font-medium tracking-[-0.03em]"
// //               >
// //                 Fixel UI
// //               </motion.span>
// //             ) : (
// //               <motion.div
// //                 key="image-logo"
// //                 initial={hasMounted ? logoAnimation.initial : false}
// //                 animate={logoAnimation.animate}
// //                 exit={logoAnimation.exit}
// //                 transition={logoAnimation.transition}
// //                 className="relative size-6"
// //               >
// //                 <Image
// //                   src="/logo.svg"
// //                   alt="Fixel UI"
// //                   fill
// //                   priority
// //                   sizes="24px"
// //                   className="object-contain invert dark:invert-0"
// //                 />
// //               </motion.div>
// //             )}
// //           </AnimatePresence>
// //         </div>

// //         {/* RIGHT — GITHUB */}
// //         <div className="ml-auto flex items-center">{githubStars}</div>
// //       </motion.div>

// //       {/* SEARCH TOGGLE BUTTON */}
// //       <button
// //         onClick={() => setActivePanel((prev) => (prev === "search" ? null : "search"))}
// //         className="hidden lg:flex h-[40px] w-[40px] items-center justify-center rounded-lg bg-neutral-200/70 text-black backdrop-blur-[20px] transition-opacity hover:opacity-70 dark:bg-white/15 dark:text-white"
// //         aria-label="Toggle Search"
// //       >
// //         {activePanel === "search" ? (
// //           <SearchX className="size-4 text-black dark:text-white" />
// //         ) : (
// //           <Search className="size-4 text-black dark:text-white" />
// //         )}
// //       </button>

// //       {/* ======================= */}
// //       {/* UNIFIED PANEL — the ONLY element with clipPath animation */}
// //       {/* menu/search + footer reveal/wipe as one unit */}
// //       {/* ======================= */}
// //       <motion.div
// //         variants={panelVariants}
// //         animate={isAnyPanelOpen ? "open" : "closed"}
// //         initial="closed"
// //         className={`absolute top-[48px] left-0 z-10 flex h-[calc(100svh-80px)] w-full flex-col gap-2 ${
// //           isAnyPanelOpen ? "" : "pointer-events-none"
// //         }`}
// //         style={{ willChange: "clip-path", contain: "paint" }}
// //         aria-hidden={!isAnyPanelOpen}
// //       >
// //         {/* TOP CARD — swaps menu/search, plain div, no animation of its own */}
// //         <div className="min-h-0 flex-1">
// //           {visiblePanel === "menu" && (
// //             <div className="flex h-full min-h-0 flex-col overflow-y-auto rounded-lg bg-neutral-200/70 px-4 pt-10 pb-4 text-black backdrop-blur-[20px] sm:px-6 sm:pt-14 dark:bg-white/15 dark:text-white [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
// //               <motion.nav
// //                 variants={linksContainerVariants}
// //                 animate={activePanel === "menu" ? "open" : "closed"}
// //                 initial="closed"
// //                 className="flex flex-col gap-3 sm:gap-4"
// //               >
// //                 {navLinks.map((link) => (
// //                   <motion.div key={link.title} variants={linkVariants}>
// //                     <Link
// //                       href={link.href}
// //                       onClick={(e) => handleHashClick(e, link.href)}
// //                       className="block font-archivo text-[clamp(2.5rem,8vh,5.5rem)] font-normal leading-[0.9] tracking-tighter text-black transition-colors duration-300 hover:text-black/50 dark:text-white dark:hover:text-white/15"
// //                     >
// //                       {link.title}
// //                     </Link>
// //                   </motion.div>
// //                 ))}
// //               </motion.nav>
// //             </div>
// //           )}

// //           {visiblePanel === "search" && (
// //             <div className="flex h-full min-h-0 flex-col rounded-lg bg-neutral-200/70 px-4 pt-10 pb-4 text-black backdrop-blur-[20px] sm:px-6 sm:pt-14 dark:bg-white/15 dark:text-white">
// //               <div className="w-full h-full flex items-center justify-center">
// //                 <span className="text-black dark:text-white text-6xl font-archivo">coming soon</span>
// //               </div>
// //             </div>
// //           )}
// //         </div>

// //         {/* FOOTER CARD — plain div, no variants, animates with the wrapper */}
// //         <div className="shrink-0 rounded-lg bg-neutral-200/70 text-black backdrop-blur-[20px] dark:bg-white/15 dark:text-white">
// //           <div className="flex h-full flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6">
// //             <div className="flex flex-wrap items-end gap-6 sm:gap-12">
// //               <div className="flex flex-col gap-1">
// //                 <span className="text-xs uppercase tracking-widest text-black/50 dark:text-white/50">
// //                   Get in touch
// //                 </span>
// //                 <a
// //                   href="mailto:fadyemad933@gmail.com"
// //                   className="text-[13px] transition-colors hover:text-black/50 dark:hover:text-white/50 sm:text-sm"
// //                 >
// //                   fadyemad933@gmail.com
// //                 </a>
// //               </div>

// //               <div className="flex flex-col gap-1">
// //                 <span className="hidden sm:block text-xs uppercase tracking-widest text-black/50 dark:text-white/50">
// //                   Socials
// //                 </span>
// //                 <div className="flex gap-4 text-[13px] sm:text-sm">
// //                   <a
// //                     href="https://www.linkedin.com/in/fady-emad-sabry"
// //                     target="_blank"
// //                     rel="noreferrer"
// //                     className="transition-colors hover:text-black/50 dark:hover:text-white/50"
// //                   >
// //                     LinkedIn
// //                   </a>
// //                   <a
// //                     href="https://github.com/FadyEmad01"
// //                     target="_blank"
// //                     rel="noreferrer"
// //                     className="transition-colors hover:text-black/50 dark:hover:text-white/50"
// //                   >
// //                     GitHub
// //                   </a>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* THEME TOGGLE (Shadcn Switch Mockup) */}
// //             <div className="flex items-center gap-3">
// //               <span className="text-xs font-medium uppercase tracking-widest text-black/50 dark:text-white/50">
// //                 Theme
// //               </span>
// //               <button
// //                 type="button"
// //                 role="switch"
// //                 className="peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 bg-black/20 dark:bg-white/20"
// //               >
// //                 <span className="pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform translate-x-0 dark:translate-x-5" />
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </motion.div>
// //     </div>
// //   );
// // }

// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useEffect, useRef, useState, type ReactNode } from "react";
// import { AnimatePresence, motion } from "motion/react";
// // import { useLenis } from "lenis/react";
// import { MenuIconSmall } from "@/components/icons/menuSmall";
// import { MenuIconHandle } from "@/components/icons/menu";
// import { Search, SearchX } from "lucide-react";

// const ease = [0.76, 0, 0.24, 1] as const;

// // ---- animation lock durations (tune to taste) ----
// const OPEN_LOCK_MS = 1400; // navbar expand (700) + panel delay (700) + wipe (650)
// const CLOSE_LOCK_MS = 1400; // panel wipe (550) + navbar delay (650) + shrink (700)
// const SWITCH_HIDE_MS = 350; // top card wipe up
// const SWITCH_SHOW_MS = 500; // top card wipe down
// const SWITCH_LOCK_MS = SWITCH_HIDE_MS + SWITCH_SHOW_MS + 100;
// const CONTENT_CLEAR_MS = 600; // keep content mounted while wrapper wipes away

// const navbarVariants = {
//   closed: {
//     width: "var(--navbar-closed-width)",
//     transition: { duration: 0.7, delay: 0.65, ease },
//   },
//   open: {
//     width: "min(980px, calc(100vw - 40px))",
//     transition: { duration: 0.7, ease },
//   },
// };
// const panelVariants = {
//   closed: {
//     clipPath: "inset(0 0 100% 0)",
//     transition: { duration: 0.55, ease },
//   },
//   open: {
//     clipPath: "inset(0 0 0% 0)",
//     transition: { duration: 0.65, delay: 0.7, ease },
//   },
// };
// // Inner top-card clip — ONLY used when switching menu <-> search while open
// const cardSwitchVariants = {
//   show: {
//     clipPath: "inset(0 0 0% 0)",
//     transition: { duration: 0.5, ease },
//   },
//   hide: {
//     clipPath: "inset(0 0 100% 0)",
//     transition: { duration: 0.35, ease },
//   },
// };
// const linksContainerVariants = {
//   closed: { opacity: 0 },
//   open: {
//     opacity: 1,
//     transition: { delayChildren: 0.95, staggerChildren: 0.06 },
//   },
// };
// const linkVariants = {
//   closed: { opacity: 0, y: 20, transition: { duration: 0.2, ease } },
//   open: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.45, ease: [0.25, 0.4, 0.1, 1] as const },
//   },
// };
// const logoAnimation = {
//   initial: { opacity: 0, y: 4, scale: 0.96, filter: "blur(4px)" },
//   animate: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
//   exit: { opacity: 0, y: -4, scale: 0.96, filter: "blur(4px)" },
//   transition: { duration: 0.3, ease: [0.25, 0.4, 0.1, 1] as const },
// };

// const navLinks = [
//   { title: "Home", href: "/" },
//   { title: "Projects", href: "/#project" },
//   { title: "Showcase", href: "/showcase" },
//   { title: "About", href: "/about" },
//   { title: "Contact", href: "/contact" },
// ];

// // Mock Search Data
// const mockSearchData = [
//   { id: 1, title: "Button Component", category: "Components", href: "/docs/button" },
//   { id: 2, title: "Navbar Component", category: "Components", href: "/docs/navbar" },
//   { id: 3, title: "Getting Started", category: "Guide", href: "/docs/getting-started" },
//   { id: 4, title: "Framer Motion Basics", category: "Tutorials", href: "/tutorials/motion" },
//   { id: 5, title: "Dark Mode Setup", category: "Guide", href: "/docs/dark-mode" },
//   { id: 6, title: "Showcase Gallery", category: "Pages", href: "/showcase" },
// ];

// type NavbarClientProps = { githubStars: ReactNode };

// export default function NavbarClient({ githubStars }: NavbarClientProps) {
//   const [activePanel, setActivePanel] = useState<"menu" | "search" | null>(null);
//   const [displayedPanel, setDisplayedPanel] = useState<"menu" | "search" | null>(null);
//   const [cardAnim, setCardAnim] = useState<"show" | "hide">("show");
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [hasMounted, setHasMounted] = useState(false);

//   const menuRef = useRef<MenuIconHandle>(null);
//   const lockTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const swapTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const clearTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const pathname = usePathname();
//   // const lenis = useLenis();

//   // Filter Search Results
//   const filteredResults = mockSearchData.filter(
//     (item) =>
//       item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.category.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const clearPendingTimers = () => {
//     if (lockTimeout.current) {
//       clearTimeout(lockTimeout.current);
//       lockTimeout.current = null;
//     }
//     if (swapTimeout.current) {
//       clearTimeout(swapTimeout.current);
//       swapTimeout.current = null;
//     }
//     if (clearTimeoutRef.current) {
//       clearTimeout(clearTimeoutRef.current);
//       clearTimeoutRef.current = null;
//     }
//   };

//   // Cleanup timers on unmount
//   useEffect(() => {
//     return () => {
//       if (lockTimeout.current) clearTimeout(lockTimeout.current);
//       if (swapTimeout.current) clearTimeout(swapTimeout.current);
//       if (clearTimeoutRef.current) clearTimeout(clearTimeoutRef.current);
//     };
//   }, []);

//   const lockFor = (ms: number) => {
//     setIsAnimating(true);
//     if (lockTimeout.current) clearTimeout(lockTimeout.current);
//     lockTimeout.current = setTimeout(() => {
//       setIsAnimating(false);
//       lockTimeout.current = null;
//     }, ms);
//   };

//   const openPanel = (target: "menu" | "search") => {
//     clearPendingTimers();
//     setCardAnim("show");
//     setDisplayedPanel(target);
//     setActivePanel(target);
//     lockFor(OPEN_LOCK_MS);
//   };

//   const closePanel = () => {
//     clearPendingTimers();
//     setCardAnim("show");
//     setActivePanel(null);
//     lockFor(CLOSE_LOCK_MS);
//     // Keep content mounted so content + footer wipe away together
//     clearTimeoutRef.current = setTimeout(() => {
//       setDisplayedPanel(null);
//       clearTimeoutRef.current = null;
//     }, CONTENT_CLEAR_MS);
//   };

//   const switchPanel = (target: "menu" | "search") => {
//     clearPendingTimers();
//     setCardAnim("hide"); // phase 1: wipe top card up (footer stays)
//     lockFor(SWITCH_LOCK_MS);
//     swapTimeout.current = setTimeout(() => {
//       // phase 2: swap content while hidden, wipe back down
//       setDisplayedPanel(target);
//       setActivePanel(target);
//       setCardAnim("show");
//       swapTimeout.current = null;
//     }, SWITCH_HIDE_MS);
//   };

//   const handleMenuClick = () => {
//     if (isAnimating) return;
//     if (activePanel !== null) closePanel();
//     else openPanel("menu");
//   };

//   const handleSearchClick = () => {
//     if (isAnimating) return;
//     if (activePanel === "search") closePanel();
//     else if (activePanel === "menu") switchPanel("search");
//     else openPanel("search");
//   };

//   const handleHashClick = (
//     e: React.MouseEvent<HTMLAnchorElement>,
//     href: string,
//   ) => {
//     const hashIndex = href.indexOf("#");
//     if (hashIndex === -1) {
//       closePanel();
//       return;
//     }
//     const hash = href.substring(hashIndex);
//     if (pathname === "/") {
//       e.preventDefault();
//       const element = document.querySelector(hash) as HTMLElement | null;
//       if (element) {
//         closePanel();
//         requestAnimationFrame(() => {
//           history.replaceState(null, "", hash);
//         });
//       }
//     } else {
//       closePanel();
//     }
//   };

//   useEffect(() => {
//     const scrolled = window.scrollY > 120;
//     setIsScrolled(scrolled);
//     setHasMounted(true);
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrolled = window.scrollY > 120;
//       setIsScrolled((current) => (current === scrolled ? current : scrolled));
//     };
//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   useEffect(() => {
//     if (activePanel !== null) {
//       menuRef.current?.startAnimation();
//       document.body.style.overflow = "hidden";
//     } else {
//       menuRef.current?.stopAnimation();
//       document.body.style.overflow = "";
//       // Optional: Clear search on close
//       setTimeout(() => setSearchQuery(""), 500);
//     }
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [activePanel]);

//   const isAnyPanelOpen = activePanel !== null;

//   return (
//     <div className="fixed top-6 left-1/2 z-50 w-auto -translate-x-1/2 flex flex-row items-center gap-2">
//       {/* NAVBAR */}
//       <motion.div
//         variants={navbarVariants}
//         animate={isAnyPanelOpen ? "open" : "closed"}
//         initial="closed"
//         className="relative z-20 flex h-[40px] max-w-[calc(100vw-40px)] items-center rounded-lg bg-neutral-200/70 py-1.5 pl-3 pr-3 text-sm font-medium text-black backdrop-blur-[20px] will-change-[width] dark:bg-white/15 dark:text-white [--navbar-closed-width:300px] sm:[--navbar-closed-width:360px]"
//       >
//         {/* LEFT — MENU */}
//         <button
//           type="button"
//           onClick={handleMenuClick}
//           disabled={isAnimating}
//           className="flex w-auto items-center justify-start gap-x-1 pr-1.5 outline-none transition-opacity hover:opacity-70 disabled:cursor-wait disabled:hover:opacity-100"
//           aria-label={isAnyPanelOpen ? "Close panel" : "Open menu"}
//           aria-expanded={isAnyPanelOpen}
//         >
//           <MenuIconSmall ref={menuRef} />
//           <span className="whitespace-nowrap font-archivo text-lg">
//             {isAnyPanelOpen ? "Close" : "Menu"}
//           </span>
//         </button>

//         {/* CENTER — LOGO */}
//         <div className="pointer-events-none absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
//           <AnimatePresence mode="wait" initial={false}>
//             {!isScrolled ? (
//               <motion.span
//                 key="text-logo"
//                 initial={hasMounted ? logoAnimation.initial : false}
//                 animate={logoAnimation.animate}
//                 exit={logoAnimation.exit}
//                 transition={logoAnimation.transition}
//                 className="block whitespace-nowrap font-archivo text-[18px] font-medium tracking-[-0.03em]"
//               >
//                 Fixel UI
//               </motion.span>
//             ) : (
//               <motion.div
//                 key="image-logo"
//                 initial={hasMounted ? logoAnimation.initial : false}
//                 animate={logoAnimation.animate}
//                 exit={logoAnimation.exit}
//                 transition={logoAnimation.transition}
//                 className="relative size-6"
//               >
//                 <Image
//                   src="/logo.svg"
//                   alt="Fixel UI"
//                   fill
//                   priority
//                   sizes="24px"
//                   className="object-contain invert dark:invert-0"
//                 />
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//         {/* RIGHT — GITHUB */}
//         <div className="ml-auto flex items-center">{githubStars}</div>
//       </motion.div>

//       {/* SEARCH TOGGLE BUTTON */}
//       <button
//         onClick={handleSearchClick}
//         disabled={isAnimating}
//         className="hidden lg:flex h-[40px] w-[40px] items-center justify-center rounded-lg bg-neutral-200/70 text-black backdrop-blur-[20px] transition-opacity hover:opacity-70 disabled:cursor-wait disabled:hover:opacity-100 dark:bg-white/15 dark:text-white"
//         aria-label="Toggle Search"
//       >
//         {activePanel === "search" ? (
//           <SearchX className="size-4 text-black dark:text-white" />
//         ) : (
//           <Search className="size-4 text-black dark:text-white" />
//         )}
//       </button>

//       {/* ======================= */}
//       {/* UNIFIED PANEL — open/close wipes content + footer as one unit */}
//       {/* ======================= */}
//       <motion.div
//         variants={panelVariants}
//         animate={isAnyPanelOpen ? "open" : "closed"}
//         initial="closed"
//         className={`absolute top-[48px] left-0 z-10 flex h-[calc(100svh-80px)] w-full flex-col gap-2 ${
//           isAnyPanelOpen ? "" : "pointer-events-none"
//         }`}
//         style={{ willChange: "clip-path", contain: "paint" }}
//         aria-hidden={!isAnyPanelOpen}
//       >
//         {/* TOP CARD — swaps menu/search; re-clips only when switching */}
//         <div className="min-h-0 flex-1">
//           <motion.div
//             variants={cardSwitchVariants}
//             animate={cardAnim}
//             initial="show"
//             className="h-full will-change-[clip-path]"
//           >
//             {displayedPanel === "menu" && (
//               <div className="flex h-full min-h-0 flex-col overflow-y-auto rounded-lg bg-neutral-200/70 px-4 pt-10 pb-4 text-black backdrop-blur-[20px] sm:px-6 sm:pt-14 dark:bg-white/15 dark:text-white [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
//                 <motion.nav
//                   variants={linksContainerVariants}
//                   animate={activePanel === "menu" ? "open" : "closed"}
//                   initial="closed"
//                   className="flex flex-col gap-3 sm:gap-4"
//                 >
//                   {navLinks.map((link) => (
//                     <motion.div key={link.title} variants={linkVariants}>
//                       <Link
//                         href={link.href}
//                         onClick={(e) => handleHashClick(e, link.href)}
//                         className="block font-archivo text-[clamp(2.5rem,8vh,5.5rem)] font-normal leading-[0.9] tracking-tighter text-black transition-colors duration-300 hover:text-black/50 dark:text-white dark:hover:text-white/15"
//                       >
//                         {link.title}
//                       </Link>
//                     </motion.div>
//                   ))}
//                 </motion.nav>
//               </div>
//             )}

//             {displayedPanel === "search" && (
//               <div className="flex h-full min-h-0 flex-col rounded-lg bg-neutral-200/70 px-4 pt-10 pb-4 text-black backdrop-blur-[20px] sm:px-6 sm:pt-14 dark:bg-white/15 dark:text-white">
//                 <div className="w-full h-full flex items-center justify-center">
//                   <span className="text-black dark:text-white text-6xl font-archivo">coming soon</span>
//                 </div>
//               </div>
//             )}
//           </motion.div>
//         </div>

//         {/* FOOTER CARD — plain div, no animation of its own */}
//         <div className="shrink-0 rounded-lg bg-neutral-200/70 text-black backdrop-blur-[20px] dark:bg-white/15 dark:text-white">
//           <div className="flex h-full flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6">
//             <div className="flex flex-wrap items-end gap-6 sm:gap-12">
//               <div className="flex flex-col gap-1">
//                 <span className="text-xs uppercase tracking-widest text-black/50 dark:text-white/50">
//                   Get in touch
//                 </span>
//                 <a
//                   href="mailto:fadyemad933@gmail.com"
//                   className="text-[13px] transition-colors hover:text-black/50 dark:hover:text-white/50 sm:text-sm"
//                 >
//                   fadyemad933@gmail.com
//                 </a>
//               </div>

//               <div className="flex flex-col gap-1">
//                 <span className="hidden sm:block text-xs uppercase tracking-widest text-black/50 dark:text-white/50">
//                   Socials
//                 </span>
//                 <div className="flex gap-4 text-[13px] sm:text-sm">
//                   <a
//                     href="https://www.linkedin.com/in/fady-emad-sabry"
//                     target="_blank"
//                     rel="noreferrer"
//                     className="transition-colors hover:text-black/50 dark:hover:text-white/50"
//                   >
//                     LinkedIn
//                   </a>
//                   <a
//                     href="https://github.com/FadyEmad01"
//                     target="_blank"
//                     rel="noreferrer"
//                     className="transition-colors hover:text-black/50 dark:hover:text-white/50"
//                   >
//                     GitHub
//                   </a>
//                 </div>
//               </div>
//             </div>

//             {/* THEME TOGGLE (Shadcn Switch Mockup) */}
//             <div className="flex items-center gap-3">
//               <span className="text-xs font-medium uppercase tracking-widest text-black/50 dark:text-white/50">
//                 Theme
//               </span>
//               <button
//                 type="button"
//                 role="switch"
//                 className="peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 bg-black/20 dark:bg-white/20"
//               >
//                 <span className="pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform translate-x-0 dark:translate-x-5" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
// import { useLenis } from "lenis/react";
import { MenuIconSmall } from "@/components/icons/menuSmall";
import { MenuIconHandle } from "@/components/icons/menu";
import { Search, SearchX } from "lucide-react";

const ease = [0.76, 0, 0.24, 1] as const;

const navbarVariants = {
  closed: {
    width: "var(--navbar-closed-width)",
    transition: { duration: 0.7, delay: 0.65, ease },
  },
  open: {
    width: "min(980px, calc(100vw - 40px))",
    transition: { duration: 0.7, ease },
  },
};
const panelVariants = {
  closed: {
    clipPath: "inset(0 0 100% 0)",
    transition: { duration: 0.55, ease },
  },
  open: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.65, delay: 0.7, ease },
  },
};
const linksContainerVariants = {
  closed: { opacity: 0 },
  open: {
    opacity: 1,
    transition: { delayChildren: 0.95, staggerChildren: 0.06 },
  },
};
const linkVariants = {
  closed: { opacity: 0, y: 20, transition: { duration: 0.2, ease } },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.4, 0.1, 1] as const },
  },
};
const logoAnimation = {
  initial: { opacity: 0, y: 4, scale: 0.96, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, y: -4, scale: 0.96, filter: "blur(4px)" },
  transition: { duration: 0.3, ease: [0.25, 0.4, 0.1, 1] as const },
};

const navLinks = [
  { title: "Home", href: "/" },
  { title: "Projects", href: "/#project" },
  { title: "Showcase", href: "/showcase" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
];

// Mock Search Data
const mockSearchData = [
  { id: 1, title: "Button Component", category: "Components", href: "/docs/button" },
  { id: 2, title: "Navbar Component", category: "Components", href: "/docs/navbar" },
  { id: 3, title: "Getting Started", category: "Guide", href: "/docs/getting-started" },
  { id: 4, title: "Framer Motion Basics", category: "Tutorials", href: "/tutorials/motion" },
  { id: 5, title: "Dark Mode Setup", category: "Guide", href: "/docs/dark-mode" },
  { id: 6, title: "Showcase Gallery", category: "Pages", href: "/showcase" },
];

// Shared footer card — rendered inside BOTH units so each unit
// animates as (content + footer), like the old code.
function PanelFooter() {
  return (
    <div className="shrink-0 rounded-lg bg-neutral-200/70 text-black backdrop-blur-[20px] dark:bg-white/15 dark:text-white">
      <div className="flex h-full flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6">
        <div className="flex flex-wrap items-end gap-6 sm:gap-12">
          <div className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-widest text-black/50 dark:text-white/50">
              Get in touch
            </span>
            <a
              href="mailto:fadyemad933@gmail.com"
              className="text-[13px] transition-colors hover:text-black/50 dark:hover:text-white/50 sm:text-sm"
            >
              fadyemad933@gmail.com
            </a>
          </div>

          <div className="flex flex-col gap-1">
            <span className="hidden sm:block text-xs uppercase tracking-widest text-black/50 dark:text-white/50">
              Socials
            </span>
            <div className="flex gap-4 text-[13px] sm:text-sm">
              <a
                href="https://www.linkedin.com/in/fady-emad-sabry"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-black/50 dark:hover:text-white/50"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/FadyEmad01"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-black/50 dark:hover:text-white/50"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>

        {/* THEME TOGGLE (Shadcn Switch Mockup) */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium uppercase tracking-widest text-black/50 dark:text-white/50">
            Theme
          </span>
          <button
            type="button"
            role="switch"
            className="peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 bg-black/20 dark:bg-white/20"
          >
            <span className="pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform translate-x-0 dark:translate-x-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

type NavbarClientProps = { githubStars: ReactNode };

export default function NavbarClient({ githubStars }: NavbarClientProps) {
  const [activePanel, setActivePanel] = useState<"menu" | "search" | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const menuRef = useRef<MenuIconHandle>(null);
  // Counts in-flight animations (navbar + units) so the lock releases
  // only when the LAST one finishes — no timers, no durations.
  const animCount = useRef(0);
  const pathname = usePathname();
  // const lenis = useLenis();

  // Filter Search Results
  const filteredResults = mockSearchData.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAnimStart = () => {
    animCount.current += 1;
    setIsAnimating(true);
  };

  const handleAnimComplete = () => {
    animCount.current -= 1;
    if (animCount.current <= 0) {
      animCount.current = 0;
      setIsAnimating(false);
    }
  };

  const handleMenuClick = () => {
    if (isAnimating) return;
    setIsAnimating(true); // sync lock, Motion callbacks will release it
    setActivePanel((prev) => (prev !== null ? null : "menu"));
  };

  const handleSearchClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActivePanel((prev) => (prev === "search" ? null : "search"));
  };

  const handleHashClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    const hashIndex = href.indexOf("#");
    if (hashIndex === -1) {
      setIsAnimating(true);
      setActivePanel(null);
      return;
    }
    const hash = href.substring(hashIndex);
    if (pathname === "/") {
      e.preventDefault();
      const element = document.querySelector(hash) as HTMLElement | null;
      if (element) {
        setIsAnimating(true);
        setActivePanel(null);
        requestAnimationFrame(() => {
          history.replaceState(null, "", hash);
        });
      }
    } else {
      setIsAnimating(true);
      setActivePanel(null);
    }
  };

  useEffect(() => {
    const scrolled = window.scrollY > 120;
    setIsScrolled(scrolled);
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 120;
      setIsScrolled((current) => (current === scrolled ? current : scrolled));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (activePanel !== null) {
      menuRef.current?.startAnimation();
      document.body.style.overflow = "hidden";
    } else {
      menuRef.current?.stopAnimation();
      document.body.style.overflow = "";
      // Optional: Clear search on close
      setTimeout(() => setSearchQuery(""), 500);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activePanel]);

  const isAnyPanelOpen = activePanel !== null;

  return (
    <div className="fixed top-6 left-1/2 z-50 w-auto -translate-x-1/2 flex flex-row items-center gap-2">
      {/* NAVBAR */}
      <motion.div
        variants={navbarVariants}
        animate={isAnyPanelOpen ? "open" : "closed"}
        initial="closed"
        onAnimationStart={handleAnimStart}
        onAnimationComplete={handleAnimComplete}
        className="relative z-20 flex h-[40px] max-w-[calc(100vw-40px)] items-center rounded-lg bg-neutral-200/70 py-1.5 pl-3 pr-3 text-sm font-medium text-black backdrop-blur-[20px] will-change-[width] dark:bg-white/15 dark:text-white [--navbar-closed-width:300px] sm:[--navbar-closed-width:360px]"
      >
        {/* LEFT — MENU */}
        <button
          type="button"
          onClick={handleMenuClick}
          disabled={isAnimating}
          className="flex w-auto items-center justify-start gap-x-1 pr-1.5 outline-none transition-opacity hover:opacity-70 disabled:cursor-wait disabled:hover:opacity-100"
          aria-label={isAnyPanelOpen ? "Close panel" : "Open menu"}
          aria-expanded={isAnyPanelOpen}
        >
          <MenuIconSmall ref={menuRef} />
          <span className="whitespace-nowrap font-archivo text-lg">
            {isAnyPanelOpen ? "Close" : "Menu"}
          </span>
        </button>

        {/* CENTER — LOGO */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
          <AnimatePresence mode="wait" initial={false}>
            {!isScrolled ? (
              <motion.span
                key="text-logo"
                initial={hasMounted ? logoAnimation.initial : false}
                animate={logoAnimation.animate}
                exit={logoAnimation.exit}
                transition={logoAnimation.transition}
                className="block whitespace-nowrap font-archivo text-[18px] font-medium tracking-[-0.03em]"
              >
                Fixel UI
              </motion.span>
            ) : (
              <motion.div
                key="image-logo"
                initial={hasMounted ? logoAnimation.initial : false}
                animate={logoAnimation.animate}
                exit={logoAnimation.exit}
                transition={logoAnimation.transition}
                className="relative size-6"
              >
                <Image
                  src="/logo.svg"
                  alt="Fixel UI"
                  fill
                  priority
                  sizes="24px"
                  className="object-contain invert dark:invert-0"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT — GITHUB */}
        <div className="ml-auto flex items-center">{githubStars}</div>
      </motion.div>

      {/* SEARCH TOGGLE BUTTON */}
      <button
        onClick={handleSearchClick}
        disabled={isAnimating}
        className="hidden lg:flex h-[40px] w-[40px] items-center justify-center rounded-lg bg-neutral-200/70 text-black backdrop-blur-[20px] transition-opacity hover:opacity-70 disabled:cursor-wait disabled:hover:opacity-100 dark:bg-white/15 dark:text-white"
        aria-label="Toggle Search"
      >
        {activePanel === "search" ? (
          <SearchX className="size-4 text-black dark:text-white" />
        ) : (
          <Search className="size-4 text-black dark:text-white" />
        )}
      </button>

      {/* ======================= */}
      {/* MENU UNIT (menu + footer as one clip) */}
      {/* ======================= */}
      <motion.div
        variants={panelVariants}
        animate={activePanel === "menu" ? "open" : "closed"}
        initial="closed"
        onAnimationStart={handleAnimStart}
        onAnimationComplete={handleAnimComplete}
        className={`absolute top-[48px] left-0 z-10 flex h-[calc(100svh-80px)] w-full flex-col gap-2 ${
          activePanel === "menu" && !isAnimating ? "" : "pointer-events-none"
        }`}
        style={{ willChange: "clip-path", contain: "paint" }}
        aria-hidden={activePanel !== "menu"}
      >
        <div className="min-h-0 flex-1">
          <div className="flex h-full min-h-0 flex-col overflow-y-auto rounded-lg bg-neutral-200/70 px-4 pt-10 pb-4 text-black backdrop-blur-[20px] sm:px-6 sm:pt-14 dark:bg-white/15 dark:text-white [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <motion.nav
              variants={linksContainerVariants}
              animate={activePanel === "menu" ? "open" : "closed"}
              initial="closed"
              className="flex flex-col gap-3 sm:gap-4"
            >
              {navLinks.map((link) => (
                <motion.div key={link.title} variants={linkVariants}>
                  <Link
                    href={link.href}
                    onClick={(e) => handleHashClick(e, link.href)}
                    className="block font-archivo text-[clamp(2.5rem,8vh,5.5rem)] font-normal leading-[0.9] tracking-tighter text-black transition-colors duration-300 hover:text-black/50 dark:text-white dark:hover:text-white/15"
                  >
                    {link.title}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </div>
        </div>

        <PanelFooter />
      </motion.div>

      {/* ======================= */}
      {/* SEARCH UNIT (search + footer as one clip) */}
      {/* ======================= */}
      <motion.div
        variants={panelVariants}
        animate={activePanel === "search" ? "open" : "closed"}
        initial="closed"
        onAnimationStart={handleAnimStart}
        onAnimationComplete={handleAnimComplete}
        className={`absolute top-[48px] left-0 z-10 flex h-[calc(100svh-80px)] w-full flex-col gap-2 ${
          activePanel === "search" && !isAnimating ? "" : "pointer-events-none"
        }`}
        style={{ willChange: "clip-path", contain: "paint" }}
        aria-hidden={activePanel !== "search"}
      >
        <div className="min-h-0 flex-1">
          <div className="flex h-full min-h-0 flex-col rounded-lg bg-neutral-200/70 px-4 pt-10 pb-4 text-black backdrop-blur-[20px] sm:px-6 sm:pt-14 dark:bg-white/15 dark:text-white">
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-black dark:text-white text-6xl font-archivo">coming soon</span>
            </div>
          </div>
        </div>

        <PanelFooter />
      </motion.div>
    </div>
  );
}