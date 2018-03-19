// jshint -W117
var app = new Vue({
  el: '#app',
  data: {
    hour: 9,
    title: "Bitch Loser Sex Madness",
    readers: [
      "Lemon",
      "Boots Raingear",
      "Kumquatxop",
      "Isfahan",
      "Adam Bozarth",
      "STOG"
    ],
    
    introText: '<p>This is <b>Garbage Day</b>!</p><p>A 24 hour marathon of terrible writing in support of the <b>Southern Poverty Law Center</b>.</p>',
    
    provider: "T. Azimuth Schwitters",
    
    artist: "Sanguinary Novel",
    
    donateURL: "garbage.live",
    logoURL: "https://thefpl.us/content/7-wrote/13-garbage-day/gd_square.jpg",
    
    primaryStream: {
      show: true,
      name: "Sanguinary Novel draws things",
      url: "https://player.twitch.tv/?channel=thefplus"
    },
    
    secondStream: {
      show: true,
      name: "Frank West plays some dumb bullshit",
      url:  "https://picarto.tv/CaptRedgrave"
    },
    
    totalDonations: 34646.25,
    
    donations: []
    
  },
  methods: {
    dollarAmount: function(n) {
      return '$' + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
});