# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


## CI/CD Pipeline Design

- **CI repo (`air-max-270-landing`)**
  - Build React app → NGINX container.
  - Auth via **GitHub OIDC** into AWS → push to `air-max-270/landing-dev` in ECR.
  - Tags: `latest` (dev), `staging` (staging).
- **CD (Argo CD)**
  - App-of-Apps boots the platform (ALB Controller, Loki stack, apps).
  - Auto-sync with prune + self-heal ensures declarative drift correction.
  - **Multi-env** via overlays:
    - `dev`: `latest`, namePrefix `dev-`, dedicated Ingress rule.
    - `staging`: `staging`, namePrefix `stg-`, dedicated Ingress rule (shared ALB).
- **Reliability/Scalability**
  - HPA on app (CPU 60%, min 2, max 5).
  - **Roadmap:** cluster autoscaler, multi-node groups, PDBs, pod topology spread, canary/blue-green via Argo Rollouts.

## Future Improvements & Hardening

- **Networking:** multi-AZ NAT; internal ALBs for private services; AWS WAF on ALB; TLS via ACM with auto-renew.
- **IAM:** move ALB Controller to **IRSA**; granular IAM policies per SA.
- **Storage:** enable **EBS CSI**; persistent Loki with retention tuned by environment.
- **Policy:** OPA/Gatekeeper or Kyverno for guardrails (namespace quotas, allowed registries).
- **State/Secrets:** S3 + DynamoDB Terraform backend; external-secrets for K8s.
- **Observability:** Prometheus + Alertmanager; SLOs; log retention & cost controls; dashboards as code.

## Verification (Smoke Tests)

- **Cluster health:** `kubectl get nodes -o wide` (Ready).  
- **App:** `kubectl -n app get ingress dev-react-app` → open ALB DNS (200 OK).  
- **Logging:** Grafana → Explore (Loki) → `{namespace="app", pod=~"dev-react-app-.*"}` returns NGINX access logs.

This solution balances **time-to-deliver** and **production-grade patterns**. The report lists targeted next steps to harden the stack while keeping GitOps-driven, repeatable workflows.