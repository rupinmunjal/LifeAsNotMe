# Azure Storage Account for Frontend Hosting
resource "azurerm_storage_account" "frontend_storage" {
  name                     = "lifeasnotmefrontend"
  resource_group_name      = azurerm_resource_group.rg.name
  location                 = azurerm_resource_group.rg.location
  account_tier             = "Standard"
  account_replication_type = "LRS"

  static_website {
    index_document    = "index.html"
    error_404_document = "404.html"
  }
}

# Azure Blob Container for Frontend Files
resource "azurerm_storage_container" "frontend_container" {
  name                  = "frontend"
  storage_account_name  = azurerm_storage_account.frontend_storage.name
  container_access_type = "blob"
}

output "frontend_url" {
  value = azurerm_storage_account.frontend_storage.primary_web_endpoint
}
