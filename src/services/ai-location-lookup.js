import OpenAI from 'openai';

let openaiClient;
const LOCATION_RESOLUTION_MODEL = 'gpt-5.4-mini';
const LOCATION_RESOLUTION_INSTRUCTIONS = [
  'Du bist ein Assistent, der Ortsbeschreibungen in konkrete Städtenamen umwandelt.',
  'Antworte NUR mit dem Städtenamen, ohne zusätzlichen Text.',
  'Wenn du keinen Ort findest, dann antworte mit "NULL".',
].join('\n');

export class LocationResolutionError extends Error {
  constructor(code, message, options) {
    super(message, options);
    this.name = 'LocationResolutionError';
    this.code = code;
  }
}

function getOpenAIClient() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY fehlt');
  }
  if (!openaiClient) {
    openaiClient = new OpenAI();
  }
  return openaiClient;
}

export async function resolveCity(description) {
  const openai = getOpenAIClient();
  let response;
  try {
    response = await openai.responses.create({
      model: LOCATION_RESOLUTION_MODEL,
      instructions: LOCATION_RESOLUTION_INSTRUCTIONS,
      input: description,
    });
  } catch (error) {
    const status = error?.status;
    const message = String(error?.message ?? '');

    if (status === 401 && message.includes('Missing scopes: model.request')) {
      throw new LocationResolutionError(
        'PERMISSION',
        'Berechtigung für model.request fehlt',
        { cause: error },
      );
    }

    if (status === 429) {
      throw new LocationResolutionError(
        'RATE_LIMIT',
        'OpenAI Rate Limit oder Quota erreicht',
        { cause: error },
      );
    }

    throw new LocationResolutionError(
      'UNKNOWN',
      'Ortsauflösung durch KI fehlgeschlagen',
      { cause: error },
    );
  }

  const content = String(response.output_text ?? '').trim();
  if (content === 'NULL' || content.length === 0) {
    return null;
  }

  return content;
}
