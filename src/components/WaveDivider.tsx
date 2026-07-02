export default function WaveDivider({
  fill = "#0a0a0a",
  bgFill = "#fafaf9",
  flip = false,
}: {
  fill?: string;
  bgFill?: string;
  flip?: boolean;
}) {
  return (
    <div
      className={`wave-divider ${flip ? "wave-divider-flip" : ""}`}
      style={{ backgroundColor: bgFill }}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
