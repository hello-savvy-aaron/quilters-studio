import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "Mary Anne Quilts — they stick to me like lint.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const dir = path.join(process.cwd(), "assets", "og");
  const [serif, serifSemi, photo] = await Promise.all([
    readFile(path.join(dir, "SourceSerif4-Regular.ttf")),
    readFile(path.join(dir, "SourceSerif4-SemiBold.ttf")),
    readFile(path.join(dir, "dragon-quilt.jpg")),
  ]);
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#f3f2f2",
          color: "#201e1d",
          fontFamily: "Source Serif 4",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: 620,
            padding: "0 56px",
          }}
        >
          <div style={{ display: "flex", height: 6, background: "#201e1d" }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "12px 0",
              fontSize: 17,
              letterSpacing: "0.09em",
              color: "rgba(32, 30, 29, 0.6)",
            }}
          >
            <span>MARY ANNE HENDERSON · QUILTER</span>
            <span>MARIETTA, GA</span>
          </div>
          <div style={{ display: "flex", height: 2, background: "#201e1d" }} />
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 600,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              margin: "36px 0 24px",
            }}
          >
            They stick to me like lint.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              lineHeight: 1.4,
              color: "rgba(32, 30, 29, 0.72)",
              marginBottom: 36,
            }}
          >
            Fifty years of scrap quilts, and the stories behind them.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 19,
              letterSpacing: "0.09em",
              color: "#0088b0",
            }}
          >
            WWW.QUILTERS.STUDIO
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: 580,
            height: "100%",
            borderLeft: "6px solid #201e1d",
          }}
        >
          <img
            src={photoSrc}
            alt=""
            width={580}
            height={630}
            style={{ width: 580, height: 630, objectFit: "cover" }}
          />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Source Serif 4", data: serif, style: "normal", weight: 400 },
        { name: "Source Serif 4", data: serifSemi, style: "normal", weight: 600 },
      ],
    }
  );
}
