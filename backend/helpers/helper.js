import bcrypt from "bcrypt";

const hashpassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (err) {
    console.error(err);
    throw err; // Throw the error so that it can be handled wherever the function is called
  }
};

const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

export { hashpassword, comparePassword }; // Use export syntax for ESM modules
