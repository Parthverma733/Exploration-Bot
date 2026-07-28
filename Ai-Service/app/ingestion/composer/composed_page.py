from dataclasses import dataclass, field

from app.ingestion.analyzers.page_analysis import PageAnalysis
from app.ingestion.processors.processor import ProcessorResult


@dataclass
class ComposedPage:
    page_number: int
    analysis: PageAnalysis
    results: list[ProcessorResult] = field(default_factory=list)

    def merged_content(self) -> str:
        return "\n\n".join(
            result.content for result in self.results if result.content.strip()
        )

    def to_langchain_dicts(self) -> list[dict]:
        """Return dicts ready for ``Document(page_content=..., metadata=...)``."""
        return [result.to_langchain_dict() for result in self.results if result.content.strip()]

    def is_empty(self) -> bool:
        return not any(result.content.strip() for result in self.results)
