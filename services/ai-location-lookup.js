import OpenAI from 'openai';

const openai = new OpenAI();

export async function resolveCity(description) {
  const response = await openai.chat.completions.create({
    model: 'gpt-5-mini',
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

  const content = response.choices[0].message.content.trim();
  if (content === 'NULL' || content.length === 0) {
    return null;
  }

  return content;
}
