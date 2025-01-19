# Google Kubernetes Engine (GKE) for Backend
resource "google_container_cluster" "gke_cluster" {
  name     = "lifeasnotme-backend"
  location = var.gcp_region
  initial_node_count = 2

  node_config {
    machine_type = "e2-medium"
    oauth_scopes = [
      "https://www.googleapis.com/auth/cloud-platform"
    ]
  }
}

# GKE Node Pool
resource "google_container_node_pool" "gke_node_pool" {
  name       = "backend-node-pool"
  location   = var.gcp_region
  cluster    = google_container_cluster.gke_cluster.name
  node_count = 3

  node_config {
    machine_type = "e2-standard-4"
    preemptible  = true
  }
}

output "gke_cluster_endpoint" {
  value = google_container_cluster.gke_cluster.endpoint
}
