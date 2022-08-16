const mongoose = require("mongoose");
const bCrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Email required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password required"],
  },
});

userSchema.methods.setPassword = async function (password) {
  // const salt = await bCrypt.genSalt(6)
  this.password = await bCrypt.hash(password, bCrypt.genSaltSync(6));

  // jakieshaslo -> ji3r2t@#GOKRSGSD{Fgfdsojgiw}
  //   SHA256
  //   MD5 -> niebezpieczny
  //   Blowfish

  // ktoś podaje hasło przy rejestracji: 1241243
  // tworzymy z tego hash -> 32tg23GRDJGIOJEWRI2j3itgj3ied
  // potem przy logowaniu ktoś podaje po raz kolejny 1241243
  // porównujemy/weryfikuje czy hash "pasuje" do podanego hasła

  // 32tg23GRDJGIOJEWRI2j3itgj3ied -> hash
  // SALT123 -> sól/salt
  // 32tg23GRDJGIOJEWRI2j3itgj3iedSALT123 // salted hash // posolony hash
  // rainbow tables
  // brute force
  // ddos

  // kolizja -> czyli taki sam hash z dwóch różnych haseł
  // haslotest1 -> 1241g
  // haslotest2 -> 1241g
};

userSchema.methods.validatePassword = function (password) {
  return bCrypt.compare(password, this.password);
};

const User = mongoose.model("user", userSchema);

module.exports = User;
