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

        stage('Configure Kubeconfig') {
            steps {
                sh '''
                    mkdir -p $HOME/.kube
                    minikube update-context
                    kubectl config current-context
                    kubectl get nodes
                '''
            }
        }

        stage('Terraform Init') {
            steps {
                dir('terraform') {
                    sh 'terraform init'
                }
            }
        }

        stage('Terraform Plan') {
            steps {
                dir('terraform') {
                    sh 'terraform plan'
                }
            }
        }

        stage('Terraform Apply') {
            steps {
                dir('terraform') {
                    sh 'terraform apply -auto-approve'
                }
            }
        }

        stage('Docker Build') {
            steps {
                sh '''
                    docker build -t $DOCKER_REPO/$IMAGE_NAME:$TAG .
                    docker tag $DOCKER_REPO/$IMAGE_NAME:$TAG $DOCKER_REPO/$IMAGE_NAME:latest
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
                        docker push $DOCKER_REPO/$IMAGE_NAME:latest
                        docker logout
                    '''
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                    kubectl set image deployment/express-deployment \
                    express-container=$DOCKER_REPO/$IMAGE_NAME:$TAG

                    kubectl rollout status deployment/express-deployment
                '''
            }
        }
    }

    post {
        success {
            echo "✅ Full CI/CD + Terraform automation completed successfully"
        }
        failure {
            echo "❌ Pipeline failed"
        }
    }
}
