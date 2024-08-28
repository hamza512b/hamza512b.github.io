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
import { DateTime } from "luxon";
import Link from "next/link";
import { useLayoutEffect, useState } from "react";

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
            <h1 id="about">
              Hi! <br />I am Hamza! <br />I am a{" "}
              <span className={styles.blue}>software developer!</span>
            </h1>

            <p>
              I am a software developer based in Sweden. I have been coding since I
              was 14 years old. I started with javascript and moved on to
              learning other languages and frameworks.
            </p>

            <p>
              I have created numerous websites and continued improving my skill
              set in the field. I am now working full time as a web developer.
              In addition to that I do a lot of side-projects, I occasionally do
              some freelance work.
            </p>

            <p>
              I like the web because it is place where you can share what you
              envision with anyone in the world, despite the device and the
              place they are in. I dream in the future to help improve the web
              and work on a browser like chromium. I want for the web to have
              better experience than native apps on desktops and mobile. I hope
              that will happen one day.
            </p>

            <p>
              Lastly I want to add that the illustration you see is made by me
              in my quest for digging the rabbit hole of 3D graphics.
            </p>
          </div>
          <div className={styles.gradient}></div>
          <div className={styles.clipping}>
            <svg preserveAspectRatio="none" viewBox="0 0 600 800">
              <path
                d="M109 0S86 45 86 74c0 28 18 58 19 100s-27 47-27 99c0 53 17 58 17 94 0 35-20 60-20 86s22 58 21 87c-1 30-20 91-3 109s25 28 62 42c36 14 41 42 58 47 17 4 110 25 142 35 31 10 158 26 184 27h61H0V0h109Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div className={styles.canvas}>
            <ThreeCanvas />
          </div>
        </div>

        <div className={clsx(styles.projects, styles.container)}>
          <h2 className={styles.heading} id="projects">
            What I have been working on
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
        </div>
        <Footer className={styles.container} />
      </main>
    </>
  );
}
