import { debug, warning } from '@actions/core';
import fetchManifest from './fetchManifest';

const release = async (packageReleaseToken: string, manifestUrl: string, dryRun?: boolean) => {
  const { id, version, manifest: canonicalManifestUrl, changelog, compatibility } = await fetchManifest(manifestUrl);

  if (manifestUrl !== canonicalManifestUrl) {
    warning(
      `The provided manifest-url did not match the manifest path in the fetched manifest. Using the path defined in the package json: ${canonicalManifestUrl}`,
    );
  }

  const releaseBody = {
    id,
    'dry-run': dryRun ? true : undefined,
    release: {
      version,
      manifest: canonicalManifestUrl,
      notes: changelog,
      compatibility,
    },
  };

  debug(`Package Release API payload\n${JSON.stringify(releaseBody)}`);

  const response = await fetch('https://api.foundryvtt.com/_api/packages/release_version/', {
    headers: {
      'content-type': 'application/json',
      authorization: packageReleaseToken,
    },
    method: 'POST',
    body: JSON.stringify(releaseBody),
  });

  const responseText = await response.text();

  debug(`Release Package API response: ${responseText}`);

  return responseText;
};

export default release;
