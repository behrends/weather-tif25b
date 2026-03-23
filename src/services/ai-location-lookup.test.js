import { beforeEach, describe, expect, it, vi } from 'vitest';

const responsesCreateMock = vi.fn();
const OpenAIMock = vi.fn(function OpenAI() {
  return {
    responses: {
      create: responsesCreateMock,
    },
  };
});

vi.mock('openai', () => ({
  default: OpenAIMock,
}));

async function loadService() {
  return import('./ai-location-lookup.js');
}

describe('resolveCity', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    delete process.env.OPENAI_API_KEY;
  });

  it('uses the Responses API with instructions and input text', async () => {
    process.env.OPENAI_API_KEY = 'test-key';
    responsesCreateMock.mockResolvedValueOnce({
      output_text: ' Berlin ',
    });

    const { resolveCity } = await loadService();

    const result = await resolveCity('Hauptstadt von Deutschland');

    expect(OpenAIMock).toHaveBeenCalledTimes(1);
    expect(responsesCreateMock).toHaveBeenCalledWith({
      model: 'gpt-5.4-mini',
      instructions: expect.stringContaining('Antworte NUR mit dem Städtenamen'),
      input: 'Hauptstadt von Deutschland',
    });
    expect(result).toBe('Berlin');
  });

  it('returns null when the model outputs NULL', async () => {
    process.env.OPENAI_API_KEY = 'test-key';
    responsesCreateMock.mockResolvedValueOnce({
      output_text: 'NULL',
    });

    const { resolveCity } = await loadService();

    await expect(resolveCity('Ort am Meer')).resolves.toBeNull();
  });

  it('maps rate limit errors to LocationResolutionError', async () => {
    process.env.OPENAI_API_KEY = 'test-key';
    responsesCreateMock.mockRejectedValueOnce({
      status: 429,
      message: 'rate limit reached',
    });

    const { LocationResolutionError, resolveCity } = await loadService();

    try {
      await resolveCity('Berlin');
      throw new Error('Expected resolveCity to reject');
    } catch (error) {
      expect(error).toBeInstanceOf(LocationResolutionError);
      expect(error).toMatchObject({
        code: 'RATE_LIMIT',
        message: 'OpenAI Rate Limit oder Quota erreicht',
      });
    }
  });
});
