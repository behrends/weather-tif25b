import OpenAI from 'openai';

const openai = new OpenAI();

export async function getLocationByDescription(description) {
  const response = await openai.chat.completions.create({
    model: 'gpt-5-mini',
    messages: [
      {
        role: 'system',
        content:
          'Du bist ein Assistent, der Ortsbeschreibungen in konkrete Städtenamen umwandelt. Antworte NUR mit dem Städtenamen, ohne zusätzlichen Text.',
      },
      {
        role: 'user',
        content: description,
      },
    ],
  });
  return response.choices[0].message.content.trim();
}
