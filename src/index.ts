import { getInput, setFailed, setOutput } from '@actions/core';
import release from './release.js';

try {
  const packageReleaseToken = getInput('package-release-token', { required: true });
  const manifestUrl = getInput('manifest-url', { required: true });
  const dryRun = getInput('dry-run') === 'true';
  const response = await release(packageReleaseToken, manifestUrl, dryRun);

  setOutput('response', response);
  try {
    const parsedResponse = JSON.parse(response) as {
      status?: string;
      message?: string;
    };
    if (parsedResponse.status !== 'success') {
      setFailed(parsedResponse.message ?? `Unexpected response: ${response}`);
    }
  } catch {
    setFailed(`Non-JSON response: ${response}`);
  }
} catch (error) {
  let message: string;
  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === 'string') {
    message = error;
  } else {
    message = `Unknown error: ${JSON.stringify(error)}`;
  }
  setFailed(message);
}
