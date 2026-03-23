import OpenAI from 'openai';

let openaiClient;

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
    response = await openai.chat.completions.create({
      model: 'gpt-5.4-mini',
      messages: [
        {
          role: 'system',
          content: `Du bist ein Assistent, der Ortsbeschreibungen in konkrete Städtenamen umwandelt. 
          Antworte NUR mit dem Städtenamen, ohne zusätzlichen Text.
          Wenn du keinen Ort findest, dann antworte mit "NULL"`,
        },
        {
          role: 'user',
          content: description,
        },
      ],
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

  const content = (response.choices?.[0]?.message?.content ?? '').trim();
  if (content === 'NULL' || content.length === 0) {
    return null;
  }

  return content;
}
