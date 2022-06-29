let config = {
  ime_prezime: {
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  korisnicko_ime: {
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    required: true,
    email: true,
    minlength: 5,
    maxlength: 50,
  },
  zip: {
    required: true,
    zipTest: true,
    type: Number,
    maxlength: 5,
  },
  broj_telefona: {
    minlength: 9,
    maxlength: 15,
  },
  lozinka: {
    required: true,
    minlength: 6,
    maxlength: 20,
    matching: "ponovi_lozinku",
  },
  ponovi_lozinku: {
    required: true,
    minlength: 6,
    maxlength: 20,
    matching: "lozinka",
  },
};

let validator = new Validator(config);
