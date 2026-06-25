const util = require("minecraft-server-util");

async function updatePlayersChannel(client) {
  try {
    const result = await util.status(
      process.env.MC_HOST,
      parseInt(process.env.MC_PORT)
    );

    const online = result.players.online;

    const channel = await client.channels.fetch(
      process.env.PLAYERS_CHANNEL_ID
    );

    if (!channel) return;

    await channel.setName(`👥 المتصلون ${online}`);
  } catch (err) {
    try {
      const channel = await client.channels.fetch(
        process.env.PLAYERS_CHANNEL_ID
      );

      if (channel) {
        await channel.setName("🔴 السيرفر متوقف");
      }
    } catch {}
  }
}

module.exports = {
  updatePlayersChannel
};