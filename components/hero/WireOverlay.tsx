export default function WireOverlay() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-[5]"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <filter id="wire-bloom" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="0.9" result="b1" />
          <feGaussianBlur stdDeviation="2.4" result="b2" />
          <feMerge>
            <feMergeNode in="b2" />
            <feMergeNode in="b1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="wire-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E9D5FF" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#B67CFF" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.9" />
        </linearGradient>
        <radialGradient id="node-grad">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="35%" stopColor="#E9D5FF" stopOpacity="0.95" />
          <stop offset="70%" stopColor="#B67CFF" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#B67CFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Wire 1: top-left */}
      <g>
        <path
          d="M 18,17 C 26,14 30,26 34,28 S 40,32 42,34"
          fill="none"
          stroke="#B67CFF"
          strokeOpacity="0.18"
          strokeWidth="1.6"
          strokeLinecap="round"
          filter="url(#wire-bloom)"
        />
        <path
          d="M 18,17 C 26,14 30,26 34,28 S 40,32 42,34"
          fill="none"
          stroke="url(#wire-grad)"
          strokeOpacity="0.85"
          strokeWidth="0.35"
          strokeLinecap="round"
          filter="url(#wire-bloom)"
        />
        <path
          d="M 18,17 C 26,14 30,26 34,28 S 40,32 42,34"
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.55"
          strokeWidth="0.18"
          strokeLinecap="round"
          strokeDasharray="0.6 6"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-30"
            dur="6s"
            repeatCount="indefinite"
          />
        </path>
        <circle r="0.6" fill="#ffffff" filter="url(#wire-bloom)">
          <animateMotion
            dur="6s"
            repeatCount="indefinite"
            path="M 18,17 C 26,14 30,26 34,28 S 40,32 42,34"
            keyPoints="1;0"
            keyTimes="0;1"
            calcMode="linear"
          />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            keyTimes="0;0.1;0.9;1"
            dur="6s"
            repeatCount="indefinite"
          />
        </circle>
        <circle r="1.1" fill="#E9D5FF" filter="url(#wire-bloom)" opacity="0">
          <animateMotion
            dur="7s"
            repeatCount="indefinite"
            path="M 18,17 C 26,14 30,26 34,28 S 40,32 42,34"
            keyPoints="1;0"
            keyTimes="0;1"
            calcMode="linear"
          />
          <animate
            attributeName="opacity"
            values="0;0;1;0.6;0"
            keyTimes="0;0.55;0.7;0.9;1"
            dur="7s"
            repeatCount="indefinite"
          />
        </circle>
        <g filter="url(#wire-bloom)">
          <circle cx="42" cy="34" r="2.6" fill="url(#node-grad)">
            <animate
              attributeName="r"
              values="2.2;3.1;2.2"
              dur="3.5s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.7;1;0.7"
              dur="3.5s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="42" cy="34" r="0.7" fill="#ffffff" />
        </g>
        <g filter="url(#wire-bloom)">
          <circle cx="18" cy="17" r="1.8" fill="url(#node-grad)">
            <animate
              attributeName="r"
              values="1.5;2.3;1.5"
              dur="3s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.7;1;0.7"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="18" cy="17" r="0.45" fill="#ffffff" />
        </g>
      </g>

      {/* Wire 2: top-right */}
      <g>
        <path
          d="M 82,17 C 74,14 70,26 66,28 S 60,32 58,34"
          fill="none"
          stroke="#B67CFF"
          strokeOpacity="0.18"
          strokeWidth="1.6"
          strokeLinecap="round"
          filter="url(#wire-bloom)"
        />
        <path
          d="M 82,17 C 74,14 70,26 66,28 S 60,32 58,34"
          fill="none"
          stroke="url(#wire-grad)"
          strokeOpacity="0.85"
          strokeWidth="0.35"
          strokeLinecap="round"
          filter="url(#wire-bloom)"
        />
        <path
          d="M 82,17 C 74,14 70,26 66,28 S 60,32 58,34"
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.55"
          strokeWidth="0.18"
          strokeLinecap="round"
          strokeDasharray="0.6 6"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-30"
            dur="6.6s"
            repeatCount="indefinite"
          />
        </path>
        <circle r="0.6" fill="#ffffff" filter="url(#wire-bloom)">
          <animateMotion
            dur="6.6s"
            repeatCount="indefinite"
            path="M 82,17 C 74,14 70,26 66,28 S 60,32 58,34"
            keyPoints="1;0"
            keyTimes="0;1"
            calcMode="linear"
          />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            keyTimes="0;0.1;0.9;1"
            dur="6.6s"
            repeatCount="indefinite"
          />
        </circle>
        <circle r="1.1" fill="#E9D5FF" filter="url(#wire-bloom)" opacity="0">
          <animateMotion
            dur="7.4s"
            repeatCount="indefinite"
            path="M 82,17 C 74,14 70,26 66,28 S 60,32 58,34"
            keyPoints="1;0"
            keyTimes="0;1"
            calcMode="linear"
          />
          <animate
            attributeName="opacity"
            values="0;0;1;0.6;0"
            keyTimes="0;0.55;0.7;0.9;1"
            dur="7.4s"
            repeatCount="indefinite"
          />
        </circle>
        <g filter="url(#wire-bloom)">
          <circle cx="58" cy="34" r="2.6" fill="url(#node-grad)">
            <animate
              attributeName="r"
              values="2.2;3.1;2.2"
              dur="3.5s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.7;1;0.7"
              dur="3.5s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="58" cy="34" r="0.7" fill="#ffffff" />
        </g>
        <g filter="url(#wire-bloom)">
          <circle cx="82" cy="17" r="1.8" fill="url(#node-grad)">
            <animate
              attributeName="r"
              values="1.5;2.3;1.5"
              dur="3s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.7;1;0.7"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="82" cy="17" r="0.45" fill="#ffffff" />
        </g>
      </g>

      {/* Wire 3: bottom-left */}
      <g>
        <path
          d="M 18,61 C 26,64 30,60 34,62 S 40,64 42,66"
          fill="none"
          stroke="#B67CFF"
          strokeOpacity="0.18"
          strokeWidth="1.6"
          strokeLinecap="round"
          filter="url(#wire-bloom)"
        />
        <path
          d="M 18,61 C 26,64 30,60 34,62 S 40,64 42,66"
          fill="none"
          stroke="url(#wire-grad)"
          strokeOpacity="0.85"
          strokeWidth="0.35"
          strokeLinecap="round"
          filter="url(#wire-bloom)"
        />
        <path
          d="M 18,61 C 26,64 30,60 34,62 S 40,64 42,66"
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.55"
          strokeWidth="0.18"
          strokeLinecap="round"
          strokeDasharray="0.6 6"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-30"
            dur="7.2s"
            repeatCount="indefinite"
          />
        </path>
        <circle r="0.6" fill="#ffffff" filter="url(#wire-bloom)">
          <animateMotion
            dur="7.2s"
            repeatCount="indefinite"
            path="M 18,61 C 26,64 30,60 34,62 S 40,64 42,66"
            keyPoints="1;0"
            keyTimes="0;1"
            calcMode="linear"
          />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            keyTimes="0;0.1;0.9;1"
            dur="7.2s"
            repeatCount="indefinite"
          />
        </circle>
        <circle r="1.1" fill="#E9D5FF" filter="url(#wire-bloom)" opacity="0">
          <animateMotion
            dur="7.8s"
            repeatCount="indefinite"
            path="M 18,61 C 26,64 30,60 34,62 S 40,64 42,66"
            keyPoints="1;0"
            keyTimes="0;1"
            calcMode="linear"
          />
          <animate
            attributeName="opacity"
            values="0;0;1;0.6;0"
            keyTimes="0;0.55;0.7;0.9;1"
            dur="7.8s"
            repeatCount="indefinite"
          />
        </circle>
        <g filter="url(#wire-bloom)">
          <circle cx="42" cy="66" r="2.6" fill="url(#node-grad)">
            <animate
              attributeName="r"
              values="2.2;3.1;2.2"
              dur="3.5s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.7;1;0.7"
              dur="3.5s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="42" cy="66" r="0.7" fill="#ffffff" />
        </g>
        <g filter="url(#wire-bloom)">
          <circle cx="18" cy="61" r="1.8" fill="url(#node-grad)">
            <animate
              attributeName="r"
              values="1.5;2.3;1.5"
              dur="3s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.7;1;0.7"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="18" cy="61" r="0.45" fill="#ffffff" />
        </g>
      </g>

      {/* Wire 4: bottom-right */}
      <g>
        <path
          d="M 82,53 C 74,58 70,58 66,60 S 60,64 58,66"
          fill="none"
          stroke="#B67CFF"
          strokeOpacity="0.18"
          strokeWidth="1.6"
          strokeLinecap="round"
          filter="url(#wire-bloom)"
        />
        <path
          d="M 82,53 C 74,58 70,58 66,60 S 60,64 58,66"
          fill="none"
          stroke="url(#wire-grad)"
          strokeOpacity="0.85"
          strokeWidth="0.35"
          strokeLinecap="round"
          filter="url(#wire-bloom)"
        />
        <path
          d="M 82,53 C 74,58 70,58 66,60 S 60,64 58,66"
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.55"
          strokeWidth="0.18"
          strokeLinecap="round"
          strokeDasharray="0.6 6"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-30"
            dur="7.8s"
            repeatCount="indefinite"
          />
        </path>
        <circle r="0.6" fill="#ffffff" filter="url(#wire-bloom)">
          <animateMotion
            dur="7.8s"
            repeatCount="indefinite"
            path="M 82,53 C 74,58 70,58 66,60 S 60,64 58,66"
            keyPoints="1;0"
            keyTimes="0;1"
            calcMode="linear"
          />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            keyTimes="0;0.1;0.9;1"
            dur="7.8s"
            repeatCount="indefinite"
          />
        </circle>
        <circle r="1.1" fill="#E9D5FF" filter="url(#wire-bloom)" opacity="0">
          <animateMotion
            dur="8.2s"
            repeatCount="indefinite"
            path="M 82,53 C 74,58 70,58 66,60 S 60,64 58,66"
            keyPoints="1;0"
            keyTimes="0;1"
            calcMode="linear"
          />
          <animate
            attributeName="opacity"
            values="0;0;1;0.6;0"
            keyTimes="0;0.55;0.7;0.9;1"
            dur="8.2s"
            repeatCount="indefinite"
          />
        </circle>
        <g filter="url(#wire-bloom)">
          <circle cx="58" cy="66" r="2.6" fill="url(#node-grad)">
            <animate
              attributeName="r"
              values="2.2;3.1;2.2"
              dur="3.5s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.7;1;0.7"
              dur="3.5s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="58" cy="66" r="0.7" fill="#ffffff" />
        </g>
        <g filter="url(#wire-bloom)">
          <circle cx="82" cy="53" r="1.8" fill="url(#node-grad)">
            <animate
              attributeName="r"
              values="1.5;2.3;1.5"
              dur="3s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.7;1;0.7"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="82" cy="53" r="0.45" fill="#ffffff" />
        </g>
      </g>
    </svg>
  );
}
