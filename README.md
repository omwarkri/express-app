# Express Portfolio - CI/CD Demo

This repo contains a minimal Express portfolio app and CI/CD setup for Jenkins + Docker + Kubernetes.

### What is included

- Simple Express server that serves static `public/index.html`
- `Dockerfile` to containerize app
- `Jenkinsfile` to build, push, and deploy
- `k8s/` manifests for Deployment + Service

### Replace placeholders

- Replace `YOUR_DOCKERHUB_USER` in `Jenkinsfile` and `k8s/deployment.yaml` with your Docker Hub username/repo.
- Add Jenkins credentials:
- `dockerhub-creds` (Username/Password)
- `KUBECONFIG` (Secret text containing kubeconfig file contents)

### Quick local steps

1. `npm install`
2. `npm start` (runs on port 3000)
3. `docker build -t YOUR_DOCKERHUB_USER/portfolio-app:local .`
4. `docker run -p 3000:3000 YOUR_DOCKERHUB_USER/portfolio-app:local`

### Notes

- The Jenkins pipeline assumes a Linux agent with Docker and kubectl installed.
- For testing Kubernetes locally you can use `minikube` or `kind`.
- this is new line i added 
