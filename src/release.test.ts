import { warning } from '@actions/core';
import fetchManifest from './fetchManifest';
import release from './release';
import { illandrilThirdPact } from './testData/manifests';

jest.mock('@actions/core', () => ({
  debug: jest.fn(),
  warning: jest.fn(),
}));

jest.mock('./fetchManifest', () => ({
  __esModule: true,
  default: jest.fn(() => Promise.resolve(JSON.parse(JSON.stringify(illandrilThirdPact)))),
}));

// @ts-expect-error Partial mock
const fetch = jest.spyOn(globalThis, 'fetch').mockImplementation((url) =>
  Promise.resolve({
    text: () => Promise.resolve(`Mock Response for ${url}`),
  }),
);

it('should warn if provided url does not match manifest url', async () => {
  await release('mock-package-release-token', 'https://www.example.com', false);

  expect(warning).toHaveBeenCalledTimes(1);
  expect(warning).toHaveBeenCalledWith(
    'The provided manifest-url did not match the manifest path in the fetched manifest. Using the path defined in the package json: https://github.com/illandril/FoundryVTT-third-pact/releases/latest/download/module.json',
  );
  expect(fetchManifest).toHaveBeenCalledTimes(1);
  expect(fetchManifest).toHaveBeenCalledWith('https://www.example.com');
});

it('should not warn if provided url matches manifest url', async () => {
  await release(
    'mock-package-release-token',
    'https://github.com/illandril/FoundryVTT-third-pact/releases/latest/download/module.json',
    false,
  );

  expect(warning).not.toHaveBeenCalled();
  expect(fetchManifest).toHaveBeenCalledTimes(1);
  expect(fetchManifest).toHaveBeenCalledWith(
    'https://github.com/illandril/FoundryVTT-third-pact/releases/latest/download/module.json',
  );
});

it.each(['mock-package-release-token', 'abc123'])('should send a fetch with the provided token (%j)', async (token) => {
  await release(
    token,
    'https://github.com/illandril/FoundryVTT-third-pact/releases/latest/download/module.json',
    false,
  );
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(
    'https://api.foundryvtt.com/_api/packages/release_version/',
    expect.objectContaining({
      headers: {
        'content-type': 'application/json',
        authorization: token,
      },
    }),
  );
});

it('should send the expected payload (non-dry-run)', async () => {
  const response = await release(
    'mock-package-release-token',
    'https://github.com/illandril/FoundryVTT-third-pact/releases/latest/download/module.json',
    false,
  );

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith('https://api.foundryvtt.com/_api/packages/release_version/', {
    headers: {
      'content-type': 'application/json',
      authorization: 'mock-package-release-token',
    },
    method: 'POST',
    body: JSON.stringify({
      id: 'illandril-third-pact',
      release: {
        version: '2.1.1',
        manifest: 'https://github.com/illandril/FoundryVTT-third-pact/releases/latest/download/module.json',
        notes: 'https://github.com/illandril/FoundryVTT-third-pact/releases',
        compatibility: { minimum: 10, verified: 11 },
      },
    }),
  });

  expect(response).toBe('Mock Response for https://api.foundryvtt.com/_api/packages/release_version/');
});

it('should send the expected payload (dry-run)', async () => {
  await release(
    'mock-package-release-token',
    'https://github.com/illandril/FoundryVTT-third-pact/releases/latest/download/module.json',
    true,
  );

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith('https://api.foundryvtt.com/_api/packages/release_version/', {
    headers: {
      'content-type': 'application/json',
      authorization: 'mock-package-release-token',
    },
    method: 'POST',
    body: JSON.stringify({
      id: 'illandril-third-pact',
      'dry-run': true,
      release: {
        version: '2.1.1',
        manifest: 'https://github.com/illandril/FoundryVTT-third-pact/releases/latest/download/module.json',
        notes: 'https://github.com/illandril/FoundryVTT-third-pact/releases',
        compatibility: { minimum: 10, verified: 11 },
      },
    }),
  });
});
