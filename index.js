const Discord = require("discord.js");
const bot = new Discord.Client();

function doNothing() {

}

bot.on("ready", async () => {
    console.log("online");
});

bot.on("message", async message => {
    let prefix = "test!"
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    function checkMath() {
        var toMath1 = args[0];
        var toMath2 = args[2];
        var calcuation = args[1];

        if(!toMath1 || !toMath2 || !calcuation) return message.reply("You are missing an argument");
        
        toMath1 = parseFloat(toMath1);
        toMath2 = parseFloat(toMath2);
        
        if (calcuation === "+") return toMath1 + toMath2;
        else if (calcuation === "-") return toMath1 - toMath2;
        else if (calcuation === "*" || calcuation === "x") return toMath1 * toMath2;
        else if (calcuation === "/" || calcuation === "÷") return toMath1 / toMath2;
        else return message.reply("Your calculation has not been added");
    }

    function purge() {
        message.channel.bulkDelete(args[0]);
        message.reply("Finished.");
    }

    function checkPurgePerms() {
        var user = message.guild.member(message.author)
        if (!user.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have permission");
        else purge();
    }

    cmd === `${prefix}test` ? message.reply("test worked") : doNothing();
    cmd === `${prefix}8ball` ? message.channel.send(`:8ball: ${require("randomer.js").array(["yes", "no", "ask later"])}`) : doNothing();
    cmd === `${prefix}time` ? message.channel.send(Date()) : doNothing();
    cmd === `${prefix}unix` ? message.channel.send(message.createdTimestamp) : doNothing();
    cmd === `${prefix}math` ? message.channel.send(checkMath()) : doNothing();
    cmd === `${prefix}purge`? checkPurgePerms() : doNothing();
    cmd === `${prefix}help` ? message.channel.send(`Command list - Prefix ${prefix} \n \`test\` \n \`8ball\` \n \`time\` \n \`unix\` \n \`math\` \n \`purge\` \n \`help\``) : doNothing();


});

bot.login(require("./token.json").token);