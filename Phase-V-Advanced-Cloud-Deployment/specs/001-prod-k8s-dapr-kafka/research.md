# Research Findings: Production-Grade Kubernetes Deployment with Dapr & Kafka

**Branch**: `001-prod-k8s-dapr-kafka` | **Date**: 2026-02-09 | **Plan**: [specs/001-prod-k8s-dapr-kafka/plan.md](specs/001-prod-k8s-dapr-kafka/plan.md)

## Resolved Clarifications

### Python and Node.js/TypeScript Version Selection

**Decision**:
-   **Python Version**: Python 3.11
-   **Node.js/TypeScript Version**: Node.js 18.x LTS

**Rationale**:
-   **Python 3.11**: Offers significant performance improvements over previous versions and is a widely adopted, stable release suitable for production environments. It provides a good balance of features and maturity for the FastAPI backend.
-   **Node.js 18.x LTS**: As an LTS (Long Term Support) release, Node.js 18.x ensures stability, ongoing maintenance, and broad community support, making it an excellent choice for the Next.js frontend. It aligns with best practices for production deployments.

**Alternatives Considered**:
-   **Python 3.10**: Still widely used but 3.11 offers better performance.
-   **Python 3.12**: Newer, but might have less ecosystem maturity or immediate library support compared to 3.11 in some contexts.
-   **Node.js 20.x LTS**: Newer LTS, but 18.x is well-established and perfectly adequate for the current needs.

## Other Research Tasks (Future/Ongoing)

-   **Kafka Deployment Choice**: Research between Redpanda Cloud and self-hosted Strimzi. Evaluate based on cost, operational overhead, and scalability requirements.
-   **Dapr Component Configurations**: Investigate best practices for Dapr Pub/Sub, State, Bindings, and Secrets configurations across different environments (local vs. cloud).
-   **Cloud Provider Selection**: Detailed comparison of GKE, AKS, and Oracle OKE based on cost, feature set, Dapr integration, and existing organizational preferences.
-   **Monitoring Stack Composition**: Research best practices for integrating Prometheus and Grafana within Kubernetes, including exporters and dashboards for Dapr and Kafka.
-   **CI/CD Strategy**: Define detailed GitHub Actions workflows for building, testing, and deploying to Kubernetes, ensuring security and efficiency.