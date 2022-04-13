const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const ms = require("ms");
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const { MessageButton, MessageActionRow } = require('discord-buttons');
require('discord-buttons')(client);
const roldb = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const snekfetch = require('snekfetch');
const queue = new Map();

client.ayarlar = {  "prefix": "a!"}

const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});


//--------------------------------------------------- KOMUTLAR ------------------------------------------------------------\\

/////////////////////////////////
client.on("message", message => {
  
  let channel1 = "853166689139032064";
  let aboneRolü = "853166664521482240";
  let yetkiliRol = "853166659299442708";
  let log = "853166689139032064"

  
  if (message.channel.id === channel1) {
    
    var Staffarray = [];
    message.guild.members.cache.forEach(hm => {
      if (hm.roles.cache.has(yetkiliRol)) {
        Staffarray.push(hm.id);
      } else {
        return;
      }
    });

    if (message.author.bot) return;
    if (message.attachments.size < 1) return;


    message.react("<:onayla:880928527107641445>");
    message.react("<:reddet:880928559668023327>");

    const onayFilter = (reaction, user) =>
      reaction.emoji.name === "onayla" && Staffarray.includes(user.id);
    
    const retFilter = (reaction, user) =>
      reaction.emoji.name === "reddet" && Staffarray.includes(user.id);
    
    const onayCollector = message.createReactionCollector(onayFilter);
    const retCollector = message.createReactionCollector(retFilter);

    onayCollector.on("collect", (reaction, user) => {
      
     message.reactions.removeAll()
      
      message.member.roles.add(aboneRolü);
         client.channels.cache.get(log).send(`> <:onayla:880928527107641445> **${message.author} Adlı Kişiye ${user} Adlı Kişi Tarafından Başarıyla Altyapı Rolü Verildi.** \n> **Efsane Altyapılarımıza Ve Kodlarımıza https://ankacode.xyz Adresinden Ulaşabilirsiniz.**`);
      
    });

    retCollector.on("collect", r => {
      
      message.reactions.removeAll()
      
      client.channels.cache.get(log).send(`> <:reddet:880928559668023327> **${message.author} Adlı Kişiye Altyapı Rolü Verilemedi. Şartlar Eksik Lütfen <#853166692989141012> Kanalını Tekrar Okuyunuz.**`);
      
    });
  }
});



//--------------------------------------------------- KOMUTLAR ------------------------------------------------------------\\

//--------------------------------------------------------------------------------------------\\

client.on("ready",() => {
console.log("Bot Hazır");
var randomMesajlar = ["a!bot-ekle | a!afk","a!avatar | a!banner","Site: https://ankacode.xyz"]
setInterval(function() {
    var randomMesajlar1 = randomMesajlar[Math.floor(Math.random() * (randomMesajlar.length))]
    client.user.setActivity(`${randomMesajlar1}`);}, 3 * 30000);
client.user.setStatus("dnd");
})
//--------------------------------------------------------------------------------------------\\

//------------------------------------- AFK Main -------------------------------------//

    client.on("message", async message => {
      const ms = require("ms");
    
      if (message.author.bot) return;
      if (!message.guild) return;
      if (message.content.includes(`${prefix}afk`)) return;
    
      if (await db.fetch(`afk_${message.author.id}`)) {
        let süre = await db.fetch(`afk_süre_${message.author.id}`);
        let zaman = ms(Date.now() - süre);
        db.delete(`afk_${message.author.id}`);
        db.delete(`afk_süre_${message.author.id}`);
        message.member.setNickname(db.fetch(`afktag_${message.author.id}`))
        const afk_cikis = new Discord.MessageEmbed()
          .setColor("#446cec")
          .setDescription(`<@${message.author.id}>\`${zaman.hours}\` **Saat**  \`${zaman.minutes}\` **Dakika** \`${zaman.seconds}\` **Saniye** , **AFK Modundaydın!**`)
        message.channel.send(afk_cikis)}
      
    
      var kullanıcı = message.mentions.users.first();
      if (!kullanıcı) return;
      var sebep = await db.fetch(`afk_${kullanıcı.id}`);
    
      if (sebep) {
        let süre = await db.fetch(`afk_süre_${kullanıcı.id}`);
        let zaman = ms(Date.now() - süre);
        const afk_uyarı = new Discord.MessageEmbed()
          .setColor("#446cec")
          .setDescription(`<@${kullanıcı.id}> Adlı Kullanıcı \`${sebep}\` Sebebiyle; \`${zaman.hours}\` **Saat**  \`${zaman.minutes}\` **Dakika** \`${zaman.seconds}\` **Saniyedir AFK!**`)
        message.reply(afk_uyarı)}
      
    });

    //------------------------------------- AFK Main -------------------------------------//





client.on("message", (message) => {

  // İhtimaller
  
  if (message.content !== "a!buton" || message.author.id === client.ayarlar.sahip || message.author.bot) return;
  
  
  // BUTONLAR
  //--------------------------------\\
  
  // V/K
  let Vk = new MessageButton()
    .setStyle('gray') // Rengi ayarlayabilirsiniz.
    .setLabel('💫・JavaScript') // Adını Değiştirebilirsiniz.
    .setID('V/K');// Elleme Bunu
  
  // D/C
  let Dc = new MessageButton()
    .setStyle('gray') // Rengi ayarlayabilirsiniz.
    .setLabel('➖・ HTML') // Adını Değiştirebilirsiniz.
    .setID('D/C'); // Elleme Bunu
  
  // GARTIC.IO
  let Gartic = new MessageButton()
    .setStyle("gray") // Rengi ayarlayabilirsiniz.
    .setLabel('🌐・Diğer Kodlar') // Adını Değiştirebilirsiniz.
    .setID('Gartic'); // Elleme Bunu
    // V/K
  let botl = new MessageButton()
    .setStyle('gray') // Rengi ayarlayabilirsiniz.
    .setLabel('🤖・Botlist') // Adını Değiştirebilirsiniz.
    .setID('botl'); // Elleme Bunu
  
  //--------------------------------\\
  
  message.channel.send(`
  <:tac:871701319549874176> **Selam, Sunucumuzdaki "Kod & BotList" Rollerini Almak İçin Butonlara Tıklamanız Yeterlidir.** 
   
  **__ROLLER__;**
   
  > \`>\` <@&829771804352577587> **Sahip Olmak İçin Butona Tıkla**
  > \`>\` <@&829771817077440564> **Sahip Olmak İçin Butona Tıkla**
  > \`>\` <@&829771834601242704> **Sahip Olmak İçin Butona Tıkla**
  > \`>\` <@&829771790024310865> **Sahip Olmak İçin 3 Davet Yapmalsın **
  > \`>\` <@&829771782075580446> **Sahip Olmak İçin 7 Davet Yapmalısın **
  > \`>\` <@&853166664521482240> **Sahip Olmak İçin 10 Davet Yapmalsın **
  > \`>\` <@&829771794252169237> **Sahip Olmak İçin 15 Davet Yapmalsın **
  > \`>\` <@&853166668887752714> **Botlist Kanallarını Görmek İçin Butona Tıkla** 
  `, { 
    buttons: [ Vk, Dc, Gartic, botl]
  });
  });
  
  client.on('clickButton', async function (button) {
    // V/K
      if (button.id === 'V/K') {
          if (button.clicker.member.roles.cache.get("829771804352577587")) {
              await button.clicker.member.roles.remove("829771804352577587")
              await button.reply.send("**JavaScript Rolü Üzerinizden Alındı.**", true)
          } else {
              await button.clicker.member.roles.add("829771804352577587")
              await button.reply.send("**JavaScript Rolü Üzerinize Verildi.**", true)//VAMPİR KÖYLÜ ROLUNU ÜÇYEREDE GİRİYORSUNUZ BEN DAHA ÖNCE GİRDİĞİM İÇİN YAPMICAM
          }
      }
  
    // D/C
      if (button.id === 'D/C') {
          if (button.clicker.member.roles.cache.get("829771817077440564")) {
              await button.clicker.member.roles.remove("829771817077440564")
              await button.reply.send(`**HTML Rolü Üzerinizden Alındı.**`, true)
          } else {
              await button.clicker.member.roles.add("829771817077440564")
              await button.reply.send(`**HTML Rolü Üzerinize Verildi.**`, true)//BURAYADA AYNI ŞEKİDE DOĞRULUKMU CESARETMİ ROLU
          }
  
      }
    // GARTIC
      if (button.id === 'Gartic') {
          if (button.clicker.member.roles.cache.get("829771834601242704")) {
              await button.clicker.member.roles.remove("829771834601242704")
              await button.reply.send(`**Diğer Kodlar Rolü Üzerinizden Alındı.**`, true)
          } else {
              await button.clicker.member.roles.add("829771834601242704")
              await button.reply.send("**Diğer Kodlar Rolü Üzerinize Verildi.**", true)//BURAYADA GARTİC İO
            
          }
      }
      if (button.id === 'botl') {
          if (button.clicker.member.roles.cache.get("853166668887752714")) {
              await button.clicker.member.roles.remove("853166668887752714")
              await button.reply.send(`**Botlist Rolü Üzerinizden Alındı.**`, true)
          } else {
              await button.clicker.member.roles.add("853166668887752714")
              await button.reply.send("**Botlist Rolü Üzerinize Verildi.**", true)//BURAYADA GARTİC İO
              }
      }
  });

client.on("message", (message) => {

  // İhtimaller
  
  if (message.content !== "a!reg" || message.author.id === client.ayarlar.sahip || message.author.bot) return;
  
let reg = new MessageButton()
    .setStyle('blurple') // Rengi ayarlayabilirsiniz.
    .setLabel('KAYIT OL') // Adını Değiştirebilirsiniz.
    .setID('reg');// Elleme Bunu
  
message.channel.send(`
  <:members:893562279709257820> **Merhaba Hoşgeldin, 
 Sunucumuzdaki Tüm Kanalları Görebilmek İçin Aşağıdaki Butona Tıklayarak Kayıt Olmalısın** 
  `, { 
    buttons: [ reg ]
  });
  });

  client.on('clickButton', async function (button) {
if (button.id === 'reg') {
          if (button.clicker.member.roles.cache.get("853166665348284466")) {
              await button.clicker.member.roles.remove("853166665348284466")
              await button.reply.send(`**Tekrar Kayıt Olunuz.**`, true)
          } else {
              await button.clicker.member.roles.add("853166665348284466")
              await button.reply.send("**Kayıt Oldunuz**", true)//BURAYADA GARTİC İO
              }
      }
  });
client.login(process.env.token)


































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































