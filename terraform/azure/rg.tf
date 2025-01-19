# Azure Resource Group
resource "azurerm_resource_group" "rg" {
  name     = "lifeasnotme-frontend-rg"
  location = var.azure_location
}
