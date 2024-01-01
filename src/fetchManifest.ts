import { debug } from '@actions/core';

const fetchManifest = async (manifestUrl: string) => {
  debug(`Fetching manifest from: ${manifestUrl}`);

  const manifestResponse = await fetch(manifestUrl);

  const manifest = await manifestResponse.json() as {
    id?: string
    version?: string
    manifest?: string
    changelog?: string
    compatibility?: object
  };

  debug(JSON.stringify(manifest));

  return manifest;
};

export default fetchManifest;
