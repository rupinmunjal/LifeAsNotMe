# Output Variables
output "gcs_bucket_name" {
  value = module.gcp.gcs_bucket_name
}

output "gke_cluster_endpoint" {
  value = module.gcp.gke_cluster_endpoint
}

output "frontend_url" {
  value = module.azure.frontend_url
}
