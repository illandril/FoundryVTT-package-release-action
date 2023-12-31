import core from '@actions/core'

import release from './release.js';

try {
  const packageReleaseToken = core.getInput('package-release-token', { required: true });
  const manifestUrl = core.getInput('manifest-url', { required: true });
  const dryRun = core.getInput('dry-run') === 'true';
  const response = await release(packageReleaseToken, manifestUrl, dryRun);

  core.setOutput('response', response);
  try {
    const parsedResponse = JSON.parse(response);
    if(parsedResponse.status !== 'success') {
      core.setFailed(parsedResponse.message);
    }
  } catch(parseError) {
    core.setFailed(`Non-JSON response: ${response}`);
  }
} catch (error) {
  core.setFailed(error.message);
}
