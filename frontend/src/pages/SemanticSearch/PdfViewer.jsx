import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import HighlightLayer from "./HighlightLayer";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

const HARDCODED_HIGHLIGHTS = [
  {
    page: 3,
    type: "text",
    bbox: {
      left: 70.55679321289062,
      top: 684.4988174438477,
      right: 539.8185424804688,
      bottom: 80.6204833984375,
    },
  },
  {
    page: 9,
    type: "text",
    bbox: {
      left: 72,
      top: 412.09599999999995,
      right: 543.016,
      bottom: 387.964,
    },
  },
  {
    page: 9,
    type: "text",
    bbox: {
      left: 72,
      top: 372.476,
      right: 543.028,
      bottom: 237.94399999999996,
    },
  },
  {
    page: 10,
    type: "text",
    bbox: {
      left: 239.12,
      top: 553.90354,
      right: 374.65,
      bottom: 545.4755054545454,
    },
  },
  {
    page: 12,
    type: "text",
    bbox: {
      left: 72,
      top: 159.476,
      right: 542.9919999999998,
      bottom: 80.12400000000002,
    },
  },
  {
    page: 12,
    type: "text",
    bbox: {
      left: 72,
      top: 362.876,
      right: 543.04,
      bottom: 311.144,
    },
  },
  {
    page: 12,
    type: "text",
    bbox: {
      left: 72,
      top: 295.676,
      right: 548.9800000000001,
      bottom: 174.94399999999996,
    },
  },
  
];

export default function PdfViewer() {
  const [scale, setScale] = useState(1.2);
  const [pageWidth, setPageWidth] = useState(0);
  const [pageHeight, setPageHeight] = useState(0);
  const [loadError, setLoadError] = useState(null);
  const [numPages, setNumPages] = useState(0);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setLoadError(null);
    console.log("PDF loaded successfully, pages:", numPages);
  }

  function onDocumentLoadError(error) {
    setLoadError(error?.message ?? String(error));
    console.error("PDF onLoadError:", error);
  }

  function onDocumentSourceError(error) {
    setLoadError(error?.message ?? String(error));
    console.error("PDF onSourceError:", error);
  }

  function onPageLoadSuccess(page) {
    const viewport = page.getViewport({ scale: 1 });
    setPageWidth(viewport.width);
    setPageHeight(viewport.height);
  }

  return (
    <div className="w-full h-screen overflow-auto bg-gray-200 p-6">
      <div className="flex justify-center mb-4 gap-3">
        <button
          type="button"
          onClick={() => setScale((s) => Math.max(0.4, s - 0.2))}
          className="px-4 py-2 bg-white text-black rounded"
        >
          -
        </button>

        <div className="font-semibold text-lg">{(scale * 100).toFixed(0)}%</div>

        <button
          type="button"
          onClick={() => setScale((s) => s + 0.2)}
          className="px-4 py-2 bg-white text-black rounded"
        >
          +
        </button>
      </div>

      <Document
        file="https://ik.imagekit.io/ncsfijbbs/file2_I35DsZCs4.pdf?updatedAt=1785652899788"
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
        onSourceError={onDocumentSourceError}
        loading={<p>Loading PDF...</p>}
        error={
          <p>
            Failed to load PDF
            {loadError ? `: ${loadError}` : ". See console for details."}
          </p>
        }
      >
        {Array.from({ length: numPages }, (_, index) => {
          const pageNumber = index + 1;

          return (
            <div
              key={pageNumber}
              className="relative mx-auto mb-6 shadow-lg"
              style={{
                width: pageWidth ? pageWidth * scale : undefined,
              }}
            >
              <Page
                pageNumber={pageNumber}
                scale={scale}
                renderAnnotationLayer
                renderTextLayer
                onLoadSuccess={onPageLoadSuccess}
              />

              {pageHeight > 0 && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                  }}
                >
                  <HighlightLayer
                    pageNumber={pageNumber}
                    pageHeight={pageHeight}
                    scale={scale}
                    highlights={HARDCODED_HIGHLIGHTS}
                  />
                </div>
              )}
            </div>
          );
        })}
      </Document>
    </div>
  );
}
