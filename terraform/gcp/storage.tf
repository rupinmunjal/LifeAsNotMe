# Google Cloud Storage for Videos
resource "google_storage_bucket" "video_bucket" {
  name                        = "uofthacks12-lifeasnotme-videos"
  location                    = var.gcp_region
  force_destroy               = true
  uniform_bucket_level_access = true

  lifecycle_rule {
    action {
      type = "Delete"
    }
    condition {
      age = 30
    }
  }
}

output "gcs_bucket_name" {
  value = google_storage_bucket.video_bucket.name
}
