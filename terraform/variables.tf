# Input Variables
variable "gcp_project_id" {
  description = "Google Cloud Project ID"
  type        = string
  default     = "hackathons-31265"
}

variable "gcp_region" {
  description = "Google Cloud Region"
  type        = string
  default     = "northamerica-northeast2" 
}

variable "azure_location" {
  description = "Azure Region"
  type        = string
  default     = "Canada Central"
}
