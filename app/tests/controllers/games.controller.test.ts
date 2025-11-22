jest.mock('../services/index.services', () => ({
  gamesService: {
    findAllGames: jest.fn(),
    findGameById: jest.fn(),
    createNewGame: jest.fn(),
    updateGame: jest.fn(),
    deleteGame: jest.fn(),
  },
}));