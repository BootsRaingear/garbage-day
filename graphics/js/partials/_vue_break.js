// jshint -W117
var app = new Vue({
  el: '#app',
  data: {
    hour: 17,
    onBreak: true,
    breakPic: 'https://unsplash.it/1600/900?random',
    title: "Short title",
    readers: [
      "Lemon",
      "Boots Raingear",
      "Kumquatxop",
      "Isfahan",
      "Adam Bozarth",
      "STOG"
    ],
    
    introText: '<p>This is <b>Garbage Day</b>!</p><p>A 24 hour marathon of terrible writing in support of the <b>National Network of Abortion Funds</b>.</p>',
    underTotalText: 'Money goes to the <strong>National Network of Abortion Funds</strong>',

    breakText: "We'll be right back",
    
    provider: "T. Azimuth Schwitters",
    
    artist: "Sanguinary Novel",
    
    donateURL: "garbage.live",
    logoURL: "https://thefpl.us/content/7-wrote/13-garbage-day/gd_square.jpg",
    
    primaryStream: {
      show: true,
      name: "Sanguinary Novel draws things",
      url: "https://player.twitch.tv/?channel=thefplus"
    },
    
    secondaryStream: {
      show: true,
      name: "Frank West plays some dumb bullshit",
      url: "https://player.twitch.tv/?channel=thefplus"
    },
    
    totalDonations: 34646.25,
    
    hanson: {
      active: false,
      video: 'video/hanson0.mp4'
    },
    
    donations: [],
    
    battle: {
      active: true,
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
      provider: "Jack Chick"
    },
    
    freewrite: {
      active: true,
      location: 'center',
      // VALID LOCATIONS: center, top, right, bottom, left, top-left, top-right, bottom-left, bottom-right
      content: 'Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit.</b> Sed eleifend aliquet velit eu congue. Quisque finibus nisl nec consequat vulputate. Vivamus quis elit neque. Vestibulum pretium luctus dignissim. Fusce quis purus turpis. Praesent dictum, <i>purus eu ultricies</i> imperdiet, tellus sapien sagittis mauris, a porta felis erat laoreet enim.',
      img: 'https://unsplash.it/900/510'
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
      
    },
    
    breakBackground: function() {
      var self = this;
      return {
        'background-image': 'url('+self.breakPic+')'
      }
    }
    
  }
});