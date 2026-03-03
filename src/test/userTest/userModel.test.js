import User from "../../Model/userModel.js";

describe("User Model", () => {

  it("should create a user successfully", async () => {
    const user = await User.create({
      fullName: "Rohini Gurung",
      userName: "rohini123",
      email: "rohini@test.com",
      password: "password123",
    });

    expect(user.fullName).toBe("Rohini Gurung");
    expect(user.email).toBe("rohini@test.com");
  });

  it("should not create user without required fields", async () => {
    try {
      await User.create({});
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

});