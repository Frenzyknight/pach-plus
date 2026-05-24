"use client";

import { useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { Reveal, revealItem } from "@/components/motion/Reveal";

const BRAND_PINK = "#BE185D";

const INPUT_CLASS =
  "w-full rounded-xl border border-foreground/15 bg-white px-4 py-3.5 text-[13px] font-medium text-foreground placeholder:text-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 transition-colors hover:border-foreground/30";

function QuestionsUnderline() {
  return (
    <svg
      viewBox="0 0 220 14"
      fill="none"
      stroke={BRAND_PINK}
      strokeWidth="3"
      strokeLinecap="round"
      aria-hidden="true"
      className="pointer-events-none absolute -bottom-1 left-0 h-[10px] w-full"
      preserveAspectRatio="none"
    >
      <path d="M3 8 C 45 1, 95 13, 140 6 S 205 3, 217 9" />
    </svg>
  );
}

function ContactImage() {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.4,
  });
  const y = useTransform(smoothed, [0, 1], ["-4%", "4%"]);

  return (
    <motion.div
      ref={ref}
      variants={revealItem}
      className="relative order-1 lg:order-2"
    >
      <div className="relative overflow-hidden rounded-[28px] aspect-4/5 sm:aspect-5/6 lg:aspect-4/5">
        <motion.div
          className="absolute inset-0"
          style={
            reduce ? undefined : { y, scale: 1.08, willChange: "transform" }
          }
        >
          <Image
            src="/abhinav.jpeg"
            alt="Get in touch with the pach+ team"
            fill
            sizes="(min-width: 1024px) calc(50vw - 80px), (min-width: 640px) calc(100vw - 48px), calc(100vw - 40px)"
            className="object-cover object-center"
            priority={false}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function AboutContactForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <section
      id="contact"
      className="bg-white px-5 pt-16 xs:px-6 sm:pt-20 lg:px-10 lg:pt-28"
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal stagger={0.08} amount={0.2} className="order-2 lg:order-1">
          <motion.p
            variants={revealItem}
            className="mb-3 text-[10px] font-medium uppercase tracking-[0.25em] text-foreground/60 sm:mb-4"
          >
            Get in touch
          </motion.p>

          <motion.h2
            variants={revealItem}
            className="leading-[1.05] tracking-[-0.03em] text-foreground"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            <span className="font-bold">Got any more</span>{" "}
            <span className="relative inline-block font-bold">
              questions?
              <QuestionsUnderline />
            </span>
            <br />
            <span className="font-extralight">Reach out to the</span>{" "}
            <span className="font-bold">pach+ team.</span>
          </motion.h2>

          <motion.p
            variants={revealItem}
            className="mt-5 max-w-[480px] text-[12px] font-medium leading-relaxed text-foreground/65 sm:mt-6 sm:text-sm"
          >
            We&rsquo;ll get back to you as quickly as possible.
          </motion.p>

          <motion.form
            variants={revealItem}
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-3 sm:mt-10"
            noValidate
          >
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-first-name" className="sr-only">
                  First name
                </label>
                <input
                  id="contact-first-name"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  placeholder="First name"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  className={INPUT_CLASS}
                />
              </div>
              <div>
                <label htmlFor="contact-last-name" className="sr-only">
                  Last name
                </label>
                <input
                  id="contact-last-name"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  className={INPUT_CLASS}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-email" className="sr-only">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className={INPUT_CLASS}
                />
              </div>
              <div>
                <label htmlFor="contact-phone" className="sr-only">
                  Phone number
                </label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="Phone number"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  className={INPUT_CLASS}
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-message" className="sr-only">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                placeholder="Type your message..."
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className={`${INPUT_CLASS} resize-none`}
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.01, y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="mt-2 w-full cursor-pointer rounded-full py-4 text-[11px] font-medium uppercase tracking-[0.18em] text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/40"
              style={{ backgroundColor: BRAND_PINK }}
              aria-label="Submit contact form"
            >
              Submit
            </motion.button>
          </motion.form>
        </Reveal>

        <Reveal amount={0.2} className="order-1 lg:order-2">
          <ContactImage />
        </Reveal>
      </div>
    </section>
  );
}
