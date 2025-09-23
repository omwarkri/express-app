pipeline {
    agent any

    environment {
        DOCKER_USER = '<docker_user>'
        DOCKER_PASSWORD = '<docker_password>'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/<your_repo>.git'
            }
        }

        stage('Docker Build & Push') {
            steps {
                sh """
                echo $DOCKER_PASSWORD | docker login -u $DOCKER_USER --password-stdin
                docker build -t $DOCKER_USER/express-app:latest .
                docker push $DOCKER_USER/express-app:latest
                """
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh """
                # Make sure kubectl points to Minikube cluster
                kubectl config use-context minikube

                # Apply manifests
                kubectl apply -f k8s/express-deployment.yaml
                kubectl apply -f k8s/service.yaml

                # Rollout status
                kubectl rollout status deployment/express-deployment

                # Check pods & services
                kubectl get pods
                kubectl get svc
                """
            }
        }
    }
}
