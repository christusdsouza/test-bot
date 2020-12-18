const dot = require("dotenv");
dot.config();
const { ShardingManager } = require('discord.js');
const config = require('./config.json');
const manager = new ShardingManager('./bot.js', { token: process.env.token });
manager.spawn();
manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));
