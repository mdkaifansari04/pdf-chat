interface ChatWithDocumentRequest {
  sessionId: string;
  namespace: string;
  userId: string;
  userPrompt: string;
}

export const chatWithDocument = async (body: ChatWithDocumentRequest) => {
  const response: Response = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/pdf/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userPrompt: body.userPrompt,
      sessionId: body.sessionId,
      namespace: body.namespace,
      userId: body.userId,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch chat response');
  }
  return response;
};
