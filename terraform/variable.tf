variable "replicas" {
    description = "Number of the replicas for the Express-app "
    type       = number
    default    = 3

}

 variable "image" {
    description = "Docker image for the Express-app"
    type      = string
    default    = "omwarkri/express-app:v1"
 }

variable "container_port" {
    description = "Port on which the Express-app container listens"
    type        = number
    default     = 3000
}