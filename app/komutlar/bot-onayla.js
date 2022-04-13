const Discord = require('discord.js');

///FİBER CODE
exports.run = function(client, message, args) {
  
  if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(`:no_entry: Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
    let botisim = args[0]
  let sahip = args[1]
  
    let log = "856935513474334720" // bot log kanalı
  let guild1 = "809835006721392664"//DEVELOPER ROLÜ VERİLCEK SUNUCU İD
  let devrole = "829771821339508781"//DEVELOPER ROLÜ İD 
  const onay = new Discord.MessageEmbed()
  .setColor("GREEN")
  .setDescription(`> <:onayla:880928527107641445> **<@${sahip}> Adlı Kullanıcının <@${botisim}> Adlı Botu İncelendi ve Onaylandı.**\n **Onaylayan Yetkili: ${message.author}**`)
    
    if (!botisim) return message.channel.send(`**<:reddet:880928559668023327>> Botun idsini yazmalısın.**`).then(msg => msg.delete(100))
  message.delete()
        client.channels.cache.get(log).send(onay)      
  message.channel.send(`<:onayla:880928527107641445> **Botu onayladınız.**`).then(msg => msg.delete(100))
  client.guilds.cache.get(guild1).members.cache.get(sahip).roles.add(devrole); // ONAYLANINCA OTOMATİK DEVELOPER ROLÜ VERİYOR
 
};
/////FİBER CODE
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bot-onayla', 'onayla'],
  permLevel: 3
};

exports.help = {
  name: 'botonayla', 
  description: "Sunucuya eklenen botu onaylar.",
  usage: 'botonayla <bot ismi>'
};