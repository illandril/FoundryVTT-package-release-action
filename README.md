# FoundryVTT-package-release-action

This action pushes a new FoundryVTT package release via the [Package Release API](https://foundryvtt.com/article/package-release-api/)

## Inputs

### `package-release-token`

**Required** The secret API token for the package

### `manifest-url`

**Required** The URL to the manfiest file for the version you are releasing

### `dry-run`

The URL to the manfiest file for the version you are releasing

## Outputs

### `response`

The response received from the API.

## Example usage

```yaml
uses: illandril/FoundryVTT-package-release-action@latest
with:
  package-release-token: ${{ secrets.PACKAGE_RELEASE_TOKEN }}
  manifest-url: 'https://github.com/you/your-package/releases/download/v1.2.3/module.json'
```
