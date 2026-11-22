import { ImageResponse } from "next/og";

export const alt = "FreeLearn Tunisia: free courses, checked one by one";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#0C2A4D",
          color: "#F5F7F9",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 38,
            fontWeight: 700,
            color: "#E8A317",
          }}
        >
          FreeLearn Tunisia
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 88,
            fontWeight: 800,
            lineHeight: 1.05,
            marginTop: 28,
          }}
        >
          Free courses, checked one by one.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 34,
            marginTop: 40,
            opacity: 0.85,
          }}
        >
          A free learning path for Tunisian university students
        </div>
      </div>
    ),
    { ...size }
  );
}