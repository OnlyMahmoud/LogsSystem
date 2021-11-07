const Discord = require("discord.js");
const client = new Discord.Client({ disableEveryone: true })
const { Database } = require("quickmongo")
const moment = require('moment')
const db = new Database("رابط الدتا بيس")
const prefix = "بريفكس";
db.on("ready", () => {
	console.log(`Database Connected`)
})
client.on("message", async message => {
  if(message.content.startsWith(prefix + "channel")){
  let channel = message.mentions.channels.first();
  if(!channel)return message.channel.send("Mention Channel")
    db.set(`channel_${message.guild.id}` , channel.id)
    message.channel.send(`Done Has Been Added`)
}})

client.on('messageDelete', async msg => {
  let data = await db.get(`channel_${msg.guild.id}`)
  if(msg.deleted == true) {
       if(msg.content.length == 0) return;
let embed = new Discord.MessageEmbed()
.setColor(`#2f3136`)
.setAuthor(msg.author.tag, msg.author.avatarURL({dynamic:true}))
.addField(`Message:`, [`\`\`\`\n ${msg.content}\`\`\` `], false)
.addField(`Message By:`, msg.author, true)
.addField(`In:`, msg.channel, true)
.setThumbnail(msg.author.avatarURL({dynamic:true}))
.setTimestamp()
.setFooter(`${msg.guild.name}`, msg.guild.iconURL({dynamic:true}))
msg.guild.channels.cache.get(data).send(embed)
};
});

client.on('channelDelete', async msg => {
    let data = await db.get(`channel_${msg.guild.id}`)
  let embed = new Discord.MessageEmbed()
  .setAuthor(msg.guild.name, msg.guild.iconURL({dynamic:true}))
  .setColor(`#2f3136`)
  .addField(`Delete Channel:`, [`\`${msg.name}\``], false)
  .addField(`Channel Id:`, [`\`${msg.id}\``], true)
  .setTimestamp()
  .setFooter(`${msg.guild.name}`, msg.guild.iconURL({dynamic:true}))
  msg.guild.channels.cache.get(data).send(embed)
});

client.on('channelCreate', async msg => {
    let data = await db.get(`channel_${msg.guild.id}`)
  let embed = new Discord.MessageEmbed()
  .setAuthor(msg.guild.name, msg.guild.iconURL({dynamic:true}))
  .setColor(`#2f3136`)
  .addField(`Create Channel:`, [`\`${msg.name}\``], false)
  .addField(`Channel Id:`, [`\`${msg.id}\``], true)
  .setTimestamp()
  .setFooter(`${msg.guild.name}`, msg.guild.iconURL({dynamic:true}))
  msg.guild.channels.cache.get(data).send(embed)
});

client.on('channelUpdate', async (old ,ew) => {
    if (old.name != ew.name) {
    let data = await db.get(`channel_${old.guild.id}`)
  let embed = new Discord.MessageEmbed()
  .setAuthor(old.guild.name, old.guild.iconURL({dynamic:true}))
  .setColor(`#2f3136`)
  .addField(`Old Channel Name:`, [`\`${old.name}\``], false)
  .addField(`New Channel Name:`, [`\`${ew.name}\``], true)
  .addField(`Channel Id:`, [`\`${ew.id}\``], true)
  .setTimestamp()
  .setFooter(`${old.guild.name}`, old.guild.iconURL({dynamic:true}))
  old.guild.channels.cache.get(data).send(embed)
    };
});

client.on('guildMemberAdd', async msg => {
    let data = await db.get(`channel_${msg.guild.id}`)
  let embed = new Discord.MessageEmbed()
  .setAuthor(msg.guild.name, msg.guild.iconURL({dynamic:true}))
  .setThumbnail(msg.user.avatarURL({dynamic:true}))
  .setColor(`#2f3136`)
  .addField(`Member Join:`, [`\`${msg.user.tag}\``], false)
  .addField(`Member Id:`, [`\`${msg.id}\``], true)
  .addField(`Join Discord:`, [`\`${moment(msg.user.createdAt).format("YYYY/MM/DD | HH:MM")}\``], true)
  .setTimestamp()
  .setFooter(`${msg.guild.name}`, msg.guild.iconURL({dynamic:true}))
  msg.guild.channels.cache.get(data).send(embed)
});

client.on('guildMemberRemove', async msg => {
    let data = await db.get(`channel_${msg.guild.id}`)
  let embed = new Discord.MessageEmbed()
  .setAuthor(msg.guild.name, msg.guild.iconURL({dynamic:true}))
  .setThumbnail(msg.user.avatarURL({dynamic:true}))
  .setColor(`#2f3136`)
  .addField(`Member leve:`, [`\`${msg.user.tag}\``], false)
  .addField(`Member Id:`, [`\`${msg.id}\``], true)
  .addField(`Join Server:`, [`\`${moment(msg.user.joinedAt).format("YYYY/MM/DD | HH:MM")}\``], true)
  .setTimestamp()
  .setFooter(`${msg.guild.name}`, msg.guild.iconURL({dynamic:true}))
  msg.guild.channels.cache.get(data).send(embed)
});

client.on('messageUpdate', async message => {
    let data = await db.get(`channel_${message.guild.id}`)
    if(message.reactions.message.editedTimestamp > 0){
  let embed = new Discord.MessageEmbed()
  .setAuthor(message.guild.name, message.guild.iconURL({dynamic:true}))
  .setThumbnail(message.guild.iconURL({dynamic:true}))
  .setColor(`#2f3136`)
  .addField(`Old Message Name:`, [`\`\`\`${message.content}\`\`\``], false)
  .addField(`New Message Name:`, [`\`\`\`${message.reactions.message.content}\`\`\``], true)
  .addField(`By:`, message.author, false)
  .addField(`In:`, message.channel, false)
  .setTimestamp()
  .setFooter(`${message.guild.name}`, message.guild.iconURL({dynamic:true}))
  message.guild.channels.cache.get(data).send(embed)
    }
});

client.on('roleDelete', async message => {
  let data = await db.get(`channel_${message.guild.id}`)
let embed = new Discord.MessageEmbed()
.setAuthor(message.guild.name, message.guild.iconURL({dynamic:true}))
.setColor(`#2f3136`)
.addField(`Delete role Name:`, [`\`\`\`${message.name}\`\`\``], false)
.setTimestamp()
.setFooter(`${message.guild.name}`, message.guild.iconURL({dynamic:true}))
message.guild.channels.cache.get(data).send(embed)
});

client.on('roleCreate', async message => {
  let data = await db.get(`channel_${message.guild.id}`)
let embed = new Discord.MessageEmbed()
.setAuthor(message.guild.name, message.guild.iconURL({dynamic:true}))
.setColor(`#2f3136`)
.addField(`Create role Name:`, [`\`\`\`${message.name}\`\`\``], false)
.addField(`Role Id:`, [`\`\`\`${message.id}\`\`\``], true)
.setTimestamp()
.setFooter(`${message.guild.name}`, message.guild.iconURL({dynamic:true}))
message.guild.channels.cache.get(data).send(embed)
});

client.on('roleUpdate', async (oldrole,newrole) => {
  let data = await db.get(`channel_${oldrole.guild.id}`)
let embed = new Discord.MessageEmbed()
.setAuthor(oldrole.guild.name, oldrole.guild.iconURL({dynamic:true}))
.setColor(`#2f3136`)
.addField(`Old role Name:`, [`\`\`\`${oldrole.name}\`\`\``], false)
.addField(`New role name:`, [`\`\`\`${newrole.name}\`\`\``], true)
.addField(`Role id:`, [`\`\`\`${newrole.id}\`\`\``], true)
.setTimestamp()
.setFooter(`${oldrole.guild.name}`, oldrole.guild.iconURL({dynamic:true}))
oldrole.guild.channels.cache.get(data).send(embed)
});


client.login(process.env.token)
