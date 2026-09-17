import { Article, QuizQuestion, UserRetentionCard, UserProfile } from './types';

export const INITIAL_USER: UserProfile = {
  id: 'usr_stem_researcher_01',
  name: 'Dr. Elena Rostova',
  email: 'elena.rostova@tootler.ai',
  targetExam: 'Advanced STEM Research & Engineering',
  targetYear: 2026,
  optionalSubject: 'Quantum Computing & Silicon Systems',
  streakDays: 14,
  hasActiveStreakToday: true,
  totalArticlesRead: 52,
  totalQuizzesTaken: 41,
  accuracyPercentage: 88,
  studyGoalDailyArticles: 5,
  studyGoalDailyMinutes: 45,
};

export const MOCK_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'Fault-Tolerant Quantum Computing: Logical Qubits vs. Physical Error Thresholds',
    tagline: 'Analyzing surface code distance scaling, syndrome extraction cycles, and neutral-atom optical tweezer architectures.',
    summary: 'Achieving commercially viable quantum advantage requires scaling logical qubits past the break-even threshold. This paper examines surface code stabilizer measurements, cryogenic thermal dissipation constraints, and all-to-all connectivity in neutral atom arrays.',
    subject: 'Quantum & Physics',
    paper: 'Research Paper',
    source: 'Nature Physics & arXiv:quant-ph',
    readTime: '7 min read',
    publishedAt: 'Today • Sep 17, 2026',
    author: {
      name: 'Dr. Julian Thorne',
      role: 'Quantum Information Fellow, MIT & Harvard QEC Group',
    },
    paragraphs: [
      'In quantum information processing, physical qubits are notoriously vulnerable to phase decoherence and thermal relaxation. The threshold theorem proves that if the physical gate error rate p remains below a critical fault-tolerance threshold (approximately 1% for surface codes), quantum error correction (QEC) can suppress logical errors exponentially as code distance d increases.',
      'Surface codes arrange data and ancilla qubits on a 2D square lattice. By periodically measuring weight-4 Pauli operators (ZZZZ for bit flips, XXXX for phase flips), the system extracts error syndromes without collapsing the underlying superposition. However, scaling a code distance of d=7 requires (2d-1)^2 physical qubits per logical qubit—translating to roughly 1,000 physical qubits for a single error-suppressed logical entity.',
      'Superconducting transmon architectures face physical interconnect bottlenecks at millikelvin dilution refrigerator stages. Cryogenic coaxial cables generate passive heat loads, limiting dilution fridges to roughly 10,000 physical qubits before thermal cooling power is overwhelmed.',
      'Conversely, neutral-atom platforms using rubidium or ytterbium atoms held in programmable 3D optical tweezer arrays have emerged as a disruptive contender. Because neutral atoms can be physically shuttled in microseconds using spatial light modulators (SLMs), they provide dynamic all-to-all connectivity, eliminating the rigid nearest-neighbor constraints of 2D superconducting planar chips.',
      'Universal fault-tolerant quantum computation further mandates non-Clifford gates (such as the T-gate, π/8 rotation). Because the Eastin-Knill theorem prohibits transversal implementation of all universal gates on any single stabilizer code, magic state distillation remains the paramount computational bottleneck for running Shor’s and Grover’s algorithms at scale.'
    ],
    syllabusMapping: {
      paper: 'Quantum Information & Condensed Matter Physics',
      topic: 'Fault-Tolerant Architectures & Error Correction',
      subTopic: 'Surface Code Stabilizers, Magic State Distillation, and Neutral-Atom Shuttling',
    },
    prelimsPointers: [
      'Threshold Theorem: Logical error rate scales as P_L ∝ (p / p_th)^((d+1)/2), where d is the code distance.',
      'Eastin-Knill Theorem: No quantum error-detecting code can implement a universal gate set transversally.',
      'Neutral Atom Advantages: Hyperfine clock states provide coherence times (T2) exceeding seconds at room temperature.',
      'Magic State Distillation: Converts noisy non-Clifford ancillae into high-fidelity T-states with ~15:1 physical overhead.'
    ],
    mainsPerspectives: {
      coreDimensions: [
        'Decoherence Dynamics: Mitigating 1/f flux noise and dielectric loss in coplanar waveguide resonators.',
        'Syndrome Extraction Overhead: Real-time FPGA decoding latency must match the ~200ns syndrome cycle.',
        'Architecture Scaling: 3D photonic optical tweezer grids vs. monolithic 2.5D superconducting multi-chip modules.'
      ],
      criticalAnalysis: [
        'State-of-the-art physical 2-qubit gate fidelities hover around 99.5%, barely crossing the surface code threshold.',
        'Ancilla measurement back-action and optical tweezer heating induce unmodelled leakage into non-computational states.',
        'Classical decoding algorithms (Minimum-Weight Perfect Matching and Union-Find) struggle with real-time throughput.'
      ],
      modelQuestion: 'Critically analyze the architectural trade-offs between neutral atom arrays and superconducting transmon qubits for fault-tolerant quantum error correction. Detail the mathematical relationship between code distance and logical error suppression.'
    },
    pyq: {
      question: 'Demonstrate how the 2D surface code detects both bit-flip (X) and phase-flip (Z) errors using stabilizer generators without collapsing data superposition.',
      year: 'Physical Review Letters 2024',
      paper: 'Quantum Computing',
      type: 'Paper',
    },
    keyTerms: [
      { term: 'Surface Code', definition: 'A topological 2D quantum error-correcting code defined by star (X) and plaquette (Z) stabilizer operators.' },
      { term: 'Magic State Distillation', definition: 'A routine that consumes multiple noisy ancilla states to synthesize high-fidelity non-Clifford T-gates.' },
      { term: 'Eastin-Knill Theorem', definition: 'A theorem establishing that transversal gates on any quantum error-correcting code cannot be universal.' }
    ],
    likesCount: 248,
    bookmarksCount: 165,
  },
  {
    id: '2',
    title: 'Sparse Attention and Mixture-of-Depths in Next-Generation LLM Architectures',
    tagline: 'Moving beyond dense transformer quadratic compute: dynamic routing, KV-cache compression, and conditional FLOP allocation.',
    summary: 'Standard transformers allocate uniform compute across trivial and dense tokens. Mixture-of-Depths (MoD) and block-sparse attention mechanisms dynamically route compute per token, drastically reducing inference latency while expanding context windows beyond 10M tokens.',
    subject: 'AI & Machine Learning',
    paper: 'System Architecture',
    source: 'DeepMind & arXiv:cs.LG',
    readTime: '6 min read',
    publishedAt: 'Yesterday • Sep 16, 2026',
    author: {
      name: 'Dr. Sophia Chen',
      role: 'Principal AI Systems Architect',
    },
    paragraphs: [
      'Standard Transformer self-attention scales quadratically O(N^2) with sequence length N, making multi-million token contexts computationally prohibitive. Furthermore, standard autoregressive models enforce homogeneous compute across every sequence position: predicting a punctuation mark consumes identical FLOPs to solving a complex logical deduction.',
      'Mixture-of-Depths (MoD) resolves this structural inefficiency. Instead of passing every token through every feedforward block, a learned router conditions token progression. Tokens deemed low-complexity bypass transformer layers via residual stream identity projections, allocating computational density strictly to tokens carrying high semantic entropy.',
      'In parallel, FlashAttention-3 leverages asynchronous tensor core memory movement and FP8 tensor pipeline overlap on modern Hopper and Blackwell GPUs. By tiling the Q, K, and V matrices in high-speed SRAM and computing softmax normalizers incrementally, memory bandwidth bottlenecks are transformed into pure compute-bound operations.',
      'For extended context windows, Grouped-Query Attention (GQA) and 2-bit KV-cache quantization (KIVI) compress memory footprint by 85% with negligible perplexity degradation. This allows single-node DGX systems to maintain conversational history exceeding 4 million tokens without offloading to slower host RAM.',
      'The convergence of dynamic depth routing, linear state-space models (Mamba-2), and block-sparse attention establishes a new frontier: models that scale non-linearly, offering 3x higher throughput at matched pre-training FLOP budgets.'
    ],
    syllabusMapping: {
      paper: 'Deep Learning & Neural Network Systems',
      topic: 'Efficient Attention & Conditional Compute',
      subTopic: 'Mixture-of-Depths Routing, FlashAttention-3 Kernel Design, and KV-Cache Quantization',
    },
    prelimsPointers: [
      'Mixture-of-Depths allocates a fixed compute budget (e.g. 50% capacity) and selects top-k tokens via learned router logits.',
      'FlashAttention-3 utilizes hardware-accelerated warp-specialization and TMA (Tensor Memory Accelerator) asynchronous copy.',
      'GQA shares key and value projection heads across multiple query heads, shrinking KV cache sizes by 4x to 8x.',
      'RingAttention parallelizes self-attention across multiple GPU nodes by passing key-value blocks in an asynchronous ring buffer.'
    ],
    mainsPerspectives: {
      coreDimensions: [
        'Compute Asymmetry: Dynamically modulating FLOPs based on token predictability and token entropy.',
        'SRAM Memory Hierarchy: Minimizing high-bandwidth memory (HBM3e) round-trips via hardware-aware kernel fusion.',
        'Hybrid SSM-Transformer Topologies: Interleaving Mamba-2 state space layers with dense attention.'
      ],
      criticalAnalysis: [
        'Top-k routing introduces non-deterministic load balancing across distributed GPU tensor-parallel ranks.',
        'Aggressive KV-cache quantization (sub-3-bit) introduces catastrophic needle-in-a-haystack retrieval drop-offs.',
        'MoD router training exhibits instability during early pre-training phases before semantic priors crystallize.'
      ],
      modelQuestion: 'Explain the algorithmic mechanics of Mixture-of-Depths (MoD). How does dynamic token routing achieve a constant compute budget while maintaining model perplexity? Compare its efficiency against standard Mixture-of-Experts (MoE).'
    },
    pyq: {
      question: 'Derive the time and memory complexity of standard Multi-Head Attention vs Grouped-Query Attention (GQA) during autoregressive decoding as sequence length tends to infinity.',
      year: 'NeurIPS 2024',
      paper: 'Systems & ML',
      type: 'Paper',
    },
    keyTerms: [
      { term: 'Mixture-of-Depths (MoD)', definition: 'A transformer paradigm that uses learned routers to conditionally skip computation for a subset of tokens at each layer.' },
      { term: 'KV-Cache', definition: 'The stored key and value tensor representations of previous tokens in autoregressive generation to avoid redundant recalculation.' },
      { term: 'FlashAttention', definition: 'An IO-aware exact self-attention algorithm that tiles computations to execute within fast on-chip SRAM.' }
    ],
    likesCount: 312,
    bookmarksCount: 224,
  },
  {
    id: '3',
    title: 'High-NA EUV Lithography: GAA Nanosheets and Backside Power Delivery at 1nm',
    tagline: 'ASML 0.55 NA anamorphic mirrors, nanosheet capacitance, and separating signal from power via Buried Power Rails.',
    summary: 'Sub-2nm semiconductor scaling requires High-NA extreme ultraviolet lithography (0.55 NA) combined with Gate-All-Around (GAA) nanosheets and Backside Power Delivery (BSPDN). An engineering deep dive into the physics of modern chip fabrication.',
    subject: 'Semiconductors & Hardware',
    paper: 'Hardware Spec',
    source: 'IEEE Spectrum & ASML Technical Review',
    readTime: '8 min read',
    publishedAt: '2 days ago • Sep 15, 2026',
    author: {
      name: 'Marcus Vance',
      role: 'Principal Process & Lithography Engineer',
    },
    paragraphs: [
      'Moore’s Law progression into the Angstrom era has exhausted traditional 0.33 Numerical Aperture (NA) EUV single-exposure capabilities. By the Rayleigh resolution formula R = k1 · λ / NA, printing sub-26nm pitch features with 13.5nm EUV light previously necessitated costly multi-patterning LELE (Litho-Etch-Litho-Etch) loops.',
      'ASML’s High-NA Twinscan EXE systems introduce an anamorphic 0.55 NA optical projection system. Because raising the NA to 0.55 increases optical incidence angles on the reflective photomask beyond the Bragg reflection threshold, the system employs asymmetric 4x magnification in X and 8x in Y, halving the reticle field size to 26mm x 13mm.',
      'Simultaneously, transistor physics has shifted from FinFETs to horizontally stacked Gate-All-Around (GAA) nanosheets (RibbonFET / MBCFET). Enclosing the entire silicon conduction channel with high-κ metal gate material eliminates sub-threshold leakage, offering superior electrostatic control and drive current tuneability.',
      'To power these ultra-dense nanosheet arrays, Backside Power Delivery Networks (BSPDN / Intel PowerVia) represent the most radical interconnect revolution in 30 years. Traditional chips route power lines and clock signals together through 15+ top metal interconnect layers, causing severe IR voltage drop and RC delay.',
      'By decoupling power delivery to the back of the silicon wafer using sub-micron Through-Silicon Vias (TSVs) and Buried Power Rails (BPRs), signal lines on the front wafer face gain 20% routing density while eliminating resistive power losses.'
    ],
    syllabusMapping: {
      paper: 'VLSI Semiconductor Physics & Fabrication',
      topic: 'Advanced Lithography & Transistor Scaling',
      subTopic: 'High-NA EUV Optics, GAA Electrostatics, and Backside Power Interconnects',
    },
    prelimsPointers: [
      'Rayleigh Resolution Formula: Resolution limit R = k1 · λ / NA. 0.55 NA achieves sub-8nm half-pitch printing.',
      'Anamorphic Magnification: 4x in scanning direction, 8x in cross-scan to prevent reticle shadow effects.',
      'Gate-All-Around (GAA): Gate dielectric surrounds all 4 sides of vertically stacked silicon nanosheets.',
      'Backside Power Delivery (BSPDN): Transfers VDD and VSS rails to the back of the wafer, cutting IR drop by over 30%.'
    ],
    mainsPerspectives: {
      coreDimensions: [
        'Photomask Half-Field Stitching: Stitching adjacent 26x13mm fields across large die sizes like AI accelerators.',
        'Stochastic EUV Defects: Line-edge roughness (LER) and photon shot-noise at low EUV exposure doses.',
        'Thin-Wafer Grinding & CMP: Polishing silicon wafers down to <1 micron without delamination or mechanical bow.'
      ],
      criticalAnalysis: [
        'High-NA EUV scanners cost exceeding $380M per tool, restricting adoption to TSMC, Intel, and Samsung.',
        'Photoresist thickness must shrink below 20nm to avoid pattern collapse, aggravating EUV absorption cross-sections.',
        'Thermal dissipation: Moving power rails to the back creates thermal bottlenecks near bonding oxide layers.'
      ],
      modelQuestion: 'Detail the optical physics underlying ASML’s 0.55 High-NA EUV anamorphic mirror architecture. Explain why Backside Power Delivery Networks (BSPDN) are physically necessary to unlock sub-2nm node scaling.'
    },
    pyq: {
      question: 'Derive the maximum tolerable aspect ratio for sub-20nm EUV photoresists to prevent capillary-force induced pattern collapse during chemical rinse.',
      year: 'SPIE Advanced Lithography 2024',
      paper: 'Semiconductor Fabrication',
      type: 'Paper',
    },
    keyTerms: [
      { term: 'High-NA EUV', definition: 'Extreme Ultraviolet lithography with a 0.55 Numerical Aperture using anamorphic mirror optics to achieve sub-10nm resolution.' },
      { term: 'GAA Nanosheet', definition: 'A transistor geometry where the conductive channel consists of stacked horizontal silicon wires surrounded on all sides by gate material.' },
      { term: 'Buried Power Rail (BPR)', definition: 'Power distribution lines embedded inside the silicon substrate beneath transistors to route current from the wafer backside.' }
    ],
    likesCount: 289,
    bookmarksCount: 201,
  },
  {
    id: '4',
    title: 'CRISPR-Cas13 RNA Editing: Precision Transcriptome Therapeutics Without Genomic Alteration',
    tagline: 'Engineering catalytic Cas13 mutants to eliminate collateral cleavage for neurodegenerative and oncological therapy.',
    summary: 'Unlike DNA-cutting Cas9, Cas13 targets single-stranded RNA, enabling transient, reversible therapeutic interventions without permanent off-target genome mutations. We examine engineered Cas13 variants suppressing bystander cleavage for clinical translation.',
    subject: 'Biotech & Genomics',
    paper: 'Research Paper',
    source: 'Cell & Nature Biotechnology',
    readTime: '6 min read',
    publishedAt: '3 days ago • Sep 14, 2026',
    author: {
      name: 'Dr. Alistair Finch',
      role: 'Molecular Neurobiology Lead, Broad Institute',
    },
    paragraphs: [
      'CRISPR-Cas9 revolutionized molecular biology by introducing targeted double-strand breaks (DSBs) into chromosomal DNA. However, permanent DNA cleavage carries severe clinical risks: non-homologous end joining (NHEJ) induces unpredicted insertions/deletions (indels), large chromosomal translocations, and potential oncogenic transformation.',
      'Type VI CRISPR-Cas13 endonucleases operate under a completely different paradigm. Guided by a 28–30 nucleotide CRISPR RNA (crRNA), Cas13 specifically binds single-stranded target RNA (ssRNA) via its twin Higher Eukaryotes and Prokaryotes Nucleotide-binding (HEPN) catalytic domains, degrading mRNA transcripts without permanently editing genomic DNA.',
      'Because RNA is naturally transient, Cas13 therapeutic applications are inherently dose-titratable and reversible. In neurodegenerative diseases like Huntington’s disease and Frontotemporal Dementia (FTD), Cas13 can knock down toxic mutant huntingtin (mHTT) or MAPT tau transcripts while leaving healthy genomic architecture intact.',
      'However, wild-type Cas13 displays a hazardous enzymatic artifact: "collateral cleavage." Upon binding its on-target RNA, conformational changes activate a non-specific external RNase surface that indiscriminately shreds bystander host RNAs, triggering acute cellular apoptosis.',
      'Through high-throughput structural mutagenesis, engineered Cas13 variants (e.g. Cas13bt and high-fidelity Cas13d) have successfully decoupled on-target cleavage from non-specific collateral activity. Paired with lipid nanoparticle (LNP) delivery, this unlocks a safe pathway toward precision transcriptome medicine.'
    ],
    syllabusMapping: {
      paper: 'Molecular Genetics & Translational Biotechnology',
      topic: 'RNA-Targeting CRISPR Systems',
      subTopic: 'HEPN Catalytic Domain Kinetics, Collateral Cleavage Suppression, and LNP Delivery',
    },
    prelimsPointers: [
      'Type VI CRISPR: Cas13 family targets single-stranded RNA (ssRNA), not double-stranded DNA.',
      'HEPN Domains: Conserved R-X4-H catalytic motifs that coordinate catalytic divalent metal ions for RNA phosphodiester bond cleavage.',
      'Collateral Cleavage: Non-specific destruction of adjacent cellular RNAs triggered by on-target activation.',
      'LNP Packaging: Ionizable cationic lipids encapsulate mRNA/crRNA complexes, facilitating endosomal escape.'
    ],
    mainsPerspectives: {
      coreDimensions: [
        'Safety Profile: Transient RNA knockdown avoids permanent off-target chromosomal rearrangements.',
        'Adeno-Associated Virus (AAV) Packaging: Restricting Cas13 transgene payload size below the 4.7kb AAV cargo limit.',
        'ADAR Base Editing Fusion: Fusing catalytically dead Cas13 (dCas13) with ADAR deaminase for single-base A-to-I (G) RNA repair.'
      ],
      criticalAnalysis: [
        'Residual collateral toxicity in primary human neural tissue remains a key hurdle for clinical FDA trials.',
        'Immunogenicity of bacterial Cas13 proteins triggers cytotoxic T-cell responses upon repeat dosing.',
        'Biodistribution: Crossing the blood-brain barrier (BBB) via receptor-mediated transcytosis.'
      ],
      modelQuestion: 'Contrast the molecular mechanisms of CRISPR-Cas9 DNA editing versus CRISPR-Cas13 RNA editing. How does the elimination of collateral cleavage enable clinical translation for autosomal dominant neurodegenerative disorders?'
    },
    pyq: {
      question: 'Explain the structural mechanism by which the HEPN catalytic motif undergoes allosteric activation upon crRNA-target RNA hybridization in Type VI CRISPR-Cas systems.',
      year: 'Nature Methods 2024',
      paper: 'Biotechnology',
      type: 'Paper',
    },
    keyTerms: [
      { term: 'Cas13', definition: 'An RNA-guided, RNA-targeting CRISPR endonuclease containing two HEPN RNase domains.' },
      { term: 'Collateral Cleavage', definition: 'Non-specific degradation of surrounding bystander RNA molecules following target-activated conformational shifts.' },
      { term: 'HEPN Domain', definition: 'Higher Eukaryotes and Prokaryotes Nucleotide-binding domain responsible for catalytic RNA cleavage.' }
    ],
    likesCount: 235,
    bookmarksCount: 172,
  },
  {
    id: '5',
    title: 'Compact High-Field Tokamaks: REBCO Superconductors and The Path to Net Fusion Q > 10',
    tagline: 'High-temperature superconducting (HTS) 20 Tesla magnet coils, Lawson criterion triple products, and plasma beta stability.',
    summary: 'By deploying Rare-Earth Barium Copper Oxide (REBCO) superconducting tapes, compact tokamaks generate magnetic fields exceeding 20 Tesla. Because fusion power density scales with B^4, high-field magnets shrink reactor volume by a factor of 40, radically shortening the timeline to grid-scale nuclear fusion.',
    subject: 'Clean Energy & Fusion',
    paper: 'Deep Tech',
    source: 'Nuclear Fusion & MIT Plasma Science Review',
    readTime: '7 min read',
    publishedAt: '4 days ago • Sep 13, 2026',
    author: {
      name: 'Dr. Vikram Patel',
      role: 'Plasma Physics & Fusion Energy Lead',
    },
    paragraphs: [
      'The quest for magnetic confinement fusion has historically been defined by giant scale: ITER’s 840 cubic meter plasma chamber weighs over 23,000 tonnes because its low-temperature superconducting (LTS) niobium-tin (Nb3Sn) magnets are physically capped at ~12 Tesla on the coil.',
      'The physics of magnetic confinement dictates that fusion power density Pfusion scales as the fourth power of the magnetic field: Pfusion ∝ B^4. Concurrently, the plasma volume required to achieve net energy gain Q > 1 scales inversely as the sixth power of the magnetic field: V ∝ B^(-6).',
      'The industrialization of second-generation High-Temperature Superconducting (HTS) tapes—specifically Rare-Earth Barium Copper Oxide (REBCO)—has upended fusion economics. Unlike LTS materials that quench at low fields, REBCO maintains zero electrical resistance at 20 K under fields exceeding 20 Tesla.',
      'In a compact tokamak configuration (such as Commonwealth Fusion Systems’ SPARC), a 20 Tesla central toroidal field enables a plasma volume under 20 cubic meters to achieve Q > 10 (producing 10x more fusion thermal power than external heating input).',
      'However, extreme magnetic fields introduce immense Lorentz mechanical stress (magnetic pressure P_mag = B^2 / 2μ0 exceeds 160 megapascals) and catastrophic diverter heat fluxes exceeding 50 MW/m^2. Solving these engineering hurdles requires advanced 3D-printed tungsten monoblock diverters and detached plasma radiative cooling regimes.'
    ],
    syllabusMapping: {
      paper: 'Plasma Physics & Nuclear Fusion Engineering',
      topic: 'Magnetic Confinement & Advanced Superconductors',
      subTopic: 'REBCO Magnet Mechanics, B^4 Power Scaling, and Diverter Heat Exhaust',
    },
    prelimsPointers: [
      'B^4 Power Law: Doubling the magnetic field B increases fusion volumetric power density by a factor of 16.',
      'REBCO Tapes: Yttrium/Gadolinium barium copper oxide deposited on flexible Hastelloy substrates in 100nm films.',
      'Lawson Triple Product: n · T · τ_E > 3 × 10^21 keV·s/m^3 required for DT (deuterium-tritium) ignition.',
      'Magnetic Pressure: B^2 / 2μ0 at 20 Tesla produces mechanical stress equivalent to twice the pressure at the bottom of the Mariana Trench.'
    ],
    mainsPerspectives: {
      coreDimensions: [
        'Magnet Quench Protection: Rapidly dumping gigajoules of magnetic stored energy when local HTS resistance occurs.',
        'Diverter Exhaust Physics: Dissipating solar-core heat fluxes using neon/argon impurity seeding.',
        'Tritium Breeding Blanket: Utilizing lithium-containing ceramic pebbles to breed tritium via n + 6Li → 4He + 3H.'
      ],
      criticalAnalysis: [
        'Global manufacturing capacity for high-grade REBCO tape currently satisfies only 10% of projected fusion demand.',
        '14.1 MeV fast DT neutrons induce severe lattice displacement damage (dpa) in structural vacuum vessel steels.',
        'Tritium supply scarcity: Global commercial tritium reserves are projected to dip critically before commercial breeding blankets operate.'
      ],
      modelQuestion: 'Derive the physical scaling relationship between magnetic field strength B and required tokamak plasma volume for ignition. Evaluate how REBCO high-temperature superconductors reshape the capital expenditure of nuclear fusion reactors.'
    },
    pyq: {
      question: 'Analyze how the Troyon beta limit defines the maximum stable plasma pressure in high-field tokamaks before ballooning and kink instabilities trigger plasma disruptions.',
      year: 'Plasma Physics and Controlled Fusion 2024',
      paper: 'Fusion Engineering',
      type: 'Paper',
    },
    keyTerms: [
      { term: 'REBCO', definition: 'Rare-Earth Barium Copper Oxide, a high-temperature superconductor capable of operating at high magnetic fields.' },
      { term: 'Q Factor', definition: 'The ratio of thermal fusion power output to external heating power input. Q > 1 is breakeven, Q > 10 is commercial.' },
      { term: 'Diverter', definition: 'The component in a tokamak that extracts heat and helium ash from the boundary of the fusion plasma.' }
    ],
    likesCount: 342,
    bookmarksCount: 247,
  },
  {
    id: '6',
    title: 'Post-Quantum Cryptography: Lattice-Based Primitives and The NIST FIPS Standards',
    tagline: 'Shor’s algorithm vulnerability, Module-LWE hard problems, and deploying ML-KEM and ML-DSA across global networks.',
    summary: 'The advent of fault-tolerant quantum hardware threatens ubiquitous public-key cryptography (RSA and ECC). We evaluate the mathematical foundations of NIST’s newly standardized lattice algorithms (ML-KEM and ML-DSA), zero-knowledge integration, and side-channel resistance.',
    subject: 'Mathematics & Cryptography',
    paper: 'Applied Math',
    source: 'NIST Standards & IACR Cryptology ePrint',
    readTime: '5 min read',
    publishedAt: '5 days ago • Sep 12, 2026',
    author: {
      name: 'Elena K. Rostova',
      role: 'Cryptographic Protocol Architect & Number Theorist',
    },
    paragraphs: [
      'Virtually all contemporary internet security—from TLS handshakes to digital signatures—relies on the computational hardness of two mathematical problems: integer factorization (RSA) and the discrete logarithm on elliptic curves (ECDH/ECDSA). Peter Shor’s 1994 quantum algorithm solves both problems in polynomial time O((log N)^3) using the Quantum Fourier Transform (QFT).',
      'In response, the National Institute of Standards and Technology (NIST) finalized its primary Post-Quantum Cryptography (PQC) standards: FIPS 203 (ML-KEM / CRYSTALS-Kyber) for key encapsulation and FIPS 204 (ML-DSA / CRYSTALS-Dilithium) for digital signatures.',
      'These algorithms derive their security from the hardness of lattice problems in high-dimensional vector spaces, specifically the Module Learning With Errors (M-LWE) and Short Integer Solution (SIS) problems. Even with quantum computing, finding the shortest vector in an arbitrary n-dimensional Euclidean lattice (SVP) remains NP-hard.',
      'Unlike RSA’s compact 256-bit keys, lattice-based cryptography introduces significant data bandwidth trade-offs. An ML-KEM-768 public key spans 1,184 bytes with a 1,088-byte ciphertext, expanding TLS handshake packet fragmentation over constrained satellite and IoT networks.',
      'Furthermore, physical implementations must defend against power-analysis and timing side-channel attacks. Constant-time polynomial multiplication via the Number Theoretic Transform (NTT) and masked rejection sampling are mandatory engineering prerequisites for production deployment.'
    ],
    syllabusMapping: {
      paper: 'Computational Number Theory & Modern Cryptography',
      topic: 'Lattice-Based Cryptosystems & Post-Quantum Transition',
      subTopic: 'Module-LWE, Number Theoretic Transform (NTT), and Side-Channel Masking',
    },
    prelimsPointers: [
      'Shor’s Algorithm: Solves discrete log and factoring in polynomial time on a quantum computer; Grover’s algorithm gives a quadratic speedup on symmetric ciphers.',
      'ML-KEM (Kyber): Key encapsulation mechanism based on Module Learning With Errors (M-LWE).',
      'ML-DSA (Dilithium): Digital signature algorithm based on Module Short Integer Solution (M-SIS).',
      'Number Theoretic Transform (NTT): Specialized discrete Fourier transform over finite rings R_q for fast O(n log n) polynomial multiplication.'
    ],
    mainsPerspectives: {
      coreDimensions: [
        'Harvest Now, Decrypt Later: Adversaries intercepting and storing encrypted traffic today to decrypt post-Q-Day.',
        'Hybrid Classical-PQC Handshakes: Combining X25519 with ML-KEM-768 to hedge against algebraic vulnerabilities.',
        'Hardware Accelerator Integration: Dedicated RISC-V and ARM cryptographic instruction sets for vector lattice math.'
      ],
      criticalAnalysis: [
        'Lattice algorithms consume substantially higher RAM buffers during NTT butterfly operations.',
        'Fault injection attacks: Single-bit glitches during Gaussian/rejection sampling can leak private key coefficients.',
        'Legacy network hardware (firewalls, embedded microcontrollers) fail to handle MTU packet sizes exceeding 1.5 KB.'
      ],
      modelQuestion: 'Explain how the Learning With Errors (LWE) problem provides quantum resistance. Analyze the mathematical mechanics of polynomial multiplication using the Number Theoretic Transform (NTT) in ML-KEM.'
    },
    pyq: {
      question: 'Prove that the decision Learning With Errors (LWE) problem reduces to the worst-case Shortest Independent Vectors Problem (SIVP) on ideal lattices.',
      year: 'Eurocrypt 2024',
      paper: 'Theoretical Cryptography',
      type: 'Paper',
    },
    keyTerms: [
      { term: 'Lattice Cryptography', definition: 'Cryptographic constructions whose security rests on the computational hardness of geometric vector lattice problems.' },
      { term: 'ML-KEM', definition: 'Module-Lattice Key Encapsulation Mechanism, standardized in NIST FIPS 203 for quantum-safe key exchange.' },
      { term: 'Number Theoretic Transform (NTT)', definition: 'An exact FFT algorithm defined over finite fields used for sub-quadratic polynomial multiplication in lattice crypto.' }
    ],
    likesCount: 265,
    bookmarksCount: 198,
  }
];

export const MOCK_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    articleId: '1',
    subject: 'Quantum & Physics',
    paper: 'Research Paper',
    prompt: 'In fault-tolerant quantum computing with 2D surface codes, consider the following statements:\n1. The Eastin-Knill theorem proves that no quantum error-correcting code can implement a universal set of quantum gates using only transversal operations.\n2. In a surface code of distance d, the number of physical data qubits required scales quadratically with d.\n3. The fault-tolerance threshold for surface codes is strictly independent of the physical error rate of two-qubit entangling gates.\nWhich of the statements given above are correct?',
    options: [
      { id: 'opt_1', optionIndex: 0, text: '1 and 2 only', isCorrect: true },
      { id: 'opt_2', optionIndex: 1, text: '2 and 3 only', isCorrect: false },
      { id: 'opt_3', optionIndex: 2, text: '1 and 3 only', isCorrect: false },
      { id: 'opt_4', optionIndex: 3, text: '1, 2, and 3', isCorrect: false },
    ],
    explanation: 'Statements 1 and 2 are correct:\n- Statement 1 is correct: The Eastin-Knill theorem dictates that non-Clifford gates (like the T-gate) cannot be executed transversally without violating code properties, necessitating magic state distillation.\n- Statement 2 is correct: A planar surface code of distance d requires d^2 data qubits and d^2 - 1 syndrome ancilla qubits (scaling quadratically as O(d^2)).\n- Statement 3 is incorrect: The threshold (typically ~0.7% to 1%) is heavily dependent on the fidelity of two-qubit entangling gates (e.g. CZ or CNOT).',
    syllabusReference: 'Quantum Information: Fault-Tolerant Stabilizer Codes & Eastin-Knill Constraints',
    difficulty: 'Advanced'
  },
  {
    id: 'q2',
    articleId: '2',
    subject: 'AI & Machine Learning',
    paper: 'System Architecture',
    prompt: 'Regarding Mixture-of-Depths (MoD) and FlashAttention-3 in modern LLM systems, which of the following statements is FALSE?',
    options: [
      { id: 'opt_1', optionIndex: 0, text: 'Mixture-of-Depths routes a statically defined capacity (e.g. top-k) of tokens through transformer blocks while others bypass via residual connection.', isCorrect: false },
      { id: 'opt_2', optionIndex: 1, text: 'FlashAttention-3 achieves speedups by quantizing all key-value matrices to 1-bit binary weights during the forward pass.', isCorrect: true },
      { id: 'opt_3', optionIndex: 2, text: 'FlashAttention-3 exploits asynchronous tensor memory accelerators (TMA) and warp-specialization to overlap memory copies with tensor core compute.', isCorrect: false },
      { id: 'opt_4', optionIndex: 3, text: 'Grouped-Query Attention (GQA) reduces memory footprint by sharing Key and Value heads across multiple Query heads.', isCorrect: false },
    ],
    explanation: 'Option B is FALSE (and therefore the correct answer): FlashAttention-3 is an exact, uncompressed attention algorithm that tiles matrix blocks to fit inside on-chip SRAM—it does NOT quantize weights to 1-bit binary. (Options A, C, and D accurately describe MoD, hardware acceleration, and GQA).',
    syllabusReference: 'Neural Systems Architecture: FlashAttention-3 & Dynamic Routing Mechanics',
    difficulty: 'Intermediate'
  },
  {
    id: 'q3',
    articleId: '3',
    subject: 'Semiconductors & Hardware',
    paper: 'Hardware Spec',
    prompt: 'In sub-2nm semiconductor manufacturing, what optical constraint necessitated the adoption of 4x / 8x anamorphic magnification in ASML’s 0.55 High-NA EUV scanners?',
    options: [
      { id: 'opt_1', optionIndex: 0, text: 'The finite wavelength shift from 13.5nm to 6.7nm soft X-rays in synchrotron sources.', isCorrect: false },
      { id: 'opt_2', optionIndex: 1, text: 'Incident light angles exceeding the critical reflection angle of multilayer Mo/Si Bragg photomasks, causing severe shadowing.', isCorrect: true },
      { id: 'opt_3', optionIndex: 2, text: 'The requirement to align gate-all-around nanosheets with horizontal silicon lattice planes.', isCorrect: false },
      { id: 'opt_4', optionIndex: 3, text: 'Resist outgassing under ultra-high vacuum requiring split wafer exposure passes.', isCorrect: false },
    ],
    explanation: 'Option B is correct: Increasing the lens NA to 0.55 doubles the chief ray angle at the reticle. Without anamorphic optics (8x in the cross-scan direction), light strikes the reflective Molybdenum/Silicon (Mo/Si) mask absorber at extreme angles, casting severe shadowing that distorts printed feature critical dimensions.',
    syllabusReference: 'VLSI Fabrication: Rayleigh Resolution Limits & High-NA EUV Optics',
    difficulty: 'Advanced'
  },
  {
    id: 'q4',
    articleId: '4',
    subject: 'Biotech & Genomics',
    paper: 'Research Paper',
    prompt: 'Consider the catalytic mechanism of Type VI CRISPR-Cas13 systems:\n1. Unlike Cas9, Cas13 contains twin HEPN domains that cleave single-stranded RNA rather than DNA.\n2. In wild-type Cas13, on-target crRNA-mRNA binding triggers non-specific "collateral cleavage" of adjacent bystander RNAs.\n3. Cas13 requires a G-rich Protospacer Adjacent Motif (PAM) in the chromosomal DNA to initiate binding.\nWhich of the statements given above are correct?',
    options: [
      { id: 'opt_1', optionIndex: 0, text: '1 and 2 only', isCorrect: true },
      { id: 'opt_2', optionIndex: 1, text: '2 and 3 only', isCorrect: false },
      { id: 'opt_3', optionIndex: 2, text: '1 and 3 only', isCorrect: false },
      { id: 'opt_4', optionIndex: 3, text: '1, 2, and 3', isCorrect: false },
    ],
    explanation: 'Statements 1 and 2 are correct: Cas13 contains dual HEPN RNase domains and exhibits collateral non-specific bystander RNA destruction. Statement 3 is incorrect: Cas13 targets single-stranded RNA directly and does NOT require a double-stranded DNA PAM sequence (it only requires a protospacer flanking site or PFS in certain bacterial orthologs, never a DNA PAM).',
    syllabusReference: 'Molecular Genetics: Type VI CRISPR-Cas13 Kinetics & Transcriptome Editing',
    difficulty: 'Intermediate'
  },
  {
    id: 'q5',
    articleId: '5',
    subject: 'Clean Energy & Fusion',
    paper: 'Deep Tech',
    prompt: 'Why do Rare-Earth Barium Copper Oxide (REBCO) high-temperature superconductors enable a radical reduction in tokamak reactor volume for net energy gain (Q > 10)?',
    options: [
      { id: 'opt_1', optionIndex: 0, text: 'They eliminate the need for tritium fuel, enabling pure proton-boron aneutronic fusion at 1 Tesla.', isCorrect: false },
      { id: 'opt_2', optionIndex: 1, text: 'They maintain high critical current at magnetic fields exceeding 20 Tesla, exploiting the Pfusion ∝ B^4 scaling law to contract required plasma volume V ∝ B^(-6).', isCorrect: true },
      { id: 'opt_3', optionIndex: 2, text: 'They completely absorb 14.1 MeV fast neutrons without suffering structural displacement per atom (dpa) damage.', isCorrect: false },
      { id: 'opt_4', optionIndex: 3, text: 'They operate as room-temperature superconductors at 300 Kelvin without cryogenic refrigeration.', isCorrect: false },
    ],
    explanation: 'Option B is correct: Fusion power density scales as the 4th power of the toroidal magnetic field (P_fusion ∝ B^4), while required volume for a target Q scales inversely as B^6. Operating at 20 Tesla instead of ITER’s ~12 Tesla shrinks required plasma volume by over 40x.',
    syllabusReference: 'Nuclear Fusion Engineering: B^4 Scaling Law & HTS Magnet Mechanics',
    difficulty: 'Advanced'
  }
];

export const MOCK_RETENTION_CARDS: UserRetentionCard[] = [
  {
    id: 'ret_card_01',
    topicName: 'Surface Code Distance & Eastin-Knill Theorem',
    subject: 'Quantum & Physics',
    articleId: '1',
    articleTitle: 'Fault-Tolerant Quantum Computing: Logical Qubits vs. Physical Error Thresholds',
    question: MOCK_QUIZ_QUESTIONS[0],
    mistakeCount: 1,
    intervalDays: 1,
    easeFactor: 2.1,
    lastResult: 'incorrect',
    nextReviewAt: new Date().toISOString(),
    dueToday: true,
  },
  {
    id: 'ret_card_02',
    topicName: 'High-NA EUV Anamorphic Optics & Rayleigh Criterion',
    subject: 'Semiconductors & Hardware',
    articleId: '3',
    articleTitle: 'High-NA EUV Lithography: GAA Nanosheets and Backside Power Delivery at 1nm',
    question: MOCK_QUIZ_QUESTIONS[2],
    mistakeCount: 2,
    intervalDays: 2,
    easeFactor: 2.3,
    lastResult: 'incorrect',
    nextReviewAt: new Date().toISOString(),
    dueToday: true,
  },
  {
    id: 'ret_card_03',
    topicName: 'REBCO Superconductor B^4 Fusion Power Scaling',
    subject: 'Clean Energy & Fusion',
    articleId: '5',
    articleTitle: 'Compact High-Field Tokamaks: REBCO Superconductors and The Path to Net Fusion Q > 10',
    question: MOCK_QUIZ_QUESTIONS[4],
    mistakeCount: 0,
    intervalDays: 5,
    easeFactor: 2.6,
    lastResult: 'correct',
    nextReviewAt: new Date(Date.now() + 86400000 * 3).toISOString(),
    dueToday: false,
  }
];
