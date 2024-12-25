import styles from "@/styles/Home.module.css";
import Head from "next/head";
import { Link as LinkIcon } from "phosphor-react";

import Footer from "@/components/Footer";
import Image from "@/components/Image";
import Nav from "@/components/Nav";
import { SEO } from "@/components/SEO";
import { ThreeCanvas } from "@/components/ThreeCanvas";
import { Manrope } from "@next/font/google";
import clsx from "clsx";
import Link from "next/link";
import WaveAnimation from "@/components/WaveAnimation";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--manrope-font",
  fallback: ["sans-serif"],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Hamza&apos;s personal website</title>
        <meta name="description" content="Hamza's personal website" />
        <SEO />
      </Head>

      <main className={clsx(styles.main, manrope.className)}>
        <div className={styles.intro}>
          <div className={styles.text}>
            <Nav />

            <p id="about" className={styles.introText}>
              I am Hamza, a{" "}
              <span className={styles.blue}>software developer</span> based in
              Sweden. I have been coding since I was 14. Coding is the most I
              know!
              <br /> I have created numerous projects and I always continue to
              improve my skills set in the field. I am now working full time as
              a web developer. In addition to that I occasionally do some
              freelance work.
            </p>
          </div>
          <div className={styles.gradient}></div>
          <div className={styles.clipping}>
            <WaveAnimation />
          </div>
          <div className={styles.canvas}>
            <ThreeCanvas />
          </div>
        </div>

        <div className={clsx(styles.projects, styles.container)}>
          <h2 className={styles.heading} id="projects">
            What I work on
          </h2>
          <p className={styles.text}>
            I am always working on some project in my free time. Here are some
            of them:
          </p>
          <div className={styles.grid}>
            <div className={styles.project}>
              <Link href={"https://l4r.app"} className={styles.image}>
                <Image
                  src="/images/collab"
                  alt="Collaborative text editor preview"
                />
              </Link>
              <h3>Collaborative text editor</h3>
              <p>
                A collaborative text editor that allows multiple users to write
                together.
              </p>
              <Link
                href={"https://l4r.app"}
                target="_blank"
                className={styles.button}
              >
                <span>View website</span>
                <LinkIcon size={14} color="#fff" weight="duotone" />
              </Link>
            </div>
            <div className={styles.project}>
              <Link href={"/absence"} className={styles.image}>
                <Image
                  src="/images/absence"
                  alt="Absence tracking system preview"
                />
              </Link>
              <h3>The absence tracking system</h3>
              <p>System that allows schools to manage, view student absence.</p>
              <Link href={"/absence"} className={styles.button}>
                <span>Read more</span>
                <LinkIcon size={14} color="#fff" weight="duotone" />
              </Link>
            </div>
            <div className={styles.project}>
              <Link
                href={"https://hamza.se/minskin"}
                target="_blank"
                className={styles.image}
              >
                <Image
                  src="/images/minskin"
                  alt="Minecraft skin tester preview"
                />
              </Link>
              <h3>Minecraft skin tester</h3>
              <p>
                A website for Minecraft players to upload their skins and test
                them.
              </p>
              <Link
                href={"https://hamza.se/minskin"}
                target="_blank"
                className={styles.button}
              >
                <span>View website</span>
                <LinkIcon size={14} color="#fff" weight="duotone" />
              </Link>
            </div>
          </div>
          <Footer className={styles.container} />
        </div>
      </main>
    </>
  );
}
