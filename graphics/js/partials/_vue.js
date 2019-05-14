// jshint -W117
var app = new Vue({
  el: '#app',
  data: {
    hour: 9,
    onBreak: false,
    breakPic: 'https://unsplash.it/1600/900?random',
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
    logoURL: "https://thefpl.us/assets/24th/img/24th.gif",
    
    primaryStream: {
      show: true,
      name: "Sanguinary Novel draws things",
      url: "https://player.twitch.tv/?channel=overwatchleague"
      //url: "https://1-edge4-us-east.picarto.tv/mp4/Amarynceus.mp4"
    },

    albertClass: "",
    
    secondaryStream: {
      show: false,
      name: "Frank West plays some dumb bullshit",
      url: "https://player.twitch.tv/?channel=thefplus"
      //url: "https://1-edge4-us-east.picarto.tv/mp4/Armorwing.mp4"
    },

    hanson: {
      active: true,
      video: 'video/hanson0.mp4'
    },
    
    swapStreams: false,
    
    totalDonations: 34646.25,
    
    donations: [],
    
    battle: {
      active: false,
      option1title: "we will mutually masturbate each other",
      option1keyword: "jerk",
      option1total: 50,
      option2title: "we will commit suicide under horrific circumstances",
      option2keyword: "die",
      option2total: 100
    },
    
    goal: {
      active: false,
      text: "Fuckin', like, I dunno, we stop doing this?",
      amount: 40000,
      startAmount: 20000
    },
    
    prize: {
      active: false,
      amount: 50,
      text: "mp3s of motivational tautalogies (yelled)",
      provider: "Jack Chick",
      claimed: true,
      claimedBy: "fuckface25"
    },
    
    freewrite: {
      active: false,
      location: 'bottom',
      // VALID LOCATIONS: center, top, right, bottom, left, top-left, top-right, bottom-left, bottom-right
      content: 'Hello, I am some text!',
      img: ''
    }
    
  },
  methods: {
    dollarAmount: function(n) {
      return '$' + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    
  },
  computed: {
    
    primaryScreen: function() {
      var self = this;
      if (self.primaryStream.show && self.primaryStream.url) {
        return true;
      } else {
        return false;
      }
    },
    
    secondaryScreen: function() {
      var self = this;
      if (self.secondaryStream.show && self.secondaryStream.url) {
        return true;
      } else {
        return false;
      }
    },
    
    primaryScreenRawVideo: function() {
      var self = this;
      if (self.primaryScreen && self.primaryStream.url.includes('.mp4')) {
        return true;
      } else {
        return false;
      }
    },
    
    
    secondaryScreenRawVideo: function() {
      var self = this;
      if (self.secondaryScreen && self.secondaryStream.url.includes('.mp4')) {
        return true;
      } else {
        return false;
      }
    },
    
    countScreens: function() {
      var self = this;
      if (self.primaryScreen && self.secondaryScreen) {
        return 'double-screen';
      } else {
        return 'single-screen';
      }
    },
    
    weighBattle: function() {
      var self = this;
      var diff = 0;
      
      if (self.battle.option1total > self.battle.option2total) {
        diff = self.battle.option1total/(self.battle.option2total + self.battle.option1total) * 80 - 40;
        return {
          'transform': 'perspective( 600px ) rotateY( '+diff+'deg )'
        };
      } else if (self.battle.option1total < self.battle.option2total) {
        diff = self.battle.option2total/(self.battle.option1total + self.battle.option2total) * 80 - 40;
        return {
          'transform': 'perspective( 600px ) rotateY( -'+diff+'deg )'
        };
      } else {
        return {
          'transform': 'perspective( 600px ) rotateY( 0deg )'
        };
      }
      
    },
    
    thermometerHeight: function() {
      var self = this;
      var n = parseInt(self.goal.startAmount);
      var x = parseInt(self.goal.amount);
      var pct = ((self.totalDonations - n) / (x - n) * 100);
      
      return {
        'height': pct+'%'
      };
      
    }
  }
});