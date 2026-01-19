output "service_name" {
  value = kubernetes_service.express_service.metadata[0].name
}

output "node_port" {
  value = kubernetes_service.express_service.spec[0].port[0].node_port
}

output "access_url" {
  value = "http://192.168.49.2:${kubernetes_service.express_service.spec[0].port[0].node_port}"
}
