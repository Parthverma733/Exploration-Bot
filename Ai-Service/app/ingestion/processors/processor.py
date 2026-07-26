from dataclasses import dataclass, field


@dataclass
class ProcessorResult:
    processor: str
    content: str
    metadata: dict = field(default_factory=dict)