/* 

author: @Thiago alcantara
date: 12/05/2023
version: 1.0.0

content:
    - join system
    - leave system
    - message system
    - command system

*/

var room = HBInit({
    roomName: "Thiago Futsal room",
    maxPlayers: 16,
    noPlayer: true,
    public: false,
    token: "thr1.AAAAAGReRjsLAFJLpz999w.N3u5whaXR0Y",
});


var admin_list = [""]; // admin list;
var adminname = [""]; // admin name list;
var vip = ["JAXw2kIzcttm5AawAjGhVnGoXFhT1HhVYBoZ8uxzudA"]; // vip list;
var vipname = [""]; // vip name list;





room.onPlayerJoin = function (player) {
    if(admin_list.includes(player.auth)){
        room.setPlayerAdmin(player.id, true);
        room.sendAnnouncement(player.name + " İsimli yetkili oyuna katıldı.", null, 0x00FF00, "bold", 1);
        adminname.push(player.name);
    }else if (vip.includes(player.auth)) {
        room.sendAnnouncement(player.name + " İsimli vip oyuna katıldı.", null, 0x00FF00, "bold", 1);
        vipname.push(player.name);
    } else {
        room.sendAnnouncement(" Acemi Mekanına hoş geldiniz !", player.id, 0xfffff, "bold", 1);
    }
    console.log(player.name + " İsimli oyuncu oyuna katıldı." + " ATUH: " + player.auth);
}

room.onPlayerLeave = function (player) {
    if (admin.includes(player.auth)) {
        room.sendAnnouncement(player.name + " İsimli yetkili oyundan ayrıldı.", null, 0x00FF00, "bold", 1);
    } else if (vip.includes(player.auth)) {
        room.sendAnnouncement(player.name + " İsimli vip oyundan ayrıldı.", null, 0x00FF00, "bold", 1);
    }
    console.log(player.name + " İsimli oyuncu oyundan ayrıldı." + " ATUH: " + player.auth);
}

room.onPlayerChat = function (player, message) {
    if(message == "!help"){
        room.sendAnnouncement("Komutlar: !help, !admin, !vip, !stats, !rules", player.id, 0xfffff, "bold", 1);
        return false;
    }else if(message == "!admin"){
        room.sendAnnouncement("Yetkili listesi: " + adminname, player.id, 0xfffff, "bold", 1);
        return false;
    }if (adminname.includes(player.name)) {
        room.sendAnnouncement("👑 " + player.name + ": " + message, null, 0x0000ff, "bold", 1);
        return false;
    } if (vipname.includes(player.name)) {
        room.sendAnnouncement("⭐ " + player.name + ": " + message, null, 0x0000ff, "bold", 1);
        return false;
    }
}
