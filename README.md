# FoundryVTT-package-release-action

| [![Illandril](https://avatars.githubusercontent.com/illandril?size=64)](https://github.com/illandril) | [![Author](https://img.shields.io/badge/Joe%20Spandrusyszyn-Illandril?style=flat&labelColor=520&color=250&label=Illandril)](https://github.com/illandril) [![License](https://img.shields.io/github/license/illandril/FoundryVTT-package-release-action?style=flat&labelColor=520&color=250&label=license)](https://github.com/illandril/FoundryVTT-package-release-action/blob/main/LICENSE) <br> [![Version](https://img.shields.io/github/v/release/illandril/FoundryVTT-package-release-action?style=flat&labelColor=520&color=250&label=version)](https://github.com/marketplace/actions/release-foundryvtt-package) [![Open Issues](https://img.shields.io/github/issues/illandril/FoundryVTT-package-release-action?style=flat&labelColor=520&color=250&logo=github&label=issues)](https://github.com/illandril/FoundryVTT-package-release-action/issues) |
| --- | :--- |

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
