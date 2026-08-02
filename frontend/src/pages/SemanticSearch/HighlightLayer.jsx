/*
highlights = [
    {
        page: 1,
        type: "text",
        bbox: {
            left: 100,
            top: 650,
            right: 320,
            bottom: 620
        }
    }
]

pageHeight -> Original PDF page height (points)
scale      -> Current render scale
*/

export default function HighlightLayer({
    highlights = [],
    pageNumber,
    pageHeight,
    scale,
}) {
    const pageHighlights = highlights.filter((h) => h.page === pageNumber);

    return (
        <>
            {pageHighlights.map((item, index) => {
                const { bbox } = item;

                const left = bbox.left * scale;
                const width = (bbox.right - bbox.left) * scale;
                const top = (pageHeight - bbox.top) * scale;
                const height = (bbox.top - bbox.bottom) * scale;

                return (
                    <div
                        key={index}
                        style={{
                            position: "absolute",
                            left,
                            top,
                            width,
                            height,
                            background: "rgba(252, 255, 0, 0.35)",
                            pointerEvents: "none",
                            boxSizing: "border-box",
                        }}
                    />
                );
            })}
        </>
    );
}
