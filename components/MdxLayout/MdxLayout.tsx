import { MDXProvider } from "@mdx-js/react";
import clsx from "clsx";
import { Manrope } from "@next/font/google";
import styles from "./MDX.module.css";
import Nav from "../Nav";
import Footer from "../Footer";
import Head from "next/head";
import Image from "../Image";
import { SEO } from "../SEO";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--manrope-font",
  fallback: ["sans-serif"],
});

const ResponsiveImage = (props: any) => (
  <Image alt={props.alt} src={props.src} />
);

const components = {
  img: ResponsiveImage,
};
export default function MdxLayout({ children, meta, ...props }: any) {
  return (
    <MDXProvider components={components}>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <SEO />
      </Head>
      <main className={clsx(styles.main, manrope.className)} {...props}>
        <Nav />
        <div className={styles.content}>{children}</div>
        <Footer />
      </main>
    </MDXProvider>
  );
}
