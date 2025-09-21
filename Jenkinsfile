pipeline {
  agent any
  environment {
    IMAGE = "YOUR_DOCKERHUB_USER/express-app:${env.BUILD_NUMBER}"
  }
  stages {
    stage('Checkout') {
      steps { checkout scm }
    }
    stage('Install') {
      steps { sh 'npm ci' }
    }
    stage('Build Docker Image') {
      steps {
        script {
          docker.build(env.IMAGE)
        }
      }
    }
    stage('Push to Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh '''
            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
            docker push ${IMAGE}
          '''
        }
      }
    }
    stage('Deploy to Kubernetes') {
      steps {
        withCredentials([string(credentialsId: 'KUBECONFIG', variable: 'KUBECONFIG_CONTENT')]) {
          sh '''
            mkdir -p $HOME/.kube
            echo "$KUBECONFIG_CONTENT" > $HOME/.kube/config
            kubectl set image deployment/express-deployment express=${IMAGE} --record || kubectl apply -f k8s/deployment.yaml
          '''
        }
      }
    }
  }
}
