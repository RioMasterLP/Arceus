const Discord = require("discord.js");
const moment = require("moment");

const bot = new Discord.Client()
const config = require("./config.json");



bot.on("ready", () => {
    console.log(`Bot ist online.\nName: ${bot.user.username}\nTag: ${bot.user.discriminator}\nPrefix: ${config.prefix}\nOwner: ${bot.users.get(config.OwnerID).tag}\nServer: ${bot.guilds.size}\nMember: ${bot.users.size}`)
    bot.users.get(config.OwnerID).send(`Bot ist online.\nName: ${bot.user.username}\nTag: ${bot.user.discriminator}\nPrefix: ${config.prefix}\nOwner: ${bot.users.get(config.OwnerID).tag}\nServer: ${bot.guilds.size}\nMember: ${bot.users.size}`)
    bot.user.setStatus("online")
    bot.user.setActivity(`${config.prefix}help`,{
        type: ("PLAYING")
    }) 

})

//WELCOME
bot.on("guildMemberAdd", async member => {
    if(member.guild.id == "535170793009577984") {
        member.send(`${member} Willkommen auf der ${member.guild.name}.\nHier erwarten dich tolle Menschen, die sich mit dir unterhalten wollen.\nDieser Server wird von meinen Erschaffer **${bot.users.get("533021117863165952").username}**#${bot.users.get("533021117863165952").discriminator} geleitet, da er der Gründer ist.\n Ich ${bot.user.username} wünsche dir hier viel Spaß^^`)
        member.addRole("538089348047044648")
    }
})

bot.on("message", async message => {

    if(message.author.id == bot.user.id) return;

    var args = message.content.slice(config.prefix).trim().split(" ")
    var mention = message.mentions.members.first()
    var command = args.shift()
    var embedRandom = '#' + ("000000" + Math.random()*0xFFFFFF<<0).toString(16)

    //HELP
   if(message.content == `${config.prefix}help`) {
    var embed = new Discord.RichEmbed()

    .setColor(`#DB672E`)
    .setTitle(`Das ist ${bot.user.username}`)
    .setThumbnail(bot.user.displayAvatarURL)
    .addField(`Knuddeln`,`${config.prefix}knuddeln`, true)
    .addField(`Küssen`,`${config.prefix}küssen`, true)
    .addField(`Sauer`,`${config.prefix}sauer`, true)
    .addField(`Traurig`,`${config.prefix}traurig`, false)
    .addField(`Botinfo`,`${config.prefix}botinfo`, true)
    .addField(`Say`,`${config.prefix}say`, true)
    
    .setTimestamp()


    message.channel.send(embed)
   }

    //SAY
    if(command == `${config.prefix}say`) {
        if(message.author.id == config.OwnerID || message.author.id == config.DevID) {
            
            let Say = args.join(" ")
            if(Say) {
                message.channel.send(Say)
            } else {
                message.channel.send(`${message.author}, Was soll ich sagen?`)
            }
        } else {
            let messageSay = await message.channel.send(`${message.author}, Du kannst diesen Command nicht benutzen!`)
            setTimeout(async () => {messageSay.delete()}, 2000)
        }
        message.delete();
    }
        //BOTINFO
        if(command == `${config.prefix}botinfo`) {
            let t = new Date(bot.uptime)

            let days = t.getUTCDate()-1;
    
            let minutes = t.getUTCMinutes();
            let hours = t.getUTCHours();
    
    
            let seconds = t.getUTCSeconds();
    
    
            let uptime = `**${days}**T, **${hours}**S, **${minutes}**m, **${seconds}**s`;

        var infoEmbed = new Discord.RichEmbed()

        .setColor(`#DB672E`)
        .setAuthor(`Informationen über ${bot.user.username}`)
        .setDescription(`Mein Prefix ist **${config.prefix}**`)
        .addField(`Name + Tag`,`**${bot.user.username}**#${bot.user.discriminator}`,true)
        .addField(`ID`,`${bot.user.id}`,true)
        .addField(`Dev`,`**${bot.users.get(config.OwnerID).username}**#${bot.users.get(config.OwnerID).discriminator}`, true)
        .addField("Ping",`Discord API: **${Math.round(bot.ping)}**ms`, true)
        .addField(`Uptime`,`${uptime}`, true)
        .addField("Status",`${config.Usertypes[bot.user.presence.status]}`,true)
        .addField("Erstellt am",`**${moment(bot.user.createdAt).format("DD.MM.YYYY")}**`,true)
        .setThumbnail(bot.user.displayAvatarURL)

        message.channel.send(infoEmbed)
    }

    //KICK
    if(command == `${config.prefix}kick`) {
        if(message.member.hasPermission("KICK_MEMBERS")) {

            let member = message.mentions.members.first()

            if(!member) return message.reply(`Du musst einen Member markieren!`)

            if(!member.kickable) return message.reply(`Diesen Member kann ich nicht kicken.`)

            let reason = args.slice(1).join(" ")

            if(!reason) return message.reply(`Du musst einen Grund angeben.`)

            await member.kick(reason) 
            return message.reply(`${member.user.username}#${member.user.discriminator} wurde gekickt wegen: ${reason}`)
        } else {
            message.reply(`Du hast nicht die Rechte, um diesen Member zu kicken.`)
        }
    }

      //BAN
      if(command == `${config.prefix}ban`) {
        if(message.member.hasPermission("BAN_MEMBERS")) {

            let member = message.mentions.members.first()

            if(!member) return message.reply(`Du musst einen Member markieren!`)

            if(!member.bannable) return message.reply(`Diesen Member kann ich nicht bannen.`)

            let reason = args.slice(1).join(" ")

            if(!reason) return message.reply(`Du musst einen Grund angeben.`)

            await member.ban(reason) 
            return message.reply(`${member.user.username}#${member.user.discriminator} wurde gebannt wegen: ${reason}`)
        } else {
            message.reply(`Du hast nicht die Rechte, um diesen Member zu bannen.`)
        }
    }
        //KNUDDELN
      if(command == `${config.prefix}knuddeln`) {
          if(!mention) return message.channel.send(`${message.author}, Wen willst du knuddeln?`)

        let randomHug = [`https://cdn.discordapp.com/attachments/539507078574768128/539507144882520065/KnuddelGif1.gif`,`https://cdn.discordapp.com/attachments/539507078574768128/539507149026492417/KnuddelGif2.gif`,`https://cdn.discordapp.com/attachments/539507078574768128/539507173080694834/KnuddelGif8.gif`,`https://cdn.discordapp.com/attachments/539507078574768128/539507175517716495/KnuddelGif9.gif`,`https://media.discordapp.net/attachments/539507078574768128/539507194014466059/KnuddelGif4.gif`,`https://media.discordapp.net/attachments/539507078574768128/539507198162632704/KnuddelGif3.gif`,`https://media.discordapp.net/attachments/539507078574768128/539507199878365194/KnuddelGif6.gif`,`https://cdn.discordapp.com/attachments/539507078574768128/539507212448432149/KnuddelGif7.gif`,`https://cdn.discordapp.com/attachments/539507078574768128/539507216076505098/KnuddelGif11.gif`,`https://media.discordapp.net/attachments/539507078574768128/539507219293798441/KnuddelGif10.gif`,`https://cdn.discordapp.com/attachments/539507078574768128/539507221747466250/KnuddelGif5.gif`]
        let HugUse = randomHug[Math.floor(Math.random() * randomHug.length)];

        var embed = new Discord.RichEmbed()

        .setColor(`#DB672E`)
        .setTitle(`Lass dich knuddeln`)
        .setDescription(`**${mention.user.username}** du wurdest geknuddelt von **${message.author.username}** 🤗`)
    
        .setImage(HugUse)
    
        message.channel.send(embed)
    }     

      //KÜSSEN
      if(command == `${config.prefix}küssen`) {
        if(!mention) return message.channel.send(`${message.author}, Wen willst du küssen?`)

        let randomKiss = [`https://media.discordapp.net/attachments/539507078574768128/540954853283987491/KissGif1.gif`,`https://cdn.discordapp.com/attachments/539507078574768128/540954854424576003/KissGif2.gif`,`https://media.discordapp.net/attachments/539507078574768128/540954858275209236/KissGif3.gif`,`https://media.discordapp.net/attachments/539507078574768128/540954859621580820/KissGif4.gif`,`https://media.discordapp.net/attachments/539507078574768128/540954865099210773/KissGif6.gif`,`https://cdn.discordapp.com/attachments/539507078574768128/540954870325444624/KissGif5.gif`,`https://media.discordapp.net/attachments/539507078574768128/540954872426659858/KissGif8.gif`,`https://media.discordapp.net/attachments/539507078574768128/540954868744192000/KissGif7.gif`,`https://cdn.discordapp.com/attachments/539507078574768128/540954874108444694/KissGif9.gif`,`https://cdn.discordapp.com/attachments/539507078574768128/540954876382019613/KissGif10.gif`]
        let KissUse = randomKiss[Math.floor(Math.random() * randomKiss.length)];

        var embed = new Discord.RichEmbed()

        .setColor(`#DB672E`)
        .setTitle(`Lass uns küssen.`)
        .setDescription(`**${mention.user.username}** du wurdest geküsst von **${message.author.username}** 😘`)
    
        .setImage(KissUse)
    
        message.channel.send(embed)
    }    
  
});



bot.login(process.env.BOT_TOKEN)