import { debug } from '@actions/core';
import fetchManifest from './fetchManifest';
import { illandrilThirdPact } from './testData/manifests';

jest.mock('@actions/core', () => ({
  debug: jest.fn(),
}));

// @ts-expect-error Partial mock
const fetch = jest.spyOn(globalThis, 'fetch').mockImplementation(() =>
  Promise.resolve({
    json: () => Promise.resolve(JSON.parse(JSON.stringify(illandrilThirdPact))),
  }),
);

it.each([
  'https://www.example.com',
  'https://github.com/illandril/FoundryVTT-third-pact/releases/latest/download/module.json',
])('should send a fetch request to the provided url (%j)', async (url) => {
  await fetchManifest(url);

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(url);
});

it('should return the fetched manifest', async () => {
  const response = await fetchManifest('https://www.example.com');

  expect(response).toEqual(illandrilThirdPact);
});

it('should provide helpful debugging info', async () => {
  await fetchManifest('https://www.example.com');

  expect(debug).toHaveBeenCalledWith('Fetching manifest from: https://www.example.com');
  expect(debug).toHaveBeenCalledWith(expect.stringMatching(/^\{"id":"illandril-third-pact",.*\}$/));
});
