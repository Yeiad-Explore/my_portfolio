import { Project, Publication, Experience } from '../types';

export const PERSONAL_INFO = {
  name: "Kabid Yeiad",
  title: "AI Engineer",
  tagline: "I train models, write agents, and ship the pipelines between them.",
  bio: "A programmer who likes sitting with code, datasets, and models until they behave. Agents, speech systems, and retrieval work that has to run in production.",
  status: "Open for engineering work",
  github: "https://github.com/Yeiad-Explore",
  email: "kabid.yeiad@gmail.com",
  location: "Dhaka, Bangladesh",
};

export const MANIFESTO_TEXT =
  "I sit with models the way this island sits with weather. Quiet focus. Clean graphs. Agents that call real tools. Speech systems trained on dialects the default stack ignores. Research that leaves the notebook and runs.";

export const PROJECTS: Project[] = [
  {
    id: "whisper-ethnic-translation",
    index: "Speech",
    title: "Ethnic Language Speech-to-Bangla Translation System",
    subtitle: "Fine-tuned OpenAI Whisper AI + Custom Seq2Seq Transformer",
    description: "Fine-tuned OpenAI Whisper on regional dialectal audio to transcribe and translate indigenous minority dialects into standard Bangla with 92% validation accuracy. Engineered a low-latency streaming inference server in PyTorch and Flask.",
    metric: "92%",
    metricLabel: "Validation Accuracy",
    tags: ["Whisper AI", "Transformers", "PyTorch", "Flask", "ASR Pipeline", "Acoustics"],
    githubUrl: "https://github.com/Yeiad-Explore/Ethnic-Language-to-Bangla-Translation",
    architectureDetails: [
      "Custom audio spectrogram augmentation for dialectal acoustic phonemes",
      "Low-latency streaming inference server optimized for edge deployment",
      "Validated against native phonetic transcript ground truth"
    ]
  },
  {
    id: "multi-agent-orchestrator",
    index: "Agents",
    title: "Autonomous Multi-Agent Enterprise Orchestration",
    subtitle: "Self-Correcting State Graphs with LangGraph & n8n",
    description: "Architected autonomous multi-agent pipelines for enterprise workflow automation. Implemented stateful coordination between specialized planner, scraper, synthesizer, and verifier agents with automated loop recovery.",
    metric: "40%",
    metricLabel: "Pipeline Acceleration",
    tags: ["LangGraph", "LangChain", "n8n", "Multi-Agent Swarms", "Python", "Webhooks"],
    architectureDetails: [
      "Dynamic state graphs with cycle-detection and automated fallbacks",
      "Bi-directional webhook synchronization across CRMs, Slack, and Airtable",
      "Reduced manual data extraction and verification hours by 70%"
    ]
  },
  {
    id: "langchain-memory-agent",
    index: "Memory",
    title: "Memory-Augmented Conversational Agent",
    subtitle: "Hierarchical Context Indexing with Google GenAI",
    description: "Engineered a production-ready conversational agent equipped with hierarchical session memory and vector-indexed recall, eliminating context drift across multi-turn user dialogues.",
    metric: "50%",
    metricLabel: "Latency Cut",
    tags: ["LangChain", "Google GenAI", "Vector DB", "FastAPI", "Python"],
    githubUrl: "https://github.com/Yeiad-Explore/Chatbot-with-Memory-Using-LangChain",
    architectureDetails: [
      "Hybrid memory combining semantic similarity and chronological recency",
      "Dynamic prompt compression reducing token consumption by half",
      "Zero-downtime persistence layer across multi-tenant sessions"
    ]
  },
  {
    id: "grameenphone-rag",
    index: "Retrieval",
    title: "Domain Knowledge Agent for Grameenphone",
    subtitle: "High-Precision Retrieval Augmented Generation",
    description: "Constructed domain-grounded retrieval pipelines indexing telecommunications infrastructure manuals and billing documentation, enabling bots to synthesize answers with precise citation backing.",
    metric: "99.2%",
    metricLabel: "Retrieval Grounding",
    tags: ["RAG Architecture", "Cross-Encoder Re-Ranking", "Vector Embeddings", "FastAPI"],
    architectureDetails: [
      "Multi-stage re-ranking using cross-encoders for technical queries",
      "Custom semantic chunking preserving table hierarchies and rate plans",
      "Deterministic guardrails eliminating out-of-domain hallucinations"
    ]
  }
];

export const PUBLICATIONS: Publication[] = [
  {
    id: "pub-sentiment",
    title: "Hybrid Deep Learning & Machine Learning for Advanced Sentiment Analysis",
    conference: "BanglaNLP 2023",
    venue: "ACL Anthology",
    year: "2023",
    citations: "12+ Citations",
    domain: "NLP & Representation Learning",
    description: "A comprehensive methodology fusing transformer representations with classical machine learning classifiers to elevate sentiment classification benchmarks in low-resource linguistic environments.",
    link: "https://aclanthology.org/2023.banglalp-1.44/"
  },
  {
    id: "pub-violence",
    title: "Violence Inciting Text Detection using Deep Learning Architectures",
    conference: "BanglaNLP 2023",
    venue: "ACL Anthology",
    year: "2023",
    citations: "15+ Citations",
    domain: "Content Moderation & Safety",
    description: "End-to-end deep learning framework designed to detect and categorize hostility and violence-inciting content in multilingual social text, achieving superior recall on real-world datasets.",
    link: "https://aclanthology.org/2023.banglalp-1.30/"
  }
];

export const EXPERIENCES: Experience[] = [
  {
    role: "AI Agent Developer",
    company: "Studynet Group",
    period: "AUG 2025 - PRESENT",
    location: "Remote / Hybrid",
    highlights: [
      "Engineered autonomous multi-agent systems, improving workflow orchestration efficiency by 40%.",
      "Developed production LangGraph-based AI chatbots with hybrid RAG retrieval architectures.",
      "Automated enterprise data ingestion and parsing pipelines using LangChain and Python."
    ]
  },
  {
    role: "Machine Learning Engineer Intern",
    company: "Intelsense AI",
    period: "FEB 2025 - JUL 2025",
    location: "Dhaka, Bangladesh",
    highlights: [
      "Built a RAG-powered AI agent for Grameenphone, significantly elevating response precision and grounding.",
      "Engineered high-throughput speech-to-text pipelines and automated scraping architectures.",
      "Curated and validated specialized domain datasets for model fine-tuning and evaluation."
    ]
  }
];

export const CODE_SHOWCASE = {
  agentGraph: `from langgraph.graph import StateGraph, END
from typing import TypedDict, Annotated, Sequence
import operator

class AgentState(TypedDict):
    objective: str
    plan: list[str]
    current_step: int
    context_chunks: Sequence[dict]
    agent_outputs: Annotated[list[str], operator.add]
    is_verified: bool

def planner_node(state: AgentState):
    """Decomposes ambiguous user prompt into deterministic sub-tasks."""
    prompt = f"Decompose objective: {state['objective']}"
    plan = llm.generate_structured_plan(prompt)
    return {"plan": plan, "current_step": 0}

def tool_execution_node(state: AgentState):
    """Executes tools and gathers external data."""
    step = state["plan"][state["current_step"]]
    result = tool_registry.execute(step)
    return {"agent_outputs": [result], "current_step": state["current_step"] + 1}

def verifier_node(state: AgentState):
    """Evaluates output consistency against ground truth."""
    verified = evaluate_correctness(state["agent_outputs"])
    return {"is_verified": verified}

# Build autonomous graph with self-correcting cycle
workflow = StateGraph(AgentState)
workflow.add_node("planner", planner_node)
workflow.add_node("executor", tool_execution_node)
workflow.add_node("verifier", verifier_node)

workflow.set_entry_point("planner")
workflow.add_edge("planner", "executor")
workflow.add_conditional_edges(
    "verifier",
    lambda state: "end" if state["is_verified"] else "planner",
    {"end": END, "planner": "planner"}
)`,

  whisperFineTune: `import torch
from transformers import WhisperForConditionalGeneration, WhisperProcessor, Seq2SeqTrainer
from datasets import load_dataset, Audio

# Load base model & feature extractor
model_id = "openai/whisper-small"
processor = WhisperProcessor.from_pretrained(model_id, language="Bengali", task="transcribe")
model = WhisperForConditionalGeneration.from_pretrained(model_id)

# Target ethnic minority speech corpus
dataset = load_dataset("audiofolder", data_dir="./ethnic_dialect_corpus")
dataset = dataset.cast_column("audio", Audio(sampling_rate=16000))

def prepare_dataset(batch):
    audio = batch["audio"]
    batch["input_features"] = processor.feature_extractor(
        audio["array"], sampling_rate=audio["sampling_rate"]
    ).input_features[0]
    batch["labels"] = processor.tokenizer(batch["transcription"]).input_ids
    return batch

tokenized_dataset = dataset.map(prepare_dataset, remove_columns=["audio"])

# Low-latency fine-tuning with cosine learning rate schedule
training_args = Seq2SeqTrainingArguments(
    output_dir="./whisper-ethnic-bangla",
    per_device_train_batch_size=16,
    gradient_accumulation_steps=2,
    learning_rate=1e-5,
    warmup_steps=500,
    fp16=torch.cuda.is_available(),
    evaluation_strategy="steps",
    eval_steps=1000,
    metric_for_best_model="wer",
    greater_is_better=False,
)`,

  hybridRag: `import numpy as np
from sentence_transformers import CrossEncoder

class HybridRAGPipeline:
    def __init__(self, dense_retriever, bm25_retriever, cross_encoder_model="cross-encoder/ms-marco-MiniLM-L-6-v2"):
        self.dense = dense_retriever
        self.sparse = bm25_retriever
        self.reranker = CrossEncoder(cross_encoder_model)

    def retrieve_and_rerank(self, query: str, top_k: int = 5):
        # 1. Dual-retrieval
        dense_docs = self.dense.query(query, k=25)
        sparse_docs = self.sparse.query(query, k=25)

        # 2. Reciprocal Rank Fusion (RRF)
        fused_scores = {}
        for rank, doc in enumerate(dense_docs):
            fused_scores[doc.id] = fused_scores.get(doc.id, 0) + 1.0 / (60 + rank)
        for rank, doc in enumerate(sparse_docs):
            fused_scores[doc.id] = fused_scores.get(doc.id, 0) + 1.0 / (60 + rank)

        candidate_docs = [all_docs[doc_id] for doc_id in sorted(fused_scores, key=fused_scores.get, reverse=True)[:30]]

        # 3. Cross-Encoder Deep Scoring
        pairs = [[query, doc.text] for doc in candidate_docs]
        scores = self.reranker.predict(pairs)
        ranked_indices = np.argsort(scores)[::-1][:top_k]

        return [candidate_docs[i] for i in ranked_indices]`
};
