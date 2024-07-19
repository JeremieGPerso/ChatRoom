const conversationsMock = require("../mocks/conversations");

module.exports.getAllConversations = (req, res, next) => {
  let conversationForUser = conversationsMock.CONVERSATIONS.filter((conv) =>
    conv.members.includes(req.auth.userId)
  ).map((conv) => {
    return {
      id: conv.id,
      members: conv.members,
      createdAt: conv.createdAt,
      lastMessage: conv.messages.slice(-1)[0],
    };
  });
  if (!conversationForUser) {
      res.status(404).json({ message: "No conversations found" });
      return;
  }
  res.status(200).json(conversationForUser);
};

module.exports.getOneConversation = (req, res, next) => {
  let conversationForUser = conversationsMock.CONVERSATIONS.find(
    (conv) =>
      conv.members.includes(req.auth.userId) && conv.id === req.params.id
  );
  if (!conversationForUser) {
      res.status(404).json({ message: "No such conversation" });
      return;
  }
  res.status(200).json(conversationForUser.messages);
};


module.exports.addMessage = (chatId, message) => {
  const conversation = conversationsMock.CONVERSATIONS.find(
    (conv) => conv.id === chatId
  );
  if (!conversation)
      return [];
  conversation.messages.push(message);
  
  return conversation.members;
}
