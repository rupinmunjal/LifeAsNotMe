# Include GCP and Azure modules
module "gcp" {
  source = "./gcp"
}

module "azure" {
  source = "./azure"
}

# Define Providers
provider "google" {
  project = var.gcp_project_id
  region  = var.gcp_region
}

provider "azurerm" {
  features {}
}
