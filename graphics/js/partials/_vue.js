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
    
    introText: '<p>This is <b>Garbage Day</b>!</p><p>A 24 hour marathon of terrible writing in support of the <b>National Network of Abortion Funds</b>.</p>',
    underTotalText: 'Money goes to the <strong>National Network of Abortion Funds</strong>',
    
    provider: "T. Azimuth Schwitters",
    
    artist: "Sanguinary Novel",
    
    donateURL: "garbage.live",
    logoURL: "https://thefpl.us/assets/24th/img/24th.gif",
    
    primaryStream: {
      show: true,
      name: "Sanguinary Novel draws things",
      url: "https://www.youtube.com/embed/AkammjlX_qs?autoplay=1&controls=0&origin=https://urbanwizards.com"
      //url: "https://1-edge4-us-east.picarto.tv/mp4/Amarynceus.mp4"
    },

    albertClass: "",
    secondaryStream: {
      show: false,
      name: "Frank West plays some dumb bullshit",
      url: "https://player.twitch.tv/?channel=saltybet&parent=localhost"
      //url: "https://1-edge4-us-east.picarto.tv/mp4/Armorwing.mp4"
    },

    hanson: {
      active: false,
      video: 'video/hanson0.mp4'
    },
    
    weed: {
      active: false
    },
    sixtyNine: {
      active: false,
      penis:  "🍆",
      mouth:  "👄",
      vagina: "🌮",
      tongue: "👅",
      orgasm: "💦"
    },

    random: {
      genders: [ "M", "F" ],
      vaginas: [ '🍑', '🌮', '🍩' ],
      penises: [ '🍆', '🍌', '🦴' ],
      mouths:  [ '👄', '💋', '😗' ],
      tongues: [ '👅', '😛', '😋' ],
      orgasms: [ '💦', '🍾', '🎉' ],
    },
    
    swapStreams: false,
    
    totalDonations: 420.69,
    
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
      location: 'center',
      // VALID LOCATIONS: center, top, right, bottom, left, top-left, top-right, bottom-left, bottom-right
      content: 'Hello, I am some text!',
      img: ''
    },

    comparativeItems: relativeValues,

    comparativeItem: {
      show: false,
      showing: false,
      name: "none",
      count: 99,
      pic: "healing-pyramid.jpg"
    }
    
  },
  methods: {
    dollarAmount: function(n) {
      return '$' + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    
    smokeWeed() {
      let self = this;
      self.weed.active = true;
      setTimeout(function () {
        self.weed.active = false;
      }, 6000);
    },

    haveASixtyNine() {
      let self = this;
      let p1 = randomFrom(self.random.genders);
      let p2 = randomFrom(self.random.genders);
      if (p1 == "M") {
        self.sixtyNine.penis = randomFrom(self.random.penises);
        self.sixtyNine.mouth = randomFrom(self.random.mouths);
      } else {
        self.sixtyNine.penis = randomFrom(self.random.vaginas);
        self.sixtyNine.mouth = randomFrom(self.random.tongues);
      }

      if (p2 == "M") {
        self.sixtyNine.vagina = randomFrom(self.random.penises);
        self.sixtyNine.tongue = randomFrom(self.random.mouths);
      } else {
        self.sixtyNine.vagina = randomFrom(self.random.vaginas);
        self.sixtyNine.tongue = randomFrom(self.random.tongues);
      }

      self.sixtyNine.active = true;
      setTimeout(function () {
        self.sixtyNine.active = false;  
      }, 6000);
      
    },

    findComparativeItem() {
      const self = this;

      self.comparativeItem.showing = false;
      self.comparativeItem.show = false;
      let tries = 0;
      let foundOne = false;
      let randomItem;

      while (tries < 10 && !foundOne) {
        randomItem = randomFrom(self.comparativeItems);
        let count = Math.floor(self.totalDonations / randomItem.cost);
        if (count > 0) {
          self.comparativeItem.show = true;
          setTimeout(function(){ self.comparativeItem.showing = true;}, 100);
          self.comparativeItem.count = count;
          foundOne = true;
        }
      }
      
      self.comparativeItem.pic = randomItem.pic;

      if (self.comparativeItem.count > 1) {
        self.comparativeItem.name = randomItem.plural;
      } else {
        self.comparativeItem.name = randomItem.name;
      }


      setTimeout(function(){ 
        foundOne = false;
        tries = 0;
        self.comparativeItem.showing = false;
        setTimeout(function(){ self.comparativeItem.show = false;}, 1800);
      }, 3000);
      
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
  },
  mounted() {
    const self = this;
    //self.findARelativeValue();
  }
});