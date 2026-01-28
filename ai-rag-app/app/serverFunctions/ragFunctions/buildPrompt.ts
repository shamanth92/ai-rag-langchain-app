export function buildRagPrompt(
  contextChunks: string[],
  question: string
) {
  const context = contextChunks.join("\n\n");

  return `
You are a helpful assistant.
Answer the question using ONLY the context below.
If the answer is not in the context, say "I don't know".

Context:
${context}

Question:
${question}
`;
}
