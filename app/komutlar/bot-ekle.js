const Discord = require('discord.js');

/////FİBER CODE
exports.run = function(client, message, args) {

    let botid = args[0]
    let prefix = args[1]
  let onaylımı = args[2]
  let basvuru = "853259563875958815"// başvurunun gideceği kanal
    let kanal = "853259319905353748" // başvurunun yapılacağı kanal
  let log = "856935513474334720" // bot log kanalı
    
  if (message.channel.id !== kanal) return message.channel.send(`<:reddet:880928559668023327> **Bu komutu sadece <#${kanal}> kanalında kullanabilirsin.**`).then(msg => msg.delete(10000))
    if (message.channel.id == kanal) {
  if (!botid) return message.channel.send(`<:reddet:880928559668023327>** Botunun ID'sini yazmalısın.**`).then(msg => msg.delete(10000))
  if (!prefix) return message.channel.send(`<:reddet:880928559668023327> **Botunun prefixini yazmalısın.**`).then(msg => msg.delete(10000))
  if (!onaylımı) return message.channel.send(`<:reddet:880928559668023327>** Botunun Dbl onaylımı onu yazmalısın.**`).then(msg => msg.delete(10000))
  message.delete()
  const basvuruuu = new Discord.MessageEmbed()
  .setColor("#00ffff")
  .setDescription(`> <:botlstwait:857529552301195275>** ${message.author} Adlı Kullanıcı <@${botid}> Adlı Botu İle Başvuruda Bulundu. Botu İncelenmeyi ve Onaylanmayı Bekliyor.**`)
  const embed = new Discord.MessageEmbed()
  .setColor("#00ffff")
  .setDescription(`
●▬▬▬▬▬▬▬▬[Sahip Bilgiler]▬▬▬▬▬▬▬▬●

> **Bot Sahibi** - \`${message.author.tag}\`
> **Bot Sahibi ID** - \`${message.author.id}\`

●▬▬▬▬▬▬▬▬▬[Bot Bilgiler]▬▬▬▬▬▬▬▬▬●

> **Bot ID** - \`${botid}\`
> **Bot Prefix** - \`${prefix}\`
> **Bot Onaylımı?** - \`${onaylımı}\`
> **Bot Davet Linki** - ${`https://discordapp.com/oauth2/authorize?client_id=${botid}&scope=bot&permissions=0`}
`);
  client.channels.cache.get(basvuru).send(embed)
  client.channels.cache.get(log).send(basvuruuu)
  message.channel.send(` <:onayla:880928527107641445>** Bot Başvuru İsteğiniz Alındı.**`).then(msg => msg.delete(500))
  }
};
////FİBER CODE
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bot-ekle'],
  permLevel: 0
};

exports.help = {
  name: 'botekle', 
  description: "Sunucuya bot eklemenizi sağlar.",
  usage: 'botekle <botid> <prefix>'
};