export const illandrilThirdPact = {
  id: 'illandril-third-pact',
  title: "Illandril's Pact Slot Third Caster (5e)",
  description: 'Adds support for Third Caster subclasses that use Pact Magic, and allows a d20 option for hit dice.',
  version: '2.1.1',
  manifestPlusVersion: '1.2.0',
  authors: [
    {
      name: 'Joe Spandrusyszyn (illandril)',
      url: 'https://github.com/illandril',
      email: 'foundry-modules@illandril.net',
      discord: 'joespan#3152',
      'ko-fi': 'illandril',
      patreon: 'illandril',
      reddit: 'u/illandril',
    },
  ],
  license: 'LICENSE',
  compatibility: {
    minimum: 10,
    verified: 11,
  },
  relationships: {
    systems: [
      {
        id: 'dnd5e',
        type: 'system',
        compatibility: {
          verified: '2.0.3',
        },
      },
    ],
  },
  esmodules: ['module.js'],
  languages: [
    {
      lang: 'en',
      name: 'English',
      path: 'lang/en.json',
    },
  ],
  url: 'https://github.com/illandril/FoundryVTT-third-pact',
  bugs: 'https://github.com/illandril/FoundryVTT-third-pact/issues',
  flags: {
    allowBugReporter: true,
  },
  changelog: 'https://github.com/illandril/FoundryVTT-third-pact/releases',
  manifest: 'https://github.com/illandril/FoundryVTT-third-pact/releases/latest/download/module.json',
  download: 'https://github.com/illandril/FoundryVTT-third-pact/releases/download/v2.1.1/module.zip',
  media: [],
};
