module.exports = {
  async up(db, client) {
    await db.createCollection('clients');
  },

  async down(db, client) {
    await db.collection('clients').drop();
  }
};
