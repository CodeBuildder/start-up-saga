const bcrypt = require("bcryptjs");

// const test = async () => {
//   const salt = await bcrypt.genSalt(12);
//   const pass = await bcrypt.hash("nanda123", salt);
//   console.log(pass);
// };
// test();

const check = async () => {
  const correctPassword = await bcrypt.compare(
    "nanda123",
    "$2a$12$XH18NXyidwpqxm/weA0hNuSUZ8Trnj9KTetHgovdK5blmWi9v1W8G"
  );
  console.log(correctPassword);
};

check();
