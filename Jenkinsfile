pipeline {
    agent any

    environment {
        IMAGE_NAME = "express-app"
        TAG = "v${BUILD_NUMBER}"
        DOCKER_REPO = "omwarkri123"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/omwarkri/express-app.git'
            }
        }

        stage('Docker Build') {
            steps {
                sh '''
                    docker build -t $DOCKER_REPO/$IMAGE_NAME:$TAG .
                '''
            }
        }

        stage('Docker Login & Push') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'docker-hub-cred',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {
                    sh '''
                        echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push $DOCKER_REPO/$IMAGE_NAME:$TAG
                    '''
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                    kubectl get nodes

                    kubectl set image deployment/express-deployment \
                    express-container=$DOCKER_REPO/$IMAGE_NAME:$TAG

                    kubectl rollout status deployment/express-deployment
                '''
            }
        }
    }

    post {
        success {
            echo "✅ CI/CD Pipeline completed successfully"
        }
        failure {
            echo "❌ Pipeline failed"
        }
    }
}
