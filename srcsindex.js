require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");
const { updatePlayersChannel } = require("./playerCounter");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once("ready", async () => {
  console.log(`تم تشغيل البوت: ${client.user.tag}`);

  await updatePlayersChannel(client);

  setInterval(async () => {
    await updatePlayersChannel(client);
  }, 5 * 60 * 1000);
});

client.login(process.env.DISCORD_TOKEN);