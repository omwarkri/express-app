terraform {
  required_version = ">= 1.3.0"

  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.25"
    }
  }
}

provider "kubernetes" {
  config_path = "~/.kube/config"
}

resource "kubernetes_deployment" "express_app" {
  metadata {
    name = "express-app"
    labels = {
      app = "express-app"
    }
  }

  spec {
    replicas = 2

    selector {
      match_labels = {
        app = "express-app"
      }
    }

    template {
      metadata {
        labels = {
          app = "express-app"
        }
      }

      spec {
        container {
          name  = "express-app"
          image = "omwarkri123/express-app:v1"

          port {
            container_port = 3000
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "express_service" {
  metadata {
    name = "express-service"
  }

  spec {
    selector = {
      app = kubernetes_deployment.express_app.metadata[0].labels.app
    }

    port {
      port        = 3000
      target_port = 3000
      node_port   = 30007
    }

    type = "NodePort"
  }
}
