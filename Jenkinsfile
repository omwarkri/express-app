pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/omwarkri/express-app.git'
            }
        }

        stage('Docker Build & Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-cred', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh """
                    echo $DOCKER_PASSWORD | docker login -u $DOCKER_USER --password-stdin
                    docker build -t $DOCKER_USER/express-app:latest .
                    docker push $DOCKER_USER/express-app:latest
                    """
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh """
                # Make sure kubectl uses local Minikube
                kubectl config use-context minikube

                # Apply manifests
                kubectl apply -f k8s/express-deployment.yaml
                kubectl apply -f k8s/service.yaml

                # Check rollout
                kubectl rollout status deployment/express-deployment

                # Verify pods & services
                kubectl get pods
                kubectl get svc
                """
            }
        }
    }
}
