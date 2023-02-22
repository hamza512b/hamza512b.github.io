export default function Image({ src, alt }: { src: string; alt: string }) {
  return (
    <picture>
      <source
        type="image/avif"
        srcSet={`${src}.1x.avif 1x, ${src}.2x.avif 2x`}
      />
      <source type="image/png" srcSet={`${src}.1x.png 1x, ${src}.2x.png 2x`} />
      <img src={`${src}.1x.png`} alt={alt} />
    </picture>
  );
}
