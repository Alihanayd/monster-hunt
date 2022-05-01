new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    playerMana: 100,
    monsterHealth: 100,
    start: false,
    logs: [],
  },
  methods: {
    startGame: function () {
      this.start = true;
    },
    attack: function () {
      var point = Math.ceil(Math.random() * 15);
      this.monsterHealth -= point;
      this.monsterAttack();
      this.addToLogs({ turn: "p", text: "YOU HIT " + point });
    },
    specialAttack: function () {
      var point = Math.ceil(Math.random() * 30);
      if (this.playerMana >= 30) {
        this.playerMana -= 30;
        this.monsterHealth -= point;
        this.monsterAttack();
        this.addToLogs({ turn: "p", text: "YOU HIT " + point });
      } else {
        swal({
          text: "INSUFFICIENT MANA",
          closeOnClickOutside: false,
        });
      }
    },
    heal: function () {
      var point = Math.ceil(Math.random() * 30 + 10);
      if (this.playerMana >= 20) {
        this.playerMana -= 20;
        this.playerHealth += point;
        this.monsterAttack();
        this.addToLogs({ turn: "p", text: "YOU HEALED " + point });
      } else {
        swal({
          text: "INSUFFICIENT MANA",
          closeOnClickOutside: false,
        });
      }
    },
    rest: function () {
      this.playerMana += 40;
      this.monsterAttack();
      this.addToLogs({ turn: "p", text: "YOUR MANA INCREASED 40 " });
    },
    monsterAttack: function () {
      var point = Math.ceil(Math.random() * 25);
      this.playerHealth -= point;
      this.addToLogs({ turn: "m", text: "MONSTER HIT " + point });
    },
    addToLogs: function (log) {
      this.logs.push(log);
    },
  },
  watch: {
    playerHealth: function (value) {
      if (value <= 0) {
        this.playerHealth = 0;
        if (
          swal({
            title: "YOU LOSE",
            text: "Wanna try again?",
            icon: "error",
            button: "OH NO!",
            closeOnClickOutside: false,
          })
        ) {
          this.playerHealth = 100;
          this.playerMana = 100;
          this.monsterHealth = 100;
          this.logs = [];
        }
      } else if (value >= 100) {
        this.playerHealth = 100;
      }
    },
    playerMana: function (value) {
      if (value <= 0) {
        this.playerMana = 0;
      } else if (value >= 100) {
        this.playerMana = 100;
      }
    },
    monsterHealth: function (value) {
      if (value <= 0) {
        this.monsterHealth = 0;
        if (
          swal({
            title: "CONGRATULATIONS, YOU WON",
            text: "Wanna play again?",
            icon: "success",
            button: "NICE!",
            closeOnClickOutside: false,
          })
        ) {
          this.playerHealth = 100;
          this.playerMana = 100;
          this.monsterHealth = 100;
          this.logs = [];
        }
      } else if (value >= 100) {
        this.monsterHealth = 100;
      }
    },
  },
});
