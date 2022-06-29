class Validator {
  constructor(config) {
    this.elementsConfig = config;
    this.errors = {};

    this.generateErrorObjects();
    this.inputListener();
  }

  generateErrorObjects() {
    for (let el in this.elementsConfig) {
      this.errors[el] = [];
    }
  }

  inputListener() {
    let inputSelector = this.elementsConfig;

    for (let field in inputSelector) {
      let el = document.querySelector(`input[name="${field}"]`);

      el.addEventListener("input", this.validate.bind(this));
    }
  }

  validate(e) {
    let elFields = this.elementsConfig;

    let field = e.target;
    let fieldName = field.getAttribute("name");
    let fieldValue = field.value;

    this.errors[fieldName] = [];

    if (elFields[fieldName].required) {
      if (fieldValue === "") {
        this.errors[fieldName].push("Potrebno je unijeti podatke");
      }

      if (
        fieldValue.length < elFields[fieldName].minlength ||
        fieldValue.length > elFields[fieldName].maxlength
      ) {
        this.errors[fieldName].push(
          `Polje mora imati izmedju ${elFields[fieldName].minlength} i ${elFields[fieldName].maxlength} karaktera`
        );
      }

      if (elFields[fieldName].email) {
        if (!this.validateEmail(fieldValue)) {
          this.errors[fieldName].push("Email adresa nije ispravna");
        }
      }

      if (elFields[fieldName].zipTest) {
        if (fieldValue.length > elFields[fieldName].maxlength) {
          this.errors[fieldName] = [];
          this.errors[fieldName].push(
            "ZIP kod ne moze biti duzi od 5 karaktera"
          );
        }

        if (isNaN(fieldValue)) {
          this.errors[fieldName].push("ZIP kod sadrzi samo brojeve");
        }
      }

      if (elFields[fieldName].matching) {
        let matchingEl = document.querySelector(
          `input[name ="${elFields[fieldName].matching}"]`
        );

        if (fieldValue !== matchingEl.value) {
          this.errors[fieldName].push("Lozinke se ne poklapaju!");
        }

        if (this.errors[fieldName].length === 0) {
          this.errors[fieldName] = [];
          this.errors[elFields[fieldName].matching] = [];
        }
      }
    }
    this.populateErrors(field);
  }

  validateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})$/.test(email)) {
      return true;
    }

    return false;
  }

  populateErrors(el) {
    for (const elem of document.querySelectorAll("ul")) {
      elem.remove();
    }

    for (let key of Object.keys(config)) {
      let parentElement = document.querySelector(
        `input[name = "${key}"]`
      ).parentElement;
      let errorElement = document.createElement("ul");

      parentElement.appendChild(errorElement);

      this.errors[key].forEach((error) => {
        let li = document.createElement("li");
        li.innerText = error;

        errorElement.appendChild(li);
      });
    }
  }
}
