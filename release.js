const release = async (packageReleaseToken, manifestUrl, dryRun) => {
  console.log('Fetching manifest from:', manifestUrl);

  const manifestResponse = await fetch(manifestUrl);
  const manifest = await manifestResponse.json();

  console.log('Parsed manifest:', manifest);

  const {
    id,
    version,
    manifest: canonicalManifestUrl,
    changelog,
    compatibility,
  } = manifest;

  if(manifestUrl !== canonicalManifestUrl) {
    console.warn('The provided manifest-url did not match the manifest path in the fetched manifest. Using the path defined in the package json:', canonicalManifestUrl);
  }

  const releaseBody = {
    id,
    "dry-run": dryRun ? true : undefined,
    release: {
      version,
      manifest: canonicalManifestUrl,
      notes: changelog,
      compatibility,
    },
  };

  console.log('Package Release API payload:', releaseBody);

  const response = await fetch("https://api.foundryvtt.com/_api/packages/release_version/", {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': packageReleaseToken,
    },
    method: "POST",
    body: JSON.stringify(releaseBody),
  });

  const responseText = await response.text();

  console.log('Release Package API response:', responseText);

  return responseText;
}

export default release
