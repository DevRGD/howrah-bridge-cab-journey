export default function Vignette() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-40"
      style={{
        background:
          'radial-gradient(ellipse at center, transparent 40%, rgba(200, 210, 220, 0.2) 80%, rgba(180, 190, 200, 0.75) 100%)',
      }}
    />
  );
}
