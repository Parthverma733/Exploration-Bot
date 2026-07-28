from dataclasses import dataclass, field


@dataclass
class ProcessorResult:
    processor: str
    content: str
    metadata: dict = field(default_factory=dict)

    def to_langchain_dict(self) -> dict:
        """Shape ready for ``langchain_core.documents.Document`` construction."""
        return {
            "page_content": self.content,
            "metadata": {
                "processor": self.processor,
                **self.metadata,
            },
        }
