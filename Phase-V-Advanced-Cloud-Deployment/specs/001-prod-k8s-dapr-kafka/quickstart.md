# Quickstart Guide: Production-Grade Kubernetes Deployment with Dapr & Kafka

**Branch**: `001-prod-k8s-dapr-kafka` | **Date**: 2026-02-09 | **Plan**: [specs/001-prod-k8s-dapr-kafka/plan.md](specs/001-prod-k8s-dapr-kafka/plan.md)
**Spec**: [specs/001-prod-k8s-dapr-kafka/spec.md](specs/001-prod-k8s-dapr-kafka/spec.md)

This guide provides instructions to quickly deploy the Todo application to a local Minikube Kubernetes cluster, integrated with Dapr and Kafka.

## Prerequisites

Before you begin, ensure you have the following installed:

1.  **Minikube**: A tool for running a single-node Kubernetes cluster locally.
    *   [Install Minikube](https://minikube.sigs.k8s.io/docs/start/)
2.  **Kubectl**: The Kubernetes command-line tool.
    *   [Install Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
3.  **Helm**: The package manager for Kubernetes.
    *   [Install Helm](https://helm.sh/docs/intro/install/)
4.  **Dapr CLI**: The command-line interface for Dapr.
    *   [Install Dapr CLI](https://docs.dapr.io/getting-started/install-dapr-cli/)
5.  **Docker Desktop** (or equivalent containerization tool).

## Setup Steps

### 1. Start Minikube

Ensure Minikube is running and configured to use Docker as the driver (recommended).

```bash
minikube start --driver=docker
minikube addons enable ingress # Enable ingress for easy access
```

Verify Minikube status and Kubectl context:

```bash
minikube status
kubectl config use-context minikube
```

### 2. Initialize Dapr on Minikube

Install the Dapr control plane on your Minikube cluster.

```bash
dapr init -k
```

Verify Dapr installation:

```bash
dapr status -k
kubectl get pods -n dapr-system
```

### 3. Deploy Kafka (using Strimzi Operator)

We will use the Strimzi Kubernetes operator to deploy Kafka.

#### a. Install Strimzi Operator

```bash
helm repo add strimzi https://strimzi.io/charts/
helm install strimzi strimzi/strimzi-kafka-operator --namespace kafka --create-namespace --version 0.38.0 # Use the latest stable version
```

Wait for the operator to be ready:

```bash
kubectl wait kafka strimzi-kafka-cluster --for=condition=Ready --timeout=300s -n kafka
```

#### b. Deploy a Kafka Cluster

Create a Kafka cluster using the Strimzi operator.

```bash
kubectl apply -f - <<EOF
apiVersion: kafka.strimzi.io/v1beta2
kind: Kafka
metadata:
  name: strimzi-kafka-cluster
  namespace: kafka
spec:
  kafka:
    version: 3.6.0 # Match latest Dapr supported version or a stable one
    replicas: 1
    listeners:
      - name: plain
        port: 9092
        type: internal
        tls: false
      - name: external
        port: 9094
        type: nodeport
        tls: false
    config:
      offsets.topic.replication.factor: 1
      transaction.state.log.replication.factor: 1
      transaction.state.log.min.isr: 1
      log.message.format.version: "3.0"
      inter.broker.protocol.version: "3.0"
    storage:
      type: ephemeral
  zookeeper:
    replicas: 1
    storage:
      type: ephemeral
  entityOperator:
    topicOperator: {}
    userOperator: {}
EOF
```

Wait for Kafka cluster to be ready:

```bash
kubectl wait kafka strimzi-kafka-cluster --for=condition=Ready --timeout=600s -n kafka
```

#### c. Create Kafka Topics

Create the necessary Kafka topics (`task-events`, `reminders`, `task-updates`).

```bash
kubectl apply -f - <<EOF
apiVersion: kafka.strimzi.io/v1beta2
kind: KafkaTopic
metadata:
  name: task-events
  labels:
    strimzi.io/cluster: strimzi-kafka-cluster
  namespace: kafka
spec:
  partitions: 1
  replicas: 1
  config:
    retention.ms: 604800000 # 7 days
---
apiVersion: kafka.strimzi.io/v1beta2
kind: KafkaTopic
metadata:
  name: reminders
  labels:
    strimzi.io/cluster: strimzi-kafka-cluster
  namespace: kafka
spec:
  partitions: 1
  replicas: 1
  config:
    retention.ms: 604800000 # 7 days
---
apiVersion: kafka.strimzi.io/v1beta2
kind: KafkaTopic
metadata:
  name: task-updates
  labels:
    strimzi.io/cluster: strimzi-kafka-cluster
  namespace: kafka
spec:
  partitions: 1
  replicas: 1
  config:
    retention.ms: 604800000 # 7 days
EOF
```

### 4. Deploy Dapr Components

Deploy the Dapr components (Pub/Sub, State Store, Bindings, Secret Store) to the Minikube cluster.

```bash
kubectl apply -f k8s/dapr-components/task-pubsub.yaml -n default # Assuming default namespace for app
kubectl apply -f k8s/dapr-components/todo-state-store.yaml -n default
kubectl apply -f k8s/dapr-components/daily-task-cron.yaml -n default
kubectl apply -f k8s/dapr-components/kubernetes-secret-store.yaml -n default
```

*(Note: These files need to be created in the `k8s/dapr-components/` directory as part of the implementation.)*

### 5. Build and Deploy Todo Application

Build your application Docker images and deploy them using Helm.

```bash
# Example: Navigate to backend/ and frontend/ to build images
# docker build -t todo-backend:latest .
# docker build -t todo-frontend:latest .

# Update your Helm chart values with correct image names/tags

# Install/Upgrade the Todo application Helm chart
helm upgrade --install todo-app k8s/base/todo-app --namespace default --create-namespace
```

*(Note: The actual Helm chart `k8s/base/todo-app` needs to be developed. This step assumes its existence.)*

### 6. Verify Deployment

Check the status of your deployed services and Dapr sidecars.

```bash
kubectl get pods -n default
kubectl get svc -n default
dapr list
```

Access the frontend application via Ingress.

```bash
minikube service list # Find the ingress URL for the frontend
```

Now you should be able to interact with your Todo application, which is running on Kubernetes with Dapr and Kafka integration.
