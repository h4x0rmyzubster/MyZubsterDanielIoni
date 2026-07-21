const Token = require('../models/Token');
const TokenHolding = require('../models/TokenHolding');
const User = require('../models/User');

const getActiveTokens = async () => {
  return await Token.find({ status: 'active' });
};

const getTokenById = async (id) => {
  try {
    const token = await Token.findById(id);
    if (!token) return null;
    return token;
  } catch (error) {
    console.error('Errore in getTokenById:', error);
    throw new Error('Errore nel recupero del token');
  }
};

const getUserHoldings = async (userId) => {
  const holdings = await TokenHolding.find({ user: userId })
    .populate('token')
    .populate('user', 'username email');
  return holdings;
};

const createToken = async (tokenData) => {
  try {
    // Verifica che l'issuer esista
    const issuer = await User.findById(tokenData.issuer);
    if (!issuer) throw new Error('Issuer non trovato');

    // Verifica che simbolo non sia duplicato
    const existing = await Token.findOne({ symbol: tokenData.symbol });
    if (existing) throw new Error('Simbolo già utilizzato');

    const token = new Token({
      ...tokenData,
      status: tokenData.status || 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await token.save();

    // Assegna i token all'issuer (crea holding iniziale)
    const holding = new TokenHolding({
      user: tokenData.issuer,
      token: token._id,
      amount: tokenData.totalSupply,
      lockedAmount: 0,
      createdAt: new Date(),
    });
    await holding.save();

    return token;
  } catch (error) {
    console.error('Errore in createToken:', error);
    throw error;
  }
};

const purchaseTokens = async (userId, tokenId, amount, moneroTxid) => {
  const token = await Token.findById(tokenId);
  if (!token) throw new Error('Token non trovato');
  if (token.status !== 'active') throw new Error('Token non disponibile');

  // Calcola il prezzo totale (potresti avere una logica diversa)
  const totalPrice = amount * token.tokenPrice;

  // Crea o aggiorna l'holding dell'acquirente
  let holding = await TokenHolding.findOne({ user: userId, token: tokenId });
  if (!holding) {
    holding = new TokenHolding({
      user: userId,
      token: tokenId,
      amount: 0,
      lockedAmount: 0,
    });
  }
  holding.amount += amount;
  await holding.save();

  // Qui potresti registrare la transazione Monero
  // ...

  return holding;
};

module.exports = {
  getActiveTokens,
  getTokenById,
  getUserHoldings,
  createToken,
  purchaseTokens,
};
