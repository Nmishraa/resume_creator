export type ExperienceLevel = 'Entry Level' | 'Mid Level' | 'Senior Level';

export type QuestionCategory =
  | 'Beginner / Fundamental'
  | 'Technical / Role-Specific'
  | 'Behavioral'
  | 'Scenario-Based';

export interface InterviewQuestion {
  id: number;
  question: string;
  category: QuestionCategory;
  typeBadge: 'Beginner' | 'Technical' | 'Behavioral' | 'Scenario';
  sampleAnswer: string;
  keyTakeaways: string[];
}

export interface QuestionGenerationResult {
  role: string;
  experienceLevel: ExperienceLevel;
  questions: InterviewQuestion[];
}

// Preset question repositories by normalized role key & level
const ROLE_QUESTION_BANK: Record<
  string,
  Record<
    ExperienceLevel,
    {
      beginner: Array<{ q: string; a: string; tips: string[] }>;
      technical: Array<{ q: string; a: string; tips: string[] }>;
      behavioral: Array<{ q: string; a: string; tips: string[] }>;
      scenario: Array<{ q: string; a: string; tips: string[] }>;
    }
  >
> = {
  ai: {
    'Entry Level': {
      beginner: [
        {
          q: 'What is the fundamental difference between Machine Learning and Deep Learning?',
          a: 'Machine learning relies on traditional algorithms (e.g. Decision Trees, SVMs) that require manual feature engineering. Deep Learning uses multi-layered neural networks (DNNs/CNNs/Transformers) capable of feature extraction directly from unstructured data like images or raw text.',
          tips: ['Mention feature extraction vs manual engineering', 'Give examples like Linear Regression vs Neural Networks']
        },
        {
          q: 'How would you evaluate a classification model for imbalanced datasets?',
          a: 'Instead of raw accuracy, I evaluate Precision, Recall, F1-Score, and ROC-AUC. For example, in fraud detection where 99% of transactions are legitimate, accuracy is misleading. Using Precision-Recall curves ensures rare positive classes are correctly captured.',
          tips: ['Explain why accuracy fails on imbalanced data', 'Mention F1-score and confusion matrix metrics']
        },
        {
          q: 'What is overfitting, and how do you prevent it in AI models?',
          a: 'Overfitting happens when a model learns training noise rather than generalizable patterns. I prevent it using regularization (L1/L2), dropout layers in neural networks, early stopping during training, and expanding training data with data augmentation.',
          tips: ['Contrast training loss vs validation loss', 'List at least 3 regularization techniques']
        }
      ],
      technical: [
        {
          q: 'Explain how attention mechanisms work in Transformer architectures like GPT and BERT.',
          a: 'Self-attention calculates pairwise relationships between all tokens in a sequence using Query, Key, and Value vectors. It allows models to dynamically weight the contextual importance of surrounding words regardless of distance, enabling parallelization over RNNs.',
          tips: ['Mention Q, K, V matrices and dot-product scaling', 'Contrast sequence processing with sequential RNNs']
        },
        {
          q: 'What steps do you take to prepare unstructured text data for a Machine Learning model?',
          a: 'I start with text cleaning (lowercase, removing noise), tokenization, removing stop words or punctuation, and converting text to numerical embeddings using Word2Vec or Transformer tokenizers (BPE/WordPiece).',
          tips: ['Walk through tokenization -> embedding mapping', 'Mention modern vector representations over TF-IDF']
        },
        {
          q: 'What is gradient descent, and how does learning rate affect optimization?',
          a: 'Gradient descent minimizes loss by updating weights in the opposite direction of the gradient. A learning rate too high causes divergence or overshooting, while a rate too low results in slow convergence or getting trapped in local minima.',
          tips: ['Explain learning rate schedulers or Adam optimizer', 'Use loss landscape analogy']
        }
      ],
      behavioral: [
        {
          q: 'Tell me about a technical problem or model training bug you solved and what you learned.',
          a: 'During a computer vision coursework project, my model accuracy plateaued at 55%. By inspecting sample predictions, I discovered class imbalance and unnormalized pixel values. After adding batch normalization and focal loss, accuracy jumped to 89%. I learned to always audit data distributions before tweaking hyperparameters.',
          tips: ['Use STAR framework (Situation, Task, Action, Result)', 'Quantify performance improvements']
        },
        {
          q: 'How do you handle situation where your AI project specifications or requirements change midway?',
          a: 'I maintain modular data pipelines and version-controlled experiments using MLflow or DVC. When requirements shift, I communicate trade-offs clearly with stakeholders regarding dataset re-labeling time vs model precision requirements.',
          tips: ['Focus on communication and experiment tracking', 'Highlight adaptability']
        }
      ],
      scenario: [
        {
          q: 'Scenario: Your trained ML model performs with 95% accuracy in notebook testing but drops to 60% accuracy in production. What steps do you take?',
          a: 'I immediately investigate data drift and training-serving skew. First, I verify if preprocessing in production matches offline pipelines identically. Next, I compare production input distributions to training data to check for unseen edge cases or changed input schema.',
          tips: ['Identify training-serving skew', 'Check preprocessing pipeline consistency']
        },
        {
          q: 'Scenario: Stakeholders ask for an AI model prediction with zero explanation. How do you implement explainability?',
          a: 'I integrate Model Explainability tools like SHAP (SHapley Additive exPlanations) or LIME to quantify feature contributions for individual predictions, building user trust while maintaining high model performance.',
          tips: ['Mention SHAP or LIME', 'Bridge technical outputs to business confidence']
        }
      ]
    },
    'Mid Level': {
      beginner: [
        {
          q: 'How do Retrieval-Augmented Generation (RAG) architectures reduce LLM hallucinations?',
          a: 'RAG anchors LLM generation in verified external knowledge bases. By retrieving relevant document chunks from a vector database (e.g. Pinecone/Chroma) and inserting them into the LLM prompt context, the model responds using grounded facts rather than parametric memory.',
          tips: ['Define vector embeddings and cosine similarity', 'Explain prompt context augmentation']
        },
        {
          q: 'What is the trade-off between model precision and recall, and how do you choose the threshold?',
          a: 'Precision measures correct positive predictions, while Recall measures coverage of actual positives. I plot the Precision-Recall curve and choose the operating threshold based on business cost—e.g. prioritizing high recall for medical diagnostics vs high precision for spam filtering.',
          tips: ['Relate metrics to real-world business risks', 'Describe threshold tuning using F-beta score']
        },
        {
          q: 'What are the core differences between Supervised, Unsupervised, and Reinforcement Learning?',
          a: 'Supervised learning trains on labeled input-output pairs. Unsupervised learning discovers hidden patterns in unlabeled data (e.g. clustering). Reinforcement Learning optimizes policy agents through trial-and-error rewards within dynamic environments.',
          tips: ['Provide concrete industry use cases for each', 'Mention reward signals vs labels']
        }
      ],
      technical: [
        {
          q: 'How do you optimize LLM inference speed and memory footprint for deployment?',
          a: 'I apply quantization (INT8/INT4), KV-cache management, model pruning, and batching via frameworks like vLLM or TensorRT-LLM. For API services, I deploy asynchronous streaming responses to reduce perceived end-user latency.',
          tips: ['Discuss quantization (AWQ/GPTQ)', 'Mention vLLM or vLLM KV caching']
        },
        {
          q: 'Describe your pipeline for fine-tuning a pre-trained LLM using PEFT / LoRA.',
          a: 'Low-Rank Adaptation (LoRA) freezes pretrained model weights and injects trainable rank decomposition matrices into attention layers. This reduces trainable parameters by 99% while maintaining 95%+ performance, allowing fine-tuning on a single GPU.',
          tips: ['Explain parameter efficiency of rank matrices', 'Compare full fine-tuning vs LoRA']
        },
        {
          q: 'How do vector databases perform fast approximate nearest neighbor (ANN) searches across millions of embeddings?',
          a: 'They construct index structures like HNSW (Hierarchical Navigable Small World) graphs or IVF (Inverted File) indices. These trade a fraction of exact recall for orders-of-magnitude faster logarithmic search times compared to linear brute-force scan.',
          tips: ['Mention HNSW graph algorithms', 'Explain recall vs query latency trade-off']
        }
      ],
      behavioral: [
        {
          q: 'Tell me about a time you had to persuade product managers to adopt an AI solution over a traditional rule-based system.',
          a: 'I created an A/B test baseline showing that rule-based heuristic routing had a 22% failure rate. I built a light prototype model demonstrating a 40% reduction in customer drop-offs and presented ROI metrics, winning stakeholder alignment.',
          tips: ['Highlight data-driven prototyping', 'Focus on customer metrics over model complexity']
        },
        {
          q: 'Describe a situation where a deployed model experienced performance decay or data drift.',
          a: 'Our recommendation engine latency and click-through rate dropped by 18% following a seasonal UI redesign. I instituted automated daily data-drift monitoring using Kolmogorov-Smirnov tests and set up automated retrain triggers on fresh data.',
          tips: ['Detail detection metrics and automated mitigation', 'Show operational ownership']
        }
      ],
      scenario: [
        {
          q: 'Scenario: Your RAG system is retrieving irrelevant chunks for complex user queries. How do you re-architect it?',
          a: 'I implement a hybrid search pipeline combining dense vector retrieval with sparse keyword search (BM25), followed by a Cohere / BGE Reranker model. Additionally, I improve chunking strategies (e.g. semantic chunking) and query expansion.',
          tips: ['Mention hybrid search (Vector + BM25)', 'Explain cross-encoder reranking']
        },
        {
          q: 'Scenario: GPU cloud compute costs for your ML services exceeded monthly budget by 40%. What optimizations do you execute?',
          a: 'I audit GPU utilization logs, switch to dynamic batching with vLLM, cache frequent query embeddings in Redis, and route simpler requests to smaller quantized models, lowering cloud infrastructure costs by 35%.',
          tips: ['Propose multi-tier model routing', 'Highlight cost engineering and caching']
        }
      ]
    },
    'Senior Level': {
      beginner: [
        {
          q: 'How do you design an enterprise AI platform strategy balancing innovation, governance, and security?',
          a: 'I establish a unified platform featuring centralized model registries, standardized feature stores (e.g. Feast), strict RBAC data access controls, and automated guardrails for PII scrubbing and LLM safety evaluations before deployment.',
          tips: ['Cover security, feature stores, and governance', 'Discuss scalability across multiple product teams']
        },
        {
          q: 'Explain the mathematical and architectural intuition behind DPO (Direct Preference Optimization) vs RLHF.',
          a: 'RLHF requires training a separate reward model and fine-tuning with PPO, which is computationally unstable. DPO directly optimizes the policy network on preference pairs by mathematically reparameterizing the reward function, making alignment training stable and faster.',
          tips: ['Contrast policy loss functions', 'Highlight stability and compute savings of DPO']
        },
        {
          q: 'What key metrics define AI system reliability in production enterprise environments?',
          a: 'Beyond ML metrics (F1, BLEU, ROUGE), production reliability is defined by Time-To-First-Token (TTFT), tokens per second (TPS), P99 latency, cost per 1k requests, hallucination rate, and zero-downtime blue/green deployment success.',
          tips: ['Combine system operational metrics with ML quality metrics', 'Mention SLAs and P99 latency']
        }
      ],
      technical: [
        {
          q: 'How do you design a high-throughput, multi-agent AI framework handling complex autonomous workflows?',
          a: 'I architect an event-driven system with deterministic supervisor nodes and stateful memory stores. Agents communicate via structured schema protocols (e.g. JSON/gRPC), utilizing fallback routing, retry limits, and human-in-the-loop validation triggers.',
          tips: ['Discuss supervisor pattern and state management', 'Address deterministic control vs agent autonomy']
        },
        {
          q: 'How do you mitigate prompt injection and data extraction attacks in customer-facing LLM applications?',
          a: 'I implement multi-layered defense: input sanitization filters, dedicated guardrail classifiers (e.g. Llama Guard), system prompt isolation with strict delimiter tags, and output validation to prevent execution of unverified code or leak of system instructions.',
          tips: ['Detail defense-in-depth architecture', 'Mention input guardrails and output parsers']
        },
        {
          q: 'Describe how you scale distributed model training across multi-node GPU clusters.',
          a: 'I leverage Megatron-LM / DeepSpeed applying 3D parallelism: Tensor Parallelism for intra-layer distribution, Pipeline Parallelism across layer blocks, and Zero Redundancy Optimizer (ZeRO-3) to shard optimizer states and gradients across cluster nodes.',
          tips: ['Explain ZeRO memory sharding', 'Discuss Tensor vs Pipeline parallelism']
        }
      ],
      behavioral: [
        {
          q: 'Describe how you led cross-functional engineering teams through an emergency AI system failure under high public visibility.',
          a: 'When an AI automated agent issued faulty outputs to 50k users, I immediately initiated incident response: triaged root cause to an un-sanitized upstream API update, activated fallback deterministic responses, issued public post-mortem transparency, and instituted CI test suites to block regression.',
          tips: ['Demonstrate calm executive leadership', 'Focus on incident response and long-term prevention']
        },
        {
          q: 'How do you mentor senior ML engineers and foster a culture of rapid innovation without sacrificing code quality?',
          a: 'I champion RFC design reviews, establish automated MLOps CI/CD pipelines, allocate dedicated spike time for paper reproductions, and empower team leads with clear ownership over domain sub-systems.',
          tips: ['Highlight mentorship structures and RFC process', 'Balance speed with engineering rigor']
        }
      ],
      scenario: [
        {
          q: 'Scenario: Your company needs to migrate 50+ microservices to incorporate real-time generative AI capabilities while meeting strict GDPR regulations. Outline your architecture.',
          a: 'I design a centralized AI Gateway proxy enforcing tenant isolation, data anonymization, and rate-limiting. Proprietary data stays on self-hosted open LLM instances in private VPCs with zero data retention logging, ensuring full regulatory compliance.',
          tips: ['Architect AI Gateway pattern', 'Integrate VPC privacy boundary with enterprise compliance']
        },
        {
          q: 'Scenario: Executive leadership wants to replace 40% of customer support with AI agents within 3 months. How do you manage technical and operational risk?',
          a: 'I propose a phased rollout starting with low-risk triage scenarios (human shadow mode), tracking customer CSAT and resolution accuracy metrics. We set strict confidence score thresholds where low confidence seamlessly hands off to human agents with full context.',
          tips: ['Implement phased shadow deployment', 'Establish automated human hand-off thresholds']
        }
      ]
    }
  },
  software: {
    'Entry Level': {
      beginner: [
        {
          q: 'What is the difference between value types and reference types in modern programming languages?',
          a: 'Value types store their data directly in memory (typically on the stack), and copying them creates an independent copy. Reference types store a pointer to the memory location (on the heap), meaning multiple variables can reference the exact same object in memory.',
          tips: ['Mention stack vs heap allocation', 'Give examples like primitive numbers vs objects/arrays']
        },
        {
          q: 'Explain the Object-Oriented Programming (OOP) concepts of Encapsulation and Polymorphism.',
          a: 'Encapsulation bundles data and methods inside a single class while hiding internal state via private access modifiers. Polymorphism allows objects of different classes to respond to the same interface or method call in role-specific ways.',
          tips: ['Give concise code analogies', 'Mention interfaces and method overriding']
        },
        {
          q: 'How does RESTful API architecture differ from GraphQL?',
          a: 'REST uses multiple fixed endpoints returning predefined data structures per HTTP method (GET/POST/PUT/DELETE). GraphQL exposes a single endpoint allowing clients to request exact fields needed, eliminating over-fetching and under-fetching.',
          tips: ['Discuss over-fetching vs under-fetching', 'Contrast HTTP verbs with GraphQL queries/mutations']
        }
      ],
      technical: [
        {
          q: 'What is the event loop in JavaScript/Node.js and how does asynchronous execution work?',
          a: 'The event loop allows single-threaded execution of non-blocking I/O operations. It executes code on the Call Stack, offloads async tasks (e.g. timers, network requests) to Web APIs, and processes resolved callbacks from Microtask (Promises) and Macrotask queues when the stack clears.',
          tips: ['Order of execution: Call Stack -> Microtasks -> Macrotasks', 'Explain non-blocking I/O']
        },
        {
          q: 'How do you optimize SQL query performance on large database tables?',
          a: 'I create targeted indexes on frequently searched/joined columns, select only necessary columns instead of SELECT *, analyze execution plans (EXPLAIN), avoid N+1 queries by using proper JOINs, and implement database pagination.',
          tips: ['Mention EXPLAIN query plans', 'Explain indexing trade-offs on WRITE operations']
        },
        {
          q: 'What are Git merge conflict resolution best practices when working in team feature branches?',
          a: 'I regularly pull/rebase main branch changes into my feature branch, keep commits atomic and focused, communicate with authors of conflicting code lines, and run automated unit test suites before completing the pull request.',
          tips: ['Mention Git rebase vs merge', 'Emphasize testing after conflict resolution']
        }
      ],
      behavioral: [
        {
          q: 'Tell me about a bug you introduced into code and how you resolved it.',
          a: 'I accidentally committed a state mutation in a React component that caused intermittent UI re-render glitches. I wrote a failing unit test to reproduce it, refactored state to be immutable using structured clones, and added linting rules to prevent future direct state mutations.',
          tips: ['Take ownership without shifting blame', 'Detail test-driven debugging']
        },
        {
          q: 'How do you approach learning a completely new programming language or framework under tight deadlines?',
          a: 'I build a mini proof-of-concept application implementing CRUD operations and state handling, study official documentation and boilerplate best practices, and seek code reviews from senior engineers on my team early in the process.',
          tips: ['Show self-driven learning methodology', 'Mention peer feedback loops']
        }
      ],
      scenario: [
        {
          q: 'Scenario: Your web application page is taking 6 seconds to load on mobile connections. How do you diagnose and fix it?',
          a: 'I open browser DevTools Network and Performance tabs to analyze Lighthouse metrics (LCP, FID). I optimize image assets to WebP formats, code-split JavaScript bundles via dynamic lazy loading, enable gzip/brotli compression, and cache static assets on a CDN.',
          tips: ['Walk through diagnostic tools', 'List actionable performance optimizations (LCP, bundle splitting)']
        },
        {
          q: 'Scenario: An API endpoint fails intermittently with 500 error status codes during peak user hours. What steps do you take?',
          a: 'I check application log aggregation tools (Datadog/Sentry) for stack trace exceptions, review database connection pool limits, verify server memory/CPU usage, and add error handling with automatic retry logic.',
          tips: ['Check error logs and server metrics', 'Identify connection pooling or memory leaks']
        }
      ]
    },
    'Mid Level': {
      beginner: [
        {
          q: 'What are SOLID design principles, and how do they improve code maintainability?',
          a: 'SOLID stands for Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion. Applying them creates decoupled, modular code where components can be extended without modifying existing tested logic.',
          tips: ['Define at least 3 acronym letters with examples', 'Emphasize testability and loose coupling']
        },
        {
          q: 'Explain the difference between optimistic locking and pessimistic locking in database transactions.',
          a: 'Pessimistic locking locks database records for the entire duration of a transaction, preventing concurrent reads/writes. Optimistic locking assumes conflicts are rare, checking a version column at update time; if the version changed, it rolls back and retries.',
          tips: ['Discuss high-concurrency performance trade-offs', 'Explain versioning columns in optimistic locking']
        },
        {
          q: 'How do microservices communicate synchronously vs asynchronously?',
          a: 'Synchronous communication uses HTTP/REST or gRPC where the caller waits for a response. Asynchronous communication uses message brokers (e.g. RabbitMQ/Kafka) where events are published to queues, decoupling services for high fault tolerance.',
          tips: ['Contrast REST/gRPC with Kafka/RabbitMQ', 'Highlight failure isolation in async messaging']
        }
      ],
      technical: [
        {
          q: 'How do you prevent security vulnerabilities like SQL Injection, XSS, and CSRF in web applications?',
          a: 'I prevent SQL injection by using parameterized queries/ORMs. I mitigate XSS by sanitizing user inputs and escaping HTML outputs. For CSRF, I enforce SameSite cookie attributes and require anti-CSRF token verification on state-changing requests.',
          tips: ['Explain parameterized queries', 'Detail Content Security Policy (CSP) and SameSite cookies']
        },
        {
          q: 'How do you implement micro-frontend or microservice caching strategies with Redis?',
          a: 'I use Redis as an in-memory cache with LRU eviction policy, storing serializable key-value pairs with TTL expirations. I implement Write-Through or Cache-Aside patterns and handle cache invalidation on entity mutation updates.',
          tips: ['Explain Cache-Aside vs Write-Through', 'Discuss cache invalidation strategies']
        },
        {
          q: 'Describe how containerization with Docker and Kubernetes improves deployment reliability.',
          a: 'Docker packages application dependencies into immutable container images ensuring environment parity across dev and production. Kubernetes orchestrates containers with automated scaling, self-healing health checks, and zero-downtime rolling updates.',
          tips: ['Mention environment parity and immutability', 'Discuss Kubernetes rolling updates and probes']
        }
      ],
      behavioral: [
        {
          q: 'Tell me about a time you made a major architectural decision that had trade-offs. How did you decide?',
          a: 'We evaluated migrating a monolithic database to a distributed NOSQL database. While NOSQL offered horizontal write scaling, we would lose relational ACID guarantees. I conducted load benchmarks and decided to implement read-replicas with Redis caching on Postgres instead, saving 4 months of migration work.',
          tips: ['Focus on pragmatic engineering trade-offs', 'Quantify outcome and engineering time saved']
        },
        {
          q: 'How do you handle technical debt while continuing to deliver new features requested by product teams?',
          a: 'I allocate 20% of every engineering sprint specifically for refactoring and technical debt backlog items. I frame technical debt in business terms—showing how fixing it reduces bug rate and speeds up future feature delivery.',
          tips: ['Advocate for sustainable refactoring cadence', 'Translate technical debt into business velocity']
        }
      ],
      scenario: [
        {
          q: 'Scenario: A critical third-party payment gateway API goes down during a flash sale. How is your application built to handle it gracefully?',
          a: 'I implement the Circuit Breaker pattern (e.g. using Resilience4j). When payment API failure rates cross a 15% threshold, the circuit trips open, immediately serving a user-friendly fallback queue page without exhausting server threads.',
          tips: ['Mention Circuit Breaker pattern', 'Explain graceful degradation and retry queues']
        },
        {
          q: 'Scenario: You notice two microservices causing a database deadlock under peak traffic. How do you resolve it?',
          a: 'I trace lock contention using database transaction monitoring. I standardize table access ordering across both services, shorten transaction boundaries, and convert long-running write operations into asynchronous queue tasks.',
          tips: ['Standardize lock access sequence', 'Minimize transaction duration']
        }
      ]
    },
    'Senior Level': {
      beginner: [
        {
          q: 'How do you evaluate and design for System Reliability, High Availability (99.99%), and Disaster Recovery?',
          a: 'I design multi-region active-active cloud infrastructure with automated DNS failover, zero single points of failure, stateless application tiers, distributed database replication, and automated RPO/RTO disaster recovery drills.',
          tips: ['Define RPO (Recovery Point Objective) and RTO (Recovery Time Objective)', 'Discuss active-active vs active-passive failover']
        },
        {
          q: 'What is Eventual Consistency vs Strong Consistency in distributed storage systems (CAP Theorem)?',
          a: 'According to CAP theorem, distributed systems trade Consistency for Availability during Network Partitions. Strong consistency guarantees all nodes see the latest data simultaneously (e.g. Spanner). Eventual consistency guarantees nodes eventually converge while delivering faster low-latency reads.',
          tips: ['Relate to CAP Theorem (Consistency, Availability, Partition Tolerance)', 'Give real database examples']
        },
        {
          q: 'How do you establish engineering standards and code quality frameworks across multiple teams?',
          a: 'I establish standardized Architecture Decision Records (ADRs), shared design system libraries, automated linting/formatting in CI pipelines, structured PR templates, and cross-team staff engineer syncs.',
          tips: ['Mention ADRs (Architecture Decision Records)', 'Focus on automated guardrails over manual gating']
        }
      ],
      technical: [
        {
          q: 'How do you design a distributed rate limiter that handles 100,000 requests per second across global edge nodes?',
          a: 'I implement a Sliding Window Counter algorithm backed by Redis Cluster using atomic Lua scripts. Edge API gateways (Envoy/Cloudflare) evaluate local token buckets with asynchronous synchronization to minimize cross-region latency overhead.',
          tips: ['Discuss Sliding Window or Token Bucket algorithm', 'Use Redis atomic Lua scripts to prevent race conditions']
        },
        {
          q: 'Walk me through your architecture for migrating a legacy monolithic application to microservices with zero downtime.',
          a: 'I apply the Strangler Fig pattern. I place an API Gateway in front of the monolith, progressively route specific domain endpoints to new microservices using CDC (Change Data Capture) for dual-writing database sync, and decommission legacy paths once validated.',
          tips: ['Mention Strangler Fig pattern', 'Explain Change Data Capture (CDC) dual-write verification']
        },
        {
          q: 'How do you prevent zero-day vulnerability security breaches across enterprise software supply chains?',
          a: 'I mandate automated Software Bill of Materials (SBOM) generation, continuous dependency scanning (Snyk/Trivy) in CI/CD, container image signing with Cosign, and strict zero-trust network policies with mTLS via service mesh.',
          tips: ['Cover SBOM and automated dependency scanning', 'Mention mTLS and Zero-Trust service mesh']
        }
      ],
      behavioral: [
        {
          q: 'Tell me about a high-stakes outage where senior leadership demanded immediate answers. How did you manage it?',
          a: 'During a Black Friday traffic surge, our primary checkout service crashed. I stepped in as Incident Commander, established clear role delegation (Operations Lead, Communications Lead), isolated the root cause to unindexed database locks, deployed hotfix within 18 minutes, and conducted a blameless post-mortem.',
          tips: ['Show executive composure as Incident Commander', 'Emphasize blameless post-mortem culture']
        },
        {
          q: 'How do you balance pushing for cutting-edge technology migrations vs maintaining stable legacy business drivers?',
          a: 'I tie technology choices directly to measurable business metrics—such as developer velocity, infrastructure cost reduction, or system uptime. I run small-scale spikes to prove business value before committing organizational resources.',
          tips: ['Anchor tech decisions in business metrics', 'Use risk-managed POC spikes']
        }
      ],
      scenario: [
        {
          q: 'Scenario: Your organization needs to process 10 million real-time telemetry events per minute with sub-second analytics dashboard updates. Design the pipeline.',
          a: 'I ingest streams using Apache Kafka, process events using Apache Flink for real-time window aggregation, persist raw events to S3/Icehouse data lake, and write aggregated metrics into ClickHouse for sub-50ms analytics API queries.',
          tips: ['Architect Kafka -> Flink -> ClickHouse streaming pipeline', 'Separate raw historical store from low-latency serving store']
        },
        {
          q: 'Scenario: Two engineering directors disagree on adopting GraphQL vs REST across 40 internal services. How do you drive consensus?',
          a: 'I organize a structured evaluation matrix scoring developer velocity, payload efficiency, schema governance, and caching effort. I propose a hybrid standard: GraphQL at edge BFF (Backend-For-Frontend) layers for client flexibility, and gRPC internally for performance.',
          tips: ['Propose BFF (Backend-For-Frontend) hybrid pattern', 'Use data-driven evaluation criteria']
        }
      ]
    }
  },
  analyst: {
    'Entry Level': {
      beginner: [
        {
          q: 'What is the difference between exploratory data analysis (EDA) and confirmatory data analysis?',
          a: 'Exploratory Data Analysis uses summary statistics and visualization to uncover hidden patterns, trends, or anomalies without predefined assumptions. Confirmatory Data Analysis tests specific hypotheses using statistical significance tests (e.g. t-tests, ANOVA).',
          tips: ['Mention summary stats and visual charts', 'Explain hypothesis testing in confirmatory analysis']
        },
        {
          q: 'How do LEFT JOIN, INNER JOIN, and FULL OUTER JOIN differ in SQL?',
          a: 'INNER JOIN returns only matching rows from both tables. LEFT JOIN returns all rows from the left table plus matched rows from the right table (filling missing values with NULL). FULL OUTER JOIN returns all records when there is a match in either left or right table.',
          tips: ['Explain NULL handling on unmatched rows', 'Provide a simple 2-table visual example']
        },
        {
          q: 'What key performance indicators (KPIs) would you track for an e-commerce platform?',
          a: 'Core KPIs include Conversion Rate, Average Order Value (AOV), Customer Acquisition Cost (CAC), Customer Lifetime Value (CLV), Cart Abandonment Rate, and Monthly Active Users (MAU).',
          tips: ['Group KPIs into acquisition, retention, and revenue', 'Explain CAC to CLV ratio']
        }
      ],
      technical: [
        {
          q: 'How do you handle missing or duplicate values when cleaning a business dataset in SQL or Excel?',
          a: 'For duplicates, I identify primary key constraints or use SQL ROW_NUMBER() window functions to deduplicate. For missing values, I investigate whether data is Missing at Random. Depending on context, I drop incomplete records or impute values using median/mean.',
          tips: ['Mention SQL ROW_NUMBER() PARTITION BY', 'Explain mean/median imputation trade-offs']
        },
        {
          q: 'How do you structure an interactive dashboard in Tableau or Power BI for non-technical executives?',
          a: 'I follow visual hierarchy principles: summary KPI metric cards at the top, trend line charts in the middle, and detailed drill-down tables at the bottom. I use clean filters and consistent color palettes without clutter.',
          tips: ['Follow top-to-bottom visual hierarchy', 'Focus on executive decision-making clarity']
        },
        {
          q: 'Explain how window functions like RANK(), DENSE_RANK(), and ROW_NUMBER() differ in SQL.',
          a: 'ROW_NUMBER() assigns a unique sequential integer to every row regardless of ties. RANK() leaves gaps in rank numbering when ties occur (1, 2, 2, 4). DENSE_RANK() does not leave gaps (1, 2, 2, 3).',
          tips: ['Provide concrete number tie examples', 'Explain PARTITION BY and ORDER BY clauses']
        }
      ],
      behavioral: [
        {
          q: 'Tell me about a time you discovered an error or anomaly in a business report right before a presentation.',
          a: 'While reviewing a quarterly revenue report 1 hour before stakeholder review, I noticed a 30% surge caused by duplicated currency conversions. I immediately corrected the SQL script, alerted my manager, and delivered accurate metrics.',
          tips: ['Highlight attention to detail and calm crisis management', 'Focus on data integrity']
        },
        {
          q: 'How do you explain technical analytical findings to non-technical business stakeholders?',
          a: 'I avoid statistical jargon, frame metrics in terms of revenue or efficiency impact, use clear visual charts, and start presentations with key business takeaways before diving into supporting data.',
          tips: ['Translate data metrics to dollar/time business impact', 'Use storytelling with visual charts']
        }
      ],
      scenario: [
        {
          q: 'Scenario: User conversion rates dropped by 12% last week. How do you analyze the root cause?',
          a: 'I break down data by dimension: device type (iOS/Android/Web), geographic region, user acquisition channel, and app version. Next, I inspect user journey conversion funnel steps to isolate exact drop-off bottlenecks.',
          tips: ['Apply top-down funnel breakdown', 'Segment by traffic source, browser, and device']
        },
        {
          q: 'Scenario: Two department heads request conflicting metrics for the same definition of "Active Customer". How do you resolve it?',
          a: 'I facilitate a metric definition alignment meeting, document exact calculation logic in a central data dictionary, and propose standardizing definitions (e.g. "Logged-in Active" vs "Transaction Active").',
          tips: ['Create central data dictionary documentation', 'Establish unified business metrics']
        }
      ]
    },
    'Mid Level': {
      beginner: [
        {
          q: 'How do you evaluate whether an A/B test result is statistically significant?',
          a: 'I calculate p-value using a Two-Sample t-test or Chi-Square test against a baseline significance threshold (alpha = 0.05). I also ensure sample size was calculated prior to testing to avoid premature stopping bias.',
          tips: ['Mention p-values and confidence intervals (95%)', 'Discuss sample size estimation and peeking bias']
        },
        {
          q: 'What is Cohort Analysis, and how do you use it to measure customer retention?',
          a: 'Cohort Analysis groups users by shared characteristics over time (e.g. sign-up month). Tracking these cohorts across subsequent weeks/months reveals true retention curves independent of top-of-funnel acquisition growth.',
          tips: ['Explain retention matrix charts', 'Contrast new user acquisition vs cohort retention']
        },
        {
          q: 'How do you design a relational data warehouse dimensional model (Star Schema vs Snowflake Schema)?',
          a: 'A Star Schema connects a central Fact table containing quantitative measurements to denormalized Dimension tables, optimizing query performance. A Snowflake Schema normalizes dimensions into multiple related tables, reducing redundancy.',
          tips: ['Contrast Fact tables with Dimension tables', 'Explain query performance of Star Schema in OLAP']
        }
      ],
      technical: [
        {
          q: 'Write the conceptual SQL logic to calculate 7-day rolling average revenue per user.',
          a: 'I use a window function: AVG(daily_revenue) OVER (PARTITION BY user_id ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW). This smooths daily volatility to reveal true underlying trends.',
          tips: ['Specify ROWS BETWEEN 6 PRECEDING AND CURRENT ROW', 'Explain partitioning by user or date']
        },
        {
          q: 'How do you build automated ELT pipelines using dbt (data build tool) and Snowflake/BigQuery?',
          a: 'I load raw data into staging tables, write modular dbt SQL transformations using Jinja templates, run automated data quality tests (unique, not_null, relationships), and document lineage in dbt docs.',
          tips: ['Mention modular dbt models and Jinja templating', 'Highlight automated testing (unique/not_null)']
        },
        {
          q: 'How do you detect and handle Simpson’s Paradox when analyzing business metrics?',
          a: 'Simpson’s Paradox occurs when a trend appears in aggregated data but reverses when broken into subgroups. I detect it by always segmenting aggregate statistics across key confounding variables before drawing conclusions.',
          tips: ['Explain aggregate vs subgroup trends', 'Provide concrete A/B testing example']
        }
      ],
      behavioral: [
        {
          q: 'Describe a project where your analytical insights directly influenced executive business strategy.',
          a: 'By analyzing user churn data, I identified that customers who did not complete onboarding within 48 hours had a 70% higher drop-off rate. I presented a recommended automated email campaign that increased onboarding completion by 24%, adding $320k in annual recurring revenue.',
          tips: ['Quantify business financial impact ($ or % ROI)', 'Demonstrate proactive business intuition']
        },
        {
          q: 'How do you prioritize multiple urgent ad-hoc data analysis requests from different department managers?',
          a: 'I evaluate requests using an Impact vs Effort framework, prioritizing tasks tied directly to strategic company quarterly OKRs. I communicate realistic timelines and empower teams with self-serve BI dashboards.',
          tips: ['Use Impact vs Effort framework', 'Empower stakeholders with self-serve dashboards']
        }
      ],
      scenario: [
        {
          q: 'Scenario: Executive leadership asks why customer churn increased 15% this quarter. How do you structure your investigation?',
          a: 'I break churn down into voluntariness (cancellations vs payment failures), segment by tenure cohorts, cross-reference customer support ticket topics, and analyze product usage feature decline prior to cancellation.',
          tips: ['Distinguish voluntary vs involuntary churn', 'Analyze usage telemetry leading up to cancellation']
        },
        {
          q: 'Scenario: The marketing department claims an ad campaign generated 5,000 new sales, but Finance reports only 3,200. How do you reconcile this?',
          a: 'I inspect attribution window models used by Marketing (first-touch / last-touch) vs Finance accounting transaction logs. I eliminate duplicate tracking pixels and build a single unified multi-touch attribution model.',
          tips: ['Identify attribution model discrepancies', 'Reconcile transaction logs with tracking pixel events']
        }
      ]
    },
    'Senior Level': {
      beginner: [
        {
          q: 'How do you architect an enterprise Analytics & Business Intelligence strategy from scratch?',
          a: 'I establish a scalable modern data stack (ELT with Fivetran/dbt, Cloud Warehouse in Snowflake/BigQuery, BI in Tableau/Looker), enforce strict data governance and metadata lineage, and foster a data-driven culture with self-serve semantic models.',
          tips: ['Cover Modern Data Stack components', 'Emphasize data governance and semantic layer']
        },
        {
          q: 'What is the role of Causal Inference in business decision-making where A/B testing is impossible?',
          a: 'When A/B testing is unethical or technically impossible, I apply Econometric Causal Inference methods like Difference-in-Differences (DiD), Synthetic Control, or Propensity Score Matching to estimate true incremental business impact.',
          tips: ['Mention Difference-in-Differences or Synthetic Control', 'Explain controlling for confounding variables']
        },
        {
          q: 'How do you build a Data Governance and Quality Assurance framework across enterprise datasets?',
          a: 'I implement automated data observability (Monte Carlo / Great Expectations), establish data ownership roles across business domains, enforce automated schema validation in CI/CD, and define SLA monitoring for pipeline freshness.',
          tips: ['Mention data observability tools (Monte Carlo)', 'Define pipeline freshness and data accuracy SLAs']
        }
      ],
      technical: [
        {
          q: 'How do you design a Semantic Data Layer (e.g. Looker LookML or Cube) for enterprise reporting consistency?',
          a: 'I centralize business metric definitions in a version-controlled semantic layer. This abstracts raw SQL tables into governed metrics (e.g. Net Revenue), ensuring every dashboard across the organization calculates KPIs identically.',
          tips: ['Explain version-controlled metric definitions', 'Prevent duplicate metric calculations across teams']
        },
        {
          q: 'Explain how you build predictive Customer Lifetime Value (CLV) models using survival analysis or machine learning.',
          a: 'I combine historical transactional data with churn probability models (e.g. BG/NBD models or Cox Proportional Hazards). This projects future order frequency and margin per customer segment, guiding acquisition CAC caps.',
          tips: ['Mention BG/NBD or survival analysis models', 'Connect CLV directly to CAC ceiling caps']
        },
        {
          q: 'How do you evaluate and optimize data warehouse query costs on BigQuery or Snowflake?',
          a: 'I enforce clustering and partitioning on high-cardinality query keys, materialize common subquery views, implement auto-suspend cluster policies, and set up automated cost alerts for runaway queries.',
          tips: ['Mention partitioning and clustering', 'Discuss materialized views and query slot management']
        }
      ],
      behavioral: [
        {
          q: 'Describe a situation where your analytical findings challenged executive consensus or company strategy. How did you handle it?',
          a: 'Company leadership planned a $2M expansion into a new market segment based on qualitative survey enthusiasm. My quantitative market basket analysis revealed that target segment willingness-to-pay was 40% lower than assumed. I presented data alternatives, pivoting investment into adjacent high-margin add-ons.',
          tips: ['Show courage backed by rigorous data evidence', 'Offer constructive alternative strategic paths']
        },
        {
          q: 'How do you build and mentor a top-performing team of data analysts and analytics engineers?',
          a: 'I foster clear career tracks (Individual Contributor vs Management), pair junior analysts with senior mentors on high-impact projects, conduct weekly code reviews, and advocate for modern tooling that eliminates repetitive manual tasks.',
          tips: ['Highlight structured career tracks and mentorship', 'Automate manual tasks to free up strategic analysis time']
        }
      ],
      scenario: [
        {
          q: 'Scenario: Your company is preparing for an IPO or major acquisition audit. What steps do you take to audit all financial data pipelines?',
          a: 'I establish strict end-to-end data lineage documentation, conduct automated reconcile audits between transactional databases and reporting warehouses, enforce SOC2 compliant RBAC access controls, and certify core financial KPI calculations.',
          tips: ['Enforce SOC2 compliance & data lineage', 'Conduct automated reconciliation checks']
        },
        {
          q: 'Scenario: Machine learning recommendations are generating high click rates but decreasing long-term user retention. What is happening and how do you fix it?',
          a: 'The algorithm is optimizing for short-term engagement (clickbait) at the expense of long-term utility. I re-weight the optimization objective function to penalize rapid bounce rates and incorporate multi-objective optimization balancing clicks with 30-day retention.',
          tips: ['Identify metric gaming/clickbait optimization', 'Implement multi-objective loss function']
        }
      ]
    }
  }
};

// Generic dynamic question generator for custom roles
function generateGenericQuestions(
  role: string,
  experienceLevel: ExperienceLevel
): {
  beginner: Array<{ q: string; a: string; tips: string[] }>;
  technical: Array<{ q: string; a: string; tips: string[] }>;
  behavioral: Array<{ q: string; a: string; tips: string[] }>;
  scenario: Array<{ q: string; a: string; tips: string[] }>;
} {
  const cleanRole = role.trim();

  const isSenior = experienceLevel === 'Senior Level';
  const isMid = experienceLevel === 'Mid Level';

  return {
    beginner: [
      {
        q: `What core principles and industry best practices guide your work as a ${experienceLevel} ${cleanRole}?`,
        a: `As a ${experienceLevel} ${cleanRole}, I prioritize clear communication, structured problem solving, continuous industry learning, and aligning daily technical execution directly with overall organizational goals.`,
        tips: ['Focus on foundational domain principles', 'Mention professional standards and alignment']
      },
      {
        q: `How do you stay updated with emerging tools, methodologies, and trends in the ${cleanRole} space?`,
        a: `I regularly review leading industry publications, participate in professional tech communities, build experimental side projects, and benchmark new tools to bring innovation to my team.`,
        tips: ['Provide concrete learning sources', 'Highlight continuous professional growth']
      },
      {
        q: `What key metrics or outcomes do you use to measure success in a ${cleanRole} position?`,
        a: `I track both quantitative metrics (e.g. project delivery velocity, quality benchmarks, accuracy rates) and qualitative metrics (stakeholder satisfaction, team collaboration, process efficiency).`,
        tips: ['Balance quantitative and qualitative metrics', 'Connect metrics to business value']
      }
    ],
    technical: [
      {
        q: `Walk me through your end-to-end workflow when starting a complex ${cleanRole} project.`,
        a: `I begin by gathering detailed stakeholder requirements, analyzing existing workflows, mapping technical constraints, creating modular project plans, and executing with iterative feedback loops.`,
        tips: ['Detail a structured step-by-step methodology', 'Emphasize validation and requirement gathering']
      },
      {
        q: `How do you handle technical debt, process bottlenecks, or quality assurance as a ${cleanRole}?`,
        a: `I establish automated testing/review checkpoints, maintain a transparent backlog for technical improvements, and dedicate recurring bandwidth to optimizing inefficient processes.`,
        tips: ['Advocate for sustainable quality controls', 'Mention automated tooling and refactoring']
      },
      {
        q: `What modern software, tools, or frameworks do you consider essential for a high-performing ${cleanRole}?`,
        a: `I leverage industry-standard tools tailored to ${cleanRole} workflows, selecting technologies based on reliability, community support, team familiarity, and scalability requirements.`,
        tips: ['Mention specific tools relevant to the job title', 'Discuss evaluation criteria for tooling selection']
      }
    ],
    behavioral: [
      {
        q: `Tell me about a challenging project where you had to collaborate across different teams as a ${cleanRole}.`,
        a: `I led cross-functional coordination by establishing clear documentation, holding brief async status updates, active listening to team concerns, and keeping focus on shared deliverables.`,
        tips: ['Use the STAR method (Situation, Task, Action, Result)', 'Highlight empathy and communication']
      },
      {
        q: `Describe a situation where a project requirement changed unexpectedly. How did you adapt?`,
        a: `I assessed the impact on scope and timeline, communicated trade-offs transparently with project owners, and reprioritized deliverables to meet core objectives without sacrificing quality.`,
        tips: ['Show adaptability under pressure', 'Highlight stakeholder communication']
      }
    ],
    scenario: [
      {
        q: `Scenario: You are assigned a critical ${cleanRole} task with incomplete requirements and a tight deadline. How do you proceed?`,
        a: `I immediately identify core assumptions, build a rapid draft proof-of-concept, review initial deliverables with key stakeholders to validate direction, and iterate quickly to meet deadline.`,
        tips: ['Emphasize rapid prototyping and feedback', 'Show proactive initiative under ambiguity']
      },
      {
        q: `Scenario: A major deliverable under your responsibility fails quality checks right before release. What is your response?`,
        a: `I halt deployment to mitigate risk, conduct a rapid root-cause analysis with team members, implement an emergency fix or fallback option, and update stakeholders on resolution status.`,
        tips: ['Prioritize quality and risk mitigation', 'Conduct post-incident prevention reviews']
      }
    ]
  };
}

/**
 * Main generator function guaranteeing exactly 10 questions:
 * - 3 General questions (IDs 1-3)
 * - 4 Role-Specific or Technical questions (IDs 4-7)
 * - 2 Behavioral questions (IDs 8-9)
 * - 1 Scenario-Based question (ID 10)
 */
export function generateTenRoleQuestions(
  role: string,
  experienceLevel: ExperienceLevel = 'Mid Level'
): QuestionGenerationResult {
  let rawRole = role.trim();
  if (!rawRole || /university|college|school|institute|river forest|degree|bachelor|master|phd/i.test(rawRole)) {
    rawRole = 'Software Engineer';
  }
  const cleanRole = rawRole;
  const roleLower = cleanRole.toLowerCase();

  // Match role to bank key
  let bankKey = 'software';
  if (roleLower.includes('ai') || roleLower.includes('machine learning') || roleLower.includes('llm') || roleLower.includes('data scientist') || roleLower.includes('prompt')) {
    bankKey = 'ai';
  } else if (roleLower.includes('analyst') || roleLower.includes('business analyst') || roleLower.includes('data analyst') || roleLower.includes('bi')) {
    bankKey = 'analyst';
  } else if (ROLE_QUESTION_BANK[bankKey]) {
    bankKey = 'software';
  }

  const roleBank = ROLE_QUESTION_BANK[bankKey]?.[experienceLevel];
  const qBank = roleBank || generateGenericQuestions(cleanRole, experienceLevel);

  const questions: InterviewQuestion[] = [];

  // 1-3: General / Fundamental (3 questions)
  qBank.beginner.slice(0, 3).forEach((item, idx) => {
    questions.push({
      id: idx + 1,
      question: item.q,
      category: 'Beginner / Fundamental',
      typeBadge: 'Beginner',
      sampleAnswer: item.a,
      keyTakeaways: item.tips
    });
  });

  // 4-7: Role-Specific / Technical (4 questions)
  // Ensure we have 4 technical items
  const techItems = [...qBank.technical];
  while (techItems.length < 4) {
    techItems.push({
      q: `What specific methodologies, software, or tools do you rely on to excel as a ${cleanRole}?`,
      a: `I leverage industry-standard frameworks and software tools suited for ${cleanRole} tasks, continuously refining my workflow to maximize throughput and quality.`,
      tips: ['Specify tools relevant to the job title', 'Highlight efficiency and best practices']
    });
  }

  techItems.slice(0, 4).forEach((item, idx) => {
    questions.push({
      id: idx + 4,
      question: item.q,
      category: 'Technical / Role-Specific',
      typeBadge: 'Technical',
      sampleAnswer: item.a,
      keyTakeaways: item.tips
    });
  });

  // 8-9: Behavioral (2 questions)
  qBank.behavioral.slice(0, 2).forEach((item, idx) => {
    questions.push({
      id: idx + 8,
      question: item.q,
      category: 'Behavioral',
      typeBadge: 'Behavioral',
      sampleAnswer: item.a,
      keyTakeaways: item.tips
    });
  });

  // 10: Scenario-Based (1 question)
  const scenarioItem = qBank.scenario[0] || {
    q: `Scenario: You face a high-pressure deadline as a ${cleanRole} with unexpected scope changes. How do you respond?`,
    a: `I immediately assess the critical path, communicate trade-offs with stakeholders, reprioritize core deliverables, and execute with focus.`,
    tips: ['Focus on rapid prioritization', 'Highlight clear communication under pressure']
  };

  questions.push({
    id: 10,
    question: scenarioItem.q,
    category: 'Scenario-Based',
    typeBadge: 'Scenario',
    sampleAnswer: scenarioItem.a,
    keyTakeaways: scenarioItem.tips
  });

  return {
    role: cleanRole,
    experienceLevel,
    questions
  };
}
