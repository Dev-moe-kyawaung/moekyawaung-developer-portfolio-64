import React from "react";

export const GravityLensFilter: React.FC = () => {
  return (
    <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
      <defs>
        {/* Gravity Well / Warp Distortion Filter */}
        <filter id="gravity-lens" x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.015 0.02"
            numOctaves="3"
            result="warpNoise"
          >
            <animate
              attributeName="baseFrequency"
              values="0.012 0.018; 0.025 0.035; 0.012 0.018"
              dur="3s"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="warpNoise"
            scale="18"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Hyper-tunnel Burst Filter */}
        <filter id="tachyon-burst" x="-40%" y="-40%" width="180%" height="180%">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.03"
            numOctaves="2"
            result="tachyonNoise"
          >
            <animate
              attributeName="baseFrequency"
              values="0.05; 0.01; 0.05"
              dur="1.2s"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="tachyonNoise"
            scale="35"
            xChannelSelector="R"
            yChannelSelector="B"
          />
        </filter>
      </defs>
    </svg>
  );
};
